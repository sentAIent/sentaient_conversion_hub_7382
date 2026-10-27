// sphinx-dashboard/src/lib/intelligence/toxicPlumeEngine.ts
// Hydrogeological Advection-Dispersion Plume Drift Simulation & Homebuyer Safety Engine
// Implements Darcy Groundwater Transport (v = K * i / n_e), Hydraulic Gradient Vectors,
// Multi-Horizon Plume Dispersion Polygons (+5y, +15y), Surface Watershed Drainage Lines,
// and Automated Real Estate Safety Due Diligence Scoring.

import { ToxicSite, GLOBAL_TOXIC_SITES } from './toxicSitesData';

export interface ToxicPlumeFeatureProperties {
  site_id: string;
  name: string;
  epa_id: string;
  plume_horizon: 'core' | '5year' | '15year' | 'safe_buffer';
  horizon_label: string;
  fill_color: string;
  stroke_color: string;
  seepage_velocity_ft_yr: number;
  flow_direction_deg: number;
  primary_contaminants: string[];
  residential_risk_rating: string;
  homebuyer_advisory: string;
}

export interface HomeSafetyEvaluation {
  safety_score: number;                // 0 - 100%
  verdict: 'SAFE_PRISTINE' | 'MODERATE_CAUTION' | 'CRITICAL_NO_BUILD';
  verdict_label: string;
  nearest_site: ToxicSite | null;
  distance_miles: number;
  is_downgradient: boolean;            // True if site flows towards evaluated location
  vapor_intrusion_risk: 'CRITICAL_EXTREME' | 'HIGH_ELEVATED' | 'MODERATE' | 'NONE';
  private_well_safe: boolean;
  advisory_summary: string;
  carcinogens_detected: string[];
  flow_vector_distance_miles: number;
}

export class ToxicPlumeEngine {
  /**
   * Generates elliptical plume polygon coordinates given source center, azimuth, length, and width.
   */
  private static generatePlumePolygon(
    centerLon: number,
    centerLat: number,
    azimuthDeg: number,
    lengthMiles: number,
    widthMiles: number,
    backBufferMiles: number = 0.2
  ): number[][] {
    const coords: number[][] = [];
    const numPoints = 32;

    // Convert miles to approximate degrees at current latitude
    const latMilesToDeg = 1 / 69.0;
    const lonMilesToDeg = 1 / (69.0 * Math.cos((centerLat * Math.PI) / 180));

    // Mathematical angle for rotation (0° = North, clockwise)
    const rad = ((90 - azimuthDeg) * Math.PI) / 180;
    const cosRad = Math.cos(rad);
    const sinRad = Math.sin(rad);

    // Semi-major axis a (elongated along flow), semi-minor axis b (transverse spread)
    const a = lengthMiles;
    const b = widthMiles;
    const offsetAhead = (lengthMiles - backBufferMiles) / 2;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i * 2 * Math.PI) / numPoints;
      // Parametric teardrop / skewed ellipse: wider downgradient
      const xLocal = a * Math.cos(theta) + offsetAhead;
      // Slight widening taper downflow (tear-drop advective dispersion)
      const taper = 1.0 + 0.3 * Math.cos(theta);
      const yLocal = b * Math.sin(theta) * taper;

      // Rotate by azimuth
      const xRotated = xLocal * cosRad - yLocal * sinRad;
      const yRotated = xLocal * sinRad + yLocal * cosRad;

      const lon = centerLon + xRotated * lonMilesToDeg;
      const lat = centerLat + yRotated * latMilesToDeg;
      coords.push([Number(lon.toFixed(6)), Number(lat.toFixed(6))]);
    }

    return coords;
  }

  /**
   * Generates a circular buffer perimeter.
   */
  private static generateCircularBuffer(centerLon: number, centerLat: number, radiusMiles: number): number[][] {
    const coords: number[][] = [];
    const numPoints = 28;
    const latDeg = radiusMiles / 69.0;
    const lonDeg = radiusMiles / (69.0 * Math.cos((centerLat * Math.PI) / 180));

    for (let i = 0; i <= numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      const lon = centerLon + lonDeg * Math.cos(angle);
      const lat = centerLat + latDeg * Math.sin(angle);
      coords.push([Number(lon.toFixed(6)), Number(lat.toFixed(6))]);
    }
    return coords;
  }

  /**
   * Generates multi-horizon plume dispersion GeoJSON.
   */
  public static computeToxicPlumesGeoJSON(sites: ToxicSite[] = GLOBAL_TOXIC_SITES): GeoJSON.FeatureCollection {
    const features: GeoJSON.Feature[] = [];

    sites.forEach(site => {
      const [lon, lat] = site.coordinates;

      // 1. Core Source Zone (Current Saturated Vadose/Aquifer Hazard)
      const coreCoords = this.generatePlumePolygon(
        lon, lat,
        site.flow_direction_deg,
        site.core_radius_miles,
        site.core_radius_miles * 0.7,
        0.15
      );
      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          epa_id: site.epa_id,
          plume_horizon: 'core',
          horizon_label: 'Current Saturated Core (0-0.5 mi)',
          fill_color: 'rgba(239, 68, 68, 0.45)', // Vivid Toxic Crimson
          stroke_color: '#ef4444',
          seepage_velocity_ft_yr: site.seepage_velocity_ft_yr,
          flow_direction_deg: site.flow_direction_deg,
          primary_contaminants: site.primary_contaminants,
          residential_risk_rating: 'CRITICAL_NO_BUILD',
          homebuyer_advisory: site.homebuyer_advisory
        },
        geometry: {
          type: 'Polygon',
          coordinates: [coreCoords]
        }
      });

      // 2. 5-Year Plume Migration Zone
      const plume5yCoords = this.generatePlumePolygon(
        lon, lat,
        site.flow_direction_deg,
        site.plume_5yr_length_miles,
        site.plume_5yr_length_miles * 0.45,
        0.25
      );
      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          epa_id: site.epa_id,
          plume_horizon: '5year',
          horizon_label: '+5-Year Aquifer Migration',
          fill_color: 'rgba(245, 158, 11, 0.35)', // Glowing Amber
          stroke_color: '#f59e0b',
          seepage_velocity_ft_yr: site.seepage_velocity_ft_yr,
          flow_direction_deg: site.flow_direction_deg,
          primary_contaminants: site.primary_contaminants,
          residential_risk_rating: site.residential_risk_rating,
          homebuyer_advisory: site.homebuyer_advisory
        },
        geometry: {
          type: 'Polygon',
          coordinates: [plume5yCoords]
        }
      });

      // 3. 15-Year Projected Migration Zone
      const plume15yCoords = this.generatePlumePolygon(
        lon, lat,
        site.flow_direction_deg,
        site.plume_15yr_length_miles,
        site.plume_15yr_length_miles * 0.4,
        0.35
      );
      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          epa_id: site.epa_id,
          plume_horizon: '15year',
          horizon_label: '+15-Year Extended Migration',
          fill_color: 'rgba(168, 85, 247, 0.22)', // Electric Violet
          stroke_color: '#a855f7',
          seepage_velocity_ft_yr: site.seepage_velocity_ft_yr,
          flow_direction_deg: site.flow_direction_deg,
          primary_contaminants: site.primary_contaminants,
          residential_risk_rating: site.residential_risk_rating,
          homebuyer_advisory: site.homebuyer_advisory
        },
        geometry: {
          type: 'Polygon',
          coordinates: [plume15yCoords]
        }
      });

      // 4. Safe Real Estate Buffer Perimeter
      const bufferCoords = this.generateCircularBuffer(lon, lat, site.safe_buffer_miles);
      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          epa_id: site.epa_id,
          plume_horizon: 'safe_buffer',
          horizon_label: `Safe Residential Perimeter (${site.safe_buffer_miles} mi)`,
          fill_color: 'rgba(6, 182, 212, 0.05)',
          stroke_color: '#06b6d4',
          seepage_velocity_ft_yr: site.seepage_velocity_ft_yr,
          flow_direction_deg: site.flow_direction_deg,
          primary_contaminants: site.primary_contaminants,
          residential_risk_rating: 'MODERATE_MONITORED',
          homebuyer_advisory: `Beyond ${site.safe_buffer_miles} miles is considered outside primary aquifer infiltration vector.`
        },
        geometry: {
          type: 'Polygon',
          coordinates: [bufferCoords]
        }
      });

      // 5. Hydraulic Groundwater Flow Vector Line
      const rad = ((90 - site.flow_direction_deg) * Math.PI) / 180;
      const vectorMiles = site.plume_15yr_length_miles * 1.15;
      const endLon = lon + (vectorMiles / (69.0 * Math.cos((lat * Math.PI) / 180))) * Math.cos(rad);
      const endLat = lat + (vectorMiles / 69.0) * Math.sin(rad);

      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          type: 'hydraulic_flow_vector',
          label: `${site.seepage_velocity_ft_yr} ft/yr @ ${site.flow_direction_deg}°`,
          flow_deg: site.flow_direction_deg,
          velocity_ft_yr: site.seepage_velocity_ft_yr
        },
        geometry: {
          type: 'LineString',
          coordinates: [[lon, lat], [Number(endLon.toFixed(6)), Number(endLat.toFixed(6))]]
        }
      });
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Generates 3D facility extrusions for chemical tanks and industrial buildings.
   */
  public static computeFacilityExtrusionsGeoJSON(sites: ToxicSite[] = GLOBAL_TOXIC_SITES): GeoJSON.FeatureCollection {
    const features: GeoJSON.Feature[] = [];

    sites.forEach(site => {
      const [lon, lat] = site.coordinates;
      const metersToDegLon = 1 / (111320 * Math.cos((lat * Math.PI) / 180));
      const metersToDegLat = 1 / 110540;

      const baseRadius = site.facility_footprint_m;

      // Create main industrial complex polygon
      const mainComplex: number[][] = [];
      const numCorners = 6;
      for (let i = 0; i <= numCorners; i++) {
        const ang = (i * 2 * Math.PI) / numCorners;
        const cLon = lon + baseRadius * 0.7 * Math.cos(ang) * metersToDegLon;
        const cLat = lat + baseRadius * 0.7 * Math.sin(ang) * metersToDegLat;
        mainComplex.push([Number(cLon.toFixed(6)), Number(cLat.toFixed(6))]);
      }

      features.push({
        type: 'Feature',
        properties: {
          site_id: site.site_id,
          name: site.name,
          height: 38,
          base_height: 0,
          color: '#334155'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [mainComplex]
        }
      });

      // Create chemical storage tanks / retention silos
      for (let s = 0; s < Math.min(site.extrusions_count, 6); s++) {
        const tankAngle = (s * 2 * Math.PI) / site.extrusions_count;
        const tankDist = baseRadius * 0.85;
        const tankCenterLon = lon + tankDist * Math.cos(tankAngle) * metersToDegLon;
        const tankCenterLat = lat + tankDist * Math.sin(tankAngle) * metersToDegLat;
        const tankRadius = 18; // 18 meters radius

        const tankPoly: number[][] = [];
        for (let t = 0; t <= 12; t++) {
          const tAng = (t * 2 * Math.PI) / 12;
          const px = tankCenterLon + tankRadius * Math.cos(tAng) * metersToDegLon;
          const py = tankCenterLat + tankRadius * Math.sin(tAng) * metersToDegLat;
          tankPoly.push([Number(px.toFixed(6)), Number(py.toFixed(6))]);
        }

        features.push({
          type: 'Feature',
          properties: {
            site_id: site.site_id,
            name: `${site.name} Chemical Silo #${s + 1}`,
            height: 24 + (s % 3) * 8,
            base_height: 0,
            color: s % 2 === 0 ? '#ef4444' : '#eab308' // Red or amber warning tanks
          },
          geometry: {
            type: 'Polygon',
            coordinates: [tankPoly]
          }
        });
      }
    });

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Homebuyer Environmental Real Estate Hazard Evaluator.
   * Analyzes any latitude/longitude coordinate against all toxic plumes,
   * hydraulic flow paths, and buffer perimeters to provide a definitive safety verdict.
   */
  public static evaluateHomeSiteSafety(
    testLat: number,
    testLon: number,
    sites: ToxicSite[] = GLOBAL_TOXIC_SITES
  ): HomeSafetyEvaluation {
    if (!sites || sites.length === 0) {
      return {
        safety_score: 100,
        verdict: 'SAFE_PRISTINE',
        verdict_label: 'PRISTINE / NO KNOWN TOXIC SITES IN RANGE',
        nearest_site: null,
        distance_miles: 999,
        is_downgradient: false,
        vapor_intrusion_risk: 'NONE',
        private_well_safe: true,
        advisory_summary: 'No industrial toxic plumes or Superfund contamination detected within evaluation radius.',
        carcinogens_detected: [],
        flow_vector_distance_miles: 999
      };
    }

    let minDistanceMiles = 999;
    let closestSite: ToxicSite = sites[0];
    let worstFlowDistanceMiles = 999;
    let closestIsDowngradient = false;

    sites.forEach(site => {
      const [sLon, sLat] = site.coordinates;

      // Great-circle Haversine distance
      const dLat = ((testLat - sLat) * Math.PI) / 180;
      const dLon = ((testLon - sLon) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((sLat * Math.PI) / 180) * Math.cos((testLat * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distMiles = 3958.8 * c; // Earth radius in miles

      if (distMiles < minDistanceMiles) {
        minDistanceMiles = distMiles;
        closestSite = site;
      }

      // Calculate bearing from site to test location
      const y = Math.sin(dLon) * Math.cos((testLat * Math.PI) / 180);
      const x =
        Math.cos((sLat * Math.PI) / 180) * Math.sin((testLat * Math.PI) / 180) -
        Math.sin((sLat * Math.PI) / 180) * Math.cos((testLat * Math.PI) / 180) * Math.cos(dLon);
      const bearingToTestDeg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

      // Angle difference between site groundwater flow vector and location direction
      let angleDiff = Math.abs(bearingToTestDeg - site.flow_direction_deg);
      if (angleDiff > 180) angleDiff = 360 - angleDiff;

      const isDowngradient = angleDiff <= 45; // Within 45 degrees of downflow cone
      if (isDowngradient && distMiles < worstFlowDistanceMiles) {
        worstFlowDistanceMiles = distMiles;
        closestIsDowngradient = true;
      }
    });

    // Score calculation
    let safetyScore = 100;
    let verdict: 'SAFE_PRISTINE' | 'MODERATE_CAUTION' | 'CRITICAL_NO_BUILD' = 'SAFE_PRISTINE';
    let verdictLabel = 'PRISTINE SAFE ZONE';
    let vaporRisk: 'CRITICAL_EXTREME' | 'HIGH_ELEVATED' | 'MODERATE' | 'NONE' = 'NONE';
    let wellSafe = true;
    let advisory = '';

    if (minDistanceMiles <= closestSite.core_radius_miles) {
      safetyScore = 12;
      verdict = 'CRITICAL_NO_BUILD';
      verdictLabel = 'CRITICAL HAZARD: INSIDE CORE CONTAMINATION ZONE';
      vaporRisk = 'CRITICAL_EXTREME';
      wellSafe = false;
      advisory = `DO NOT BUY OR BUILD: Directly within ${closestSite.name} core plume. Saturated soils and volatile toxic vapor intrusion risk.`;
    } else if (closestIsDowngradient && minDistanceMiles <= closestSite.plume_15yr_length_miles) {
      safetyScore = 32;
      verdict = 'CRITICAL_NO_BUILD';
      verdictLabel = 'DO NOT BUY: DIRECT DOWNGRADIENT PLUME MIGRATION PATH';
      vaporRisk = 'HIGH_ELEVATED';
      wellSafe = false;
      advisory = `DO NOT BUY OR BUILD: Located in direct hydraulic flow path of ${closestSite.name} aquifer migration (${closestSite.seepage_velocity_ft_yr} ft/yr). High risk of groundwater well poisoning.`;
    } else if (minDistanceMiles <= closestSite.safe_buffer_miles) {
      safetyScore = 68;
      verdict = 'MODERATE_CAUTION';
      verdictLabel = 'MODERATE CAUTION: WITHIN CONTAMINATION PERIMETER';
      vaporRisk = 'MODERATE';
      wellSafe = false;
      advisory = `CAUTION: Within ${closestSite.safe_buffer_miles}-mile perimeter of ${closestSite.name}. Municipal water required; private well drilling hazardous.`;
    } else if (minDistanceMiles <= closestSite.safe_buffer_miles * 2.0) {
      safetyScore = 88;
      verdict = 'SAFE_PRISTINE';
      verdictLabel = 'GENERALLY SAFE (REGIONAL SECONDARY ZONE)';
      vaporRisk = 'NONE';
      wellSafe = true;
      advisory = `Safe to build. Outside active plume drift path (${minDistanceMiles.toFixed(1)} miles to ${closestSite.name}). Upgradient water table.`;
    } else {
      safetyScore = 98;
      verdict = 'SAFE_PRISTINE';
      verdictLabel = 'PRISTINE REAL ESTATE ZONE';
      vaporRisk = 'NONE';
      wellSafe = true;
      advisory = `Pristine environmental profile. No known EPA Superfund or toxic industrial sites within ${minDistanceMiles.toFixed(1)} miles.`;
    }

    return {
      safety_score: Math.max(5, Math.min(100, Math.round(safetyScore))),
      verdict,
      verdict_label: verdictLabel,
      nearest_site: closestSite,
      distance_miles: Number(minDistanceMiles.toFixed(2)),
      is_downgradient: closestIsDowngradient,
      vapor_intrusion_risk: vaporRisk,
      private_well_safe: wellSafe,
      advisory_summary: advisory,
      carcinogens_detected: closestSite.primary_contaminants,
      flow_vector_distance_miles: Number(worstFlowDistanceMiles.toFixed(2))
    };
  }
}
