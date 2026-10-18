import express from 'express';
// In a full implementation, we would use @mapbox/mbtiles or similar
// const MBTiles = require('@mapbox/mbtiles');

const router = express.Router();

let mbtilesInstance = null;

// Mock initialization
// new MBTiles('path/to/planet.mbtiles', (err, mbtiles) => {
//   mbtilesInstance = mbtiles;
// });

router.get('/style.json', (req, res) => {
  res.json({
    "version": 8,
    "name": "Sphinx Grid-Down Style",
    "sources": {
      "offline-satellite": {
        "type": "raster",
        "tiles": [
          "http://localhost:3117/api/tiles/{z}/{x}/{y}.png"
        ],
        "tileSize": 256
      }
    },
    "layers": [
      {
        "id": "offline-satellite-layer",
        "type": "raster",
        "source": "offline-satellite",
        "minzoom": 0,
        "maxzoom": 22
      }
    ]
  });
});

import fsPromises from 'fs/promises';
import path from 'path';

router.get('/:z/:x/:y.png', async (req, res) => {
  const { z, x, y } = req.params;
  
  // First check if the tile exists in our local tile_cache
  const tileCacheDir = path.join(process.cwd(), 'tile_cache', z, x);
  const tilePath = path.join(tileCacheDir, `${y}.png`);
  
  try {
    const tile = await fsPromises.readFile(tilePath);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=31536000');
    return res.send(tile);
  } catch (e) {
    // If not cached, attempt proxy or return transparent 1x1 png
    try {
      const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
      const response = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
        headers: { 'User-Agent': 'SphinxOSINT/2.0 (Defense Grid Intelligence)' }
      });
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fsPromises.mkdir(tileCacheDir, { recursive: true }).then(() => {
          fsPromises.writeFile(tilePath, buffer).catch(() => {});
        });
        res.set('Content-Type', 'image/png');
        res.set('Cache-Control', 'public, max-age=31536000');
        return res.send(buffer);
      }
    } catch (err) {}
    
    // Transparent PNG fallback
    const transparentPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
    res.set('Content-Type', 'image/png');
    return res.send(transparentPng);
  }
});

export const tileserver = router;
