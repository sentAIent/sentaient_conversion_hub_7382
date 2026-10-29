const fs = require('fs');
const path = require('path');

const files = [
  'App.js',
  'components/Player.js',
  'components/TrackManager.js',
  'components/GhostRiders.js',
  'components/CarveTrail.js',
  'components/AudioManager.js',
  'components/GraphicsTierManager.js',
  'components/NPCs.js',
  'components/LootManager.js',
  'utils/terrainUtils.js',
  'utils/mockBackend.js'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"](\..*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const resolvedPath = path.resolve(path.dirname(file), importPath);
    const resolvedJS = resolvedPath + '.js';
    const resolvedJSX = resolvedPath + '.jsx';
    if (!fs.existsSync(resolvedJS) && !fs.existsSync(resolvedJSX) && !fs.existsSync(resolvedPath)) {
      console.log(`Missing import in ${file}: ${importPath} -> ${resolvedPath}`);
    }
  }
});
