const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

// Update OVERALL_SLOPE
code = code.replace(/export const OVERALL_SLOPE = [0-9.]+;/, 'export const OVERALL_SLOPE = 0.45;');

// Update the terrain math in getTerrainHeight
const heightFuncRegex = /export function getTerrainHeight\(x, z\) \{[\s\S]*?\n\}/;
const newHeightFunc = `export function getTerrainHeight(x, z) {
  let y = 0;
  y += Math.tan(OVERALL_SLOPE) * z; // slopes down into -z
  
  // The Peak (Helicopter Drop Zone)
  const distFromPeak = Math.sqrt(x*x + z*z);
  let peakBlend = 1.0;
  if (distFromPeak < 80) {
    peakBlend = distFromPeak / 80;
    y = y * peakBlend;
  }
  
  // Base rolling hills
  y += Math.sin(x * 0.05) * Math.cos(z * 0.05) * 15 * peakBlend;
  y += Math.sin(x * 0.02 + z * 0.01) * 30 * peakBlend;
  y += Math.sin(x * 0.1) * Math.sin(z * 0.1) * 5 * peakBlend;
  
  // Massive Jagged Cliffs (Art of Flight style)
  // Create deep ravines and sharp drops
  const cliffNoise = Math.sin(x * 0.005) * Math.cos(z * 0.01);
  if (cliffNoise > 0.6 && z < -200) {
    // Sharp sheer drop-off
    y -= (cliffNoise - 0.6) * 150 * peakBlend;
  }
  
  // Rocky ridges
  const ridgeNoise = Math.sin(x * 0.03 + z * 0.03) + Math.cos(x * 0.02 - z * 0.04);
  if (ridgeNoise > 1.2 && z < -150) {
    y += (ridgeNoise - 1.2) * 40 * peakBlend;
  }

  return y;
}`;

code = code.replace(heightFuncRegex, newHeightFunc);

fs.writeFileSync('utils/terrainUtils.js', code);
