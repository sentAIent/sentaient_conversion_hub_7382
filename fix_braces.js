const fs = require('fs');
let code = fs.readFileSync('binaural-assets/js/visuals/CymaticsCore.js', 'utf8');

// The issue is around '};\n\nexport class CymaticsCore'
// We need it to be '    }\n};\n\nexport class CymaticsCore'

code = code.replace('};\n\nexport class CymaticsCore', '    }\n};\n\nexport class CymaticsCore');

fs.writeFileSync('binaural-assets/js/visuals/CymaticsCore.js', code);
