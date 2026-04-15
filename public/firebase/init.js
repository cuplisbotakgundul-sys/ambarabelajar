// firebase/init.js
// Inisialisasi Firebase — ganti dengan config project Firebase kamu

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ─── GANTI DENGAN CONFIG FIREBASE KAMU ───
// Dapatkan di: Firebase Console → Project Settings → Your Apps → Web App
const firebaseConfig = {
  apiKey: "AIzaSyBnEg1ApHZlCaBDbmr48Q_QoJzvv8eginc",
  authDomain: "ambarabelajar.firebaseapp.com",
  projectId: "ambarabelajar",
  storageBucket: "ambarabelajar.firebasestorage.app",
  messagingSenderId: "533541862595",
  appId: "1:533541862595:web:d49a01936628858ed47676"
};
// ─────────────────────────────────────────

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Expose ke global agar app.js bisa akses
window.fbAuth   = auth;
window.fbDb     = db;
window.fbGoogle = googleProvider;
window.fbFns    = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  // Firestore
  doc, setDoc, getDoc, updateDoc, serverTimestamp
};

console.log("[RuangGuru] Firebase initialized ✓");
