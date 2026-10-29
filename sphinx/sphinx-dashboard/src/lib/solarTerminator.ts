// sphinx-dashboard/src/lib/solarTerminator.ts
// Real-time Astronomical Solar Terminator, Night Shadow & 3D AR Twilight Horizon

export interface SolarTerminatorResult {
  sunPosition: { lat: number; lon: number };
  nightPolygon: GeoJSON.FeatureCollection<GeoJSON.Polygon>;
  twilightRibbon: GeoJSON.FeatureCollection<GeoJSON.LineString>;
  solarZenithPoint: GeoJSON.FeatureCollection<GeoJSON.Point>;
  nightCityGlow: GeoJSON.FeatureCollection<GeoJSON.Point>;
  utcTimestamp: string;
}

export function computeSolarTerminator(date: Date = new Date()): SolarTerminatorResult {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const JD = (date.getTime() / 86400000) + 2440587.5;
  const D = JD - 2451545.0;

  // Solar coordinates
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * Math.sin(g * rad) + 0.020 * Math.sin(2 * g * rad)) % 360;
  const e = 23.439 - 0.00000036 * D;

  const delta = Math.asin(Math.sin(e * rad) * Math.sin(L * rad)) * deg;
  const alpha = Math.atan2(Math.cos(e * rad) * Math.sin(L * rad), Math.cos(L * rad)) * deg;
  const GMST = ((18.697374558 + 24.06570982441908 * D) % 24) * 15;

  let lonSun = (alpha - GMST) % 360;
  if (lonSun > 180) lonSun -= 360;
  if (lonSun < -180) lonSun += 360;
  const latSun = delta;

  // Compute terminator curve (great circle 90 degrees from subsolar point)
  // tan(lat) = -cos(lon - lonSun) / tan(latSun)
  const tanLatSun = Math.tan(latSun * rad);
  const terminatorPoints: [number, number][] = [];

  for (let lon = -180; lon <= 180; lon += 2) {
    let lat: number;
    if (Math.abs(tanLatSun) < 1e-6) {
      // Equinox: line connects poles
      lat = 0;
    } else {
      const term = -Math.cos((lon - lonSun) * rad) / tanLatSun;
      lat = Math.atan(term) * deg;
    }
    // Clamp to valid range
    lat = Math.max(-85, Math.min(85, lat));
    terminatorPoints.push([lon, lat]);
  }

  // Construct night hemisphere polygon
  // If sun is in southern hemisphere (latSun < 0), the north pole is in darkness (polar night)
  // If sun is in northern hemisphere (latSun > 0), the south pole is in darkness
  const darkPoleLat = latSun < 0 ? 89 : -89;
  const polygonCoords: [number, number][] = [
    [-180, darkPoleLat],
    ...terminatorPoints,
    [180, darkPoleLat],
    [-180, darkPoleLat]
  ];

  const nightPolygon: GeoJSON.FeatureCollection<GeoJSON.Polygon> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polygonCoords]
        },
        properties: {
          id: 'night-shadow-overlay',
          description: 'Tactical Nocturnal Hemisphere',
          sun_lat: latSun.toFixed(2),
          sun_lon: lonSun.toFixed(2),
          twilight: 'Astronomical & Civil Night'
        }
      }
    ]
  };

  const twilightRibbon: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: terminatorPoints
        },
        properties: {
          id: '3d-ar-twilight-ribbon',
          title: '3D AR Solar Terminator Horizon',
          sun_lat: latSun.toFixed(2),
          sun_lon: lonSun.toFixed(2),
          altitude_deg: 0
        }
      }
    ]
  };

  const solarZenithPoint: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lonSun, latSun]
        },
        properties: {
          id: 'subsolar-zenith',
          title: 'Solar Zenith (Sun Directly Overhead)',
          elevation_angle: 90
        }
      }
    ]
  };

  // Major global metro coordinates for cybernetic night city bloom
  const majorMetros = [
    { name: 'Tokyo', lon: 139.69, lat: 35.68, pop: 37 },
    { name: 'New York', lon: -74.00, lat: 40.71, pop: 19 },
    { name: 'London', lon: -0.12, lat: 51.50, pop: 14 },
    { name: 'Paris', lon: 2.35, lat: 48.85, pop: 11 },
    { name: 'Chicago', lon: -87.62, lat: 41.87, pop: 9 },
    { name: 'Los Angeles', lon: -118.24, lat: 34.05, pop: 13 },
    { name: 'Shanghai', lon: 121.47, lat: 31.23, pop: 26 },
    { name: 'Hong Kong', lon: 114.16, lat: 22.31, pop: 7 },
    { name: 'Singapore', lon: 103.81, lat: 1.35, pop: 6 },
    { name: 'Seoul', lon: 126.97, lat: 37.56, pop: 24 },
    { name: 'Dubai', lon: 55.27, lat: 25.20, pop: 4 },
    { name: 'Sydney', lon: 151.20, lat: -33.86, pop: 5 },
    { name: 'São Paulo', lon: -46.63, lat: -23.55, pop: 22 },
    { name: 'Frankfurt', lon: 8.68, lat: 50.11, pop: 3 },
    { name: 'Denver', lon: -104.99, lat: 39.73, pop: 3 },
    { name: 'Seattle', lon: -122.33, lat: 47.60, pop: 4 }
  ];

  // A city is in darkness if its angular distance to the sun > 90° (solar elevation < 0)
  const nightCities: GeoJSON.Feature<GeoJSON.Point>[] = [];
  for (const m of majorMetros) {
    const dLon = (m.lon - lonSun) * rad;
    const sinElevation = 
      Math.sin(m.lat * rad) * Math.sin(latSun * rad) +
      Math.cos(m.lat * rad) * Math.cos(latSun * rad) * Math.cos(dLon);
    const elevationDeg = Math.asin(sinElevation) * deg;

    if (elevationDeg < -3) { // Civil twilight or deeper night
      nightCities.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [m.lon, m.lat]
        },
        properties: {
          id: `city-light-${m.name.toLowerCase()}`,
          name: m.name,
          solar_elevation: Math.round(elevationDeg),
          bloom_intensity: Math.min(1.0, (Math.abs(elevationDeg) / 30) * (m.pop / 15))
        }
      });
    }
  }

  const nightCityGlow: GeoJSON.FeatureCollection<GeoJSON.Point> = {
    type: 'FeatureCollection',
    features: nightCities
  };

  return {
    sunPosition: { lat: latSun, lon: lonSun },
    nightPolygon,
    twilightRibbon,
    solarZenithPoint,
    nightCityGlow,
    utcTimestamp: date.toISOString()
  };
}
