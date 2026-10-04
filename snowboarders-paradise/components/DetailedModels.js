import React, { useMemo, Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

export const Helicopter = React.forwardRef(({ introState }, ref) => {
  const rotorRef = useRef();
  const tailRotorRef = useRef();

  useFrame((state, delta) => {
    if (rotorRef.current) rotorRef.current.rotation.y += delta * 20;
    if (tailRotorRef.current) tailRotorRef.current.rotation.x += delta * 20;
  });

  return (
    <group ref={ref}>
      {/* Main Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[1.5, 4, 4, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Cockpit Glass */}
      <mesh position={[0, 0.5, 2.2]} castShadow>
        <sphereGeometry args={[1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0} transparent opacity={0.8} />
      </mesh>
      {/* Tail Boom */}
      <mesh position={[0, 0.8, -3.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Skids */}
      <mesh position={[-1.2, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
        <meshStandardMaterial color="#333" metalness={0.5} />
      </mesh>
      <mesh position={[1.2, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
        <meshStandardMaterial color="#333" metalness={0.5} />
      </mesh>
      
      {/* Main Rotor */}
      <group position={[0, 2.2, 0]} ref={rotorRef}>
        <mesh castShadow>
          <boxGeometry args={[12, 0.05, 0.4]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[12, 0.05, 0.4]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>

      {/* Tail Rotor */}
      <group position={[0.4, 1.2, -5.2]} ref={tailRotorRef}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 2, 0.2]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </group>
  );
});

export function CameraDrone() {
  return null;
}

export const IncredibleSnowboarder = React.forwardRef(({ animState, colors, ghost }, ref) => {
  const { carving = 0, inAir = false, grabbing = false, wipeout = false } = animState || {};
  
  const boardGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.8);
    shape.quadraticCurveTo(0.15, 0.8, 0.15, 0.5);
    shape.lineTo(0.12, -0.5);
    shape.quadraticCurveTo(0.15, -0.8, 0, -0.8);
    shape.quadraticCurveTo(-0.15, -0.8, -0.12, -0.5);
    shape.lineTo(-0.15, 0.5);
    shape.quadraticCurveTo(-0.15, 0.8, 0, 0.8);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 3 });
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 0.015, 0);
    return geo;
  }, []);

  const boardRot = wipeout ? [0, 0, Math.PI/2] : (inAir ? [0.2, 0, carving * 0.5] : [0, 0, -carving * 0.85]);
  const kneeBend = inAir ? (grabbing ? 1.0 : 0.2) : 0.5 + Math.abs(carving) * 0.5;
  const bodyLean = wipeout ? [Math.PI/2, 0, 0] : [0.3 + kneeBend * 0.3, carving * 0.8, -carving * 0.5];

  return (
    <group rotation={boardRot}>
      {/* Board */}
      <mesh geometry={boardGeo} position={[0, 0.05, 0]} castShadow>
         <meshStandardMaterial color={colors?.board || '#ff3366'} roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Body */}
      <group position={[0, 0.1 - kneeBend * 0.1, 0]} rotation={bodyLean}>
         <Suspense fallback={<mesh><boxGeometry args={[0.5, 1.5, 0.5]} /><meshStandardMaterial color="red"/></mesh>}>
            <SnowboarderModel />
         </Suspense>
      </group>
    </group>
  );
});

function SnowboarderModel() {
  const { scene, animations } = useGLTF('/models/snowboarder.glb');
  const { actions } = useAnimations(animations, scene);
  
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const actionName = Object.keys(actions)[0];
      if (actions[actionName]) actions[actionName].play();
    }
  }, [actions]);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} position={[0, -0.9, 0]} rotation={[0, Math.PI / 2, 0]} />;
}

useGLTF.preload('/models/snowboarder.glb');
