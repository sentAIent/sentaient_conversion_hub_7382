import React, { useMemo } from 'react';
import { Sky } from '@react-three/drei';
import * as THREE from 'three';

export function SkyShader() {
  const mountainGeo = useMemo(() => new THREE.ConeGeometry(3000, 2000, 16), []);
  const mountainMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#ffffff', 
    roughness: 0.9, 
    metalness: 0.1,
    fog: true
  }), []);

  return (
    <group>
      {/* Procedural beautiful sky */}
      <Sky distance={450000} sunPosition={[0, 1, -1]} inclination={0.2} azimuth={0.25} />
      
      {/* Huge distant mountain peaks */}
      <mesh position={[-3000, -500, -8000]} geometry={mountainGeo} material={mountainMat} />
      <mesh position={[4000, -200, -10000]} geometry={mountainGeo} material={mountainMat} scale={[1.5, 1.2, 1.5]} />
      <mesh position={[0, -800, -12000]} geometry={mountainGeo} material={mountainMat} scale={[2.5, 1.5, 2]} />
      
      {/* Distant side mountains */}
      <mesh position={[-6000, -500, -2000]} geometry={mountainGeo} material={mountainMat} scale={[1.2, 0.8, 1]} />
      <mesh position={[6000, -500, -4000]} geometry={mountainGeo} material={mountainMat} scale={[1.5, 1, 1]} />
    </group>
  );
}
