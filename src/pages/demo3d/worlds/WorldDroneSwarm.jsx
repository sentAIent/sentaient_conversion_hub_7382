import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, useScroll, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const DroneSwarm = ({ position }) => {
  const meshRef = useRef();
  const count = 400;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 250 + Math.random() * 500;
      const theta = Math.random() * 2 * Math.PI;
      const y = (Math.random() - 0.5) * 300;
      
      temp.push({
        t: Math.random() * 100,
        factor: 0.5 + Math.random() * 1.5,
        speed: 0.005 + Math.random() * 0.015,
        radius,
        theta,
        y
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, radius, theta, y } = particle;
      t += speed;
      particle.t = t;
      
      dummy.position.set(
        Math.cos(theta + t) * radius,
        y + Math.sin(t * factor) * 50,
        Math.sin(theta + t) * radius
      );
      
      // Face forward along circular path
      dummy.rotation.y = - (theta + t);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <coneGeometry args={[4, 15, 8]} />
        <meshStandardMaterial color="#00ffcc" metalness={0.8} roughness={0.2} emissive="#005544" emissiveIntensity={0.5} />
      </instancedMesh>
    </group>
  );
};

const Mothership = ({ position }) => {
  const shipRef = useRef();
  
  useFrame((state, delta) => {
    if (shipRef.current) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 20;
    }
  });

  return (
    <group position={position} ref={shipRef}>
      {/* Central Hull */}
      <mesh>
        <capsuleGeometry args={[60, 200, 16, 32]} />
        <meshStandardMaterial color="#1a1a24" metalness={0.9} roughness={0.3} />
      </mesh>
      
      {/* Side Wings */}
      <mesh position={[-80, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[100, 10, 80]} />
        <meshStandardMaterial color="#111118" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[80, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[100, 10, 80]} />
        <meshStandardMaterial color="#111118" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Engine Glow */}
      <mesh position={[0, -120, 0]}>
        <cylinderGeometry args={[40, 50, 20, 32]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Engine Trail */}
      <mesh position={[0, -250, 0]}>
        <cylinderGeometry args={[40, 10, 300, 32]} />
        <meshBasicMaterial color="#00aa88" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

const WorldDroneSwarm = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [locked, setLocked] = useState(false);
  const lockRef = useRef({ timer: 0, triggered: false });

  useFrame((state, delta) => {
    if (!visible) return;
    
    // Lock at progress = 0.65
    if (scroll.offset >= 0.645 && scroll.offset <= 0.655 && !lockRef.current.triggered && !window.swarmLocked) {
      window.swarmLocked = true;
      lockRef.current.triggered = true;
      lockRef.current.timer = 0;
      setLocked(true);
      if (scroll.el) scroll.el.style.overflow = 'hidden';
    }
    
    if (window.swarmLocked) {
      if (scroll.el) {
        scroll.el.scrollTop = 0.65 * (scroll.el.scrollHeight - scroll.el.clientHeight);
      }
      lockRef.current.timer += delta;
      if (lockRef.current.timer > 1.5) {
        window.swarmLocked = false;
        setLocked(false);
        if (scroll.el) scroll.el.style.overflow = 'auto';
      }
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 500, 200]} intensity={2.0} color="#00ffcc" />
      <pointLight position={[0, 0, 0]} intensity={4.0} color="#00ffcc" distance={1500} />

      {/* Dark Void Background */}
      <mesh rotation={[0, 0, 0]}>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#020504" side={THREE.BackSide} />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]} 
          position={[0, 250, 200]} 
          fontSize={80} 
          color="#ffffff" 
          anchorX="center" 
          anchorY="middle"
        >
            DRONE SWARM
        </Text>
        <Text 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]} 
          position={[0, 160, 200]} 
          fontSize={25} 
          color="#00ffcc" 
          anchorX="center" 
          anchorY="middle"
        >
            Autonomous Execution & Omni-channel Reach
        </Text>

        <group rotation={[Math.PI / 2, 0, 0]}>
          <Mothership position={[0, 0, 0]} />
        </group>
      </Float>

      <DroneSwarm position={[0, 0, 0]} />

      <Sparkles count={2000} scale={2000} size={15} speed={0.4} opacity={0.5} color="#ffffff" position={[0, 0, 0]} />
    </group>
  );
};

export default WorldDroneSwarm;
