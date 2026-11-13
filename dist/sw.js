/**
 * Self-Destroying Service Worker (sw.js)
 * Clears all asset caches, unregisters itself, and restores standard network fetch control.
 */

self.addEventListener('install', (event) => {
    console.log('[SW] Installing self-destroying sw.js...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating self-destroying sw.js...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                console.log('[SW] Deleting cache:', key);
                return caches.delete(key);
            }));
        }).then(() => {
            console.log('[SW] Caches cleared. Claiming clients...');
            return self.clients.claim();
        }).then(() => {
            console.log('[SW] Claim complete. Unregistering self...');
            return self.registration.unregister();
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Pure pass-through: Force network retrieval
    event.respondWith(fetch(event.request));
});
