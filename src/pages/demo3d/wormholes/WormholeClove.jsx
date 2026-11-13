import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WormholeClove: Fluid Crystalline Hydration Vortex
 * Sparkling pure mineral aquamarine vortex with buoyant fluid ribbons,
 * water molecular rings, and refreshing azure luminescence.
 */
const WormholeClove = ({
  position,
  rotation = [Math.PI / 2, 0, 0],
  length = 2200,
  radius = 215,
  visible = true
}) => {
  const tunnelRef = useRef();
  const waterRingsRef = useRef();

  // Procedural bubbling crystalline hydration texture
  const waterTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep sapphire ocean trench gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#021020');
    gradient.addColorStop(0.5, '#062846');
    gradient.addColorStop(1, '#021020');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing mineral water streams & bubbles
    ctx.fillStyle = '#67e8f9';
    for (let i = 0; i < 260; i++) {
      ctx.globalAlpha = Math.random() * 0.75 + 0.25;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 3 + 1.5;
      const h = Math.random() * 85 + 25;
      ctx.fillRect(x, y, w, h);
    }

    // Gentle fluid ripple rings
    ctx.strokeStyle = '#a5f3fc';
    ctx.lineWidth = 1.6;
    ctx.globalAlpha = 0.45;
    for (let y = 0; y < 512; y += 44) {
      ctx.beginPath();
      for (let x = 0; x < 512; x += 16) {
        const offset = Math.sin((x / 512) * Math.PI * 4) * 8;
        if (x === 0) ctx.moveTo(x, y + offset);
        else ctx.lineTo(x, y + offset);
      }
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
      waterTexture.offset.y = -t * 2.6;
    }
    if (waterRingsRef.current) {
      waterRingsRef.current.rotation.y = t * 0.3;
      const s = 1.0 + Math.sin(t * 3.0) * 0.04;
      waterRingsRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Crystalline Water Vortex Conduit */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 36, 1, true]} />
        <meshStandardMaterial
          map={waterTexture}
          side={THREE.BackSide}
          roughness={0.1}
          metalness={0.88}
          emissive="#0284c7"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Swirling Crystalline Molecular Rings */}
      <group ref={waterRingsRef}>
        {[-700, -350, 0, 350, 700].map((zPos, idx) => (
          <group key={idx} position={[0, zPos, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius * 0.95, 3.5, 16, 64]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#38bdf8' : '#a5f3fc'}
                emissive="#0284c7"
                emissiveIntensity={2.8}
                roughness={0.08}
                metalness={0.94}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export default WormholeClove;
