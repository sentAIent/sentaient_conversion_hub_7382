/**
 * SPHINX Offline Survival Storage Engine
 * Manages client-side persistence, IndexedDB caching, and offline retrieval
 * of emergency guides, repair manuals, and survival data for Premium users.
 */

import { SurvivalArticle, SURVIVAL_ARTICLES } from './survivalData';

const DB_NAME = 'sphinx_offline_vault_v1';
const DB_VERSION = 1;
const STORE_ARTICLES = 'articles';
const STORE_META = 'vault_metadata';
const STORE_BOOKMARKS = 'bookmarks';

export interface StorageStats {
  isDownloaded: boolean;
  usedBytes: number;
  articleCount: number;
  lastUpdated: number | null;
  version: string;
}

export class OfflineStorageEngine {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<IDBDatabase | null> | null = null;

  /**
   * Initializes or returns the open IndexedDB database
   */
  public async getDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return null;
    }
    if (this.db) {
      return this.db;
    }
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_ARTICLES)) {
            const articleStore = db.createObjectStore(STORE_ARTICLES, { keyPath: 'id' });
            articleStore.createIndex('category', 'category', { unique: false });
            articleStore.createIndex('urgency', 'urgency', { unique: false });
          }
          if (!db.objectStoreNames.contains(STORE_META)) {
            db.createObjectStore(STORE_META, { keyPath: 'key' });
          }
          if (!db.objectStoreNames.contains(STORE_BOOKMARKS)) {
            db.createObjectStore(STORE_BOOKMARKS, { keyPath: 'id' });
          }
        };

        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve(this.db);
        };

        request.onerror = () => {
          console.warn('[OfflineStorageEngine] IndexedDB open error, falling back to in-memory');
          resolve(null);
        };
      } catch (e) {
        console.warn('[OfflineStorageEngine] Exception initializing IndexedDB', e);
        resolve(null);
      }
    });

    return this.initPromise;
  }

  /**
   * Checks if the complete offline survival vault has been persisted
   */
  public async isVaultDownloaded(): Promise<boolean> {
    const db = await this.getDB();
    if (!db) {
      // Check localStorage fallback
      return typeof window !== 'undefined' && localStorage.getItem('sphinx_vault_offline_ready') === 'true';
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_META, 'readonly');
        const store = tx.objectStore(STORE_META);
        const req = store.get('download_status');
        req.onsuccess = () => {
          resolve(!!req.result && req.result.value === 'completed');
        };
        req.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * Downloads and caches the entire survival and repair knowledge base.
   * Gated strictly to Premium tiers ('pro' or 'sovereign').
   */
  public async downloadFullVault(
    userTier: string,
    onProgress?: (pct: number) => void
  ): Promise<{ success: boolean; bytes: number; error?: string }> {
    // 1. Verify premium tier
    const isPremium = userTier === 'pro' || userTier === 'sovereign';
    if (!isPremium) {
      return {
        success: false,
        bytes: 0,
        error: 'UPGRADE_REQUIRED: Offline Survival Vault is reserved for Pro and Sovereign members.'
      };
    }

    const db = await this.getDB();
    const articles = SURVIVAL_ARTICLES;
    const total = articles.length;
    let storedCount = 0;
    let approxBytes = 0;

    if (onProgress) onProgress(5);

    // Calculate approx byte size
    const jsonString = JSON.stringify(articles);
    approxBytes = new Blob([jsonString]).size;

    if (db) {
      await new Promise<void>((resolve, reject) => {
        try {
          const tx = db.transaction([STORE_ARTICLES, STORE_META], 'readwrite');
          const articleStore = tx.objectStore(STORE_ARTICLES);
          const metaStore = tx.objectStore(STORE_META);

          articles.forEach((art, idx) => {
            articleStore.put(art);
            storedCount++;
            if (onProgress && idx % 3 === 0) {
              const pct = 10 + Math.round((idx / total) * 80);
              onProgress(pct);
            }
          });

          metaStore.put({ key: 'download_status', value: 'completed' });
          metaStore.put({ key: 'last_updated', value: Date.now() });
          metaStore.put({ key: 'version', value: '2.4.0' });
          metaStore.put({ key: 'byte_size', value: approxBytes });
          metaStore.put({ key: 'article_count', value: total });

          tx.oncomplete = () => {
            if (onProgress) onProgress(100);
            resolve();
          };
          tx.onerror = (e) => reject(e);
        } catch (err) {
          reject(err);
        }
      });
    }

    // Also persist confirmation flag in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sphinx_vault_offline_ready', 'true');
        localStorage.setItem('sphinx_vault_bytes', approxBytes.toString());
        localStorage.setItem('sphinx_vault_updated', Date.now().toString());
      } catch {
        // ignore storage quota issues
      }
    }

    return { success: true, bytes: approxBytes };
  }

  /**
   * Removes cached offline data
   */
  public async clearVault(): Promise<void> {
    const db = await this.getDB();
    if (db) {
      try {
        const tx = db.transaction([STORE_ARTICLES, STORE_META], 'readwrite');
        tx.objectStore(STORE_ARTICLES).clear();
        tx.objectStore(STORE_META).clear();
      } catch (e) {
        console.error('Failed to clear IndexedDB stores', e);
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('sphinx_vault_offline_ready');
      localStorage.removeItem('sphinx_vault_bytes');
      localStorage.removeItem('sphinx_vault_updated');
    }
  }

  /**
   * Retrieves overall storage statistics
   */
  public async getStorageStats(): Promise<StorageStats> {
    const isDownloaded = await this.isVaultDownloaded();
    const db = await this.getDB();

    if (!db || !isDownloaded) {
      return {
        isDownloaded: false,
        usedBytes: 0,
        articleCount: SURVIVAL_ARTICLES.length,
        lastUpdated: null,
        version: '2.4.0'
      };
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_META, 'readonly');
        const metaStore = tx.objectStore(STORE_META);

        const bytesReq = metaStore.get('byte_size');
        const updatedReq = metaStore.get('last_updated');
        const countReq = metaStore.get('article_count');

        tx.oncomplete = () => {
          resolve({
            isDownloaded: true,
            usedBytes: bytesReq.result?.value || 148500,
            articleCount: countReq.result?.value || SURVIVAL_ARTICLES.length,
            lastUpdated: updatedReq.result?.value || Date.now(),
            version: '2.4.0'
          });
        };

        tx.onerror = () => {
          resolve({
            isDownloaded: true,
            usedBytes: 148500,
            articleCount: SURVIVAL_ARTICLES.length,
            lastUpdated: Date.now(),
            version: '2.4.0'
          });
        };
      } catch {
        resolve({
          isDownloaded: true,
          usedBytes: 148500,
          articleCount: SURVIVAL_ARTICLES.length,
          lastUpdated: Date.now(),
          version: '2.4.0'
        });
      }
    });
  }

  /**
   * Search and filter survival articles with instant offline query response
   */
  public async searchArticles(query: string, category?: string): Promise<SurvivalArticle[]> {
    const q = query.trim().toLowerCase();

    // Source either from IndexedDB or static baseline (both work 100% offline)
    const baseList = SURVIVAL_ARTICLES;

    return baseList.filter((art) => {
      if (category && category !== 'all' && art.category !== category) {
        return false;
      }

      if (!q) {
        return true;
      }

      const inTitle = art.title.toLowerCase().includes(q);
      const inSummary = art.summary.toLowerCase().includes(q);
      const inKeywords = art.keywords.some((k) => k.toLowerCase().includes(q));
      const inProtocols = art.protocols.some((p) => p.toLowerCase().includes(q));
      const inMaterials = art.materials?.some((m) => m.toLowerCase().includes(q));

      return inTitle || inSummary || inKeywords || inProtocols || inMaterials;
    });
  }

  /**
   * Toggles a crisis bookmark
   */
  public async toggleBookmark(articleId: string): Promise<boolean> {
    const db = await this.getDB();
    if (!db) {
      if (typeof window !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('sphinx_vault_bookmarks') || '[]');
        const idx = saved.indexOf(articleId);
        let nowBookmarked = false;
        if (idx >= 0) {
          saved.splice(idx, 1);
        } else {
          saved.push(articleId);
          nowBookmarked = true;
        }
        localStorage.setItem('sphinx_vault_bookmarks', JSON.stringify(saved));
        return nowBookmarked;
      }
      return false;
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_BOOKMARKS, 'readwrite');
        const store = tx.objectStore(STORE_BOOKMARKS);
        const req = store.get(articleId);

        req.onsuccess = () => {
          if (req.result) {
            store.delete(articleId);
            resolve(false);
          } else {
            store.put({ id: articleId, timestamp: Date.now() });
            resolve(true);
          }
        };

        req.onerror = () => resolve(false);
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * Retrieves list of bookmarked article IDs
   */
  public async getBookmarks(): Promise<string[]> {
    const db = await this.getDB();
    if (!db) {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('sphinx_vault_bookmarks') || '[]');
      }
      return [];
    }

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_BOOKMARKS, 'readonly');
        const store = tx.objectStore(STORE_BOOKMARKS);
        const req = store.getAllKeys();

        req.onsuccess = () => {
          resolve((req.result as string[]) || []);
        };
        req.onerror = () => resolve([]);
      } catch {
        resolve([]);
      }
    });
  }
}

export const offlineStorage = new OfflineStorageEngine();
