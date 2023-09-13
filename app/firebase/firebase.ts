// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-BeCg04N53Zv63hSz8LPK8FpCrVsd5_g",
  authDomain: "spotify-506ea.firebaseapp.com",
  projectId: "spotify-506ea",
  storageBucket: "spotify-506ea.appspot.com",
  messagingSenderId: "194762501631",
  appId: "1:194762501631:web:ff1f6de6103005eb46cbca",
  measurementId: "G-YS2V9MN191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

