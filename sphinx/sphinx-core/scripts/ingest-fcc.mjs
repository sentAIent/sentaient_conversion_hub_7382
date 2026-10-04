import fs from 'fs';
import path from 'path';
import readline from 'readline';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/fcc-asr.db');
const coFile = path.join(__dirname, 'temp_asr/CO.dat');
const enFile = path.join(__dirname, 'temp_asr/EN.dat');
const raFile = path.join(__dirname, 'temp_asr/RA.dat');

if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE towers (
    id TEXT PRIMARY KEY,
    asr TEXT,
    lat REAL,
    lon REAL,
    owner TEXT,
    structure_type TEXT,
    height REAL,
    lighting TEXT
  );
`);

console.log("Reading EN.dat (Owners)...");
const owners = new Map();
const rlEn = readline.createInterface({ input: fs.createReadStream(enFile) });

rlEn.on('line', line => {
  const parts = line.split('|');
  if (parts[0] === 'EN' && parts[2]) {
    owners.set(parts[2], parts[9] || 'Unknown');
  }
});

rlEn.on('close', () => {
  console.log("Reading RA.dat (Engineering Details)...");
  const engineering = new Map();
  const rlRa = readline.createInterface({ input: fs.createReadStream(raFile) });
  
  rlRa.on('line', line => {
    const parts = line.split('|');
    if (parts[0] === 'RA' && parts[2]) {
      // 2: ID, 29: Structure Type, 27: Height AGL, 36: FAA Lighting
      engineering.set(parts[2], {
        type: parts[29] || 'Unknown',
        height: parseFloat(parts[27]) || 0,
        lighting: parts[36] || 'Unknown'
      });
    }
  });

  rlRa.on('close', () => {
    console.log("Reading CO.dat (Coordinates) and Building Database...");
    
    const insert = db.prepare('INSERT OR IGNORE INTO towers (id, asr, lat, lon, owner, structure_type, height, lighting) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    let count = 0;
    
    const insertMany = db.transaction((lines) => {
      for (const line of lines) {
        const parts = line.split('|');
        if (parts[0] === 'CO' && parts.length > 14) {
          const id = parts[2];
          const asr = parts[3];
          const latD = parseFloat(parts[6]);
          const latM = parseFloat(parts[7]);
          const latS = parseFloat(parts[8]);
          const latDir = parts[9];
          
          const lonD = parseFloat(parts[11]);
          const lonM = parseFloat(parts[12]);
          const lonS = parseFloat(parts[13]);
          const lonDir = parts[14];
          
          if (isNaN(latD) || isNaN(lonD)) continue;
          
          let lat = latD + (latM / 60) + (latS / 3600);
          if (latDir === 'S') lat = -lat;
          
          let lon = lonD + (lonM / 60) + (lonS / 3600);
          if (lonDir === 'W') lon = -lon;
          
          const owner = owners.get(id) || 'Unknown';
          const eng = engineering.get(id) || { type: 'Unknown', height: 0, lighting: 'Unknown' };
          
          insert.run(id, asr, lat, lon, owner, eng.type, eng.height, eng.lighting);
          count++;
        }
      }
    });

    const rlCo = readline.createInterface({ input: fs.createReadStream(coFile) });
    let batch = [];
    
    rlCo.on('line', line => {
      batch.push(line);
      if (batch.length >= 50000) {
        insertMany(batch);
        batch = [];
        process.stdout.write(`\rInserted ${count} FCC Towers...`);
      }
    });
    
    rlCo.on('close', () => {
      if (batch.length > 0) insertMany(batch);
      console.log(`\nFinished! Inserted ${count} FCC physical towers.`);
      console.log("Creating spatial indexes...");
      db.exec('CREATE INDEX idx_lat_lon ON towers (lat, lon)');
      console.log("Done.");
    });
  });
});
