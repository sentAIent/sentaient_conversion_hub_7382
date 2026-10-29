const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');
code = code.replace(/\{introState === 'playing' && <Html fullscreen/g, "{(introState === 'playing' || introState === 'cinematic_hover' || introState === 'falling') && <Html fullscreen");
fs.writeFileSync('components/Player.js', code);
