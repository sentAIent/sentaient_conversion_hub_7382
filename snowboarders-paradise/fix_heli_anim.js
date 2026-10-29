const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// In introState, we should set wipeout: true to trigger the Survey animation.
const hoverState = "setIntroState('cinematic_hover');";
code = code.replace(hoverState, hoverState + "\n        setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });");

// And for cinematic_approach
const posSet = "pos.current.set(300, 150, 200);";
code = code.replace(posSet, posSet + "\n          setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });");

// When dropping in, we must clear the wipeout state so he transitions to Jump
const dropIn = "setIntroState('falling');";
code = code.replace(dropIn, dropIn + "\n          setAnimState({ carving: 0, inAir: true, grabbing: false, wipeout: false });");

fs.writeFileSync('components/Player.js', code);
