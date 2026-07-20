import React, { useState, useEffect } from 'react';
import IncidentModal from '../components/IncidentModal';
import { supabase } from '../lib/supabase';

export default function Dashboard({ errors, onFix }) {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [avgLatency, setAvgLatency] = useState(0);
  const [uptime, setUptime] = useState(100);
  
  const activeErrors = errors ? errors.filter(e => !e.fixed) : [];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      // Fetch Avg Latency from metrics
      const { data: metricsData } = await supabase
        .from('metrics')
        .select('value')
        .eq('metric_name', 'page_load_time')
        .order('created_at', { ascending: false })
        .limit(100);

      if (metricsData && metricsData.length > 0) {
        const sum = metricsData.reduce((acc, curr) => acc + parseFloat(curr.value), 0);
        setAvgLatency(Math.round(sum / metricsData.length));
      }

      // Estimate Uptime from web_analytics vs incidents
      const { count: viewsCount } = await supabase
        .from('web_analytics')
        .select('*', { count: 'exact', head: true });

      const { count: errorsCount } = await supabase
        .from('incidents')
        .select('*', { count: 'exact', head: true });

      if (viewsCount > 0) {
        const up = 100 - ((errorsCount / viewsCount) * 100);
        setUptime(up > 99.99 ? 99.99 : (up < 0 ? 0 : up.toFixed(2)));
      }
    };

    fetchDashboardStats();
  }, [errors]);
  
  return (
    <div className="page-content fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <h1>Overview</h1>
        <div className="widgets-grid">
          <div className="widget glass">
            <h3>Active Threats</h3>
            <p className={activeErrors.length > 0 ? "value danger" : "value safe"}>{activeErrors.length}</p>
            <p className="subtitle">Unresolved System Alerts</p>
          </div>
          <div className="widget glass">
            <h3>Avg Latency</h3>
            <p className="value">{avgLatency > 0 ? `${avgLatency}ms` : '...'}</p>
            <p className="subtitle">Live Page Load Time</p>
          </div>
          <div className="widget glass">
            <h3>Uptime</h3>
            <p className="value">{uptime}%</p>
            <p className="subtitle">Estimated vs Traffic</p>
          </div>
        </div>
      </div>
      
      <div className="alerts-column" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Active System Alerts
          {activeErrors.length > 0 && (
            <span className="badge danger" style={{ fontSize: '0.7rem' }}>{activeErrors.length}</span>
          )}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activeErrors.length === 0 ? (
            <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active alerts. System healthy.
            </div>
          ) : (
            activeErrors.map(error => (
              <div 
                key={error.id} 
                className="glass-panel hover-glow" 
                style={{ padding: '1rem', borderLeft: '3px solid var(--accent-red)', cursor: 'pointer' }}
                onClick={() => setSelectedIncident(error)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="badge danger" style={{ fontSize: '0.65rem' }}>{error.id}</span>
                </div>
                <h4 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.9rem' }}>{error.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {error.explanation}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <IncidentModal 
        incident={selectedIncident} 
        onClose={() => setSelectedIncident(null)} 
        onFix={onFix} 
      />
    </div>
  );
}
