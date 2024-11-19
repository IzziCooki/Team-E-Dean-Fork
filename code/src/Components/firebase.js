// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_fb9nnNLRLkNcpTS9dGUcd2N9FdTpYAc",
  authDomain: "team-e-life-habitat.firebaseapp.com",
  projectId: "team-e-life-habitat",
  storageBucket: "team-e-life-habitat.firebasestorage.app",
  messagingSenderId: "1074075320326",
  appId: "1:1074075320326:web:edcab37cf0cdcb29438387",
  measurementId: "G-PGKDHQ0DTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
export default app;