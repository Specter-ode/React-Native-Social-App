import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKUNhs2e5RzLFG4g8UwV77VI2OR06JXv8",
  authDomain: "social-network-goit.firebaseapp.com",
  projectId: "social-network-goit",
  storageBucket: "social-network-goit.appspot.com",
  messagingSenderId: "276579513667",
  appId: "1:276579513667:web:db4f9884f500468da66bf6",
  measurementId: "G-Y1S7QJJ21P",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
