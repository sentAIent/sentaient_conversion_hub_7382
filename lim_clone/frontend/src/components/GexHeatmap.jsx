import { useState, useEffect } from 'react';

const GexHeatmap = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGex = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/gex/profile?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch GEX profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGex(symbol);
  }, [symbol]);

  const maxAbsGex = data?.strikes
    ? Math.max(...data.strikes.map((s) => Math.max(Math.abs(s.call_gex_m), Math.abs(s.put_gex_m))))
    : 100;

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🎯 Market Maker Gamma Exposure (GEX) & 0DTE Heatmap
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Real-time dealer gamma profiling, Zero-Gamma Flip level, and structural Call/Put volatility pin walls.
          </p>
        </div>

        {/* Symbol Selectors */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['SPY', 'QQQ', 'NVDA', 'AAPL', 'TSLA'].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: symbol === s ? '#3b82f6' : 'rgba(255,255,255,0.05)',
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
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Calculating Market Maker Gamma Profile...</div>
      ) : data ? (
        <>
          {/* Key Metric Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Underlying Spot</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                ${data.spot_price?.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                0DTE Volume Share: <strong>{data.zero_dte_volume_share_pct}%</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Dealer Gamma</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: data.net_gex_millions >= 0 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
                {data.net_gex_millions >= 0 ? '+' : ''}{data.net_gex_millions} $M/1%
              </div>
              <div style={{ fontSize: '0.75rem', color: data.net_gex_millions >= 0 ? '#10b981' : '#ef4444', marginTop: '4px', fontWeight: 600 }}>
                {data.regime}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Zero-Gamma Flip Level</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                ${data.zero_gamma_flip?.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Vol threshold boundary
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Major Pin Walls</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '1.1rem', fontWeight: 800 }}>
                <span style={{ color: '#10b981' }}>Call: ${data.call_wall}</span>
                <span style={{ color: '#ef4444' }}>Put: ${data.put_wall}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Structural dealer pin range
              </div>
            </div>
          </div>

          {/* Regime Guidance Banner */}
          <div style={{ padding: '12px 16px', background: data.net_gex_millions >= 0 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${data.net_gex_millions >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>💡 Dealer Hedging Mechanics:</strong> {data.regime_description}
          </div>

          {/* Strike by Strike Gamma Ladder */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>📊 Strike-by-Strike GEX Distribution ($ Millions per 1% Underlying Shift)</span>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} /> Call Gamma
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} /> Put Gamma
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '380px', overflowY: 'auto', paddingRight: '6px' }}>
              {data.strikes?.map((s) => {
                const isSpotNearest = Math.abs(s.strike - data.spot_price) < 1.5;
                const isFlip = Math.abs(s.strike - data.zero_gamma_flip) < 1.5;
                const callPct = Math.min(100, (Math.abs(s.call_gex_m) / maxAbsGex) * 100);
                const putPct = Math.min(100, (Math.abs(s.put_gex_m) / maxAbsGex) * 100);

                return (
                  <div
                    key={s.strike}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 1fr',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '4px 8px',
                      background: isSpotNearest ? 'rgba(56,189,248,0.12)' : (isFlip ? 'rgba(245,158,11,0.08)' : 'transparent'),
                      borderRadius: '4px',
                      border: isSpotNearest ? '1px solid #38bdf8' : (isFlip ? '1px dashed #f59e0b' : 'none')
                    }}
                  >
                    {/* Put GEX (Left) */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>${s.put_gex_m}M</span>
                      <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: `${putPct}%`, height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                      </div>
                    </div>

                    {/* Strike Center */}
                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.85rem', color: isSpotNearest ? '#38bdf8' : (isFlip ? '#f59e0b' : '#fff') }}>
                      ${s.strike}
                      {isSpotNearest && <span style={{ fontSize: '0.65rem', display: 'block', color: '#38bdf8' }}>SPOT</span>}
                      {isFlip && <span style={{ fontSize: '0.65rem', display: 'block', color: '#f59e0b' }}>FLIP</span>}
                    </div>

                    {/* Call GEX (Right) */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                        <div style={{ width: `${callPct}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>+${s.call_gex_m}M</span>
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

export default GexHeatmap;
