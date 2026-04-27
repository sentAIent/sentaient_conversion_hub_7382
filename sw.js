const CACHE_NAME = 'mindwave-cache-v200-FORCED-RELOAD';
self.addEventListener('install', (event) => {
    self.skipWaiting();
});
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(names.map((name) => caches.delete(name)));
        }).then(() => self.clients.claim())
    );
});
self.addEventListener('fetch', (event) => {
    // PASS-THROUGH: No caching, force network
    event.respondWith(fetch(event.request));
});
