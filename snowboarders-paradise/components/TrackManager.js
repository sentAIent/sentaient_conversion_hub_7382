import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { getTerrainHeight, getObstacleData } from '../utils/terrainUtils';

const CHUNK_SIZE = 1000;
const CHUNK_WIDTH = 800;
const CHUNK_RESOLUTION_X = 32;
const CHUNK_RESOLUTION_Z = 64;
const VISIBLE_CHUNKS = 5;

const createSnowMaterial = () => {
  return new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.8,
    metalness: 0.1,
  });
};

const snowMaterial = createSnowMaterial();

function Trees({ instances }) {
  const meshRef = useRef();
  
  const { treeGeo, treeMat } = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0, 30, 150, 16, 20);
    geo.translate(0, 75, 0);
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0 && y < 140) {
        const layer = y % 20;
        if (layer < 10) {
          pos.setX(i, pos.getX(i) * 1.2);
          pos.setZ(i, pos.getZ(i) * 1.2);
        }
      }
    }
    geo.computeVertexNormals();
    
    const mat = new THREE.MeshStandardMaterial({ 
      color: '#082211', 
      roughness: 0.9, 
      metalness: 0.0,
    });
    return { treeGeo: geo, treeMat: mat };
  }, []);
  
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    
    instances.forEach((inst, i) => {
      dummy.position.set(...inst.position);
      dummy.rotation.set(0, Math.random() * Math.PI, 0);
      dummy.scale.set(inst.scale, inst.scale, inst.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instances]);
  
  return (
    <instancedMesh ref={meshRef} args={[treeGeo, treeMat, instances.length]} castShadow receiveShadow />
  );
}

function Kickers({ instances }) {
  const meshRef = useRef();
  const kickerGeo = useMemo(() => new THREE.BoxGeometry(60, 10, 80), []);
  const kickerMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#664422", 
    roughness: 0.8, 
    metalness: 0.1 
  }), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    
    instances.forEach((inst, i) => {
      dummy.position.set(...inst.position);
      dummy.rotation.set(20 * (Math.PI / 180), inst.rotationY, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instances]);

  return (
    <instancedMesh ref={meshRef} args={[kickerGeo, kickerMat, instances.length]} castShadow receiveShadow />
  );
}

function TerrainChunk({ zOffset }) {
  const { geometry, treeData, kickerData } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(CHUNK_WIDTH, CHUNK_SIZE, CHUNK_RESOLUTION_X, CHUNK_RESOLUTION_Z);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, zOffset);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zWorld = pos.getZ(i); 
      
      const y = getTerrainHeight(x, zWorld);
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    
    const trees = [];
    const kickers = [];
    
    for (let ox = -CHUNK_WIDTH/2; ox <= CHUNK_WIDTH/2; ox += 30) {
      for (let oz = zOffset - CHUNK_SIZE/2; oz <= zOffset + CHUNK_SIZE/2; oz += 30) {
        const obs = getObstacleData(ox, oz);
        if (obs) {
          const oy = getTerrainHeight(ox, oz);
          if (obs.type === 'tree') {
            trees.push({ position: [ox, oy, oz], scale: obs.scale });
          } else if (obs.type === 'kicker') {
            kickers.push({ position: [ox, oy, oz], rotationY: obs.rotationY });
          }
        }
      }
    }
    
    return { geometry: geo, treeData: trees, kickerData: kickers };
  }, [zOffset]);
  
  return (
    <group>
      <mesh geometry={geometry} material={snowMaterial} receiveShadow castShadow />
      {treeData.length > 0 && <Trees instances={treeData} />}
      {kickerData.length > 0 && <Kickers instances={kickerData} />}
    </group>
  );
}

export function TrackManager() {
  const [activeChunks, setActiveChunks] = useState([]);
  const { camera } = useThree();
  const lastUpdateZ = useRef(0);
  const snowParticles = useRef();

  const snowGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i+=3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i+1] = (Math.random() - 0.5) * 40;
      positions[i+2] = (Math.random() - 0.5) * 100;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const currentZ = state.camera.position.z;
    
    if (snowParticles.current) {
      snowParticles.current.position.set(state.camera.position.x, state.camera.position.y, state.camera.position.z - 20);
      const positions = snowParticles.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.2; 
        if (positions[i] < -20) positions[i] = 20;
      }
      snowParticles.current.geometry.attributes.position.needsUpdate = true;
    }

    if (Math.abs(currentZ - lastUpdateZ.current) > CHUNK_SIZE / 4 || activeChunks.length === 0) {
      lastUpdateZ.current = currentZ;
      const currentChunkIndex = Math.floor(currentZ / CHUNK_SIZE);
      
      const newChunks = [];
      for (let i = -1; i < VISIBLE_CHUNKS; i++) {
        const chunkZOffset = (currentChunkIndex - i) * CHUNK_SIZE;
        newChunks.push(chunkZOffset);
      }
      
      setActiveChunks(newChunks);
    }
  });

  return (
    <group>
      <points ref={snowParticles}>
        <bufferGeometry attach="geometry" {...snowGeo} />
        <pointsMaterial attach="material" size={0.3} color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      {activeChunks.map((zOffset) => (
        <TerrainChunk key={zOffset} zOffset={zOffset} />
      ))}
    </group>
  );
}
