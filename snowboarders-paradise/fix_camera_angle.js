const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const camLogic = `
      // Track actual velocity direction rather than board rotation
      let moveAngle = boardRotation.current;
      if (vel.current.lengthSq() > 1.0) {
        moveAngle = THREE.MathUtils.lerp(boardRotation.current, Math.atan2(vel.current.x, -vel.current.z), 0.5);
      }
      
      const idealOffset = new THREE.Vector3(0, camHeight * 0.4, camDistance * 0.6); // brought closer and slightly lower
      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(new THREE.Vector3(0,0,-20).applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle));
`;

code = code.replace(/const idealOffset = new THREE\.Vector3\(0, camHeight \* 0\.4, camDistance \* 0\.6\); \/\/ brought closer and slightly lower\n\s*idealOffset\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), boardRotation\.current\);\n\s*idealOffset\.add\(playerV\);\n\s*const lookAt = playerV\.clone\(\)\.add\(new THREE\.Vector3\(0,0,-20\)\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), boardRotation\.current\)\);/, camLogic);

fs.writeFileSync('components/Player.js', code);
