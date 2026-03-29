const CACHE_NAME = 'mindwave-cache-v44-economy-overhaul';

// Essential assets to cache immediately upon installation
const PRECACHE_URLS = [
    '/',
    '/mindwave-beta.html',
    '/manifest.json',

    // CSS & Fonts
    '/binaural-assets/css/style.css',
    '/binaural-assets/css/tailwind-compiled.css',
    '/binaural-assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf',
    '/binaural-assets/fonts/orbitron/Orbitron-VariableFont_wght.ttf',

    // Core Dependencies
    '/binaural-assets/js/lib/howler.min.js',
    '/binaural-assets/js/lib/three.min.js',

    // Core App Logic
    '/binaural-assets/js/main_vFINAL.js',
    '/binaural-assets/js/state.js',
    '/binaural-assets/js/ui/controls_v3.js',
    '/binaural-assets/js/ui/cursor.js',
    '/binaural-assets/js/ui/pricing-3tier.js',
    '/binaural-assets/js/services/stripe-simple.js',
    '/binaural-assets/js/utils/analytics.js',

    // Audio Engine
    '/binaural-assets/js/audio/engine.js',
    '/binaural-assets/js/audio/dj-synth.js',
    '/binaural-assets/js/audio/session-timer.js',
    '/binaural-assets/js/content/audio-library.js',
    '/binaural-assets/js/content/classical.js',
    '/binaural-assets/js/content/stories.js',

    // Visualizers
    '/binaural-assets/js/visuals/visualizer_lazy.js',
    '/binaural-assets/js/visuals/visualizer_nuclear_v4.js',

    // Assets
    '/binaural-assets/mindwave-logo-icon.png',
    '/binaural-assets/images/tribal-sun.svg',
    '/binaural-assets/images/lotus-logo-color.svg',

    // Utilities
    '/binaural-assets/js/utils/audio-offline-manager.js',
    '/binaural-assets/js/utils/pwa-install.js',
    '/binaural-assets/js/utils/discount-codes.js',
    '/binaural-assets/js/utils/haptics.js'
];

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install v4');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Pre-caching core assets');
                return cache.addAll(PRECACHE_URLS);
            })
            // Force the waiting service worker to become the active service worker
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activate v4');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Ensure the service worker takes control of all clients immediately
    return self.clients.claim();
});

// Helper: Is this a mutable resource that should always be fresh?
function isCodeOrMarkup(url) {
    return url.endsWith('.js') || url.endsWith('.css') || url.endsWith('.html');
}

self.addEventListener('fetch', event => {
    // We only want to handle GET requests
    if (event.request.method !== 'GET') return;

    // Ignore chrome extension requests and auth/analytics APIs
    if (event.request.url.startsWith('chrome-extension') ||
        event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('google-analytics.com')) {
        return;
    }

    // NETWORK-FIRST for JS / CSS / HTML — always get latest code, fall back to cache offline
    if (isCodeOrMarkup(event.request.url)) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response && response.status === 200) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // CACHE-FIRST for static assets (fonts, images, audio) — fast + offline friendly
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseToCache = response.clone();

                    if (event.request.url.includes('/fonts/') ||
                        event.request.url.includes('/audio/') ||
                        event.request.url.includes('/images/') ||
                        event.request.url.match(/\.(png|jpg|svg|woff2?|ttf|mp3|ogg|wav)$/)) {
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseToCache));
                    }

                    return response;
                }).catch(err => {
                    console.error('[ServiceWorker] Fetch failed; offline and not cached', err);
                });
            })
    );
});
