// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcQurVhuTXaVBfVoCwMOHHzbRWSIlzMmE",
  authDomain: "netflixgpt-e1c37.firebaseapp.com",
  projectId: "netflixgpt-e1c37",
  storageBucket: "netflixgpt-e1c37.firebasestorage.app",
  messagingSenderId: "579720228463",
  appId: "1:579720228463:web:dde1c52cb3e4db99d0279a",
  measurementId: "G-26CTL21L1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// console.log(ana);
export const auth = getAuth();
