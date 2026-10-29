import React, { createContext, useContext, useEffect, useState } from 'react';

const GraphicsTierContext = createContext();

export const GraphicsTierProvider = ({ children }) => {
  const [graphicsTier, setGraphicsTier] = useState('high');

  useEffect(() => {
    const checkTier = () => {
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileWidth = window.innerWidth <= 768;
      
      if (isMobileUserAgent || isMobileWidth) {
        setGraphicsTier('low');
      } else {
        setGraphicsTier('high');
      }
    };

    checkTier();
    window.addEventListener('resize', checkTier);
    return () => window.removeEventListener('resize', checkTier);
  }, []);

  return (
    <GraphicsTierContext.Provider value={graphicsTier}>
      {children}
    </GraphicsTierContext.Provider>
  );
};

export const useGraphicsTier = () => {
  const context = useContext(GraphicsTierContext);
  if (context === undefined) {
    return 'high'; // fallback
  }
  return context;
};
