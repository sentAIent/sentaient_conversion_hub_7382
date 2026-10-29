const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Revert character scale to human size
code = code.replace(/<group ref=\{visualRef\} scale=\{\[4\.0, 4\.0, 4\.0\]\}>/, "<group ref={visualRef} scale={[1.5, 1.5, 1.5]}>");

// 2. Fix the camera to a proper 3rd person follow
const newCam = `
      // Standard 3rd person follow camera
      const idealOffset = new THREE.Vector3(0, camHeight, camDistance); 
      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(new THREE.Vector3(0, 1.5, 0)); // Look at upper body
      
      camera.position.lerp(idealOffset, 0.15);
      if (cameraShake.current > 0) { lookAt.x += (Math.random()-0.5)*cameraShake.current; lookAt.y += (Math.random()-0.5)*cameraShake.current; cameraShake.current -= dt * 10; }
      currentLookAt.current.lerp(lookAt, 0.15); camera.lookAt(currentLookAt.current);
      
      const targetFov = 65 + (boost && boostRef.current > 0 ? 10 : 0);
`;

code = code.replace(/const idealOffset = new THREE\.Vector3\(0, camHeight \* 0\.4, camDistance \* 0\.25\);[\s\S]*?const targetFov = 60 \+ \(boost && boostRef\.current > 0 \? 10 : 0\); \/\/ Removed speed-based zooming completely/, newCam);

fs.writeFileSync('components/Player.js', code);

// Revert NPCs too
let npcCode = fs.readFileSync('components/NPCs.js', 'utf8');
npcCode = npcCode.replace(/scale=\{\[4\.0, 4\.0, 4\.0\]\}/g, "scale={[1.5, 1.5, 1.5]}");
fs.writeFileSync('components/NPCs.js', npcCode);
