/**
 * Presence Service
 * Handles real-time Social Pulse by tracking active sessions in Firestore.
 */

import { state } from '../state.js';
import { db, doc, setDoc, deleteDoc, collection, onSnapshot, query, where, serverTimestamp } from './firebase.js';

let heartbeatInterval = null;
let currentSessionId = null;
let unsubscribeCounts = null;

/**
 * Starts the presence heartbeat.
 * Updates Firestore every 60 seconds with current state.
 */
export function startPresenceHeartbeat() {
    if (heartbeatInterval) stopPresenceHeartbeat();

    // Generate a unique session ID for this tab/instance
    currentSessionId = `session_${Math.random().toString(36).substr(2, 9)}`;

    const updatePresence = async () => {
        if (!db) return; // Skip if in mock mode or not initialized

        try {
            const docRef = doc(db, 'presence_sessions', currentSessionId);
            await setDoc(docRef, {
                uid: state.currentUser ? state.currentUser.uid : 'anonymous',
                preset: state.activePresetType || 'none',
                lastActive: serverTimestamp(),
                status: 'active'
            });
        } catch (e) {
            console.warn('[Presence] Heartbeat failed:', e);
        }
    };

    // Initial update
    updatePresence();

    // Heartbeat every 60s
    heartbeatInterval = setInterval(updatePresence, 60000);

    // Cleanup on window close
    window.addEventListener('beforeunload', stopPresenceHeartbeat);
}

/**
 * Stops the presence heartbeat and removes the session.
 */
export async function stopPresenceHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }

    if (currentSessionId && db) {
        try {
            const docRef = doc(db, 'presence_sessions', currentSessionId);
            await deleteDoc(docRef);
        } catch (e) {
            console.warn('[Presence] Cleanup failed:', e);
        }
        currentSessionId = null;
    }

    window.removeEventListener('beforeunload', stopPresenceHeartbeat);
}

/**
 * Listens for active session counts.
 * @param {Function} callback - Called with { total, byPreset: { alpha, beta, etc. } }
 */
export function subscribeToPresenceCounts(callback) {
    if (!db) {
        // Mock data for demo/mock mode
        setTimeout(() => callback({ total: 42, byPreset: { alpha: 12, beta: 8, gamma: 5, delta: 10, theta: 7 } }), 1000);
        return () => { };
    }

    if (unsubscribeCounts) unsubscribeCounts();

    const q = query(collection(db, 'presence_sessions'), where('status', '==', 'active'));

    unsubscribeCounts = onSnapshot(q, (snapshot) => {
        const counts = {
            total: snapshot.size,
            byPreset: {}
        };

        snapshot.forEach(doc => {
            const data = doc.data();
            const preset = data.preset || 'none';
            counts.byPreset[preset] = (counts.byPreset[preset] || 0) + 1;
        });

        callback(counts);
    }, (error) => {
        console.error('[Presence] Subscription failed:', error);
    });

    return unsubscribeCounts;
}
