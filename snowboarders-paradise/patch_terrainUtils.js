const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

// We rename the math function to getRawTerrainHeight
code = code.replace(/export function getTerrainHeight\(x, z\) \{/, "function getRawTerrainHeight(x, z) {");

// We add a new getTerrainHeight that interpolates the grid
const interpLogic = `
export function getTerrainHeight(x, z) {
  // Constants from TrackManager.js
  const CHUNK_SIZE = 1000;
  const CHUNK_WIDTH = 800;
  const CHUNK_RESOLUTION_X = 32;
  const CHUNK_RESOLUTION_Z = 64;

  const dx = CHUNK_WIDTH / CHUNK_RESOLUTION_X;
  const dz = CHUNK_SIZE / CHUNK_RESOLUTION_Z;

  // Grid cell coordinates
  const gx = Math.floor(x / dx) * dx;
  const gz = Math.floor(z / dz) * dz;

  // Evaluate the 4 corners of the cell using the math function
  const h00 = getRawTerrainHeight(gx, gz);
  const h10 = getRawTerrainHeight(gx + dx, gz);
  const h01 = getRawTerrainHeight(gx, gz + dz);
  const h11 = getRawTerrainHeight(gx + dx, gz + dz);

  // Fractional position inside the cell
  const tx = (x - gx) / dx;
  const tz = (z - gz) / dz;

  // Bilinear interpolation
  const h0 = h00 * (1 - tx) + h10 * tx;
  const h1 = h01 * (1 - tx) + h11 * tx;
  return h0 * (1 - tz) + h1 * tz;
}
`;

code = code + "\n" + interpLogic;

// In getTerrainNormal, make sure it calls the interpolated version
code = code.replace(/getRawTerrainHeight\(x \- eps, z\)/g, "getTerrainHeight(x - eps, z)");

fs.writeFileSync('utils/terrainUtils.js', code);
