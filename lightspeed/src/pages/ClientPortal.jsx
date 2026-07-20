import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ClientPortal({ token }) {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audits, setAudits] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadClientData() {
      if (!token) return;
      
      try {
        const { data: appData, error: appError } = await supabase
          .from('apps')
          .select('*')
          .eq('client_token', token)
          .single();

        if (appError || !appData) {
          setError("Invalid Client Token or Application Not Found.");
          setLoading(false);
          return;
        }

        setApp(appData);

        // Load Audits
        const { data: auditData } = await supabase
          .from('security_audits')
          .select('*')
          .eq('app_id', appData.id)
          .order('stage', { ascending: true });

        if (auditData) setAudits(auditData);

        // Load Incidents
        const { data: incidentData } = await supabase
          .from('incidents')
          .select('*')
          .eq('app_id', appData.id)
          .order('created_at', { ascending: false });

        if (incidentData) setIncidents(incidentData);

      } catch (err) {
        setError("Error loading client dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadClientData();
  }, [token]);

  if (loading) return <div className="page-content" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}><div className="loader"></div></div>;
  
  if (error) return (
    <div className="page-content fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 style={{ color: 'var(--danger)' }}>Access Denied</h2>
      <p style={{ color: 'var(--text-muted)' }}>{error}</p>
    </div>
  );

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>{app.name} Client Portal</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>View your real-time security posture and monitoring data.</p>
        </div>
        <div style={{ background: 'var(--accent-blue)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold' }}>
          Protected View
        </div>
      </div>

      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass">
          <h3>Active Incidents</h3>
          <p className={incidents.filter(i => !i.is_fixed).length > 0 ? "value danger" : "value safe"}>
            {incidents.filter(i => !i.is_fixed).length}
          </p>
        </div>
        <div className="widget glass">
          <h3>Total Audits</h3>
          <p className="value safe">{audits.length}</p>
        </div>
        <div className="widget glass">
          <h3>Completed Audits</h3>
          <p className="value safe">{audits.filter(a => a.status === 'Completed').length}</p>
        </div>
      </div>

      {app.status_page_url && (
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ margin: 0 }}>Live Status Page</h3>
          </div>
          <iframe 
            src={app.status_page_url} 
            style={{ width: '100%', height: '100%', border: 'none' }}
            title={`${app.name} Status Page`}
          />
        </div>
      )}

      <div className="widgets-grid">
        <div className="widget glass" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Enterprise Security Audit Tracker</h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Task Name</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((audit) => (
                  <tr key={audit.id}>
                    <td><span style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>{audit.stage}</span></td>
                    <td style={{ fontWeight: '600' }}>{audit.task_name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{audit.details}</td>
                    <td>
                      <span className={`status-badge ${
                        audit.status === 'Completed' ? 'status-safe' : 
                        audit.status === 'In Progress' ? 'status-warning' : 'status-danger'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {audits.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No audit tasks found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
