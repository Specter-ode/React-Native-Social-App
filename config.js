import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwwy4jzMcSN6n-z-0tkx18FWoepIo9kvA",
  authDomain: "react-native-social-a8457.firebaseapp.com",
  databaseURL: "URL",
  projectId: "react-native-social-a8457",
  storageBucket: "react-native-social-a8457.appspot.com",
  messagingSenderId: "449206417684",
  appId: "1:449206417684:web:b5f88394d50bdbeb1caa01",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
