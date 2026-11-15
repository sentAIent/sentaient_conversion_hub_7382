import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WormholeLegal: Golden Juridical Scales & Cybernetic Legal Matrix Conduit
 * Unique high-speed transition to Legal Eagle featuring flowing golden decree veins,
 * amethyst security lattices, and rotating judicial boundary rings.
 */
const WormholeLegal = ({
  position,
  rotation = [Math.PI / 2, 0, 0],
  length = 2600,
  radius = 220,
  visible = true
}) => {
  const tunnelRef = useRef();
  const latticeRingsRef = useRef();

  // Procedural golden law matrix & amethyst decree texture
  const legalTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep amethyst judicial void
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#0b021a');
    gradient.addColorStop(0.5, '#24094a');
    gradient.addColorStop(1, '#0b021a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing Legal Eagle purple & violet decree streams
    for (let i = 0; i < 280; i++) {
      ctx.globalAlpha = Math.random() * 0.75 + 0.25;
      ctx.fillStyle = i % 3 === 0 ? '#e9d5ff' : (i % 3 === 1 ? '#c084fc' : '#a855f7');
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 3 + 1;
      const h = Math.random() * 90 + 20;
      ctx.fillRect(x, y, w, h);
    }

    // Amethyst cryptographic integrity grid lines
    ctx.strokeStyle = '#d8b4fe';
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.35;
    for (let y = 0; y < 512; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
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
    if (tunnelRef.current) {
      legalTexture.offset.y = -t * 2.8;
    }
    if (latticeRingsRef.current) {
      latticeRingsRef.current.rotation.y = t * 0.4;
      const pulse = 1.0 + Math.sin(t * 3.5) * 0.04;
      latticeRingsRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Legal Eagle Purple Conduit Tunnel */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 36, 1, true]} />
        <meshStandardMaterial
          map={legalTexture}
          emissiveMap={legalTexture}
          side={THREE.BackSide}
          roughness={0.18}
          metalness={0.88}
          emissive="#9333ea"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Rotating Legal Eagle Purple & Amethyst Boundary Rings */}
      <group ref={latticeRingsRef}>
        {[-800, -400, 0, 400, 800].map((zPos, idx) => (
          <group key={idx} position={[0, zPos, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius * 0.96, 3.2, 16, 48]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#a855f7' : '#d8b4fe'}
                emissive={idx % 2 === 0 ? '#9333ea' : '#a855f7'}
                emissiveIntensity={2.6}
                roughness={0.1}
                metalness={0.95}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export default WormholeLegal;
