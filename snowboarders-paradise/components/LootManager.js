import React, { useState, useEffect } from 'react';
import { getTerrainHeight } from '../utils/terrainUtils';

export function LootManager() {
  const [loot, setLoot] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.droppedLoot && window.droppedLoot.length !== loot.length) {
        setLoot([...window.droppedLoot]);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [loot]);

  return (
    <group>
      {loot.map((item, i) => {
        const y = getTerrainHeight(item.position[0], item.position[2]);
        return (
          <mesh key={item.id || i} position={[item.position[0], y + 0.5, item.position[2]]}>
            <boxGeometry args={item.type === 'board' ? [0.4, 0.1, 1.8] : [0.1, 0.1, 1.5]} />
            <meshStandardMaterial color={item.type === 'board' ? '#ff00ff' : '#00ffff'} emissive={item.type === 'board' ? '#ff00ff' : '#00ffff'} />
          </mesh>
        );
      })}
    </group>
  );
}
