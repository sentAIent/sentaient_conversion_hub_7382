import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration using Vite environment variables
// Replace placeholder values in your .env file
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDTEnS905pW-zSEdZ4g8LOJv1DlS3e2GpI",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "icebreaker-6fb93.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "icebreaker-6fb93",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "icebreaker-6fb93.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "841168412781",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:841168412781:web:aa33e0526665907ce99f64",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase safely to prevent app crashes on invalid config
let app: any;
let auth: any;
let db: any;
let analytics: any = null;

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
