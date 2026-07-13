import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';

const FloatingAsset = ({ position, type, color }) => {
  const meshRef = useRef();
  const speed = useMemo(() => Math.random() * 0.5 + 0.2, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time) * 20;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.4;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        {type === 'dodecahedron' ? (
          <dodecahedronGeometry args={[15, 0]} />
        ) : type === 'octahedron' ? (
          <octahedronGeometry args={[12, 0]} />
        ) : (
          <icosahedronGeometry args={[10, 0]} />
        )}
        <meshStandardMaterial 
          color="#111" 
          metalness={0.9} 
          roughness={0.1} 
          emissive={color} 
          emissiveIntensity={0.5} 
          wireframe={Math.random() > 0.5} 
        />
        {/* Inner solid mesh for wireframe ones */}
        <mesh>
          {type === 'dodecahedron' ? (
            <dodecahedronGeometry args={[14.5, 0]} />
          ) : type === 'octahedron' ? (
            <octahedronGeometry args={[11.5, 0]} />
          ) : (
            <icosahedronGeometry args={[9.5, 0]} />
          )}
          <meshBasicMaterial color="#000" />
        </mesh>
      </mesh>
    </group>
  );
};

const HyperGate = () => {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.z = time * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = -time * 0.15;
    }
  });

  return (
    <group position={[0, 0, -600]}>
      {/* Outer Ring */}
      <group ref={outerRef}>
        <mesh>
          <torusGeometry args={[350, 20, 64, 128]} />
          <meshStandardMaterial color="#050510" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[360, 2, 16, 128]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
        {/* Accents */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0, 350, 0]}>
            <boxGeometry args={[40, 60, 40]} />
            <meshStandardMaterial color="#111" metalness={1} roughness={0.2} emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* Inner Ring */}
      <group ref={innerRef}>
        <mesh>
          <torusGeometry args={[280, 15, 64, 128]} />
          <meshStandardMaterial color="#100510" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[270, 3, 16, 128]} />
          <meshBasicMaterial color="#ff00ff" />
        </mesh>
      </group>

      {/* Deep Portal Glow inside the gate */}
      <mesh position={[0, 0, -50]}>
        <circleGeometry args={[260, 64]} />
        <meshBasicMaterial color="#0a0a2a" transparent opacity={0.6} depthWrite={false} />
      </mesh>
      
      {/* Dynamic Lighting */}
      <pointLight color="#00ffff" intensity={5} distance={1000} position={[0, 0, 100]} />
      <pointLight color="#ff00ff" intensity={5} distance={1000} position={[0, 0, -100]} />
    </group>
  );
};

const WorldInterstellar = ({ position, visible }) => {
  const [logoTexture, setLogoTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/interstellar_logo_final.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      setLogoTexture(texture);
    });
  }, []);

  const assets = useMemo(() => {
    const types = ['dodecahedron', 'octahedron', 'icosahedron'];
    const colors = ['#00ffff', '#ff00ff', '#ffaa00'];
    const items = [];
    for (let i = 0; i < 25; i++) {
      // Scatter assets around the camera and gate
      const r = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const y = -100 + Math.random() * 300;
      const x = Math.cos(theta) * r;
      const z = -Math.random() * 800 + 100; // Between +100 and -700
      
      items.push({
        id: i,
        position: [x, y, z],
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, []);

  return (
    <group position={position} visible={visible}>
      {/* Deep Space Background & Crisp Stars */}
      <mesh>
        <sphereGeometry args={[2000, 32, 32]} />
        <meshBasicMaterial color="#020208" side={THREE.BackSide} />
      </mesh>
      
      <group>
        <Stars radius={1000} depth={100} count={5000} factor={6} saturation={0} fade speed={1} />
      </group>
      
      {/* Synthwave Digital Floor */}
      <Grid 
        position={[0, -150, 0]} 
        args={[2000, 2000]} 
        cellSize={10} 
        cellThickness={1} 
        cellColor="#00ffff" 
        sectionSize={50} 
        sectionThickness={1.5} 
        sectionColor="#ff00ff" 
        fadeDistance={1000} 
        infiniteGrid 
      />

      {/* Massive Web3 Portal */}
      <HyperGate />

      {/* Floating High-Fidelity Assets */}
      {assets.map(asset => (
        <FloatingAsset key={asset.id} position={asset.position} type={asset.type} color={asset.color} />
      ))}

      {/* Hero UI elements at center */}
      <group position={[0, 0, -200]}>
        {logoTexture && (
          <mesh position={[0, 80, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshBasicMaterial map={logoTexture} transparent depthWrite={false} />
          </mesh>
        )}
        
        <Text
          position={[0, -50, 0]}
          fontSize={60}
          color="#ffffff"
          outlineWidth={0.02}
          outlineColor="#ff00ff"
          anchorX="center"
          anchorY="middle"
        >
          INTERSTELLAR
        </Text>
        
        <Text
          position={[0, -110, 0]}
          fontSize={24}
          color="#ffffff"
          outlineWidth={0.01}
          outlineColor="#00ffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={800}
          textAlign="center"
          lineHeight={1.5}
        >
          The gamified Web3 division. Where autonomous play-to-earn logic meets high-fidelity digital assets.
        </Text>
      </group>
    </group>
  );
};

export default WorldInterstellar;
