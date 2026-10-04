import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

export function Player() {
  const bodyRef = useRef();
  const modelRef = useRef();
  
  // Safe load the model
  const { scene, animations } = useGLTF('/models/snowboarder.glb');
  const { actions } = useAnimations(animations, modelRef);
  
  const [, getKeys] = useKeyboardControls();
  
  // Reusable vectors to prevent GC pressure
  const idealCamPos = useMemo(() => new THREE.Vector3(), []);
  const lookAtPos = useMemo(() => new THREE.Vector3(), []);
  const currentCamPos = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const firstAction = actions[actionNames[0]];
      if(firstAction) firstAction.play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (!bodyRef.current) return;
    
    const linVel = bodyRef.current.linvel();
    const pos = bodyRef.current.translation();
    
    const { left, right, forward, backward } = getKeys();
    
    // Steering force
    let steerX = 0;
    if (left) steerX -= 100 * delta;
    if (right) steerX += 100 * delta;
    
    // Braking
    let brakeZ = 0;
    if (backward) brakeZ = 20 * delta;
    
    if (steerX !== 0 || brakeZ !== 0) {
       bodyRef.current.applyImpulse({ x: steerX, y: 0, z: brakeZ }, true);
    }
    
    // Smooth camera follow without creating new objects
    idealCamPos.set(pos.x, pos.y + 3, pos.z + 8);
    lookAtPos.set(pos.x, pos.y, pos.z - 5);
    
    state.camera.position.lerp(idealCamPos, delta * 3);
    state.camera.lookAt(lookAtPos);
    
    // Prevent falling off the world forever
    if (pos.y < -200) {
       bodyRef.current.setTranslation({ x: 0, y: 10, z: 0 }, true);
       bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody ref={bodyRef} colliders="hull" position={[0, 10, 0]} mass={70} friction={0.01} restitution={0.0} enabledRotations={[false, true, false]}>
      <group ref={modelRef}>
        <primitive object={scene} scale={0.5} position={[0, -1, 0]} />
      </group>
    </RigidBody>
  );
}
