import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CarveTrail({ playerPos, carvingIntensity, boostActive }) {
  const MAX_POINTS = 50;
  const points = useRef(new Array(MAX_POINTS).fill(null).map(() => new THREE.Vector3(0, -1000, 0)));
  const geoRef = useRef();

  const sprayCount = 100;
  const sprayGeo = useRef();
  const sprayData = useMemo(() => new Array(sprayCount).fill(0).map(() => ({
    pos: new THREE.Vector3(0, -1000, 0),
    vel: new THREE.Vector3(0, 0, 0),
    life: 0
  })), []);

  useFrame((state, dt) => {
    // Line trail
    if (carvingIntensity.current > 5 || boostActive) {
      for (let i = MAX_POINTS - 1; i > 0; i--) {
        points.current[i].copy(points.current[i - 1]);
      }
      points.current[0].copy(playerPos.current);
      points.current[0].y += 0.2;
      
      if (geoRef.current) geoRef.current.setFromPoints(points.current);

      // Particle spray
      for (let i=0; i<sprayCount; i++) {
        if (sprayData[i].life <= 0) {
          sprayData[i].life = 0.5 + Math.random() * 0.5;
          sprayData[i].pos.copy(playerPos.current);
          sprayData[i].pos.y += 0.2;
          sprayData[i].vel.set(
            boostActive ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * carvingIntensity.current,
            boostActive ? Math.random() * 8 : Math.random() * 5,
            boostActive ? (Math.random() - 0.5) * 15 : (Math.random() - 0.5) * carvingIntensity.current
          );

          break; // spawn 1 per frame
        }
      }
    }

    // Update spray particles
    if (!sprayGeo.current || !sprayGeo.current._positions) sprayGeo.current._positions = new Float32Array(sprayCount * 3);
    const positions = sprayGeo.current._positions;
    for (let i=0; i<sprayCount; i++) {
      if (sprayData[i].life > 0) {
        sprayData[i].life -= dt;
        sprayData[i].pos.addScaledVector(sprayData[i].vel, dt);
        sprayData[i].vel.y -= 9.8 * dt; // gravity
        positions[i*3] = sprayData[i].pos.x;
        positions[i*3+1] = sprayData[i].pos.y;
        positions[i*3+2] = sprayData[i].pos.z;
      } else {
        positions[i*3+1] = -1000;
      }
    }
    if (sprayGeo.current) {
      sprayGeo.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      sprayGeo.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <line>
        <bufferGeometry ref={geoRef} />
        <lineBasicMaterial color={boostActive ? "#00ffff" : "#aaddff"} linewidth={3} transparent opacity={0.8} />
      </line>
      <points>
        <bufferGeometry ref={sprayGeo} />
        <pointsMaterial color={boostActive ? "#00ffff" : "#ffffff"} size={boostActive ? 1.2 : 0.6} transparent opacity={0.9} />
      </points>
    </group>
  );
}
