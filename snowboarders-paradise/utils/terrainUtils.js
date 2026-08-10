// Simple deterministic 2D Value Noise function 
function random(x, z) {
    const dot = x * 12.9898 + z * 78.233;
    const sin = Math.sin(dot) * 43758.5453123;
    return sin - Math.floor(sin);
}

function noise2D(x, z) {
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    
    const fx = x - ix;
    const fz = z - iz;
    
    // Smoothstep
    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uz = fz * fz * (3.0 - 2.0 * fz);
    
    const a = random(ix, iz);
    const b = random(ix + 1, iz);
    const c = random(ix, iz + 1);
    const d = random(ix + 1, iz + 1);
    
    const res = a + (b - a) * ux +
            (c - a) * uz + (a - b - c + d) * ux * uz;
            
    // Convert to range -1 to 1 to match simplex noise
    return res * 2.0 - 1.0;
}

// Global mountain parameters
const MOUNTAIN_WIDTH = 800;
const HALFPIPE_RADIUS = 150;
const OVERALL_SLOPE = 15 * (Math.PI / 180); // 15 degree base slope

/**
 * Gets the height of the terrain at a specific (x, z) coordinate.
 * Note: Z is negative as the player moves forward down the mountain.
 * x = lateral distance from center
 * z = distance down the mountain
 */
export function getTerrainHeight(x, z) {
  let y = 0;
  
  // 1. Base slope (the mountain slopes downwards)
  y += Math.tan(OVERALL_SLOPE) * z; 
  
  // 2. The natural halfpipe to keep players contained
  const centerDist = Math.abs(x);
  if (centerDist > HALFPIPE_RADIUS) {
    // Sharp exponential rise for the edges
    y += Math.pow(centerDist - HALFPIPE_RADIUS, 1.3) * 0.4;
  }
  
  // 3. Macro noise (large hills and valleys)
  // Scale down the coordinates to sample the noise
  const macroNoise = noise2D(x * 0.001, z * 0.001);
  y += macroNoise * 50; // Much smoother hills
  
  // 4. Micro noise (small bumps, moguls)
  const microNoise = noise2D(x * 0.01, z * 0.01);
  y += microNoise * 10;

  return y;
}

/**
 * Approximates the normal vector of the terrain at (x, z)
 * Useful for aligning the snowboard to the slope.
 */
export function getTerrainNormal(x, z, delta = 1.0) {
    const hL = getTerrainHeight(x - delta, z);
    const hR = getTerrainHeight(x + delta, z);
    const hD = getTerrainHeight(x, z - delta);
    const hU = getTerrainHeight(x, z + delta);
    
    // Normal = cross product of the X and Z tangent vectors
    const dX = hR - hL;
    const dZ = hU - hD;
    
    // Normal vector components
    const nx = -dX;
    const ny = 2 * delta;
    const nz = -dZ;
    
    const length = Math.sqrt(nx*nx + ny*ny + nz*nz);
    return { x: nx/length, y: ny/length, z: nz/length };
}

/**
 * Checks if there's a tree or obstacle at exactly this position 
 * (to prevent player clipping or for generating instanced meshes)
 */
export function getObstacleData(x, z) {
    // Deterministic random based on position
    const val = noise2D(x * 123.456, z * 789.012);
    
    // Only spawn trees on the outer edges (centerDist > 100) to keep the middle clear
    if (Math.abs(x) > 100 && val > 0.95) {
        return { type: 'tree', scale: 1 + (val - 0.95) * 20 };
    }
    
    // Kickers in the middle
    if (Math.abs(x) < 80 && val < -0.98) {
        return { type: 'kicker', rotationY: (val + 0.99) * 100 };
    }
    
    return null;
}

/**
 * Returns deterministic data for a fallen log/rail obstacle.
 */
export function getRailData(x, z) {
    const val = noise2D(x * 345.678, z * 901.234);
    
    if (Math.abs(x) < 120 && val > 0.96) {
        const y = getTerrainHeight(x, z);
        return { 
            position: { x, y, z }, 
            rotationY: (val * Math.PI * 2) 
        };
    }
    return null;
}

/**
 * Returns deterministic data for a collectible (e.g. floating multiplier ring).
 */
export function getCollectibleData(x, z) {
    const val = noise2D(x * 567.890, z * 123.456);
    
    if (Math.abs(x) < 140 && val < -0.96) {
        const y = getTerrainHeight(x, z) + 5;
        return { 
            position: { x, y, z } 
        };
    }
    return null;
}
