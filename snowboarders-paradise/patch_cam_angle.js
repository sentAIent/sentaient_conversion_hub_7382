const fs = require('fs');
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// Raise the camera up over the rider's shoulders
playerCode = playerCode.replace(/let idealOffset = _idealOffset\.set\(0, camHeight, camDistance\);/, 'let idealOffset = _idealOffset.set(0, camHeight + 1.5, camDistance);');

// Angle the camera down the slope
playerCode = playerCode.replace(/let lookOffset = _lookOffset\.set\(0, 1\.5, \-2\);[^\n]*\n      lookOffset\.applyAxisAngle\(_yAxis, moveAngle\);/, 
  'let lookOffset = _lookOffset.set(0, -2.0, -8); // Look down the slope ahead of the rider\n      lookOffset.applyAxisAngle(_yAxis, moveAngle);');

// When in air, don't just pull back, look down at the landing
playerCode = playerCode.replace(/lookOffset\.y \+= pullBack \* 0\.3; \/\/ Look up towards the player slightly/, 
  'lookOffset.y -= pullBack * 0.1; // Look further down at the landing zone');

fs.writeFileSync('components/Player.js', playerCode);

console.log("Patched Camera Angle");
