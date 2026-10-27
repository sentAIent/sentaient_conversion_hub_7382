/**
 * Supabase Service for MindWave
 * Replaces legacy Firebase storage for favorite colors and user presets.
 * Ensures local-first resilience with offline support and cloud sync.
 */

const SUPABASE_URL = 'https://zbwnpclnxamiynwpdbed.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid25wY2xueGFtaXlud3BkYmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMzk5NDgsImV4cCI6MjA5OTcxNTk0OH0.0GkslQpzdsatDNI5qLuccamMAG_PATIpAW988FIUuO8';
const FAVORITE_COLORS_KEY = 'mindwave_favorite_colors';

let supabaseClient = null;
let initPromise = null;

/**
 * Initializes and returns the Supabase client instance.
 * Dynamically loads @supabase/supabase-js with CDN fallback.
 */
export async function getSupabase() {
    if (supabaseClient) return supabaseClient;
    if (initPromise) return initPromise;

    initPromise = (async () => {
        try {
            // Check for existing global supabase
            if (window.supabase && typeof window.supabase.from === 'function') {
                supabaseClient = window.supabase;
                return supabaseClient;
            }

            let createClientFn = null;

            // Attempt dynamic import from package/bundle
            try {
                const mod = await import('@supabase/supabase-js');
                createClientFn = mod.createClient;
            } catch (bundleErr) {
                // Fallback to ESM CDN
                try {
                    const mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.48.0/+esm');
                    createClientFn = mod.createClient;
                } catch (cdnErr) {
                    console.warn('[Supabase] Could not load Supabase SDK from bundle or CDN:', cdnErr);
                }
            }

            if (createClientFn) {
                const url = (window.env && window.env.VITE_SUPABASE_URL) || SUPABASE_URL;
                const key = (window.env && window.env.VITE_SUPABASE_ANON_KEY) || SUPABASE_ANON_KEY;
                supabaseClient = createClientFn(url, key);
                window.supabase = supabaseClient;
                console.log('[Supabase] Client initialized successfully.');
            }
        } catch (err) {
            console.warn('[Supabase] Initialization error (falling back to local storage):', err);
        }
        return supabaseClient;
    })();

    return initPromise;
}

/**
 * Retrieves favorite colors from localStorage with optional Supabase cloud sync.
 * @returns {string[]} Array of hex color strings
 */
export function getLocalFavoriteColors() {
    try {
        const stored = localStorage.getItem(FAVORITE_COLORS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {
        console.warn('[Supabase] Error reading local favorite colors:', e);
    }
    return ['#60a9ff', '#a855f7', '#2dd4bf', '#ec4899', '#f59e0b']; // Curated defaults
}

/**
 * Saves a favorite color to local storage and syncs to Supabase.
 * @param {string} color Hex color string (e.g. #60a9ff)
 * @param {string} [userId] Optional user identifier
 * @returns {Promise<{success: boolean, colors: string[], synced: boolean}>}
 */
export async function saveFavoriteColor(color, userId) {
    if (!color || typeof color !== 'string') {
        return { success: false, colors: getLocalFavoriteColors(), synced: false };
    }

    const normalizedColor = color.trim().toLowerCase();
    const current = getLocalFavoriteColors();
    let updated = current;

    if (!current.includes(normalizedColor)) {
        updated = [normalizedColor, ...current].slice(0, 30); // Keep up to 30 favorite colors
        try {
            localStorage.setItem(FAVORITE_COLORS_KEY, JSON.stringify(updated));
        } catch (e) {
            console.warn('[Supabase] Could not persist to localStorage:', e);
        }
    }

    let synced = false;

    // Background cloud sync via Supabase
    try {
        const client = await getSupabase();
        if (client) {
            const uid = userId || client.auth?.user?.()?.id || localStorage.getItem('guest_user_id');
            if (uid) {
                // Attempt to update profile favorite_colors column or metadata
                const { error } = await client
                    .from('profiles')
                    .update({
                        favorite_colors: updated,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', uid);

                if (!error) {
                    synced = true;
                } else {
                    console.log('[Supabase] Note on profiles update (local copy preserved):', error.message);
                }
            }
        }
    } catch (syncErr) {
        // Non-blocking: Local copy remains valid
        console.log('[Supabase] Background sync note:', syncErr.message);
    }

    return { success: true, colors: updated, synced };
}

/**
 * Removes a favorite color from local storage and syncs with Supabase.
 * @param {string} color
 * @param {string} [userId]
 */
export async function removeFavoriteColor(color, userId) {
    const normalized = color.trim().toLowerCase();
    const current = getLocalFavoriteColors();
    const updated = current.filter(c => c !== normalized);

    try {
        localStorage.setItem(FAVORITE_COLORS_KEY, JSON.stringify(updated));
    } catch (e) {}

    try {
        const client = await getSupabase();
        if (client) {
            const uid = userId || client.auth?.user?.()?.id;
            if (uid) {
                await client
                    .from('profiles')
                    .update({
                        favorite_colors: updated,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', uid);
            }
        }
    } catch (e) {}

    return updated;
}
