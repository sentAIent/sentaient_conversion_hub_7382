const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const target = `
      vel.current.y -= 150 * dt; // Gravity
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 0.1) {
        setIntroState('playing');
        vel.current.z = -80; // explosive start downhill
      }
    }
`;

const replacement = `
      vel.current.y -= 150 * dt; // Gravity
      pos.current.addScaledVector(vel.current, dt);
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 0.1) {
        setIntroState('playing');
        vel.current.z = -80; // explosive start downhill
      }
      return;
    }
`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('components/Player.js', code);
    console.log("Patched Player.js");
} else {
    console.log("Could not find target in Player.js");
}
