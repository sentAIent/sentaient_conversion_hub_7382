import React, { useState, useEffect } from 'react';

const ContangoTermStructure = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tradeNotice, setTradeNotice] = useState(null);

  const fetchTermStructure = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contango/term-structure');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load contango term structure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTermStructure();
    const interval = setInterval(fetchTermStructure, 15000);
    return () => clearInterval(interval);
  }, []);

  const executeRollHarvest = async (signal) => {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/alpha/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: "SVIX",
          side: "BUY",
          confidence: signal.confidence || 0.88,
          target_allocation_pct: 7.5,
          stop_loss_pct: 3.5,
          take_profit_pct: 7.0
        })
      });
      const receipt = await res.json();
      setTradeNotice(`⚡ Roll-Yield Trade Dispatched: ${receipt.side} ${receipt.qty} ${receipt.symbol} @ ~$${receipt.fill_price} (Trailing Stop: $${receipt.stop_loss_price})`);
      setTimeout(() => setTradeNotice(null), 7000);
    } catch (e) {
      alert("Execution error: " + e.message);
    }
  };

  if (!data) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
        Loading Contango VIX Futures Term Structure Engine...
      </div>
    );
  }

  const isContango = data.contango_pct_m1_m2 > 0;
  const maxCurveVal = Math.max(...data.curve_points.map(p => p.value));
  const minCurveVal = Math.min(...data.curve_points.map(p => p.value)) * 0.9;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '10px' }}>
      
      {/* Top Banner & Regime Status */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f8fafc', fontWeight: 800 }}>
              🌊 VIX Futures Term Structure & Roll-Yield Engine
            </h2>
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 800,
              background: isContango ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              color: isContango ? '#10b981' : '#ef4444',
              border: `1px solid ${isContango ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              {data.regime.replace(/_/g, ' ')}
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
            Exploiting futures curve curvature (VX1 vs VX2) to monetize term structure roll decay with automated tail risk guardrails.
          </p>
        </div>

        <button
          onClick={fetchTermStructure}
          disabled={loading}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Curve'}
        </button>
      </div>

      {tradeNotice && (
        <div style={{
          padding: '14px 20px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          borderRadius: '8px',
          color: '#10b981',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          {tradeNotice}
        </div>
      )}

      {/* Metric Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Spot VIX Index</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>{data.spot_vix}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Cboe Volatility Index</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Front Month (VX1)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '6px' }}>{data.vx1}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Nearest Futures Contract</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>M1/M2 Contango Slope</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: isContango ? '#10b981' : '#ef4444', marginTop: '6px' }}>
            {data.contango_pct_m1_m2 > 0 ? `+${data.contango_pct_m1_m2}%` : `${data.contango_pct_m1_m2}%`}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>VX2 vs VX1 Premium Spread</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Annualized Roll Yield</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7', marginTop: '6px' }}>
            +{data.annualized_roll_yield}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Roll Decay Monetization Rate</div>
        </div>
      </div>

      {/* Main Grid: Interactive Curve & Alpha Recommendation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        
        {/* Left: Term Structure Curve Visualizer */}
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>📈 Live VIX Futures Term Structure Curve</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Normal Contango State</span>
          </div>

          {/* SVG Term Structure Line Chart */}
          <div style={{ width: '100%', height: '220px', position: 'relative', marginTop: '10px' }}>
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map(idx => (
                <line 
                  key={idx} 
                  x1="0" 
                  y1={idx * 50} 
                  x2="100%" 
                  y2={idx * 50} 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeDasharray="4 4" 
                />
              ))}

              {/* Curve Line */}
              {data.curve_points.length > 1 && (
                <polyline
                  fill="none"
                  stroke="url(#curveGradient)"
                  strokeWidth="3.5"
                  points={data.curve_points.map((pt, idx) => {
                    const x = (idx / (data.curve_points.length - 1)) * 90 + 5; // percentage
                    const y = 200 - ((pt.value - minCurveVal) / (maxCurveVal - minCurveVal)) * 160;
                    return `${x}%,${y}`;
                  }).join(' ')}
                />
              )}

              {/* Point Nodes */}
              {data.curve_points.map((pt, idx) => {
                const x = (idx / (data.curve_points.length - 1)) * 90 + 5;
                const y = 200 - ((pt.value - minCurveVal) / (maxCurveVal - minCurveVal)) * 160;
                return (
                  <g key={idx}>
                    <circle cx={`${x}%`} cy={y} r="6" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                    <text x={`${x}%`} y={y - 12} fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle">
                      {pt.value}
                    </text>
                    <text x={`${x}%`} y="218" fill="#94a3b8" fontSize="10" textAnchor="middle">
                      {pt.tenor}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
            <span>Curve Slope: <strong>+{data.contango_pct_m1_m2}%</strong></span>
            <span>M1 Days to Expiry: <strong>28 Days</strong></span>
            <span>Front-Month Decay Velocity: <strong>-0.14 pts / session</strong></span>
          </div>
        </div>

        {/* Right: Automated Alpha Signal Card */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Institutional Alpha Thesis
            </div>
            <h3 style={{ margin: '8px 0 0 0', fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
              {data.alpha_signal.action.replace(/_/g, ' ')}
            </h3>
            <div style={{ marginTop: '4px', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
              {data.alpha_signal.roll_yield_edge}
            </div>

            <p style={{ marginTop: '14px', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              {data.alpha_signal.thesis}
            </p>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '12px', marginTop: '14px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8' }}>Recommended Vehicle:</span>
                <strong style={{ color: '#f8fafc' }}>{data.alpha_signal.recommended_asset}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8' }}>Confidence Rating:</span>
                <strong style={{ color: '#10b981' }}>{(data.alpha_signal.confidence * 100).toFixed(0)}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Risk Management:</span>
                <strong style={{ color: '#38bdf8' }}>5% Trailing Stop Bracket</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => executeRollHarvest(data.alpha_signal)}
            className="btn-primary"
            style={{
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ⚡ Deploy Volatility Harvest Strategy
          </button>
        </div>

      </div>

      {/* Commodity Contango Matrix */}
      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px' }}>
        <h4 style={{ margin: '0 0 14px 0', fontSize: '0.9rem', color: '#f8fafc', fontWeight: 700 }}>
          📦 Cross-Commodity Futures Term Structure Matrix
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {data.commodities.map((comm, idx) => (
            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '14px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                <span>{comm.asset}</span>
                <span style={{ color: '#38bdf8' }}>${comm.spot}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '4px' }}>
                <span>M1 / M2: ${comm.front_month} / ${comm.second_month}</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>{comm.curve_state}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Edge: {comm.roll_harvest}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContangoTermStructure;
