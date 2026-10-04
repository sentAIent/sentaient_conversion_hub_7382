import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PowderSpray({ active }) {
  const count = 200;
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.2 + 0.1,
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 0.5,
        z: (Math.random() - 0.5) * 2,
        life: Math.random()
      });
    }
    return temp;
  }, [count]);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      if (active) {
        particle.life += dt * 3.0 * particle.speed;
        if (particle.life > 1) {
          particle.life = 0;
          particle.x = (Math.random() - 0.5) * 1.5;
          particle.y = Math.random() * 0.2;
          particle.z = Math.random() * 0.5 - 1.0; // spray behind
        }
      } else {
        particle.life += dt * 3.0;
        if (particle.life > 1) particle.life = 1.1; // stay dead
      }

      if (particle.life <= 1) {
        const scale = (1 - particle.life) * particle.factor * 0.8;
        dummy.position.set(
          particle.x + (Math.random()-0.5)*0.2 * particle.life,
          particle.y + particle.life * 2.0, // rise up
          particle.z - particle.life * 4.0  // shoot back
        );
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.3, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} depthWrite={false} />
    </instancedMesh>
  );
}
