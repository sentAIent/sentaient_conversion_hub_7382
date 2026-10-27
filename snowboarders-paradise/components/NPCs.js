import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ContactShadows } from '@react-three/drei';
import { getTerrainHeight, getTerrainNormal } from './Terrain';
import { LootManager } from './LootManager';

// Global reference for player to check collisions
window.npcList = [];

export function NPCs() {
  // Generate 15 NPCs ahead of the player
  const [npcs] = useState(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100,
      z: Math.random() * 850, // Between 0 and 850 (Player starts at 900 and goes down to -1000)
      speed: 10 + Math.random() * 15,
      knockedOut: false,
      knockoutVelocity: new THREE.Vector3(),
      knockoutRotation: new THREE.Vector3()
    }));
  });

  useEffect(() => {
    window.npcList = npcs;
    return () => { window.npcList = []; };
  }, [npcs]);

  return (
    <group>
      {npcs.map(npc => (
        <NPC key={npc.id} data={npc} />
      ))}
      <LootManager />
      <ProjectileManager />
    </group>
  );
}

function ProjectileManager() {
  const [projectiles, setProjectiles] = useState([]);
  
  useEffect(() => {
    window.projectiles = [];
    const interval = setInterval(() => {
      setProjectiles([...window.projectiles]);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useFrame((_, delta) => {
    if (!window.projectiles) window.projectiles = [];
    window.projectiles.forEach((p, i) => {
       p.x += p.vx * delta;
       p.y += p.vy * delta;
       p.z += p.vz * delta;
       p.vy -= 15 * delta; // slight gravity

       // Check hits
       window.npcList.forEach(npc => {
          if (!npc.knockedOut && Math.hypot(npc.x - p.x, npc.z - p.z) < 3) {
             npc.knockedOut = true;
             npc.knockoutVelocity.set(p.vx * 0.5, 10, p.vz * 0.5);
             npc.knockoutRotation.set(Math.random()*10, Math.random()*10, Math.random()*10);
             p.dead = true;
          }
       });

       if (getTerrainHeight(p.x, p.z) > p.y) p.dead = true;
    });
    window.projectiles = window.projectiles.filter(p => !p.dead);
  });

  return (
    <group>
      {projectiles.map(p => (
        <mesh key={p.id} position={[p.x, p.y, p.z]}>
           <sphereGeometry args={[0.3, 8, 8]} />
           <meshStandardMaterial color="#00ffff" emissive="#00ffff" />
        </mesh>
      ))}
    </group>
  );
}

function NPC({ data }) {
  const ref = useRef();
  
  useFrame((_, delta) => {
    if (!ref.current) return;
    
    // Cap delta and apply Trick Strike time dilation
    delta = Math.min(delta, 0.1) * (window.timeScale || 1.0);
    
    if (data.knockedOut) {
      if (!data.hasDroppedLoot) {
        data.hasDroppedLoot = true;
        const lootTypes = ["skis", "poles", "board"];
        const randType = lootTypes[Math.floor(Math.random() * lootTypes.length)];
        window.droppedLoot = window.droppedLoot || [];
        window.droppedLoot.push({
          id: Math.random().toString(),
          position: [data.x, 0, data.z],
          type: randType
        });
      }

      // Ragdoll physics
      data.knockoutVelocity.y -= 30 * delta; // Gravity
      data.x += data.knockoutVelocity.x * delta;
      ref.current.position.y += data.knockoutVelocity.y * delta;
      data.z += data.knockoutVelocity.z * delta;
      
      const groundY = getTerrainHeight(data.x, data.z);
      if (ref.current.position.y <= groundY) {
        ref.current.position.y = groundY;
        data.knockoutVelocity.y = 0;
        data.knockoutVelocity.x *= 0.8;
        data.knockoutVelocity.z *= 0.8;
      }
      
      ref.current.position.x = data.x;
      ref.current.position.z = data.z;
      
      ref.current.rotation.x += data.knockoutRotation.x * delta;
      ref.current.rotation.y += data.knockoutRotation.y * delta;
      ref.current.rotation.z += data.knockoutRotation.z * delta;
    } else {
      // Move downhill with slight random strafing
      if (!data.strafePhase) data.strafePhase = Math.random() * Math.PI * 2;
      data.x += Math.sin(Date.now() / 1000 + data.strafePhase) * 5 * delta;
      
      data.z -= data.speed * delta; // Move towards -Z
      const groundY = getTerrainHeight(data.x, data.z);
      ref.current.position.set(data.x, groundY, data.z);
      
      const normal = getTerrainNormal(data.x, data.z);
      const normalVec = new THREE.Vector3(normal.x, normal.y, normal.z);
      const forward = new THREE.Vector3(0, 0, -1);
      
      // Simple rotation matrix
      const m = new THREE.Matrix4();
      const right = new THREE.Vector3().crossVectors(forward, normalVec).normalize();
      const newForward = new THREE.Vector3().crossVectors(normalVec, right).normalize();
      m.makeBasis(right, normalVec, newForward);
      
      ref.current.quaternion.setFromRotationMatrix(m);
      
      // Reset if off edge
      if (data.z < -1000) {
          data.z = 900;
      }
    }
  });

  return (
    <group ref={ref}>
      {/* Cheap blob shadow for performance */}
      <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      
      {/* Snowboard */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <group position={[0, 0.6, 0]}>
         {/* Simple box for NPC avatar */}
         <mesh castShadow>
             <boxGeometry args={[0.6, 1.8, 0.6]} />
             <meshStandardMaterial color={data.knockedOut ? "#ff0000" : "#ff5500"} emissive={data.knockedOut ? "#550000" : "#551100"} />
         </mesh>
      </group>
    </group>
  );
}
