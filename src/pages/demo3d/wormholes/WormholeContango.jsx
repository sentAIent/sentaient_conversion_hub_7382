import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeContango = ({ position, rotation = [0, 0, 0], length = 6000, radius = 250, visible }) => {
  const tunnelRef = useRef();
  const ringsRef = useRef();

  // Procedural high-frequency quant order-book & liquidity stream texture
  const quantTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#02120a');
    gradient.addColorStop(0.5, '#072a18');
    gradient.addColorStop(1, '#02120a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // High-frequency liquidity & bull/bear order streams
    for (let i = 0; i < 300; i++) {
      ctx.globalAlpha = Math.random() * 0.75 + 0.25;
      ctx.fillStyle = i % 5 === 0 ? '#ffd700' : (i % 7 === 0 ? '#ff7a00' : '#22c55e');
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillRect(x, y, Math.random() * 3.5 + 1.5, Math.random() * 95 + 25);
    }

    // Precision quant price-level grid lines
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.35;
    for (let y = 0; y < 512; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, Math.max(20, Math.round(length / 280)));
    return tex;
  }, [length]);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;
    if (tunnelRef.current) {
      quantTexture.offset.y = -t * 2.8;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = -t * 0.35;
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.03;
      ringsRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* High-Frequency Quant Liquidity Conduit */}
      <mesh ref={tunnelRef} position={[0, 0, -length / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, length, 36, 1, true]} />
        <meshStandardMaterial
          map={quantTexture}
          emissiveMap={quantTexture}
          emissive="#10b981"
          emissiveIntensity={1.8}
          roughness={0.14}
          metalness={0.88}
          side={THREE.BackSide}
          transparent
          opacity={0.94}
          depthWrite={false}
        />
      </mesh>

      {/* Glowing Emerald & Gold Contango Vortex Rings */}
      <group ref={ringsRef}>
        {Array.from({ length: 28 }, (_, idx) => 0.03 + (idx / 27) * 0.94).map((frac, idx) => (
          <mesh key={idx} position={[0, 0, -length * frac]}>
            <torusGeometry args={[radius * 0.94, 3.8, 16, 64]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? '#ffd700' : (idx % 3 === 1 ? '#22c55e' : '#ff7a00')}
              emissive={idx % 3 === 0 ? '#d97706' : (idx % 3 === 1 ? '#10b981' : '#ea580c')}
              emissiveIntensity={2.6}
              roughness={0.08}
              metalness={0.94}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default WormholeContango;
