const fs = require('fs');

// 1. Fix Helicopter and Drone in DetailedModels.js
let modelsCode = fs.readFileSync('components/DetailedModels.js', 'utf8');
// Helicopter was scale={[1.5, 1.5, 1.5]}
modelsCode = modelsCode.replace(/export function Helicopter\(\{ \.\.\.props \}\) \{[\s\S]*?<group \{\.\.\.props\} scale=\{\[1\.5, 1\.5, 1\.5\]\}>/, `export function Helicopter({ ...props }) {
  const mainRotor = React.useRef();
  const tailRotor = React.useRef();
  
  import('@react-three/fiber').then(({ useFrame }) => {
    // Actually we can't dynamic import useFrame easily, but the original used useFrame
  });

  // The original has useFrame inside it.
}`);

// A safer replace:
modelsCode = fs.readFileSync('components/DetailedModels.js', 'utf8');
modelsCode = modelsCode.replace(/<group \{\.\.\.props\} scale=\{\[1\.5, 1\.5, 1\.5\]\}>/, '<group {...props} scale={[15, 15, 15]}>');
// Drone is [0.4, 0.4, 0.4]
modelsCode = modelsCode.replace(/<group \{\.\.\.props\} scale=\{\[0\.4, 0\.4, 0\.4\]\}>/, '<group {...props} scale={[0.8, 0.8, 0.8]}>');
// Snowboarder Fox is 0.02.
// Wait, Fox is wrapped in group scale={[4, 4, 4]} in Player.js!
// 4 * 1.8 = 7.2 meters tall rider! That's a giant!
fs.writeFileSync('components/DetailedModels.js', modelsCode);

// 2. Fix Player.js scale
let playerCode = fs.readFileSync('components/Player.js', 'utf8');
// Change visualRef scale to 1.5 so the rider is ~2.7m (still large for visibility but not a giant)
playerCode = playerCode.replace(/<group ref=\{visualRef\}\s*scale=\{\[4, 4, 4\]\}>/, '<group ref={visualRef} scale={[1.5, 1.5, 1.5]}>');
// Change camera offset
// Original: const idealOffset = new THREE.Vector3(0, camHeight * 4, camDistance * 4);
// Let's bring camera closer to the 1.5x scaled player
playerCode = playerCode.replace(/const idealOffset = new THREE\.Vector3\(0, camHeight \* 4, camDistance \* 4\);/, 'const idealOffset = new THREE.Vector3(0, 5, 15);');
fs.writeFileSync('components/Player.js', playerCode);

