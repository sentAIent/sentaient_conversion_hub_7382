const fs = require('fs');

let playerCode = fs.readFileSync('components/Player.js', 'utf8');

// 1. We need to add the imports for our detailed models
const imports = `
import { Helicopter, CameraDrone, IncredibleSnowboarder } from './DetailedModels';
`;
playerCode = playerCode.replace("import { CarveTrail } from './CarveTrail';", "import { CarveTrail } from './CarveTrail';\n" + imports);

// 2. We need to replace the entire SnowboarderAvatar with our new IncredibleSnowboarder, but wait, we already put IncredibleSnowboarder in DetailedModels.
// Let's just delete the export function SnowboarderAvatar from Player.js
playerCode = playerCode.split('export function SnowboarderAvatar')[0];

// 3. Let's find where visualRef renders and replace it.
const visualRefMatch = /<group ref=\{visualRef\} scale=\{\[4, 4, 4\]\}>([\s\S]*?)<\/group>/;

playerCode = playerCode.replace(visualRefMatch, `
      <group ref={visualRef} scale={[4, 4, 4]}>
        {introState !== 'heli' && <IncredibleSnowboarder animState={animState} colors={colors} />}
      </group>
`);

// 4. We need to add the Helicopter and Drone into the scene
const htmlMatch = /{trickMsg && \([\s\S]*?<\/div>[\s\S]*?\)}[\s\S]*?<\/div>[\s\S]*?<\/Html>/;

// Actually, let's just insert them before visualRef
playerCode = playerCode.replace("<group ref={visualRef}", `
      <Helicopter ref={heliRef} />
      <CameraDrone ref={droneRef} />
      <group ref={visualRef}
`);

// 5. Add introState to the top of Player
playerCode = playerCode.replace("const [animState", "const [introState, setIntroState] = useState('heli');\n  const heliRef = useRef();\n  const droneRef = useRef();\n  const droneOffset = useRef(new THREE.Vector3(0, 0, 0));\n  const [animState");

// 6. Rewrite useFrame to handle the Heli state
const physicsStart = `if (!gameStarted) return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now();`;

const newPhysics = `if (!gameStarted) return;
    const dt = Math.min(delta, 0.05);
    const now = Date.now();
    const { skate, brake, left, right, jump, cameraCycle, boost } = controls.current;

    // === HELICOPTER MODE ===
    if (introState === 'heli') {
      if (!heliRef.current) return;
      if (!heliRef.current.userData.vel) {
        heliRef.current.userData.vel = new THREE.Vector3(0,0,0);
        heliRef.current.position.copy(pos.current);
        heliRef.current.position.y += 30; // hovering
      }
      const hVel = heliRef.current.userData.vel;
      if (skate) hVel.z -= 100 * dt;
      if (brake) hVel.z += 100 * dt;
      if (left) hVel.x -= 100 * dt;
      if (right) hVel.x += 100 * dt;
      hVel.multiplyScalar(0.9); // friction
      heliRef.current.position.addScaledVector(hVel, dt);
      
      // Tilt heli based on velocity
      heliRef.current.rotation.z = THREE.MathUtils.lerp(heliRef.current.rotation.z, hVel.x * -0.05, 0.1);
      heliRef.current.rotation.x = THREE.MathUtils.lerp(heliRef.current.rotation.x, hVel.z * 0.05, 0.1);

      // Drone is attached to heli
      if (droneRef.current) {
        droneRef.current.position.copy(heliRef.current.position);
        droneRef.current.position.y -= 1.5;
        droneRef.current.rotation.copy(heliRef.current.rotation);
      }

      // Sync player pos to heli so they drop from it
      pos.current.copy(heliRef.current.position);
      pos.current.y -= 2;

      // Camera follows heli
      const idealOffset = heliRef.current.position.clone().add(new THREE.Vector3(0, 15, 30));
      camera.position.lerp(idealOffset, 0.05);
      camera.lookAt(heliRef.current.position);

      if (jump) {
        setIntroState('falling');
        vel.current.copy(hVel); // inherit heli velocity
      }
      return;
    }

    // === FALLING & PLAYING ===
    if (introState === 'falling') {
      // Heli flies away
      if (heliRef.current) {
        heliRef.current.position.y += 20 * dt;
        heliRef.current.position.z -= 100 * dt;
        heliRef.current.rotation.x = -0.5;
      }
      
      // We fall down to the ground
      if (pos.current.y <= getTerrainHeight(pos.current.x, pos.current.z) + 1) {
        setIntroState('playing');
        vel.current.z = -40; // explosive start
      }
    }
`;

playerCode = playerCode.replace(physicsStart, newPhysics);

// 7. Remove the old destructured controls since we moved it
playerCode = playerCode.replace("const { skate, brake, left, right, jump, cameraCycle, boost } = controls.current;", "");

// 8. Update Camera logic to be the DRONE
const oldCamera = `const idealOffset = pos.current.clone().add(new THREE.Vector3(0, camHeight, camDistance));
      camera.position.lerp(idealOffset, 0.1);`;

const newCamera = `// Drone Camera
      const targetDronePos = pos.current.clone().add(new THREE.Vector3(0, camHeight, camDistance));
      if (droneRef.current) {
         droneRef.current.position.lerp(targetDronePos, 0.1);
         // Drone looks at player
         droneRef.current.lookAt(pos.current);
         // Camera goes inside drone
         camera.position.copy(droneRef.current.position);
      } else {
         camera.position.lerp(targetDronePos, 0.1);
      }
`;
playerCode = playerCode.replace(oldCamera, newCamera);

fs.writeFileSync('components/Player.js', playerCode);
console.log("Player.js rewritten successfully.");
