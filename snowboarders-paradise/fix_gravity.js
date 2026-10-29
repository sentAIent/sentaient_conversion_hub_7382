const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Snappy gravity (increase to -250 to prevent orbit on steep slopes at high speeds)
code = code.replace(/const gravity = new THREE\.Vector3\(0, -80, 0\);/g, "const gravity = new THREE.Vector3(0, -250, 0);");

// 2. Adjust kicker jump
code = code.replace(/vel\.current\.y \+= 20;/g, "vel.current.y += 140;");

// 3. Adjust manual jump
code = code.replace(/vel\.current\.y = Math\.max\(vel\.current\.y \+ 15, 15\);/g, "vel.current.y = Math.max(vel.current.y + 90, 90);");

fs.writeFileSync('components/Player.js', code);
