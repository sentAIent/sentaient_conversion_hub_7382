const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

const torsoStart = `{/* Torso */}`;
const withBoard = `<mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color={colors?.snowboard || "#111"} metalness={0.9} roughness={0.1} emissive={colors?.snowboard || "#00d0ff"} emissiveIntensity={0.8} {...tProps} />
      </mesh>\n      {/* Torso */}`;
      
code = code.replace(torsoStart, withBoard);
fs.writeFileSync('components/DetailedModels.js', code);
