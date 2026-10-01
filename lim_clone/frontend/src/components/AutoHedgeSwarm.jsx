import React, { useState, useEffect } from 'react';

const AutoHedgeSwarm = () => {
  const [logs, setLogs] = useState([]);
  const [isSwarmRunning, setIsSwarmRunning] = useState(false);
  const [metrics, setMetrics] = useState({
    activeTheses: 0,
    openPositions: 0,
    pnl: "$0.00",
    winRate: "0%"
  });

  // Pull status from the FastAPI backend
  const fetchStatus = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/fincept/swarm/status');
      const data = await res.json();
      setIsSwarmRunning(data.is_running);
      setLogs(data.logs || []);
      setMetrics(data.metrics || {
        activeTheses: 0,
        openPositions: 0,
        pnl: "$0.00",
        winRate: "0%"
      });
    } catch (err) {
      console.error('Error fetching swarm status:', err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStatus();

    // Set up polling interval
    const interval = setInterval(() => {
      fetchStatus();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleStartSwarm = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/fincept/swarm/start', { method: 'POST' });
      const result = await res.json();
      if (result.status === 'success' || result.status === 'already_running') {
        setIsSwarmRunning(true);
        fetchStatus();
      }
    } catch (err) {
      alert('Failed to start swarm: ' + err.message);
    }
  };

  const handleStopSwarm = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/fincept/swarm/stop', { method: 'POST' });
      const result = await res.json();
      if (result.status === 'success' || result.status === 'not_running') {
        setIsSwarmRunning(false);
        fetchStatus();
      }
    } catch (err) {
      alert('Failed to stop swarm: ' + err.message);
    }
  };

  const getLogColor = (log) => {
    if (log.includes('[MACRO]')) return '#60a5fa'; // Blue
    if (log.includes('[FUNDAMENTAL]')) return '#c084fc'; // Purple
    if (log.includes('[RISK]')) return '#fb923c'; // Orange
    if (log.includes('[EXECUTION]')) return '#34d399'; // Green
    return '#94a3b8'; // Gray / default
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#e2e8f0', padding: '24px', fontFamily: 'sans-serif' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>AutoHedge Swarm</h2>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
            Autonomous multi-agent quant intelligence debating & executing trades.
          </p>
        </div>
        
        {/* Swarm Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={isSwarmRunning ? handleStopSwarm : handleStartSwarm}
            style={{ 
              background: isSwarmRunning ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', 
              color: isSwarmRunning ? '#ef4444' : '#10b981', 
              border: `1px solid ${isSwarmRunning ? '#ef4444' : '#10b981'}`,
              padding: '8px 20px', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            {isSwarmRunning ? 'Stop Daemon Swarm' : 'Start Daemon Swarm'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pulse-dot" style={{ background: isSwarmRunning ? '#10b981' : '#f97316' }}></div>
            <span style={{ color: isSwarmRunning ? '#10b981' : '#f97316', fontWeight: 600, letterSpacing: '1px', fontSize: '0.85rem' }}>
              {isSwarmRunning ? 'SWARM ONLINE' : 'SWARM STANDBY'}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Active Theses</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.activeTheses}</div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Open Positions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.openPositions}</div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: metrics.pnl.startsWith('-') ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Net PnL (Session)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: metrics.pnl.startsWith('-') ? '#ef4444' : '#10b981' }}>{metrics.pnl}</div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>Win Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{metrics.winRate}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        {/* Terminal Logs */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', background: '#0b0e14', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.85rem', color: '#94a3b8' }}>
            Live Swarm Telemetry Log
          </div>
          <div style={{ padding: '16px', flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#64748b', fontStyle: 'italic', padding: '12px' }}>Swarm is idle. Click "Start Swarm" above to begin monitoring.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ color: getLogColor(log), borderBottom: '1px solid rgba(255,255,255,0.01)', paddingBottom: '4px' }}>
                  <span style={{ color: '#475569', marginRight: '8px' }}>[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Agents Status */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Agent Personas</h4>
          
          {[
            { name: 'Director Agent', desc: 'Swarms router & strategist' },
            { name: 'Macro Economist', desc: 'Global context & flow analyst' },
            { name: 'Fundamental Analyst', desc: 'Earnings & DCF valuation' },
            { name: 'Risk Manager', desc: 'Kelly sizing & VaR limits' },
            { name: 'Execution Router', desc: 'Secondary LP trade router' }
          ].map(agent => (
            <div key={agent.name} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem' }}>{agent.name}</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: isSwarmRunning ? '#10b981' : '#94a3b8', 
                  background: isSwarmRunning ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)', 
                  padding: '2px 8px', 
                  borderRadius: '999px' 
                }}>
                  {isSwarmRunning ? 'Active' : 'Standby'}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{agent.desc}</span>
            </div>
          ))}
          
        </div>
      </div>

    </div>
  );
};

export default AutoHedgeSwarm;
