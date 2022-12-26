import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDdttMl2Bhz6ffWi_Kio5zCso4rTae_DA",
  authDomain: "test-rc-social.firebaseapp.com",
  projectId: "test-rc-social",
  storageBucket: "test-rc-social.appspot.com",
  messagingSenderId: "1056995046506",
  appId: "1:1056995046506:web:28d45d274fbf9f9c28c613",
  measurementId: "G-5NQQ11276T",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
