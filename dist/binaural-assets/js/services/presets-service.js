/**
 * Presets Service
 * Handles fetching and syncing binaural presets and user-saved mixes from Firestore.
 */

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';
import { PRESET_COMBOS, SOUNDSCAPES } from '../state.js';

const PRESETS_COLLECTION = 'global_presets';
const SOUNDSCAPES_COLLECTION = 'global_soundscapes';
const PUBLIC_GALLERY_COLLECTION = 'public_gallery';

/**
 * Fetch all global preset combos from Firestore
 * Fallback to hardcoded state.js if offline or empty
 */
export async function getCloudPresets() {
    try {
        const db = getFirestore();
        if (!db) throw new Error("Firebase not ready");

        const q = query(collection(db, PRESETS_COLLECTION), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('[Presets] Cloud registry empty, using local defaults');
            return PRESET_COMBOS;
        }

        const cloudPresets = [];
        snapshot.forEach(doc => {
            cloudPresets.push({ id: doc.id, ...doc.data() });
        });

        return cloudPresets;
    } catch (err) {
        console.warn('[Presets] Cloud fetch failed, using local fallback:', err.message);
        return PRESET_COMBOS;
    }
}

/**
 * Fetch all available soundscapes from Firestore
 * Fallback to hardcoded state.js
 */
export async function getCloudSoundscapes() {
    try {
        const db = getFirestore();
        if (!db) return SOUNDSCAPES;

        const snapshot = await getDocs(collection(db, SOUNDSCAPES_COLLECTION));
        if (snapshot.empty) return SOUNDSCAPES;

        const cloudSounds = [];
        snapshot.forEach(doc => {
            cloudSounds.push({ id: doc.id, ...doc.data() });
        });

        return cloudSounds;
    } catch (err) {
        return SOUNDSCAPES;
    }
}

/**
 * Sync Local Storage mixes to Firestore for a logged-in user
 */
export async function syncLocalMixesToCloud(user) {
    if (!user) return;

    try {
        const localMixes = JSON.parse(localStorage.getItem('mindwave_library') || '[]');
        if (localMixes.length === 0) return;

        const db = getFirestore();
        const userMixesRef = collection(db, 'users', user.uid, 'mixes');

        console.log(`[Presets] Syncing ${localMixes.length} local mixes to cloud...`);

        // Batch set docs (simplified)
        for (const mix of localMixes) {
            const mixId = mix.id || `mix_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
            await setDoc(doc(userMixesRef, mixId), {
                ...mix,
                updatedAt: serverTimestamp(),
                syncSource: 'local_migration'
            }, { merge: true });
        }

        // Clear local storage migration flag
        localStorage.setItem('mindwave_mixes_synced', 'true');
        console.log('[Presets] Cloud sync complete.');
    } catch (err) {
        console.error('[Presets] Local-to-cloud sync failed:', err);
    }
}
