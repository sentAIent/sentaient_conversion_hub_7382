const fs = require('fs');
let code = fs.readFileSync('components/CarveTrail.js', 'utf8');

code = code.replace("export function CarveTrail({ playerPos, carvingIntensity }) {", "export function CarveTrail({ playerPos, carvingIntensity, boostActive }) {");

code = code.replace("if (carvingIntensity.current > 5) {", "if (carvingIntensity.current > 5 || boostActive) {");

code = code.replace("sprayData[i].vel.set(", "sprayData[i].vel.set(\n            boostActive ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * carvingIntensity.current,\n            boostActive ? Math.random() * 8 : Math.random() * 5,\n            boostActive ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * carvingIntensity.current\n          );\n          // skip the old set");

code = code.replace(
  "sprayData[i].vel.set(\n            (Math.random() - 0.5) * carvingIntensity.current,\n            Math.random() * 5,\n            (Math.random() - 0.5) * carvingIntensity.current\n          );",
  ""
);

code = code.replace("<lineBasicMaterial color=\"#ffffff\" transparent opacity={0.6} />", "<lineBasicMaterial color={boostActive ? \"#00ffff\" : \"#ffffff\"} transparent opacity={0.6} />");
code = code.replace("<pointsMaterial color=\"#ffffff\" size={0.3} transparent opacity={0.8} />", "<pointsMaterial color={boostActive ? \"#ff0055\" : \"#ffffff\"} size={boostActive ? 0.8 : 0.3} transparent opacity={0.8} />");

fs.writeFileSync('components/CarveTrail.js', code);
console.log("CarveTrail updated");
