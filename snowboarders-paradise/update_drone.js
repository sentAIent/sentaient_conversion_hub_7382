const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Inject the drone following logic inside the playing mode camera section
const cameraSectionRegex = /\/\/ Camera\s+const playerV = new THREE\.Vector3\(pos\.current\.x, smoothedYRef\.current, pos\.current\.z\);/;

const newCameraSection = `// Camera
    const playerV = new THREE.Vector3(pos.current.x, smoothedYRef.current, pos.current.z);
    
    // Dynamic Drone Cameraman (Detaches and follows the player!)
    if (introState !== 'cinematic_approach' && introState !== 'cinematic_hover' && droneRef.current) {
      // Position drone slightly up and to the right behind the player
      const droneOffsetVec = new THREE.Vector3(3, 8, 12).applyAxisAngle(new THREE.Vector3(0,1,0), boardRotation.current);
      const idealDronePos = playerV.clone().add(droneOffsetVec);
      
      // Let the drone smoothly catch up after the drop
      droneRef.current.position.lerp(idealDronePos, 0.05);
      
      // Drone always looks at player
      droneRef.current.lookAt(playerV);
      
      // Tilt drone slightly for speed
      const speed = vel.current.length();
      droneRef.current.rotation.x += speed * 0.002; 
    }`;

code = code.replace(cameraSectionRegex, newCameraSection);

fs.writeFileSync('components/Player.js', code);
