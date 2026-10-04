const fs = require('fs');
let code = fs.readFileSync('components/TrackManager.js', 'utf8');

code = code.replace(
  'color: "#eeeeff", // changed from brown to snow-color!\n  roughness: 0.8, metalness: 0.1',
  'color: "#ff8800", emissive: "#ff4400", emissiveIntensity: 2.0, roughness: 0.4, metalness: 0.8 // Neon arcade kicker'
);

fs.writeFileSync('components/TrackManager.js', code);
console.log("Kicker updated");
