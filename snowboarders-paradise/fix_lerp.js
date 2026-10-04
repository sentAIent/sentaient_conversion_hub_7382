const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/camera\.position\.lerp\(idealOffset, 0\.15\);/g, "camera.position.lerp(idealOffset, 1.0 - Math.exp(-10 * dt));");
code = code.replace(/currentLookAt\.current\.lerp\(lookAt, 0\.15\);/g, "currentLookAt.current.lerp(lookAt, 1.0 - Math.exp(-15 * dt));");

fs.writeFileSync('components/Player.js', code);
