const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Restore the Helicopter and Drone components
code = code.replace(/\{\/\* Helicopter Removed \*\/\}/, '<Helicopter ref={heliRef} />');
code = code.replace(/\{\/\* Drone Removed \*\/\}/, '<CameraDrone ref={droneRef} />');

// Change introState to 'cinematic_hover'
code = code.replace(/const \[introState, setIntroState\] = useState\('playing'\);/, "const [introState, setIntroState] = useState('cinematic_hover');");

// Put the pos initialization back
code = code.replace(/const pos = useRef\(new THREE\.Vector3\(0, 0, 0\)\);/, "const pos = useRef(new THREE.Vector3(0, 30, 0));");

// Replace the override that forced 'playing'
code = code.replace(/if \(!gameStarted\) return;\n    if \(introState !== 'playing'\) \{ setIntroState\('playing'\); return; \}/, 'if (!gameStarted) return;');

// Completely rewrite the intro logic block
const introLogicBlock = `
    // === CINEMATIC HELICOPTER INTRO ===
    if (introState === 'cinematic_approach' || introState === 'cinematic_hover') {
      if (!heliRef.current) return;
      
      // Initialize instantly at the peak hover
      if (!heliRef.current.userData.initialized) {
          heliRef.current.position.set(0, 30, 0);
          heliRef.current.rotation.set(0.1, 0, 0.1);
          heliRef.current.userData.initialized = true;
          pos.current.set(0, 30, 0);
          setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });
          
          if (introState === 'cinematic_approach') {
             setIntroState('cinematic_hover');
          }
      }

      introTimer.current += dt;

      // Heli hovers intensely at peak
      heliRef.current.position.x = Math.cos(introTimer.current * 2) * 0.5;
      heliRef.current.position.y = 30 + Math.sin(introTimer.current * 3) * 0.5;
      heliRef.current.position.z = Math.sin(introTimer.current * 1.5) * 0.5;
      
      heliRef.current.rotation.z = Math.sin(introTimer.current * 4) * 0.05;
      heliRef.current.rotation.y = Math.sin(introTimer.current * 0.5) * 0.2; 
      heliRef.current.rotation.x = 0.1 + Math.sin(introTimer.current * 2) * 0.05;

      updateTrickMsg("PRESS JUMP TO DROP IN");
      
      if (jump) {
        setIntroState('falling');
        setAnimState({ carving: 0, inAir: true, grabbing: false, wipeout: false });
        updateTrickMsg("");
        vel.current.set(0, 5, -20); // Aggressive jump forward and slightly up
      }

      // Drone is attached to heli side
      if (droneRef.current) {
        droneRef.current.position.copy(heliRef.current.position);
        droneRef.current.position.y -= 2.0;
        droneRef.current.position.x -= 4.5;
        droneRef.current.rotation.copy(heliRef.current.rotation);
      }

      // Player sits on the edge of the heli skid
      pos.current.copy(heliRef.current.position);
      pos.current.y -= 3.0;
      pos.current.x += 3.3; 
      boardRotation.current = heliRef.current.rotation.y;

      // Dynamic Cinematic Camera pan around the hovering heli
      const camRadius = 15;
      const camSpeed = 0.5;
      const cx = heliRef.current.position.x + Math.sin(introTimer.current * camSpeed) * camRadius;
      const cz = heliRef.current.position.z + Math.cos(introTimer.current * camSpeed) * camRadius;
      const cy = heliRef.current.position.y + 5 + Math.sin(introTimer.current) * 2;
      
      camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.1);
      camera.lookAt(heliRef.current.position);

      return;
    }

    // === FALLING & PLAYING ===
    if (introState === 'falling') {
      // Heli aggressively banks and flies away
      if (heliRef.current) {
        heliRef.current.position.y += 40 * dt;
        heliRef.current.position.z += 100 * dt; // flies backwards
        heliRef.current.position.x -= 50 * dt;
        heliRef.current.rotation.z = THREE.MathUtils.lerp(heliRef.current.rotation.z, 0.8, dt * 5); // banking hard
        heliRef.current.rotation.x = THREE.MathUtils.lerp(heliRef.current.rotation.x, -0.5, dt * 5);
      }
      
      vel.current.y -= 60 * dt; // Gravity
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 1.5) {
        setIntroState('playing');
        vel.current.z = -80; // explosive start downhill
      }
    }
`;

// Replace the old blocks
const regex = /\/\/ === CINEMATIC HELICOPTER INTRO ===[\s\S]*?\/\/ === FALLING & PLAYING ===[\s\S]*?vel\.current\.z = -80; \/\/ explosive start\n      \}\n    \}/;
code = code.replace(regex, introLogicBlock.trim());

// If regex failed because of "explosive start downhill", wait, the old one was "explosive start"
// It should match successfully.

fs.writeFileSync('components/Player.js', code);
