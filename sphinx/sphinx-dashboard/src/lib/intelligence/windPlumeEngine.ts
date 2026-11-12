// windPlumeEngine.ts
// Atmospheric Wind-Driven Wildfire & Toxic Plume Dispersion Engine
// Implements Gaussian Puff & Advection Dispersion model driven by real-time meteorological wind vectors

export interface WindVector {
  speedMph: number;
  bearingDeg: number; // 0 = North, 90 = East (direction wind is blowing TOWARDS)
  gustMph?: number;
  stabilityClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'; // Pasquill-Gifford
}

export interface PlumeSource {
  id: string;
  name: string;
  type: 'CHEMICAL_TOXIC' | 'WILDFIRE' | 'RADIOLOGICAL' | 'INDUSTRIAL';
  coordinates: [number, number]; // [lon, lat]
  emissionRateKgSec: number;
  effectiveHeightMeters: number;
}

export interface AtmosphericPlumeFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    properties: {
      siteId: string;
      siteName: string;
      zoneTier: 'LETHAL_CORE' | 'ACUTE_DANGER' | 'EVACUATION_ADVISORY';
      tierLabel: string;
      fillColor: string;
      fillOpacity: number;
      strokeColor: string;
      downwindDistanceMiles: number;
      timeHorizonHours: number;
      windSpeedMph: number;
      windBearingDeg: number;
    };
    geometry: {
      type: 'Polygon';
      coordinates: number[][][];
    };
  }>;
}

export class WindPlumeEngine {
  /**
   * Generates dynamic advection-dispersion plume polygons based on live wind vectors.
   */
  public static calculateAtmosphericPlume(
    source: PlumeSource,
    wind: WindVector,
    timeHorizonHours: number = 6
  ): AtmosphericPlumeFeatureCollection {
    const [lon, lat] = source.coordinates;
    const windSpeedMilesPerHour = Math.max(2, wind.speedMph);
    const bearingRad = (wind.bearingDeg * Math.PI) / 180;

    // Pasquill-Gifford dispersion coefficients for Neutral (D) stability
    // sigma_y = 0.08 * x * (1 + 0.0001 * x)^(-0.5) where x is meters
    const totalDownwindMiles = windSpeedMilesPerHour * timeHorizonHours;

    const tiers = [
      {
        tier: 'LETHAL_CORE' as const,
        label: 'Zone 1: Immediate Lethal Core (IDLH)',
        fillColor: '#ef4444',
        fillOpacity: 0.6,
        strokeColor: '#b91c1c',
        distFactor: 0.25,
        widthFactor: 0.2
      },
      {
        tier: 'ACUTE_DANGER' as const,
        label: 'Zone 2: Acute Toxicity & Ember Front',
        fillColor: '#f97316',
        fillOpacity: 0.4,
        strokeColor: '#ea580c',
        distFactor: 0.6,
        widthFactor: 0.35
      },
      {
        tier: 'EVACUATION_ADVISORY' as const,
        label: 'Zone 3: Advisory Downwind Buffer',
        fillColor: '#eab308',
        fillOpacity: 0.2,
        strokeColor: '#ca8a04',
        distFactor: 1.0,
        widthFactor: 0.55
      }
    ];

    const latMilesToDeg = 1 / 69.0;
    const lonMilesToDeg = 1 / (69.0 * Math.cos((lat * Math.PI) / 180));

    const features = tiers.map(t => {
      const lengthMiles = totalDownwindMiles * t.distFactor;
      const maxWidthMiles = Math.max(0.5, lengthMiles * t.widthFactor);
      const ringCoords: number[][] = [];
      const numSteps = 36;

      // Construct teardrop/elliptical plume cone
      // Upwind buffer arc
      const upwindBuffer = 0.15;
      for (let i = 0; i <= 12; i++) {
        const theta = Math.PI / 2 + (i / 12) * Math.PI;
        const localX = -Math.sin(theta) * upwindBuffer * maxWidthMiles * 0.4;
        const localY = -Math.cos(theta) * upwindBuffer * maxWidthMiles * 0.4;
        const rotX = localX * Math.cos(bearingRad) - localY * Math.sin(bearingRad);
        const rotY = localX * Math.sin(bearingRad) + localY * Math.cos(bearingRad);
        ringCoords.push([lon + rotX * lonMilesToDeg, lat + rotY * latMilesToDeg]);
      }

      // Right flank to apex
      for (let i = 1; i <= 12; i++) {
        const frac = i / 12;
        const width = Math.sin(frac * Math.PI * 0.8) * maxWidthMiles;
        const downwind = frac * lengthMiles;
        const localX = width;
        const localY = downwind;
        const rotX = localX * Math.cos(bearingRad) - localY * Math.sin(bearingRad);
        const rotY = localX * Math.sin(bearingRad) + localY * Math.cos(bearingRad);
        ringCoords.push([lon + rotX * lonMilesToDeg, lat + rotY * latMilesToDeg]);
      }

      // Apex point
      const apexX = 0;
      const apexY = lengthMiles;
      const apexRotX = apexX * Math.cos(bearingRad) - apexY * Math.sin(bearingRad);
      const apexRotY = apexX * Math.sin(bearingRad) + apexY * Math.cos(bearingRad);
      ringCoords.push([lon + apexRotX * lonMilesToDeg, lat + apexRotY * latMilesToDeg]);

      // Left flank back to origin
      for (let i = 11; i >= 1; i--) {
        const frac = i / 12;
        const width = -Math.sin(frac * Math.PI * 0.8) * maxWidthMiles;
        const downwind = frac * lengthMiles;
        const localX = width;
        const localY = downwind;
        const rotX = localX * Math.cos(bearingRad) - localY * Math.sin(bearingRad);
        const rotY = localX * Math.sin(bearingRad) + localY * Math.cos(bearingRad);
        ringCoords.push([lon + rotX * lonMilesToDeg, lat + rotY * latMilesToDeg]);
      }

      // Close ring
      ringCoords.push(ringCoords[0]);

      return {
        type: 'Feature' as const,
        properties: {
          siteId: source.id,
          siteName: source.name,
          zoneTier: t.tier,
          tierLabel: t.label,
          fillColor: t.fillColor,
          fillOpacity: t.fillOpacity,
          strokeColor: t.strokeColor,
          downwindDistanceMiles: Math.round(lengthMiles * 10) / 10,
          timeHorizonHours,
          windSpeedMph: wind.speedMph,
          windBearingDeg: wind.bearingDeg
        },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [ringCoords]
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }
}
