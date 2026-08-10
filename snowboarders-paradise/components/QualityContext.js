import React, { createContext, useContext, useState, useEffect } from 'react';

// Quality settings: 'ULTRA' (PS6), 'HIGH', 'MEDIUM', 'LOW' (8-year old device)
const QualityContext = createContext();

export const QualityProvider = ({ children }) => {
  const [quality, setQuality] = useState('HIGH');

  useEffect(() => {
    // Basic heuristic to detect device age / capabilities
    // Covers ~8 years of hardware
    const cores = navigator.hardwareConcurrency || 4;
    
    // Very basic check. If it's a mobile device with few cores, drop to LOW
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      if (cores <= 4) setQuality('LOW');
      else if (cores <= 6) setQuality('MEDIUM');
      else setQuality('HIGH');
    } else {
      if (cores <= 4) setQuality('MEDIUM');
      else if (cores <= 8) setQuality('HIGH');
      else setQuality('ULTRA');
    }
  }, []);

  // Settings that components can read
  const settings = {
    quality,
    setQuality,
    shadows: quality === 'ULTRA' || quality === 'HIGH',
    particles: quality === 'ULTRA' ? 1000 : (quality === 'HIGH' ? 300 : (quality === 'MEDIUM' ? 100 : 0)),
    postProcessing: quality !== 'LOW', // Disable post-processing entirely on low
    resolutionMultiplier: quality === 'ULTRA' ? 1.5 : (quality === 'LOW' ? 0.5 : 1.0),
    ssao: quality === 'ULTRA',
    volumetricFog: quality === 'ULTRA' || quality === 'HIGH',
    snowGlitter: quality === 'ULTRA' || quality === 'HIGH'
  };

  return (
    <QualityContext.Provider value={settings}>
      {children}
    </QualityContext.Provider>
  );
};

export const useQuality = () => useContext(QualityContext);
