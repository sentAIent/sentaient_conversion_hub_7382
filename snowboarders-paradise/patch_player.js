const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(
  'export function Player() {',
  'export function Player({ gameStarted }) {'
);

code = code.replace(
  'useFrame((state, delta) => {',
  'useFrame((state, delta) => {\n    if (!gameStarted) return;\n'
);

fs.writeFileSync('components/Player.js', code);
console.log("Patched Player.js");
