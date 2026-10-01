import React, { createContext, useContext, useState, useEffect } from 'react';

const MemoryContext = createContext();

export const useMemory = () => useContext(MemoryContext);

export const MemoryProvider = ({ children }) => {
  const [memory, setMemory] = useState({
    userVisitedRooms: [],
    preferences: {
      theme: 'matrix',
      voiceEnabled: true
    },
    activeAgentTask: null
  });

  const recordRoomVisit = (roomName) => {
    setMemory(prev => {
      if (prev.userVisitedRooms.includes(roomName)) return prev;
      return {
        ...prev,
        userVisitedRooms: [...prev.userVisitedRooms, roomName]
      };
    });
  };

  const updatePreference = (key, value) => {
    setMemory(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  return (
    <MemoryContext.Provider value={{ memory, recordRoomVisit, updatePreference }}>
      {children}
    </MemoryContext.Provider>
  );
};
