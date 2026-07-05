import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration using Vite environment variables
// Replace placeholder values in your .env file
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mindwave-binaural-beats.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindwave-binaural-beats",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mindwave-binaural-beats.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "281133643186",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:281133643186:web:f61fb74e2fcf4cc4e660ab",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TENPZ98XDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics = null;

// Only initialize analytics on the client side and if a measurement ID is provided
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
}

export { auth, db, analytics };
export default app;
