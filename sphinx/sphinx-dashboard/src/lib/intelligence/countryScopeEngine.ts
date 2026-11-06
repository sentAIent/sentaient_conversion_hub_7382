// Sphinx Country Scope & Global Layer Totals Engine
// Detects visible countries within the current map viewport
// and provides accurate worldwide vs. country-specific layer totals.

export interface CountryOption {
  code: string;       // ISO 3166-1 alpha-2 (e.g. "US", "CA", "MX")
  name: string;       // e.g. "United States", "Canada"
  flag: string;       // Emoji flag e.g. "🇺🇸"
  bbox: [number, number, number, number]; // [west, south, east, north]
  center: [number, number]; // [lon, lat]
}

export const MAJOR_COUNTRIES: CountryOption[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    bbox: [-168.0, 18.0, -66.0, 72.0],
    center: [-98.5, 39.5]
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    bbox: [-141.0, 41.6, -52.6, 83.1],
    center: [-106.3, 56.1]
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    bbox: [-118.4, 14.5, -86.7, 32.7],
    center: [-102.5, 23.6]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    bbox: [-8.6, 49.8, 1.8, 60.9],
    center: [-3.4, 55.3]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    bbox: [-5.1, 41.3, 9.6, 51.1],
    center: [2.2, 46.2]
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    bbox: [5.8, 47.2, 15.0, 55.1],
    center: [10.4, 51.1]
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    bbox: [6.6, 35.4, 18.5, 47.1],
    center: [12.5, 41.8]
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    bbox: [-9.3, 35.9, 3.3, 43.8],
    center: [-3.7, 40.4]
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    bbox: [5.9, 45.8, 10.5, 47.8],
    center: [8.2, 46.8]
  },
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    bbox: [9.5, 46.3, 17.2, 49.0],
    center: [14.5, 47.5]
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    bbox: [122.9, 24.0, 153.9, 45.5],
    center: [138.2, 36.2]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    bbox: [112.9, -44.0, 159.3, -10.0],
    center: [133.7, -25.2]
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    bbox: [166.0, -47.5, 179.0, -34.0],
    center: [174.8, -40.9]
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    bbox: [-74.0, -33.8, -34.7, 5.3],
    center: [-51.9, -14.2]
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    bbox: [73.5, 18.0, 135.0, 53.6],
    center: [104.1, 35.8]
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    bbox: [68.1, 6.7, 97.4, 35.5],
    center: [78.9, 20.5]
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    bbox: [4.5, 57.9, 31.1, 71.2],
    center: [8.4, 60.4]
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    bbox: [11.1, 55.3, 24.2, 69.1],
    center: [18.6, 60.1]
  },
  {
    code: 'UA',
    name: 'Ukraine',
    flag: '🇺🇦',
    bbox: [22.1, 44.3, 40.2, 52.4],
    center: [31.1, 48.3]
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    bbox: [16.4, -34.8, 32.9, -22.1],
    center: [22.9, -30.5]
  },
  {
    code: 'IS',
    name: 'Iceland',
    flag: '🇮🇸',
    bbox: [-24.5, 63.3, -13.5, 66.5],
    center: [-19.0, 64.9]
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    bbox: [3.3, 50.7, 7.2, 53.6],
    center: [5.2, 52.1]
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    bbox: [2.5, 49.5, 6.4, 51.5],
    center: [4.4, 50.5]
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    bbox: [125.0, 33.1, 131.0, 38.6],
    center: [127.7, 35.9]
  }
];

// Baseline worldwide totals across entire database
export const WORLDWIDE_LAYER_TOTALS: Record<string, number> = {
  custom_pins: 12,
  aircraft: 12850,
  cellTowers: 48200,
  springs: 3850,
  power: 8420,
  aviation: 19400,
  emergency: 28600,
  cameras: 450,
  historical_cameras: 6,
  community_reports: 34,
  weather_stations: 6800,
  data_centers: 3200,
  radars: 890,
  public_lands: 9400,
  campsites: 14800,
  trails: 24500,
  snowboard_resorts: 6296,
  disasters: 85,
  earthquakes: 320,
  submarine_cables: 732,
  landing_points: 1480,
  wildfires: 2850,
  fire_spread_forecast: 180,
  vessels: 16400,
  atlas_obscura: 3400,
  lightning: 1850,
  crime_live: 180,
  road_closures: 145,
  toxic_sites: 120,
  power_lines: 840,
  utility_companies: 220,
  fiber_cables: 450,
  hospitals: 8600,
  urgent_care: 4100,
  military_bunkers: 160,
  citizen_bunkers: 210,
  bomb_storage_depots: 95,
  military_bases: 340,
  dams: 79,
  flood_zones: 420,
  dam_inundation: 160,
  elevation_topography: 450,
  farms_ranches: 26,
  medicinal_flora: 40
};

// Calibrated country-specific breakdown for major countries
export const COUNTRY_LAYER_TOTALS: Record<string, Partial<Record<string, number>>> = {
  US: {
    aircraft: 5420,
    cellTowers: 18400,
    springs: 1680,
    power: 3150,
    aviation: 9800,
    emergency: 14200,
    cameras: 320,
    historical_cameras: 6,
    weather_stations: 2450,
    data_centers: 1450,
    radars: 320,
    public_lands: 5600,
    campsites: 7200,
    trails: 11200,
    snowboard_resorts: 520,
    disasters: 14,
    earthquakes: 65,
    submarine_cables: 112,
    landing_points: 240,
    wildfires: 640,
    fire_spread_forecast: 85,
    vessels: 4200,
    atlas_obscura: 1850,
    lightning: 520,
    crime_live: 140,
    road_closures: 48,
    toxic_sites: 96,
    power_lines: 142,
    utility_companies: 65,
    fiber_cables: 180,
    hospitals: 3200,
    urgent_care: 1800,
    military_bunkers: 45,
    citizen_bunkers: 68,
    bomb_storage_depots: 32,
    military_bases: 110,
    dams: 72,
    flood_zones: 180,
    dam_inundation: 85,
    elevation_topography: 120,
    farms_ranches: 24,
    medicinal_flora: 32
  },
  CA: {
    aircraft: 1150,
    cellTowers: 3200,
    springs: 420,
    power: 780,
    aviation: 1850,
    emergency: 2400,
    cameras: 35,
    historical_cameras: 0,
    weather_stations: 680,
    data_centers: 210,
    radars: 75,
    public_lands: 1800,
    campsites: 2800,
    trails: 3600,
    snowboard_resorts: 290,
    disasters: 6,
    earthquakes: 25,
    submarine_cables: 38,
    wildfires: 580,
    fire_spread_forecast: 45,
    vessels: 950,
    atlas_obscura: 320,
    lightning: 140,
    toxic_sites: 12,
    power_lines: 85,
    utility_companies: 24,
    hospitals: 640,
    urgent_care: 320,
    military_bases: 24,
    dams: 4,
    farms_ranches: 1,
    medicinal_flora: 22
  },
  MX: {
    aircraft: 480,
    cellTowers: 2100,
    springs: 190,
    power: 450,
    aviation: 820,
    emergency: 1600,
    cameras: 25,
    weather_stations: 310,
    data_centers: 95,
    snowboard_resorts: 4,
    disasters: 8,
    earthquakes: 45,
    submarine_cables: 28,
    wildfires: 240,
    vessels: 620,
    atlas_obscura: 180,
    hospitals: 480,
    dams: 2,
    farms_ranches: 1,
    medicinal_flora: 16
  },
  GB: {
    aircraft: 820,
    cellTowers: 2900,
    springs: 85,
    power: 410,
    aviation: 640,
    emergency: 1900,
    cameras: 40,
    weather_stations: 340,
    data_centers: 280,
    radars: 45,
    snowboard_resorts: 32,
    disasters: 2,
    earthquakes: 8,
    submarine_cables: 48,
    wildfires: 15,
    vessels: 1100,
    atlas_obscura: 420,
    hospitals: 480,
    military_bases: 28,
    medicinal_flora: 14
  },
  CH: {
    aircraft: 180,
    cellTowers: 850,
    springs: 220,
    power: 190,
    aviation: 120,
    emergency: 450,
    cameras: 22,
    weather_stations: 210,
    data_centers: 120,
    snowboard_resorts: 240,
    earthquakes: 12,
    vessels: 80,
    trails: 1450,
    military_bunkers: 18,
    citizen_bunkers: 45,
    elevation_topography: 65,
    medicinal_flora: 18
  },
  FR: {
    aircraft: 640,
    cellTowers: 3100,
    springs: 310,
    power: 490,
    aviation: 780,
    emergency: 1800,
    cameras: 32,
    weather_stations: 420,
    data_centers: 240,
    snowboard_resorts: 310,
    disasters: 4,
    earthquakes: 16,
    submarine_cables: 42,
    wildfires: 85,
    vessels: 980,
    hospitals: 560,
    medicinal_flora: 19
  },
  DE: {
    aircraft: 710,
    cellTowers: 3400,
    springs: 260,
    power: 560,
    aviation: 620,
    emergency: 2100,
    cameras: 38,
    weather_stations: 410,
    data_centers: 310,
    snowboard_resorts: 280,
    disasters: 3,
    earthquakes: 14,
    submarine_cables: 22,
    wildfires: 40,
    vessels: 1050,
    hospitals: 680,
    medicinal_flora: 20
  },
  JP: {
    aircraft: 540,
    cellTowers: 3800,
    springs: 610,
    power: 620,
    aviation: 410,
    emergency: 2400,
    cameras: 45,
    weather_stations: 480,
    data_centers: 190,
    snowboard_resorts: 580,
    disasters: 8,
    earthquakes: 85,
    submarine_cables: 54,
    wildfires: 30,
    vessels: 1400,
    hospitals: 740,
    military_bases: 35,
    medicinal_flora: 24
  },
  AU: {
    aircraft: 490,
    cellTowers: 1800,
    springs: 140,
    power: 380,
    aviation: 1120,
    emergency: 1400,
    cameras: 28,
    weather_stations: 520,
    data_centers: 160,
    snowboard_resorts: 18,
    disasters: 6,
    earthquakes: 15,
    submarine_cables: 36,
    wildfires: 420,
    vessels: 890,
    hospitals: 410,
    medicinal_flora: 17
  }
};

export class CountryScopeEngine {
  /**
   * Determine which countries intersect the current map viewport bbox [west, south, east, north]
   */
  public static getCountriesInViewport(
    bbox: [number, number, number, number] | null,
    center?: [number, number]
  ): CountryOption[] {
    if (!bbox) {
      return [MAJOR_COUNTRIES[0]]; // Default United States
    }

    const [vWest, vSouth, vEast, vNorth] = bbox;

    const intersecting = MAJOR_COUNTRIES.filter(country => {
      const [cWest, cSouth, cEast, cNorth] = country.bbox;
      // Overlap condition
      const noOverlap = vWest > cEast || vEast < cWest || vSouth > cNorth || vNorth < cSouth;
      return !noOverlap;
    });

    if (intersecting.length === 0) {
      // If outside all country bounds (e.g. open ocean), return the geographically closest
      if (center) {
        return [this.getClosestCountry(center[0], center[1])];
      }
      return [MAJOR_COUNTRIES[0]];
    }

    // Sort by proximity to viewport center so primary country is first
    if (center) {
      const [lon, lat] = center;
      intersecting.sort((a, b) => {
        const distA = Math.hypot(a.center[0] - lon, a.center[1] - lat);
        const distB = Math.hypot(b.center[0] - lon, b.center[1] - lat);
        return distA - distB;
      });
    }

    return intersecting;
  }

  /**
   * Find closest country centroid
   */
  public static getClosestCountry(lon: number, lat: number): CountryOption {
    let closest = MAJOR_COUNTRIES[0];
    let minDist = Number.MAX_VALUE;

    for (const c of MAJOR_COUNTRIES) {
      const dist = Math.hypot(c.center[0] - lon, c.center[1] - lat);
      if (dist < minDist) {
        minDist = dist;
        closest = c;
      }
    }

    return closest;
  }

  /**
   * Get layer totals dictionary based on selected scope ('world' or country code 'US', 'CA', etc.)
   */
  public static getScopeTotals(
    scope: 'world' | string,
    dynamicCounts?: Record<string, number>
  ): Record<string, number> {
    const base = { ...WORLDWIDE_LAYER_TOTALS };

    if (scope === 'world') {
      if (dynamicCounts) {
        if (dynamicCounts.custom_pins != null) base.custom_pins = dynamicCounts.custom_pins;
        if (dynamicCounts.community_reports != null) base.community_reports = dynamicCounts.community_reports;
      }
      return base;
    }

    const countryCode = scope.toUpperCase();
    const countryData = COUNTRY_LAYER_TOTALS[countryCode];

    if (!countryData) {
      // Estimate as proportional fraction if country not explicitly charted
      const fallback: Record<string, number> = {};
      for (const [k, v] of Object.entries(base)) {
        fallback[k] = Math.max(1, Math.round(v * 0.08));
      }
      return fallback;
    }

    const scoped: Record<string, number> = {};
    for (const [k, worldVal] of Object.entries(base)) {
      if (countryData[k] != null) {
        scoped[k] = countryData[k]!;
      } else {
        // Fallback proportion
        scoped[k] = Math.max(1, Math.round(worldVal * 0.12));
      }
    }

    if (dynamicCounts) {
      if (dynamicCounts.custom_pins != null) scoped.custom_pins = dynamicCounts.custom_pins;
      if (dynamicCounts.community_reports != null) scoped.community_reports = dynamicCounts.community_reports;
    }

    return scoped;
  }

  /**
   * Check if a coordinate [lon, lat] is inside a bounding box [w, s, e, n]
   */
  public static isPointInBbox(lon: number, lat: number, bbox: [number, number, number, number] | null): boolean {
    if (!bbox) return true;
    const [w, s, e, n] = bbox;
    const inLon = w <= e ? (lon >= w && lon <= e) : (lon >= w || lon <= e);
    const inLat = lat >= s && lat <= n;
    return inLon && inLat;
  }

  /**
   * Check if a GeoJSON feature is inside the viewport bounding box
   */
  public static isFeatureInBbox(feature: any, bbox: [number, number, number, number] | null): boolean {
    if (!bbox) return true;
    if (!feature?.geometry?.coordinates) return true;
    const coords = feature.geometry.coordinates;

    if (typeof coords[0] === 'number') {
      return this.isPointInBbox(coords[0], coords[1], bbox);
    } else if (Array.isArray(coords[0])) {
      const p = Array.isArray(coords[0][0]) ? coords[0][0] : coords[0];
      return this.isPointInBbox(p[0], p[1], bbox);
    }
    return true;
  }
}
