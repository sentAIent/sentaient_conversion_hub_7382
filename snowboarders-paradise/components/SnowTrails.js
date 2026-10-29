import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getTerrainNormal } from '../utils/terrainUtils';

const MAX_TRAIL_MARKS = 500;

export function SnowTrails({ playerPosRef, isLandedRef, carvingAmountRef, speedRef }) {
  const meshRef = useRef();
  const dummy = useRef(new THREE.Object3D());
  const currentIndex = useRef(0);
  const lastMarkTime = useRef(0);

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < MAX_TRAIL_MARKS; i++) {
        dummy.current.position.set(0, -1000, 0); // Hide initially
        dummy.current.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.current.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (!isLandedRef.current || speedRef.current < 2) return;

    const time = state.clock.getElapsedTime();
    if (time - lastMarkTime.current > 0.05) {
      const pos = playerPosRef.current;
      
      const i = currentIndex.current;
      dummy.current.position.set(pos.x, pos.y + 0.05, pos.z);
      
      const normal = getTerrainNormal(pos.x, pos.z);
      const normalVec = new THREE.Vector3(normal.x, normal.y, normal.z);
      dummy.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normalVec);
      
      const carveFactor = Math.abs(carvingAmountRef.current);
      const scale = 0.8 + carveFactor * 0.5;
      dummy.current.scale.set(scale, scale, 1);
      
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.current.matrix);
      meshRef.current.instanceMatrix.needsUpdate = true;
      
      currentIndex.current = (i + 1) % MAX_TRAIL_MARKS;
      lastMarkTime.current = time;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, MAX_TRAIL_MARKS]} receiveShadow>
      <circleGeometry args={[0.5, 8]} />
      <meshBasicMaterial color="#dcf2ff" transparent opacity={0.15} depthWrite={false} />
    </instancedMesh>
  );
}
