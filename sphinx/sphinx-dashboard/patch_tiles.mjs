import fs from 'fs';

let content = fs.readFileSync('../sphinx-core/index.js', 'utf8');

const newRoute = `
// ============================================
// OFFLINE MAP TILE PROXY
// ============================================
import fsPromises from 'fs/promises';
import path from 'path';

app.get('/api/tiles/:z/:x/:y.png', async (req, res) => {
   const { z, x, y } = req.params;
   const tileCacheDir = path.join(process.cwd(), 'tile_cache', z, x);
   const tilePath = path.join(tileCacheDir, \`\${y}.png\`);
   
   try {
     // Check if we have it cached locally
     const tile = await fsPromises.readFile(tilePath);
     res.set('Content-Type', 'image/png');
     // Max age 1 year since tiles don't change often
     res.set('Cache-Control', 'public, max-age=31536000');
     return res.send(tile);
   } catch (e) {
     // File not found on disk, so we proxy to OSM and save it!
     try {
       const fetch = (await import('node-fetch')).default || (await import('node-fetch'));
       const response = await fetch(\`https://tile.openstreetmap.org/\${z}/\${x}/\${y}.png\`, {
         headers: { 'User-Agent': 'SphinxOSINT/2.0 (sentaient_dev@sentaient.com)' }
       });
       
       if (!response.ok) throw new Error(\`OSM returned \${response.status}\`);
       
       const arrayBuffer = await response.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       
       // Write to disk silently in the background
       fsPromises.mkdir(tileCacheDir, { recursive: true }).then(() => {
         fsPromises.writeFile(tilePath, buffer).catch(err => console.error(\`[Tile Cache Error]\`, err));
       });
       
       res.set('Content-Type', 'image/png');
       res.set('Cache-Control', 'public, max-age=31536000');
       return res.send(buffer);
     } catch (err) {
       console.error(\`[Tile Fetch Error] \${z}/\${x}/\${y}: \${err.message}\`);
       return res.status(500).send('Tile error');
     }
   }
});
`;

if (!content.includes('/api/tiles')) {
  content = content.replace(
    '// ============================================',
    newRoute + '\n// ============================================'
  );
  fs.writeFileSync('../sphinx-core/index.js', content);
}

// 2. Patch frontend
let frontend = fs.readFileSync('src/components/SphinxMap.tsx', 'utf8');
if (frontend.includes('https://tile.openstreetmap.org')) {
  frontend = frontend.replace(
    /https:\/\/tile\.openstreetmap\.org\/\{z\}\/\{x\}\/\{y\}\.png/g,
    'http://localhost:3000/api/tiles/{z}/{x}/{y}.png'
  );
  fs.writeFileSync('src/components/SphinxMap.tsx', frontend);
}

