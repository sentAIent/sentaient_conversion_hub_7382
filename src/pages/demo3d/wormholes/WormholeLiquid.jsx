import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeLiquid = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 220, visible = true }) => {
  const liquidRef = useRef();
  const ledgerRibbonsRef = useRef();

  // Procedural liquid gold and financial ribbon texture
  const goldTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep vault gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#150f00');
    gradient.addColorStop(0.5, '#2e1f00');
    gradient.addColorStop(1, '#150f00');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing liquid gold veins and ledger streams
    ctx.fillStyle = '#ffd700';
    for (let i = 0; i < 300; i++) {
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 4 + 1;
      const h = Math.random() * 80 + 20;
      ctx.fillRect(x, y, w, h);
    }

    // Ledger balance grid lines
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let y = 0; y < 512; y += 32) {
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
    if (liquidRef.current) {
      goldTexture.offset.y = -t * 3.2;
    }
    if (ledgerRibbonsRef.current) {
      ledgerRibbonsRef.current.rotation.z = -t * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Liquid Gold Currency Tunnel */}
      <mesh ref={liquidRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={goldTexture}
          color="#ffaa00"
          emissive="#774400"
          emissiveIntensity={2.2}
          side={THREE.BackSide}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Financial Ledger Ribbon Rings */}
      <mesh ref={ledgerRibbonsRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 16, 32, true]} />
        <meshBasicMaterial
          color="#ffe066"
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

export default WormholeLiquid;
