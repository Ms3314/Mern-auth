// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-1c6d8.firebaseapp.com",
  projectId: "mern-auth-1c6d8",
  storageBucket: "mern-auth-1c6d8.appspot.com",
  messagingSenderId: "312459296685",
  appId: "1:312459296685:web:3b9c0756dc4f5e5bc8ab24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);