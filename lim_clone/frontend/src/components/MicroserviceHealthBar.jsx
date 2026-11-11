import React, { useState, useEffect } from 'react';

const MicroserviceHealthBar = () => {
  const [goHealth, setGoHealth] = useState({ online: false, latency: null, data: null });
  const [pythonHealth, setPythonHealth] = useState({ online: false, latency: null, data: null });
  const [clickhouseHealth, setClickhouseHealth] = useState({ online: false, rows: 0, status: 'standby' });
  const [alpacaStatus, setAlpacaStatus] = useState({ mode: 'simulated', connected: false });
  const [showDetails, setShowDetails] = useState(false);
  const [killSwitchLoading, setKillSwitchLoading] = useState(false);
  const [killNotice, setKillNotice] = useState(null);

  const checkHealth = async () => {
    // 1. Check Go Engine (8080)
    const t0 = performance.now();
    try {
      const res = await fetch('http://127.0.0.1:8080/api/health', { signal: AbortSignal.timeout(3000) });
      const lat = Math.round(performance.now() - t0);
      if (res.ok) {
        const data = await res.json();
        setGoHealth({ online: true, latency: lat, data });
        setAlpacaStatus({
          mode: data.alpaca_mode || 'simulated',
          connected: !!data.alpaca_connected
        });
        setClickhouseHealth(prev => ({
          ...prev,
          online: !!data.clickhouse_connected,
          status: data.clickhouse_connected ? 'connected' : 'standby'
        }));
      } else {
        setGoHealth({ online: false, latency: lat, data: null });
      }
    } catch {
      setGoHealth({ online: false, latency: null, data: null });
    }

    // 2. Check Python Gateway (8000)
    const t1 = performance.now();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/health', { signal: AbortSignal.timeout(3000) });
      const lat = Math.round(performance.now() - t1);
      if (res.ok) {
        const data = await res.json();
        setPythonHealth({ online: true, latency: lat, data });
      } else {
        setPythonHealth({ online: false, latency: lat, data: null });
      }
    } catch {
      setPythonHealth({ online: false, latency: null, data: null });
    }

    // 3. Check ClickHouse Status
    try {
      const res = await fetch('http://127.0.0.1:8080/api/clickhouse/status', { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        setClickhouseHealth({
          online: !!data.connected,
          rows: data.raw_rows || 0,
          status: data.status || (data.connected ? 'online' : 'standby')
        });
      }
    } catch {
      // Ignored, handled gracefully
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  const triggerKillSwitch = async () => {
    if (!window.confirm("🚨 EMERGENCY ACTION: Flatten all open positions and cancel all pending orders immediately?")) {
      return;
    }
    setKillSwitchLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/trade/kill-switch', { method: 'POST' });
      const data = await res.json();
      setKillNotice(data.message || 'Market risk flattened.');
      setTimeout(() => setKillNotice(null), 6000);
    } catch (e) {
      alert("Kill switch error: " + e.message);
    } finally {
      setKillSwitchLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      
      {/* Go Engine Pill */}
      <div 
        onClick={() => setShowDetails(!showDetails)}
        title="Go High-Speed OMS Engine (8080)"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          background: goHealth.online ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${goHealth.online ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '6px',
          fontSize: '0.75rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: goHealth.online ? '#10b981' : '#ef4444',
          boxShadow: goHealth.online ? '0 0 6px #10b981' : 'none',
          display: 'inline-block'
        }}></span>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Go OMS</span>
        {goHealth.online && (
          <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{goHealth.latency}ms</span>
        )}
      </div>

      {/* Python AI Gateway Pill */}
      <div 
        onClick={() => setShowDetails(!showDetails)}
        title="Python AI Gateway & LangGraph (8000)"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          background: pythonHealth.online ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${pythonHealth.online ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '6px',
          fontSize: '0.75rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: pythonHealth.online ? '#3b82f6' : '#ef4444',
          boxShadow: pythonHealth.online ? '0 0 6px #3b82f6' : 'none',
          display: 'inline-block'
        }}></span>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Python AI</span>
        {pythonHealth.online && (
          <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{pythonHealth.latency}ms</span>
        )}
      </div>

      {/* Alpaca Feed Pill */}
      <div 
        onClick={() => setShowDetails(!showDetails)}
        title="Alpaca Broker Connection Mode"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          background: alpacaStatus.connected ? 'rgba(245, 158, 11, 0.12)' : 'rgba(100, 116, 139, 0.15)',
          border: `1px solid ${alpacaStatus.connected ? 'rgba(245, 158, 11, 0.3)' : 'rgba(100, 116, 139, 0.3)'}`,
          borderRadius: '6px',
          fontSize: '0.75rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: alpacaStatus.mode === 'live' ? '#10b981' : (alpacaStatus.connected ? '#f59e0b' : '#64748b'),
          display: 'inline-block'
        }}></span>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>
          {alpacaStatus.mode === 'live' ? 'Alpaca LIVE' : (alpacaStatus.connected ? 'Alpaca PAPER' : 'Alpaca SIM')}
        </span>
      </div>

      {/* ClickHouse Pill */}
      <div 
        onClick={() => setShowDetails(!showDetails)}
        title="ClickHouse High-Speed Columnar DB"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          background: clickhouseHealth.online ? 'rgba(168, 85, 247, 0.1)' : 'rgba(100, 116, 139, 0.1)',
          border: `1px solid ${clickhouseHealth.online ? 'rgba(168, 85, 247, 0.3)' : 'rgba(100, 116, 139, 0.2)'}`,
          borderRadius: '6px',
          fontSize: '0.75rem',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: clickhouseHealth.online ? '#a855f7' : '#64748b',
          display: 'inline-block'
        }}></span>
        <span style={{ color: '#e2e8f0', fontWeight: 600 }}>ClickHouse</span>
        {clickhouseHealth.rows > 0 && (
          <span style={{ color: '#c084fc', fontSize: '0.7rem' }}>{clickhouseHealth.rows.toLocaleString()} bars</span>
        )}
      </div>

      {/* Emergency Flatten Button */}
      <button
        onClick={triggerKillSwitch}
        disabled={killSwitchLoading}
        title="Emergency Flatten: Cancel all open orders and close positions"
        style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: '#f87171',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          cursor: 'pointer',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'all 0.2s'
        }}
      >
        <span>🚨</span>
        <span>{killSwitchLoading ? 'Flattening...' : 'Kill Switch'}</span>
      </button>

      {/* Emergency Notification Toast */}
      {killNotice && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(239, 68, 68, 0.95)',
          color: '#fff',
          padding: '12px 18px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          {killNotice}
        </div>
      )}

      {/* Telemetry Modal / Popover */}
      {showDetails && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '180px',
          zIndex: 999,
          width: '320px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Microservice Telemetry</span>
            <button 
              onClick={() => setShowDetails(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
            >
              &times;
            </button>
          </div>

          <div style={{ fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Go Analytics & OMS (8080):</span>
              <strong style={{ color: goHealth.online ? '#10b981' : '#ef4444' }}>
                {goHealth.online ? `ONLINE (${goHealth.latency}ms)` : 'OFFLINE'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Python AI Gateway (8000):</span>
              <strong style={{ color: pythonHealth.online ? '#3b82f6' : '#ef4444' }}>
                {pythonHealth.online ? `ONLINE (${pythonHealth.latency}ms)` : 'OFFLINE'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Broker Execution Mode:</span>
              <strong style={{ color: alpacaStatus.mode === 'live' ? '#10b981' : '#f59e0b' }}>
                {alpacaStatus.mode.toUpperCase()}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>ClickHouse Tick Engine:</span>
              <strong style={{ color: clickhouseHealth.online ? '#a855f7' : '#64748b' }}>
                {clickhouseHealth.online ? `${clickhouseHealth.rows} Rows` : 'STANDBY'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Gemini LLM Integration:</span>
              <strong style={{ color: pythonHealth.data?.gemini_enabled ? '#10b981' : '#94a3b8' }}>
                {pythonHealth.data?.gemini_enabled ? 'ENABLED' : 'HEURISTIC (OFFLINE)'}
              </strong>
            </div>
          </div>

          <button
            onClick={checkHealth}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e2e8f0',
              padding: '6px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            🔄 Refresh Health Ping
          </button>
        </div>
      )}

    </div>
  );
};

export default MicroserviceHealthBar;
