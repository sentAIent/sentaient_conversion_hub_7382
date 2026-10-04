const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. MASSIVE character scaling to guarantee they see a difference
code = code.replace(/<group ref=\{visualRef\} scale=\{\[2\.5, 2\.5, 2\.5\]\}>/, "<group ref={visualRef} scale={[4.0, 4.0, 4.0]}>");

// 2. Extremely tight camera distance and fixed FOV
const newCam = `
      // Aggressively tight action camera
      const idealOffset = new THREE.Vector3(0, camHeight * 0.4, camDistance * 0.25); 
      idealOffset.applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle);
      idealOffset.add(playerV);
      
      const lookAt = playerV.clone().add(new THREE.Vector3(0, 2.0, -1).applyAxisAngle(new THREE.Vector3(0,1,0), moveAngle));
      
      camera.position.lerp(idealOffset, 0.15);
      if (cameraShake.current > 0) { lookAt.x += (Math.random()-0.5)*cameraShake.current; lookAt.y += (Math.random()-0.5)*cameraShake.current; cameraShake.current -= dt * 10; }
      currentLookAt.current.lerp(lookAt, 0.15); camera.lookAt(currentLookAt.current);
      
      const targetFov = 60 + (boost && boostRef.current > 0 ? 10 : 0); // Removed speed-based zooming completely
`;

code = code.replace(/const idealOffset = new THREE\.Vector3\(0, camHeight \* 0\.5, camDistance \* 0\.4\);[\s\S]*?const targetFov = 65 \+ Math\.min\(speed \* 0\.2, 20\) \+ \(boost && boostRef\.current > 0 \? 15 : 0\);/, newCam);

fs.writeFileSync('components/Player.js', code);
