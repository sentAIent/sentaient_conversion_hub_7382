import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

export function Unit({ id, type, x, y, targetX, targetY, ownerId, isSelected }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        
        // Simple lerp to target position for smooth network movement
        const targetPos = new Vector3(targetX, 0.5, targetY);
        meshRef.current.position.lerp(targetPos, 0.1);
    });

    const color = isSelected ? 'yellow' : (ownerId === 'opponent' ? 'red' : 'blue');

    return (
        <mesh 
            ref={meshRef}
            position={[x, 0.5, y]}
            castShadow
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}
