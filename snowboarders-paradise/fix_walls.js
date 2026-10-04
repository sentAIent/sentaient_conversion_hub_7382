const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

// Remove the alpine walls logic completely
const wallsOld = `  // Alpine Walls
  const centerDist = Math.abs(x);
  if (centerDist > 150) {
    y += Math.pow(centerDist - 150, 1.5) * 0.5;
  }`;
  
code = code.replace(wallsOld, "// No walls, infinite powder");

fs.writeFileSync('utils/terrainUtils.js', code);
