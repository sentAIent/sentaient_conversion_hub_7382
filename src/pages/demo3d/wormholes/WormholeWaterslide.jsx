import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeWaterslide = ({ position, rotation, length = 7800, visible = true }) => {
  const materialRef = useRef();
  const ringsRef = useRef();

  useFrame((state) => {
    if (!visible || !materialRef.current) return;
    const time = state.clock.getElapsedTime();
    // Simulate rushing water by animating the texture offset smoothly at half speed
    materialRef.current.map.offset.y = -time * 1.5;
    
    if (ringsRef.current) {
      ringsRef.current.rotation.y = time * 1.0; // Spin the rings
    }
  });

  // Create a vibrant, high-contrast procedural water-vortex texture
  const texture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich aquatic cyan-emerald gradient (no dark black bands)
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#04385c');
    gradient.addColorStop(0.35, '#00a8e8');
    gradient.addColorStop(0.5, '#00ffaa');
    gradient.addColorStop(0.65, '#00a8e8');
    gradient.addColorStop(1, '#04385c');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Bright rushing water & foam streaks
    for (let i = 0; i < 280; i++) {
      ctx.globalAlpha = Math.random() * 0.55 + 0.25;
      ctx.fillStyle = i % 3 === 0 ? '#a7f3d0' : (i % 3 === 1 ? '#67e8f9' : '#ffffff');
      ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 5 + 1.5, Math.random() * 110 + 30);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 22);
    return tex;
  }, []);

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Flared Entry Mouth aligned with tunnel axis */}
      <mesh position={[0, length / 2 - 150, 0]}>
        <cylinderGeometry args={[280, 190, 360, 32, 8, true]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          color="#00ffff"
          emissive="#38bdf8"
          emissiveIntensity={1.6}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>

      {/* Main Waterslide Plunge Tube */}
      <mesh>
        <cylinderGeometry args={[190, 190, length, 32, 1, true]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          emissiveMap={texture}
          color="#00ffff"
          emissive="#38bdf8"
          emissiveIntensity={1.7}
          side={THREE.DoubleSide}
          transparent
          opacity={0.96}
          depthWrite={false}
        />
      </mesh>

      {/* Inner glowing vortex rings along the full plunge */}
      <group ref={ringsRef}>
        {[-0.44, -0.36, -0.28, -0.20, -0.12, -0.04, 0.04, 0.12, 0.20, 0.28, 0.36, 0.44].map((frac, idx) => (
          <mesh key={idx} position={[0, length * frac, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[178, 4.2, 16, 64]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? '#00ffff' : '#00ff88'}
              emissive={idx % 2 === 0 ? '#00d2ff' : '#10b981'}
              emissiveIntensity={2.8}
              roughness={0.08}
              metalness={0.92}
            />
          </mesh>
        ))}
      </group>

      {/* Flared Exit into FantasyQuant Stadium */}
      <mesh position={[0, -length / 2 + 150, 0]}>
        <cylinderGeometry args={[190, 270, 380, 32, 8, true]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          color="#00ffff"
          emissive="#00e676"
          emissiveIntensity={1.8}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default WormholeWaterslide;
