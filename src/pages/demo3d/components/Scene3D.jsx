import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Gentle floating based on mouse position
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.mouse.x * 2), 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.mouse.y * 2), 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial 
          color="#1a1a2e" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={0.4} 
          speed={2} 
          wireframe={true}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00ffcc" />
      
      <AbstractShape />
      
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
      
      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene3D;
