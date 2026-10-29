// Sphinx Core - Surveillance Camera Intelligence
// Multi-vendor ALPR and CCTV tracking (Flock Safety, Axon, Ring, Motorola, Genetec)

export const VENDOR_MAP = {
  flock: { name: 'Flock Safety', type: 'ALPR', defaultFov: 42, defaultRange: 38 },
  axon: { name: 'Axon Enterprise', type: 'ALPR', defaultFov: 50, defaultRange: 45 },
  ring: { name: 'Amazon Ring', type: 'Doorbell Mesh', defaultFov: 140, defaultRange: 25 },
  motorola: { name: 'Motorola Vigilant', type: 'ALPR', defaultFov: 35, defaultRange: 50 },
  genetec: { name: 'Genetec AutoVu', type: 'ALPR', defaultFov: 40, defaultRange: 42 },
  verkada: { name: 'Verkada', type: 'Fixed Optical', defaultFov: 90, defaultRange: 30 }
};

export function classifyCamera(element) {
  const tags = element.tags || {};
  const tagStr = JSON.stringify(tags).toLowerCase();

  let vendor = 'cctv';
  if (tagStr.includes('flock')) vendor = 'flock';
  else if (tagStr.includes('axon')) vendor = 'axon';
  else if (tagStr.includes('ring')) vendor = 'ring';
  else if (tagStr.includes('motorola') || tagStr.includes('vigilant')) vendor = 'motorola';
  else if (tagStr.includes('genetec') || tagStr.includes('autovu')) vendor = 'genetec';
  else if (tagStr.includes('verkada')) vendor = 'verkada';
  else if (tags['highway'] === 'speed_camera') vendor = 'enforcement';
  else if (tags['camera:type'] === 'ALPR') vendor = 'flock';

  const rawDir = parseFloat(tags['camera:direction'] || tags['direction'] || tags['heading'] || '180');
  const direction = isNaN(rawDir) ? 180 : rawDir;

  return {
    vendor,
    vendor_display: VENDOR_MAP[vendor]?.name || 'Municipal Surveillance',
    direction,
    fov_angle: VENDOR_MAP[vendor]?.defaultFov || 45,
    range_meters: VENDOR_MAP[vendor]?.defaultRange || 35
  };
}
