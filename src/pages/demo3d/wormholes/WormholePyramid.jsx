import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholePyramid = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 230, visible = true }) => {
  const conduitRef = useRef();
  const latticeRef = useRef();

  // Procedural autonomous strategic neural grid texture
  const strategyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Obsidian purple gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0d021c');
    gradient.addColorStop(0.5, '#1d0638');
    gradient.addColorStop(1, '#0d021c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Golden & violet strategic decision vectors
    ctx.fillStyle = '#c084fc';
    for (let i = 0; i < 200; i++) {
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillRect(x, y, Math.random() * 4 + 2, Math.random() * 90 + 30);
    }

    // Opportunity target markers (gold crosshairs)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 40; i++) {
      ctx.globalAlpha = 0.6;
      const cx = Math.random() * 512;
      const cy = Math.random() * 512;
      ctx.strokeRect(cx - 5, cy - 5, 10, 10);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 16);
    return tex;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (conduitRef.current) {
      strategyTexture.offset.y = -t * 3.0;
    }
    if (latticeRef.current) {
      latticeRef.current.rotation.z = t * 0.45;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Octagonal Strategic Conduit Tube */}
      <mesh ref={conduitRef}>
        <cylinderGeometry args={[radius, radius, length, 8, 1, true]} />
        <meshStandardMaterial
          map={strategyTexture}
          color="#aa33ff"
          emissive="#551188"
          emissiveIntensity={2.0}
          side={THREE.BackSide}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Autonomous Neural Lattice */}
      <mesh ref={latticeRef}>
        <cylinderGeometry args={[radius - 14, radius - 14, length, 8, 32, true]} />
        <meshBasicMaterial
          color="#e879f9"
          wireframe
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default WormholePyramid;
