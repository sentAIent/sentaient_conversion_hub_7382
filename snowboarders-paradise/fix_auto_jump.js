const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/if \(jump\) \{/, 'if (jump || introTimer.current > 4) {');

fs.writeFileSync('components/Player.js', code);
