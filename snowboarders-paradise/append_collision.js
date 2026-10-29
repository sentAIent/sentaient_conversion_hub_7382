const fs = require('fs');

let utils = fs.readFileSync('utils/terrainUtils.js', 'utf8');

if (!utils.includes('getNearbyObstacles')) {
utils += `
export function getNearbyObstacles(px, pz) {
    const obstacles = [];
    const biome = getBiome(px, pz);
    
    // Determine the grid step the TrackManager used here
    // In TrackManager: biome 1 (powder) = 1.0, 2 (ice) = 0.5, 3 (rocky) = 1.5
    // step = 30 / densityMod
    let densityMod = 1.0;
    if (biome === 'ice') densityMod = 0.5;
    else if (biome === 'rocky') densityMod = 1.5;
    const step = 30 / densityMod;
    
    // Snap player pos to the grid
    const startX = Math.floor((px - 50) / step) * step;
    const endX = Math.ceil((px + 50) / step) * step;
    
    const startZ = Math.floor((pz - 50) / step) * step;
    const endZ = Math.ceil((pz + 50) / step) * step;
    
    for (let ox = startX; ox <= endX; ox += step) {
        for (let oz = startZ; oz <= endZ; oz += step) {
            const obs = getObstacleData(ox, oz);
            if (obs) {
                obstacles.push({ ...obs, x: ox, z: oz, y: getTerrainHeight(ox, oz) });
            }
        }
    }
    return obstacles;
}
`;
fs.writeFileSync('utils/terrainUtils.js', utils);
}
