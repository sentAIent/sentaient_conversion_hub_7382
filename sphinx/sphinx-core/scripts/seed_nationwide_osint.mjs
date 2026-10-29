import { OsintCache } from '../lib/cache.mjs';
import fetch from 'node-fetch';

const METROS = [
  { name: 'New York City, NY', bbox: '-74.15,40.55,-73.70,40.92' },
  { name: 'Los Angeles, CA', bbox: '-118.67,33.70,-118.15,34.34' },
  { name: 'Chicago, IL', bbox: '-87.94,41.64,-87.52,42.02' },
  { name: 'Houston, TX', bbox: '-95.79,29.52,-95.01,30.11' },
  { name: 'Phoenix, AZ', bbox: '-112.32,33.29,-111.92,33.71' },
  { name: 'Philadelphia, PA', bbox: '-75.28,39.87,-74.96,40.14' },
  { name: 'San Antonio, TX', bbox: '-98.78,29.21,-98.22,29.64' },
  { name: 'San Diego, CA', bbox: '-117.28,32.53,-116.91,33.11' },
  { name: 'Dallas, TX', bbox: '-97.00,32.62,-96.55,33.02' },
  { name: 'Austin, TX', bbox: '-97.93,30.13,-97.58,30.51' },
  { name: 'San Jose, CA', bbox: '-122.05,37.20,-121.75,37.45' },
  { name: 'San Francisco, CA', bbox: '-122.52,37.70,-122.35,37.83' },
  { name: 'Seattle, WA', bbox: '-122.44,47.49,-122.24,47.73' },
  { name: 'Denver, CO', bbox: '-105.11,39.61,-104.88,39.81' },
  { name: 'Boston, MA', bbox: '-71.19,42.23,-70.99,42.40' },
  { name: 'Atlanta, GA', bbox: '-84.55,33.65,-84.29,33.89' },
  { name: 'Miami, FL', bbox: '-80.32,25.71,-80.13,25.86' },
  { name: 'Las Vegas, NV', bbox: '-115.36,36.08,-115.06,36.29' },
  { name: 'Portland, OR', bbox: '-122.84,45.43,-122.47,45.65' },
  { name: 'Minneapolis, MN', bbox: '-93.33,44.89,-93.19,45.05' },
  { name: 'Detroit, MI', bbox: '-83.29,42.26,-82.91,42.45' },
  { name: 'Charlotte, NC', bbox: '-81.01,35.08,-80.67,35.39' },
  { name: 'Tampa, FL', bbox: '-82.85,27.70,-82.35,28.10' },
  { name: 'Salt Lake City, UT', bbox: '-112.10,40.69,-111.75,40.85' },
  { name: 'Nashville, TN', bbox: '-86.93,36.04,-86.63,36.24' },
  { name: 'St. Louis, MO', bbox: '-90.32,38.53,-90.17,38.77' },
  { name: 'Pittsburgh, PA', bbox: '-80.09,40.36,-79.87,40.50' },
  { name: 'Baltimore, MD', bbox: '-76.71,39.20,-76.53,39.37' },
  { name: 'Cleveland, OH', bbox: '-81.88,41.39,-81.53,41.59' },
  { name: 'Kansas City, MO', bbox: '-94.72,38.93,-94.46,39.18' }
];

const OVERPASS_ENDPOINTS = [
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass-api.de/api/interpreter'
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchCityFeatures(bboxString) {
  const [sw_lon, sw_lat, ne_lon, ne_lat] = bboxString.split(',').map(parseFloat);
  const searchBbox = `${sw_lat},${sw_lon},${ne_lat},${ne_lon}`;

  const query = `
    [out:json][timeout:35];
    (
      node["telecom"="data_center"](${searchBbox});
      node["building"="data_center"](${searchBbox});
      node["man_made"="radar"](${searchBbox});
      node["military"="radar"](${searchBbox});
      node["amenity"~"^(hospital|police|fire_station|drinking_water)$"](${searchBbox});
      node["aeroway"~"^(helipad|aerodrome)$"](${searchBbox});
      node["power"~"^(substation|plant)$"](${searchBbox});
      node["man_made"="surveillance"](${searchBbox});
      node["highway"="speed_camera"](${searchBbox});
      node["camera:type"="ALPR"](${searchBbox});
      node["tourism"~"^(camp_site|wilderness_hut|caravan_site)$"](${searchBbox});
      node["leisure"~"^(park|nature_reserve)$"](${searchBbox});
      node["natural"="spring"](${searchBbox});

      way["power"~"^(substation|plant)$"](${searchBbox});
      way["amenity"~"^(hospital|police|fire_station)$"](${searchBbox});
      way["aeroway"~"^(helipad|aerodrome)$"](${searchBbox});
      way["telecom"="data_center"](${searchBbox});
      way["man_made"="radar"](${searchBbox});
    );
    out center tags qt;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'SphinxOSINT/2.0 (seeder@sentaient.com)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      if (data && Array.isArray(data.elements)) {
        return data.elements;
      }
    } catch (err) {
      console.warn(`  [Mirror Error] ${endpoint}: ${err.message}`);
    }
  }
  return null;
}

export async function runNationwideSeeder(options = {}) {
  const cache = new OsintCache();
  const delayMs = (options.delaySeconds || 6) * 1000;
  const targetCity = options.city?.toLowerCase();

  console.log(`=======================================================`);
  console.log(`[Sphinx Seeder] Starting Nationwide OSINT Cache Seeding`);
  console.log(`[Sphinx Seeder] Target Metros: ${METROS.length} | Interval: ${delayMs / 1000}s`);
  console.log(`=======================================================`);

  let seededCount = 0;
  let totalFeaturesInserted = 0;

  for (const metro of METROS) {
    if (targetCity && !metro.name.toLowerCase().includes(targetCity)) {
      continue;
    }

    const [sw_lon, sw_lat, ne_lon, ne_lat] = metro.bbox.split(',').map(parseFloat);
    const existing = cache.getFeaturesInBbox(sw_lat, sw_lon, ne_lat, ne_lon);

    if (existing.length >= 250 && !options.force) {
      console.log(`[✓] ${metro.name.padEnd(25)}: Already seeded (${existing.length} features cached). Skipping.`);
      continue;
    }

    console.log(`[▶] Fetching ${metro.name} (${metro.bbox})...`);
    if (options.dryRun) {
      console.log(`    (Dry Run: Would query Overpass)`);
      continue;
    }

    const elements = await fetchCityFeatures(metro.bbox);
    if (elements && elements.length > 0) {
      cache.saveFeatures(elements);
      seededCount++;
      totalFeaturesInserted += elements.length;
      console.log(`    Successfully saved ${elements.length} features for ${metro.name}.`);
    } else if (elements && elements.length === 0) {
      console.log(`    Query succeeded but 0 features found for ${metro.name}.`);
    } else {
      console.warn(`    Failed to fetch features for ${metro.name}. Will retry on next pass.`);
    }

    // Polite rate limit sleep between cities
    console.log(`    Waiting ${delayMs / 1000}s before next metro...`);
    await sleep(delayMs);
  }

  console.log(`=======================================================`);
  console.log(`[Sphinx Seeder] Pass complete. Seeded ${seededCount} cities (+${totalFeaturesInserted} features).`);
  console.log(`=======================================================`);
  return { seededCount, totalFeaturesInserted };
}

// CLI direct run support
const isMain = process.argv[1]?.endsWith('seed_nationwide_osint.mjs');
if (isMain) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const cityArg = args.find(a => a.startsWith('--city='))?.split('=')[1];
  const delayArg = parseInt(args.find(a => a.startsWith('--delay='))?.split('=')[1] || '6', 10);

  runNationwideSeeder({ dryRun, force, city: cityArg, delaySeconds: delayArg })
    .then(() => process.exit(0))
    .catch(err => {
      console.error('[Sphinx Seeder Error]', err);
      process.exit(1);
    });
}
