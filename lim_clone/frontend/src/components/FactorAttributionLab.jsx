import { useState, useEffect } from 'react';

const FactorAttributionLab = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbols, setSymbols] = useState('AAPL, MSFT, NVDA, AMZN');

  const fetchAttribution = async () => {
    setLoading(true);
    try {
      const symList = symbols.split(',').map((s) => s.trim()).filter(Boolean);
      const res = await fetch('http://127.0.0.1:8000/api/factor/attribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: symList, benchmark: 'SPY' })
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to calculate factor attribution', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttribution();
  }, []);

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔬 Barra & Fama-French 5-Factor Risk Attribution Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Multivariate regression decomposing portfolio returns into systematic factor risk (SMB, HML, RMW, CMA, MOM) vs. idiosyncratic pure alpha.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={symbols}
            onChange={(e) => setSymbols(e.target.value)}
            style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', width: '220px' }}
          />
          <button
            onClick={fetchAttribution}
            style={{ padding: '6px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Recompute
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Running multivariate OLS factor regression...</div>
      ) : data ? (
        <>
          {/* Top Attribution Metric Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Pure Jensen's Alpha (α)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                +{data.annualized_jensens_alpha_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                True excess return above factor beta
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Systematic Factor Variance (R²)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {(data.r_squared * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Explained by 6 macroeconomic factors
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Idiosyncratic Selection Risk</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {data.idiosyncratic_risk_share_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Unhedged security-specific volatility
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Style Classification</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {data.style_drift?.style_category}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                ✓ Style Drift: Stable (Score {data.style_drift?.stability_score})
              </div>
            </div>
          </div>

          {/* Factor Loadings Table & Visual Exposure Bars */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>📊 Fama-French 5-Factor + Momentum Betas</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Benchmark: {data.benchmark}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.factor_exposures?.map((f) => {
                const absBeta = Math.min(100, Math.abs(f.beta) * 60);
                return (
                  <div key={f.factor} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: '#fff' }}>{f.factor}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>{f.description}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: f.beta >= 0 ? '#10b981' : '#ef4444' }}>
                          {f.beta >= 0 ? '+' : ''}{f.beta.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>t-stat: {f.t_stat} ({f.significance})</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: '8px', width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                      <div
                        style={{
                          width: `${absBeta}%`,
                          height: '100%',
                          background: f.beta >= 0 ? '#10b981' : '#ef4444',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brinson-Fachler Attribution Breakdown */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
              📐 Brinson-Fachler Sector Attribution
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Allocation Effect</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>
                  +{data.brinson_attribution?.allocation_effect_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Sector over/underweighting</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Selection Effect</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>
                  +{data.brinson_attribution?.selection_effect_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Stock picking within sectors</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Active Alpha</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#c084fc', marginTop: '4px' }}>
                  +{data.brinson_attribution?.total_active_return_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Net outperformance</div>
              </div>
            </div>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default FactorAttributionLab;
