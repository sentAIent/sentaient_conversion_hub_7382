import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeElevate = ({ position, rotation = [Math.PI / 2, 0, 0], length = 2400, radius = 250, visible = true }) => {
  const tunnelRef = useRef();
  const contourRingsRef = useRef();
  const snowFlurryRef = useRef();
  const snowPointsRef = useRef();

  // Procedural bright white snow & ice-cave wall texture
  const iceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#dbeafe');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, '#cde7ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Crisp glacial ice-cave facets & frost veins so wall motion reads clearly
    for (let i = 0; i < 180; i++) {
      ctx.globalAlpha = Math.random() * 0.35 + 0.2;
      ctx.fillStyle = i % 3 === 0 ? '#7dd3fc' : (i % 3 === 1 ? '#93c5fd' : '#bae6fd');
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 28 + 10;
      const h = Math.random() * 75 + 25;
      ctx.fillRect(x, y, w, h);
    }

    // Bright pure-white snow & blizzard streaks
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 340; i++) {
      ctx.globalAlpha = Math.random() * 0.55 + 0.45;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 4 + 1.5;
      const h = Math.random() * 90 + 30;
      ctx.fillRect(x, y, w, h);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 16);
    return tex;
  }, []);

  // Swirling 3D snow particles filling the ice cave
  const snowPositions = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * (radius * 0.88);
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * length;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, [radius, length]);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (tunnelRef.current) {
      iceTexture.offset.y = -t * 2.4;
    }
    if (contourRingsRef.current) {
      contourRingsRef.current.rotation.y = t * 0.22;
    }
    if (snowFlurryRef.current) {
      snowFlurryRef.current.rotation.y = -t * 0.45;
    }
    if (snowPointsRef.current) {
      snowPointsRef.current.rotation.y = t * 0.35;
      // Continuous snow stream rushing past camera along the cave axis
      snowPointsRef.current.position.y = -((t * 360) % 400) + 200;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Bright White Snow-Packed Ice Cave Wall */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={iceTexture}
          color="#ffffff"
          emissive="#e0f2fe"
          emissiveIntensity={0.85}
          side={THREE.BackSide}
          transparent
          opacity={0.96}
          depthWrite={false}
        />
      </mesh>

      {/* Frosted Ice Cave Ridges */}
      <mesh ref={contourRingsRef}>
        <cylinderGeometry args={[radius - 10, radius - 10, length, 16, 32, true]} />
        <meshBasicMaterial
          color="#e0f2fe"
          wireframe
          transparent
          opacity={0.28}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Snow Drift Ribs */}
      <mesh ref={snowFlurryRef}>
        <cylinderGeometry args={[radius - 25, radius - 25, length, 8, 16, true]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.22}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dense Swirling Snowflakes Inside the Ice Cave */}
      <points ref={snowPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={snowPositions.length / 3}
            array={snowPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={7.5}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default WormholeElevate;
