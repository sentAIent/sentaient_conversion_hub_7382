import React, { useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// Seeded for determinism so terrain and raycast match
function seededRandom() {
  let seed = 12345;
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}
const noise2D = createNoise2D(seededRandom());

export function getTerrainHeight(x, z) {
  // Steeper downhill slope
  let slope = z * 0.6; 
  
  // Carve out a massive "canyon / halfpipe" in the center (U-shape)
  const dist = Math.abs(x);
  const canyonWall = Math.pow(dist / 100, 4) * 15; // Flat in middle, steep at edges
  
  // Fractal Brownian Motion (fBm) for realistic alpine terrain
  let e = 1.00 * noise2D(x * 0.001, z * 0.001)
        + 0.50 * noise2D(x * 0.002, z * 0.002)
        + 0.25 * noise2D(x * 0.004, z * 0.004)
        + 0.13 * noise2D(x * 0.008, z * 0.008)
        + 0.06 * noise2D(x * 0.016, z * 0.016);
  
  // Exponentiate the noise to create sharp alpine peaks and wide, flat valleys
  let macro = Math.pow(Math.abs(e), 1.2) * Math.sign(e) * 120;
  
  // Sharp cliffs / ledges (optional, but keep them subtle)
  let cliffNoise = noise2D(x * 0.006, z * 0.006);
  let t = (cliffNoise * 3) % 1.0;
  if (t < 0) t += 1.0;
  let step = Math.floor(cliffNoise * 3);
  let smoothed = step + (t * t * (3 - 2 * t)); 
  let ledges = smoothed * 15; // Reduced cliff size so they look like natural rock shelves

  // Micro-details (snow drifts and small kickers)
  let kickers = Math.abs(noise2D(x * 0.04, z * 0.04)) * 5;
  
  return slope + canyonWall + macro + ledges + kickers;
}

export function getTerrainNormal(x, z) {
  // Approximate normal by sampling neighbors
  const eps = 0.5;
  const hL = getTerrainHeight(x - eps, z);
  const hR = getTerrainHeight(x + eps, z);
  const hD = getTerrainHeight(x, z - eps);
  const hU = getTerrainHeight(x, z + eps);
  
  const normal = new THREE.Vector3(hL - hR, 2 * eps, hU - hD).normalize();
  return normal;
}

export function Terrain() {
  const geometry = useMemo(() => {
    // Drastically reduced segment count to prevent Rapier BVH lockup
    const geo = new THREE.PlaneGeometry(500, 2000, 64, 256);
    geo.rotateX(-Math.PI / 2); // Lay flat
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      const y = getTerrainHeight(x, z);
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh" friction={0.1} restitution={0.0}>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.65} 
          metalness={0.05} 
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
    </RigidBody>
  );
}
