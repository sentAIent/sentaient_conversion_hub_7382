const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const oldCheck = `if (jump) {`;
const newCheck = `if (jump || introTimer.current > 6) {`;

code = code.replace(oldCheck, newCheck);

fs.writeFileSync('components/Player.js', code);
