import fs from 'fs';
const body = fs.readFileSync('overpass.json', 'utf8');
const data = JSON.parse(body);

const springs = [];
const power = [];
const aviation = [];
const emergency = [];
const cameras = [];

data.elements.forEach(element => {
  const geom = {
    type: 'Point',
    coordinates: [element.lon || element.center?.lon, element.lat || element.center?.lat]
  };
  
  if (!geom.coordinates[0] || !geom.coordinates[1]) return;
  
  const tags = element.tags || {};
  
  if (tags['natural'] === 'spring' || tags['amenity'] === 'drinking_water') {
    springs.push({ type: 'Feature', properties: { type: 'spring', name: tags['name'] || 'Natural Spring', water: tags['drinking_water'] || 'unknown' }, geometry: geom });
  } else if (tags['power']) {
    power.push({ type: 'Feature', properties: { type: 'power', sub_type: tags['power'], name: tags['name'] || 'Power Infrastructure', operator: tags['operator'] || 'Unknown', voltage: tags['voltage'] || 'Unknown' }, geometry: geom });
  } else if (tags['aeroway']) {
    aviation.push({ type: 'Feature', properties: { type: 'aviation', sub_type: tags['aeroway'], name: tags['name'] || 'Aviation Facility' }, geometry: geom });
  } else if (tags['amenity'] && ['police', 'fire_station', 'hospital'].includes(tags['amenity'])) {
    emergency.push({ type: 'Feature', properties: { type: 'emergency', sub_type: tags['amenity'], name: tags['name'] || 'Emergency Services' }, geometry: geom });
  } else if (tags['man_made'] === 'surveillance' || tags['highway'] === 'speed_camera' || tags['camera:type'] || tags['camera:mount']) {
    cameras.push({ type: 'Feature', properties: { type: 'camera', sub_type: tags['camera:type'] || 'surveillance', name: tags['name'] || 'Camera' }, geometry: geom });
  }
});

console.log("Springs:", springs.length);
console.log("Power:", power.length);
console.log("Aviation:", aviation.length);
console.log("Emergency:", emergency.length);
console.log("Cameras:", cameras.length);
