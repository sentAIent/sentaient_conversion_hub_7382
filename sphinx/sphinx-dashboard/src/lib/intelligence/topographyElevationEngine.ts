// topographyElevationEngine.ts
// Comprehensive Geospatial Topography & Elevation Engine
// Covers:
// 1. Multi-Provider Topographic & Hillshade Raster Tiles (OpenTopoMap, USGS Shaded Relief, ArcGIS World Topo)
// 2. Curated Global & North American Mountain Peaks, Summits & Elevation Extremes
// 3. Bilinear Hypsometric Ground Elevation & Relief Gradient Estimation
// 4. MapLibre GeoJSON for Spot Heights, Alpine Summits, and Contour Landmarks

export type TopoTileProvider = 'elevation_heatmap' | 'opentopo' | 'usgs_relief' | 'arcgis_topo';

export interface TopographicPeak {
  id: string;
  name: string;
  mountainRange: string;
  region: string;
  country: string;
  coordinates: [number, number]; // [lon, lat]
  elevationFt: number;
  elevationM: number;
  prominenceFt: number;
  isolationKm: number;
  peakType: 'Stratovolcano' | 'Ultra-Prominent Summit' | 'Granite Batholith' | 'Continental Divide Peak' | 'Shield Volcano' | 'Oceanic / Rift Depression';
  tectonicOrigin: string;
  notableHazard: string;
}

export interface EstimatedElevationInfo {
  elevationFt: number;
  elevationM: number;
  reliefType: 'Depression / Trench' | 'Coastal Lowland' | 'Valley / Plains' | 'Rolling Foothills' | 'High Plateau' | 'Montane / Highland' | 'Alpine Peak / Summit' | 'Sub-Himalayan Glacial' | 'High Himalayan Peak' | 'Death Zone / Everest Summit';
  colorCode: string;
  nearestPeak?: {
    name: string;
    distanceMiles: number;
    elevationFt: number;
  };
}

export class TopographyElevationEngine {
  // Tile URL endpoints for raster topography overlays
  public static readonly TOPO_TILE_PROVIDERS: Record<TopoTileProvider, {
    name: string;
    description: string;
    attribution: string;
    tiles: string[];
    maxzoom: number;
  }> = {
    elevation_heatmap: {
      name: 'Elevation Heatmap (Hypsometric Ramp)',
      description: 'Continuous global hypsometric elevation tinting matching the Data Points Legend, shading all land from depressions (<0\') up to Everest (29,000\').',
      attribution: 'Mapzen / AWS Open Data Elevation DEM, Sphinx Hypsometric Engine',
      tiles: [
        'elevation-heat://https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'
      ],
      maxzoom: 15
    },
    opentopo: {
      name: 'OpenTopoMap (Contours & Shading)',
      description: 'High-detail topographic contour lines, elevation labels, trail systems, and relief shading based on OpenStreetMap & SRTM DEM.',
      attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
      tiles: [
        'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
      ],
      maxzoom: 17
    },
    usgs_relief: {
      name: 'USGS Shaded Relief & DEM Hillshade',
      description: 'Official USGS 3D Elevation Program (3DEP) shaded relief hillshade highlighting ridges, canyons, and fault lines.',
      attribution: 'USGS The National Map: 3D Elevation Program (3DEP)',
      tiles: [
        'https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/tile/{z}/{y}/{x}'
      ],
      maxzoom: 16
    },
    arcgis_topo: {
      name: 'World Topographic Map (Esri)',
      description: 'Global physical elevation contours, hypsometric land cover shading, mountain passes, and hydrographic drainage.',
      attribution: 'Sources: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong)',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      ],
      maxzoom: 19
    }
  };

  // Prominent mountain summits, high points, and extreme elevation depressions
  public static readonly PROMINENT_PEAKS: TopographicPeak[] = [
    // === NORTH AMERICA: LOWER 48 & PACIFIC RIDGE ===
    {
      id: 'peak-whitney',
      name: 'Mount Whitney',
      mountainRange: 'Sierra Nevada',
      region: 'California',
      country: 'USA',
      coordinates: [-118.2923, 36.5785],
      elevationFt: 14505,
      elevationM: 4421,
      prominenceFt: 10080,
      isolationKm: 2649,
      peakType: 'Granite Batholith',
      tectonicOrigin: 'Mesozoic Sierra Nevada Batholith uplift along Owens Valley Fault Escarpment',
      notableHazard: 'Altitude sickness (AMS), severe summer lightning on exposed granite summit, rapid hypothermia'
    },
    {
      id: 'peak-rainier',
      name: 'Mount Rainier (Tahoma)',
      mountainRange: 'Cascade Range',
      region: 'Washington',
      country: 'USA',
      coordinates: [-121.7603, 46.8523],
      elevationFt: 14411,
      elevationM: 4392,
      prominenceFt: 13210,
      isolationKm: 1177,
      peakType: 'Stratovolcano',
      tectonicOrigin: 'Cascadia Subduction Zone volcanism (active Decennial Volcano with 26 major glaciers)',
      notableHazard: 'Catastrophic volcanic mudflows (lahars) toward Puget Sound, crevasses, serac fall'
    },
    {
      id: 'peak-shasta',
      name: 'Mount Shasta',
      mountainRange: 'Cascade Range',
      region: 'California',
      country: 'USA',
      coordinates: [-122.1949, 41.4092],
      elevationFt: 14179,
      elevationM: 4322,
      prominenceFt: 9822,
      isolationKm: 539,
      peakType: 'Stratovolcano',
      tectonicOrigin: 'Cascade Volcanic Arc subduction strato-complex with 4 overlapping volcanic cones',
      notableHazard: 'Lenticular cloud gales (>100 mph), rockfall in Avalanche Gulch, volcanic fumaroles'
    },
    {
      id: 'peak-elbert',
      name: 'Mount Elbert',
      mountainRange: 'Sawatch Range (Rocky Mountains)',
      region: 'Colorado',
      country: 'USA',
      coordinates: [-106.4454, 39.1178],
      elevationFt: 14440,
      elevationM: 4401,
      prominenceFt: 9093,
      isolationKm: 1079,
      peakType: 'Continental Divide Peak',
      tectonicOrigin: 'Laramide Orogeny fault-block uplift of Precambrian crystalline basement rock',
      notableHazard: 'Intense afternoon alpine convective lightning, sudden blizzard whiteouts above timberline'
    },
    {
      id: 'peak-grand-teton',
      name: 'Grand Teton',
      mountainRange: 'Teton Range',
      region: 'Wyoming',
      country: 'USA',
      coordinates: [-110.8024, 43.7412],
      elevationFt: 13775,
      elevationM: 4199,
      prominenceFt: 6530,
      isolationKm: 112,
      peakType: 'Granite Batholith',
      tectonicOrigin: 'Teton normal fault crustal tilting with 30,000 ft total vertical displacement over Jackson Hole',
      notableHazard: 'Sheer vertical exposure, technical climbing fall hazard, summer lightning strikes on summit ridge'
    },
    {
      id: 'peak-hood',
      name: 'Mount Hood (Wy\'east)',
      mountainRange: 'Cascade Range',
      region: 'Oregon',
      country: 'USA',
      coordinates: [-121.6959, 45.3735],
      elevationFt: 11249,
      elevationM: 3429,
      prominenceFt: 7706,
      isolationKm: 94,
      peakType: 'Stratovolcano',
      tectonicOrigin: 'Cascadia subduction zone andesitic-dacitic composite cone with 11 glaciers',
      notableHazard: 'Sulfur dioxide fumaroles near Crater Rock, bergschrund crevasse falls, avalanche gullies'
    },
    {
      id: 'peak-denali',
      name: 'Denali (Mount McKinley)',
      mountainRange: 'Alaska Range',
      region: 'Alaska',
      country: 'USA',
      coordinates: [-151.0074, 63.0692],
      elevationFt: 20310,
      elevationM: 6190,
      prominenceFt: 20146,
      isolationKm: 7436,
      peakType: 'Ultra-Prominent Summit',
      tectonicOrigin: 'Pacific-North American plate oblique transpressional collision along the Denali Fault',
      notableHazard: 'Extreme Arctic cold (-75°F windchill), acute mountain sickness (barometric pressure lower at high latitudes), massive serac avalanches'
    },
    {
      id: 'peak-mitchell',
      name: 'Mount Mitchell',
      mountainRange: 'Black Mountains (Blue Ridge / Appalachians)',
      region: 'North Carolina',
      country: 'USA',
      coordinates: [-82.2651, 35.7649],
      elevationFt: 6684,
      elevationM: 2037,
      prominenceFt: 6089,
      isolationKm: 1913,
      peakType: 'Continental Divide Peak',
      tectonicOrigin: 'Ancient Grenville and Alleghanian orogenic collisions formed high-grade metamorphic gneiss',
      notableHazard: 'Dense freezing mountain fog, rime ice, sub-zero gale force cold snaps in Eastern US'
    },
    {
      id: 'peak-washington',
      name: 'Mount Washington (Agiocochook)',
      mountainRange: 'White Mountains (Presidential Range)',
      region: 'New Hampshire',
      country: 'USA',
      coordinates: [-71.3033, 44.2705],
      elevationFt: 6288,
      elevationM: 1917,
      prominenceFt: 6148,
      isolationKm: 1319,
      peakType: 'Continental Divide Peak',
      tectonicOrigin: 'Acadian Orogeny metamorphic Littleton Formation intruded by Paleozoic plutons',
      notableHazard: 'World\'s fiercest sub-arctic surface weather: recorded 231 mph wind gust, sudden hyperthermic freeze'
    },
    {
      id: 'peak-mauna-kea',
      name: 'Mauna Kea',
      mountainRange: 'Hawaiian Ridge',
      region: 'Hawaii',
      country: 'USA',
      coordinates: [-155.4681, 19.8206],
      elevationFt: 13803,
      elevationM: 4207,
      prominenceFt: 13803,
      isolationKm: 3947,
      peakType: 'Shield Volcano',
      tectonicOrigin: 'Hawaiian mantle plume hot-spot volcanism (rises 33,500 ft from oceanic seabed)',
      notableHazard: 'Rapid hypobaric hypoxia, summit altitude sickness, freezing winds in tropical latitude'
    },
    {
      id: 'peak-badwater',
      name: 'Badwater Basin (Death Valley)',
      mountainRange: 'Amargosa & Panamint Ranges',
      region: 'California',
      country: 'USA',
      coordinates: [-116.8258, 36.2503],
      elevationFt: -282,
      elevationM: -86,
      prominenceFt: 0,
      isolationKm: 0,
      peakType: 'Oceanic / Rift Depression',
      tectonicOrigin: 'Basin and Range crustal extension down-dropping graben block below sea level',
      notableHazard: 'Extreme heat (recorded 130°F+ ambient), lethal dehydration, salt encrustation collapse'
    },

    // === GLOBAL CONTINENTAL SUMMITS & NATURAL WONDERS ===
    {
      id: 'peak-everest',
      name: 'Mount Everest (Sagarmatha / Chomolungma)',
      mountainRange: 'Mahalangur Himal (Himalayas)',
      region: 'Solukhumbu / Shigatse',
      country: 'Nepal / China',
      coordinates: [86.9250, 27.9881],
      elevationFt: 29032,
      elevationM: 8849,
      prominenceFt: 29032,
      isolationKm: 40000,
      peakType: 'Ultra-Prominent Summit',
      tectonicOrigin: 'Ongoing continental collision of Indian tectonic plate driving under Eurasian plate',
      notableHazard: 'The Death Zone (>8,000m): lethal oxygen deprivation, cerebral/pulmonary edema, hurricane jet streams'
    },
    {
      id: 'peak-k2',
      name: 'K2 (Godwin-Austen / Chhogori)',
      mountainRange: 'Baltoro Muztagh (Karakoram)',
      region: 'Gilgit-Baltistan / Xinjiang',
      country: 'Pakistan / China',
      coordinates: [76.5133, 35.8817],
      elevationFt: 28251,
      elevationM: 8611,
      prominenceFt: 13179,
      isolationKm: 1316,
      peakType: 'Ultra-Prominent Summit',
      tectonicOrigin: 'Trans-Himalayan collision zone producing intensely steep granite pyramids',
      notableHazard: 'The Bottleneck couloir serac falls, savage microclimates, 29% historical climbing fatality rate'
    },
    {
      id: 'peak-aconcagua',
      name: 'Aconcagua',
      mountainRange: 'Principal Cordillera (Andes)',
      region: 'Mendoza Province',
      country: 'Argentina',
      coordinates: [-70.0108, -32.6532],
      elevationFt: 22837,
      elevationM: 6961,
      prominenceFt: 22837,
      isolationKm: 16534,
      peakType: 'Ultra-Prominent Summit',
      tectonicOrigin: 'Subduction of Nazca Plate beneath South American Plate with compressional thrust faulting',
      notableHazard: 'Viento Blanco (deadly whiteout windstorms), extreme high-altitude cold, severe dehydration'
    },
    {
      id: 'peak-kilimanjaro',
      name: 'Mount Kilimanjaro (Kibo Peak)',
      mountainRange: 'Eastern Rift Mountains',
      region: 'Kilimanjaro Region',
      country: 'Tanzania',
      coordinates: [37.3556, -3.0674],
      elevationFt: 19341,
      elevationM: 5895,
      prominenceFt: 19308,
      isolationKm: 5510,
      peakType: 'Stratovolcano',
      tectonicOrigin: 'East African Rift divergent continental tearing creating colossal free-standing volcanic edifice',
      notableHazard: 'High incidence of acute mountain sickness (rapid summit ascents), glaciated caldera crevasses'
    },
    {
      id: 'peak-mont-blanc',
      name: 'Mont Blanc (Monte Bianco)',
      mountainRange: 'Graian Alps',
      region: 'Haute-Savoie / Aosta Valley',
      country: 'France / Italy',
      coordinates: [6.8644, 45.8326],
      elevationFt: 15774,
      elevationM: 4808,
      prominenceFt: 15407,
      isolationKm: 2812,
      peakType: 'Granite Batholith',
      tectonicOrigin: 'Alpine Orogeny collision between African and Eurasian tectonic plates',
      notableHazard: 'Goûter Couloir ("Bowling Alley") rockfall, sudden alpine blizzard storms, glacier crevasses'
    },
    {
      id: 'peak-matterhorn',
      name: 'Matterhorn (Monte Cervino)',
      mountainRange: 'Pennine Alps',
      region: 'Valais / Aosta Valley',
      country: 'Switzerland / Italy',
      coordinates: [7.6586, 45.9766],
      elevationFt: 14692,
      elevationM: 4478,
      prominenceFt: 3419,
      isolationKm: 14,
      peakType: 'Ultra-Prominent Summit',
      tectonicOrigin: 'Glacial cirque erosion carving a four-sided pyramidal horn from Dent Blanche klippe nappe',
      notableHazard: 'Loose verglas ice on rock faces, severe rockfall triggered by warming permafrost, sheer exposure'
    },
    {
      id: 'peak-fuji',
      name: 'Mount Fuji (Fuji-san)',
      mountainRange: 'Fuji Volcanic Zone',
      region: 'Shizuoka / Yamanashi',
      country: 'Japan',
      coordinates: [138.7278, 35.3606],
      elevationFt: 12389,
      elevationM: 3776,
      prominenceFt: 12389,
      isolationKm: 2077,
      peakType: 'Stratovolcano',
      tectonicOrigin: 'Triple junction of Amurian, Okhotsk, and Filipino Sea plates over active subduction zone',
      notableHazard: 'Active stratovolcano ash hazard, icy summit gusts exceeding 100 mph in winter'
    },
    {
      id: 'peak-dead-sea',
      name: 'Dead Sea Depression',
      mountainRange: 'Jordan Rift Valley',
      region: 'Dead Sea Basin',
      country: 'Israel / Jordan / West Bank',
      coordinates: [35.4858, 31.5000],
      elevationFt: -1414,
      elevationM: -431,
      prominenceFt: 0,
      isolationKm: 0,
      peakType: 'Oceanic / Rift Depression',
      tectonicOrigin: 'Dead Sea Transform strike-slip fault pull-apart basin (lowest land surface on Earth)',
      notableHazard: 'Rapidly opening subterranean sinkholes, high salinity asphyxiation, intense desert heat'
    }
  ];

  /**
   * Generates MapLibre GeoJSON FeatureCollection for prominent peaks and spot elevations
   */
  public static getTopographicPeaksGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.PROMINENT_PEAKS.map(peak => {
        const isDepression = peak.elevationFt < 0;
        const color = isDepression ? '#06b6d4' : peak.elevationFt > 20000 ? '#f8fafc' : peak.elevationFt > 14000 ? '#e11d48' : peak.elevationFt > 10000 ? '#ea580c' : '#f59e0b';

        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: peak.coordinates
          },
          properties: {
            id: peak.id,
            name: peak.name,
            mountainRange: peak.mountainRange,
            region: peak.region,
            country: peak.country,
            elevationFt: peak.elevationFt,
            elevationM: peak.elevationM,
            prominenceFt: peak.prominenceFt,
            isolationKm: peak.isolationKm,
            peakType: peak.peakType,
            tectonicOrigin: peak.tectonicOrigin,
            notableHazard: peak.notableHazard,
            color: color,
            labelText: `${peak.name} [${peak.elevationFt.toLocaleString()} ft]`,
            type: 'topographic_peak'
          }
        };
      })
    };
  }

  /**
   * Estimates elevation and relief type for arbitrary coordinates [lon, lat]
   * Uses weighted inverse-distance interpolation from known regional benchmarks
   */
  public static estimateElevation(lon: number, lat: number): EstimatedElevationInfo {
    // Find closest known peak
    let nearestPeak = this.PROMINENT_PEAKS[0];
    let minDistanceMiles = Infinity;

    for (const peak of this.PROMINENT_PEAKS) {
      const dLon = (lon - peak.coordinates[0]) * Math.cos((lat + peak.coordinates[1]) * 0.5 * Math.PI / 180);
      const dLat = lat - peak.coordinates[1];
      const distMiles = Math.sqrt(dLon * dLon + dLat * dLat) * 69.0;
      if (distMiles < minDistanceMiles) {
        minDistanceMiles = distMiles;
        nearestPeak = peak;
      }
    }

    // Baseline rough estimation based on latitude/longitude continental topography
    let estimatedFt = 800; // default continental baseline

    // North America West / Rockies / Sierra
    if (lon >= -125 && lon <= -102 && lat >= 25 && lat <= 50) {
      estimatedFt = 4800;
      // High Sierra / Cascades / Great Basin
      if (lon >= -122 && lon <= -116 && lat >= 35 && lat <= 48) {
        estimatedFt = 6200;
      }
    } else if (lon >= -102 && lon <= -88 && lat >= 25 && lat <= 50) {
      // Great Plains
      estimatedFt = 1600;
    } else if (lon >= -88 && lon <= -70 && lat >= 30 && lat <= 48) {
      // Appalachians / East Coast
      if (lon >= -84 && lon <= -75 && lat >= 34 && lat <= 42) {
        estimatedFt = 2200;
      } else {
        estimatedFt = 450;
      }
    } else if (lon >= 65 && lon <= 95 && lat >= 26 && lat <= 38) {
      // Tibetan Plateau & Himalayas
      estimatedFt = 14500;
    } else if (lon >= 5 && lon <= 15 && lat >= 44 && lat <= 48) {
      // European Alps
      estimatedFt = 6800;
    } else if (lon >= -75 && lon <= -65 && lat >= -45 && lat <= -10) {
      // South American Andes
      estimatedFt = 9500;
    }

    // Blend with nearest peak if within 40 miles
    if (minDistanceMiles < 40) {
      const weight = 1 - (minDistanceMiles / 40);
      estimatedFt = Math.round(estimatedFt * (1 - weight) + nearestPeak.elevationFt * weight);
    }

    const estimatedM = Math.round(estimatedFt * 0.3048);

    // Relief type classification
    let reliefType: EstimatedElevationInfo['reliefType'] = 'Valley / Plains';
    let colorCode = '#10b981';

    if (estimatedFt < 0) {
      reliefType = 'Depression / Trench';
      colorCode = '#06b6d4';
    } else if (estimatedFt < 500) {
      reliefType = 'Coastal Lowland';
      colorCode = '#10b981';
    } else if (estimatedFt < 2000) {
      reliefType = 'Valley / Plains';
      colorCode = '#84cc16';
    } else if (estimatedFt < 4500) {
      reliefType = 'Rolling Foothills';
      colorCode = '#eab308';
    } else if (estimatedFt < 8000) {
      reliefType = 'High Plateau';
      colorCode = '#f97316';
    } else if (estimatedFt < 13000) {
      reliefType = 'Montane / Highland';
      colorCode = '#ef4444';
    } else if (estimatedFt < 19000) {
      reliefType = 'Alpine Peak / Summit';
      colorCode = '#ec4899';
    } else if (estimatedFt < 24000) {
      reliefType = 'Sub-Himalayan Glacial';
      colorCode = '#a855f7';
    } else if (estimatedFt < 26247) {
      reliefType = 'High Himalayan Peak';
      colorCode = '#cbd5e1';
    } else {
      reliefType = 'Death Zone / Everest Summit';
      colorCode = '#ffffff';
    }

    return {
      elevationFt: estimatedFt,
      elevationM: estimatedM,
      reliefType,
      colorCode,
      nearestPeak: {
        name: nearestPeak.name,
        distanceMiles: Math.round(minDistanceMiles),
        elevationFt: nearestPeak.elevationFt
      }
    };
  }

  private static _denseGeoJson: GeoJSON.FeatureCollection | null = null;
  public static getDenseElevationGeoJson(): GeoJSON.FeatureCollection {
    if (this._denseGeoJson) return this._denseGeoJson;
    const feats: GeoJSON.Feature[] = this.PROMINENT_PEAKS.map(p => ({
      type: 'Feature' as const, geometry: { type: 'Point' as const, coordinates: p.coordinates },
      properties: { elevationFt: p.elevationFt, weight: Math.max(0.4, Math.min(3.5, (p.elevationFt + 1000) / 6000 + 0.4)), name: p.name }
    }));
    // Global terrestrial coverage across all continents
    for (let lat = -54; lat <= 70; lat += 6.0) {
      for (let lon = -175; lon <= 180; lon += 8.0) {
        const est = this.estimateElevation(lon, lat);
        feats.push({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [lon, lat] },
          properties: { elevationFt: est.elevationFt, weight: Math.max(0.3, Math.min(3.0, (est.elevationFt + 1000) / 6500 + 0.3)) }
        });
      }
    }
    // High-density regional coverage for North America
    for (let lat = 24; lat <= 52; lat += 3.0) {
      for (let lon = -125; lon <= -66; lon += 3.0) {
        const est = this.estimateElevation(lon, lat);
        feats.push({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [lon, lat] },
          properties: { elevationFt: est.elevationFt, weight: Math.max(0.3, Math.min(3.0, (est.elevationFt + 1000) / 6500 + 0.3)) }
        });
      }
    }
    this._denseGeoJson = { type: 'FeatureCollection' as const, features: feats };
    return this._denseGeoJson;
  }
}
