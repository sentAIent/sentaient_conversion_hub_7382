const fs = require('fs');
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

playerCode = playerCode.replace(/let lookOffset = _lookOffset\.set\(0, 0, -15\); \/\/ Look further ahead down the mountain\n      lookOffset\.applyAxisAngle\(_yAxis, moveAngle\);\n      lookOffset\.y \-= 1\.0; \/\/ Angle camera downwards much more to look at the slope!/, 
  'let lookOffset = _lookOffset.set(0, 1.5, -2); // Look at the player\'s upper body and slightly ahead\n      lookOffset.applyAxisAngle(_yAxis, moveAngle);');

playerCode = playerCode.replace(/camera\.position\.lerp\(idealOffset, 1\.0 - Math\.exp\(-10 \* dt\)\);/, 
  'camera.position.lerp(idealOffset, 1.0 - Math.exp(-25 * dt));');
  
playerCode = playerCode.replace(/currentLookAt\.current\.lerp\(lookAt, 1\.0 - Math\.exp\(-15 \* dt\)\);/, 
  'currentLookAt.current.lerp(lookAt, 1.0 - Math.exp(-30 * dt));');

fs.writeFileSync('components/Player.js', playerCode);

console.log("Patched Camera Logic");
