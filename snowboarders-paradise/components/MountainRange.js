import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { Html } from '@react-three/drei';
import { useUnits } from './UnitContext';
import { useFrame } from '@react-three/fiber';

// We create a single global noise instance so both the mountain mesh and the player physics use the exact same terrain
export const sharedNoise2D = createNoise2D();

// --- MOUNTAIN REGIONS DATA ---
export const REGIONS = {
  ALASKA: {
    name: 'Valdez',
    snowLine: -10,
    steepThreshold: 0.3,
    noiseLayers: [
      { frequency: 0.004, amplitude: 125 },
      { frequency: 0.01, amplitude: 50 },
      { frequency: 0.04, amplitude: 10 },
    ],
    peaks: [
      { id: 'p1', name: 'Meteorite Peak', elevation: 2154, condition: 'Powder' }
    ]
  },
  JAPAN: {
    name: 'Hokkaido',
    snowLine: -20, 
    steepThreshold: 0.4,
    noiseLayers: [
      { frequency: 0.006, amplitude: 75 },
      { frequency: 0.02, amplitude: 25 },
      { frequency: 0.1, amplitude: 5 },
    ],
    peaks: [
      { id: 'p1', name: 'Mt. Yotei', elevation: 1898, condition: 'Deep Powder' }
    ]
  },
  SWITZERLAND: {
    name: 'Zermatt',
    snowLine: -5,
    steepThreshold: 0.25,
    noiseLayers: [
      { frequency: 0.003, amplitude: 175 },
      { frequency: 0.016, amplitude: 60 },
      { frequency: 0.06, amplitude: 15 },
    ],
    peaks: [
      { id: 'p1', name: 'Matterhorn', elevation: 4478, condition: 'Packed' }
    ]
  }
};

export const getElevationForRegion = (x, z, regionId) => {
  const config = REGIONS[regionId];
  if (!config) return 0;
  
  let baseNoiseY = 0;
  config.noiseLayers.forEach(layer => {
    baseNoiseY += sharedNoise2D(x * layer.frequency, z * layer.frequency) * layer.amplitude;
  });
  
  // SSX Endless Canyon Track
  // Carve a winding path down the center
  const pathCenterX = Math.sin(z * 0.005) * 100 + Math.sin(z * 0.02) * 20;
  const distFromPath = Math.abs(x - pathCenterX);
  
  let finalY = baseNoiseY;
  
  // The canyon is 100 meters wide (distFromPath < 50)
  if (distFromPath < 50) {
    // Trench shape: U shape. 0 at center, growing to 50 at the edges
    const trenchHeight = Math.pow(distFromPath / 50, 2) * 50; 
    
    // Constant downhill slope
    const pathBaseY = z * 0.2; // z is negative downhill
    
    // Smooth blend between track and rugged mountain
    const blend = Math.pow(distFromPath / 50, 2); 
    finalY = THREE.MathUtils.lerp(pathBaseY + trenchHeight, baseNoiseY, blend);
    
    // Inject kickers ONLY inside the track
    const kickerNoise = sharedNoise2D(x * 0.01, z * 0.01);
    if (kickerNoise > 0.5) {
      const intensity = (kickerNoise - 0.5) * 2; 
      const modZ = (z % 120 + 120) % 120;
      if (modZ < 40) {
        finalY += Math.pow(modZ / 40, 2) * 15 * intensity; 
      } else if (modZ < 50) {
        finalY += (50 - modZ) / 10 * 15 * intensity;
      }
    }
  }

  return finalY;
};

function TreeInstanced({ regionId }) {
  const trunkRef = useRef();
  const leaf1Ref = useRef();
  const leaf2Ref = useRef();
  const snowRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const { trunkGeo, leaf1Geo, leaf2Geo, snowGeo } = useMemo(() => {
    const tg = new THREE.CylinderGeometry(0.2, 0.3, 2);
    tg.translate(0, 1, 0);
    const l1 = new THREE.ConeGeometry(1.5, 4, 8);
    l1.translate(0, 3, 0);
    const l2 = new THREE.ConeGeometry(1.2, 3, 8);
    l2.translate(0, 4.5, 0);
    const sn = new THREE.ConeGeometry(0.8, 2, 8);
    sn.translate(0, 6, 0);
    return { trunkGeo: tg, leaf1Geo: l1, leaf2Geo: l2, snowGeo: sn };
  }, []);

  useFrame((state) => {
     if (!trunkRef.current) return;
     const cx = Math.round(state.camera.position.x / 10) * 10;
     const cz = Math.round(state.camera.position.z / 10) * 10;
     
     if (trunkRef.current.userData.lastX === cx && trunkRef.current.userData.lastZ === cz) return;
     trunkRef.current.userData.lastX = cx;
     trunkRef.current.userData.lastZ = cz;
     
     let instanceIdx = 0;
     const config = REGIONS[regionId];
     
     // 40x40 grid = 1600 potential trees
     for(let i = -20; i < 20; i++) {
       for(let j = -20; j < 20; j++) {
          const x = cx + i * 10;
          const z = cz + j * 10;
          const pathCenterX = Math.sin(z * 0.005) * 100 + Math.sin(z * 0.02) * 20;
          const distFromPath = Math.abs(x - pathCenterX);
          const placement = sharedNoise2D(x * 0.1, z * 0.1);
          
          // Only spawn trees OUTSIDE the track (distFromPath > 55)
          if (placement > 0.3 && distFromPath > 55) {
             const y = getElevationForRegion(x, z, regionId) - 5; // offset mountain
             const yX = getElevationForRegion(x + 0.1, z, regionId) - 5;
             const yZ = getElevationForRegion(x, z + 0.1, regionId) - 5;
             const v1 = new THREE.Vector3(0.1, yX - y, 0);
             const v2 = new THREE.Vector3(0, yZ - y, 0.1);
             const normal = new THREE.Vector3().crossVectors(v2, v1).normalize();
             
             if (y > -5000 && y < config.snowLine + 30 && normal.y > 0.8) {
                dummy.position.set(x, y, z);
                dummy.scale.setScalar(0.3 + (placement * 0.2));
                dummy.updateMatrix();
                
                trunkRef.current.setMatrixAt(instanceIdx, dummy.matrix);
                leaf1Ref.current.setMatrixAt(instanceIdx, dummy.matrix);
                leaf2Ref.current.setMatrixAt(instanceIdx, dummy.matrix);
                snowRef.current.setMatrixAt(instanceIdx, dummy.matrix);
                instanceIdx++;
             }
          }
       }
     }
     
     dummy.position.set(0, -1000, 0);
     dummy.updateMatrix();
     for(let i = instanceIdx; i < 1600; i++) {
        trunkRef.current.setMatrixAt(i, dummy.matrix);
        leaf1Ref.current.setMatrixAt(i, dummy.matrix);
        leaf2Ref.current.setMatrixAt(i, dummy.matrix);
        snowRef.current.setMatrixAt(i, dummy.matrix);
     }
     
     trunkRef.current.instanceMatrix.needsUpdate = true;
     leaf1Ref.current.instanceMatrix.needsUpdate = true;
     leaf2Ref.current.instanceMatrix.needsUpdate = true;
     snowRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <group>
      <instancedMesh ref={trunkRef} args={[trunkGeo, null, 1600]}>
        <meshStandardMaterial color="#3d2817" />
      </instancedMesh>
      <instancedMesh ref={leaf1Ref} args={[leaf1Geo, null, 1600]}>
        <meshStandardMaterial color="#2d4c1e" />
      </instancedMesh>
      <instancedMesh ref={leaf2Ref} args={[leaf2Geo, null, 1600]}>
        <meshStandardMaterial color="#385e26" />
      </instancedMesh>
      <instancedMesh ref={snowRef} args={[snowGeo, null, 1600]}>
        <meshStandardMaterial color="#ffffff" />
      </instancedMesh>
    </group>
  );
}

function GateInstanced({ regionId }) {
  const gateRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const geo = useMemo(() => {
    const g = new THREE.TorusGeometry(8, 0.8, 8, 24);
    g.translate(0, 8, 0);
    return g;
  }, []);
  
  useFrame((state) => {
     if (!gateRef.current) return;
     const cx = Math.round(state.camera.position.x / 10) * 10;
     const cz = Math.round(state.camera.position.z / 10) * 10;
     if (gateRef.current.userData.lastX === cx && gateRef.current.userData.lastZ === cz) return;
     gateRef.current.userData.lastX = cx;
     gateRef.current.userData.lastZ = cz;
     
     let instanceIdx = 0;
     for(let j = -30; j < 10; j++) {
         const z = cz + j * 10;
         // spawn a gate every 200 units
         const modZ = Math.abs(z % 200);
         if (modZ < 5) {
             const pathCenterX = Math.sin(z * 0.005) * 100 + Math.sin(z * 0.02) * 20;
             const x = pathCenterX; // center of track
             const y = getElevationForRegion(x, z, regionId) - 5;
             
             dummy.position.set(x, y, z);
             // orient along path
             const pathDx = Math.cos(z * 0.005) * 100 * 0.005 + Math.cos(z * 0.02) * 20 * 0.02;
             dummy.rotation.y = Math.atan2(pathDx, 1);
             dummy.updateMatrix();
             gateRef.current.setMatrixAt(instanceIdx++, dummy.matrix);
         }
     }
     
     dummy.position.set(0, -1000, 0);
     dummy.updateMatrix();
     for(let i = instanceIdx; i < 50; i++) {
        gateRef.current.setMatrixAt(i, dummy.matrix);
     }
     gateRef.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={gateRef} args={[geo, null, 50]}>
      <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
    </instancedMesh>
  );
}

export function MountainRange({ regionId = 'ALASKA', arMode = false }) {
  const config = REGIONS[regionId];
  const { formatElevation } = useUnits();
  
  const meshRef = useRef();
  const [peakPosition, setPeakPosition] = useState(null);
  
  const { geometry } = useMemo(() => {
    // 500x500 plane with 128x128 segments = 16k vertices
    const geo = new THREE.PlaneGeometry(500, 500, 128, 128);
    geo.rotateX(-Math.PI / 2);
    
    const positions = geo.attributes.position.array;
    const baseCoords = new Float32Array(positions.length / 3 * 2); 
    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      baseCoords[j] = positions[i]; // x
      baseCoords[j + 1] = positions[i + 2]; // z
    }
    geo.setAttribute('baseCoord', new THREE.BufferAttribute(baseCoords, 2));
    
    const colors = new Float32Array(positions.length);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return { geometry: geo };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Infinite Treadmill effect
    const cellSize = 500 / 128; // ~3.9
    const cx = Math.round(state.camera.position.x / cellSize) * cellSize;
    const cz = Math.round(state.camera.position.z / cellSize) * cellSize;
    
    if (meshRef.current.userData.lastX === cx && meshRef.current.userData.lastZ === cz) {
       return;
    }
    meshRef.current.userData.lastX = cx;
    meshRef.current.userData.lastZ = cz;
    
    meshRef.current.position.set(cx, -5, cz); // -5 is the mountain base offset

    const positions = geometry.attributes.position.array;
    const baseCoords = geometry.attributes.baseCoord.array;
    const colors = geometry.attributes.color.array;
    
    const colorRock = new THREE.Color('#3b3a39');
    const colorSnow = new THREE.Color('#ffffff');
    const colorBase = new THREE.Color('#8b9bb4');
    
    // 1. Update Heights
    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
       const worldX = cx + baseCoords[j];
       const worldZ = cz + baseCoords[j + 1];
       positions[i + 1] = getElevationForRegion(worldX, worldZ, regionId);
    }
    
    // 2. Compute Normals for lighting and steepness
    geometry.computeVertexNormals();
    const normals = geometry.attributes.normal.array;
    
    // 3. Apply Colors based on slope and height
    for (let i = 0, j = 0; i < positions.length; i += 3, j++) {
       const y = positions[i + 1];
       const slope = normals[i + 1]; 
       const mixedColor = new THREE.Color();
       
       if (slope < config.steepThreshold) {
         mixedColor.copy(colorRock);
         if (y < config.snowLine) mixedColor.lerp(new THREE.Color('#222222'), 0.5);
       } else {
         if (y > config.snowLine) {
           mixedColor.copy(colorSnow);
         } else {
           const blend = Math.max(0, y / config.snowLine);
           mixedColor.copy(colorBase).lerp(colorSnow, blend);
         }
       }
       
       colors[i] = mixedColor.r;
       colors[i + 1] = mixedColor.g;
       colors[i + 2] = mixedColor.b;
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    
    // Update peak position for AR
    if (arMode && config.peaks.length > 0) {
       const peakZ = cz - 200; // Place peak far ahead
       const peakX = cx;
       const peakY = getElevationForRegion(peakX, peakZ, regionId) - 5;
       setPeakPosition([peakX, peakY + 10, peakZ]);
    }
  });

  return (
    <group>
      {/* Infinite Visual Terrain */}
      <mesh ref={meshRef} name="mountain" geometry={geometry} receiveShadow>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.8} 
          metalness={0.1}
          flatShading
        />
      </mesh>
      
      {/* Infinite Trees */}
      <TreeInstanced regionId={regionId} />
      
      {/* Speed Gates */}
      <GateInstanced regionId={regionId} />
      
      {/* AR Overlays */}
      {arMode && config.peaks && peakPosition && config.peaks.map(peak => (
        <Html key={peak.id} position={peakPosition} center distanceFactor={15}>
          <div style={arStyles.container}>
            <div style={arStyles.dot}></div>
            <div style={arStyles.card}>
              <div style={arStyles.peakName}>{peak.name}</div>
              <div style={arStyles.elevation}>{formatElevation(peak.elevation)}</div>
              <div style={arStyles.condition}>❄️ {peak.condition}</div>
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
}

const arStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate3d(0, -50%, 0)',
    pointerEvents: 'none'
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#00d0ff',
    borderRadius: 6,
    boxShadow: '0 0 10px #00d0ff',
    marginBottom: 8
  },
  card: {
    backgroundColor: 'rgba(11, 17, 32, 0.8)',
    border: '1px solid #00d0ff',
    borderRadius: 8,
    padding: '8px 12px',
    color: 'white',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
  },
  peakName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#00d0ff'
  },
  elevation: {
    fontSize: 12,
    color: '#aaddff'
  },
  condition: {
    fontWeight: '600',
    backgroundColor: 'rgba(0, 208, 255, 0.1)',
    borderRadius: 4,
    padding: '2px 4px',
    display: 'inline-block',
  }
};
