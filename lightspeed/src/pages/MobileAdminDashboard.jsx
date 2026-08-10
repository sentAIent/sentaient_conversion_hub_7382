import React, { useState, useEffect } from 'react';
import './MobileAdminDashboard.css';

export default function MobileAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Attempt biometric auth on mount
    authenticate();
  }, []);

  const authenticate = async () => {
    try {
      // If running inside Capacitor with Biometrics plugin
      if (window.Capacitor && window.Capacitor.Plugins.BiometricAuth) {
        const { BiometricAuth } = window.Capacitor.Plugins;
        const available = await BiometricAuth.isAvailable();
        if (available.has) {
          const authResult = await BiometricAuth.verify({
            reason: 'Authenticate to access SOC Admin',
            title: 'Admin Verification'
          });
          if (authResult.verified) {
            setIsAuthenticated(true);
          } else {
            setError('Biometric verification failed.');
          }
        } else {
          // Fallback if no biometrics
          fallbackAuth();
        }
      } else {
        // Web fallback simulation for PWA
        fallbackAuth();
      }
    } catch (err) {
      console.error(err);
      fallbackAuth();
    }
  };

  const fallbackAuth = () => {
    const pin = prompt('Biometrics unavailable. Enter Admin PIN to unlock:');
    if (pin === '0000') { // Default simulation PIN
      setIsAuthenticated(true);
    } else {
      setError('Invalid PIN.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mobile-dashboard-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Admin Locked</h2>
        <p style={{ color: 'var(--text-muted)' }}>Biometric authentication required.</p>
        {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
        <button className="glass-button" onClick={authenticate} style={{ marginTop: '1rem', padding: '0.8rem 2rem' }}>
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="mobile-dashboard-container">
      <header className="mobile-header">
        <h1>SOC Admin Mobile</h1>
      </header>
      
      <main className="mobile-content">
        <section className="mobile-card">
          <h2>Active Threats</h2>
          <div className="metric-large threat">0 Critical</div>
        </section>

        <section className="mobile-card">
          <h2>System Health</h2>
          <div className="metric-large safe">100% Online</div>
        </section>
        
        <section className="mobile-card">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>Compliance check passed</li>
            <li>No new incidents in last hour</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
