const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const missingLine = `    // Ensure we don't apply velocity twice (bug fix)\n    pos.current.addScaledVector(vel.current, dt);\n`;
code = code.replace("    // Ensure we don't apply velocity twice (bug fix)", missingLine);

// Apply gravity during 'falling'
const fallingLogic = `if (introState === 'falling') {
      // Heli flies away
      if (heliRef.current) {
        heliRef.current.position.y += 20 * dt;
        heliRef.current.position.z -= 100 * dt;
        heliRef.current.rotation.x = -0.5;
      }
      
      vel.current.y -= 50 * dt; // Gravity
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 1) {
        setIntroState('playing');
        vel.current.z = -80; // explosive start
      }
    }`;
    
code = code.replace(/if \(introState === 'falling'\) \{[\s\S]*?vel\.current\.z = -40; \/\/ explosive start\n      \}\n    \}/, fallingLogic);

fs.writeFileSync('components/Player.js', code);
