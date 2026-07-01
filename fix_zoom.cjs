const fs = require('fs');
let js = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// Fix wheel zoom crash if closest is not a function
js = js.replace(
    `if (e.target.closest('.modal-content') || e.target.closest('.joystick-container') || e.target.closest('.mission-log')) return;`,
    `if (e.target.closest && (e.target.closest('.modal-content') || e.target.closest('.joystick-container') || e.target.closest('.mission-log'))) return;`
);

// Fix 3D scale bug that keeps the ship screen size constant
// Wait, if glPlayerShip.scale is 1/zoom, the ship stays the same size. 
// If they want zoom in flymode, maybe I shouldn't scale the ship down?
// In updateCamera():
// this.glPlayerShip.scale.set(1 / zoom, 1 / zoom, 1 / zoom);
// -> Change to 1, 1, 1? No, 2D game had it constant size too! 
// Let's just fix the crash first.

fs.writeFileSync('public/interstellar-game/script.js', js, 'utf8');
console.log("Fixed zoom crash");
