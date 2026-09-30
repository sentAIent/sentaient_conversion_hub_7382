// src/services/spatialAnalytics.js

/**
 * Service to calculate distances and spatial analytics.
 * Uses Turf.js loaded dynamically from a CDN to bypass NPM restrictions.
 */

let turfInstance = null;

async function loadTurf() {
  if (turfInstance || window.turf) {
    turfInstance = window.turf;
    return turfInstance;
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js';
    script.onload = () => {
      turfInstance = window.turf;
      resolve(turfInstance);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Calculates distance between two coordinates in kilometers.
 * @param {Array} coords1 [longitude, latitude]
 * @param {Array} coords2 [longitude, latitude]
 */
export async function calculateDistance(coords1, coords2) {
  const turf = await loadTurf();
  const point1 = turf.point(coords1);
  const point2 = turf.point(coords2);
  
  return turf.distance(point1, point2, { units: 'kilometers' });
}

/**
 * Creates a bounding box around a point.
 */
export async function getBoundingBox(center, radiusKm) {
  const turf = await loadTurf();
  const centerPoint = turf.point(center);
  const buffered = turf.buffer(centerPoint, radiusKm, { units: 'kilometers' });
  return turf.bbox(buffered);
}
