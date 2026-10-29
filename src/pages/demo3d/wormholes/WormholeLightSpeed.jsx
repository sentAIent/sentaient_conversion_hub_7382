import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeLightSpeed = ({ position, rotation = [Math.PI / 2, 0, 0], length = 3200, radius = 220, visible = true }) => {
  const fiberRef = useRef();
  const firewallRingsRef = useRef();

  // Procedural fiber-optic telemetry & uptime pulse texture
  const fiberTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#010a18';
    ctx.fillRect(0, 0, 512, 512);

    // High frequency fiber optic laser streams
    ctx.fillStyle = '#38bdf8';
    for (let i = 0; i < 350; i++) {
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 2 + 1;
      const h = Math.random() * 120 + 30;
      ctx.fillRect(x, y, w, h);
    }

    // Telemetry latency rings
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    for (let y = 0; y < 512; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
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
    if (fiberRef.current) {
      fiberTexture.offset.y = -t * 5.5; // Blinding lightspeed velocity
    }
    if (firewallRingsRef.current) {
      firewallRingsRef.current.rotation.z = -t * 0.7;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      {/* Fiber-Optic Hyperspace Tube */}
      <mesh ref={fiberRef}>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          map={fiberTexture}
          color="#0088ff"
          emissive="#0044aa"
          emissiveIntensity={2.5}
          side={THREE.BackSide}
          transparent
          opacity={0.94}
          depthWrite={false}
        />
      </mesh>

      {/* Cybersecurity Firewall Barrier Rings */}
      <mesh ref={firewallRingsRef}>
        <cylinderGeometry args={[radius - 12, radius - 12, length, 12, 36, true]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default WormholeLightSpeed;
