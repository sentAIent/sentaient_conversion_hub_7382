import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataVisualizer3D = ({ position, rotation, visible }) => {
  const pointsRef = useRef();

  // Generate a mock 3D scatter plot of asset correlations
  const particlesCount = 500;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Create a swirling galaxy / surface effect to represent quantitative data
      const t = i / particlesCount;
      const angle = t * Math.PI * 20;
      const radius = 50 + t * 400;
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 200 * (1 - t);
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 50;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      // Color gradient from cyan to magenta based on radius/correlation
      const color = new THREE.Color();
      color.setHSL(0.5 + t * 0.3, 1.0, 0.6);
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [particlesCount]);

  useFrame((state) => {
    if (!visible) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} visible={visible}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particlesCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={8}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Grid helper to ground the visualization */}
      <gridHelper args={[1000, 20, '#ffffff', '#0044ff']} position={[0, -150, 0]} />
    </group>
  );
};

export default DataVisualizer3D;
