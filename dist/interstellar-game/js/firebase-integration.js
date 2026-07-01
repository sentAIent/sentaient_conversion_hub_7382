import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updatePassword, deleteUser } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const fallbackConfig = {
    apiKey: "dummy-api-key",
    authDomain: "dummy",
    projectId: "dummy",
    storageBucket: "dummy",
    messagingSenderId: "0000",
    appId: "1:0000:web:0000"
};

if (typeof window.__firebase_config === 'undefined') {
    window.__firebase_config = JSON.stringify(fallbackConfig);
}

const firebaseConfig = JSON.parse(window.__firebase_config || '{}');
let app = null, auth = null, db = null;
if (Object.keys(firebaseConfig).length > 0) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (e) {
        console.warn("Firebase initialization failed:", e);
    }
} else {
    console.warn("No Firebase configuration found. Firebase features will be disabled.");
}

const showMsg = (msg) => {
    if (window.app && typeof window.app.showToast === 'function') {
        window.app.showToast(msg, 4000);
    } else {
        alert(msg);
    }
};

window.dbSync = {
    currentUser: null,
    _saveTimeout: null,
    _lastSavedDataStr: null,
    cloudSyncDisabled: true, // Disable by default if no config
    analyticsOptOut: localStorage.getItem('analyticsOptOut') === 'true',
    
    init: async function() {
        if (!auth || !db) return; // Skip if Firebase is not initialized
        // --- 1. Geoblocking for China (PIPL Compliance) ---
        try {
            const geoRes = await fetch('https://get.geojs.io/v1/ip/country.json');
            const geoData = await geoRes.json();
            if (geoData.country === 'CN' || geoData.country === 'China') {
                console.warn("[PIPL] Cloud Sync Disabled for CN region");
                this.cloudSyncDisabled = true;
            }
        } catch(e) {
            console.warn("Geocheck failed, defaulting to active sync if opted in");
        }

        // --- 2. Auth State Listener ---
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.currentUser = user;
                console.log("[Firebase] User logged in:", user.email);
                document.getElementById('authStatusText').innerText = `Logged in as ${user.email}`;
                document.getElementById('loginBtn').style.display = 'none';
                document.getElementById('accountBtn').style.display = 'inline-block';
                document.getElementById('logoutBtn').style.display = 'inline-block';
                
                // Load save data immediately
                this.loadData();
                
                // Start auto-save loop
                if (this._autoSaveInterval) clearInterval(this._autoSaveInterval);
                this._autoSaveInterval = setInterval(() => {
                    this.saveData();
                }, 15000);
            } else {
                console.log("[Firebase] User logged out");
                this.currentUser = null;
                document.getElementById('authStatusText').innerText = "Not logged in";
                document.getElementById('loginBtn').style.display = 'inline-block';
                document.getElementById('logoutBtn').style.display = 'none';
                const accBtn = document.getElementById('accountBtn');
                if (accBtn) accBtn.style.display = 'none';
                
                if (this._autoSaveInterval) clearInterval(this._autoSaveInterval);
            }
        });
    },

    login: async function(email, password) {
        if (this.cloudSyncDisabled) return showMsg("Notice: Due to regional data regulations, cloud saving is disabled in your area. Please continue playing locally in your browser!");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showMsg("Login successful!");
            document.getElementById('authModal').classList.add('hidden');
        } catch (e) {
            showMsg("Login failed: " + e.message);
        }
    },

    register: async function(email, password, username) {
        if (this.cloudSyncDisabled) return showMsg("Notice: Due to regional data regulations, cloud saving is disabled in your area. Please continue playing locally in your browser!");
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (username) {
                await updateProfile(cred.user, { displayName: username });
            }
            // Initialize basic profile in firestore
            await setDoc(doc(db, "interstellar_users", cred.user.uid), {
                username: username,
                createdAt: serverTimestamp(),
                gems: 0,
                highestScore: 0
            }, { merge: true });

            showMsg("Registration successful!");
            document.getElementById('authModal').classList.add('hidden');
        } catch (e) {
            showMsg("Registration failed: " + e.message);
        }
    },

    logout: async function() {
        try {
            await signOut(auth);
            showMsg("Logged out successfully");
            // Reset local game state if needed
        } catch (e) {
            console.error(e);
        }
    },

    saveData: function() {
        if (!this.currentUser) return;
        if (!window.game) return;
        
        if (this._saveTimeout) clearTimeout(this._saveTimeout);
        this._saveTimeout = setTimeout(async () => {
            const saveData = {
                gems: window.game.credits || 0,
                selectedShipId: window.game.selectedShipId || 0,
                unlockedShips: Array.from(window.game.unlockedShips || [0]),
                lastSaved: serverTimestamp()
            };

            // Avoid unnecessary writes if data hasn't changed
            const dataStr = JSON.stringify({
                g: saveData.gems, s: saveData.selectedShipId, u: saveData.unlockedShips
            });
            if (this._lastSavedDataStr === dataStr) return;

            try {
                await setDoc(doc(db, "interstellar_users", this.currentUser.uid), saveData, { merge: true });
                this._lastSavedDataStr = dataStr;
                console.log("[Firebase] Progress auto-saved.");
                
                // Show tiny toast
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.innerText = "Cloud Save Complete";
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 2000);
                }
            } catch (e) {
                console.error("[Firebase] Error saving progress", e);
            }
        }, 1000); // 1 second debounce
    },

    loadData: async function() {
        if (!this.currentUser) return;
        try {
            const docSnap = await getDoc(doc(db, "interstellar_users", this.currentUser.uid));
            if (docSnap.exists() && window.game) {
                const data = docSnap.data();
                console.log("[Firebase] Loaded data:", data);
                
                if (data.gems !== undefined) window.game.credits = data.gems;
                if (data.selectedShipId !== undefined) window.game.selectedShipId = data.selectedShipId;
                if (data.unlockedShips) window.game.unlockedShips = new Set(data.unlockedShips);
                
                // Update UI visually if hangar is open
                const bal = document.getElementById('hangarGemBalance');
                if (bal) bal.innerText = window.game.credits;
                const wallet = document.getElementById('walletValue');
                if (wallet) wallet.innerText = "$" + window.game.credits;
            }
        } catch (e) {
            console.error("[Firebase] Error loading progress", e);
        }
    },

    submitScore: async function(score) {
        if (!this.currentUser || score <= 0) return;
        try {
            // First update personal best
            const docSnap = await getDoc(doc(db, "interstellar_users", this.currentUser.uid));
            let highest = 0;
            if (docSnap.exists() && docSnap.data().highestScore) {
                highest = docSnap.data().highestScore;
            }
            if (score > highest) {
                await setDoc(doc(db, "interstellar_users", this.currentUser.uid), { highestScore: score }, { merge: true });
            }

            // Then add to global leaderboard collection
            await addDoc(collection(db, "interstellar_leaderboard"), {
                uid: this.currentUser.uid,
                username: this.currentUser.displayName || this.currentUser.email.split('@')[0],
                score: score,
                date: serverTimestamp()
            });
            console.log("[Firebase] Score submitted!");
        } catch (e) {
            console.error("[Firebase] Error submitting score", e);
        }
    },

    getLeaderboard: async function() {
        try {
            const q = query(collection(db, "interstellar_leaderboard"), orderBy("score", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push(doc.data());
            });
            return results;
        } catch (e) {
            console.error("[Firebase] Error fetching leaderboard", e);
            return [];
        }
    },

    changePassword: async function(newPassword) {
        if (!this.currentUser) return;
        try {
            await updatePassword(this.currentUser, newPassword);
            showMsg("Password updated successfully!");
        } catch (e) {
            showMsg("Error updating password: " + e.message + ". You may need to log out and log back in first.");
        }
    },

    downloadUserData: async function() {
        if (!this.currentUser) return showMsg("You must be logged in to download your data.");
        try {
            const userRef = doc(db, "users", this.currentUser.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                data.email = this.currentUser.email;
                data.exportDate = new Date().toISOString();
                
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `interstellar_gdpr_export_${this.currentUser.uid}.json`;
                a.click();
                URL.revokeObjectURL(url);
            } else {
                showMsg("No cloud data found for your account.");
            }
        } catch(e) {
            console.error("GDPR Download Error:", e);
            showMsg("Failed to download data: " + e.message);
        }
    },

    deleteData: async function() {
        if (!this.currentUser) return;
        const confirmDelete = confirm("Are you sure you want to delete all your saved game data? This cannot be undone.");
        if (confirmDelete) {
            try {
                // Delete user's document in interstellar_users
                await deleteDoc(doc(db, "interstellar_users", this.currentUser.uid));
                
                // Reset local game state
                if (window.game) {
                    window.game.credits = 0;
                    window.game.unlockedShips = new Set([0]);
                    window.game.selectedShipId = 0;
                    const bal = document.getElementById('hangarGemBalance');
                    if (bal) bal.innerText = "0";
                    const wallet = document.getElementById('walletValue');
                    if (wallet) wallet.innerText = "$0";
                }
                showMsg("Game data deleted and reset to zero.");
            } catch (e) {
                showMsg("Error deleting data: " + e.message);
            }
        }
    },

    deleteAccount: async function() {
        if (!this.currentUser) return;
        const confirmDelete = confirm("Are you ABSOLUTELY sure you want to delete your entire account? You will lose all access and data permanently.");
        if (confirmDelete) {
            try {
                // First attempt to delete user data
                await deleteDoc(doc(db, "interstellar_users", this.currentUser.uid));
                // Then delete the user from Auth
                await deleteUser(this.currentUser);
                showMsg("Account deleted successfully.");
            } catch (e) {
                showMsg("Error deleting account: " + e.message + ". You may need to log out and log back in to verify your identity before deleting.");
            }
        }
    }
};

// --- COMPLIANCE MODAL LOGIC ---
window.acceptCompliance = function(isOver13) {
    if (!isOver13) {
        // Underage: Block cloud sync per COPPA/GDPR-K
        window.dbSync.cloudSyncDisabled = true;
        showMsg("Due to age restrictions, cloud saving and leaderboards have been disabled. You can still play locally in your browser.");
    }
    localStorage.setItem('complianceAccepted', 'true');
    document.getElementById('complianceModal').classList.add('hidden');
};

window.toggleAnalytics = function() {
    window.dbSync.analyticsOptOut = !window.dbSync.analyticsOptOut;
    localStorage.setItem('analyticsOptOut', window.dbSync.analyticsOptOut);
    showMsg(window.dbSync.analyticsOptOut ? "Analytics tracking disabled (Opted-Out)." : "Analytics tracking enabled.");
};

window.addEventListener('DOMContentLoaded', () => {
    window.dbSync.init();
    
    // Show compliance modal on first visit
    if (!localStorage.getItem('complianceAccepted')) {
        const complianceModal = document.getElementById('complianceModal');
        if (complianceModal) complianceModal.classList.remove('hidden');
    }
});

window.populateLeaderboard = async function() {
    const list = document.getElementById('leaderboardList');
    if (!list) return;
    list.innerHTML = '<div style="text-align:center; color:#aaa;">Loading...</div>';
    
    const results = await window.dbSync.getLeaderboard();
    list.innerHTML = '';
    
    if (results.length === 0) {
        list.innerHTML = '<div style="text-align:center; color:#aaa;">No scores yet!</div>';
        return;
    }
    
    results.forEach((r, idx) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.padding = '5px 10px';
        item.style.background = 'rgba(255,255,255,0.05)';
        item.style.borderRadius = '4px';
        
        let color = '#fff';
        if (idx === 0) color = '#ffd700';
        else if (idx === 1) color = '#c0c0c0';
        else if (idx === 2) color = '#cd7f32';
        
        item.innerHTML = `
            <span style="color: ${color}; font-weight: bold;">#${idx+1} ${r.username || 'Unknown'}</span>
            <span style="color: #00ff88;">${r.score.toLocaleString()}</span>
        `;
        list.appendChild(item);
    });
};
