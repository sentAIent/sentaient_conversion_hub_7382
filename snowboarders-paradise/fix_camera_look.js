const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const newLookAt = `
      // Bring camera closer and look directly at the player's upper body instead of 20 meters ahead
      const idealOffset = new THREE.Vector3(0, camHeight * 0.5, camDistance * 0.4); 
      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(new THREE.Vector3(0, 1.5, -2).applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle));
`;

code = code.replace(/const idealOffset = new THREE\.Vector3\(0, camHeight \* 0\.4, camDistance \* 0\.6\); \/\/ brought closer and slightly lower\n\s*idealOffset\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), moveAngle\);\n\s*idealOffset\.add\(playerV\);\n\s*const lookAt = playerV\.clone\(\)\.add\(new THREE\.Vector3\(0,0,-20\)\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), moveAngle\)\);/, newLookAt);

fs.writeFileSync('components/Player.js', code);
