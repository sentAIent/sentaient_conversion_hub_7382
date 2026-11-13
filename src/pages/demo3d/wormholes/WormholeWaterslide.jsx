import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeWaterslide = ({ position, rotation, length = 8000, visible = true }) => {
  const materialRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    if (!visible || !materialRef.current) return;
    const time = state.clock.getElapsedTime();
    // Simulate rushing water by animating the texture offset rapidly
    materialRef.current.map.offset.y = -time * 3.0;
    
    if (ringsRef.current) {
      ringsRef.current.rotation.y = time * 2.0; // Spin the rings
    }
  });

  // Create a procedural water-like texture
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Create a wavy, watery gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#001a33');
    gradient.addColorStop(0.5, '#00ccff');
    gradient.addColorStop(1, '#001a33');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Draw some rushing water "lines" or "foam"
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 200; i++) {
      ctx.globalAlpha = Math.random() * 0.5;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 5 + 1, Math.random() * 100 + 20);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 20); // More vertical repeats for the longer length
    return tex;
  }, []);

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Outer Tube */}
      <mesh>
        <cylinderGeometry args={[150, 150, length, 32, 1, true]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          color="#00ffff"
          emissive="#0088ff"
          emissiveIntensity={1.5}
          side={THREE.BackSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Inner glowing rings for speed effect */}
      <mesh ref={ringsRef}>
        <cylinderGeometry args={[140, 140, length, 16, 40, true]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default WormholeWaterslide;
