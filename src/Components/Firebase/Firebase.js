// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbP9QvB2D8ppHDG8VvRW2CD7xPc8LV4l4",
  authDomain: "coffee-store-78635.firebaseapp.com",
  projectId: "coffee-store-78635",
  storageBucket: "coffee-store-78635.firebasestorage.app",
  messagingSenderId: "425453917098",
  appId: "1:425453917098:web:173b1238deeeee32dbd1d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);