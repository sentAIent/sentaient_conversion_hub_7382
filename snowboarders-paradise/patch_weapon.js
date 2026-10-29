const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

const oldWeapon = '<meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2.0} />';
const newWeapon = '<meshStandardMaterial color="#5c4033" roughness={0.9} metalness={0.1} /> {/* Realistic Wood/Composite Weapon */}';
code = code.replace(oldWeapon, newWeapon);

fs.writeFileSync('components/Player.js', code);
console.log("Weapon patched");
