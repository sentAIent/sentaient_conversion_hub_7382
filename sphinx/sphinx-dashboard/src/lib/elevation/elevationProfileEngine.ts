// elevationProfileEngine.ts
// Tactical RF Line-of-Sight (LOS), Fresnel Zone Clearance & Earth Curvature Model
// Implements 4/3 Earth radius refraction and 1st Fresnel zone clearance for 915MHz, 2.4GHz, and 5.8GHz

import { TopographyElevationEngine } from '../intelligence/topographyElevationEngine';

export interface ElevationProfilePoint {
  index: number;
  fraction: number; // 0.0 to 1.0
  distanceKm: number;
  lon: number;
  lat: number;
  groundElevationMeters: number;
  earthBulgeMeters: number;
  effectiveGroundMeters: number;
  losRayAltitudeMeters: number;
  fresnelRadiusMeters: number;
  clearanceMeters: number;
  isObstructed: boolean; // Below 60% Fresnel clearance
}

export interface ElevationProfileAnalysis {
  distanceKm: number;
  distanceMiles: number;
  txAltitudeMeters: number;
  rxAltitudeMeters: number;
  opticalLosClear: boolean;
  rfFresnelClear: boolean;
  minClearanceMeters: number;
  worstObstructionFraction: number;
  frequencyGHz: number;
  points: ElevationProfilePoint[];
}

export class ElevationProfileEngine {
  private static readonly EFFECTIVE_EARTH_RADIUS_KM = 8495; // 4/3 Earth radius accounting for standard atmospheric refraction

  /**
   * Computes elevation profile and RF Fresnel zone clearance between two points.
   */
  public static calculateProfile(
    txLon: number,
    txLat: number,
    txAntennaHeightMeters: number,
    rxLon: number,
    rxLat: number,
    rxAntennaHeightMeters: number,
    frequencyGHz: number = 0.915, // Default 915 MHz LoRa
    numSamples: number = 32
  ): ElevationProfileAnalysis {
    // Total distance using Haversine
    const totalDistKm = this.haversineDistanceKm(txLon, txLat, rxLon, rxLat);
    const totalDistMiles = totalDistKm * 0.621371;

    const txGround = TopographyElevationEngine.estimateElevation(txLon, txLat).elevationM;
    const rxGround = TopographyElevationEngine.estimateElevation(rxLon, rxLat).elevationM;

    const txTotalAlt = txGround + txAntennaHeightMeters;
    const rxTotalAlt = rxGround + rxAntennaHeightMeters;

    const points: ElevationProfilePoint[] = [];
    let opticalClear = true;
    let rfClear = true;
    let minClearance = 999999;
    let worstFraction = 0.5;

    for (let i = 0; i <= numSamples; i++) {
      const frac = i / numSamples;
      const curLon = txLon + (rxLon - txLon) * frac;
      const curLat = txLat + (rxLat - txLat) * frac;
      const d1 = totalDistKm * frac;
      const d2 = totalDistKm * (1 - frac);

      const ground = TopographyElevationEngine.estimateElevation(curLon, curLat).elevationM;

      // Earth curvature bulge (meters) with 4/3 refraction: (d1 * d2) / (2 * Re) * 1000
      const earthBulgeMeters = (d1 * d2) / (2 * this.EFFECTIVE_EARTH_RADIUS_KM) * 1000;
      const effectiveGround = ground + earthBulgeMeters;

      // Direct ray altitude
      const losAlt = txTotalAlt + (rxTotalAlt - txTotalAlt) * frac;

      // 1st Fresnel zone radius: r1 = 17.32 * sqrt((d1 * d2) / (f_GHz * D))
      let fresnelRadius = 0;
      if (totalDistKm > 0.05 && frac > 0 && frac < 1) {
        fresnelRadius = 17.32 * Math.sqrt((d1 * d2) / (frequencyGHz * totalDistKm));
      }

      const clearance = losAlt - effectiveGround;
      const requiredClearance = 0.6 * fresnelRadius; // 60% clearance threshold standard
      const isObstructed = clearance < requiredClearance;

      if (clearance < 0) {
        opticalClear = false;
      }
      if (isObstructed) {
        rfClear = false;
      }

      if (clearance < minClearance) {
        minClearance = clearance;
        worstFraction = frac;
      }

      points.push({
        index: i,
        fraction: frac,
        distanceKm: d1,
        lon: curLon,
        lat: curLat,
        groundElevationMeters: ground,
        earthBulgeMeters,
        effectiveGroundMeters: effectiveGround,
        losRayAltitudeMeters: losAlt,
        fresnelRadiusMeters: fresnelRadius,
        clearanceMeters: clearance,
        isObstructed
      });
    }

    return {
      distanceKm: totalDistKm,
      distanceMiles: totalDistMiles,
      txAltitudeMeters: txTotalAlt,
      rxAltitudeMeters: rxTotalAlt,
      opticalLosClear: opticalClear,
      rfFresnelClear: rfClear,
      minClearanceMeters: Math.round(minClearance * 10) / 10,
      worstObstructionFraction: worstFraction,
      frequencyGHz,
      points
    };
  }

  private static haversineDistanceKm(lon1: number, lat1: number, lon2: number, lat2: number): number {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
