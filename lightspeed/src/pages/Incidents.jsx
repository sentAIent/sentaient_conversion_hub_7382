import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Incidents() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [deployingGroups, setDeployingGroups] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    const fetchIncidents = async () => {
      const { data } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
        
      if (data) {
        setIncidents(data);
        
        // Group logic
        const grouped = {};
        data.forEach(inc => {
          const groupId = inc.correlation_id || inc.id;
          if (!grouped[groupId]) {
            grouped[groupId] = {
              id: groupId,
              incidents: [],
              isGrouped: !!inc.correlation_id,
              proposed_fix: inc.proposed_fix_iac,
              title: inc.title,
              type: inc.type,
              is_fixed: inc.is_fixed
            };
          }
          grouped[groupId].incidents.push(inc);
          // If any has a proposed fix, surface it
          if (inc.proposed_fix_iac && !grouped[groupId].proposed_fix) {
            grouped[groupId].proposed_fix = inc.proposed_fix_iac;
          }
          // If any is unresolved, the group is unresolved
          if (!inc.is_fixed) {
            grouped[groupId].is_fixed = false;
          }
        });
        setGroups(Object.values(grouped));
      }
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

  const handleDeployFix = async (group) => {
    setDeployingGroups(prev => ({ ...prev, [group.id]: true }));
    
    // Simulate IaC deployment delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mark all incidents in group as fixed
    for (let inc of group.incidents) {
      await supabase.from('incidents').update({ is_fixed: true }).eq('id', inc.id);
    }
    
    // Send ChatOps notification
    await supabase.from('chatops_messages').insert({
      sender: 'System (DevOps)',
      message: `✅ Auto-remediation successfully deployed for incident group ${group.id}. Terraform state updated.`,
      channel: 'general'
    });
    
    setDeployingGroups(prev => ({ ...prev, [group.id]: false }));
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const activeIncidents = incidents.filter(i => !i.is_fixed);
  const mttr = Math.max(5, 14 + activeIncidents.length);

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

      <div className="table-container glass" style={{ overflow: 'visible' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
          <h3>Correlated Alerts (AI Grouped)</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9em' }}>Alerts with the same correlation ID are grouped to reduce fatigue.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          {groups.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No recent alerts found.</div>
          ) : (
            groups.map(group => (
              <div key={group.id} style={{ 
                border: '1px solid var(--border-glass)', 
                borderRadius: '8px', 
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden'
              }}>
                {/* Group Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '1rem', 
                  background: 'rgba(0,0,0,0.2)',
                  cursor: group.isGrouped ? 'pointer' : 'default'
                }} onClick={() => group.isGrouped && toggleGroup(group.id)}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {group.isGrouped && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {expandedGroups[group.id] ? '▼' : '▶'}
                      </span>
                    )}
                    {group.type === 'security' ? <span className="badge danger">Critical</span> : 
                     group.type === 'database' ? <span className="badge warning">High</span> : 
                     <span className="badge safe">Medium</span>}
                    
                    <strong style={{ opacity: group.is_fixed ? 0.5 : 1, textDecoration: group.is_fixed ? 'line-through' : 'none' }}>
                      {group.title} {group.isGrouped && `(${group.incidents.length} related)`}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {!group.is_fixed && group.proposed_fix && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeployFix(group); }}
                        disabled={deployingGroups[group.id]}
                        className="glass-button" 
                        style={{ padding: '0.4rem 1rem', background: deployingGroups[group.id] ? 'var(--warning)' : 'var(--accent)', color: 'white', border: 'none' }}
                      >
                        {deployingGroups[group.id] ? 'Deploying...' : 'Deploy Fix (IaC)'}
                      </button>
                    )}
                    <span style={{ color: group.is_fixed ? 'var(--safe)' : 'var(--warning)', fontSize: '0.9em' }}>
                      {group.is_fixed ? 'Resolved' : 'Investigating'}
                    </span>
                  </div>
                </div>
                
                {/* Proposed Fix Preview */}
                {!group.is_fixed && group.proposed_fix && (
                  <div style={{ padding: '1rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(16, 185, 129, 0.05)' }}>
                    <div style={{ fontSize: '0.85em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Proposed Remediation:</div>
                    <pre style={{ margin: 0, padding: '1rem', background: '#0d0d10', borderRadius: '4px', fontSize: '0.85em', color: 'var(--text-bright)', overflowX: 'auto' }}>
                      {group.proposed_fix}
                    </pre>
                  </div>
                )}

                {/* Expanded Children */}
                {group.isGrouped && expandedGroups[group.id] && (
                  <div style={{ padding: '0', borderTop: '1px solid var(--border-glass)' }}>
                    <table className="data-table" style={{ margin: 0 }}>
                      <tbody>
                        {group.incidents.map(inc => (
                          <tr key={inc.id} style={{ opacity: inc.is_fixed ? 0.5 : 1 }}>
                            <td style={{ paddingLeft: '2.5rem', color: 'var(--text-muted)', fontSize: '0.9em' }}>{new Date(inc.created_at).toLocaleTimeString()}</td>
                            <td style={{ fontSize: '0.9em' }}>{inc.explanation}</td>
                            <td style={{ fontSize: '0.9em' }}>{inc.source || 'System'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
