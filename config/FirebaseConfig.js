// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAvYooamcN6Q59QFw04zkpB9e_Evee-0c",
  authDomain: "projects-598d2.firebaseapp.com",
  projectId: "projects-598d2",
  storageBucket: "projects-598d2.appspot.com",
  messagingSenderId: "911807641777",
  appId: "1:911807641777:web:d59cc5ea8ccd93b7af8a90",
  measurementId: "G-CC8W447CCZ"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
