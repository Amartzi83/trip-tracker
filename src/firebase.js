// ─────────────────────────────────────────────────────────────
// Firebase integration: Auth (email/password) + Firestore storage.
// One document per user at  users/{uid}  holds the whole app state:
//   { trips: [...], userName: "...", updatedAt: <ms> }
// All helpers no-op gracefully when Firebase isn't configured yet.
// ─────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firebaseConfig, firebaseReady } from "./firebaseConfig";

let auth = null;
let db = null;

if (firebaseReady) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  // Keep the user signed in across reloads / app restarts.
  setPersistence(auth, browserLocalPersistence).catch(() => {});
}

export { firebaseReady };

// ── Auth ──
export function onAuth(cb) {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

export async function signUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  try { await sendEmailVerification(cred.user); } catch {}
  return cred.user;
}

export async function resendVerification() {
  if (auth && auth.currentUser) await sendEmailVerification(auth.currentUser);
}

// Refresh the current user from the server (to pick up a new emailVerified flag).
export async function reloadUser() {
  if (!auth || !auth.currentUser) return null;
  await reload(auth.currentUser);
  return auth.currentUser;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function logOut() {
  if (auth) await signOut(auth);
}

export async function resetPassword(email) {
  if (!auth) return;
  await sendPasswordResetEmail(auth, email.trim());
}

// ── Firestore (one doc per user) ──
function userRef(uid) {
  return doc(db, "users", uid);
}

// Read the user's doc once. Returns the data object, or null if none.
export async function loadUserData(uid) {
  if (!db) return null;
  const snap = await getDoc(userRef(uid));
  return snap.exists() ? snap.data() : null;
}

// Live-subscribe to the user's doc. cb(data|null) fires on every change.
export function watchUserData(uid, cb) {
  if (!db) return () => {};
  return onSnapshot(
    userRef(uid),
    (snap) => cb(snap.exists() ? snap.data() : null),
    () => {}
  );
}

// Save (merge) the user's state.
export async function saveUserData(uid, data) {
  if (!db) return;
  await setDoc(userRef(uid), { ...data, updatedAt: Date.now() }, { merge: true });
}

// ── Uploaded files ──
// Each file is its own document at  users/{uid}/files/{fileId}  so a big file
// never bloats the main user document (Firestore caps any document at ~1 MiB).
// The main doc keeps only lightweight metadata per file (name, size, category).
function fileRef(uid, fileId) {
  return doc(db, "users", uid, "files", fileId);
}

export async function saveUserFile(uid, fileId, dataUrl) {
  if (!db) return;
  await setDoc(fileRef(uid, fileId), { data: dataUrl });
}

export async function loadUserFile(uid, fileId) {
  if (!db) return null;
  const snap = await getDoc(fileRef(uid, fileId));
  return snap.exists() ? snap.data().data : null;
}

export async function deleteUserFile(uid, fileId) {
  if (!db) return;
  await deleteDoc(fileRef(uid, fileId));
}

// ── Shared trips ──
// A shared trip lives at  sharedTrips/{tripId}  with a `members` array of
// lowercased emails. Every member can read and write it (security rules
// enforce membership). Both collaborators see live edits via the snapshot.
export function watchSharedTrips(email, cb) {
  if (!db || !email) return () => {};
  const q = query(collection(db, "sharedTrips"), where("members", "array-contains", email.toLowerCase()));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    () => {}
  );
}

export async function saveSharedTrip(trip) {
  if (!db) return;
  await setDoc(doc(db, "sharedTrips", trip.id), { ...trip, updatedAt: Date.now() });
}

export async function deleteSharedTrip(tripId) {
  if (!db) return;
  await deleteDoc(doc(db, "sharedTrips", tripId));
}

// ── Automatic cloud backups ──
// Daily snapshots of the user's trips at  users/{uid}/backups/{YYYY-MM-DD}.
// Each doc: { trips, userName, createdAt }. Private (same rules as the user doc).
function backupCol(uid) { return collection(db, "users", uid, "backups"); }

// Create today's snapshot only if it doesn't exist yet (keeps the first state of the day),
// then prune to the newest ~20 days. Returns true if a snapshot was written.
export async function ensureDailyBackup(uid, id, data) {
  if (!db) return false;
  const ref = doc(db, "users", uid, "backups", id);
  const snap = await getDoc(ref);
  if (snap.exists()) return false;
  await setDoc(ref, { ...data, createdAt: Date.now() });
  try {
    const ids = (await getDocs(backupCol(uid))).docs.map((d) => d.id).sort(); // dates → oldest first
    const extra = ids.length - 20;
    for (let i = 0; i < extra; i++) await deleteDoc(doc(db, "users", uid, "backups", ids[i]));
  } catch {}
  return true;
}

export async function listBackups(uid) {
  if (!db) return [];
  const snap = await getDocs(backupCol(uid));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

export async function deleteBackup(uid, id) {
  if (!db) return;
  await deleteDoc(doc(db, "users", uid, "backups", id));
}

// Friendly Hebrew messages for common Firebase auth errors.
export function authErrorText(code) {
  const m = {
    "auth/invalid-email": "כתובת אימייל לא תקינה",
    "auth/missing-password": "חסרה סיסמה",
    "auth/weak-password": "הסיסמה חייבת להכיל לפחות 6 תווים",
    "auth/email-already-in-use": "האימייל כבר רשום — נסה להתחבר",
    "auth/invalid-credential": "אימייל או סיסמה שגויים",
    "auth/user-not-found": "לא נמצא משתמש עם האימייל הזה",
    "auth/wrong-password": "סיסמה שגויה",
    "auth/too-many-requests": "יותר מדי ניסיונות — נסה שוב מאוחר יותר",
    "auth/network-request-failed": "בעיית רשת — בדוק חיבור לאינטרנט",
  };
  return m[code] || "אירעה שגיאה. נסה שוב.";
}
