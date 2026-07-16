import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Float, useScroll, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ position }) => {
  const satRef = useRef();
  
  useFrame((state, delta) => {
    if (satRef.current) {
      satRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={position} ref={satRef}>
      {/* Central Hub */}
      <mesh>
        <cylinderGeometry args={[40, 40, 200, 16]} />
        <meshStandardMaterial color="#223344" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Dish */}
      <mesh position={[0, 0, 80]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[120, 60, 32]} />
        <meshStandardMaterial color="#112233" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Dish Glow */}
      <mesh position={[0, 0, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[100, 100, 2, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Solar Panels */}
      <mesh position={[-150, 0, 0]}>
        <boxGeometry args={[200, 50, 5]} />
        <meshStandardMaterial color="#001122" metalness={0.9} roughness={0.1} emissive="#002244" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[150, 0, 0]}>
        <boxGeometry args={[200, 50, 5]} />
        <meshStandardMaterial color="#001122" metalness={0.9} roughness={0.1} emissive="#002244" emissiveIntensity={0.5} />
      </mesh>

      {/* Communication Array Antennas */}
      <mesh position={[0, 120, 0]}>
        <cylinderGeometry args={[2, 2, 100]} />
        <meshStandardMaterial color="#8899aa" />
      </mesh>
      <mesh position={[0, 170, 0]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#ff0088" />
      </mesh>
    </group>
  );
};

const DataBeams = ({ position }) => {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.position.z = (state.clock.elapsedTime * 800) % 500;
      beamRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={beamRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[5, 5, 200, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const LogoMesh = () => {
  const tex = useLoader(THREE.TextureLoader, '/autopilot_logo.png');
  tex.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 350, -600]}>
      <planeGeometry args={[250, 250]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

const WorldOrbitalCommand = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [locked, setLocked] = useState(false);
  const lockRef = useRef({ timer: 0, triggered: false });

  useFrame((state, delta) => {
    if (!visible) return;
    
    // Lock at progress = 0.60
    if (scroll.offset >= 0.595 && scroll.offset <= 0.605 && !lockRef.current.triggered && !window.orbitalLocked) {
      window.orbitalLocked = true;
      lockRef.current.triggered = true;
      lockRef.current.timer = 0;
      setLocked(true);
      if (scroll.el) scroll.el.style.overflow = 'hidden';
    }
    
    if (window.orbitalLocked) {
      if (scroll.el) {
        scroll.el.scrollTop = 0.60 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
      lockRef.current.timer += delta;
      if (lockRef.current.timer > 1.5) {
        window.orbitalLocked = false;
        setLocked(false);
        if (scroll.el) scroll.el.style.overflow = 'auto';
      }
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[200, 500, 500]} intensity={2.5} color="#ffffff" />
      <pointLight position={[0, 0, 200]} intensity={3.0} color="#00ffff" distance={1000} />

      {/* Dark Void */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#000205" side={THREE.BackSide} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <React.Suspense fallback={null}>
          <LogoMesh />
        </React.Suspense>
        
        <Text 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]} 
          position={[0, 180, -600]} 
          fontSize={80} 
          color="#ffffff" 
          anchorX="center" 
          anchorY="middle"
        >
            ORBITAL COMMAND
        </Text>
        <Text 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]} 
          position={[0, 100, -600]} 
          fontSize={25} 
          color="#00ffff" 
          anchorX="center" 
          anchorY="middle"
        >
            Centralizing Strategy & Global Output
        </Text>

        <Satellite position={[0, -100, -600]} />
        <DataBeams position={[0, -100, -450]} />
      </Float>

      <Sparkles count={1000} scale={1500} size={20} speed={0.2} opacity={0.3} color="#00aaff" position={[0, 0, -500]} />
    </group>
  );
};

export default WorldOrbitalCommand;
