import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { initializeFirestore, getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// ============================================================================
// FIREBASE CONFIGURATION
// Production config for glockmedia-731bb
// ============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyAt0yOgEi6FWAnu1oidChgKvMpJEuAaYiU",
  authDomain: "glockmedia-731bb.firebaseapp.com",
  projectId: "glockmedia-731bb",
  storageBucket: "glockmedia-731bb.firebasestorage.app",
  messagingSenderId: "629625114402",
  appId: "1:629625114402:web:7a557095cd0b2f4f2c5f7b",
  measurementId: "G-QV94JY7GVN"
};

const app = initializeApp(firebaseConfig);

// ============================================================================
// DATABASE & STORAGE INITIALIZATION
// ============================================================================
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

