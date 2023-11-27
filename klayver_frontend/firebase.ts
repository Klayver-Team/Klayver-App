// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgW6TZY6LbkVvUmsyA9YIVbrbzTKTf8l8",
  authDomain: "klayver-e7c4c.firebaseapp.com",
  projectId: "klayver-e7c4c",
  storageBucket: "klayver-e7c4c.appspot.com",
  messagingSenderId: "897791988749",
  appId: "1:897791988749:web:68a5ee0da75f43e0d97144",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
