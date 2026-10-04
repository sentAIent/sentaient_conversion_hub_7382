import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Avalanche({ gameStarted }) {
  const meshRef = useRef();
  const avalancheZ = useRef(20000); 
  const initialized = useRef(false);
  const [gameOver, setGameOver] = useState(false);

  const geo = useMemo(() => new THREE.PlaneGeometry(3000, 1000, 32, 16), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide,
    emissive: '#333333'
  }), []);

  useFrame((state, delta) => {
    if (gameOver) return;
    
    const dt = Math.min(delta, 0.05);
    const currentZ = state.camera.position.z;
    
    // Initialize spawn position behind player once
    if (!initialized.current) {
        avalancheZ.current = currentZ + 20000;
        initialized.current = true;
    }

    // Don't move avalanche until game starts
    if (!gameStarted) {
        avalancheZ.current = currentZ + 20000;
        if (meshRef.current) {
            meshRef.current.position.set(0, 100, avalancheZ.current);
        }
        return;
    }

    // Move forward continuously (negative Z direction)
    const avalancheSpeed = 250; // Faster than player
    avalancheZ.current -= avalancheSpeed * dt;

    if (meshRef.current) {
      meshRef.current.position.set(0, 100, avalancheZ.current);
      // Add some turbulence to the avalanche mesh vertices
      const time = state.clock.getElapsedTime();
      const pos = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Simple noise
        pos.setZ(i, Math.sin(x * 0.01 + time * 5) * 50 + Math.cos(y * 0.01 + time * 3) * 50);
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Check game over
    if (avalancheZ.current <= currentZ) {
      setGameOver(true);
      alert("AVALANCHE! YOU DIED");
      window.location.reload();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geo} material={mat} rotation={[0, 0, 0]} castShadow />
  );
}
