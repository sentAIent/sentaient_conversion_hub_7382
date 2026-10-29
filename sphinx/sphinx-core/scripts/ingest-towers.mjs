import fs from 'fs';
import path from 'path';
import https from 'https';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.OPENCELLID_API_KEY;
if (!API_KEY) {
  console.error("ERROR: OPENCELLID_API_KEY is not set in sphinx-core/.env");
  process.exit(1);
}

const MCC = process.argv[2] || '310'; 
const DOWNLOAD_URL = `https://opencellid.org/ocid/downloads?token=${API_KEY}&type=mcc&file=${MCC}.csv.gz`;
const DB_PATH = path.join(__dirname, '../data/towers.db');

console.log(`[Ingest] Starting Cell Tower Ingestion for MCC: ${MCC}`);
console.log(`[Ingest] Target DB: ${DB_PATH}`);

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS cells (
    radio TEXT,
    mcc INTEGER,
    net INTEGER,
    area INTEGER,
    cell INTEGER,
    unit INTEGER,
    lon REAL,
    lat REAL,
    range INTEGER,
    samples INTEGER,
    changeable INTEGER,
    created INTEGER,
    updated INTEGER,
    averageSignal INTEGER
  );
`);

console.log(`[Ingest] Downloading data from OpenCelliD...`);

https.get(DOWNLOAD_URL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`[Ingest] Download failed with status ${res.statusCode}. Check your API Key.`);
    process.exit(1);
  }

  db.prepare('DELETE FROM cells WHERE mcc = ?').run(parseInt(MCC));

  const insert = db.prepare(`
    INSERT INTO cells (radio, mcc, net, area, cell, unit, lon, lat, range, samples, changeable, created, updated, averageSignal)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  
  const insertMany = db.transaction((lines) => {
    for (const line of lines) {
      const parts = line.split(',');
      if (parts.length < 14) continue;
      
      insert.run(
        parts[0],
        parseInt(parts[1]) || 0,
        parseInt(parts[2]) || 0,
        parseInt(parts[3]) || 0,
        parseInt(parts[4]) || 0,
        parseInt(parts[5]) || 0,
        parseFloat(parts[6]) || 0,
        parseFloat(parts[7]) || 0,
        parseInt(parts[8]) || 0,
        parseInt(parts[9]) || 0,
        parseInt(parts[10]) || 0,
        parseInt(parts[11]) || 0,
        parseInt(parts[12]) || 0,
        parseInt(parts[13]) || 0
      );
      count++;
    }
  });

  const rl = readline.createInterface({
    input: res.pipe(zlib.createGunzip()),
    crlfDelay: Infinity
  });

  let batch = [];
  rl.on('line', (line) => {
    batch.push(line);
    if (batch.length >= 10000) {
      insertMany(batch);
      batch = [];
      process.stdout.write(`\r[Ingest] Inserted ${count} records...`);
    }
  });

  rl.on('close', () => {
    if (batch.length > 0) insertMany(batch);
    console.log(`\n[Ingest] Finished! Total records inserted: ${count}`);
    
    console.log(`[Ingest] Creating geospatial indexes (this might take a moment)...`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_cells_lat_lon ON cells (lat, lon);`);
    db.exec(`CREATE INDEX IF NOT EXISTS idx_cells_mcc ON cells (mcc);`);
    console.log(`[Ingest] Done! Database is ready to serve queries.`);
    db.close();
  });
}).on('error', (err) => {
  console.error(`[Ingest] Network error:`, err);
  process.exit(1);
});
