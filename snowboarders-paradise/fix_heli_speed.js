const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Speed up the cinematic approach
code = code.replace(/heliRef\.current\.position\.lerp\(targetPos, dt \* 0\.8\);/g, 'heliRef.current.position.lerp(targetPos, dt * 2.0);');

// Increase camera rotate speed during approach
code = code.replace(/const camSpeed = introState === 'cinematic_approach' \? 0\.5 : 0\.2;/g, "const camSpeed = introState === 'cinematic_approach' ? 1.5 : 0.5;");

fs.writeFileSync('components/Player.js', code);
