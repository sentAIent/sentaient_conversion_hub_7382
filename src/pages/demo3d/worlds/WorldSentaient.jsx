import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const WorldSentaient = ({ position, rotation, visible }) => {
  const logoRef = useRef();
  const auraRef = useRef();
  
  // Use the exact Sentaient logo
  const texture = useLoader(THREE.TextureLoader, '/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png');

  useFrame((state) => {
    if (logoRef.current) {
      // Gentle floating animation
      logoRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 5;
    }
    if (auraRef.current) {
      auraRef.current.rotation.y += 0.005;
      auraRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      
      {/* Background Ambience */}
      <mesh>
        <sphereGeometry args={[1500, 32, 32]} />
        <meshBasicMaterial color="#020510" side={THREE.BackSide} />
      </mesh>

      <group>


        {/* The actual Sentaient logo image */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <mesh ref={logoRef} position={[0, 0, -500]}>
            <planeGeometry args={[400, 100]} /> {/* Adjust size based on aspect ratio */}
            <meshBasicMaterial 
              map={texture}
              transparent 
              opacity={1} 
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </Float>

        {/* Elegant Particles */}
        <Sparkles count={400} scale={1500} size={15} speed={0.4} opacity={0.6} color="#00ffff" position={[0, 0, 0]} />
        <Sparkles count={200} scale={1000} size={25} speed={0.2} opacity={0.8} color="#ffffff" position={[0, 0, -500]} />
      </group>

      <ambientLight intensity={0.5} color="#002244" />
      <pointLight position={[0, 0, -200]} intensity={3} color="#00aaff" distance={1000} />

    </group>
  );
};

export default WorldSentaient;
