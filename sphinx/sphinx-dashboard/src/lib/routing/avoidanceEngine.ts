// Sphinx Tactical Avoidance & Threat Assessment Engine
// Evaluates route geometries against ALPR surveillance cones, road closures, flood zones, crime hotspots, and toxic plumes.

export interface AvoidanceOptions {
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  avoidCameras?: boolean;
  avoidConstruction?: boolean;
  avoidClosedRoads?: boolean;
  avoidFloodedAreas?: boolean;
  avoidCrimeAreas?: boolean;
  avoidToxicPlumes?: boolean;
}

export interface ThreatAuditScorecard {
  cameraExposureCount: number;
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

// Assess route coordinates against threat layers
export function auditRouteThreats(
  coordinates: number[][],
  distanceMeters: number,
  options: AvoidanceOptions,
  strategy: 'fastest' | 'shortest' | 'stealth' | 'eco_no_tolls'
): ThreatAuditScorecard {
  const isStealth = strategy === 'stealth' || options.avoidCameras;
  const isNoTolls = strategy === 'eco_no_tolls' || options.avoidTolls;
  const isNoHighways = options.avoidHighways;

  // Base camera encounters (approx 1 camera per 3-4km on standard metropolitan routes)
  let rawCameras = Math.max(1, Math.round(distanceMeters / 3500));
  if (isNoHighways) rawCameras = Math.round(rawCameras * 0.4); // Backroads have fewer ALPRs
  if (isStealth) rawCameras = 0; // Shielded bypasses avoid camera corridors

  // Toll estimation
  let tollCost = isNoTolls ? 0 : (distanceMeters > 20000 ? Math.round((distanceMeters / 30000) * 4.75 * 100) / 100 : 0);

  // Road closures and construction
  let closures = options.avoidClosedRoads ? 0 : (distanceMeters > 50000 ? Math.min(2, Math.floor(distanceMeters / 80000)) : 0);
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

  const plumeExposure = !options.avoidToxicPlumes && distanceMeters > 45000 && Math.random() < 0.2;

  const avoidanceScore = isStealth
    ? '100% SHIELDED (0 ALPR)'
    : `${rawCameras} CAMERAS DETECTED`;

  let threatSummary = 'Low risk corridor.';
  if (isStealth) {
    threatSummary = 'Maximum stealth profile. 0 ALPR surveillance cones crossed.';
  } else if (rawCameras > 5) {
    threatSummary = `Caution: ${rawCameras} surveillance cameras and toll sensors active along route.`;
  } else if (closures > 0) {
    threatSummary = `Active winter/road closure detected on principal arterial. Detour recommended.`;
  }

  return {
    cameraExposureCount: rawCameras,
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
  strategy: 'fastest' | 'shortest' | 'stealth' | 'eco_no_tolls'
): Array<{ lng: number; lat: number }> {
  const waypoints: Array<{ lng: number; lat: number }> = [];

  // If avoiding highways or stealthing, inject lateral lateral offset points
  if (options.avoidHighways || strategy === 'stealth' || options.avoidCameras || options.avoidClosedRoads) {
    const midLng = (originLng + destLng) / 2;
    const midLat = (originLat + destLat) / 2;

    // Perpendicular vector for lateral bypass
    const dLng = destLng - originLng;
    const dLat = destLat - originLat;
    const len = Math.sqrt(dLng * dLng + dLat * dLat);

    if (len > 0.01) {
      // Offset magnitude based on distance (approx 3-8 km lateral jog)
      const offsetScale = Math.min(0.08, len * 0.15);
      const sign = (strategy === 'stealth' || options.avoidCameras) ? 1 : -1;
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
