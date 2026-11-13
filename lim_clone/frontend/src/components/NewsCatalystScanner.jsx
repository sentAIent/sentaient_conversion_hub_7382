import React, { useState, useEffect } from 'react';

export default function NewsCatalystScanner() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, HIGH_PRIORITY, BREAKING
  const [stagedOrder, setStagedOrder] = useState(null);

  const fetchCatalysts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/news/catalysts');
      const json = await res.json();
      if (json.status === 'success') {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch news catalysts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalysts();
    const interval = setInterval(fetchCatalysts, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleStageOrder = (catalyst) => {
    setStagedOrder({
      ticker: catalyst.ticker,
      action: catalyst.recommended_action,
      sentiment_score: catalyst.sentiment_score,
      urgency: catalyst.urgency,
      headline: catalyst.headline,
      stagedAt: new Date().toLocaleTimeString(),
      shares: catalyst.sentiment_score > 0 ? 500 : 300,
    });
  };

  const filteredCatalysts = data?.catalysts?.filter(c => {
    if (filter === 'HIGH_PRIORITY') return c.urgency === 'HIGH' || c.urgency === 'CRITICAL';
    if (filter === 'BREAKING') return c.sentiment_score > 0.8 || c.sentiment_score < -0.6;
    return true;
  }) || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📰</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Breaking News NLP & Audio Squawk Momentum Scanner
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              LOW-LATENCY WIRE
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Sub-second headline entity recognition, velocity scoring, and synthetic direct audio squawk transcription.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#0f172a', padding: '3px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            {['ALL', 'HIGH_PRIORITY', 'BREAKING'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  background: filter === tab ? '#2563eb' : 'transparent',
                  color: filter === tab ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={() => { setLoading(true); fetchCatalysts(); }}
            style={{
              background: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Refreshing...' : '🔄 Poll Wire'}
          </button>
        </div>
      </div>

      {/* Audio Squawk Box */}
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '18px' }}>
            🎙️
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444', letterSpacing: '0.05em' }}>● LIVE DESK SQUAWK TRANSCRIPT</span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>• {data?.squawk_feed?.channel || 'INSTITUTIONAL SYNDICATE #1'}</span>
            </div>
            <div style={{ fontSize: '14px', color: '#f1f5f9', fontStyle: 'italic', background: '#090d16', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
              "{data?.squawk_feed?.latest_transcript || 'Monitoring desk chatter across macro rates, options floor flow, and regulatory wires...'}"
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>VOICE MODEL LATENCY</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#10b981', fontFamily: 'monospace' }}>
            {data?.squawk_feed?.latency_ms || 42} ms
          </div>
        </div>
      </div>

      {/* Main Grid: Feed + Order Staging */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left: Wire Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredCatalysts.map((cat, idx) => {
            const isBullish = cat.sentiment_score > 0.2;
            const isBearish = cat.sentiment_score < -0.2;
            const sentimentColor = isBullish ? '#10b981' : isBearish ? '#ef4444' : '#94a3b8';
            const urgencyBg = cat.urgency === 'CRITICAL' ? 'rgba(239, 68, 68, 0.2)' : cat.urgency === 'HIGH' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.1)';
            const urgencyBorder = cat.urgency === 'CRITICAL' ? '#ef4444' : cat.urgency === 'HIGH' ? '#f59e0b' : '#38bdf8';

            return (
              <div
                key={idx}
                style={{
                  background: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  borderLeft: `4px solid ${sentimentColor}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#f8fafc', fontFamily: 'monospace', background: '#1e293b', padding: '2px 8px', borderRadius: '4px' }}>
                      {cat.ticker}
                    </span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: urgencyBg, color: urgencyBorder, fontWeight: '700', border: `1px solid ${urgencyBorder}40` }}>
                      {cat.urgency}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {cat.source} • {cat.timestamp}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>NLP Score:</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', fontFamily: 'monospace', color: sentimentColor }}>
                      {(cat.sentiment_score > 0 ? '+' : '') + (cat.sentiment_score * 100).toFixed(1)}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: '500', lineHeight: 1.4 }}>
                  {cat.headline}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#94a3b8' }}>
                    <div>
                      Velocity: <span style={{ color: '#38bdf8', fontWeight: '600' }}>{cat.velocity || 'High'}</span>
                    </div>
                    <div>
                      Keywords: <span style={{ color: '#cbd5e1' }}>{cat.key_entities?.join(', ') || 'N/A'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStageOrder(cat)}
                    style={{
                      background: isBullish ? '#065f46' : isBearish ? '#991b1b' : '#334155',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    ⚡ Stage {cat.recommended_action || (isBullish ? 'MOMENTUM BUY' : 'MOMENTUM SHORT')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Order Staging Drawer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span> Order Execution Staging
            </h3>

            {stagedOrder ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#090d16', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Ticker:</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8', fontFamily: 'monospace' }}>{stagedOrder.ticker}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Action:</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: stagedOrder.action?.includes('BUY') ? '#10b981' : '#ef4444' }}>
                      {stagedOrder.action}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Urgency Tier:</span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#f59e0b' }}>{stagedOrder.urgency}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Allocated Shares:</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>{stagedOrder.shares} shs</span>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', background: '#1e293b40', padding: '8px', borderRadius: '6px' }}>
                  "{stagedOrder.headline.slice(0, 80)}..."
                </div>

                <button
                  onClick={() => {
                    alert(`Order broadcast to Alpaca / FIX OMS: ${stagedOrder.action} ${stagedOrder.shares} ${stagedOrder.ticker}`);
                    setStagedOrder(null);
                  }}
                  style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  🚀 Fire DMA Instant Execution
                </button>
                <button
                  onClick={() => setStagedOrder(null)}
                  style={{
                    background: 'transparent',
                    color: '#94a3b8',
                    border: '1px solid #334155',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 12px', color: '#64748b', fontSize: '12px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>📥</div>
                Click "Stage Momentum" on any breaking catalyst to review sizing & route instant Direct Market Access (DMA) orders.
              </div>
            )}
          </div>

          {/* NLP Velocity Breakdown */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#cbd5e1', margin: '0 0 12px 0' }}>
              📡 Engine Wire Statistics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Entities Tracked:</span>
                <span style={{ color: '#f8fafc', fontWeight: '600' }}>1,420 equities</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Mean Pipeline Latency:</span>
                <span style={{ color: '#10b981', fontWeight: '600', fontFamily: 'monospace' }}>18.4 ms</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Parsing Model:</span>
                <span style={{ color: '#94a3b8' }}>FinBERT-Distil v3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
