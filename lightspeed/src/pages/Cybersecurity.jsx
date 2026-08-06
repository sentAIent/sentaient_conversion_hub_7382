import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import ForceGraph2D from 'react-force-graph-2d';
import realKgData from '../../.ua/knowledge-graph.json';
import GraphRAG from '../components/GraphRAG';

export default function Cybersecurity() {
  const [threatData, setThreatData] = useState([]);
  const [vulnCount, setVulnCount] = useState(0);
  const [complianceScore, setComplianceScore] = useState(100);
  const [auditData, setAuditData] = useState([]);
  const [selectedApp, setSelectedApp] = useState('All');
  const [appsList, setAppsList] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [cisoBriefing, setCisoBriefing] = useState(null);
  const [architectureUpgrades, setArchitectureUpgrades] = useState([]);
  const [activeAttackPath, setActiveAttackPath] = useState(null);
  
  // Copilot State
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotMessages, setCopilotMessages] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const fgRef = useRef();
  const wsRef = useRef(null);

  // Real Graph Data from Understand-Anything
  const graphData = {
    nodes: realKgData.nodes.map(n => ({
      ...n,
      color: activeAttackPath?.nodes.includes(n.id) ? '#ef4444' : 
             n.tags?.includes('frontend') ? '#3b82f6' : 
             n.tags?.includes('backend') ? '#10b981' : '#8b5cf6',
      val: activeAttackPath?.nodes.includes(n.id) ? 20 : 10
    })),
    links: realKgData.edges
  };

  const attackPaths = [
    {
      id: 'path_1',
      name: 'SQL Injection via Web API',
      nodes: ['app', 'database', 'api'] // Assume these IDs exist in knowledge-graph.json
    },
    {
      id: 'path_2',
      name: 'S3 Bucket Exfiltration',
      nodes: ['app', 'storage', 'auth']
    }
  ];

  const handleCopilotSubmit = (e) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    
    setCopilotMessages(prev => [...prev, { text: copilotInput, sender: 'user' }]);
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'command', text: copilotInput }));
    } else {
      setCopilotMessages(prev => [...prev, { text: "Error: Page-Agent backend (ws://localhost:9002) is not connected. Make sure the Alibaba Page-Agent is running locally.", sender: 'agent' }]);
    }
    
    setCopilotInput('');
  };

  const fetchAiInsights = async () => {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
      
    if (data && data.length > 0) {
      const briefing = data.find(d => d.insight_type === 'ciso_briefing');
      if (briefing) setCisoBriefing({ date: new Date(briefing.created_at).toLocaleDateString(), ...briefing.data });
      
      const upgrades = data.filter(d => d.insight_type === 'architecture_upgrade');
      if (upgrades.length > 0) {
        setArchitectureUpgrades(upgrades.map(u => ({ id: u.id, ...u.data })));
      }
    }
  };

  const runVisualThreatAnalysis = async () => {
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('architect-review', {
        body: { graph: realKgData }
      });
      if (error) throw error;
      await fetchAiInsights(); // refresh the UI
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    // Setup Page-Agent WebSocket
    const ws = new WebSocket('ws://localhost:9002');
    ws.onopen = () => console.log('Connected to Page-Agent WebSocket');
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCopilotMessages(prev => [...prev, { text: data.message || JSON.stringify(data), sender: 'agent' }]);
      } catch (e) {
        setCopilotMessages(prev => [...prev, { text: event.data, sender: 'agent' }]);
      }
    };
    ws.onclose = () => console.log('Disconnected from Page-Agent');
    wsRef.current = ws;
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
    fetchAiInsights();

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
      
      <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ padding: '0.5rem 1rem', background: activeTab === 'overview' ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid var(--border-glass)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
        >
          Security Overview
        </button>
        <button 
          onClick={() => setActiveTab('architecture')}
          style={{ padding: '0.5rem 1rem', background: activeTab === 'architecture' ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid var(--border-glass)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
        >
          Visual Architecture
        </button>
        <button 
          onClick={() => setActiveTab('graphrag')}
          style={{ padding: '0.5rem 1rem', background: activeTab === 'graphrag' ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid var(--border-glass)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cloud Graph-RAG
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
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
              <h3>Daily CISO Briefing (AI Generated)</h3>
              {cisoBriefing && (
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginBottom: '1rem' }}>{cisoBriefing.date}</p>
                  <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}><strong>Summary:</strong> {cisoBriefing.summary}</p>
                  <p style={{ marginBottom: '1rem', color: 'var(--danger)' }}><strong>Top Threat:</strong> {cisoBriefing.topThreat}</p>
                  <p style={{ color: 'var(--accent)' }}><strong>Recommended Action:</strong> {cisoBriefing.recommendedAction}</p>
                </div>
              )}
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
        </>
      ) : activeTab === 'architecture' ? (
        <div className="widgets-grid" style={{ marginBottom: '2rem', height: '600px' }}>
          <div className="widget glass" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3>Interactive Security Architecture Map</h3>
                <p className="subtitle" style={{ marginTop: '0.2rem' }}>Powered by Understand-Anything & T3MP3ST</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select 
                  className="glass-input" 
                  style={{ padding: '0.4rem' }}
                  onChange={(e) => {
                    const path = attackPaths.find(p => p.id === e.target.value);
                    setActiveAttackPath(path || null);
                  }}
                >
                  <option value="">-- Highlight Attack Path --</option>
                  {attackPaths.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <button onClick={runVisualThreatAnalysis} disabled={analyzing} className="glass-button" style={{ fontSize: '0.9em', padding: '0.4rem 0.8rem', opacity: analyzing ? 0.7 : 1 }}>
                  {analyzing ? 'Analyzing...' : 'Run Visual Threat Analysis'}
                </button>
              </div>
            </div>
            <div style={{ flex: 1, border: '1px solid var(--border-glass)', borderRadius: '8px', overflow: 'hidden', background: '#0f0f13', position: 'relative', minHeight: '400px' }}>
              <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeLabel="name"
                nodeColor="color"
                linkColor={link => {
                  if (activeAttackPath) {
                    const sourceInPath = activeAttackPath.nodes.includes(link.source.id || link.source);
                    const targetInPath = activeAttackPath.nodes.includes(link.target.id || link.target);
                    if (sourceInPath && targetInPath) return 'rgba(239, 68, 68, 0.8)';
                  }
                  return 'rgba(255,255,255,0.2)';
                }}
                linkWidth={link => {
                  if (activeAttackPath) {
                    const sourceInPath = activeAttackPath.nodes.includes(link.source.id || link.source);
                    const targetInPath = activeAttackPath.nodes.includes(link.target.id || link.target);
                    if (sourceInPath && targetInPath) return 3;
                  }
                  return 1;
                }}
                nodeRelSize={6}
                backgroundColor="#0f0f13"
                onEngineStop={() => fgRef.current.zoomToFit(400, 50)}
              />
            </div>
          </div>

          
          <div className="widget glass" style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
            <h3>Suggested Architecture Upgrades (AI Architect)</h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {architectureUpgrades.map(upgrade => (
                <div key={upgrade.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--text-bright)' }}>{upgrade.component}</strong>
                    <span className={`status-badge ${upgrade.priority === 'High' ? 'status-danger' : 'status-warning'}`}>
                      {upgrade.priority} Priority
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95em' }}>{upgrade.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="widgets-grid" style={{ marginBottom: '2rem' }}>
          <div className="widget glass" style={{ gridColumn: '1 / -1' }}>
            <GraphRAG />
          </div>
        </div>
      )}
      
      {/* Floating Copilot Widget */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '350px', background: 'rgba(20,20,25,0.95)', border: '1px solid var(--border-glass)', borderRadius: '12px', overflow: 'hidden', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)', fontWeight: 600 }}>
          ⚡ LightSpeed Copilot
        </div>
        <div style={{ padding: '1rem', height: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {copilotMessages.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9em', textAlign: 'center', marginTop: '2rem' }}>
              I am your autonomous UI agent. Tell me what to do on this page (e.g. "Filter the audit table for Phase 2 tasks").
            </div>
          ) : (
            copilotMessages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', background: msg.sender === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.1)', padding: '0.6rem 1rem', borderRadius: '8px', maxWidth: '85%', fontSize: '0.9em' }}>
                {msg.text}
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleCopilotSubmit} style={{ padding: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={copilotInput}
            onChange={e => setCopilotInput(e.target.value)}
            placeholder="Ask Page-Agent to drive..." 
            className="glass-input" 
            style={{ flex: 1, padding: '0.6rem 1rem' }} 
          />
          <button type="submit" className="glass-button" style={{ padding: '0.6rem 1rem' }}>Send</button>
        </form>
      </div>
    </div>
  );
}
