/**
 * Sphinx Mobile Sync Engine
 * Handles caching events offline and syncing them back to the Home Base (ChromaDB) 
 * via the Tailscale tunnel when the network is restored.
 */

// In a real RN app, this would use SQLite or AsyncStorage
let offlineCache = [];

export const SyncService = {
  logOfflineEvent: async (source, data, assessment) => {
    const event = {
      id: Date.now().toString(),
      source,
      data,
      assessment,
      timestamp: new Date().toISOString()
    };
    offlineCache.push(event);
    console.log(`[Sphinx Mobile] Logged event locally. Offline cache size: ${offlineCache.length}`);
  },

  syncWithHomeBase: async (tailscaleHomeIp) => {
    if (offlineCache.length === 0) return;

    console.log(`[Sphinx Mobile] Network restored. Syncing ${offlineCache.length} events to Home Base...`);
    try {
      const response = await fetch(`http://${tailscaleHomeIp}:3117/api/sync/memory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offline_events: offlineCache })
      });

      if (response.ok) {
        console.log('[Sphinx Mobile] Sync successful. Clearing local cache.');
        offlineCache = []; // Clear cache on success
      } else {
        console.warn(`[Sphinx Mobile] Sync failed with status: ${response.status}`);
      }
    } catch (e) {
      console.error('[Sphinx Mobile] Sync failed. Remaining in offline mode.', e.message);
    }
  }
};
