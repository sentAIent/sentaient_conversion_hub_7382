const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const oldCamera = `      let idealOffset = new THREE.Vector3(0, camHeight, camDistance); 
      let targetFov = 65 + (boost && boostRef.current > 0 ? 10 : 0);
      let lookOffset = new THREE.Vector3(0, 0, -15); // Look 15 meters ahead
      lookOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), moveAngle);
      lookOffset.y += 1.0; // Look at a point 1m above ground, 15m ahead`;

const newCamera = `      // Keep camera high and back so we can see down the mountain
      let idealOffset = new THREE.Vector3(0, camHeight + 4, camDistance + 3); 
      let targetFov = 65 + (boost && boostRef.current > 0 ? 10 : 0);
      
      // Point the camera down the slope
      let lookOffset = new THREE.Vector3(0, 0, -10); // Look 10 meters ahead
      lookOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), moveAngle);
      lookOffset.y -= 3.0; // Angle camera downwards to look at the slope!`;

code = code.replace(oldCamera, newCamera);
fs.writeFileSync('components/Player.js', code);
