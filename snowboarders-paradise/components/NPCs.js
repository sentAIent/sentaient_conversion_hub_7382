import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getTerrainHeight, getTerrainNormal } from '../utils/terrainUtils';
import { SnowboarderAvatar } from './Player';
import { LootManager } from './LootManager';

// Global reference for player to check collisions
window.npcList = [];

export function NPCs() {
  // Generate 5 NPCs
  const [npcs] = useState(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100,
      z: -100 - Math.random() * 500,
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
      
      data.z -= data.speed * delta;
      const groundY = getTerrainHeight(data.x, data.z);
      ref.current.position.set(data.x, groundY, data.z);
      
      const normal = getTerrainNormal(data.x, data.z);
      const normalVec = new THREE.Vector3(normal.x, normal.y, normal.z);
      const forward = new THREE.Vector3(0, 0, -1);
      
      const targetRotation = new THREE.Matrix4().lookAt(
        new THREE.Vector3(0,0,0),
        forward,
        normalVec
      );
      ref.current.quaternion.setFromRotationMatrix(targetRotation);
    }
  });

  // Generate fake anim state for the NPC avatar
  const npcAnimState = {
    carving: 0,
    inAir: false,
    grabbing: false,
    boosting: false,
    melee: false
  };

  return (
    <group ref={ref}>
      {/* Snowboard */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.4, 0.05, 1.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <group position={[0, 0.6, 0]}>
         <SnowboarderAvatar animState={npcAnimState} goggleColor={data.knockedOut ? "#ff0000" : "#00ff00"} />
      </group>
    </group>
  );
}
