const fs = require('fs');
let code = fs.readFileSync('utils/terrainUtils.js', 'utf8');

const obsDataFunc = `
export function getObstacleData(x, z) {
    const r = random(x, z);
    
    // Keep peak clear
    if (Math.sqrt(x*x + z*z) < 100) return null;

    if (r > 0.98) {
        return { type: 'kicker', x, z, radius: 10, height: 10, rotationY: random(x, z) * Math.PI };
    } else if (r > 0.95) {
        return { type: 'rock', x, z, radius: 3 + random(x, z)*5, scale: [2, 2, 2] };
    } else if (r > 0.85) {
        return { type: 'tree', x, z, radius: 2 };
    }
    return null;
}
`;

code += "\n" + obsDataFunc;
fs.writeFileSync('utils/terrainUtils.js', code);
