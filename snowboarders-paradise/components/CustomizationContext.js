import React, { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext();

export function CustomizationProvider({ children }) {
  // Base skeleton/model URL (Option A: Use standard Soldier from three.js examples)
  // For the prototype, we use a public Three.js example model URL
  const defaultAvatarUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Soldier.glb";
  
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);
  
  // Equipped Gear IDs
  const [equippedBoard, setEquippedBoard] = useState('board_default');
  const [equippedWeapon, setEquippedWeapon] = useState('branch');
  const [goggleColor, setGoggleColor] = useState('#ff9900');

  const equipGear = (category, id) => {
    switch (category) {
      case 'board': setEquippedBoard(id); break;
      case 'weapon': setEquippedWeapon(id); break;
      case 'goggles': setGoggleColor(id); break;
      case 'avatar': setAvatarUrl(id); break;
      default: break;
    }
  };

  const value = {
    avatarUrl,
    setAvatarUrl,
    equippedBoard,
    equippedWeapon,
    goggleColor,
    equipGear
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}
