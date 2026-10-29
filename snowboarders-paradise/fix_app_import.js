const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// Strip out any broken lines from the top
const lines = code.split('\n');
if (lines[0].includes('import { EffectComposer')) {
  lines.shift(); // remove the broken line
}

let newCode = "import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';\n" + lines.join('\n');
fs.writeFileSync('App.js', newCode);
console.log("Fixed App.js imports");
