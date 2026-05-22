import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGP5nqOB39ENoeRIMpFo_B3Ya2RBE99sg",
  authDomain: "family-shopping-9f8a6.firebaseapp.com",
  databaseURL: "https://family-shopping-9f8a6-default-rtdb.firebaseio.com",
  projectId: "family-shopping-9f8a6",
  storageBucket: "family-shopping-9f8a6.firebasestorage.app",
  messagingSenderId: "7886163686",
  appId: "1:7886163686:web:544391dd14dac18b2ab527"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
