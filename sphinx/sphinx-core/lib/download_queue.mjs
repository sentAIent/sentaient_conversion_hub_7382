import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { WatchtowerService } from './watchtower.mjs';

const watchtower = new WatchtowerService();

function lon2tile(lon, zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat, zoom) { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

class DownloadQueue {
  constructor() {
    this.jobs = new Map();
  }

  calculateTiles(sw_lon, sw_lat, ne_lon, ne_lat, minZoom, maxZoom) {
    const tiles = [];
    for (let z = minZoom; z <= maxZoom; z++) {
      let min_x = lon2tile(sw_lon, z);
      let max_x = lon2tile(ne_lon, z);
      let min_y = lat2tile(ne_lat, z);
      let max_y = lat2tile(sw_lat, z);

      if (min_x > max_x) { const t = min_x; min_x = max_x; max_x = t; }
      if (min_y > max_y) { const t = min_y; min_y = max_y; max_y = t; }

      for (let x = min_x; x <= max_x; x++) {
        for (let y = min_y; y <= max_y; y++) {
          tiles.push({ z, x, y });
        }
      }
    }
    return tiles;
  }

  async enqueueJob(bbox, minZoom, maxZoom, clientId, deadlineTs) {
    const jobId = crypto.randomUUID();
    const [sw_lon, sw_lat, ne_lon, ne_lat] = bbox.split(',').map(parseFloat);
    const tiles = this.calculateTiles(sw_lon, sw_lat, ne_lon, ne_lat, minZoom, maxZoom);
    
    // Deduplicate logic: check which tiles we actually need
    const missingTiles = [];
    for (const t of tiles) {
      const tilePath = path.join(process.cwd(), 'tile_cache', String(t.z), String(t.x), `${t.y}.png`);
      try {
        await fsPromises.access(tilePath);
      } catch {
        missingTiles.push(t);
      }
    }

    const job = {
      id: jobId,
      clientId,
      totalTiles: tiles.length,
      downloadedTiles: tiles.length - missingTiles.length, // preexisting ones
      missingTiles,
      status: 'queued',
      bbox,
      createdAt: Date.now(),
      deadline: deadlineTs,
    };

    this.jobs.set(jobId, job);
    console.log(`[Download Queue] Job ${jobId} enqueued. ${missingTiles.length} tiles missing out of ${tiles.length} total.`);

    // Start background processing
    this.processJob(jobId);

    return jobId;
  }

  async processJob(jobId) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    
    job.status = 'processing';
    
    // Also trigger Overpass OSINT cache download for the bbox
    try {
      console.log(`[Download Queue] Job ${jobId}: Fetching OSINT markers...`);
      await watchtower.fetchAllOverpass(job.bbox);
      console.log(`[Download Queue] Job ${jobId}: OSINT markers cached.`);
    } catch (err) {
      console.error(`[Download Queue] Job ${jobId}: OSINT fetch failed:`, err.message);
    }

    if (job.missingTiles.length === 0) {
      job.status = 'completed';
      return;
    }

    const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
    
    while (job.missingTiles.length > 0) {
      if (job.status === 'cancelled') return;

      const tile = job.missingTiles.shift();
      const { z, x, y } = tile;

      const tileCacheDir = path.join(process.cwd(), 'tile_cache', String(z), String(x));
      const tilePath = path.join(tileCacheDir, `${y}.png`);

      try {
        const response = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
          headers: { 'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)' }
        });
        
        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          await fsPromises.mkdir(tileCacheDir, { recursive: true });
          await fsPromises.writeFile(tilePath, buffer);
          job.downloadedTiles++;
        } else {
          console.warn(`[Download Queue] Tile fetch failed for ${z}/${x}/${y}: ${response.status}`);
          job.missingTiles.push(tile); // retry later
        }
      } catch (err) {
         console.warn(`[Download Queue] Tile fetch error for ${z}/${x}/${y}: ${err.message}`);
         job.missingTiles.push(tile);
      }

      // Throttle calculation
      if (job.missingTiles.length > 0) {
         const timeRemaining = job.deadline - Date.now();
         let delayMs = 1000; // default 1s
         if (timeRemaining > 0) {
           delayMs = timeRemaining / job.missingTiles.length;
           // Cap at a reasonable min/max
           if (delayMs < 200) delayMs = 200; // don't spam OSM harder than 5/sec
           if (delayMs > 30000) delayMs = 30000; // max 30s per tile
         }
         await new Promise(r => setTimeout(r, delayMs));
      }
    }
    
    job.status = 'completed';
    console.log(`[Download Queue] Job ${jobId} completed.`);
  }

  getJobStatus(jobId) {
    const job = this.jobs.get(jobId);
    if (!job) return null;
    return {
      id: job.id,
      status: job.status,
      totalTiles: job.totalTiles,
      downloadedTiles: job.downloadedTiles,
      progress: Math.round((job.downloadedTiles / job.totalTiles) * 100) || 0
    };
  }
}

export const downloadQueue = new DownloadQueue();
