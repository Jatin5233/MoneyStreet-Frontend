// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrZAIaT5OuIL2dHQ9N8XwUHKmo5mz_Q7s",
  authDomain: "moneystreet-9dedf.firebaseapp.com",
  projectId: "moneystreet-9dedf",
  storageBucket: "moneystreet-9dedf.firebasestorage.app",
  messagingSenderId: "887871111791",
  appId: "1:887871111791:web:1a3022811706f1aca8039a",
  measurementId: "G-FJ4ZTCYEQD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
