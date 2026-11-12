// Sphinx Tactical OSINT Hub - Autonomous Grid-Down Service Worker
// Version: sphinx-grid-down-v2

const CACHE_NAME = 'sphinx-grid-down-v2';

const BASELINE_DATASETS = [
  'watchtower_baseline.json',
  'cell_towers.geojson',
  'civil_preparedness_catalog.json',
  'critical_infrastructure_global.geojson',
  'public_lands_global.geojson',
  'submarine_cables.geojson',
  'landing_points.geojson',
  'data_centers_global.geojson',
  'boundaries_countries.geojson',
  'boundaries_states.geojson',
  'toxic_sites_global.geojson',
  'wildfires.geojson',
  'road_closures.geojson',
  'lightning.geojson',
  'snowboard_resorts_global.geojson',
  'resorts/bundled_pistes_lifts.geojson',
  'resorts/mt_baldy_pistes_lifts.geojson',
  'evacuation_centers.geojson',
  'tactical_presets.json'
];

const PRECACHE_URLS = [
  '/sphinx/',
  '/sphinx/index.html',
  '/sphinx/manifest.json',
  '/sphinx/tribal-sun-cursor.png',
  '/sphinx/maplibre-gl-shared.mjs',
  '/sphinx/maplibre-gl-worker.mjs'
];

// Add both /data/ and /sphinx/data/ variants for all datasets
BASELINE_DATASETS.forEach(file => {
  PRECACHE_URLS.push('/data/' + file);
  PRECACHE_URLS.push('/sphinx/data/' + file);
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[Sphinx SW] Pre-caching core shell and baseline datasets...');
      // Use Promise.allSettled so missing optional files don't fail installation
      const results = await Promise.allSettled(
        PRECACHE_URLS.map(url =>
          fetch(url)
            .then(res => {
              if (res.ok) return cache.put(url, res);
              console.warn('[Sphinx SW] Precache 404 (skipping):', url);
            })
            .catch(err => console.warn('[Sphinx SW] Precache fetch error:', url, err.message))
        )
      );
      return results;
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME && k.startsWith('sphinx-grid-down-')) {
            console.log('[Sphinx SW] Evicting deprecated cache:', k);
            return caches.delete(k);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Baseline GeoJSON / JSON data: Cache-first with network fallback
  if (url.pathname.includes('/data/') || url.pathname.endsWith('.geojson') || url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req, { ignoreSearch: true });
        if (cached) return cached;

        // Try alternative prefix (/sphinx/data vs /data)
        const altPath = url.pathname.startsWith('/sphinx/data/')
          ? url.pathname.replace('/sphinx/data/', '/data/')
          : '/sphinx' + url.pathname;
        const altCached = await cache.match(altPath, { ignoreSearch: true });
        if (altCached) return altCached;

        try {
          const fresh = await fetch(req);
          if (fresh && fresh.ok) {
            cache.put(req, fresh.clone());
          }
          return fresh;
        } catch (e) {
          return new Response(JSON.stringify({ type: 'FeatureCollection', features: [] }), {
            headers: { 'Content-Type': 'application/geo+json' }
          });
        }
      })
    );
    return;
  }

  // 2. MapLibre font glyphs & map tiles: Cache-first
  if (url.hostname.includes('demotiles.maplibre.org') || url.pathname.includes('/font/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const fresh = await fetch(req);
          if (fresh && fresh.ok) {
            cache.put(req, fresh.clone());
          }
          return fresh;
        } catch (e) {
          return cached || new Response('', { status: 404 });
        }
      })
    );
    return;
  }

  // 3. Static assets (_next/static, images, mjs workers): Stale-While-Revalidate
  if (url.pathname.includes('/_next/static/') || url.pathname.endsWith('.mjs') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(req);
        const fetchPromise = fetch(req).then((fresh) => {
          if (fresh && fresh.ok) cache.put(req, fresh.clone());
          return fresh;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 4. Default: Network first with offline fallback to cached HTML
  event.respondWith(
    fetch(req).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const matched = await cache.match(req, { ignoreSearch: true });
      if (matched) return matched;
      return cache.match('/sphinx/index.html') || cache.match('/index.html');
    })
  );
});
