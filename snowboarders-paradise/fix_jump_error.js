const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Remove the late destructuring
code = code.replace(/const \{ skate, brake, left, right, jump, cameraCycle, boost \} = controls\.current;\n/, '');

// Add it to the very beginning of useFrame
const useFrameStart = "useFrame((state, delta) => {\n    if (!gameStarted) return;\n    const dt = Math.min(delta, 0.05);\n    const now = Date.now();";
const newUseFrameStart = useFrameStart + "\n    const { skate, brake, left, right, jump, cameraCycle, boost } = controls.current;";

code = code.replace(useFrameStart, newUseFrameStart);

fs.writeFileSync('components/Player.js', code);
