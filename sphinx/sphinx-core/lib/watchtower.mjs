import { OsintCache } from './cache.mjs';
import fetch from 'node-fetch';

export class WatchtowerService {
  
  async fetchAllOverpass(bboxString = null) {
    let searchBbox = this.bbox;
    let isGlobalQuery = false;
    let area = 999;
    if (bboxString) {
      let [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',').map(parseFloat);
      
      // Fix wrapped longitudes
      while (sw_lon > 180) sw_lon -= 360;
      while (sw_lon < -180) sw_lon += 360;
      while (ne_lon > 180) ne_lon -= 360;
      while (ne_lon < -180) ne_lon += 360;
      
      // Clamp latitudes
      sw_lat = Math.max(-90, Math.min(90, sw_lat));
      ne_lat = Math.max(-90, Math.min(90, ne_lat));
      
      // Handle anti-meridian crossover (Overpass doesn't support min > max without split, so we clamp)
      if (sw_lon > ne_lon) {
         // Just clamp to global for now or swap
         sw_lon = -180;
         ne_lon = 180;
      }
      
      searchBbox = `${sw_lat},${sw_lon},${ne_lat},${ne_lon}`;
      area = Math.abs(ne_lat - sw_lat) * Math.abs(ne_lon - sw_lon);

      if (area > 25) {
        isGlobalQuery = true;
      }
    }

    const now = Date.now();
    if (this.lastOverpassFetch && (now - this.lastOverpassFetch < 15000) && this.cachedOverpassData) {
      console.log('[Sphinx Watchtower] Serving combined Overpass data from 15s cache');
      
      // Prevent wiping global infrastructure if the BBOX is massive and we fell back to an empty cache
      if (elements.length === 0 && area > 10) {
         return { error: true, message: 'BBOX too large, preserved map state.' };
      }
      return this.cachedOverpassData;
  
    }

    let queryInner = '';
    
    // Critical Infrastructure (Safe for global zoom - NODES ONLY)
    queryInner += `
        node["telecom"="data_center"](${searchBbox});
        node["building"="data_center"](${searchBbox});
        node["proposed:telecom"="data_center"](${searchBbox});
        node["construction:telecom"="data_center"](${searchBbox});
        node["proposed:building"="data_center"](${searchBbox});
        node["construction:building"="data_center"](${searchBbox});
        node["building"="construction"]["construction"="data_center"](${searchBbox});

        node["man_made"="radar"](${searchBbox});
        node["military"="radar"](${searchBbox});
        
        node["amenity"="meteorological_station"](${searchBbox});
        node["man_made"="monitoring_station"]["monitoring:weather"="yes"](${searchBbox});
    `;

    // Regional Infrastructure (Queried when zoomed in slightly, area <= 25)
    if (!isGlobalQuery) {
      queryInner += `
        way["telecom"="data_center"](${searchBbox});
        way["building"="data_center"](${searchBbox});
        way["proposed:telecom"="data_center"](${searchBbox});
        way["construction:telecom"="data_center"](${searchBbox});
        way["proposed:building"="data_center"](${searchBbox});
        way["construction:building"="data_center"](${searchBbox});
        way["building"="construction"]["construction"="data_center"](${searchBbox});
        way["man_made"="radar"](${searchBbox});
        way["military"="radar"](${searchBbox});
        way["man_made"="monitoring_station"]["monitoring:weather"="yes"](${searchBbox});

        node["tourism"~"^(camp_site|wilderness_hut|caravan_site)$"](${searchBbox});
        way["tourism"~"^(camp_site|wilderness_hut|caravan_site)$"](${searchBbox});

        node["leisure"~"^(park|nature_reserve)$"](${searchBbox});
        node["operator"~"^(Bureau of Land Management|Forest Service|Park Service|Department of Natural Resources)$"](${searchBbox});

        node["aeroway"="helipad"](${searchBbox});
        way["aeroway"="helipad"](${searchBbox});
        node["aeroway"="aerodrome"](${searchBbox});
        way["aeroway"="aerodrome"](${searchBbox});
        
        node["amenity"="police"](${searchBbox});
        way["amenity"="police"](${searchBbox});
        node["amenity"="fire_station"](${searchBbox});
        way["amenity"="fire_station"](${searchBbox});
        node["amenity"="hospital"](${searchBbox});
        way["amenity"="hospital"](${searchBbox});
      `;
    }

    // Local Infrastructure (Queried only when zoomed in tightly, e.g. city or forest level)
    if (!isGlobalQuery && area <= 25) {
      queryInner += `
        way["leisure"~"^(park|nature_reserve)$"](${searchBbox});
        relation["leisure"~"^(park|nature_reserve)$"](${searchBbox});
        relation["boundary"~"^(protected_area|forest)$"](${searchBbox});
        way["operator"~"^(Bureau of Land Management|Forest Service|Park Service|Department of Natural Resources)$"](${searchBbox});
        relation["operator"~"^(Bureau of Land Management|Forest Service|Park Service|Department of Natural Resources)$"](${searchBbox});

        way["highway"~"^(path|footway|track)$"](${searchBbox});
        way["motorcycle"="yes"](${searchBbox});
        way["atv"="yes"](${searchBbox});
        way["4wd_only"="yes"](${searchBbox});
        way["designation"="forest_service_road"](${searchBbox});

        node["natural"="spring"](${searchBbox});
        way["natural"="spring"](${searchBbox});
        relation["natural"="spring"](${searchBbox});
        node["amenity"="drinking_water"](${searchBbox});
        
        node["power"="substation"](${searchBbox});
        way["power"="substation"](${searchBbox});
        node["power"="plant"](${searchBbox});
        way["power"="plant"](${searchBbox});
        
        node["man_made"="surveillance"](${searchBbox});
        way["man_made"="surveillance"](${searchBbox});
        relation["man_made"="surveillance"](${searchBbox});
        node["highway"="speed_camera"](${searchBbox});
        node["camera:type"="ALPR"](${searchBbox});
        node["camera:mount"](${searchBbox});
      `;
    }

    const query = `
      [out:json][timeout:60];
      (
        ${queryInner}
      );
      out geom;
    `;

    let osmElements = [];
    try {
      const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(this.overpassUrl, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Overpass API Error: ${response.status}`);
      const data = await response.json();
      
      if (data.remark) {
        console.warn('[Sphinx Watchtower] Overpass API Remark:', data.remark);
      }
      if (data.elements && data.osmElements.length > 0) {
        osmElements = data.elements;
        this.cache.saveFeatures(osmElements);
      }
    } catch (error) {
      console.error("[Sphinx Watchtower] Network fetch failed, falling back to SQLite cache:", error.message, "\nBbox is:", bboxString);
      if (bboxString) {
        let [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',').map(parseFloat);
        osmElements = this.cache.getFeaturesInBbox(sw_lat, sw_lon, ne_lat, ne_lon);
        console.log(`[Sphinx Watchtower] Served ${osmElements.length} elements from offline cache.`);
      } else {
        return { error: true, message: error.message };
      }
    }

    try {

      const springs = [];
      const power = [];
      const aviation = [];
      const emergency = [];
      const cameras = [];
      const weatherStations = [];
      const dataCenters = [];
      const radars = [];
      const publicLands = [];
      const campsites = [];
      const trails = [];

      osmElements.forEach(element => {
        let lat = element.lat || (element.center && element.center.lat);
        let lon = element.lon || (element.center && element.center.lon);
        if (!lat && element.bounds) {
           lat = (element.bounds.minlat + element.bounds.maxlat) / 2;
           lon = (element.bounds.minlon + element.bounds.maxlon) / 2;
        }
        if (!lat || !lon) return;
        const tags = element.tags || {};
        
        let geom = { type: 'Point', coordinates: [lon, lat] };
        if (element.type === 'way' && element.geometry) {
          const coords = element.geometry.map(g => [g.lon, g.lat]);
          if (coords.length > 2 && coords[0][0] === coords[coords.length-1][0] && coords[0][1] === coords[coords.length-1][1]) {
            geom = { type: 'Polygon', coordinates: [coords] };
          } else {
            geom = { type: 'LineString', coordinates: coords };
          }
        } else if (element.type === 'relation' && element.members) {
           // For relations, try to build a polygon from the first outer way if possible, or just fallback to point
           const outerWay = element.members.find(m => m.type === 'way' && m.role === 'outer' && m.geometry);
           if (outerWay) {
             const coords = outerWay.geometry.map(g => [g.lon, g.lat]);
             if (coords.length > 2 && coords[0][0] === coords[coords.length-1][0] && coords[0][1] === coords[coords.length-1][1]) {
               geom = { type: 'Polygon', coordinates: [coords] };
             }
           }
        }


        if (tags['natural'] === 'spring' || tags['amenity'] === 'drinking_water') {
          springs.push({ type: 'Feature', properties: { type: 'spring', name: tags['name'] || 'Natural Spring', water: tags['drinking_water'] || 'unknown' }, geometry: geom });
        } else if (tags['power']) {
          power.push({ type: 'Feature', properties: { type: 'power', sub_type: tags['power'], name: tags['name'] || 'Power Infrastructure', operator: tags['operator'] || 'Unknown', voltage: tags['voltage'] || 'Unknown' }, geometry: geom });
        } else if (tags['aeroway']) {
          aviation.push({ type: 'Feature', properties: { type: 'aviation', sub_type: tags['aeroway'], name: tags['name'] || 'Aviation Facility', icao: tags['icao'] || 'None' }, geometry: geom });
        } else if (tags['amenity'] === 'police' || tags['amenity'] === 'fire_station' || tags['amenity'] === 'hospital') {
          emergency.push({ type: 'Feature', properties: { type: 'emergency', sub_type: tags['amenity'], name: tags['name'] || 'Emergency Facility' }, geometry: geom });
        } else if (tags['man_made'] === 'surveillance' || tags['highway'] === 'speed_camera' || tags['camera:type'] === 'ALPR' || tags['camera:mount']) {
          cameras.push({ type: 'Feature', properties: { type: 'camera', sub_type: tags['camera:type'] || 'CCTV', name: tags['name'] || 'Surveillance Node', operator: tags['operator'] || 'Unknown' }, geometry: geom });
        } else if (tags['man_made'] === 'monitoring_station' || tags['amenity'] === 'meteorological_station') {
          weatherStations.push({ type: 'Feature', properties: { type: 'weather_station', name: tags['name'] || 'Weather Station', operator: tags['operator'] || 'Unknown' }, geometry: geom });
        } else if (
          tags['telecom'] === 'data_center' || tags['building'] === 'data_center' ||
          tags['proposed:telecom'] === 'data_center' || tags['construction:telecom'] === 'data_center' ||
          tags['proposed:building'] === 'data_center' || tags['construction:building'] === 'data_center' ||
          (tags['building'] === 'construction' && tags['construction'] === 'data_center')
        ) {
          const isPlanned = !!(tags['proposed:telecom'] || tags['construction:telecom'] || tags['proposed:building'] || tags['construction:building'] || tags['building'] === 'construction');
          dataCenters.push({ type: 'Feature', properties: { type: 'data_center', name: tags['name'] || (isPlanned ? 'Planned Data Center' : 'Data Center'), operator: tags['operator'] || 'Unknown', status: isPlanned ? 'Planned / Construction' : 'Active' }, geometry: geom });
        } else if (tags['man_made'] === 'radar' || tags['military'] === 'radar' || (tags['name'] && tags['name'].includes('HAARP'))) {
          radars.push({ type: 'Feature', properties: { type: 'radar', name: tags['name'] || 'Radar Array / Array Facility', operator: tags['operator'] || 'Unknown' }, geometry: geom });
        } else if (tags['boundary'] === 'national_park' || tags['boundary'] === 'protected_area' || tags['boundary'] === 'forest' || tags['leisure'] === 'park' || tags['leisure'] === 'nature_reserve' || (tags['operator'] && /Bureau of Land Management|Forest Service|Park Service|Department of Natural Resources/i.test(tags['operator']))) {
          publicLands.push({ type: 'Feature', properties: { type: 'public_land', name: tags['name'] || 'Public Land / Park', operator: tags['operator'] || 'Unknown', boundary: tags['boundary'] || tags['leisure'] || 'public_land' }, geometry: geom });
        } else if (tags['tourism'] === 'camp_site' || tags['tourism'] === 'wilderness_hut' || tags['tourism'] === 'caravan_site') {
          campsites.push({ type: 'Feature', properties: { type: 'campsite', name: tags['name'] || 'Campsite', operator: tags['operator'] || 'Unknown', tourism: tags['tourism'] }, geometry: geom });
        } else if (tags['highway'] === 'path' || tags['highway'] === 'footway' || tags['highway'] === 'track' || tags['motorcycle'] === 'yes' || tags['atv'] === 'yes' || tags['4wd_only'] === 'yes' || tags['designation'] === 'forest_service_road') {
          trails.push({ type: 'Feature', properties: { type: 'trail', name: tags['name'] || 'Trail / Service Road', highway: tags['highway'] || 'track', surface: tags['surface'] || 'unknown', designation: tags['designation'] || 'none' }, geometry: geom });
        }
      });

      console.log(`[Sphinx Watchtower] Fetched combined Overpass data. (Springs: ${springs.length}, Power: ${power.length}, Aviation: ${aviation.length}, Emergency: ${emergency.length}, Cameras: ${cameras.length}, Weather: ${weatherStations.length}, DataCenters: ${dataCenters.length}, Radars: ${radars.length}, PublicLands: ${publicLands.length}, Campsites: ${campsites.length}, Trails: ${trails.length})`);

      this.lastOverpassFetch = Date.now();
      this.cachedOverpassData = { 
        data_centers: { type: 'FeatureCollection', features: dataCenters },
        radars: { type: 'FeatureCollection', features: radars },
        public_lands: { type: 'FeatureCollection', features: publicLands },
        campsites: { type: 'FeatureCollection', features: campsites },
        weather_stations: { type: 'FeatureCollection', features: weatherStations },
        aviation: { type: 'FeatureCollection', features: aviation }
      };
      
      // Only overwrite local dense infrastructure if we actually queried it (area <= 25)
      if (!(!isGlobalQuery && area > 25)) {
        this.cachedOverpassData.springs = { type: 'FeatureCollection', features: springs };
        this.cachedOverpassData.power = { type: 'FeatureCollection', features: power };
        this.cachedOverpassData.emergency = { type: 'FeatureCollection', features: emergency };
        this.cachedOverpassData.cameras = { type: 'FeatureCollection', features: cameras };
        this.cachedOverpassData.trails = { type: 'FeatureCollection', features: trails };
      }
      
      // Prevent wiping global infrastructure if the BBOX is massive and we fell back to an empty cache
      if (osmElements.length === 0 && area > 250) {
         console.warn('[Sphinx Watchtower] BBOX too large and empty result, preserving map state.');
         return { error: true, message: 'BBOX too large, preserved map state.' };
      }
      
      return this.cachedOverpassData;
    } catch (error) {
      console.error('[Sphinx Watchtower] Failed to fetch combined Overpass Data:', error.message);
      return { error: true, message: error.message };
    }
  }
  constructor() {
    this.cache = new OsintCache();
    this.overpassUrl = 'https://overpass-api.de/api/interpreter';
    this.bbox = '38.8,-77.1,39.0,-76.9'; 
  }

  async fetchCellTowers(bboxString = null) {
    if (!bboxString) return { type: 'FeatureCollection', features: [] };
    const [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',');
    
    let features = [];
    const Database = (await import('better-sqlite3')).default;
    const fsMod = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // 1. Fetch Exact Physical Towers from FCC ASR Database
    const fccDbPath = path.join(__dirname, '../data/fcc-asr.db');
    if (fsMod.existsSync(fccDbPath)) {
      let fccDb;
      try {
        fccDb = new Database(fccDbPath, { readonly: true });
        const stmt = fccDb.prepare(`
          SELECT id, asr, lat, lon, owner, structure_type, height, lighting 
          FROM towers 
          WHERE lat >= ? AND lat <= ? AND lon >= ? AND lon <= ?
          LIMIT 2000
        `);
        const rows = stmt.all(parseFloat(sw_lat), parseFloat(ne_lat), parseFloat(sw_lon), parseFloat(ne_lon));
        
        const fccTowers = rows.map(row => ({
          type: 'Feature',
          properties: {
            type: 'cell_tower',
            is_physical: true,
            radio: 'FCC Registered',
            net: row.owner,
            cell: row.asr || row.id,
            structure_type: row.structure_type,
            height: row.height,
            lighting: row.lighting,
            range: row.height || 100
          },
          geometry: { type: 'Point', coordinates: [row.lon, row.lat] }
        }));
        
        features = features.concat(fccTowers);
        console.log(`[Sphinx Watchtower] Discovered ${fccTowers.length} physical towers from FCC ASR.`);
      } catch (error) {
        console.warn('[Sphinx Watchtower] Failed to query FCC ASR database:', error.message);
      } finally {
        if (fccDb) fccDb.close();
      }
    }

    // 2. Fetch Coverage Centroids from OpenCelliD Local DB
    const dbPath = path.join(__dirname, '../data/towers.db');
    if (fsMod.existsSync(dbPath)) {
      let db;
      try {
        db = new Database(dbPath, { readonly: true });
        const stmt = db.prepare(`
          SELECT radio, net, cell, lon, lat, range 
          FROM cells 
          WHERE lat >= ? AND lat <= ? AND lon >= ? AND lon <= ?
          LIMIT 2000
        `);
        const rows = stmt.all(parseFloat(sw_lat), parseFloat(ne_lat), parseFloat(sw_lon), parseFloat(ne_lon));
        
        const centroidTowers = rows.map(row => ({
          type: 'Feature',
          properties: {
            type: 'cell_tower',
            is_physical: false,
            radio: row.radio,
            net: row.net,
            cell: row.cell,
            range: row.range
          },
          geometry: { type: 'Point', coordinates: [row.lon, row.lat] }
        }));
        
        features = features.concat(centroidTowers);
      } catch (error) {
        console.warn('[Sphinx Watchtower] Failed to query local cell tower database:', error.message);
      } finally {
        if (db) db.close();
      }
    }

    console.log(`[Sphinx Watchtower] Discovered ${features.length} total Cell Towers in bbox.`);
    return { type: 'FeatureCollection', features };
  }
}
