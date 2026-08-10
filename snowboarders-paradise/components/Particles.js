import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 150;

export function SnowParticles({ playerPosRef, carvingAmountRef, isLandedRef }) {
  const meshRef = useRef();
  
  const particles = useMemo(() => {
    return Array(PARTICLE_COUNT).fill(0).map(() => ({
      position: new THREE.Vector3(0, -1000, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      life: 0,
      active: false,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastLanded = useRef(true);

  useFrame((state, delta) => {
    if (!meshRef.current || !playerPosRef.current) return;

    const isLanded = isLandedRef.current;
    const carvingAmount = carvingAmountRef.current;

    // Trigger burst on landing
    if (isLanded && !lastLanded.current) {
      for (let i = 0; i < 30; i++) {
        const p = particles.find(p => !p.active);
        if (p) {
          p.active = true;
          p.life = 1.0;
          p.position.copy(playerPosRef.current).add(new THREE.Vector3((Math.random()-0.5)*2, 0, (Math.random()-0.5)*2));
          p.velocity.set((Math.random()-0.5)*15, Math.random()*10 + 5, (Math.random()-0.5)*15);
        }
      }
    }
    lastLanded.current = isLanded;

    // Constant spray when carving
    if (Math.abs(carvingAmount) > 0.5 && isLanded) {
      for (let i = 0; i < 3; i++) {
        const p = particles.find(p => !p.active);
        if (p) {
          p.active = true;
          p.life = 1.0;
          const sprayDirX = carvingAmount > 0 ? -1 : 1;
          p.position.copy(playerPosRef.current).add(new THREE.Vector3(sprayDirX * 0.5, 0.1, 0));
          p.velocity.set(sprayDirX * (5 + Math.random()*5), Math.random()*5 + 2, Math.random()*5);
        }
      }
    }

    particles.forEach((p, i) => {
      if (p.active) {
        p.life -= delta * 1.5;
        if (p.life <= 0) {
          p.active = false;
          p.position.set(0, -1000, 0);
        } else {
          p.velocity.y -= 15 * delta; // Gravity
          p.position.add(p.velocity.clone().multiplyScalar(delta));
          const scale = p.life * 0.5;
          dummy.position.copy(p.position);
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}
