/**
 * Storage Manager — Unified Storage Facade
 * 
 * Coordinates between MediaVault (local IndexedDB) and Firebase Storage (cloud).
 * Provides a single API surface for saving, listing, and managing media assets.
 * 
 * Usage:
 *   import { saveMedia, getMediaList, deleteMedia } from './storage-manager.js';
 *   const record = await saveMedia('screenshot', blob, { preset: 'Alpha Waves' });
 */

import {
    initVault,
    saveAsset,
    getAsset,
    listAssets,
    deleteAsset,
    updateAssetSync,
    getStorageUsage,
    getQuotaEstimate,
    countAssets,
    createAssetURL,
    getThumbnail,
    formatBytes,
    pruneOldAssets
} from './media-vault.js';

import { getCurrentUser } from './firebase.js';

// =========================================================================
// INITIALIZATION
// =========================================================================

let initialized = false;

/**
 * Initialize the storage system. Safe to call multiple times.
 */
export async function initStorage() {
    if (initialized) return;
    try {
        await initVault();
        initialized = true;
        console.log('[StorageManager] Initialized');
    } catch (e) {
        console.error('[StorageManager] Init failed:', e);
    }
}

// =========================================================================
// SAVE MEDIA
// =========================================================================

/**
 * Save a media asset. Persists locally first, then queues cloud upload if authenticated.
 * 
 * @param {'screenshot'|'video'|'audio-export'|'session-recording'} type
 * @param {Blob} blob
 * @param {Object} metadata - Flexible metadata (preset, duration, dimensions, etc.)
 * @returns {Promise<Object>} Saved asset record (metadata-only, no blob)
 */
export async function saveMedia(type, blob, metadata = {}) {
    await initStorage();

    // Save locally to IndexedDB
    const record = await saveAsset(type, blob, metadata);

    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('mediavault:saved', { detail: record }));

    // Queue cloud upload if user is logged in
    const user = getCurrentUser();
    if (user && !user.isAnonymous) {
        scheduleCloudSync(record.id).catch(e => {
            console.warn('[StorageManager] Cloud sync scheduling failed:', e);
        });
    }

    // Check storage health
    checkStorageHealth();

    return record;
}

// =========================================================================
// RETRIEVE MEDIA
// =========================================================================

/**
 * Get a paginated list of saved media assets.
 * Returns metadata-only records (efficient for gallery rendering).
 * 
 * @param {string} [type] - Filter by type, or null for all
 * @param {number} [limit=50]
 * @param {number} [offset=0]
 * @returns {Promise<Array>}
 */
export async function getMediaList(type = null, limit = 50, offset = 0) {
    await initStorage();
    return listAssets(type, limit, offset);
}

/**
 * Get a single media asset with its full blob data.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getMedia(id) {
    await initStorage();
    return getAsset(id);
}

/**
 * Create a temporary object URL for a media asset's blob.
 * Caller must revoke via URL.revokeObjectURL() when done.
 * @param {string} id
 * @returns {Promise<string|null>}
 */
export async function getMediaURL(id) {
    await initStorage();
    return createAssetURL(id);
}

/**
 * Get the thumbnail blob URL for a media asset.
 * @param {string} id
 * @returns {Promise<string|null>} Object URL (caller must revoke)
 */
export async function getMediaThumbnail(id) {
    await initStorage();
    const thumb = await getThumbnail(id);
    return thumb ? URL.createObjectURL(thumb) : null;
}

// =========================================================================
// DELETE MEDIA
// =========================================================================

/**
 * Delete a media asset from local storage and (optionally) cloud.
 * @param {string} id
 * @param {boolean} [deleteFromCloud=true]
 */
export async function deleteMedia(id, deleteFromCloud = true) {
    await initStorage();

    // Get asset first to check cloud status
    const asset = await getAsset(id);
    if (!asset) {
        console.warn('[StorageManager] Asset not found for deletion:', id);
        return;
    }

    // Delete from Firebase Storage if synced
    if (deleteFromCloud && asset.cloudUrl && asset.syncStatus === 'synced') {
        try {
            await deleteFromFirebaseStorage(asset);
        } catch (e) {
            console.warn('[StorageManager] Cloud deletion failed (continuing local delete):', e);
        }
    }

    // Delete locally
    await deleteAsset(id);

    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('mediavault:deleted', { detail: { id } }));
}

// =========================================================================
// CLOUD SYNC
// =========================================================================

/**
 * Upload one asset to Firebase Storage.
 * Updates the local record with the download URL on success.
 * @param {string} assetId
 */
async function scheduleCloudSync(assetId) {
    try {
        const asset = await getAsset(assetId);
        if (!asset || asset.syncStatus === 'synced') return;

        // Mark as syncing
        await updateAssetSync(assetId, { syncStatus: 'syncing' });

        const user = getCurrentUser();
        if (!user) {
            await updateAssetSync(assetId, { syncStatus: 'local' });
            return;
        }

        // Dynamic import to avoid loading Firebase Storage unless needed
        const { storage, ref, uploadBytes, getDownloadURL } = await getFirebaseStorageRefs();
        if (!storage) {
            await updateAssetSync(assetId, { syncStatus: 'failed' });
            return;
        }

        const storagePath = `users/${user.uid}/media/${asset.type}/${assetId}`;
        const storageRef = ref(storage, storagePath);

        // Upload with metadata
        const uploadMetadata = {
            contentType: asset.blob.type,
            customMetadata: {
                type: asset.type,
                createdAt: String(asset.createdAt),
                preset: asset.metadata?.preset || '',
                size: String(asset.size)
            }
        };

        await uploadBytes(storageRef, asset.blob, uploadMetadata);
        const downloadUrl = await getDownloadURL(storageRef);

        // Update local record
        await updateAssetSync(assetId, {
            cloudUrl: downloadUrl,
            syncStatus: 'synced'
        });

        console.log(`[StorageManager] Cloud sync complete: ${assetId}`);

        // Dispatch event for UI updates
        window.dispatchEvent(new CustomEvent('mediavault:synced', {
            detail: { id: assetId, cloudUrl: downloadUrl }
        }));

    } catch (e) {
        console.error('[StorageManager] Cloud sync failed:', assetId, e);
        await updateAssetSync(assetId, { syncStatus: 'failed' }).catch(() => { });
    }
}

/**
 * Delete an asset from Firebase Storage.
 * @param {Object} asset - The asset record
 */
async function deleteFromFirebaseStorage(asset) {
    const user = getCurrentUser();
    if (!user) return;

    const { storage, ref, deleteObject } = await getFirebaseStorageRefs();
    if (!storage) return;

    const storagePath = `users/${user.uid}/media/${asset.type}/${asset.id}`;
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);

    console.log(`[StorageManager] Deleted from cloud: ${asset.id}`);
}

/**
 * Lazily load Firebase Storage references.
 * This prevents the Storage SDK from blocking page load.
 */
let firebaseStorageCache = null;
async function getFirebaseStorageRefs() {
    if (firebaseStorageCache) return firebaseStorageCache;

    try {
        const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } =
            await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js');

        // Get the Firebase app instance from our firebase.js module
        const { storage } = await import('./firebase.js');

        firebaseStorageCache = {
            storage,
            ref,
            uploadBytes,
            getDownloadURL,
            deleteObject
        };
        return firebaseStorageCache;
    } catch (e) {
        console.warn('[StorageManager] Firebase Storage not available:', e);
        return { storage: null };
    }
}

// =========================================================================
// STORAGE HEALTH
// =========================================================================

const QUOTA_WARNING_THRESHOLD = 0.8; // 80%
const MAX_LOCAL_BYTES = 500 * 1024 * 1024; // 500MB

/**
 * Check storage health and emit warnings if nearing quota.
 */
async function checkStorageHealth() {
    try {
        const [vaultUsage, quotaEstimate] = await Promise.all([
            getStorageUsage(),
            getQuotaEstimate()
        ]);

        if (quotaEstimate.percent > QUOTA_WARNING_THRESHOLD * 100) {
            console.warn(`[StorageManager] ⚠️ Browser storage at ${quotaEstimate.percent}% capacity`);
            window.dispatchEvent(new CustomEvent('mediavault:quota-warning', {
                detail: {
                    vaultUsage,
                    quotaEstimate,
                    message: `Storage is ${quotaEstimate.percent}% full. Consider deleting old captures.`
                }
            }));
        }

        if (vaultUsage.totalBytes > MAX_LOCAL_BYTES) {
            console.warn(`[StorageManager] Vault exceeds ${formatBytes(MAX_LOCAL_BYTES)} — pruning recommended`);
        }
    } catch (e) {
        // Non-critical — don't break save operations
        console.warn('[StorageManager] Health check failed:', e);
    }
}

// =========================================================================
// UTILITY EXPORTS
// =========================================================================

/**
 * Get comprehensive storage statistics.
 * @returns {Promise<Object>}
 */
export async function getStorageStats() {
    await initStorage();
    const [vaultUsage, quotaEstimate, assetCount] = await Promise.all([
        getStorageUsage(),
        getQuotaEstimate(),
        countAssets()
    ]);

    return {
        vault: {
            totalBytes: vaultUsage.totalBytes,
            totalFormatted: formatBytes(vaultUsage.totalBytes),
            count: vaultUsage.count,
            byType: vaultUsage.byType,
            byTypeFormatted: Object.fromEntries(
                Object.entries(vaultUsage.byType).map(([k, v]) => [k, formatBytes(v)])
            )
        },
        browser: {
            usage: quotaEstimate.usage,
            quota: quotaEstimate.quota,
            percent: quotaEstimate.percent,
            usageFormatted: formatBytes(quotaEstimate.usage),
            quotaFormatted: formatBytes(quotaEstimate.quota)
        },
        counts: {
            total: assetCount,
            screenshots: await countAssets('screenshot'),
            videos: await countAssets('video'),
            audioExports: await countAssets('audio-export'),
            recordings: await countAssets('session-recording')
        }
    };
}

/**
 * Manually trigger cloud sync for all unsynced assets.
 * @returns {Promise<number>} Number of assets synced
 */
export async function syncAllToCloud() {
    await initStorage();

    const user = getCurrentUser();
    if (!user || user.isAnonymous) {
        console.log('[StorageManager] Not logged in — skipping cloud sync');
        return 0;
    }

    const assets = await listAssets(null, 1000);
    const unsynced = assets.filter(a => a.syncStatus === 'local' || a.syncStatus === 'failed');

    let synced = 0;
    for (const asset of unsynced) {
        try {
            await scheduleCloudSync(asset.id);
            synced++;
        } catch (e) {
            console.warn('[StorageManager] Sync failed for:', asset.id, e);
        }
    }

    console.log(`[StorageManager] Synced ${synced}/${unsynced.length} assets to cloud`);
    return synced;
}

/**
 * Clean up old assets to free local storage space.
 * @param {number} [maxBytes] - Target max bytes
 * @returns {Promise<number>} Number deleted
 */
export async function cleanupStorage(maxBytes) {
    await initStorage();
    return pruneOldAssets(maxBytes);
}

// Re-export formatBytes for use in UI
export { formatBytes };
