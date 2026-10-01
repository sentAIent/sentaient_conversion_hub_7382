import React from 'react';
import { Canvas } from '@react-three/fiber';
import WorldContango from './demo3d/worlds/ContangoOld';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ContangoOldPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, -950], fov: 60, near: 0.1, far: 10000 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#000']} />
        
        {/* Render the old world at origin */}
        <React.Suspense fallback={null}>
          <WorldContango position={[0, 0, 0]} rotation={[0, 0, 0]} visible={true} />
        </React.Suspense>
        
        {/* Basic controls to look around the rollercoaster */}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} target={[0, 0, -1000]} />
      </Canvas>
      <div style={{ position: 'absolute', top: 20, left: 20, color: '#00ff00', fontFamily: 'monospace', zIndex: 10 }}>
        <h2>Old Contango Quant (Rollercoaster)</h2>
        <p>Use mouse to rotate and zoom.</p>
        <a href="/landing3d" style={{ color: '#00ffff', textDecoration: 'underline' }}>Back to Main 3D Demo</a>
      </div>
    </div>
  );
};

export default ContangoOldPage;
