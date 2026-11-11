import { useState, useEffect } from 'react';

const EarningsIvCrushScreener = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedStrategy, setStagedStrategy] = useState(null);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/earnings-vol/screener');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch earnings screener', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  const handleStage = (release) => {
    setStagedStrategy(release);
    setTimeout(() => setStagedStrategy(null), 5000);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            💥 Earnings Implied Volatility (IV) Crush & Straddle Screener
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Compares option market implied moves against historical 8-quarter realized moves, forecasting post-earnings volatility implosion.
          </p>
        </div>

        <button
          onClick={fetchEarnings}
          style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          🔄 Rescan Earnings Calendar
        </button>
      </div>

      {stagedStrategy && (
        <div style={{ padding: '12px 18px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem' }}>
          ✓ <strong>Volatility Edge Staged:</strong> Pre-configured {stagedStrategy.recommended_strategy} on {stagedStrategy.symbol} capturing {stagedStrategy.edge_bps} bps of mispriced implied volatility.
        </div>
      )}

      {loading && !data ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Modeling earnings volatility surfaces and straddle pricing...</div>
      ) : data ? (
        <>
          {/* Top Summary Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>Average Forecast IV Drop</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                {data.avg_forecast_crush_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Overnight volatility collapse
              </div>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Overpriced Straddles</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                {data.overpriced_straddles_count} Releases
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Prime premium selling candidates
              </div>
            </div>

            <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>Underpriced Explosive Runners</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {data.underpriced_straddles_count} Release
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Convexity breakout opportunity
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Releases Screened</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {data.total_screened} Major Mega-Caps
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Active earnings horizon
              </div>
            </div>
          </div>

          {/* Earnings Screener Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
            {data.earnings_releases?.map((release) => {
              const isOverpriced = release.volatility_mispricing === 'OVERPRICED_STRADDLE';
              return (
                <div key={release.symbol} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{release.symbol}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{release.company_name} • {release.earnings_date}</div>
                    </div>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background: isOverpriced ? 'rgba(16,185,129,0.15)' : 'rgba(56,189,248,0.15)',
                        color: isOverpriced ? '#10b981' : '#38bdf8'
                      }}
                    >
                      {release.volatility_mispricing}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '6px', fontSize: '0.78rem' }}>
                    <div>
                      <span style={{ color: '#94a3b8' }}>Market Implied Move:</span>
                      <strong style={{ display: 'block', color: '#f59e0b', fontSize: '1.1rem', marginTop: '2px' }}>
                        ±{release.market_implied_move_pct}%
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>8Q Historical Move:</span>
                      <strong style={{ display: 'block', color: '#fff', fontSize: '1.1rem', marginTop: '2px' }}>
                        ±{release.trailing_8q_actual_move_pct}%
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>Current Front IV:</span>
                      <strong style={{ display: 'block', color: '#ef4444', marginTop: '2px' }}>{release.current_front_iv_pct}%</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8' }}>Forecast Post IV:</span>
                      <strong style={{ display: 'block', color: '#10b981', marginTop: '2px' }}>{release.forecast_post_iv_pct}% ({release.predicted_iv_crush_pct}%)</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    💡 {release.notes}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>Edge: +{release.edge_bps} bps</span>
                    <button
                      onClick={() => handleStage(release)}
                      style={{
                        padding: '8px 14px',
                        background: isOverpriced ? 'linear-gradient(90deg, #10b981, #3b82f6)' : 'linear-gradient(90deg, #3b82f6, #c084fc)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      Stage {isOverpriced ? 'Iron Condor' : 'Long Straddle'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

    </div>
  );
};

export default EarningsIvCrushScreener;
