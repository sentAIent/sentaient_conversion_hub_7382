import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeMatrixTeam = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 220, visible = true }) => {
  const codeTunnelRef = useRef();
  const compilerGridRef = useRef();

  // Procedural code compiler & syntax tree texture
  const codeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#011204';
    ctx.fillRect(0, 0, 512, 512);

    // Code lines, curly braces, and binary snippets
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 14px monospace';
    const snippets = ['const', 'async', 'await', '() =>', '{...}', 'return', 'import', 'export', '0101', 'git push', 'eval()', 'model.run'];
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 450;
      const y = Math.random() * 500;
      const snip = snippets[Math.floor(Math.random() * snippets.length)];
      ctx.fillText(snip, x, y);
    }

    // High speed data tracks
    ctx.fillStyle = '#4ade80';
    for (let i = 0; i < 200; i++) {
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillRect(x, y, Math.random() * 3 + 1, Math.random() * 70 + 20);
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
    if (codeTunnelRef.current) {
      codeTexture.offset.y = -t * 3.8;
    }
    if (compilerGridRef.current) {
      compilerGridRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Code Stream Tunnel */}
      <mesh ref={codeTunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={codeTexture}
          color="#00ff44"
          emissive="#00661a"
          emissiveIntensity={2.2}
          side={THREE.BackSide}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Compiler Data Grid Lattice */}
      <mesh ref={compilerGridRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 16, 32, true]} />
        <meshBasicMaterial
          color="#86efac"
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

export default WormholeMatrixTeam;
