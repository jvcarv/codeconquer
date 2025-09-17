// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqIyHD_Wil_BfWAV0EwFWhAKvztApiC5U",
  authDomain: "codeconquer-3ece7.firebaseapp.com",
  projectId: "codeconquer-3ece7",
  storageBucket: "codeconquer-3ece7.firebasestorage.app",
  messagingSenderId: "264751455508",
  appId: "1:264751455508:web:939118184eec061689f601",
  measurementId: "G-1M7XKMFLQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };