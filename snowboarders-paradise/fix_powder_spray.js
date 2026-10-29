const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/\{introState === 'playing' && !animState\.inAir && animState\.carving !== 0 && <PowderSpray active=\{true\} \/>\}/g, "");

fs.writeFileSync('components/Player.js', code);
