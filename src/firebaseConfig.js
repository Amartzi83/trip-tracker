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
  apiKey: "AIzaSyAI6LV11cJUsG8MJDtBlV3RNzT0Um22Yn4",
  authDomain: "trip-tracker-13d37.firebaseapp.com",
  projectId: "trip-tracker-13d37",
  storageBucket: "trip-tracker-13d37.firebasestorage.app",
  messagingSenderId: "15371701873",
  appId: "1:15371701873:web:fe46cd7bcf85e5ef3d15d0",
};

// True once real config has been pasted in. Until then the app stays
// fully usable in local-only mode (localStorage), with the login screen
// showing a friendly "cloud not configured yet" note.
export const firebaseReady =
  !!firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("REPLACE_ME");
