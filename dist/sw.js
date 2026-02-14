/**
 * MindWave Service Worker - Platform V1
 * Robust caching strategy for offline performance and asset stability.
 */

const CACHE_NAME = 'mindwave-platform-v1';
const STATIC_ASSETS = [
    '/',
    '/mindwave-v101.html',
    '/binaural-assets/css/style.css',
    '/binaural-assets/css/tailwind-compiled.css',
    '/binaural-assets/js/main_vFINAL.js',
    '/binaural-assets/js/state.js',
    '/binaural-assets/config.js'
];

// Heavy assets (Audio/Visual) are cached on-demand using Cache-First
const ASSET_CACHE_NAME = 'mindwave-media-v1';

self.addEventListener('install', (event) => {
    console.log('[SW] Platform Install - Caching Shell');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Platform Activate - Cleaning Legacy Caches');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== ASSET_CACHE_NAME) {
                        console.log('[SW] Deleting Old Cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Audio/Visual/Image assets -> Cache-First (save bandwidth)
    if (url.pathname.match(/\.(mp3|wav|png|jpg|jpeg|svg|webp|glb|gltf)$/)) {
        event.respondWith(
            caches.open(ASSET_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) return response;
                    return fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
        return;
    }

    // Default: Network-First with Cache Fallback (Ensures fresh code)
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
