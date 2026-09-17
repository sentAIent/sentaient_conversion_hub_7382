import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const RollercoasterTrack = () => {
  // A straight high-speed track along the Z axis
  return (
    <group position={[0, -20, -1000]}>
      {/* Left Rail */}
      <mesh position={[-15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4000, 8]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} wireframe />
      </mesh>
      {/* Right Rail */}
      <mesh position={[15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4000, 8]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} wireframe />
      </mesh>
      {/* Cross ties */}
      {Array.from({ length: 200 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -2000 + i * 20]}>
          <boxGeometry args={[32, 1, 2]} />
          <meshStandardMaterial color="#0044ff" emissive="#0044ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

const SpeedLines = () => {
  const groupRef = useRef();
  const lines = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      z: Math.random() * 2000,
      speed: 10 + Math.random() * 20
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.z += lines[i].speed;
        if (child.position.z > 500) child.position.z -= 2000;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, l.z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 100, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const RollercoasterCarAndHUD = ({ worldPosition }) => {
  const rigRef = useRef();
  
  // Load the logo image
  const texture = useLoader(THREE.TextureLoader, '/assets/images/contango_quant_logo_new.png');

  useFrame((state) => {
    if (rigRef.current) {
      // Pin the rig to the camera's world position, transformed into local coordinates
      const camPos = state.camera.position.clone();
      const localPos = camPos.sub(new THREE.Vector3(...worldPosition));
      
      rigRef.current.position.copy(localPos);
      rigRef.current.rotation.copy(state.camera.rotation);


    }
  });

  return (
    <group ref={rigRef}>
      {/* Rollercoaster Car Frame (Below the camera) */}
      <group position={[0, -15, 0]}>
        {/* Dashboard */}
        <mesh position={[0, -2, -15]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[40, 5, 2]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-20, 2, -10]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2, 10, 15]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[20, 2, -10]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[2, 10, 15]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        {/* Seats/Back */}
        <mesh position={[0, -5, 10]}>
          <boxGeometry args={[38, 20, 2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
        </mesh>
      </group>

      {/* Hovering Hologram HUD */}
      <group position={[0, 5, -50]}>

        {/* The Logo */}
        <mesh position={[0, 15, 0]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
        </mesh>

        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -2, 0]} fontSize={6} color="#ffffff" anchorX="center" outlineWidth={0.05} outlineColor="#000000">
          CONTANGO QUANT
        </Text>
        
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -9, 0]} fontSize={3} color="#ffffff" anchorX="center" opacity={0.9} transparent>
          Quant Trading Systems
        </Text>
      </group>
    </group>
  );
};


const CandlestickTunnel = ({ worldPosition }) => {
  const tunnelRef = useRef();
  
  const candlesticks = useMemo(() => {
    return Array.from({ length: 800 }).map(() => {
      const isGreen = Math.random() > 0.5;
      const height = 20 + Math.random() * 80;
      const wickHeight = height + Math.random() * 40;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 200;
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 12000, 
        isGreen,
        height,
        wickHeight,
        speed: 15 + Math.random() * 25 
      };
    });
  }, []);

  useFrame((state) => {
    if (tunnelRef.current) {
      const camPos = state.camera.position.clone();
      const localPos = camPos.sub(new THREE.Vector3(...worldPosition));
      
      tunnelRef.current.position.copy(localPos);
      
      tunnelRef.current.children.forEach((group, i) => {
        group.position.z += candlesticks[i].speed;
        if (group.position.z > 2000) group.position.z -= 12000;
      });
    }
  });

  return (
    <group ref={tunnelRef}>
      {candlesticks.map((candle, i) => (
        <group key={i} position={[candle.x, candle.y, candle.z]}>
          <mesh>
            <cylinderGeometry args={[1.0, 1.0, candle.wickHeight, 4]} />
            <meshStandardMaterial 
              color={candle.isGreen ? "#00ff00" : "#ff0044"} 
              emissive={candle.isGreen ? "#00ff00" : "#ff0044"} 
              emissiveIntensity={2.0} 
            />
          </mesh>
          <mesh>
            <boxGeometry args={[8, candle.height, 8]} />
            <meshStandardMaterial 
              color={candle.isGreen ? "#00ff00" : "#ff0044"} 
              transparent 
              opacity={0.9}
              emissive={candle.isGreen ? "#00aa00" : "#aa0022"}
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const WorldContango = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [hasLocked, setHasLocked] = useState(false);

  useFrame(() => {
    if (!visible) return;
    if (scroll.offset > 0.925 && scroll.offset < 0.935 && !hasLocked && !window.contangoLocked) {
      window.contangoLocked = true;
      setHasLocked(true);
      setTimeout(() => {
        window.contangoLocked = false;
      }, 4000);
    }
    if ((scroll.offset < 0.90 || scroll.offset > 0.96) && hasLocked) {
      setHasLocked(false);
      window.contangoLocked = false;
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      
      {/* Dark Ambient Environment */}
      <mesh>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#000205" side={THREE.BackSide} />
      </mesh>

      
      <SpeedLines />
      {visible && <CandlestickTunnel worldPosition={position} />}

      {/* The Car and HUD need to know where the world is to stay relative to the camera */}
      {visible && <RollercoasterCarAndHUD worldPosition={position} />}

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 50, -100]} intensity={2} color="#00ffcc" distance={500} />
    </group>
  );
};

export default WorldContango;
