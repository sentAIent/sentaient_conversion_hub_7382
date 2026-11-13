import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeSphinx = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 230, visible = true }) => {
  const radarRef = useRef();
  const perimeterRef = useRef();

  // Radar grid and tactical surveillance line texture
  const radarTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep tactical command background
    ctx.fillStyle = '#0c0a02';
    ctx.fillRect(0, 0, 512, 512);

    // Radar coordinate rings and latitude grids
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    for (let y = 0; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Threat vector warning dashes
    ctx.fillStyle = '#ffcc00';
    for (let i = 0; i < 180; i++) {
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.fillRect(x, y, Math.random() * 8 + 2, Math.random() * 40 + 15);
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
    if (radarRef.current) {
      radarTexture.offset.y = -t * 2.8;
    }
    if (perimeterRef.current) {
      perimeterRef.current.rotation.z = t * 0.6;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Tactical Radar Stream Tube */}
      <mesh ref={radarRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={radarTexture}
          color="#ffcc00"
          emissive="#aa7700"
          emissiveIntensity={2.0}
          side={THREE.BackSide}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>

      {/* Global Defense Perimeter Warning Rings */}
      <mesh ref={perimeterRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 12, 24, true]} />
        <meshBasicMaterial
          color="#ff8800"
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

export default WormholeSphinx;
