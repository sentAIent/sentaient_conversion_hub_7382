// sphinx-dashboard/src/lib/weatherPressureEngine.ts
// Regional Atmospheric Surface Pressure, Isobars & High/Low Centroid Engine

export interface IsobarFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: {
      type: 'LineString' | 'Point';
      coordinates: any;
    };
    properties: {
      id: string;
      kind: 'isobar' | 'pressure_center' | 'gradient_arrow';
      pressureHpa: number;
      pressureInHg: number;
      label: string;
      centerType?: 'HIGH' | 'LOW';
      color: string;
      weight?: number;
      trend?: 'rising' | 'steady' | 'falling';
    };
  }>;
}

export function hpaToInHg(hpa: number): number {
  return Math.round(hpa * 0.0295301 * 100) / 100;
}

export function generateIsobarField(
  centerLat: number,
  centerLon: number,
  basePressureHpa: number = 1013.2
): IsobarFeatureCollection {
  const features: IsobarFeatureCollection['features'] = [];

  // Regional pressure centers determined by geography and base pressure
  const highOffsetLon = Math.sin(centerLat * 0.05) * 8 - 6;
  const highOffsetLat = Math.cos(centerLon * 0.05) * 4 + 3;
  const highLat = centerLat + highOffsetLat;
  const highLon = centerLon + highOffsetLon;
  const highPressure = Math.round((Math.max(1016, basePressureHpa + 8)) * 10) / 10;

  const lowOffsetLon = -highOffsetLon * 0.85 + 5;
  const lowOffsetLat = -highOffsetLat * 0.8 - 4;
  const lowLat = centerLat + lowOffsetLat;
  const lowLon = centerLon + lowOffsetLon;
  const lowPressure = Math.round((Math.min(1004, basePressureHpa - 9)) * 10) / 10;

  // 1. High Pressure Centroid [H]
  features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [highLon, highLat]
    },
    properties: {
      id: 'pressure-center-high',
      kind: 'pressure_center',
      centerType: 'HIGH',
      pressureHpa: highPressure,
      pressureInHg: hpaToInHg(highPressure),
      label: `H ${highPressure} hPa (${hpaToInHg(highPressure)} inHg)`,
      color: '#38bdf8',
      trend: 'rising'
    }
  });

  // 2. Low Pressure Centroid [L]
  features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lowLon, lowLat]
    },
    properties: {
      id: 'pressure-center-low',
      kind: 'pressure_center',
      centerType: 'LOW',
      pressureHpa: lowPressure,
      pressureInHg: hpaToInHg(lowPressure),
      label: `L ${lowPressure} hPa (${hpaToInHg(lowPressure)} inHg)`,
      color: '#f87171',
      trend: 'falling'
    }
  });

  // 3. Generate smooth elliptical isobars around High and Low
  const standardIsobars = [1000, 1004, 1008, 1012, 1016, 1020, 1024];

  standardIsobars.forEach((pVal, idx) => {
    const isHighRing = pVal >= 1014;
    const originLat = isHighRing ? highLat : lowLat;
    const originLon = isHighRing ? highLon : lowLon;
    const deltaP = Math.abs(isHighRing ? highPressure - pVal : pVal - lowPressure);
    const radiusDeg = Math.max(1.8, Math.min(18, 1.8 + (deltaP * 1.4) + (idx * 0.7)));

    const coords: number[][] = [];
    const steps = 36;
    const stretch = isHighRing ? 1.35 : 1.2;
    const angleTilt = 0.45;

    for (let step = 0; step <= steps; step++) {
      const angle = (step / steps) * 2 * Math.PI;
      const x = Math.cos(angle) * radiusDeg * stretch;
      const y = Math.sin(angle) * radiusDeg;
      // rotate by tilt
      const rotX = x * Math.cos(angleTilt) - y * Math.sin(angleTilt);
      const rotY = x * Math.sin(angleTilt) + y * Math.cos(angleTilt);

      // deform with realistic atmospheric waviness (Rossby wave harmonics)
      const wave = Math.sin(angle * 3) * (radiusDeg * 0.12);
      const lon = originLon + (rotX + wave) / Math.cos(centerLat * (Math.PI / 180));
      const lat = originLat + rotY + (wave * 0.7);

      coords.push([Math.round(lon * 10000) / 10000, Math.round(lat * 10000) / 10000]);
    }

    const inHg = hpaToInHg(pVal);
    const color = pVal >= 1020 ? '#38bdf8' : pVal >= 1012 ? '#93c5fd' : pVal >= 1008 ? '#fcd34d' : '#f87171';

    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coords
      },
      properties: {
        id: `isobar-${pVal}`,
        kind: 'isobar',
        pressureHpa: pVal,
        pressureInHg: inHg,
        label: `${pVal} hPa // ${inHg} inHg`,
        color,
        weight: pVal % 8 === 0 ? 2 : 1.2
      }
    });
  });

  return {
    type: 'FeatureCollection',
    features
  };
}
