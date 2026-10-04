const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

const oldFuncRegex = /export function getTerrainHeight\(x, z\) \{[\s\S]*?\n\}/;
const newFunc = `export function getTerrainHeight(x, z) {
  const dist = Math.sqrt(x*x + z*z);
  
  // Base elevation: drop off quickly from 0,0
  let y = -dist * 0.3; 
  
  // The Main Face (Steeper drop down the -z axis)
  if (z < 0) {
      y += Math.tan(OVERALL_SLOPE + 0.2) * z;
  } else {
      y -= Math.tan(OVERALL_SLOPE) * z;
  }

  // Spines and Ridgelines (Art of Flight style)
  // We use atan2 to radiate spines out from the peak
  const angle = Math.atan2(z, x);
  const spineNoise = (Math.cos(angle * 5) + Math.cos(angle * 11) * 0.5) * 15;
  
  // The spines should become more prominent as you go down, but taper off far away
  const spineBlend = Math.min(dist / 40, 1.0) * Math.max(1.0 - dist / 2000, 0.0);
  y += spineNoise * spineBlend;

  // Macro Terrain Variation (Cliffs and bowls)
  y += Math.sin(x * 0.03) * Math.cos(z * 0.03) * 25;
  
  // Jagged Cliffs on the spines
  const cliffNoise = Math.sin(x * 0.01) * Math.cos(z * 0.015);
  if (cliffNoise > 0.4 && z < -100) {
    y -= (cliffNoise - 0.4) * 200; // Sheer drops
  }

  // Cap the actual drop-in point so they can stand at (0, 0)
  if (dist < 10) {
    y = y * (dist / 10); // Flattens precisely at the helicopter hover spot
  }

  return y;
}`;

code = code.replace(oldFuncRegex, newFunc);
fs.writeFileSync('utils/terrainUtils.js', code);
