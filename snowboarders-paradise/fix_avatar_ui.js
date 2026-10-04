const fs = require('fs');

// 1. Restore the 3D Avatar in Player.js
let playerCode = fs.readFileSync('components/Player.js', 'utf8');

const avatarStart = playerCode.indexOf('export function SnowboarderAvatar');
if (avatarStart !== -1) {
    const avatarCode = `export function SnowboarderAvatar({ animState, colors = {}, ghost }) {
  const { carving, inAir, grabbing, wipeout } = animState || { carving: 0, inAir: false, grabbing: false, wipeout: false };
  const group = React.useRef();
  const { scene, animations } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb");
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  React.useEffect(() => {
    let actionName = 'Idle';
    if (wipeout) {
      // no wipeout animation, just idle and we will rotate the group
      actionName = 'Idle';
    } else if (inAir) {
      actionName = 'Run'; // 'Jump' isn't in Soldier usually, so we use Run or Idle
    } else if (Math.abs(carving) > 0) {
      actionName = 'Run';
    }

    let activeAction = actions[actionName] || actions['Idle'];
    if (activeAction) {
      activeAction.reset().fadeIn(0.2).play();
    }
    
    return () => {
      if (activeAction) activeAction.fadeOut(0.2);
    };
  }, [inAir, carving, wipeout, actions]);

  const bodyLeanZ = carving === -1 ? -0.3 : (carving === 1 ? 0.3 : 0);
  const bodyLeanX = inAir ? (grabbing ? 0.6 : 0) : 0;

  if (wipeout) {
    return (
      <group position={[0, -0.4, 0]}>
        <group ref={group} position={[0, 0, 0]} rotation={[1.5, 0, Math.random()]}>
          <primitive object={scene} scale={[0.8, 0.8, 0.8]} />
        </group>
      </group>
    );
  }

  return (
    <group position={[0, -0.4, 0]}>
      <group ref={group} position={[0, 0, 0]} rotation={[bodyLeanX, 1.57, bodyLeanZ]}>
        <primitive object={scene} scale={[0.8, 0.8, 0.8]} />
      </group>
    </group>
  );
}

useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb");
`;
    playerCode = playerCode.substring(0, avatarStart) + avatarCode;
}

// Add useGLTF and useAnimations if missing
if (!playerCode.includes('useGLTF')) {
    playerCode = playerCode.replace("import { Html } from '@react-three/drei';", "import { Html, useGLTF, useAnimations } from '@react-three/drei';");
}
// Ensure React is imported
if (!playerCode.includes('import React')) {
    playerCode = "import React from 'react';\n" + playerCode;
}

fs.writeFileSync('components/Player.js', playerCode);

// 2. Remove the ugly frosted glass overlay from App.js
let appCode = fs.readFileSync('App.js', 'utf8');

// The overlay is `<View style={styles.glassCard}>`
appCode = appCode.replace(/backgroundColor: 'rgba\(10, 15, 25, 0\.4\)',\s*backdropFilter: 'blur\(30px\)',\s*WebkitBackdropFilter: 'blur\(30px\)',/g, 
  "backgroundColor: 'rgba(0, 0, 0, 0)', /* removed frosted glass */");
  
appCode = appCode.replace(/borderWidth: 1,/g, "borderWidth: 0,");
appCode = appCode.replace(/borderColor: 'rgba\(255, 255, 255, 0\.1\)',/g, "borderColor: 'transparent',");
appCode = appCode.replace(/shadowOpacity: 0\.8,/g, "shadowOpacity: 0,");

fs.writeFileSync('App.js', appCode);
console.log("Avatar and UI Fixed.");
