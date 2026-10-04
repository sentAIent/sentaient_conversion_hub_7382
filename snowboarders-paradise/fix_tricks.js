const fs = require('fs');
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// Increase trick spin speed
playerCode = playerCode.replace('trickRotation.current.x += (controls.current.jump ? 5.0 : 3.0) * dt;', 'trickRotation.current.x += (controls.current.jump ? 8.0 : 5.0) * dt;');
playerCode = playerCode.replace('trickRotation.current.y += (left ? 4.0 : right ? -4.0 : 0) * dt;', 'trickRotation.current.y += (left ? 7.0 : right ? -7.0 : 0) * dt;');

fs.writeFileSync('components/Player.js', playerCode);
console.log("Tricks buffed");
