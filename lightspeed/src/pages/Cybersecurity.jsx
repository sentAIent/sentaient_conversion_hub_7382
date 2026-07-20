import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Cybersecurity() {
  const [threatData, setThreatData] = useState([]);
  const [vulnCount, setVulnCount] = useState(0);
  const [complianceScore, setComplianceScore] = useState(100);
  const [auditData, setAuditData] = useState([]);
  const [selectedApp, setSelectedApp] = useState('All');
  const [appsList, setAppsList] = useState([]);

  useEffect(() => {
    const fetchThreats = async () => {
      const { data, error } = await supabase
        .from('incidents')
        .select('type, source')
        .order('created_at', { ascending: false });

      if (data) {
        // Aggregate by source
        const counts = data.reduce((acc, curr) => {
          const key = curr.source || 'Unknown';
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
        
        const formattedData = Object.keys(counts).map(key => ({
          source: key,
          incidents: counts[key]
        }));
        setThreatData(formattedData);

        // Calculate Vulnerabilities
        const vulns = data.filter(inc => 
          inc.explanation.toLowerCase().includes('vulnerab') || 
          inc.title.toLowerCase().includes('cve') ||
          inc.title.toLowerCase().includes('attack') ||
          inc.type === 'security'
        );
        setVulnCount(vulns.length);

        // Calculate Compliance
        const activeSecurityIncidents = data.filter(inc => !inc.is_fixed).length;
        const score = Math.max(0, 100 - (activeSecurityIncidents * 2));
        setComplianceScore(score);
      }
    };

    fetchThreats();

    const fetchAudits = async () => {
      const { data, error } = await supabase
        .from('security_audits')
        .select('*')
        .order('stage', { ascending: true })
        .order('task_name', { ascending: true });
        
      if (data) {
        setAuditData(data);
        const uniqueApps = [...new Set(data.map(a => a.app_id))].sort();
        setAppsList(uniqueApps);
      }
    };

    fetchAudits();

    const channel = supabase
      .channel('public:threats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, payload => {
        fetchThreats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateAudit = async (id, field, value) => {
    const { error } = await supabase
      .from('security_audits')
      .update({ [field]: value })
      .eq('id', id);
      
    if (!error) {
      setAuditData(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    } else {
      console.error("Error updating audit:", error);
    }
  };

  return (
    <div className="page-content fade-in">
      <h1>Cybersecurity & Compliance</h1>
      
      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass" style={{ gridColumn: '1 / -1', height: '350px' }}>
          <h3>Incidents & Threats by Source</h3>
          {threatData.length > 0 ? (
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={threatData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="source" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid var(--border-glass)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--danger)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="incidents" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              No security incidents recorded.
            </div>
          )}
        </div>
      </div>
      
      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass">
          <h3>Vulnerabilities (CVEs)</h3>
          <p className={vulnCount > 0 ? "value warning" : "value safe"}>{vulnCount}</p>
          <p className="subtitle">Detected in telemetry</p>
        </div>
        <div className="widget glass">
          <h3>Compliance Score</h3>
          <p className={complianceScore > 90 ? "value safe" : complianceScore > 75 ? "value warning" : "value danger"}>{complianceScore}%</p>
          <p className="subtitle">SOC2 Tracking</p>
        </div>
      </div>

      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Enterprise Security Audit Tracker</h3>
            <select 
              value={selectedApp} 
              onChange={(e) => setSelectedApp(e.target.value)}
              className="glass-input"
              style={{ padding: '0.5rem 1rem', width: '250px' }}
            >
              <option value="All">All Applications</option>
              {appsList.map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>
          </div>
          
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {selectedApp === 'All' && <th>Application</th>}
                  <th>Stage</th>
                  <th>Task Name</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditData
                  .filter(a => selectedApp === 'All' || a.app_id === selectedApp)
                  .map((audit) => (
                  <tr key={audit.id}>
                    {selectedApp === 'All' && <td style={{ fontWeight: '500' }}>{audit.app_id}</td>}
                    <td>
                      <select 
                        value={audit.stage} 
                        onChange={(e) => updateAudit(audit.id, 'stage', e.target.value)}
                        style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.9em', padding: '0.2rem', borderRadius: '4px' }}
                      >
                        <option value="Phase 1: Recon & Perimeter">Phase 1: Recon & Perimeter</option>
                        <option value="Phase 2: App Sec">Phase 2: App Sec</option>
                        <option value="Phase 3: Code & Data">Phase 3: Code & Data</option>
                        <option value="Phase 4: Compliance">Phase 4: Compliance</option>
                      </select>
                    </td>
                    <td style={{ fontWeight: '600' }}>{audit.task_name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{audit.details}</td>
                    <td>
                      <select 
                        value={audit.status} 
                        onChange={(e) => updateAudit(audit.id, 'status', e.target.value)}
                        className={`status-badge ${
                          audit.status === 'Completed' ? 'status-safe' : 
                          audit.status === 'In Progress' ? 'status-warning' : 'status-danger'
                        }`}
                        style={{ border: 'none', cursor: 'pointer', appearance: 'none', paddingRight: '1rem' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {auditData.length === 0 && (
                  <tr>
                    <td colSpan={selectedApp === 'All' ? 5 : 4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No audit tasks found. Run the seed script to populate.
                    </td>
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
