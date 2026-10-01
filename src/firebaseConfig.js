// ─────────────────────────────────────────────────────────────
// Firebase web config.
// These values are PUBLIC by design (they ship in the browser) and
// are safe to commit. Security is enforced by Firestore rules + Auth,
// NOT by hiding these keys.
//
// How to fill: Firebase Console → ⚙ Project settings → "Your apps"
// → Web app → "SDK setup and configuration" → copy the config object.
// Replace every REPLACE_ME below with your project's values.
// ─────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

// True once real config has been pasted in. Until then the app stays
// fully usable in local-only mode (localStorage), with the login screen
// showing a friendly "cloud not configured yet" note.
export const firebaseReady =
  !!firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("REPLACE_ME");
