import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text, useCursor } from '@react-three/drei';

export default function AIGreeter({ position, onEngage }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered, 'pointer', 'auto');

  useFrame((state) => {
    // Gentle floating animation to mimic breathing/idle state
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 2;
    }
  });

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group ref={meshRef} 
               onClick={onEngage}
               onPointerOver={() => setHovered(true)}
               onPointerOut={() => setHovered(false)}>
          {/* Placeholder for the sprite-gen extracted atlas plane */}
          <mesh>
            <planeGeometry args={[20, 40]} />
            <meshStandardMaterial color={hovered ? "#00ffff" : "#0044ff"} transparent opacity={0.8} />
          </mesh>
          <Text position={[0, 25, 0]} fontSize={4} color="white" anchorX="center" anchorY="bottom">
            AI Maître d'
          </Text>
          {hovered && (
            <Text position={[0, -25, 0]} fontSize={3} color="#00ffff" anchorX="center" anchorY="top">
              Click to request a Guide
            </Text>
          )}
        </group>
      </Billboard>
    </group>
  );
}
