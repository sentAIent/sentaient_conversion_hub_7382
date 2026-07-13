import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const DigitalFire = ({ position }) => {
  const meshRef = useRef();
  const scroll = useScroll();
  const [fireTex, setFireTex] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load('/assets/images/digital_fire.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setFireTex(tex);
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const globalProgress = scroll.offset;
      const localProgress = THREE.MathUtils.clamp((globalProgress - 0.20) / 0.08, 0, 1);
      const thawFactor = THREE.MathUtils.smoothstep(localProgress, 0.2, 0.8);
      
      meshRef.current.material.opacity = thawFactor * 0.9;
      // Pulse scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  if (!fireTex) return null;

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh ref={meshRef} position={[0, 20, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial 
            map={fireTex} 
            transparent={true} 
            opacity={0} 
            depthWrite={false} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      </Billboard>
    </group>
  );
};

export default DigitalFire;
