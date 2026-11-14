import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WormholeAutopilot: Autonomous Hypersonic Vector Guidance Slipstream
 * High-speed conversion guidance corridor with neon turquoise streaks,
 * supersonic vector telemetry rings, and dynamic aerodynamic slipstream lines.
 */
const WormholeAutopilot = ({
  position,
  rotation = [Math.PI / 2, 0, 0],
  length = 2200,
  radius = 210,
  visible = true
}) => {
  const tunnelRef = useRef();
  const vectorRingsRef = useRef();

  // Procedural neon turquoise trajectory slipstream texture
  const vectorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep cyan aerodynamic void
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#02181b');
    gradient.addColorStop(0.5, '#04272c');
    gradient.addColorStop(1, '#02181b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing hypersonic speed needles
    ctx.fillStyle = '#00ffcc';
    for (let i = 0; i < 320; i++) {
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 2.5 + 1;
      const h = Math.random() * 110 + 30;
      ctx.fillRect(x, y, w, h);
    }

    // High-speed telemetry chevron guides
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.4;
    for (let y = 0; y < 512; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y + 20);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 18);
    return tex;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (tunnelRef.current) {
      vectorTexture.offset.y = -t * 3.6; // High velocity
    }
    if (vectorRingsRef.current) {
      vectorRingsRef.current.rotation.y = -t * 0.5;
      const s = 1.0 + Math.sin(t * 4.0) * 0.035;
      vectorRingsRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Aerodynamic Hypersonic Conduit */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 36, 1, true]} />
        <meshStandardMaterial
          map={vectorTexture}
          side={THREE.BackSide}
          roughness={0.15}
          metalness={0.92}
          emissive="#00b4d8"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Aerodynamic Hexagonal Guidance Rings */}
      <group ref={vectorRingsRef}>
        {[-0.36, -0.18, 0, 0.18, 0.36].map((frac, idx) => (
          <group key={idx} position={[0, frac * length, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 0.95, radius * 0.98, 6]} />
              <meshBasicMaterial
                color={idx % 2 === 0 ? '#00ffcc' : '#38bdf8'}
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export default WormholeAutopilot;
