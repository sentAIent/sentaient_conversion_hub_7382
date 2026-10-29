const fs = require('fs');

let code = fs.readFileSync('components/DetailedModels.js', 'utf8');
code = code.replace(/color: "#cc0000", metalness: 0\.5, roughness: 0\.5, metalness: 0\.0, roughness: 0\.1/g, 'color: "#cc0000", metalness: 0.5, roughness: 0.2');
code = code.replace(/color: "#eeeeee", metalness: 0\.8, roughness: 0\.2, metalness: 0\.0, roughness: 0\.1/g, 'color: "#eeeeee", metalness: 0.8, roughness: 0.2');
fs.writeFileSync('components/DetailedModels.js', code);
console.log("Cleaned up duplicate properties");
