const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const cinematicCam = `
      // Standard 3rd person follow camera
      let idealOffset = new THREE.Vector3(0, camHeight, camDistance); 
      let targetFov = 65 + (boost && boostRef.current > 0 ? 10 : 0);
      let lookOffset = new THREE.Vector3(0, 1.5, 0); // Look at upper body

      const heightAboveGround = pos.current.y - groundY;
      if (inAir && heightAboveGround > 3) {
         // Cinematic Big Air!
         // Pull the camera WAY back and slightly down to make the jump look massive
         const pullBack = Math.min((heightAboveGround - 3) * 0.8, 15); 
         idealOffset = new THREE.Vector3(0, camHeight - (pullBack * 0.2), camDistance + pullBack);
         targetFov += Math.min((heightAboveGround - 3) * 1.5, 30); // dynamic wide angle
         lookOffset.y += pullBack * 0.15; // look slightly higher to keep them centered
      }

      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(lookOffset);
`;

code = code.replace(/\/\/ Standard 3rd person follow camera\n\s*const idealOffset = new THREE\.Vector3\(0, camHeight, camDistance\); \n\s*idealOffset\.applyAxisAngle\(new THREE\.Vector3\(0,1,0\), moveAngle\);\n\s*idealOffset\.add\(playerV\);\n\s*const lookAt = playerV\.clone\(\)\.add\(new THREE\.Vector3\(0, 1\.5, 0\)\); \/\/ Look at upper body/, cinematicCam);

// Oh wait, I also need to remove the old targetFov
code = code.replace(/const targetFov = 65 \+ \(boost \&\& boostRef\.current > 0 \? 10 : 0\);\n/, "");

fs.writeFileSync('components/Player.js', code);
