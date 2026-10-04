import React, { useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

export function Terrain() {
  const geometry = useMemo(() => {
    // Drastically reduced segment count to prevent Rapier BVH lockup
    const geo = new THREE.PlaneGeometry(500, 2000, 64, 256);
    geo.rotateX(-Math.PI / 2); // Lay flat
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      let y = -z * 0.2; 
      y += noise2D(x * 0.02, z * 0.02) * 5;
      
      const dist = Math.abs(x);
      if (dist < 40) {
         y = y * (dist / 40); // Flatten the center path
      }
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh" friction={0.1} restitution={0.0}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial color="#eef5ff" roughness={0.9} metalness={0.0} />
      </mesh>
    </RigidBody>
  );
}
