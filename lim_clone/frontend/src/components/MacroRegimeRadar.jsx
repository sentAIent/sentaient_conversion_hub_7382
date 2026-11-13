import { useState, useEffect } from 'react';

const MacroRegimeRadar = () => {
  const [macroData, setMacroData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMacro = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/macro/regime');
      const json = await res.json();
      setMacroData(json);
    } catch (err) {
      console.error('Failed to fetch macro regime', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMacro();
  }, []);

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🌐 Macro Regime Classifier & US Treasury Yield Curve Radar
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Treasury yield curve inversion tracking, NY Fed recession probabilities, 4-state Hidden Markov regime detection, and dynamic leverage throttling.
          </p>
        </div>

        <button
          onClick={fetchMacro}
          style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          🔄 Refresh Macro Feeds
        </button>
      </div>

      {loading && !macroData ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Synthesizing macroeconomic curve & regime telemetry...</div>
      ) : macroData ? (
        <>
          {/* Top Macro Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>10Y - 2Y Spread</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: macroData.spread_10y_2y_bps >= 0 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
                {macroData.spread_10y_2y_bps >= 0 ? '+' : ''}{macroData.spread_10y_2y_bps} bps
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Curve: <strong>{macroData.curve_status}</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>NY Fed Recession Probability</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: macroData.recession_probability_pct > 35 ? '#ef4444' : '#f59e0b', marginTop: '4px' }}>
                {macroData.recession_probability_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                10Y-3M Spread: {macroData.spread_10y_3m_bps} bps
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sahm Rule Recession Check</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: macroData.sahm_rule_triggered ? '#ef4444' : '#10b981', marginTop: '4px' }}>
                {macroData.sahm_rule_indicator.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Threshold: 0.50 (Status: {macroData.sahm_rule_triggered ? 'TRIGGERED' : 'SAFE'})
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Recommended Leverage</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {macroData.recommended_leverage_multiplier}x
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                Dynamic Strategy Sizing
              </div>
            </div>
          </div>

          {/* Leverage Guidance Alert */}
          <div style={{ padding: '12px 16px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>💡 Risk Throttling Advice:</strong> {macroData.leverage_guidance}
          </div>

          {/* Yield Curve SVG Comparison Chart */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>📈 US Treasury Yield Curve Surface</span>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '3px', background: '#38bdf8' }} /> Current
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '3px', background: '#94a3b8' }} /> 1 Month Ago
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '3px', background: '#64748b' }} /> 1 Year Ago
                </span>
              </div>
            </div>

            {/* SVG Curve */}
            <div style={{ overflowX: 'auto' }}>
              <svg viewBox="0 0 700 200" style={{ width: '100%', height: '200px' }}>
                {/* Horizontal reference grid lines */}
                {[3.5, 4.0, 4.5, 5.0, 5.5].map((yVal) => {
                  const y = 180 - ((yVal - 3.5) / 2.0) * 150;
                  return (
                    <g key={yVal}>
                      <line x1="40" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                      <text x="10" y={y + 4} fill="#64748b" fontSize="10">{yVal}%</text>
                    </g>
                  );
                })}

                {/* Plot curves */}
                {(() => {
                  const ptsCurrent = macroData.yield_curve.map((pt, idx) => {
                    const x = 50 + idx * 58;
                    const y = 180 - ((pt.current - 3.5) / 2.0) * 150;
                    return `${x},${y}`;
                  }).join(' ');

                  const ptsMonthAgo = macroData.yield_curve.map((pt, idx) => {
                    const x = 50 + idx * 58;
                    const y = 180 - ((pt.one_month_ago - 3.5) / 2.0) * 150;
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <>
                      <polyline fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" points={ptsMonthAgo} />
                      <polyline fill="none" stroke="#38bdf8" strokeWidth="3" points={ptsCurrent} />
                      {macroData.yield_curve.map((pt, idx) => {
                        const x = 50 + idx * 58;
                        const y = 180 - ((pt.current - 3.5) / 2.0) * 150;
                        return (
                          <g key={idx}>
                            <circle cx={x} cy={y} r="4" fill="#38bdf8" />
                            <text x={x} y="196" fill="#94a3b8" fontSize="11" textAnchor="middle">{pt.tenor}</text>
                            <text x={x} y={y - 8} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">{pt.current}%</text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* 4-State Macro Regime Classifier Matrix */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
              🧠 4-State Hidden Markov Macro Regime Classifier
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              {macroData.regime_probabilities.map((r) => {
                const isActive = r.state === macroData.current_regime;
                return (
                  <div
                    key={r.state}
                    style={{
                      background: isActive ? 'rgba(56,189,248,0.1)' : 'rgba(0,0,0,0.2)',
                      border: `1px solid ${isActive ? '#38bdf8' : 'rgba(255,255,255,0.05)'}`,
                      padding: '14px',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: isActive ? '#38bdf8' : '#fff' }}>
                        {r.state.replace(/_/g, ' ')}
                      </span>
                      {isActive && (
                        <span style={{ padding: '2px 6px', background: '#38bdf8', color: '#000', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800 }}>
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                      {(r.probability * 100).toFixed(0)}% Probability
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>
                      {r.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </>
      ) : null}

    </div>
  );
};

export default MacroRegimeRadar;
