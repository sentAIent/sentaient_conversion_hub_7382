import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll, Text, Float, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import HologramGuide from '../components/HologramGuide';

// --- Extruded 3D Ship Geometries based on original 2D game paths ---
const createShipGeometry = (type) => {
  const size = 1;
  const shape = new THREE.Shape();
  
  if (type === 'interceptor') {
    shape.moveTo(size * 1.8, 0); 
    shape.quadraticCurveTo(size * 0.2, size * 0.8, -size * 0.5, size * 1.5); 
    shape.quadraticCurveTo(-size * 0.2, size * 0.4, -size * 0.8, 0); 
    shape.quadraticCurveTo(-size * 0.2, -size * 0.4, -size * 0.5, -size * 1.5);
    shape.quadraticCurveTo(size * 0.2, -size * 0.8, size * 1.8, 0);
  } else if (type === 'viper') {
    shape.moveTo(size * 1.2, size * 0.3); 
    shape.lineTo(size * 0.4, size * 0.4);
    shape.lineTo(-size * 0.8, size * 1.2); 
    shape.lineTo(-size * 1.2, size * 0.8);
    shape.lineTo(-size * 0.8, 0); 
    shape.lineTo(-size * 1.2, -size * 0.8);
    shape.lineTo(-size * 0.8, -size * 1.2);
    shape.lineTo(size * 0.4, -size * 0.4);
    shape.lineTo(size * 1.2, -size * 0.3); 
    shape.lineTo(size * 0.6, 0); 
  } else if (type === 'bulwark') {
    // Massive Capital Ship Polygon
    shape.moveTo(size * 1.5, 0);
    shape.lineTo(size * 0.8, size * 1.2);
    shape.lineTo(-size * 0.5, size * 1.5);
    shape.lineTo(-size * 1.5, size * 0.8);
    shape.lineTo(-size * 1.5, -size * 0.8);
    shape.lineTo(-size * 0.5, -size * 1.5);
    shape.lineTo(size * 0.8, -size * 1.2);
  }

  const extrudeSettings = {
    steps: 1,
    depth: type === 'bulwark' ? 0.8 : 0.2,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelSegments: 2
  };
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  
  // Center and orient geometry properly for dogfighting
  geometry.center();
  // Rotate so nose (X+) faces -Z (standard forward direction in 3D space)
  geometry.rotateY(-Math.PI / 2);
  // Extrude creates depth along Z (which is now X). Let's fix orientation so it lies flat.
  geometry.rotateZ(-Math.PI / 2);
  
  return geometry;
};

const SpaceStation = ({ position }) => {
  const stationRef = useRef();
  
  useFrame((state, delta) => {
    if (stationRef.current) {
      stationRef.current.rotation.z -= delta * 0.1;
      stationRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group position={position} ref={stationRef} scale={[1, 1, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      {/* Central Hub */}
      <mesh>
        <cylinderGeometry args={[150, 150, 300, 32]} />
        <meshStandardMaterial color="#223344" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Main Ring */}
      <mesh>
        <torusGeometry args={[400, 40, 32, 64]} />
        <meshStandardMaterial color="#112233" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Spokes connecting Hub to Ring */}
      {[0, Math.PI/2, Math.PI, Math.PI*1.5].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle)*200, 0, Math.sin(angle)*200]} rotation={[0, -angle, Math.PI/2]}>
          <cylinderGeometry args={[20, 20, 300, 16]} />
          <meshStandardMaterial color="#223344" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Glowing Docking Bays on Ring */}
      {[0, Math.PI/4, Math.PI/2, Math.PI*0.75, Math.PI, Math.PI*1.25, Math.PI*1.5, Math.PI*1.75].map((angle, i) => (
        <mesh key={`dock-${i}`} position={[Math.cos(angle)*400, 0, Math.sin(angle)*400]} rotation={[Math.PI/2, 0, -angle]}>
          <boxGeometry args={[60, 60, 90]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
};

const CapitalShip = ({ position }) => {
  const shipRef = useRef();
  
  const geometry = useMemo(() => createShipGeometry('bulwark'), []);

  useFrame((state, delta) => {
    if (shipRef.current) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 40;
      shipRef.current.rotation.y += delta * 0.05;
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group position={position} ref={shipRef} scale={[120, 120, 120]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#001133" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Engine Glows */}
      <pointLight position={[0, 0, 1.5]} intensity={50} color="#00ffff" distance={100} />
      <mesh position={[0, 0, 1.5]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </group>
  );
};

const FighterSwarm = ({ position }) => {
  const numBlue = 40;
  const numRed = 40;
  const numFighters = numBlue + numRed;
  const numLasers = 60;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyLaser = useMemo(() => new THREE.Object3D(), []);
  
  const meshRefBlue = useRef();
  const meshRefRed = useRef();
  const laserMeshRef = useRef();
  const trailMeshRef = useRef(); // Particles for engine trails
  
  const blueGeo = useMemo(() => createShipGeometry('interceptor'), []);
  const redGeo = useMemo(() => createShipGeometry('viper'), []);
  const laserGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.5, 0.5, 20, 4);
    geo.rotateX(Math.PI / 2); // Point along Z
    return geo;
  }, []);

  const fighters = useMemo(() => {
    return Array.from({ length: numFighters }, (_, i) => {
      const isRed = i >= numBlue;
      return {
        pos: new THREE.Vector3((Math.random() - 0.5) * 1600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 1600),
        vel: new THREE.Vector3(),
        target: new THREE.Vector3(),
        team: isRed ? 1 : 0, 
        meshIndex: isRed ? i - numBlue : i,
        health: 100,
        state: 0, 
        explosionTimer: 0,
        trail: [] // store previous positions for trails
      };
    });
  }, [numBlue, numFighters]);

  const lasers = useMemo(() => {
    return Array.from({ length: numLasers }, () => ({
      active: false,
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      color: new THREE.Color(),
      life: 0
    }));
  }, [numLasers]);

  useFrame((state, delta) => {
    if (!meshRefBlue.current || !meshRefRed.current || !laserMeshRef.current || !trailMeshRef.current) return;
    
    // 1. Update Fighters
    let trailCount = 0;
    
    fighters.forEach((fighter) => {
      if (fighter.state === 0) {
        // AI Logic
        if (Math.random() < 0.02 || fighter.target.lengthSq() === 0) {
          const enemy = fighters[Math.floor(Math.random() * numFighters)];
          if (enemy && enemy.team !== fighter.team && enemy.state === 0) {
            fighter.target.copy(enemy.pos);
            // Add some jitter so they don't all clump perfectly
            fighter.target.x += (Math.random() - 0.5) * 200;
            fighter.target.y += (Math.random() - 0.5) * 200;
            fighter.target.z += (Math.random() - 0.5) * 200;
          } else {
            fighter.target.set((Math.random() - 0.5) * 1200, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 1200);
          }
        }

        const toTarget = new THREE.Vector3().subVectors(fighter.target, fighter.pos);
        const dist = toTarget.length();
        
        // Shooting
        if (dist > 150 && dist < 800 && Math.random() < 0.03) {
          const inactiveLaser = lasers.find(l => !l.active);
          if (inactiveLaser) {
            inactiveLaser.active = true;
            inactiveLaser.pos.copy(fighter.pos);
            inactiveLaser.vel.copy(toTarget).normalize().multiplyScalar(2500); 
            inactiveLaser.color.set(fighter.team === 0 ? '#00ffff' : '#ff3300');
            inactiveLaser.life = 0.8;
          }
        }

        // 3D steering
        const force = toTarget.normalize().multiplyScalar(400 * delta);
        fighter.vel.add(force);
        fighter.vel.clampLength(0, 600);
        fighter.pos.addScaledVector(fighter.vel, delta);
        
        // Update Trail
        fighter.trail.push(fighter.pos.clone());
        if (fighter.trail.length > 5) fighter.trail.shift();

        dummy.position.copy(fighter.pos);
        
        // Pitch and Roll based on velocity (full 3D rotation)
        const lookTarget = dummy.position.clone().add(fighter.vel);
        dummy.lookAt(lookTarget);
        
        // Add some roll when turning
        const turnForce = force.clone().cross(fighter.vel).y;
        dummy.rotateZ(turnForce * 0.01);

        dummy.scale.set(30, 30, 30); 
      } else {
        // Exploding
        fighter.explosionTimer += delta;
        dummy.position.copy(fighter.pos);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = 30 * Math.max(0.1, (1.0 - fighter.explosionTimer * 2));
        dummy.scale.set(scale, scale, scale);

        if (fighter.explosionTimer > 0.5) {
          fighter.state = 0;
          fighter.health = 100;
          fighter.pos.set((Math.random() - 0.5) * 1600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 1600);
          fighter.vel.set(0,0,0);
          fighter.trail = [];
        }
      }

      dummy.updateMatrix();
      
      if (fighter.team === 0) {
        meshRefBlue.current.setMatrixAt(fighter.meshIndex, dummy.matrix);
        meshRefBlue.current.setColorAt(fighter.meshIndex, fighter.state === 0 ? new THREE.Color('#00aaff') : new THREE.Color('#ffaa00'));
      } else {
        meshRefRed.current.setMatrixAt(fighter.meshIndex, dummy.matrix);
        meshRefRed.current.setColorAt(fighter.meshIndex, fighter.state === 0 ? new THREE.Color('#ff0033') : new THREE.Color('#ffaa00'));
      }
      
      // Update Trails Instanced Mesh
      fighter.trail.forEach((tPos, tIdx) => {
        if (trailCount < 400) {
          dummy.position.copy(tPos);
          dummy.rotation.set(0,0,0);
          const tScale = (tIdx / 5) * 10;
          dummy.scale.set(tScale, tScale, tScale);
          dummy.updateMatrix();
          trailMeshRef.current.setMatrixAt(trailCount, dummy.matrix);
          trailMeshRef.current.setColorAt(trailCount, fighter.team === 0 ? new THREE.Color('#00ffff') : new THREE.Color('#ff5500'));
          trailCount++;
        }
      });
    });
    
    // Hide unused trails
    for (let i = trailCount; i < 400; i++) {
        dummy.position.set(0, 9999, 0);
        dummy.scale.set(0,0,0);
        dummy.updateMatrix();
        trailMeshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    // 2. Update Lasers
    lasers.forEach((laser, i) => {
      if (laser.active) {
        laser.pos.addScaledVector(laser.vel, delta);
        laser.life -= delta;
        
        fighters.forEach(fighter => {
          if (fighter.state === 0) {
            const dist = laser.pos.distanceTo(fighter.pos);
            if (dist < 50) { 
               fighter.health -= 50;
               laser.active = false;
               if (fighter.health <= 0) {
                 fighter.state = 1; 
                 fighter.explosionTimer = 0;
               }
            }
          }
        });

        if (laser.life <= 0) laser.active = false;
        
        dummyLaser.position.copy(laser.pos);
        dummyLaser.lookAt(dummyLaser.position.clone().add(laser.vel));
        dummyLaser.scale.set(1, 1, 1); 
      } else {
        dummyLaser.position.set(0, 9999, 0); 
        dummyLaser.scale.set(0,0,0);
      }
      
      dummyLaser.updateMatrix();
      laserMeshRef.current.setMatrixAt(i, dummyLaser.matrix);
      laserMeshRef.current.setColorAt(i, laser.color);
    });

    meshRefBlue.current.instanceMatrix.needsUpdate = true;
    if (meshRefBlue.current.instanceColor) meshRefBlue.current.instanceColor.needsUpdate = true;
    
    meshRefRed.current.instanceMatrix.needsUpdate = true;
    if (meshRefRed.current.instanceColor) meshRefRed.current.instanceColor.needsUpdate = true;
    
    trailMeshRef.current.instanceMatrix.needsUpdate = true;
    if (trailMeshRef.current.instanceColor) trailMeshRef.current.instanceColor.needsUpdate = true;

    laserMeshRef.current.instanceMatrix.needsUpdate = true;
    if (laserMeshRef.current.instanceColor) laserMeshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRefBlue} args={[blueGeo, null, numBlue]}>
        <meshStandardMaterial metalness={0.8} roughness={0.2} />
      </instancedMesh>
      
      <instancedMesh ref={meshRefRed} args={[redGeo, null, numRed]}>
        <meshStandardMaterial metalness={0.8} roughness={0.2} />
      </instancedMesh>
      
      <instancedMesh ref={laserMeshRef} args={[laserGeo, null, numLasers]}>
        <meshBasicMaterial transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </instancedMesh>
      
      <instancedMesh ref={trailMeshRef} args={[new THREE.SphereGeometry(1, 4, 4), null, 400]}>
        <meshBasicMaterial transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </group>
  );
};

// --- Main World ---
const Interstellar = ({ position, rotation, visible }) => {
  const logoTex = useLoader(THREE.TextureLoader, '/interstellar_logo_final.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;
  
  const scroll = useScroll();
  const lockRef = useRef({ triggered: false });

  useFrame(() => {
    if (scroll && scroll.offset >= 0.41 && scroll.offset <= 0.43 && !lockRef.current.triggered && !window.interstellarLocked) {
      window.interstellarLocked = true;
      lockRef.current.triggered = true;
      setTimeout(() => {
        window.interstellarLocked = false;
      }, 1500);
    }
  });

  return (
    <group visible={visible} position={position} rotation={rotation}>
      {/* Dramatic Space Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[1000, 500, -1000]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-1000, -500, -500]} intensity={1.5} color="#0055ff" />
      <pointLight position={[1000, 500, 1000]} intensity={1.0} color="#ff3300" />
      
      {/* Deep Space Background Void */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[4000, 32, 32]} />
        <meshBasicMaterial color="#020510" side={THREE.BackSide} />
      </mesh>

      {/* Center everything near Z=0 so the camera at Z=400 sees it clearly */}
      <SpaceStation position={[0, -200, -800]} />
      <CapitalShip position={[0, -120, -100]} />
      <FighterSwarm position={[0, -50, 0]} />
      
      {/* Title & Logo Hologram - perfectly positioned in front of camera at Z=400 */}
      <group position={[0, 120, 200]}>
        <mesh position={[0, 50, 0]}>
          <planeGeometry args={[180, 180]} />
          <meshBasicMaterial map={logoTex} transparent depthWrite={false} />
        </mesh>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -60, 0]} fontSize={50} color="#ff8800" anchorX="center" anchorY="middle" outlineWidth={2} outlineColor="#550000">
            INTERSTELLAR
        </Text>
        <Text font="/fonts/Roboto.woff" fallbackFonts={[]} position={[0, -110, 0]} fontSize={20} color="#ffffff" anchorX="center" anchorY="middle">
            Build your space empire
        </Text>
      </group>
      
      {/* Hologram Guide */}
      <HologramGuide appId="interstellar" position={[-150, 100, 200]} />
    </group>
  );
};

export default Interstellar;
