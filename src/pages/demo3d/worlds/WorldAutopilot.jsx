import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const DataPipeline = ({ position, rotation, speed }) => {
  const lineRef = useRef();
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1000, 0, 0),
      new THREE.Vector3(-500, Math.random() * 200 - 100, Math.random() * 200 - 100),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(500, Math.random() * 200 - 100, Math.random() * 200 - 100),
      new THREE.Vector3(1000, 0, 0),
    ]);
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 4, 8, false), [curve]);
  
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.map.offset.x -= speed;
    }
  });

  const tex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 256, 16);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(0, 0, 32, 16);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(128, 0, 32, 16);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={tubeGeo}>
        <meshBasicMaterial ref={materialRef} map={tex} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Outer Glass Tube */}
      <mesh geometry={tubeGeo}>
        <meshPhysicalMaterial 
          transparent
          opacity={0.3}
          roughness={0.1}
          transmission={0.9}
          thickness={5}
          color="#0044ff"
        />
      </mesh>
    </group>
  );
};

const AICore = ({ position }) => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.05);
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x += delta * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 1.2;
      ringRef1.current.rotation.y += delta * 0.8;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x -= delta * 0.9;
      ringRef2.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Center Brain */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[100, 2]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={2} wireframe />
      </mesh>
      <pointLight intensity={5} color="#00ffff" distance={1000} />
      
      {/* Processing Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[150, 4, 16, 64]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ringRef2}>
        <torusGeometry args={[200, 2, 16, 64]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const WorldAutopilot = ({ position, rotation, visible }) => {
  const scroll = useScroll();
  const [hasLocked, setHasLocked] = useState(false);

  useFrame(() => {
    if (!visible) return;
    
    // Trigger scroll lock for Autopilot
    if (scroll.offset > 0.675 && scroll.offset < 0.69 && !hasLocked && !window.autopilotLocked) {
      window.autopilotLocked = true;
      setHasLocked(true);
      
      setTimeout(() => {
        window.autopilotLocked = false;
      }, 1500);
    }
    
    if ((scroll.offset < 0.65 || scroll.offset > 0.70) && hasLocked) {
      setHasLocked(false);
      window.autopilotLocked = false;
    }
  });

  const pipelines = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800],
      rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: 0.01 + Math.random() * 0.04
    }));
  }, []);

  return (
    <group visible={visible} position={position} rotation={rotation}>
      <ambientLight intensity={0.5} />
      
      {/* Factory Void Background */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[3000, 32, 32]} />
        <meshBasicMaterial color="#050510" side={THREE.BackSide} />
      </mesh>

      <AICore position={[0, -200, -800]} />
      
      {pipelines.map((p, i) => (
        <DataPipeline key={i} position={p.pos} rotation={p.rot} speed={p.speed} />
      ))}

      {/* Holographic Dashboard Panels */}
      {[[-600, 200, -600], [600, 100, -700], [0, 300, -1000], [-400, -300, -500], [400, -200, -600]].map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={1} position={pos}>
          <mesh rotation={[0, pos[0] > 0 ? -Math.PI/6 : Math.PI/6, 0]}>
            <planeGeometry args={[300, 200]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.1} wireframe />
          </mesh>
          <mesh rotation={[0, pos[0] > 0 ? -Math.PI/6 : Math.PI/6, 0]} position={[0, 0, 2]}>
            <planeGeometry args={[280, 180]} />
            <meshPhysicalMaterial 
              transparent
              transmission={0.9}
              roughness={0.1}
              thickness={2} 
              color="#001133" 
            />
          </mesh>
        </Float>
      ))}

      {/* Title Hologram & Logo */}
      <group position={[0, 300, -600]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={1}>
          <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -50, 0]} fontSize={70} color="#00ffff" anchorX="center" anchorY="middle" outlineWidth={2} outlineColor="#004488">
              AUTOPILOT
          </Text>
          <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -120, 0]} fontSize={28} color="#ffffff" anchorX="center" anchorY="middle">
              Autonomous Business Agent
          </Text>
        </Float>
      </group>
    </group>
  );
};

export default WorldAutopilot;
