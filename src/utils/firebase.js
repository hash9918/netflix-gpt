// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBve1jV7gKIO60Hjum6IBfcP2S2rCKLCCk",
  authDomain: "nextflixgpt-c9a99.firebaseapp.com",
  projectId: "nextflixgpt-c9a99",
  storageBucket: "nextflixgpt-c9a99.appspot.com",
  messagingSenderId: "848084092919",
  appId: "1:848084092919:web:8c487afbefee40162110f2",
  measurementId: "G-HY697LTEZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
