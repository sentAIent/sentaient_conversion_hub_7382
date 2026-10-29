import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const WorldSentaient = ({ position, rotation, visible }) => {
  const logoRef = useRef();
  const auraRef = useRef();
  const radarSweepRef = useRef();
  const connectionArcsRef = useRef();
  const hudRef = useRef();
  
  // Use the exact Sentaient logo texture
  const texture = useLoader(
    THREE.TextureLoader, 
    '/sentAIent_logo_Aug2025_BG-Transparent_TEXT-60A9FF_A-202733_I-60A9FF_INFINITY-ORANGE-Horizontal_990x990.png'
  );

  // Pre-generate social connection nodes (friends & spontaneous gatherings)
  const socialNodes = useMemo(() => {
    const nodes = [];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.sin(i) * 0.4);
      const dist = 180 + (i % 3) * 70;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 500;
      const y = -120 + Math.sin(i * 1.8) * 45;
      nodes.push({
        pos: [x, y, z],
        color: i % 2 === 0 ? '#60a9ff' : '#ff8800',
        size: 10 + (i % 3) * 4,
        pulseOffset: i * 0.5
      });
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (!visible) return;
    const t = state.clock.elapsedTime;

    // Gentle floating and orientation
    if (logoRef.current) {
      logoRef.current.position.y = Math.sin(t * 1.5) * 6;
      logoRef.current.rotation.y = Math.sin(t * 0.5) * 0.08;
    }

    // Kinetic 3D Infinity Core Rotation
    if (auraRef.current) {
      auraRef.current.rotation.y = t * 0.35;
      auraRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }

    // Real-World Proximity Radar Sweep
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = -t * 0.6;
    }

    // Connection Arcs Breathing Pulse
    if (connectionArcsRef.current) {
      connectionArcsRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    }

    // Floating Social OS HUD
    if (hudRef.current) {
      hudRef.current.position.y = 125 + Math.sin(t * 1.4) * 4;
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      
      {/* Warm & Electric Connection Ambiance */}
      <ambientLight intensity={0.4} color="#051025" />
      <directionalLight position={[0, 600, -200]} intensity={2.8} color="#60a9ff" />
      <pointLight position={[0, 0, -450]} intensity={12} distance={1400} color="#ff8800" />
      <pointLight position={[0, -180, -450]} intensity={8} distance={900} color="#60a9ff" />

      {/* Deep Cyber-Physical Backdrop */}
      <mesh>
        <sphereGeometry args={[1800, 32, 32]} />
        <meshBasicMaterial color="#020714" side={THREE.BackSide} />
      </mesh>

      {/* Geospatial Real-World Proximity Ground Grid */}
      <mesh position={[0, -220, -500]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2200, 2200, 32, 32]} />
        <meshStandardMaterial color="#030b1e" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0, -218, -500]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2200, 2200, 44, 44]} />
        <meshBasicMaterial color="#60a9ff" wireframe transparent opacity={0.14} />
      </mesh>

      {/* Concentric Proximity Radar Wave Rings */}
      <group position={[0, -215, -500]} rotation={[-Math.PI / 2, 0, 0]}>
        {[180, 320, 460].map((r, i) => (
          <mesh key={i}>
            <ringGeometry args={[r, r + 3, 64]} />
            <meshBasicMaterial color="#ff8800" transparent opacity={0.35 - i * 0.08} side={THREE.DoubleSide} />
          </mesh>
        ))}
        {/* Radar Sweeping Beam */}
        <mesh ref={radarSweepRef}>
          <ringGeometry args={[10, 480, 32, 1, 0, Math.PI / 4]} />
          <meshBasicMaterial color="#60a9ff" transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Real-World Social Gathering Nodes & Energy Bridges */}
      <group ref={connectionArcsRef}>
        {socialNodes.map((node, idx) => (
          <group key={idx} position={node.pos}>
            {/* Glowing Presence Beacon */}
            <mesh>
              <sphereGeometry args={[node.size, 16, 16]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive={node.color} 
                emissiveIntensity={2.8} 
              />
            </mesh>
            <pointLight color={node.color} intensity={4} distance={180} />
            
            {/* Connecting Arc back to Center Hub */}
            <mesh position={[-node.pos[0] * 0.5, 0, (-node.pos[2] - 500) * 0.5]}>
              <boxGeometry args={[Math.abs(node.pos[0]), 1.5, 1.5]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.25} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Central 3D Kinetic Infinity Harmony Rings */}
      <group ref={auraRef} position={[0, 10, -500]}>
        {/* Electric Blue Digital Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[145, 3.5, 16, 80]} />
          <meshStandardMaterial color="#60a9ff" emissive="#0077ff" emissiveIntensity={2.8} />
        </mesh>
        {/* Sovereign Orange Physical Reality Ring */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
          <torusGeometry args={[165, 3.5, 16, 80]} />
          <meshStandardMaterial color="#ff8800" emissive="#ff5500" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Floating High-Res Sentaient Emblem */}
      <Float speed={2} rotationIntensity={0.08} floatIntensity={0.4}>
        <mesh ref={logoRef} position={[0, 10, -500]}>
          <planeGeometry args={[360, 90]} />
          <meshBasicMaterial 
            map={texture}
            transparent 
            opacity={0.98} 
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Atmospheric Community Sparkles */}
      <Sparkles count={550} scale={1400} size={15} speed={0.5} opacity={0.65} color="#60a9ff" position={[0, 0, -450]} />
      <Sparkles count={300} scale={1000} size={20} speed={0.3} opacity={0.75} color="#ff8800" position={[0, 0, -500]} />

      {/* Holographic Real-World Social Connection HUD */}
      <group ref={hudRef} position={[0, 130, -680]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[520, 135]} />
          <meshBasicMaterial color="#020817" transparent opacity={0.78} />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <planeGeometry args={[524, 139]} />
          <meshBasicMaterial color="#60a9ff" wireframe transparent opacity={0.38} />
        </mesh>

        <Text 
          position={[-235, 40, 5]} 
          fontSize={15} 
          color="#60a9ff" 
          anchorX="left" 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          SENTAIENT // REAL-WORLD CONNECTION NETWORK & OS
        </Text>
        <Text 
          position={[-235, 14, 5]} 
          fontSize={15} 
          color="#ffffff" 
          anchorX="left" 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          THE IN-PERSON SOCIAL OS: BRIDGING DIGITAL TO MEANINGFUL REALITY
        </Text>
        <Text 
          position={[-235, -12, 5]} 
          fontSize={12} 
          color="#ffaa44" 
          anchorX="left" 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          PROXIMITY RADAR: REAL-TIME SPONTANEOUS GATHERINGS & LOCAL HANGOUTS
        </Text>
        <Text 
          position={[-235, -36, 5]} 
          fontSize={12} 
          color="#93c5fd" 
          anchorX="left" 
          font="/fonts/Roboto.woff" 
          fallbackFonts={[]}
        >
          KINDRED MATCHING: AI SHARED INTEREST & VALUE-ALIGNED COMMUNITY
        </Text>
      </group>
    </group>
  );
};

export default WorldSentaient;
