// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAswlAj7LM-YBq-waf3rN1pxhAC30e6YFY",
  authDomain: "news-app-f5122.firebaseapp.com",
  projectId: "news-app-f5122",
  storageBucket: "news-app-f5122.appspot.com",
  messagingSenderId: "729778074063",
  appId: "1:729778074063:web:134bf29dd013512e6b22ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
