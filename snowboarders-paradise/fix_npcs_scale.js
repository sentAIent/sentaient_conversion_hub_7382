const fs = require('fs');
let code = fs.readFileSync('components/NPCs.js', 'utf8');

code = code.replace(/<group position=\{\[0, 0\.6, 0\]\}>/, "<group position={[0, 0.6, 0]} scale={[2.5, 2.5, 2.5]}>");

fs.writeFileSync('components/NPCs.js', code);
