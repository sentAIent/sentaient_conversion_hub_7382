const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(
  "import { getTerrainHeight } from '../utils/terrainUtils';",
  "import { getTerrainHeight, getTerrainNormal } from '../utils/terrainUtils';"
);

// Remove the local getTerrainNormal
code = code.replace(/function getTerrainNormal[\s\S]*?return.*\n\}/, "");

fs.writeFileSync('components/Player.js', code);
