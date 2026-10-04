import Database from 'better-sqlite3';
import path from 'path';

// Initialize the SQLite database for offline OSINT caching
const dbPath = path.resolve(process.cwd(), 'sphinx_cache.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create the unified OSINT features table
db.exec(`
  CREATE TABLE IF NOT EXISTS osm_features (
    id TEXT PRIMARY KEY,
    type TEXT,
    lat REAL,
    lon REAL,
    tags TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_osm_features_loc ON osm_features(lat, lon);
`);

const insertStmt = db.prepare(`
  INSERT INTO osm_features (id, type, lat, lon, tags, updated_at) 
  VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(id) DO UPDATE SET 
    lat=excluded.lat, 
    lon=excluded.lon, 
    tags=excluded.tags, 
    updated_at=CURRENT_TIMESTAMP
`);

const selectBboxStmt = db.prepare(`
  SELECT * FROM osm_features 
  WHERE lat BETWEEN ? AND ? 
    AND lon BETWEEN ? AND ?
`);

export class OsintCache {
  saveFeatures(features) {
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        const lat = item.center ? item.center.lat : item.lat;
        const lon = item.center ? item.center.lon : item.lon;
        const tags = JSON.stringify(item.tags || {});
        
        if (lat !== undefined && lon !== undefined && item.id) {
          const uniqueId = `${item.type}_${item.id}`;
          insertStmt.run(uniqueId, item.type, lat, lon, tags);
        }
      }
    });
    
    try {
      insertMany(features);
      console.log(`[Sphinx Cache] Synchronized ${features.length} OSINT markers to local offline disk.`);
    } catch (e) {
      console.error(`[Sphinx Cache] Error saving to SQLite:`, e);
    }
  }

  getFeaturesInBbox(sw_lat, sw_lon, ne_lat, ne_lon) {
    try {
      const rows = selectBboxStmt.all(sw_lat, ne_lat, sw_lon, ne_lon);
      return rows.map(row => ({
        type: row.type,
        id: row.id.split('_')[1],
        lat: row.lat,
        lon: row.lon,
        tags: JSON.parse(row.tags)
      }));
    } catch (e) {
      console.error(`[Sphinx Cache] Error querying SQLite:`, e);
      return [];
    }
  }
}
