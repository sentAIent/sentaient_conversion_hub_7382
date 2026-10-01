import React, { useEffect, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { useBiometricAuth } from '../hooks/useBiometricAuth';

const BiometricGate = ({ children }) => {
  const { isAvailable, authenticate: promptBiometric } = useBiometricAuth();
  const [isLocked, setIsLocked] = useState(false);
  const [lastBackgroundTime, setLastBackgroundTime] = useState(null);
  
  const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Only apply biometric timeout on native mobile apps
    if (!window.Capacitor || !window.Capacitor.isNative) return;

    const setupListener = async () => {
      const listener = await CapacitorApp.addListener('appStateChange', ({ isActive }) => {
        if (!isActive) {
          // App went to background
          setLastBackgroundTime(Date.now());
        } else {
          // App came to foreground
          if (lastBackgroundTime && (Date.now() - lastBackgroundTime > TIMEOUT_MS)) {
            setIsLocked(true);
            authenticate();
          }
        }
      });
      return listener;
    };

    let activeListener;
    setupListener().then(l => activeListener = l);

    return () => {
      if (activeListener) activeListener.remove();
    };
  }, [lastBackgroundTime]);

  const authenticate = async () => {
    try {
      if (isAvailable) {
        const success = await promptBiometric("Unlock Sentaient");
        if (success) {
          setIsLocked(false);
          setLastBackgroundTime(null);
        } else {
          alert("Biometric authentication failed or cancelled.");
        }
      } else {
        // Fallback for web or devices without biometrics
        const pass = window.prompt("App locked due to inactivity. Enter pin (1234) to unlock:");
        if (pass === "1234") {
          setIsLocked(false);
          setLastBackgroundTime(null);
        } else {
          alert("Authentication failed.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLocked) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0B0E14', color: '#E2E8F0' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '1rem'}}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <h2 style={{ color: '#60A5FA' }}>App Locked</h2>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Please authenticate to continue.</p>
        <button onClick={authenticate} style={{ padding: '12px 24px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Unlock with FaceID / TouchID
        </button>
      </div>
    );
  }

  return children;
};

export default BiometricGate;
