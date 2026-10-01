import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
  const texture = useLoader(THREE.TextureLoader, '/assets/images/contango_logo.png');

  useFrame((state) => {
    if (rigRef.current) {
      // Pin the rig to the camera's world position, transformed into local coordinates
      const camPos = state.camera.position.clone();
      const localPos = camPos.sub(new THREE.Vector3(...worldPosition));
      
      rigRef.current.position.copy(localPos);
      rigRef.current.rotation.copy(state.camera.rotation);

      // Add slight turbulence to the car
      const turbulenceY = Math.sin(state.clock.elapsedTime * 15) * 0.5;
      const turbulenceZ = Math.cos(state.clock.elapsedTime * 12) * 0.2;
      rigRef.current.position.y += turbulenceY;
      rigRef.current.position.z += turbulenceZ;
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
        <mesh position={[0, 10, 0]}>
          <planeGeometry args={[40, 20]} />
          <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
        </mesh>

        {/* Analytics UI Elements */}
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[-30, 20, 0]} fontSize={4} color="#00ff00" anchorX="left">BTC/USD  +5.42%</Text>
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[-30, 14, 0]} fontSize={3} color="#ffffff" anchorX="left">VOL: 1.2M</Text>
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[-30, 9, 0]} fontSize={3} color="#00ff00" anchorX="left">SIGNAL: STRONG BUY</Text>
        
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[30, 20, 0]} fontSize={4} color="#ff0044" anchorX="right">ETH/USD  -1.12%</Text>
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[30, 14, 0]} fontSize={3} color="#ffffff" anchorX="right">VOL: 840K</Text>
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[30, 9, 0]} fontSize={3} color="#ff0044" anchorX="right">SIGNAL: SELL</Text>

        {/* Dynamic Data Stream */}
        <Text font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" position={[0, -5, 0]} fontSize={2} color="#00ffff" anchorX="center" opacity={0.7} transparent>
          {"ALGO > EXECUTING ORDER BATCH > LATENCY 1.2ms"}
        </Text>
      </group>
    </group>
  );
};

const WorldContango = ({ position, rotation, visible }) => {
  return (
    <group visible={visible} position={position} rotation={rotation}>
      
      {/* Dark Ambient Environment */}
      <mesh>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#000205" side={THREE.BackSide} />
      </mesh>

      <RollercoasterTrack />
      <SpeedLines />

      {/* The Car and HUD need to know where the world is to stay relative to the camera */}
      {visible && <RollercoasterCarAndHUD worldPosition={position} />}

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 50, -100]} intensity={2} color="#00ffcc" distance={500} />
    </group>
  );
};

export default WorldContango;
