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
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
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
  return cred.user;
}

export async function signIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function logOut() {
  if (auth) await signOut(auth);
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
