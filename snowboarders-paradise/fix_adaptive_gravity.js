const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Remove the static gravity vector
code = code.replace(/const gravity = new THREE\.Vector3\(0, -250, 0\); \/\/ Snappy gravity/g, "const gravity = new THREE.Vector3(0, -120, 0);");

// 2. Add Adaptive Gravity to the inAir block
const adaptive = `
    if (inAir) {
      // Adaptive gravity: The higher you are, the harder gravity pulls, preventing infinite orbit
      const height = pos.current.y - groundY;
      const adaptiveGravity = new THREE.Vector3(0, -120 - (height * 8), 0);
      vel.current.addScaledVector(adaptiveGravity, dt);
`;
code = code.replace(/if \(inAir\) \{\n\s*vel\.current\.addScaledVector\(gravity, dt\);/g, adaptive);

// 3. Fix the jumps
code = code.replace(/vel\.current\.y \+= 140;/g, "vel.current.y = Math.max(vel.current.y, 0) + 40; vel.current.z -= 20;");
code = code.replace(/vel\.current\.y = Math\.max\(vel\.current\.y \+ 90, 90\);/g, "vel.current.y = Math.max(vel.current.y, 0) + 25; vel.current.z -= 10;");

// 4. Fix double jump
code = code.replace(/vel\.current\.y = Math\.max\(vel\.current\.y, 0\) \+ 110;/g, "vel.current.y = Math.max(vel.current.y, 0) + 30;");

fs.writeFileSync('components/Player.js', code);
