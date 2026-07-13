import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DigitalHuman = ({ position, rotation, isParty, timeOffset = 0 }) => {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const headRef = useRef();
  const spineRef = useRef();
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: isParty ? '#ff3366' : '#1a5f7a',
    emissive: isParty ? '#ff3366' : '#1a5f7a',
    emissiveIntensity: isParty ? 0.8 : 0.2,
    roughness: 0.2,
    metalness: 0.8
  }), [isParty]);

  const phoneMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffff'
  }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime + timeOffset;
    
    if (isParty) {
      // Party Animation: Jumping, waving arms
      const jump = Math.max(0, Math.sin(t * 5));
      if (groupRef.current) {
        groupRef.current.position.y = jump * 1.5;
        groupRef.current.rotation.y = Math.sin(t * 2) * 0.2;
      }
      if (spineRef.current) spineRef.current.rotation.x = 0; // stand straight
      if (headRef.current) headRef.current.rotation.x = Math.sin(t * 4) * 0.2; // bob head
      if (leftArmRef.current) leftArmRef.current.rotation.z = Math.PI - 0.5 + Math.sin(t * 6) * 0.5; // arms up
      if (rightArmRef.current) rightArmRef.current.rotation.z = -Math.PI + 0.5 - Math.sin(t * 6) * 0.5;
    } else {
      // Cave Animation: Slouched, looking at phone, minimal movement
      const breathe = Math.sin(t * 2) * 0.05;
      if (groupRef.current) {
        groupRef.current.position.y = 0;
        groupRef.current.rotation.y = 0;
      }
      if (spineRef.current) spineRef.current.rotation.x = 0.3; // slouched forward
      if (headRef.current) headRef.current.rotation.x = 0.5 + breathe; // looking down at phone
      // Arms bent holding phone
      if (leftArmRef.current) {
          leftArmRef.current.rotation.z = 0.5;
          leftArmRef.current.rotation.x = -1.0;
      }
      if (rightArmRef.current) {
          rightArmRef.current.rotation.z = -0.5;
          rightArmRef.current.rotation.x = -1.0;
      }
    }
  });

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      {/* Spine / Torso */}
      <group position={[0, 2.5, 0]} ref={spineRef}>
        <mesh position={[0, 0, 0]} material={material}>
          <boxGeometry args={[1.2, 2.0, 0.8]} />
        </mesh>
        
        {/* Head */}
        <group position={[0, 1.5, 0]} ref={headRef}>
          <mesh material={material}>
            <sphereGeometry args={[0.6, 16, 16]} />
          </mesh>
          {/* Phone glowing screen (only visible in cave phase) */}
          {!isParty && (
            <group position={[0, -0.5, 1.0]}>
              <mesh material={phoneMaterial}>
                <boxGeometry args={[0.4, 0.8, 0.05]} />
              </mesh>
              <pointLight color="#00ffff" intensity={0.5} distance={3} position={[0, 0, 0.1]} />
            </group>
          )}
        </group>
        
        {/* Left Arm */}
        <group position={[0.8, 0.8, 0]} ref={leftArmRef}>
          <mesh position={[0, -1.0, 0]} material={material}>
            <cylinderGeometry args={[0.2, 0.2, 2.0]} />
          </mesh>
        </group>
        
        {/* Right Arm */}
        <group position={[-0.8, 0.8, 0]} ref={rightArmRef}>
          <mesh position={[0, -1.0, 0]} material={material}>
            <cylinderGeometry args={[0.2, 0.2, 2.0]} />
          </mesh>
        </group>
      </group>
      
      {/* Legs (Static for simplicity, jumping handles vertical movement) */}
      <mesh position={[0.4, 1.0, 0]} material={material}>
        <cylinderGeometry args={[0.25, 0.2, 2.0]} />
      </mesh>
      <mesh position={[-0.4, 1.0, 0]} material={material}>
        <cylinderGeometry args={[0.25, 0.2, 2.0]} />
      </mesh>
    </group>
  );
};

export default DigitalHuman;
