import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SnowboarderAvatar } from './Player';
import { getTerrainHeight } from '../utils/terrainUtils';

export function RemotePlayer({ data }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // LERP network position
    const px = data.pos ? data.pos.x : data.x;
    const py = data.pos ? data.pos.y : data.y;
    const pz = data.pos ? data.pos.z : data.z;
    const targetPos = new THREE.Vector3(px, py, pz);
    groupRef.current.position.lerp(targetPos, 0.2);

    // LERP network rotation
    const rot = data.boardRotation !== undefined ? data.boardRotation : data.rotation;
    const targetRot = new THREE.Euler(0, rot, 0);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
    groupRef.current.quaternion.slerp(targetQuat, 0.2);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>
      <group position={[0, 0.6, 0]}>
        <SnowboarderAvatar animState={data.animState} goggleColor="#ff00ff" ghost={true} />
      </group>
    </group>
  );
}
