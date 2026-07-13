import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WormholeGlass = ({ startZ, endZ, cameraZ }) => {
  const meshRef = useRef();
  
  // Create 1000 glass shards scattered along a cylinder/tunnel shape
  const shardCount = 1000;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const shards = useMemo(() => {
    const arr = [];
    const length = startZ - endZ;
    for (let i = 0; i < shardCount; i++) {
      // Cylinder distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 30; // Tunnel width
      const z = startZ - Math.random() * length;
      
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;
      
      const s = 1 + Math.random() * 5;
      
      // Random rotation speed
      const rotSpeed = (Math.random() - 0.5) * 2.0;

      arr.push({ x, y, z, rx, ry, rz, s, rotSpeed });
    }
    return arr;
  }, [startZ, endZ]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    shards.forEach((shard, i) => {
      dummy.position.set(shard.x, shard.y, shard.z);
      // Spin the shards over time
      dummy.rotation.set(
        shard.rx + time * shard.rotSpeed,
        shard.ry + time * shard.rotSpeed * 0.5,
        shard.rz + time * shard.rotSpeed * 0.2
      );
      dummy.scale.setScalar(shard.s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, shardCount]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#aaddff"
        metalness={0.8}
        roughness={0.2}
        transparent={true}
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

export default WormholeGlass;
