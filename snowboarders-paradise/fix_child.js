const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// Replace the buggy commented block
code = code.replace(/\{isHigh && \(\s*\{\/\* <EffectComposer[\s\S]*?<\/EffectComposer> \*\/\}\s*\)\}/g, '');

fs.writeFileSync('App.js', code);
