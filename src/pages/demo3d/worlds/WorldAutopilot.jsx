import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const ConveyorBelt = ({ position, speed = 2, direction = 1, color = "#00ffcc" }) => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        if (i === 0) return; // Skip the base mesh
        child.position.z += speed * direction * delta * 100;
        if (child.position.z > 1000) child.position.z = -1000;
        if (child.position.z < -1000) child.position.z = 1000;
      });
    }
  });

  return (
    <group position={position} ref={ref}>
      {/* Belt base */}
      <mesh position={[0, -5, 0]}>
        <boxGeometry args={[60, 4, 2000]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        <meshBasicMaterial color="#333" wireframe />
      </mesh>
      
      {/* Packets */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[0, 10, -1000 + i * 100]}>
          <boxGeometry args={[30, 20, 40]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} wireframe />
        </mesh>
      ))}
    </group>
  );
};

const RoutingNode = ({ position, color = "#ff00ff" }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Base Server */}
      <mesh position={[0, -100, 0]}>
        <boxGeometry args={[100, 200, 100]} />
        <meshStandardMaterial color="#000" metalness={1} roughness={0} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      
      {/* Floating Holographic Core */}
      <mesh position={[0, 100, 0]} ref={ref}>
        <icosahedronGeometry args={[50, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} wireframe />
      </mesh>
    </group>
  );
};

const WorldAutopilot = ({ position, rotation, visible }) => {
  const [logoTexture, setLogoTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/autopilot_logo.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      setLogoTexture(texture);
    });
  }, []);

  

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Dark cyber background */}
      <mesh>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#000511" side={THREE.BackSide} />
      </mesh>

      {/* Hex Grid Floor */}
      <mesh position={[0, -200, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4000, 4000]} />
        <meshBasicMaterial color="#001122" transparent opacity={0.8} />
      </mesh>
      <gridHelper args={[4000, 100, '#00ffcc', '#003344']} position={[0, -199, 0]} />

      {/* Data Factory Environment */}
      <ConveyorBelt position={[-400, -150, 0]} speed={4} direction={1} color="#00ffcc" />
      <ConveyorBelt position={[400, -150, 0]} speed={5} direction={-1} color="#ff00ff" />
      <ConveyorBelt position={[-800, -150, 0]} speed={3} direction={-1} color="#0088ff" />
      <ConveyorBelt position={[800, -150, 0]} speed={6} direction={1} color="#ffaa00" />

      {/* Massive Routing Nodes */}
      <RoutingNode position={[-200, -50, -1000]} color="#00ffcc" />
      <RoutingNode position={[200, -50, -800]} color="#ff00ff" />
      <RoutingNode position={[-600, -50, -600]} color="#0088ff" />
      <RoutingNode position={[600, -50, -400]} color="#ffaa00" />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight color="#00ffcc" intensity={3} distance={2000} position={[-500, 500, -500]} />
      <pointLight color="#ff00ff" intensity={3} distance={2000} position={[500, 500, 500]} />

      {/* UI Elements */}
      <group position={[0, 0, -300]}>
        {logoTexture && (
          <mesh position={[0, 100, 0]}>
            <planeGeometry args={[250, 250]} />
            <meshBasicMaterial map={logoTexture} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        )}
        
        <Text
          position={[0, -40, 0]}
          fontSize={60}
          color="#ffffff"
          outlineWidth={0.02}
          outlineColor="#00ffcc"
          anchorX="center"
          anchorY="middle"
        >
          AUTOPILOT
        </Text>
        
        <Text
          position={[0, -100, 0]}
          fontSize={24}
          color="#ffffff"
          outlineWidth={0.01}
          outlineColor="#003344"
          anchorX="center"
          anchorY="middle"
          maxWidth={800}
          textAlign="center"
          lineHeight={1.5}
        >
          Fully autonomous marketing pipelines. Generates content, schedules campaigns, and optimizes spend.
        </Text>
      </group>
    </group>
  );
};

export default WorldAutopilot;
