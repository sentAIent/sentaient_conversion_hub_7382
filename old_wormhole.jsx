import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Layout for "CQ" made of candlesticks
const getCQLayout = () => {
  const points = [];
  const addCandle = (x, y, color) => {
    points.push({ x, y, z: 0, rot: [Math.PI / 2, 0, 0], color, bodyHeight: 40 + Math.random() * 40 });
  };
  
  // "C" shape
  for (let a = Math.PI * 0.25; a < Math.PI * 1.75; a += 0.2) {
    addCandle( -100 + Math.cos(a) * 80, Math.sin(a) * 80, "#00ff00" );
  }
  
  // "Q" shape (O part)
  for (let a = 0; a < Math.PI * 2; a += 0.2) {
    addCandle( 100 + Math.cos(a) * 80, Math.sin(a) * 80, "#ff0044" );
  }
  // "Q" tail
  addCandle( 140, -40, "#ff0044" );
  addCandle( 160, -60, "#ff0044" );
  addCandle( 180, -80, "#ff0044" );
  
  return points;
};

const WormholeContango = ({ position, rotation = [0, 0, 0], length = 6000, radius = 250, visible }) => {
  const groupRef = useRef();
  const wickMeshRef = useRef();
  const bodyMeshRef = useRef();
  
  // Load the Contango image logo
  const logoTexture = useLoader(THREE.TextureLoader, '/assets/images/contango_logo.png');

  // Compute all candlesticks data (tunnel + CQ logo)
  const allCandles = useMemo(() => {
    const items = [];
    const count = Math.floor(length / 5); 
    
    // 1. The Tunnel
    for (let i = 0; i < count; i++) {
      const z = -(i / count) * length;
      const t = i * 0.1;
      
      const x1 = Math.cos(t) * radius;
      const y1 = Math.sin(t) * radius;
      
      const x2 = Math.cos(t + Math.PI) * radius;
      const y2 = Math.sin(t + Math.PI) * radius;

      const isBull = Math.random() > 0.5;
      const color = isBull ? "#00ff00" : "#ff0044";
      const bodyHeight = 20 + Math.random() * 60;
      
      const rot1 = [0, 0, t + Math.PI / 2];
      const rot2 = [0, 0, t + Math.PI + Math.PI / 2];

      items.push({ x: x1, y: y1, z, rot: rot1, color, bodyHeight });
      items.push({ x: x2, y: y2, z, rot: rot2, color, bodyHeight });
    }
    
    // 2. The CQ Logo at the end of the tunnel
    const cqLayout = getCQLayout();
    cqLayout.forEach(cq => {
      items.push({
        x: cq.x,
        y: cq.y,
        z: -length - 500,
        rot: cq.rot,
        color: cq.color,
        bodyHeight: cq.bodyHeight
      });
    });

    return items;
  }, [length, radius]);

  const totalCount = allCandles.length;

  useEffect(() => {
    if (!wickMeshRef.current || !bodyMeshRef.current) return;
    
    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();
    
    for (let i = 0; i < totalCount; i++) {
      const c = allCandles[i];
      
      // Position and Rotation
      tempObject.position.set(c.x, c.y, c.z);
      tempObject.rotation.set(c.rot[0], c.rot[1], c.rot[2]);
      
      // Wick Matrix
      tempObject.scale.set(1, c.bodyHeight + 40, 1);
      tempObject.updateMatrix();
      wickMeshRef.current.setMatrixAt(i, tempObject.matrix);
      tempColor.set(c.color);
      wickMeshRef.current.setColorAt(i, tempColor);
      
      // Body Matrix
      tempObject.scale.set(1, c.bodyHeight, 1);
      tempObject.updateMatrix();
      bodyMeshRef.current.setMatrixAt(i, tempObject.matrix);
      bodyMeshRef.current.setColorAt(i, tempColor);
    }
    
    wickMeshRef.current.instanceMatrix.needsUpdate = true;
    if (wickMeshRef.current.instanceColor) wickMeshRef.current.instanceColor.needsUpdate = true;
    
    bodyMeshRef.current.instanceMatrix.needsUpdate = true;
    if (bodyMeshRef.current.instanceColor) bodyMeshRef.current.instanceColor.needsUpdate = true;
  }, [allCandles, totalCount]);

  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      <group ref={groupRef}>
        <instancedMesh ref={wickMeshRef} args={[null, null, totalCount]}>
          <cylinderGeometry args={[2, 2, 1, 8]} />
          <meshStandardMaterial roughness={0.4} emissiveIntensity={0.2} />
        </instancedMesh>
        
        <instancedMesh ref={bodyMeshRef} args={[null, null, totalCount]}>
          <boxGeometry args={[10, 1, 10]} />
          <meshStandardMaterial roughness={0.4} emissiveIntensity={0.8} />
        </instancedMesh>
      </group>
      
      {/* 2D Image texture floating in the middle of CQ */}
      <mesh position={[0, 0, -length - 500]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial map={logoTexture} transparent={true} />
      </mesh>
      
      {/* Central glow */}
      <mesh position={[0, 0, -length / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius * 0.8, radius * 0.8, length, 32, 1, true]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

export default WormholeContango;
