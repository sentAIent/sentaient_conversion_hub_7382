// sphinx-dashboard/src/lib/fireSpreadEngine.ts
// Rothermel / Huygens Elliptical Fire Spread Projection Engine

export interface WeatherVector {
  windSpeedKnots: number;
  windGustKnots: number;
  windDirectionDeg: number; // Meteorological (direction wind is blowing from)
  tempC: number;
  humidity: number;
}

export interface FireSpreadFeature {
  type: 'Feature';
  properties: {
    id: string;
    fireId: string;
    incidentName: string;
    horizon: '+1h' | '+3h' | '+6h' | '+12h';
    hours: number;
    rosKmh: number;
    rosMph: number;
    windSpeedKnots: number;
    windGustKnots: number;
    windDirectionDeg: number;
    tempC: number;
    humidity: number;
    fillColor: string;
    strokeColor: string;
    isPerimeter: boolean;
    isLabel?: boolean;
    labelText?: string;
  };
  geometry: {
    type: 'Polygon' | 'Point' | 'LineString';
    coordinates: any;
  };
}

const HORIZON_CONFIGS = [
  { hours: 1, horizon: '+1h' as const, fillColor: 'rgba(239, 68, 68, 0.40)', strokeColor: '#ef4444' },     // Fiery Red
  { hours: 3, horizon: '+3h' as const, fillColor: 'rgba(249, 115, 22, 0.30)', strokeColor: '#f97316' },    // Bright Orange
  { hours: 6, horizon: '+6h' as const, fillColor: 'rgba(234, 179, 8, 0.20)', strokeColor: '#eab308' },     // Amber / Yellow
  { hours: 12, horizon: '+12h' as const, fillColor: 'rgba(168, 85, 247, 0.15)', strokeColor: '#c084fc' },  // Tactical Orchid/Violet
];

export function computeFireSpreadForecast(
  wildfireFeatures: any[],
  weather: WeatherVector,
  maxFires: number = 60,
  bbox?: [number, number, number, number] | null,
  horizonFilter?: string | null
): { type: 'FeatureCollection'; features: FireSpreadFeature[] } {
  if (!wildfireFeatures || wildfireFeatures.length === 0) {
    return { type: 'FeatureCollection', features: [] };
  }

  // If viewport bbox provided [minLon, minLat, maxLon, maxLat], prioritize visible fires
  let candidates: any[] = [];
  if (bbox && bbox.length === 4 && bbox.every(n => typeof n === 'number' && !isNaN(n))) {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    // Add small buffer around viewport
    const padLon = (maxLon - minLon) * 0.15;
    const padLat = (maxLat - minLat) * 0.15;
    const inView = wildfireFeatures.filter(f => {
      const c = f.geometry?.coordinates;
      return c && c[0] >= minLon - padLon && c[0] <= maxLon + padLon &&
                  c[1] >= minLat - padLat && c[1] <= maxLat + padLat;
    });

    if (inView.length > 0) {
      inView.sort((a, b) => {
        const frpA = Number(a.properties?.frp) || Number(a.properties?.brightness) || 0;
        const frpB = Number(b.properties?.frp) || Number(b.properties?.brightness) || 0;
        return frpB - frpA;
      });
      candidates = inView.slice(0, maxFires);
    }
  }

  // If no fires in view or no bbox, fallback to top nation-wide fires
  if (candidates.length === 0) {
    candidates = [...wildfireFeatures]
      .sort((a, b) => {
        const frpA = Number(a.properties?.frp) || Number(a.properties?.brightness) || 0;
        const frpB = Number(b.properties?.frp) || Number(b.properties?.brightness) || 0;
        return frpB - frpA;
      })
      .slice(0, maxFires);
  }

  const windKnots = Math.max(2, weather.windSpeedKnots || 12);
  const windDir = weather.windDirectionDeg || 240;
  const tempC = weather.tempC || 20;
  const humidity = weather.humidity || 50;

  // Meteorological wind: blows FROM windDir. Fire spreads TOWARDS (windDir + 180) % 360
  const spreadDeg = (windDir + 180) % 360;
  // Mathematical cartesian angle in radians (0 = East, PI/2 = North)
  const thetaRad = ((90 - spreadDeg) * Math.PI) / 180;

  // Rate of spread (km/h) using Rothermel empirical approximation
  const windKmh = windKnots * 1.852;
  const lengthToWidth = Math.min(5.5, 1.0 + 0.11 * windKmh);
  const tempMultiplier = 1.0 + Math.max(0, (tempC - 18) * 0.025);
  const humidityMultiplier = 1.0 + Math.max(0, (55 - humidity) * 0.02);
  const baseRosKmh = 0.07;
  const headRosKmh = baseRosKmh * (1.0 + 0.05 * Math.pow(windKmh, 1.25)) * tempMultiplier * humidityMultiplier;
  const rosKmh = Math.round(headRosKmh * 10) / 10;
  const rosMph = Math.round(headRosKmh * 0.621371 * 10) / 10;

  const features: FireSpreadFeature[] = [];

  for (const fire of candidates) {
    const coords = fire.geometry?.coordinates;
    if (!coords || !Array.isArray(coords) || coords.length < 2) continue;
    const originLon = coords[0];
    const originLat = coords[1];
    if (typeof originLon !== 'number' || typeof originLat !== 'number') continue;

    const fireId = String(fire.properties?.id || fire.properties?.incident_name || `${originLat.toFixed(3)},${originLon.toFixed(3)}`);
    const incidentName = fire.properties?.incident_name || fire.properties?.name || 'Active Wildfire Hotspot';

    // Lat/Lon distance conversion
    const latKm = 111.32;
    const lonKm = 111.32 * Math.cos((originLat * Math.PI) / 180);

    for (const config of HORIZON_CONFIGS) {
      if (horizonFilter && horizonFilter !== 'all' && config.horizon !== horizonFilter) {
        continue;
      }
      const t = config.hours;
      const headDistKm = headRosKmh * t;
      const backDistKm = (headRosKmh / (2 * lengthToWidth)) * t;
      const majorAxisA = (headDistKm + backDistKm) / 2;
      const minorAxisB = majorAxisA / lengthToWidth;
      const centerDistKm = (headDistKm - backDistKm) / 2;

      // Center of ellipse offset downwind from ignition
      const centerDxKm = centerDistKm * Math.cos(thetaRad);
      const centerDyKm = centerDistKm * Math.sin(thetaRad);
      const centerLon = originLon + centerDxKm / lonKm;
      const centerLat = originLat + centerDyKm / latKm;

      // Build 32-point rotated ellipse polygon
      const numPoints = 32;
      const ringCoords: [number, number][] = [];

      for (let i = 0; i <= numPoints; i++) {
        const phi = (i / numPoints) * 2 * Math.PI;
        // Point on canonical ellipse (a along x, b along y)
        const ex = majorAxisA * Math.cos(phi);
        const ey = minorAxisB * Math.sin(phi);

        // Rotate by thetaRad
        const rotDx = ex * Math.cos(thetaRad) - ey * Math.sin(thetaRad);
        const rotDy = ex * Math.sin(thetaRad) + ey * Math.cos(thetaRad);

        const ptLon = centerLon + rotDx / lonKm;
        const ptLat = centerLat + rotDy / latKm;
        ringCoords.push([ptLon, ptLat]);
      }

      // 1. Polygon Perimeter Feature
      features.push({
        type: 'Feature',
        properties: {
          id: `${fireId}_spread_${config.horizon}`,
          fireId,
          incidentName,
          horizon: config.horizon,
          hours: t,
          rosKmh,
          rosMph,
          windSpeedKnots: Math.round(windKnots * 10) / 10,
          windGustKnots: Math.round((weather.windGustKnots || windKnots * 1.4) * 10) / 10,
          windDirectionDeg: Math.round(windDir),
          tempC: Math.round(tempC * 10) / 10,
          humidity: Math.round(humidity),
          fillColor: config.fillColor,
          strokeColor: config.strokeColor,
          isPerimeter: true
        },
        geometry: {
          type: 'Polygon',
          coordinates: [ringCoords]
        }
      });

      // 2. Front Apex Label Feature (at the forward tip of the spread)
      const apexDxKm = headDistKm * Math.cos(thetaRad);
      const apexDyKm = headDistKm * Math.sin(thetaRad);
      const apexLon = originLon + apexDxKm / lonKm;
      const apexLat = originLat + apexDyKm / latKm;

      features.push({
        type: 'Feature',
        properties: {
          id: `${fireId}_label_${config.horizon}`,
          fireId,
          incidentName,
          horizon: config.horizon,
          hours: t,
          rosKmh,
          rosMph,
          windSpeedKnots: Math.round(windKnots * 10) / 10,
          windGustKnots: Math.round((weather.windGustKnots || windKnots * 1.4) * 10) / 10,
          windDirectionDeg: Math.round(windDir),
          tempC: Math.round(tempC * 10) / 10,
          humidity: Math.round(humidity),
          fillColor: config.fillColor,
          strokeColor: config.strokeColor,
          isPerimeter: false,
          isLabel: true,
          labelText: `${config.horizon} (+${Math.round(headDistKm * 10) / 10}km)`
        },
        geometry: {
          type: 'Point',
          coordinates: [apexLon, apexLat]
        }
      });
    }
  }

  return {
    type: 'FeatureCollection',
    features
  };
}
