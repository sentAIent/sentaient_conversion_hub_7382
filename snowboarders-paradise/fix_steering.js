const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/if \(left\) angularVel\.current \+= 10 \* dt;/g, "if (left) angularVel.current += 30 * dt;");
code = code.replace(/if \(right\) angularVel\.current -= 10 \* dt;/g, "if (right) angularVel.current -= 30 * dt;");
code = code.replace(/angularVel\.current \*= Math\.exp\(-4\.0 \* dt\);/g, "angularVel.current *= Math.exp(-8.0 * dt);");
code = code.replace(/const driftSpeed = 8\.0;/g, "const driftSpeed = 15.0;");

fs.writeFileSync('components/Player.js', code);
