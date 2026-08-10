const CACHE_NAME = 'mindwave-offline-v3';

// Core assets to pre-cache
const CORE_ASSETS = [
    '/',
    '/mindwave.html',
    '/binaural-assets/css/visual-active.css',
    '/binaural-assets/css/sophisticated-ui.css',
    '/binaural-assets/js/state.js',
    '/binaural-assets/js/audio/engine.js',
    '/binaural-assets/js/audio/spatial-engine.js',
    '/binaural-assets/js/audio/lock-screen.js',
    '/binaural-assets/js/ui/controls_v3.js',
    '/binaural-assets/js/main_vFINAL.js',
    '/binaural-assets/js/services/biofeedback.js',
    '/binaural-assets/js/visuals/visualizer_lazy.js',
    '/binaural-assets/js/audio/ambient-synth.js',
    '/binaural-assets/js/services/biometrics.js',
    '/binaural-assets/js/utils/pwa-install.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Pre-caching offline page');
                return cache.addAll(CORE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Network-First with aggressive fallback
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    // Check if offline
    if (!navigator.onLine) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                // Ignore search params so ?share= works offline
                return cache.match(event.request, { ignoreSearch: true });
            })
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    // Update the cache with the new network response
                    if (networkResponse.ok) {
                        // Don't cache URLs with query parameters separately, keep the clean URL
                        const cacheRequest = new Request(event.request.url.split('?')[0]);
                        cache.put(cacheRequest, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Network failed, we either have cached response or we fail
                });

                // Return the cached response if we have it, otherwise wait for network
                return cachedResponse || fetchPromise;
            });
        })
    );
});
