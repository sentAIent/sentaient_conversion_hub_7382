const fs = require('fs');
let code = fs.readFileSync('components/DetailedModels.js', 'utf8');

code = `import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

` + code;

const droneReplace = `export function CameraDrone({ ...props }) {
  const { scene, animations } = useGLTF('/models/BusterDrone.glb');
  const { actions } = useAnimations(animations, scene);
  
  React.useEffect(() => {
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  return (
    <group {...props} scale={[0.5, 0.5, 0.5]}>
      <primitive object={scene} />
    </group>
  );
}`;

const snowboarderReplace = `export function IncredibleSnowboarder({ animState, colors, ghost }) {
  const { scene, animations } = useGLTF('/models/RobotExpressive.glb');
  const { actions } = useAnimations(animations, scene);
  
  const { carving, inAir, grabbing, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };

  React.useEffect(() => {
    if (!actions) return;
    
    // Stop all
    Object.values(actions).forEach(action => action.stop());
    
    if (wipeout) {
      if (actions['Death']) actions['Death'].play();
    } else if (inAir) {
      if (actions['Jump']) actions['Jump'].play();
    } else {
      if (actions['Running']) actions['Running'].play();
    }
  }, [wipeout, inAir, carving, actions]);

  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;

  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color={colors?.snowboard || "#00d0ff"} metalness={0.8} emissive={colors?.snowboard || "#00d0ff"} emissiveIntensity={0.5} transparent={ghost} opacity={ghost ? 0.3 : 1} />
      </mesh>
      
      <group position={[0, 0.1, 0]} rotation={[bodyLeanX, Math.PI/2, bodyLeanZ]} scale={[0.3, 0.3, 0.3]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}`;

// I will overwrite the CameraDrone and IncredibleSnowboarder logic.
code = code.replace(/export function CameraDrone[\s\S]*?export function IncredibleSnowboarder/, droneReplace + "\n\nexport function IncredibleSnowboarder");
code = code.replace(/export function IncredibleSnowboarder[\s\S]*?\n\}/, snowboarderReplace);

fs.writeFileSync('components/DetailedModels.js', code);
