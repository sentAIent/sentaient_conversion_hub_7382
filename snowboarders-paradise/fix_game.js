const fs = require('fs');

const app = `
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, FogExp2 } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { TrackManager } from './components/TrackManager';
import { Player } from './components/Player';
import { CustomizationProvider } from './components/CustomizationContext';

export default function App() {
  return (
    <CustomizationProvider>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <color attach="background" args={['#d0e3ff']} />
        <FogExp2 attach="fog" args={['#d0e3ff', 0.002]} />
        {/* Golden Hour Lighting */}
        <Sky sunPosition={[100, 5, -100]} turbidity={0.3} rayleigh={1.2} mieCoefficient={0.005} mieDirectionalG={0.7} />
        <ambientLight intensity={0.2} color="#88aaff" />
        <directionalLight 
          position={[100, 20, -100]} 
          intensity={3.0} 
          color="#ffccaa"
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
          shadow-camera-near={0.1}
          shadow-camera-far={500}
        />
        <Suspense fallback={null}>
          <TrackManager />
          <Player />
        </Suspense>
        <EffectComposer>
          <Bloom luminanceThreshold={1.0} intensity={0.8} />
          <ToneMapping exposure={1.2} />
          <Vignette offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </CustomizationProvider>
  );
}
`;
fs.writeFileSync('App.js', app);

const track = `
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Simple deterministic noise
function hash(n) { return Math.sin(n) * 43758.5453123; }
function noise(x, z) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const h00 = hash(ix + iz * 57), h10 = hash(ix + 1 + iz * 57);
  const h01 = hash(ix + (iz + 1) * 57), h11 = hash(ix + 1 + (iz + 1) * 57);
  const tx = fx * fx * (3 - 2 * fx), tz = fz * fz * (3 - 2 * fz);
  return h00 * (1 - tx) * (1 - tz) + h10 * tx * (1 - tz) + h01 * (1 - tx) * tz + h11 * tx * tz;
}

export function getTerrainHeight(x, z) {
  let y = -z * 0.15; // Smooth 15% slope
  
  // Rolling hills
  y += Math.sin(x * 0.05) * Math.cos(z * 0.05) * 8;
  
  // Micro bumps
  y += noise(x * 0.2, z * 0.2) * 1.5;
  
  // Central smooth path (Snowpark line)
  const distFromCenter = Math.abs(x);
  if (distFromCenter < 15) {
    y = y * 0.8; // flatten out the center park line
    
    // Add kickers every 100m
    const modZ = Math.abs(z % 100);
    if (modZ > 80 && modZ < 95) {
       const kickerProgress = (modZ - 80) / 15;
       y += Math.sin(kickerProgress * Math.PI) * 5; // 5m tall kicker
    }
  }

  if (Math.sqrt(x*x + z*z) < 20) y = 0; // Flat start

  return y;
}

export function TrackManager() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(200, 2000, 100, 1000);
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, -900); // Start at 100, go to -1900
    
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, getTerrainHeight(pos.getX(i), pos.getZ(i)));
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      <mesh geometry={geo} receiveShadow castShadow>
        <meshStandardMaterial color="#f2f8ff" roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  );
}
`;
fs.writeFileSync('components/TrackManager.js', track);

console.log("Rewrote files!");
