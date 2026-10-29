const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/vel\.current\.y = Math\.max\(vel\.current\.y, 0\) \+ 20;/g, "vel.current.y = Math.max(vel.current.y, 0) + 110;");

fs.writeFileSync('components/Player.js', code);
