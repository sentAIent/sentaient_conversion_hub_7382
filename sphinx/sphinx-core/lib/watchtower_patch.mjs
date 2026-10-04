export async function fetchAllOverpass(bboxString = null) {
  let searchBbox = this.bbox;
  if (bboxString) {
    const [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',');
    searchBbox = `${sw_lat},${sw_lon},${ne_lat},${ne_lon}`;
  }
  
  const query = `
    [out:json][timeout:25];
    (
      node["natural"="spring"](${searchBbox});
      way["natural"="spring"](${searchBbox});
      relation["natural"="spring"](${searchBbox});
      node["amenity"="drinking_water"](${searchBbox});
      
      node["power"="substation"](${searchBbox});
      way["power"="substation"](${searchBbox});
      node["power"="plant"](${searchBbox});
      way["power"="plant"](${searchBbox});
      
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
      
      node["man_made"="surveillance"](${searchBbox});
      way["man_made"="surveillance"](${searchBbox});
      relation["man_made"="surveillance"](${searchBbox});
      node["highway"="speed_camera"](${searchBbox});
      node["camera:type"="ALPR"](${searchBbox});
      node["camera:mount"](${searchBbox});
    );
    out center;
  `;

  try {
    const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
    const response = await fetch(this.overpassUrl, {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'SphinxOSINT/1.0 (contact@example.com)'
      }
    });
    if (!response.ok) return { error: true, message: `Overpass API Error: ${response.status}` };
    const data = await response.json();
    
    // Process all features
    const springs = [];
    const power = [];
    const aviation = [];
    const emergency = [];
    const cameras = [];

    data.elements.forEach(element => {
      const lat = element.lat || (element.center && element.center.lat);
      const lon = element.lon || (element.center && element.center.lon);
      if (!lat || !lon) return;
      const tags = element.tags || {};
      
      const geom = { type: 'Point', coordinates: [lon, lat] };

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
      }
    });

    console.log(`[Sphinx Watchtower] Fetched combined Overpass data. (Springs: ${springs.length}, Power: ${power.length}, Aviation: ${aviation.length}, Emergency: ${emergency.length}, Cameras: ${cameras.length})`);

    return { 
      springs: { type: 'FeatureCollection', features: springs },
      power: { type: 'FeatureCollection', features: power },
      aviation: { type: 'FeatureCollection', features: aviation },
      emergency: { type: 'FeatureCollection', features: emergency },
      cameras: { type: 'FeatureCollection', features: cameras }
    };
  } catch (error) {
    console.error('[Sphinx Watchtower] Failed to fetch combined Overpass Data:', error.message);
    return { error: true, message: error.message };
  }
}
