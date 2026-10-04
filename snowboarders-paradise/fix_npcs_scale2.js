const fs = require('fs');
let code = fs.readFileSync('components/NPCs.js', 'utf8');
code = code.replace(/scale=\{\[2\.5, 2\.5, 2\.5\]\}/g, "scale={[4.0, 4.0, 4.0]}");
fs.writeFileSync('components/NPCs.js', code);
