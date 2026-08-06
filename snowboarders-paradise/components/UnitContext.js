import React, { createContext, useContext, useState } from 'react';

export const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [isMetric, setIsMetric] = useState(false); // default US (Imperial)

  // Distance/Elevation (feet to meters)
  const formatElevation = (feet) => {
    if (isMetric) {
      return `${Math.round(feet * 0.3048).toLocaleString()} m`;
    }
    return `${Math.round(feet).toLocaleString()} ft`;
  };

  // Temperature (C to F)
  const formatTemp = (tempC) => {
    if (isMetric) {
      return `${Math.round(tempC)}°C`;
    }
    return `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  const formatSnowfall = (cm) => {
    if (isMetric) {
      return `${Math.round(cm)} cm`;
    }
    return `${(cm * 0.393701).toFixed(1)} in`;
  };

  return (
    <UnitContext.Provider value={{ isMetric, setIsMetric, formatElevation, formatTemp, formatSnowfall }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnits() {
  return useContext(UnitContext);
}
