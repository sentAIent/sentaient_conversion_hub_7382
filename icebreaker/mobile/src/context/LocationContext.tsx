import React, { createContext, useContext, useState, ReactNode } from 'react';

type LocationState = {
  latitude: number;
  longitude: number;
  radiusKm: number;
};

type LocationContextType = {
  exploreLocation: LocationState | null;
  setExploreLocation: (loc: LocationState | null) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [exploreLocation, setExploreLocation] = useState<LocationState | null>(null);

  return (
    <LocationContext.Provider value={{ exploreLocation, setExploreLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useExploreLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useExploreLocation must be used within a LocationProvider');
  }
  return context;
}
