import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Silence Firestore network warnings since we're often running offline or without proper backend
setLogLevel('silent');

// Firebase configuration using Vite environment variables
// Replace placeholder values in your .env file
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mindwave-binaural-beats.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindwave-binaural-beats",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mindwave-binaural-beats.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "281133643186",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:281133643186:web:f61fb74e2fcf4cc4e660ab",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XZNENWWFQG"
};

// Initialize Firebase safely to prevent app crashes on invalid config
let app;
let auth;
let db;
let analytics = null;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Only initialize analytics on the client side and if a measurement ID is provided
    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { auth, db, analytics };
export default app;
