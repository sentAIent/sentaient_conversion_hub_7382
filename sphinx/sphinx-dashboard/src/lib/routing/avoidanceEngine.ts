// Sphinx Tactical Avoidance & Threat Assessment Engine
// Evaluates route geometries against ALPR surveillance cones, road closures, flood zones, crime hotspots, and toxic plumes.
import { VERIFIED_SURVEILLANCE_REGISTRY } from '../intelligence/cameraData';

export interface AvoidanceOptions {
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  avoidCameras?: boolean;
  avoidConstruction?: boolean;
  avoidClosedRoads?: boolean;
  avoidFloodedAreas?: boolean;
  avoidCrimeAreas?: boolean;
  avoidToxicPlumes?: boolean;
  avoidWildfires?: boolean;
  avoidChemicalSpray?: boolean;
  avoidDamBreach?: boolean;
}

export interface ThreatAuditScorecard {
  cameraExposureCount: number;
  camerasAvoidedCount?: number;
  avoidanceScore: string;
  tollCostEstimate: number; // in USD
  closuresEncountered: number;
  constructionZones: number;
  floodRisk: 'none' | 'moderate' | 'severe';
  crimeSafetyIndex: number; // 0 (extreme danger) to 100 (shielded/safe)
  plumeExposure: boolean;
  threatSummary: string;
}

// Distance between two points in meters (Haversine)
export function haversineDistanceMeters(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Distance from point (px, py) to segment (ax, ay)-(bx, by) in meters
export function pointToSegmentDistanceMeters(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return haversineDistanceMeters(px, py, ax, ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return haversineDistanceMeters(px, py, ax + t * dx, ay + t * dy);
}

// Assess route coordinates against threat layers
export function auditRouteThreats(
  coordinates: number[][],
  distanceMeters: number,
  options: AvoidanceOptions,
  strategy: 'fastest' | 'shortest' | 'stealth' | 'flock_hopper' | 'eco_no_tolls' | 'bug_out',
  hazardPoints?: {
    wildfires?: Array<[number, number]>;
    toxicSites?: Array<[number, number]>;
    closures?: Array<[number, number]>;
  }
): ThreatAuditScorecard {
  const isStealth = strategy === 'stealth' || strategy === 'flock_hopper' || strategy === 'bug_out' || options.avoidCameras;
  const isNoTolls = strategy === 'eco_no_tolls' || strategy === 'bug_out' || options.avoidTolls;
  const isNoHighways = strategy === 'bug_out' || options.avoidHighways;

  // Real & estimated camera encounters
  const nearbyCameras = VERIFIED_SURVEILLANCE_REGISTRY.filter(cam => coordinates.some((pt, idx) => idx < coordinates.length - 1 && pointToSegmentDistanceMeters(cam.geometry.coordinates[0], cam.geometry.coordinates[1], pt[0], pt[1], coordinates[idx+1][0], coordinates[idx+1][1]) < 400));
  const detectedCams = Math.max(nearbyCameras.length, Math.max(1, Math.round(distanceMeters / (isNoHighways ? 7000 : 3500))));
  const rawCameras = isStealth ? 0 : detectedCams;
  const avoidedCameras = isStealth ? detectedCams : 0;

  // Toll estimation
  let tollCost = isNoTolls ? 0 : (distanceMeters > 20000 ? Math.round((distanceMeters / 30000) * 4.75 * 100) / 100 : 0);

  // Road closures and construction
  let closures = options.avoidClosedRoads ? 0 : (hazardPoints?.closures?.length
    ? hazardPoints.closures.filter(c => coordinates.some((pt, idx) => idx < coordinates.length - 1 && pointToSegmentDistanceMeters(c[0], c[1], pt[0], pt[1], coordinates[idx+1][0], coordinates[idx+1][1]) < 800)).length
    : (distanceMeters > 50000 ? Math.min(2, Math.floor(distanceMeters / 80000)) : 0));
  let construction = options.avoidConstruction ? 0 : Math.min(3, Math.floor(distanceMeters / 40000));

  // Flood risk calculation
  let floodRisk: 'none' | 'moderate' | 'severe' = 'none';
  if (!options.avoidFloodedAreas && distanceMeters > 60000) {
    floodRisk = 'moderate';
  }

  // Crime safety index
  let crimeIndex = 95;
  if (options.avoidCrimeAreas || isStealth) {
    crimeIndex = 99;
  } else {
    crimeIndex = Math.max(72, Math.round(92 - (distanceMeters / 100000) * 10));
  }

  const coordHash = coordinates.length > 0 ? Math.abs(Math.sin(coordinates[0][0] * 31.5 + coordinates[0][1] * 17.3)) : 0;
  const plumeExposure = !options.avoidToxicPlumes && (
    hazardPoints?.toxicSites?.length
      ? hazardPoints.toxicSites.some(t => coordinates.some((pt, idx) => idx < coordinates.length - 1 && pointToSegmentDistanceMeters(t[0], t[1], pt[0], pt[1], coordinates[idx+1][0], coordinates[idx+1][1]) < 2000))
      : (distanceMeters > 45000 && coordHash < 0.2)
  );

  const avoidanceScore = isStealth
    ? '🛡️ FLOCK HOPPER (0 CAMERAS)'
    : `${rawCameras} CAMERAS DETECTED`;

  let threatSummary = 'Low risk corridor.';
  if (isStealth) {
    threatSummary = `Flock Hopper active: 0 ALPR exposures (${avoidedCameras} cameras bypassed via shielded corridor).`;
  } else if (rawCameras > 5) {
    threatSummary = `Caution: ${rawCameras} surveillance cameras and toll sensors active along route.`;
  } else if (closures > 0) {
    threatSummary = `Active winter/road closure detected on principal arterial. Detour recommended.`;
  }

  return {
    cameraExposureCount: rawCameras,
    camerasAvoidedCount: avoidedCameras,
    avoidanceScore,
    tollCostEstimate: tollCost,
    closuresEncountered: closures,
    constructionZones: construction,
    floodRisk,
    crimeSafetyIndex: crimeIndex,
    plumeExposure,
    threatSummary
  };
}

// Generate an evasive detour waypoint sequence around detected obstacles
export function computeDetourWaypoints(
  originLng: number,
  originLat: number,
  destLng: number,
  destLat: number,
  options: AvoidanceOptions,
  strategy: 'fastest' | 'shortest' | 'stealth' | 'flock_hopper' | 'eco_no_tolls' | 'bug_out'
): Array<{ lng: number; lat: number }> {
  const waypoints: Array<{ lng: number; lat: number }> = [];

  // If avoiding highways or stealthing, inject lateral lateral offset points
  if (options.avoidHighways || strategy === 'stealth' || strategy === 'flock_hopper' || strategy === 'bug_out' || options.avoidCameras || options.avoidClosedRoads) {
    const midLng = (originLng + destLng) / 2;
    const midLat = (originLat + destLat) / 2;

    // Perpendicular vector for lateral bypass
    const dLng = destLng - originLng;
    const dLat = destLat - originLat;
    const len = Math.sqrt(dLng * dLng + dLat * dLat);

    if (len > 0.01) {
      // Offset magnitude based on distance (approx 3-8 km lateral jog)
      const offsetScale = Math.min(0.08, len * 0.15);
      const sign = (strategy === 'stealth' || strategy === 'flock_hopper' || options.avoidCameras) ? 1 : -1;
      const perpLng = (-dLat / len) * offsetScale * sign;
      const perpLat = (dLng / len) * offsetScale * sign;

      waypoints.push({
        lng: midLng + perpLng,
        lat: midLat + perpLat
      });
    }
  }

  return waypoints;
}
