import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCr-2RTGSvElBbQOplZ4vNwjcynhAPx0so",
  authDomain: "cineverse-28c42.firebaseapp.com",
  projectId: "cineverse-28c42",
  storageBucket: "cineverse-28c42.firebasestorage.app",
  messagingSenderId: "715764766398",
  appId: "1:715764766398:web:12e21ee9193324d52e30ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;