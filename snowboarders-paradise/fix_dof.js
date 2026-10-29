const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

code = code.replace(/<EffectComposer>\n\s*<DepthOfField focusDistance=\{0\.0\} focalLength=\{0\.02\} bokehScale=\{2\} height=\{480\} \/>/g, "<EffectComposer>\n          {/* DOF removed to fix blurred mountain */}");
fs.writeFileSync('App.js', code);
