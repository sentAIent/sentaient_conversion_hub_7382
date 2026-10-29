const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const newJump = `
      if (hitKicker) { 
          // Smooth arcade jump off kickers. Do not artificially boost Z speed, it looks unnatural.
          // Do not give insane Y height.
          vel.current.y += 20; 
          pos.current.y += 1.0; 
          inAir = true; 
          updateTrickMsg("KICKER!"); 
          setTimeout(() => updateTrickMsg(""), 2000); 
      }
      if ((jump && now - lastJump.current > 300) || (isUphill && speed > 60 && now - lastJump.current > 500)) {
        // Arcade jump: Add pure vertical velocity so we don't break horizontal momentum.
        // Cap the max jump velocity so they don't get moon gravity if they spam it on a bump.
        vel.current.y = Math.max(vel.current.y + 15, 15);
        lastJump.current = now;
        pos.current.y += 0.5; // pop off ground
      }
`;

code = code.replace(/if \(hitKicker\) \{[\s\S]*?pos\.current\.y \+= 0\.5; \/\/ pop off ground\n\s*\}/, newJump);

fs.writeFileSync('components/Player.js', code);
