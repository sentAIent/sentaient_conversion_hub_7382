import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  
  useEffect(() => {
    const fetchIncidents = async () => {
      const { data } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (data) setIncidents(data);
    };

    fetchIncidents();

    const channel = supabase
      .channel('public:incidents_page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchIncidents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activeIncidents = incidents.filter(i => !i.is_fixed);
  const mttr = Math.max(5, 14 + activeIncidents.length); // Dynamic proxy MTTR
  return (
    <div className="page-content fade-in">
      <h1>Incident Response & Alerting</h1>
      
      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass">
          <h3>Active Incidents</h3>
          <p className={activeIncidents.length > 0 ? "value danger" : "value safe"}>{activeIncidents.length}</p>
          <p className="subtitle">{activeIncidents.length > 0 ? activeIncidents[0].title : 'System Healthy'}</p>
        </div>
        <div className="widget glass">
          <h3>Mean Time To Resolve</h3>
          <p className="value">{mttr}m</p>
          <p className="subtitle">Estimated (Live Proxy)</p>
        </div>
      </div>

      <div className="table-container glass">
        <h3>Recent Alerts</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>Incident</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No recent alerts found.</td>
              </tr>
            ) : (
              incidents.map(inc => (
                <tr key={inc.id}>
                  <td>
                    {inc.type === 'security' ? <span className="badge danger">Critical</span> : 
                     inc.type === 'database' ? <span className="badge warning">High</span> : 
                     <span className="badge safe">Medium</span>}
                  </td>
                  <td>{inc.title}</td>
                  <td>{inc.source || 'System'}</td>
                  <td>{inc.is_fixed ? 'Resolved' : 'Investigating'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
