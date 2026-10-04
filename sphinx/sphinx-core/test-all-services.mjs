import { OpenSkyService } from './lib/opensky.mjs';
import { WatchtowerService } from './lib/watchtower.mjs';
import { DisastersService } from './lib/disasters.mjs';

async function testAll() {
  console.log("=== Testing All Data Sources ===");
  
  // 1. Aircraft
  try {
    const opensky = new OpenSkyService();
    const ac = await opensky.fetchLiveAircraft('-122.5,37.5,-122.0,38.0');
    console.log("[Aircraft]", ac.length, "records");
  } catch(e) { console.error("[Aircraft] ERROR", e); }

  // 2. Disasters (Weather & Earthquakes)
  try {
    const disasters = new DisastersService();
    const weather = await disasters.fetchSevereWeather('live');
    console.log("[Weather]", weather.features ? weather.features.length : 'NO FEATURES', "records");
    
    const quakes = await disasters.fetchEarthquakes('live');
    console.log("[Earthquakes]", quakes.features ? quakes.features.length : 'NO FEATURES', "records");
  } catch(e) { console.error("[Disasters] ERROR", e); }

  // 3. Watchtower (Cell Towers)
  try {
    const watchtower = new WatchtowerService();
    const cells = await watchtower.fetchCellTowers('-122.5,37.5,-122.0,38.0');
    console.log("[Cell Towers]", cells.features ? cells.features.length : 'NO FEATURES', "records");
  } catch(e) { console.error("[Cell Towers] ERROR", e); }

  // 4. Watchtower (Overpass)
  try {
    const watchtower = new WatchtowerService();
    // Valid bbox around San Francisco
    const overpass = await watchtower.fetchAllOverpass('37.5,-122.5,38.0,-122.0');
    console.log("[Overpass] Springs:", overpass.springs?.features?.length);
    console.log("[Overpass] Power:", overpass.power?.features?.length);
    console.log("[Overpass] Aviation:", overpass.aviation?.features?.length);
    console.log("[Overpass] Emergency:", overpass.emergency?.features?.length);
    console.log("[Overpass] Cameras:", overpass.cameras?.features?.length);
    if (overpass.error) console.log("[Overpass] ERROR RETURNED:", overpass);
  } catch(e) { console.error("[Overpass] EXCEPTION", e); }
}

testAll();
