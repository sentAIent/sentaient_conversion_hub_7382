const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

if (!code.includes('CarveTrail')) {
  code = code.replace(
    "import { IncredibleSnowboarder, Helicopter } from './DetailedModels';",
    "import { IncredibleSnowboarder, Helicopter } from './DetailedModels';\nimport { CarveTrail } from './CarveTrail';"
  );
  
  const carveRef = `  const carveRef = useRef(0);\n\n  useFrame((state, delta) => {`;
  code = code.replace("  useFrame((state, delta) => {", carveRef);
  
  const setCarveRef = `    carveRef.current = Math.abs(inputs.current.carve) * vel.current.length();\n    updateGamepad();`;
  code = code.replace("    updateGamepad();", setCarveRef);

  const trail = `
      {introState === 'playing' && (
        <CarveTrail playerPos={pos} carvingIntensity={carveRef} boostActive={false} />
      )}
      {(introState === 'cinematic_approach'`;
  
  code = code.replace("      {(introState === 'cinematic_approach'", trail);
  
  fs.writeFileSync('components/Player.js', code);
  console.log("Patched CarveTrail!");
}
