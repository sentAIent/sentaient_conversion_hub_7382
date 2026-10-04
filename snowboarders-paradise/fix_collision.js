const fs = require('fs');
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// Ensure import
if (!playerCode.includes('getNearbyObstacles')) {
  playerCode = playerCode.replace('getTerrainHeight, getTerrainNormal } from', 'getTerrainHeight, getTerrainNormal, getNearbyObstacles } from');
}

const collisionLogic = `
    const gravity = new THREE.Vector3(0, -80, 0); // Snappy gravity

    // --- OBSTACLE COLLISIONS ---
    const nearby = getNearbyObstacles(px, pz);
    let hitKicker = false;
    for (const obs of nearby) {
      const dist = Math.sqrt((px - obs.x)**2 + (pz - obs.z)**2);
      
      if (obs.type === 'tree' || obs.type === 'rock') {
         const radius = obs.scale * (obs.type === 'tree' ? 1.5 : 3.0);
         if (dist < radius) {
           // We hit a solid object!
           if (!inAir || pos.current.y < obs.y + radius * 2) {
             isWipeout.current = true;
             wipeoutTimer.current = 1.5;
             setTrickMsg("WIPEOUT!");
             setTimeout(() => setTrickMsg(""), 2000);
             comboMultiplier.current = 1.0;
             break;
           }
         }
      }
      else if (obs.type === 'kicker') {
         if (dist < 8 && vel.current.length() > 30 && pos.current.y <= groundY + 2.0) {
            hitKicker = true;
         }
      }
    }
`;

playerCode = playerCode.replace(/const gravity = new THREE\.Vector3\(0, -80, 0\);[^\n]*\n/, collisionLogic);

// Add kicker jump logic
playerCode = playerCode.replace('const isUphill = groundNormal.z < -0.2;', 'const isUphill = groundNormal.z < -0.2;\n      if (hitKicker) { vel.current.y += 60; pos.current.y += 2; inAir = true; setTrickMsg("KICKER!"); setTimeout(() => setTrickMsg(""), 2000); }');

fs.writeFileSync('components/Player.js', playerCode);
console.log("Collisions added");
