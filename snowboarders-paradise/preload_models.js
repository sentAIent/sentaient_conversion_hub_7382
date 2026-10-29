const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

code += "\nuseGLTF.preload('/models/BusterDrone.glb');\nuseGLTF.preload('/models/RobotExpressive.glb');\n";

fs.writeFileSync('components/DetailedModels.js', code);
