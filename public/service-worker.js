/**
 * Self-Destroying Service Worker
 * Clears all asset caches, unregisters itself, and restores standard network fetch control.
 */

self.addEventListener('install', (event) => {
    console.log('[SW] Installing self-destroying Service Worker...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activating self-destroying Service Worker...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                console.log('[SW] Deleting cache:', key);
                return caches.delete(key);
            }));
        }).then(() => {
            console.log('[SW] Caches cleared. Unregistering self...');
            return self.registration.unregister();
        }).then(() => {
            console.log('[SW] Unregistration complete. Claiming clients...');
            return self.clients.claim();
        }).then(() => {
            // Force a reload on all controlled clients to pick up new assets
            return self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                    if (client.url) {
                        console.log('[SW] Reloading client:', client.url);
                        client.navigate(client.url);
                    }
                });
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Pure pass-through: Force network retrieval
    event.respondWith(fetch(event.request));
});
