import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function ComplianceDashboard() {
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChecks = async () => {
    const { data, error } = await supabase
      .from('compliance_checks')
      .select('*')
      .order('framework', { ascending: true })
      .order('rule_id', { ascending: true });
      
    if (data) {
      setChecks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChecks();

    const channel = supabase
      .channel('public:compliance')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'compliance_checks' }, payload => {
        fetchChecks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const soc2Checks = checks.filter(c => c.framework === 'SOC2');
  const hipaaChecks = checks.filter(c => c.framework === 'HIPAA');

  const soc2Score = soc2Checks.length > 0 
    ? Math.round((soc2Checks.filter(c => c.status === 'passed').length / soc2Checks.length) * 100) 
    : 100;
    
  const hipaaScore = hipaaChecks.length > 0 
    ? Math.round((hipaaChecks.filter(c => c.status === 'passed').length / hipaaChecks.length) * 100) 
    : 100;

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Compliance Automation</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className="badge safe" style={{ padding: '0.5rem 1rem' }}>Auto-Scanner Active</span>
        </div>
      </div>

      <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
        <div className="widget glass" style={{ textAlign: 'center' }}>
          <h3>SOC2 Compliance</h3>
          <p className={soc2Score === 100 ? "value safe" : "value danger"}>{soc2Score}%</p>
          <p className="subtitle">Continuous Monitoring</p>
        </div>
        <div className="widget glass" style={{ textAlign: 'center' }}>
          <h3>HIPAA Compliance</h3>
          <p className={hipaaScore === 100 ? "value safe" : "value danger"}>{hipaaScore}%</p>
          <p className="subtitle">Continuous Monitoring</p>
        </div>
      </div>

      <div className="widget glass" style={{ gridColumn: '1 / -1' }}>
        <h3>Active Compliance Rules</h3>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading framework data...</p>
        ) : (
          <div className="data-table-container" style={{ marginTop: '1rem' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Framework</th>
                  <th>Rule ID</th>
                  <th>Description</th>
                  <th>Last Checked</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {checks.map(check => (
                  <tr key={check.id}>
                    <td style={{ fontWeight: '600' }}>{check.framework}</td>
                    <td style={{ color: 'var(--accent)' }}>{check.rule_id}</td>
                    <td>
                      <div>{check.description}</div>
                      {check.status === 'failed' && check.details?.reason && (
                        <div style={{ color: 'var(--danger)', fontSize: '0.85em', marginTop: '0.3rem' }}>
                          Reason: {check.details.reason}
                        </div>
                      )}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>
                      {new Date(check.last_checked).toLocaleTimeString()}
                    </td>
                    <td>
                      <span className={`status-badge ${
                        check.status === 'passed' ? 'status-safe' : 
                        check.status === 'warning' ? 'status-warning' : 'status-danger'
                      }`}>
                        {check.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
                {checks.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                      No compliance rules loaded. Run the Python compliance scanner.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
