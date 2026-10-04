const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

// Red Bull Deep Blue
code = code.replace(/\{ color: "#080808"/g, '{ color: "#0a1c52"');
// Red Bull Red
code = code.replace(/\{ color: "#ff2200"/g, '{ color: "#e0102b"');
// Red Bull Silver/Metal
code = code.replace(/\{ color: "#444444"/g, '{ color: "#99aab5"');

// And let's make the tail rotor yellow just for that classic red bull pop
code = code.replace(/<mesh position=\{\[0\.02, 0\.2, -1\.02\]\} rotation=\{\[0, 0, Math\.PI \/ 2\]\} material=\{metalMat\}>/g, '<mesh position={[0.02, 0.2, -1.02]} rotation={[0, 0, Math.PI / 2]} material={accentMat}>');

fs.writeFileSync('components/DetailedModels.js', code);
