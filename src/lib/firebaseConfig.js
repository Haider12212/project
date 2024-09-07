// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd8JmDVaLBtSSE--SJGo-GtvahJMGE2NA",
  authDomain: "projecthack-9fd9d.firebaseapp.com",
  projectId: "projecthack-9fd9d",
  storageBucket: "projecthack-9fd9d.appspot.com",
  messagingSenderId: "756928053079",
  appId: "1:756928053079:web:e93e8ff697b3a41e858812"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
