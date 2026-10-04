const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(
  "setAnimState({ carving: Math.sign(angularVel.current), inAir, grabbing: inAir && controls.current.grab, wipeout: false });",
  "setAnimState({ carving: Math.sign(angularVel.current), inAir, grabbing: inAir && controls.current.grab, grabType: controls.current.grab1 ? 'method' : controls.current.grab2 ? 'indy' : controls.current.grab3 ? 'stiffy' : null, wipeout: false });"
);

code = code.replace(
  "if (controls.current.grab) score.current += (50 * dt * comboMultiplier.current);",
  "if (controls.current.grab) score.current += (50 * dt * comboMultiplier.current);\n      if (controls.current.grab1) score.current += (100 * dt * comboMultiplier.current);\n      if (controls.current.grab2) score.current += (200 * dt * comboMultiplier.current);\n      if (controls.current.grab3) score.current += (300 * dt * comboMultiplier.current);"
);

fs.writeFileSync('components/Player.js', code);
console.log("Anim state updated.");
