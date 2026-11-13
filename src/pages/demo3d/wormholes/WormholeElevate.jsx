import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeElevate = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 220, visible = true }) => {
  const tunnelRef = useRef();
  const contourRingsRef = useRef();
  const snowFlurryRef = useRef();

  // Procedural alpine ice texture
  const iceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#040d1a');
    gradient.addColorStop(0.5, '#0a2540');
    gradient.addColorStop(1, '#040d1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    // Blizzard streaks
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 240; i++) {
      ctx.globalAlpha = Math.random() * 0.6 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 3 + 1;
      const h = Math.random() * 90 + 30;
      ctx.fillRect(x, y, w, h);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 16);
    return tex;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (tunnelRef.current) {
      iceTexture.offset.y = -t * 3.5;
    }
    if (contourRingsRef.current) {
      contourRingsRef.current.rotation.z = t * 0.4;
    }
    if (snowFlurryRef.current) {
      snowFlurryRef.current.rotation.z = -t * 0.8;
      snowFlurryRef.current.position.y = (Math.sin(t * 2) * 20);
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Glacial Blizzard Tube */}
      <mesh ref={tunnelRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={iceTexture}
          color="#aaddff"
          emissive="#0055aa"
          emissiveIntensity={1.8}
          side={THREE.BackSide}
          transparent
          opacity={0.92}
          depthWrite={false}
        />
      </mesh>

      {/* Rotating Elevation Contour Wireframe Rings */}
      <mesh ref={contourRingsRef}>
        <cylinderGeometry args={[radius - 10, radius - 10, length, 16, 32, true]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Internal Speed Vortex Ribs */}
      <mesh ref={snowFlurryRef}>
        <cylinderGeometry args={[radius - 25, radius - 25, length, 8, 16, true]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default WormholeElevate;
