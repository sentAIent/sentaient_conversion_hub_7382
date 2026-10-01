import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export default function HumanGuide({ position, isLocal, name }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Teleportation spawn effect
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.opacity = 0;
    }
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current && materialRef.current.opacity < 1) {
      materialRef.current.opacity += delta * 2;
    }
    // Subtle float
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 1.5;
    }
  });

  return (
    <group position={position}>
      <Billboard follow={true}>
        <group ref={meshRef}>
          {/* Hologram aesthetic for human guide */}
          <mesh>
            <planeGeometry args={[20, 40]} />
            <meshBasicMaterial 
              ref={materialRef}
              color={isLocal ? "#00ff88" : "#ff8800"} 
              transparent 
              opacity={0} 
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
          <Text position={[0, 25, 0]} fontSize={4} color="white" anchorX="center" anchorY="bottom">
            {name || "Human Guide"}
          </Text>
          <Html position={[0, -25, 0]} center>
            <div className="px-3 py-1 bg-black bg-opacity-70 text-white rounded-full text-xs font-mono border border-green-500 whitespace-nowrap">
              {isLocal ? "You (Guide)" : "Live Guide Connected"}
            </div>
          </Html>
        </group>
      </Billboard>
    </group>
  );
}
