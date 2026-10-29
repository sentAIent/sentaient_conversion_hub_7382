const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Add melee to controls
code = code.replace(/grab1: false, grab2: false, grab3: false/g, "grab1: false, grab2: false, grab3: false, melee: false");
code = code.replace(/case 'Digit3': keys\.current\.grab3 = true; break;/g, "case 'Digit3': keys.current.grab3 = true; break;\n        case 'KeyM': keys.current.melee = true; break;");
code = code.replace(/case 'Digit3': keys\.current\.grab3 = false; break;/g, "case 'Digit3': keys.current.grab3 = false; break;\n        case 'KeyM': keys.current.melee = false; break;");

// 2. Add melee state variables to Player component
code = code.replace(/const totalAirRotation = useRef\(new THREE\.Vector3\(0,0,0\)\);/g, "const totalAirRotation = useRef(new THREE.Vector3(0,0,0));\n  const meleeTimer = useRef(0);\n  const weaponRotation = useRef(new THREE.Euler());");

// 3. In useFrame, update window.timeScale and handle melee logic
const logic = `
    // TIME DILATION
    if (window.timeScale === undefined) window.timeScale = 1.0;
    if (window.timeScale < 1.0) {
       window.timeScale += delta * 0.5; 
       if (window.timeScale > 1.0) window.timeScale = 1.0;
    }
    const dt = Math.min(delta * window.timeScale, 0.1);

    // MELEE LOGIC
    if (controls.current.melee && meleeTimer.current <= 0) {
      meleeTimer.current = 0.5; // 0.5 second swing
    }
    if (meleeTimer.current > 0) {
      meleeTimer.current -= dt;
      weaponRotation.current.set(Math.PI / 2, meleeTimer.current * Math.PI * 4, 0); // spin
      
      // Check collisions with NPCs
      if (window.npcList) {
         window.npcList.forEach(npc => {
            if (!npc.knockedOut) {
               const dist = Math.hypot(npc.x - pos.current.x, npc.z - pos.current.z);
               if (dist < 4.0 && Math.abs((npc.y || 0) - pos.current.y) < 5) {
                  npc.knockedOut = true;
                  npc.knockoutVelocity.set((npc.x - pos.current.x) * 10, 20, (npc.z - pos.current.z) * 10);
                  npc.knockoutRotation.set(Math.random()*10, Math.random()*10, Math.random()*10);
                  
                  if (inAir) {
                     updateTrickMsg("TRICK STRIKE! 5X MULTIPLIER!");
                     comboMultiplier.current += 5;
                     window.timeScale = 0.1; // Matrix slow mo
                     cameraShake.current = 5.0;
                  } else {
                     updateTrickMsg("SMACKDOWN!");
                     comboMultiplier.current += 1;
                     cameraShake.current = 2.0;
                  }
               }
            }
         });
      }
    } else {
      weaponRotation.current.set(0, 0, 0);
    }
`;
code = code.replace(/const dt = Math\.min\(delta, 0\.1\);/g, logic);

// 4. Render the weapon (a glowing neon branch) attached to the player
const weaponJSX = `
      {/* Melee Weapon */}
      <group position={[0.8, 1, 0.5]} rotation={weaponRotation.current}>
         <mesh visible={meleeTimer.current > 0 || controls.current.melee}>
            <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2.0} />
         </mesh>
      </group>
`;
code = code.replace(/<meshStandardMaterial color="black" \/>/g, '<meshStandardMaterial color="black" />' + weaponJSX);

fs.writeFileSync('components/Player.js', code);
