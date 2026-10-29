const fs = require('fs');

let playerCode = fs.readFileSync('components/Player.js', 'utf8');

const useControlsStart = `function useControls() {
  const keys = useRef({ 
    skate: false, brake: false, left: false, right: false, 
    jump: false, cameraCycle: false, grab: false 
  });`;

const useControlsReplacement = `function useControls() {
  const keys = useRef({ 
    skate: false, brake: false, left: false, right: false, 
    jump: false, cameraCycle: false, grab: false,
    grab1: false, grab2: false, grab3: false
  });`;

playerCode = playerCode.replace(useControlsStart, useControlsReplacement);

const handleKeyDownStart = `        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = true; break;`;
const handleKeyDownReplacement = `        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = true; break;
        case 'Digit1': keys.current.grab1 = true; break;
        case 'Digit2': keys.current.grab2 = true; break;
        case 'Digit3': keys.current.grab3 = true; break;`;
playerCode = playerCode.replace(handleKeyDownStart, handleKeyDownReplacement);

const handleKeyUpStart = `        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = false; break;`;
const handleKeyUpReplacement = `        case 'ShiftLeft': case 'ShiftRight': keys.current.grab = false; break;
        case 'Digit1': keys.current.grab1 = false; break;
        case 'Digit2': keys.current.grab2 = false; break;
        case 'Digit3': keys.current.grab3 = false; break;`;
playerCode = playerCode.replace(handleKeyUpStart, handleKeyUpReplacement);

fs.writeFileSync('components/Player.js', playerCode);
console.log("Trick keys added!");
