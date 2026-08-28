import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// Silence Firestore network warnings since we're often running offline or without proper backend
setLogLevel('silent');

import { env } from './env.js';

// Firebase configuration using Zod validated environment variables
const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "mindwave-binaural-beats.firebaseapp.com",
    projectId: env.VITE_FIREBASE_PROJECT_ID || "mindwave-binaural-beats",
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "mindwave-binaural-beats.firebasestorage.app",
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "281133643186",
    appId: env.VITE_FIREBASE_APP_ID || "1:281133643186:web:f61fb74e2fcf4cc4e660ab",
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-XZNENWWFQG"
};

// Initialize Firebase safely to prevent app crashes on invalid config
let app;
let auth;
let db;
let analytics = null;

try {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    auth = getAuth(app);
    db = getFirestore(app);
    
    // Only initialize analytics on the client side and if a measurement ID is provided
    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
    }

    // Initialize Firebase App Check with reCAPTCHA Enterprise
    if (typeof window !== "undefined") {
        initializeAppCheck(app, {
            provider: new ReCaptchaEnterpriseProvider(env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_ENTERPRISE_SITE_KEY_HERE'),
            isTokenAutoRefreshEnabled: true
        });
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { auth, db, analytics };
export default app;
