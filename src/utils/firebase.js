// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc3KnI2r9gklq9couLLUb-h9qs7dZE6o4",
  authDomain: "netflixgpt-78fe0.firebaseapp.com",
  projectId: "netflixgpt-78fe0",
  storageBucket: "netflixgpt-78fe0.firebasestorage.app",
  messagingSenderId: "790621827706",
  appId: "1:790621827706:web:c1b0942f87f8b7f834c1c3",
  measurementId: "G-GXDCE5WVFP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
