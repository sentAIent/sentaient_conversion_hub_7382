import { useState, useEffect } from 'react';

const VolSurfaceLab = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('30D');

  const fetchSurface = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/vol-surface/profile?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch vol surface', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurface(symbol);
  }, [symbol]);

  const filteredMesh = data?.mesh_points?.filter((p) => p.term === selectedTerm) || [];

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🏔️ 3D Volatility Surface & SABR Skew / Smile Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Hagan's SABR model calibration across moneyness and term structures, computing 25-delta Risk Reversals and Butterfly smiles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['SPY', 'QQQ', 'NVDA', 'AAPL', 'TSLA'].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: symbol === s ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                color: symbol === s ? '#fff' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Calibrating SABR Volatility Surface...</div>
      ) : data ? (
        <>
          {/* Top Parameter & Metric Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SABR Skew Correlation (ρ)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                {data.sabr_parameters?.rho_correlation}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Steep downside crash put premium
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Vol-of-Vol Parameter (ν)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {data.sabr_parameters?.nu_vol_of_vol}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Tail wing curvature / smile strength
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>30D 25Δ Risk Reversal (Skew)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                +{data.term_skew_summary?.find((t) => t.term === '30D')?.skew_25d_rr} pts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Put IV premium over Call IV
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>30D 25Δ Butterfly (Smile)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                +{data.term_skew_summary?.find((t) => t.term === '30D')?.smile_25d_fly} pts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Wing curvature over ATM IV
              </div>
            </div>
          </div>

          {/* Isometric Perspective Wireframe Grid */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>🌐 Isometric Volatility Surface Wireframe (Moneyness vs Expiration vs IV)</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['7D', '14D', '30D', '60D', '90D', '180D', '365D'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTerm(t)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: 'none',
                      background: selectedTerm === t ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                      color: selectedTerm === t ? '#fff' : '#94a3b8',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t} Slice
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Skew Smile Curve for selected term */}
            <div style={{ overflowX: 'auto' }}>
              <svg viewBox="0 0 700 180" style={{ width: '100%', height: '180px' }}>
                {[10, 15, 20, 25, 30].map((iv) => {
                  const y = 160 - ((iv - 10) / 20.0) * 130;
                  return (
                    <g key={iv}>
                      <line x1="40" y1={y} x2="680" y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                      <text x="12" y={y + 4} fill="#64748b" fontSize="10">{iv}%</text>
                    </g>
                  );
                })}

                {(() => {
                  const pts = filteredMesh.map((pt, idx) => {
                    const x = 50 + idx * 72;
                    const y = 160 - ((pt.implied_vol_pct - 10.0) / 20.0) * 130;
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <>
                      <polyline fill="none" stroke="#8b5cf6" strokeWidth="3" points={pts} />
                      {filteredMesh.map((pt, idx) => {
                        const x = 50 + idx * 72;
                        const y = 160 - ((pt.implied_vol_pct - 10.0) / 20.0) * 130;
                        const isAtm = pt.moneyness_pct === 100;
                        return (
                          <g key={idx}>
                            <circle cx={x} cy={y} r={isAtm ? 6 : 4} fill={isAtm ? '#f59e0b' : '#8b5cf6'} />
                            <text x={x} y="174" fill="#94a3b8" fontSize="10" textAnchor="middle">{pt.moneyness_pct}%</text>
                            <text x={x} y={y - 8} fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle">{pt.implied_vol_pct}%</text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
              Moneyness Axis ($K/S$) — Notice the sharp asymmetric rise in Implied Volatility for OTM Puts (&lt; 100%)
            </div>
          </div>

          {/* Term Structure Skew Summary Table */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
              📊 Term Structure Skew & Butterfly Convexity Matrix
            </div>
            <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '8px' }}>Maturity Term</th>
                  <th style={{ padding: '8px' }}>Days to Expiry</th>
                  <th style={{ padding: '8px' }}>ATM Implied Vol</th>
                  <th style={{ padding: '8px' }}>25Δ Risk Reversal (Skew)</th>
                  <th style={{ padding: '8px' }}>25Δ Butterfly (Smile)</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Regime</th>
                </tr>
              </thead>
              <tbody>
                {data.term_skew_summary?.map((t) => (
                  <tr key={t.term} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#c084fc' }}>{t.term}</td>
                    <td style={{ padding: '8px', color: '#94a3b8' }}>{t.days}d</td>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>{t.atm_iv_pct}%</td>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#f59e0b' }}>+{t.skew_25d_rr} pts</td>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#10b981' }}>+{t.smile_25d_fly} pts</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      <span style={{ padding: '2px 8px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                        {t.regime}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default VolSurfaceLab;
