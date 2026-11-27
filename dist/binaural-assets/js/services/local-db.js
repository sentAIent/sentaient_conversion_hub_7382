/**
 * MindWave Local-First IndexedDB Database Engine (2026 SOTA)
 * Provides robust offline persistence, transaction safety, and sub-millisecond
 * indexing for session telemetry, clinical assessments, and biometric caches.
 */

class LocalDatabaseService {
    constructor() {
        this.dbName = 'mindwave_local_db';
        this.version = 1;
        this.db = null;
        this.initPromise = null;
    }

    async init() {
        if (this.initPromise) return this.initPromise;
        if (typeof window === 'undefined' || !window.indexedDB) {
            return null; // Fallback to memory / localStorage
        }

        this.initPromise = new Promise((resolve, reject) => {
            const req = window.indexedDB.open(this.dbName, this.version);

            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { keyPath: 'id' });
                    sessionStore.createIndex('timestamp', 'timestamp', { unique: false });
                    sessionStore.createIndex('preset', 'preset', { unique: false });
                }
                if (!db.objectStoreNames.contains('assessments')) {
                    const assessStore = db.createObjectStore('assessments', { keyPath: 'id' });
                    assessStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
                if (!db.objectStoreNames.contains('presets')) {
                    db.createObjectStore('presets', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('biometrics')) {
                    const bioStore = db.createObjectStore('biometrics', { keyPath: 'id', autoIncrement: true });
                    bioStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };

            req.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };

            req.onerror = (e) => {
                console.warn('[LocalDB] IndexedDB open error, falling back to storage:', e);
                resolve(null);
            };
        });

        return this.initPromise;
    }

    async put(storeName, item) {
        const db = await this.init();
        if (!db) {
            // LocalStorage fallback
            const key = `mw_idx_${storeName}_${item.id || Date.now()}`;
            localStorage.setItem(key, JSON.stringify(item));
            return item;
        }

        return new Promise((resolve, reject) => {
            try {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const req = store.put(item);
                req.onsuccess = () => resolve(item);
                req.onerror = () => reject(req.error);
            } catch (err) {
                reject(err);
            }
        });
    }

    async get(storeName, id) {
        const db = await this.init();
        if (!db) {
            const raw = localStorage.getItem(`mw_idx_${storeName}_${id}`);
            return raw ? JSON.parse(raw) : null;
        }
        return new Promise((resolve) => {
            try {
                const tx = db.transaction(storeName, 'readonly');
                const req = tx.objectStore(storeName).get(id);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            } catch (err) {
                resolve(null);
            }
        });
    }

    async delete(storeName, id) {
        const db = await this.init();
        if (!db) {
            localStorage.removeItem(`mw_idx_${storeName}_${id}`);
            return true;
        }
        return new Promise((resolve) => {
            try {
                const tx = db.transaction(storeName, 'readwrite');
                const req = tx.objectStore(storeName).delete(id);
                req.onsuccess = () => resolve(true);
                req.onerror = () => resolve(false);
            } catch (err) {
                resolve(false);
            }
        });
    }

    async getAll(storeName) {
        const db = await this.init();
        if (!db) {
            // LocalStorage fallback
            const items = [];
            const prefix = `mw_idx_${storeName}_`;
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(prefix)) {
                    try { items.push(JSON.parse(localStorage.getItem(k))); } catch {}
                }
            }
            return items;
        }

        return new Promise((resolve, reject) => {
            try {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const req = store.getAll();
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = () => reject(req.error);
            } catch (err) {
                resolve([]);
            }
        });
    }

    async clearAll() {
        const db = await this.init();
        if (db) {
            const stores = ['sessions', 'assessments', 'presets', 'biometrics'];
            for (const s of stores) {
                try {
                    const tx = db.transaction(s, 'readwrite');
                    tx.objectStore(s).clear();
                } catch (e) {}
            }
        }
        if (typeof window !== 'undefined' && window.indexedDB) {
            try { window.indexedDB.deleteDatabase(this.dbName); } catch {}
        }
        // Purge localStorage
        if (typeof localStorage !== 'undefined') {
            const toRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && (k.startsWith('mindwave_') || k.startsWith('mw_'))) {
                    toRemove.push(k);
                }
            }
            toRemove.forEach(k => localStorage.removeItem(k));
        }
        return true;
    }
}

export const localDB = new LocalDatabaseService();
