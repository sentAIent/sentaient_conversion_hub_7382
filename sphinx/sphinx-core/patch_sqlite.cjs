const fs = require('fs');
let content = fs.readFileSync('lib/watchtower.mjs', 'utf8');

const regex = /async fetchCellTowers\([\s\S]*?\}\n\n  \n\}/m;

const replacement = `async fetchCellTowers(bboxString = null) {
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
        const stmt = fccDb.prepare(\`
          SELECT id, asr, lat, lon, owner, structure_type, height, lighting 
          FROM towers 
          WHERE lat >= ? AND lat <= ? AND lon >= ? AND lon <= ?
          LIMIT 2000
        \`);
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
        console.log(\`[Sphinx Watchtower] Discovered \${fccTowers.length} physical towers from FCC ASR.\`);
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
        const stmt = db.prepare(\`
          SELECT radio, net, cell, lon, lat, range 
          FROM cells 
          WHERE lat >= ? AND lat <= ? AND lon >= ? AND lon <= ?
          LIMIT 2000
        \`);
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

    console.log(\`[Sphinx Watchtower] Discovered \${features.length} total Cell Towers in bbox.\`);
    return { type: 'FeatureCollection', features };
  }
}`;

content = content.replace(regex, replacement);
fs.writeFileSync('lib/watchtower.mjs', content);
