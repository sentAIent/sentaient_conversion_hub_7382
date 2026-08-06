import React from 'react';
import './MobileAdminDashboard.css';

export default function MobileAdminDashboard() {
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
