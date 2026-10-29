const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Move start position much closer
code = code.replace(/pos\.current\.set\(300, 150, 200\);/g, 'pos.current.set(80, 60, 100);');
code = code.replace(/heliRef\.current\.position\.set\(300, 150, 200\);/g, 'heliRef.current.position.set(80, 60, 100);');

// Make the approach fast and crisp
code = code.replace(/heliRef\.current\.position\.lerp\(targetPos, dt \* 2\.0\);/g, 'heliRef.current.position.lerp(targetPos, dt * 4.0);');
code = code.replace(/heliRef\.current\.position\.lerp\(targetPos, dt \* 0\.8\);/g, 'heliRef.current.position.lerp(targetPos, dt * 4.0);');

fs.writeFileSync('components/Player.js', code);
