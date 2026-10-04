const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const newJump = `
      if (hitKicker) { 
          vel.current.y += 35; 
          vel.current.z -= 15; 
          pos.current.y += 1; 
          inAir = true; 
          updateTrickMsg("KICKER!"); 
          setTimeout(() => updateTrickMsg(""), 2000); 
      }
      if ((jump && now - lastJump.current > 300) || (isUphill && speed > 60 && now - lastJump.current > 500)) {
        // Jump relative to the terrain normal, not just straight UP into the sky
        const jumpForce = jump ? 20 : 15;
        vel.current.addScaledVector(groundNormal, jumpForce);
        lastJump.current = now;
        pos.current.y += 0.5; // pop off ground
      }
`;

code = code.replace(/if \(hitKicker\) \{ vel\.current\.y \+= 60; pos\.current\.y \+= 2; inAir = true; updateTrickMsg\("KICKER!"\); setTimeout\(\(\) => updateTrickMsg\(""\), 2000\); \}\n\s*if \(\(jump && now - lastJump\.current > 300\) \|\| \(isUphill && speed > 60 && now - lastJump\.current > 500\)\) \{\n\s*vel\.current\.y \+= jump \? 40 : 30; \/\/ Massive jump\n\s*lastJump\.current = now;\n\s*pos\.current\.y \+= 1\.0; \/\/ pop off ground\n\s*\}/, newJump);

// And double jump
code = code.replace(/vel\.current\.y = Math\.max\(vel\.current\.y, 0\) \+ 30;/, "vel.current.y = Math.max(vel.current.y, 0) + 20;");

fs.writeFileSync('components/Player.js', code);
