import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function WorldHelu({ position, visible }) {
  const avatarRef = useRef();

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.getElapsedTime();
    if (avatarRef.current) {
      // Gentle breathing/swaying of the avatar placeholder
      avatarRef.current.position.y = Math.sin(t * 1.5) * 2;
      avatarRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group position={position}>
      {/* Serene Dawn/Sunset Lighting representing warmth and trust */}
      <ambientLight intensity={0.4} color="#ff9955" />
      <directionalLight position={[1000, 500, -1000]} intensity={2} color="#ff7722" />
      <directionalLight position={[-1000, 300, -500]} intensity={1.5} color="#4488ff" />
      
      {/* Ethereal Floating Particles (Dust motes / thoughts) */}
      <Sparkles count={1000} scale={1500} size={15} speed={0.2} opacity={0.6} color="#ffddaa" position={[0, 100, -500]} />

      {/* Majestic Mirror/Water Floor */}
      <mesh position={[0, -200, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#050a11" roughness={0.1} metalness={0.9} transparent opacity={0.9} />
      </mesh>

      {/* Perfectly Framed Ethereal Sanctuary of Conversation */}
      <group position={[0, 100, -800]}>
        
        {/* Giant intersecting rings of trust and infinite dialogue */}
        <group ref={avatarRef}>
          {/* Outer Ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[300, 2, 32, 128]} />
            <meshStandardMaterial color="#ffccaa" emissive="#ff8833" emissiveIntensity={1.5} />
          </mesh>
          {/* Inner Ring */}
          <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
            <torusGeometry args={[250, 4, 32, 128]} />
            <meshStandardMaterial color="#ffccaa" emissive="#ffaa55" emissiveIntensity={2} />
          </mesh>
          
          {/* Core Orb: The Advisor (Helu) */}
          <mesh>
            <sphereGeometry args={[80, 64, 64]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffddaa" emissiveIntensity={3} />
          </mesh>
          <pointLight intensity={10} distance={1500} color="#ff9944" />
        </group>

        {/* Ethereal Seating / Floating Platforms for the user */}
        <group position={[0, -250, 200]}>
          <mesh position={[-150, 0, 0]}>
            <cylinderGeometry args={[50, 40, 10, 64]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} emissive="#221100" />
          </mesh>
          <mesh position={[150, 0, 0]}>
            <cylinderGeometry args={[50, 40, 10, 64]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} emissive="#221100" />
          </mesh>
          {/* Central connecting table/bridge */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[200, 5, 40]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Subtle ground glow directly below the sanctuary */}
        <mesh position={[0, -290, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[400, 64]} />
          <meshBasicMaterial color="#ffaa55" transparent opacity={0.1} />
        </mesh>

      </group>
    </group>
  );
}
