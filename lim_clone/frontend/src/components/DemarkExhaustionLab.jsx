import { useState, useEffect } from 'react';

const DemarkExhaustionLab = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDemark = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/demark/signals?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch DeMark signals', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemark(symbol);
  }, [symbol]);

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⏱️ DeMark Sequential & Combo Trend Exhaustion Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Tom DeMark's proprietary TD Setup (9) and Countdown (13) mean-reversion inflection algorithms with multi-timeframe confluence.
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
                background: symbol === s ? '#10b981' : 'rgba(255,255,255,0.05)',
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
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Executing DeMark Setup & Countdown scan...</div>
      ) : data ? (
        <>
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Inflection Signal Status</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                {data.active_setup_state.replace(/_/g, ' ')}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                {data.last_inflection_bar}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Current Countdown</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {data.current_countdown}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Trend exhaustion milestone
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Multi-Timeframe Confluence</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {data.multi_timeframe_confluence?.confluence_score_pct}% Confluence
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Daily + Weekly alignment
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Key Risk / Target Levels</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '1.1rem', fontWeight: 800 }}>
                <span style={{ color: '#ef4444' }}>Stop: ${data.support_risk_level}</span>
                <span style={{ color: '#10b981' }}>Target: ${data.exhaustion_target_level}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Spot: ${data.current_price}
              </div>
            </div>
          </div>

          {/* DeMark Bar Sequence Table */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🔢 Sequential Bar Countdown & Setup Progression</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>✓ TD Perfection Rules Applied</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
              {data.candles?.map((c) => {
                const isNine = c.td_count === 9;
                const isCountdown = c.type.includes('COUNTDOWN');
                return (
                  <div
                    key={c.bar}
                    style={{
                      minWidth: '72px',
                      padding: '10px 8px',
                      background: isNine ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.02)',
                      border: isNine ? '2px solid #10b981' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{c.date.slice(5)}</div>
                    <div
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        color: isNine ? '#10b981' : (isCountdown ? '#38bdf8' : '#fff')
                      }}
                    >
                      {c.td_count}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>${c.close.toFixed(1)}</div>
                    <div style={{ fontSize: '0.6rem', color: isNine ? '#10b981' : '#94a3b8', textTransform: 'uppercase' }}>
                      {isNine ? 'PERFECT 9' : (isCountdown ? `CD ${c.td_count}` : 'SETUP')}
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

export default DemarkExhaustionLab;
