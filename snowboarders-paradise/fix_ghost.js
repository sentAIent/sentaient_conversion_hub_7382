const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

code = code.replace("export function IncredibleSnowboarder({ animState, colors }) {", "export function IncredibleSnowboarder({ animState, colors, ghost }) {");
code = code.replace(/<meshStandardMaterial/g, "<meshStandardMaterial transparent={ghost} opacity={ghost ? 0.3 : 1} ");

fs.writeFileSync('components/DetailedModels.js', code);
