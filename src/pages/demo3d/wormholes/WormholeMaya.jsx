import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeMaya = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 220, visible = true }) => {
  const synapseRef = useRef();
  const auraRingsRef = useRef();

  // Procedural empathetic rose and conversational wave texture
  const mayaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#16020c');
    gradient.addColorStop(0.5, '#2e0819');
    gradient.addColorStop(1, '#16020c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Flowing synaptic threads of conversation
    ctx.fillStyle = '#ff66aa';
    for (let i = 0; i < 220; i++) {
      ctx.globalAlpha = Math.random() * 0.6 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 3 + 1;
      const h = Math.random() * 70 + 20;
      ctx.fillRect(x, y, w, h);
    }

    // Soft resonant harmonic waves
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.35;
    for (let y = 0; y < 512; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 14);
    return tex;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (synapseRef.current) {
      mayaTexture.offset.y = -t * 2.5;
    }
    if (auraRingsRef.current) {
      auraRingsRef.current.rotation.z = t * 0.35;
      const pulse = 1 + Math.sin(t * 3) * 0.03;
      auraRingsRef.current.scale.set(pulse, 1, pulse);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Empathetic Synaptic Vortex */}
      <mesh ref={synapseRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={mayaTexture}
          color="#ff66aa"
          emissive="#881144"
          emissiveIntensity={2.0}
          side={THREE.BackSide}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Resonant Dialogue Harmonics Wireframe */}
      <mesh ref={auraRingsRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 16, 28, true]} />
        <meshBasicMaterial
          color="#fda4af"
          wireframe
          transparent
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default WormholeMaya;
