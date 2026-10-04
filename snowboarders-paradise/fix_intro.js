const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Change initial state
code = code.replace(/useState\('heli'\)/, "useState('cinematic_approach')");

// We need to add a timer reference to handle the cutscene
code = code.replace(/const heliRef = useRef\(\);/, "const heliRef = useRef();\n  const introTimer = useRef(0);");

const introBlock = `
    // === HELICOPTER MODE ===
    if (introState === 'heli') {
`;
// Replace the entire introBlock up to falling

const newIntro = `
    // === CINEMATIC HELICOPTER INTRO ===
    if (introState === 'cinematic_approach' || introState === 'cinematic_hover') {
      if (!heliRef.current) return;
      
      if (introState === 'cinematic_approach') {
        if (!heliRef.current.userData.initialized) {
          heliRef.current.position.set(300, 150, 200); // Start far away
          heliRef.current.rotation.set(0.2, 0.5, 0.2); // Tilted forward
          heliRef.current.userData.initialized = true;
          pos.current.set(300, 150, 200);
        }
        
        introTimer.current += dt;
        
        // Fly towards the peak (0, 30, 0)
        const targetPos = new THREE.Vector3(0, 30, 0);
        heliRef.current.position.lerp(targetPos, dt * 0.8);
        
        // Look at the peak
        heliRef.current.rotation.y = THREE.MathUtils.lerp(heliRef.current.rotation.y, Math.PI / 4, dt);
        heliRef.current.rotation.x = THREE.MathUtils.lerp(heliRef.current.rotation.x, 0.1, dt);
        heliRef.current.rotation.z = THREE.MathUtils.lerp(heliRef.current.rotation.z, 0.2, dt);
        
        if (heliRef.current.position.distanceTo(targetPos) < 5) {
          setIntroState('cinematic_hover');
        }
      } 
      else if (introState === 'cinematic_hover') {
        introTimer.current += dt;
        // Hover bobbing
        heliRef.current.position.y = 30 + Math.sin(introTimer.current * 2) * 1.5;
        heliRef.current.position.x = Math.cos(introTimer.current * 0.5) * 2;
        heliRef.current.position.z = Math.sin(introTimer.current * 0.5) * 2;
        
        // Settle rotation
        heliRef.current.rotation.x = THREE.MathUtils.lerp(heliRef.current.rotation.x, 0.0, dt * 2);
        heliRef.current.rotation.z = Math.sin(introTimer.current * 3) * 0.05;
        heliRef.current.rotation.y += dt * 0.1; // Slow spin to look around the massive drop

        updateTrickMsg("PRESS JUMP TO DROP IN");
        
        if (jump) {
          setIntroState('falling');
          updateTrickMsg("");
          vel.current.set(0, -5, -10); // Jump out forward
        }
      }

      // Drone is attached to heli side
      if (droneRef.current) {
        droneRef.current.position.copy(heliRef.current.position);
        droneRef.current.position.y -= 1.5;
        droneRef.current.position.x -= 2.0;
        droneRef.current.rotation.copy(heliRef.current.rotation);
      }

      // Player sits on the edge of the heli
      pos.current.copy(heliRef.current.position);
      pos.current.y -= 2;
      pos.current.x += 1.5; // Sitting on the skid
      boardRotation.current = heliRef.current.rotation.y;

      // Cinematic Camera pan around the hovering heli
      const camRadius = 25;
      const camSpeed = introState === 'cinematic_approach' ? 0.5 : 0.2;
      const cx = heliRef.current.position.x + Math.sin(introTimer.current * camSpeed) * camRadius;
      const cz = heliRef.current.position.z + Math.cos(introTimer.current * camSpeed) * camRadius;
      const cy = heliRef.current.position.y + 10;
      
      camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.1);
      camera.lookAt(heliRef.current.position);

      return;
    }
`;

// Regex replace everything from `// === HELICOPTER MODE ===` to `// === FALLING & PLAYING ===`
const replaceRegex = /\/\/ === HELICOPTER MODE ===[\s\S]*?\/\/ === FALLING & PLAYING ===/;
code = code.replace(replaceRegex, newIntro + "\n    // === FALLING & PLAYING ===");

// We also need to fix the UI so it doesn't show the Boost meter during the cinematic intro.
// And hide the Touch Controls during the intro.
code = code.replace(/<Html fullscreen style=\{\{ pointerEvents: 'none' \}\}>/, `{introState === 'playing' && <Html fullscreen style={{ pointerEvents: 'none' }}>`);
code = code.replace(/<\/Html>\s*<\/group>/, "</Html>}\n    </group>");

fs.writeFileSync('components/Player.js', code);
