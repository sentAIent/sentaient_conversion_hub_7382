import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const JudgeLogo = ({ position }) => {
  const meshRef = useRef();
  const [logoTex, setLogoTex] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load('/legal_eagle_logo.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setLogoTex(tex);
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Very slow, authoritative hovering
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 1.5;
    }
  });

  if (!logoTex) return null;

  return (
    <group position={position}>
      {/* The Logo */}
      <mesh ref={meshRef}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial map={logoTex} transparent={true} opacity={1} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#ffffff" intensity={2} distance={100} position={[0, 0, 20]} />
    </group>
  );
};

const CourtroomBackground = () => {
  const [bgTex, setBgTex] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load('/legal_eagle_courtroom_bg.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setBgTex(tex);
    });
  }, []);

  if (!bgTex) return null;

  return (
    <mesh position={[0, 0, -600]}>
      <planeGeometry args={[1600, 900]} />
      <meshBasicMaterial map={bgTex} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
};

const HolographicFeatureText = ({ position, text, color }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 2.0;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={12}
        color={color}
        maxWidth={120}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {text}
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </Text>
      <pointLight color={color} intensity={1} distance={100} />
    </group>
  );
};

const WorldLegalEagle = ({ position, rotation, visible }) => {
  return (
    <group position={position} rotation={rotation} visible={visible}>
      <ambientLight intensity={0.2} />
      
      {/* Breathtaking AI Generated Background */}
      <CourtroomBackground />

      {/* The Judge Logo floating gracefully in the center */}
      <JudgeLogo position={[0, 20, -200]} />

      {/* App Feature Holograms */}
      <HolographicFeatureText position={[-140, -20, -100]} text="AI Contract\nCreation" color="#00ffcc" />
      <HolographicFeatureText position={[140, -20, -100]} text="Intelligent\nContract Review" color="#ff00ff" />
      <HolographicFeatureText position={[0, -50, -50]} text="Real-Time\nEdits & Formatting" color="#d4af37" />
    </group>
  );
};

export default WorldLegalEagle;
