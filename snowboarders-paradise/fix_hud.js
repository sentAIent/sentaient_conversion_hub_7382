const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Replace the 3D Html block with a fullscreen one
const oldHtmlStart = `<Html position={[0, 3, 0]} center zIndexRange={[100, 0]}>`;
const newHtmlStart = `<Html fullscreen zIndexRange={[100, 0]} style={{ pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>`;

code = code.replace(oldHtmlStart, newHtmlStart);

// We need to add a top margin so it's at the top of the screen
code = code.replace(/width: '350px' \}\}>/, "width: '350px', marginTop: '40px' }}>");

fs.writeFileSync('components/Player.js', code);
