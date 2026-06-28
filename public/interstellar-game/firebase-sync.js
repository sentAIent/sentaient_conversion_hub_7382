import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBTZveJffu2Ed33hhU_G025FVMedIKyg28",
    authDomain: "mindwave-binaural-beats.firebaseapp.com",
    projectId: "mindwave-binaural-beats",
    storageBucket: "mindwave-binaural-beats.firebasestorage.app",
    messagingSenderId: "281133643186",
    appId: "1:281133643186:web:f61fb74e2fcf4cc4e660ab",
    measurementId: "G-TENPZ98XDX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

window.logGameEvent = function(eventName, params = {}) {
    try {
        logEvent(analytics, eventName, params);
        console.log(`📊 Analytics Event: ${eventName}`, params);
    } catch(e) {
        console.error("Analytics Error:", e);
    }
};

// Keys we care about syncing to the cloud
const SYNC_KEYS = ['playerGems', 'unlockedShips', 'playerShipType', 'playerCredits'];
let currentUid = null;
let isPumpingFromCloud = false;

// 1. Intercept localStorage.setItem
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    
    // Push to firebase if it's a tracked key and we aren't currently reading FROM the cloud
    if (currentUid && !isPumpingFromCloud && SYNC_KEYS.includes(key)) {
        try {
            // Safe JSON parse if applicable
            let parsedValue = value;
            try { parsedValue = JSON.parse(value); } catch(e) {}
            
            const docRef = doc(db, "interstellar_saves", currentUid);
            setDoc(docRef, { [key]: parsedValue }, { merge: true })
                .catch(err => console.error("Firebase Sync Error:", err));
        } catch(e) {}
    }
};

// 2. Auth & Load logic
onAuthStateChanged(auth, async (user) => {
    const authStatusText = document.getElementById('authStatusText');
    const authUserEmail = document.getElementById('authUserEmail');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const loggedInContainer = document.getElementById('loggedInContainer');

    if (user && !user.isAnonymous) {
        currentUid = user.uid;
        console.log("🚀 Firebase Sync: Authenticated as", user.email);
        
        if (authStatusText) authStatusText.textContent = 'Authenticated';
        if (authStatusText) authStatusText.style.color = '#00ffaa';
        if (authUserEmail) authUserEmail.textContent = user.email;
        if (loginFormContainer) loginFormContainer.classList.add('hidden');
        if (loggedInContainer) loggedInContainer.classList.remove('hidden');

        // Listen to cloud save for live web-purchase updates (Monetization Sync)
        try {
            const docRef = doc(db, "interstellar_saves", currentUid);
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    isPumpingFromCloud = true; // prevent infinite loops
                    let needsUpdate = false;
                    
                    SYNC_KEYS.forEach(key => {
                        if (data[key] !== undefined) {
                            const valToSave = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key].toString();
                            // Only update if it changed
                            if (localStorage.getItem(key) !== valToSave) {
                                originalSetItem.call(localStorage, key, valToSave);
                                needsUpdate = true;
                            }
                        }
                    });
                    isPumpingFromCloud = false;
                    
                    // If the game is already running, we need to poke it to refresh state
                    if (needsUpdate && window.game) {
                        window.game.playerGems = parseInt(localStorage.getItem('playerGems')) || 0;
                        window.game.credits = parseInt(localStorage.getItem('playerCredits')) || 0;
                        window.game.unlockedShips = JSON.parse(localStorage.getItem('unlockedShips')) || ['interceptor', 'hauler', 'orion', 'draco', 'phoenix'];
                        window.game.playerShipType = localStorage.getItem('playerShipType') || 'interceptor';
                        
                        if (typeof window.game.updateGemsDisplay === 'function') {
                            window.game.updateGemsDisplay();
                        }
                        
                        const creditsEl = document.getElementById('walletValue');
                        if (creditsEl) creditsEl.textContent = window.game.credits.toLocaleString();
                        const creditsDisplay = document.getElementById('creditsDisplay');
                        if (creditsDisplay) creditsDisplay.textContent = '$' + window.game.credits.toLocaleString();
                        
                        // If the ship hangar is currently open, refresh it
                        const shipModal = document.getElementById('shipModal');
                        if (shipModal && shipModal.classList.contains('active') && typeof window.game.showShipModal === 'function') {
                            window.game.showShipModal();
                        }
                        
                        console.log("✅ Firebase Sync: Cloud state synchronized into game (Live Web Purchase Check).");
                    }
                }
            }, (err) => {
                console.error("Firebase Live Sync Error:", err);
                isPumpingFromCloud = false;
            });
        } catch (err) {
            console.error("Firebase Sync Setup Error:", err);
            isPumpingFromCloud = false;
        }
    } else {
        // Not signed in — stay as guest, no anonymous auth attempt
        currentUid = null;
        if (authStatusText) authStatusText.textContent = 'Guest Mode';
        if (authStatusText) authStatusText.style.color = '#ffaa00';
        if (loginFormContainer) loginFormContainer.classList.remove('hidden');
        if (loggedInContainer) loggedInContainer.classList.add('hidden');
    }
});

// 3. Leaderboards API & Auth API
window.firebaseSync = {
    async registerUser(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (window.app && window.app.showToast) window.app.showToast('Registration Successful!', 2000);
            return true;
        } catch (e) {
            console.error(e);
            if (window.app && window.app.showToast) window.app.showToast('Registration Error: ' + e.message, 3000);
            return false;
        }
    },
    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (window.app && window.app.showToast) window.app.showToast('Login Successful!', 2000);
            return true;
        } catch (e) {
            console.error(e);
            if (window.app && window.app.showToast) window.app.showToast('Login Error: ' + e.message, 3000);
            return false;
        }
    },
    async logoutUser() {
        try {
            await signOut(auth);
            if (window.app && window.app.showToast) window.app.showToast('Logged Out', 2000);
        } catch (e) {
            console.error(e);
        }
    },
    async submitHighScore(callsign, score) {
        if (!currentUid) return false;
        try {
            const docRef = doc(db, "leaderboards", currentUid);
            // Overwrite doc, updating timestamp
            await setDoc(docRef, {
                uid: currentUid,
                callsign: callsign || "Anonymous",
                highScore: score,
                timestamp: Date.now()
            }, { merge: true });
            return true;
        } catch (e) {
            console.error("Leaderboard Submit Error:", e);
            return false;
        }
    },
    
    async getTopScores(maxScores = 50) {
        try {
            const q = query(collection(db, "leaderboards"), orderBy("highScore", "desc"), limit(maxScores));
            const querySnapshot = await getDocs(q);
            const scores = [];
            querySnapshot.forEach((d) => {
                scores.push(d.data());
            });
            return scores;
        } catch (e) {
            console.error("Leaderboard Fetch Error:", e);
            return [];
        }
    }
};
