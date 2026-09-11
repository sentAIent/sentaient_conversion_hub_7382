import * as turf from '@turf/turf';

/**
 * Checks if a user's location is within the radius of a campaign/bounty.
 */
export const isUserInRadius = (
  userLat: number,
  userLng: number,
  targetLat: number,
  targetLng: number,
  radiusInMeters: number
): boolean => {
  const from = turf.point([userLng, userLat]);
  const to = turf.point([targetLng, targetLat]);
  const options = { units: 'meters' as const };
  
  const distance = turf.distance(from, to, options);
  return distance <= radiusInMeters;
};

/**
 * Creates a circular polygon around a point for map rendering boundaries.
 */
export const getGeofencePolygon = (lat: number, lng: number, radiusInMeters: number) => {
  const center = turf.point([lng, lat]);
  // turf.circle uses kilometers by default, so we convert.
  return turf.circle(center, radiusInMeters / 1000, { units: 'kilometers' });
};
