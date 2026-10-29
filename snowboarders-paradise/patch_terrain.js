const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

const oldFunc = `export function getTerrainHeight(x, z) {
  let y = 0;
  
  // 1. Base slope (the mountain slopes downwards)
  y += Math.tan(OVERALL_SLOPE) * z; 
  
  // 2. The natural halfpipe to keep players contained
  const centerDist = Math.abs(x);
  if (centerDist > HALFPIPE_RADIUS) {
    // Sharp exponential rise for the edges
    y += Math.pow(centerDist - HALFPIPE_RADIUS, 1.3) * 0.4;
  }
  
  // 3. Layered Macro and Micro noise based on biome
  const biome = getBiome(x, z);
  const macroNoise = noise2D(x * 0.001, z * 0.001);
  const microNoise = noise2D(x * 0.01, z * 0.01);
  const jaggedNoise = Math.abs(noise2D(x * 0.005, z * 0.005));

  if (biome === 'powder') {
    y += macroNoise * 50; // smooth hills
    y += microNoise * 5;
  } else if (biome === 'ice') {
    y += macroNoise * 30; 
    y += microNoise * 2; 
  } else if (biome === 'rocky') {
    y += macroNoise * 60;
    y += jaggedNoise * 20; // Sharp rocks
  }

  // 4. Feature injection
  const features = getNearbyObstacles(x, z);
  for (const feat of features) {
    if (feat.type === 'kicker') {
       // local height bump for ramps
       const dx = x - feat.x;
       const dz = z - feat.z;
       const dist = Math.sqrt(dx*dx + dz*dz);
       if (dist < feat.radius) {
          y += (feat.radius - dist) * 0.5; // simple cone ramp
       }
    }
  }

  return y;
}`;

const newFunc = `export function getTerrainHeight(x, z) {
  let y = 0;
  
  // 1. Base slope
  y += Math.tan(OVERALL_SLOPE) * z;
  
  // 2. The Peak (Starting Area)
  // At z=0, x=0, we want a flat helicopter drop zone.
  const distFromPeak = Math.sqrt(x*x + z*z);
  let peakBlend = 1.0;
  if (distFromPeak < 50) {
    peakBlend = distFromPeak / 50; // 0 at center, 1 at edge of peak
    y = y * peakBlend; // Flatten the slope at the peak
  }
  
  // 3. Infinite Bounds (Massive Alpine Walls instead of a halfpipe)
  const centerDist = Math.abs(x);
  if (centerDist > 150) {
    y += Math.pow(centerDist - 150, 1.5) * 0.5;
  }

  // 4. Layered Noise
  const biome = getBiome(x, z);
  const macroNoise = noise2D(x * 0.001, z * 0.001);
  const microNoise = noise2D(x * 0.01, z * 0.01);
  const jaggedNoise = Math.abs(noise2D(x * 0.005, z * 0.005));

  let noiseY = 0;
  if (biome === 'powder') {
    noiseY += macroNoise * 50 + microNoise * 5;
  } else if (biome === 'ice') {
    noiseY += macroNoise * 30 + microNoise * 2; 
  } else if (biome === 'rocky') {
    noiseY += macroNoise * 60 + jaggedNoise * 20;
  }
  
  y += noiseY * peakBlend;

  return y;
}`;

if (code.includes(oldFunc)) {
  code = code.replace(oldFunc, newFunc);
  fs.writeFileSync('utils/terrainUtils.js', code);
  console.log("Terrain patched!");
} else {
  console.log("Could not find oldFunc");
}
