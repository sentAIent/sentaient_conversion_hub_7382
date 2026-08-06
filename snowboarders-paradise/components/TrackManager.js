import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

export function TrackManager() {
  const angle = 15 * (Math.PI / 180);
  const depth = 30000; // 30km track!
  const thickness = 100;
  const width = 800; // nice and wide

  // A dummy object representing the track's coordinate system
  // We use this to compute the world coordinates of everything on the track
  const trackCoord = useMemo(() => {
    const d = new THREE.Object3D();
    d.position.set(0, -5, 0); // Ground is slightly below player spawn
    d.rotation.set(-angle, 0, 0); // Tilt downhill towards -Z
    d.updateMatrixWorld();
    return d;
  }, [angle]);

  return (
    <group>
      <DownhillSlope trackCoord={trackCoord} width={width} depth={depth} />
      
      {/* Obstacles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Kicker key={`kicker-${i}`} trackCoord={trackCoord} index={i} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <GrindRail key={`rail-${i}`} trackCoord={trackCoord} index={i} />
      ))}

      {/* Trees scattered around the top edges of the halfpipe */}
      <InstancedTrees trackCoord={trackCoord} count={300} width={width} />
    </group>
  );
}

import { useTrimesh } from '@react-three/cannon';

function DownhillSlope({ trackCoord, width, depth }) {
  const snowTexture = useLoader(THREE.TextureLoader, require('../assets/snow_texture.jpg'));
  
  // Create seamless repetition
  const tex = snowTexture.clone();
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(20, 200);

  const { geo, vertices, indices } = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, depth, 32, 600);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      let z = 0;
      
      // 1. Natural Halfpipe Shape to keep player on track
      const centerDist = Math.abs(x);
      if (centerDist > 150) {
        z += Math.pow(centerDist - 150, 1.3) * 0.4;
      }
      
      // 2. Procedural Bumps and Moguls
      z += Math.sin(y * 0.05) * 2 * Math.cos(x * 0.05);
      z += Math.sin(y * 0.01) * 8; // Large undulating hills
      
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    
    return {
      geo: g,
      vertices: g.attributes.position.array,
      indices: g.index.array
    };
  }, [width, depth]);

  const boxPos = useMemo(() => {
    const p = new THREE.Vector3(0, 0, -depth/2 + 2000); 
    p.applyMatrix4(trackCoord.matrixWorld);
    return [p.x, p.y, p.z];
  }, [trackCoord, depth]);

  const rot = useMemo(() => {
    const d = trackCoord.clone();
    d.rotateX(-Math.PI / 2); // PlaneGeometry is XY, rotate to lay flat
    return d.rotation.toArray().slice(0, 3);
  }, [trackCoord]);

  const [ref] = useTrimesh(() => ({
    args: [vertices, indices],
    position: boxPos,
    rotation: rot,
    material: { friction: 0.01, restitution: 0.1 }
  }));

  return (
    <mesh ref={ref} geometry={geo} receiveShadow>
      <meshStandardMaterial map={tex} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

function SideWall({ trackCoord, side, width, depth }) {
  const wallThickness = 100;
  const wallHeight = 400; // Tall walls so player can't jump out
  const boxPos = useMemo(() => {
    const xPos = side === 'left' ? -width/2 - wallThickness/2 : width/2 + wallThickness/2;
    const p = new THREE.Vector3(xPos, wallHeight/2, -depth/2 + 2000);
    p.applyMatrix4(trackCoord.matrixWorld);
    return [p.x, p.y, p.z];
  }, [trackCoord, side, width, depth]);

  const [ref] = useBox(() => ({
    type: 'Static',
    args: [wallThickness, wallHeight, depth],
    position: boxPos,
    rotation: trackCoord.rotation.toArray().slice(0, 3),
    material: { friction: 0.1, restitution: 0.5 }
  }));
  
  return (
    <mesh ref={ref} visible={false}>
      <boxGeometry args={[wallThickness, wallHeight, depth]} />
      <meshStandardMaterial color="#1f1e24" />
    </mesh>
  );
}

function Kicker({ trackCoord, index }) {
  const localZ = -400 - (index * 400); 
  const xPos = index % 3 === 0 ? 0 : (index % 2 === 0 ? -200 : 200);
  
  const boxPos = useMemo(() => {
    // Sink it slightly into the surface to guarantee no collision lip
    const p = new THREE.Vector3(xPos, 2, localZ);
    p.applyMatrix4(trackCoord.matrixWorld);
    return [p.x, p.y, p.z];
  }, [trackCoord, xPos, localZ]);

  const rot = useMemo(() => {
    const d = trackCoord.clone();
    d.rotateX(20 * Math.PI / 180); // Tilt up relative to the slope
    return d.rotation.toArray().slice(0, 3);
  }, [trackCoord]);

  const [ref] = useBox(() => ({
    type: 'Static',
    args: [60, 10, 80],
    position: boxPos,
    rotation: rot,
    material: { friction: 0.0, restitution: 0.2 } // 0 friction to prevent sticking
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[60, 10, 80]} />
      <meshStandardMaterial color="#00ffcc" emissive="#00aaff" emissiveIntensity={1.5} roughness={0.2} />
    </mesh>
  );
}

function GrindRail({ trackCoord, index }) {
  const localZ = -1000 - (index * 1200); 
  const xPos = index % 2 === 0 ? -80 : 80;
  
  const boxPos = useMemo(() => {
    const p = new THREE.Vector3(xPos, 8, localZ);
    p.applyMatrix4(trackCoord.matrixWorld);
    return [p.x, p.y, p.z];
  }, [trackCoord, xPos, localZ]);

  const rot = useMemo(() => {
    return trackCoord.rotation.toArray().slice(0, 3);
  }, [trackCoord]);

  // Cylinder args: radiusTop, radiusBottom, height
  const [ref] = useBox(() => ({
    type: 'Static',
    args: [3, 3, 200], // very long box for collision
    position: boxPos,
    rotation: rot,
    material: { friction: 0.0, restitution: 0.1 }
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[3, 3, 200]} />
      <meshStandardMaterial color="#ff0055" metalness={0.9} roughness={0.1} emissive="#ff0055" emissiveIntensity={1.0} />
    </mesh>
  );
}

function InstancedTrees({ trackCoord, count, width }) {
  const meshRef = useRef();
  
  // Make detailed trees using multiple overlapping cones
  const { treeGeo, treeMat } = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const c1 = new THREE.ConeGeometry(30, 80, 8);
    c1.translate(0, 40, 0);
    const c2 = new THREE.ConeGeometry(25, 60, 8);
    c2.translate(0, 80, 0);
    const c3 = new THREE.ConeGeometry(15, 40, 8);
    c3.translate(0, 110, 0);
    
    // Merge geometries (simplified for BufferGeometry without external libs, using groups)
    // Actually, InstancedMesh only takes one geometry. We can just use a taller, more detailed single cone,
    // or manually merge attributes. To keep it simple and high-performance without importing mergeBufferGeometries:
    const baseGeo = new THREE.ConeGeometry(25, 120, 12);
    baseGeo.translate(0, 60, 0); // origin at base
    
    const mat = new THREE.MeshStandardMaterial({ color: '#092518', roughness: 0.9, metalness: 0 });
    return { treeGeo: baseGeo, treeMat: mat };
  }, []);
  
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const localZ = -500 - (i * (30000 / count)); 
      const side = i % 2 === 0 ? 1 : -1;
      
      // Place trees specifically on the high edges of the halfpipe
      const xPos = side * (250 + Math.random() * 100); 
      
      const centerDist = Math.abs(xPos);
      let zOffset = 0;
      if (centerDist > 150) zOffset = Math.pow(centerDist - 150, 1.3) * 0.4;
      
      const p = new THREE.Vector3(xPos, zOffset - 5, localZ);
      p.applyMatrix4(trackCoord.matrixWorld);
      
      dummy.position.copy(p);
      dummy.rotation.copy(trackCoord.rotation);
      
      const s = 1.0 + Math.random() * 1.5;
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [trackCoord, count, width]);

  return (
    <instancedMesh ref={meshRef} args={[treeGeo, treeMat, count]} castShadow receiveShadow />
  );
}
