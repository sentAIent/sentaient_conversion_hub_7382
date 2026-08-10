import React, { useState, useEffect } from 'react';
import { getTerrainHeight } from '../utils/terrainUtils';

window.droppedLoot = window.droppedLoot || [];

export function LootManager() {
  const [lootItems, setLootItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.droppedLoot.length !== lootItems.length) {
        setLootItems([...window.droppedLoot]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [lootItems.length]);

  return (
    <group>
      {lootItems.map((loot) => (
        <LootItem key={loot.id} data={loot} />
      ))}
    </group>
  );
}

function LootItem({ data }) {
  const y = getTerrainHeight(data.position[0], data.position[2]);
  
  let mesh;
  if (data.type === 'skis') {
    mesh = (
      <group position={[data.position[0], y + 0.1, data.position[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 1.8, 0.05]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.1, 1.8, 0.05]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
      </group>
    );
  } else if (data.type === 'poles') {
    mesh = (
      <group position={[data.position[0], y + 0.1, data.position[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh position={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#0000ff" />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5]} />
          <meshStandardMaterial color="#0000ff" />
        </mesh>
      </group>
    );
  } else {
    // board
    mesh = (
      <mesh position={[data.position[0], y + 0.1, data.position[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.4, 1.8, 0.05]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
    );
  }

  return mesh;
}
