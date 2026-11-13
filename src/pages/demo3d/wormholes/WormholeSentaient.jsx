import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WormholeSentaient: Quantum Neural Cortex Convergence Nexus
 * Transition conduit to sentAIent corporate portal featuring multi-agent
 * neural synaptic threads, glowing AI nodes, and royal sapphire intelligence streams.
 */
const WormholeSentaient = ({
  position,
  rotation = [Math.PI / 2, 0, 0],
  length = 3800,
  radius = 230,
  visible = true
}) => {
  const tunnelRef = useRef();
  const neuralCoreRingsRef = useRef();

  // Procedural multi-agent neural intelligence texture
  const neuralTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep sapphire quantum void
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#040d21');
    gradient.addColorStop(0.5, '#0a1e4a');
    gradient.addColorStop(1, '#040d21');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing neural axons and data streams
    ctx.fillStyle = '#60a5fa';
    for (let i = 0; i < 300; i++) {
      ctx.globalAlpha = Math.random() * 0.75 + 0.25;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 3 + 1;
      const h = Math.random() * 100 + 25;
      ctx.fillRect(x, y, w, h);
    }

    // Interconnected synaptic node network
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 60; i++) {
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 3 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 20);
    return tex;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (tunnelRef.current) {
      neuralTexture.offset.y = -t * 3.0;
    }
    if (neuralCoreRingsRef.current) {
      neuralCoreRingsRef.current.rotation.y = t * 0.45;
      const pulse = 1.0 + Math.sin(t * 3.2) * 0.04;
      neuralCoreRingsRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Neural Synaptic Tunnel */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 36, 1, true]} />
        <meshStandardMaterial
          map={neuralTexture}
          side={THREE.BackSide}
          roughness={0.12}
          metalness={0.92}
          emissive="#2563eb"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Royal Sapphire Synaptic Node Conduit Rings */}
      <group ref={neuralCoreRingsRef}>
        {[-1200, -600, 0, 600, 1200].map((zPos, idx) => (
          <group key={idx} position={[0, zPos, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius * 0.95, 3.8, 16, 64]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#60a5fa' : '#93c5fd'}
                emissive="#1d4ed8"
                emissiveIntensity={2.6}
                roughness={0.08}
                metalness={0.96}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

export default WormholeSentaient;
