/**
 * databaseService.js
 * Dependency-free database sync service for Supabase.
 * Uses native fetch requests to Supabase PostgREST endpoints.
 */
export class DatabaseService {
    constructor(config = {}) {
        this.supabaseUrl = config.supabaseUrl || (typeof process !== 'undefined' ? process.env.SUPABASE_URL : '');
        this.supabaseKey = config.supabaseKey || (typeof process !== 'undefined' ? process.env.SUPABASE_ANON_KEY : '');
    }

    /**
     * Check if the database service is configured.
     */
    isConfigured() {
        return !!(this.supabaseUrl && this.supabaseKey);
    }

    /**
     * Save/Sync a user's mind map graph to Supabase.
     * @param {string} userId Unique identifier of user
     * @param {Object} mindmapData { nodes, connections }
     * @param {string} authToken JWT token from Auth context
     */
    async syncMindMap(userId, mindmapData, authToken = '') {
        if (!this.isConfigured()) {
            console.warn('[DatabaseSync] Supabase not configured. Mock-saving mind map in local storage.');
            try {
                localStorage.setItem(`mindmap_${userId}`, JSON.stringify(mindmapData));
            } catch (e) {
                console.warn('[DatabaseSync] LocalStorage save failed:', e.message);
            }
            return { success: true, local: true };
        }

        try {
            const url = `${this.supabaseUrl}/rest/v1/mindmaps`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': authToken ? `Bearer ${authToken}` : `Bearer ${this.supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates' // UPSERT behavior
                },
                body: JSON.stringify({
                    user_id: userId,
                    nodes: mindmapData.nodes,
                    connections: mindmapData.connections,
                    updated_at: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`Supabase returned status code ${response.status}`);
            }

            console.log('[DatabaseSync] Successfully synced mind map database records.');
            return { success: true };
        } catch (err) {
            console.error('[DatabaseSync] Sync failed:', err.message);
            throw err;
        }
    }

    /**
     * Retrieve a user's mind map graph from Supabase.
     */
    async fetchMindMap(userId, authToken = '') {
        if (!this.isConfigured()) {
            try {
                const localData = localStorage.getItem(`mindmap_${userId}`);
                return localData ? JSON.parse(localData) : null;
            } catch (e) {
                return null;
            }
        }

        try {
            const url = `${this.supabaseUrl}/rest/v1/mindmaps?user_id=eq.${userId}&select=*`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': authToken ? `Bearer ${authToken}` : `Bearer ${this.supabaseKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Supabase returned status code ${response.status}`);
            }

            const data = await response.json();
            return data?.[0] || null;
        } catch (err) {
            console.error('[DatabaseSync] Load failed:', err.message);
            return null;
        }
    }
}

export default DatabaseService;
