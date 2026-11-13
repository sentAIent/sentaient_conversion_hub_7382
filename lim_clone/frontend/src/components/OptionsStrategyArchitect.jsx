import { useState, useEffect } from 'react';

const OptionsStrategyArchitect = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [strategy, setStrategy] = useState('IRON_CONDOR');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [execReceipt, setExecReceipt] = useState(null);

  const fetchAnalysis = async (strat) => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/options-strategy/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, spot: 585.50, strategy_name: strat })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error('Failed to analyze multi-leg strategy', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(strategy);
  }, [strategy, symbol]);

  const handleAtomicExecution = async () => {
    setExecuting(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/options-strategy/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy_name: strategy,
          symbol,
          legs: analysis.legs
        })
      });
      const receipt = await res.json();
      setExecReceipt(receipt);
      setTimeout(() => setExecReceipt(null), 6000);
    } catch (err) {
      alert('Atomic execution failed: ' + err.message);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🦅 Multi-Leg Options Strategy Architect & Payoff Matrix
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Structured multi-leg spreads, expiration P&L payoff envelopes, risk-neutral Probability of Profit (POP), and atomic multi-leg OMS dispatching.
          </p>
        </div>

        {/* Strategy Selector Pills */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {[
            { id: 'IRON_CONDOR', label: 'Iron Condor' },
            { id: 'JADE_LIZARD', label: 'Jade Lizard' },
            { id: 'BULL_CALL_SPREAD', label: 'Bull Call Spread' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStrategy(s.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: strategy === s.id ? '#3b82f6' : 'transparent',
                color: strategy === s.id ? '#fff' : '#94a3b8',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {execReceipt && (
        <div style={{ padding: '12px 18px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>⚡ <strong>Multi-Leg Atomic Order Filled:</strong> ID {execReceipt.multileg_id} ({execReceipt.legs_count} legs executed simultaneously across matching engine).</span>
          <span style={{ fontSize: '0.8rem', background: '#10b981', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>FILLED</span>
        </div>
      )}

      {loading && !analysis ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Synthesizing multi-leg spread payoff matrix...</div>
      ) : analysis ? (
        <>
          {/* Top Metric Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Strategy Entry ({analysis.net_type})</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                ${analysis.entry_value_dollars}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Per 1 spread contract unit
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Probability of Profit (POP)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {analysis.probability_of_profit_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Risk-neutral normal probability
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Max Profit / Max Loss</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginTop: '4px' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>+${analysis.max_profit_dollars}</span>
                <span style={{ fontSize: '0.9rem', color: '#ef4444' }}>/ -${Math.abs(analysis.max_loss_dollars)}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Risk:Reward ratio 1 : {analysis.risk_reward_ratio}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Breakeven Envelope</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {analysis.breakevens?.map((b) => `$${b}`).join('  -  ') || 'N/A'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Spot: ${analysis.spot_price}
              </div>
            </div>
          </div>

          {/* Payoff Curve SVG Visualizer */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>📈 Expiration P&L Payoff Envelope ($ Profit/Loss vs Underlying Spot at Expiration)</span>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem' }}>
                <span style={{ color: '#10b981' }}>Delta: {analysis.net_greeks?.delta}</span>
                <span style={{ color: '#f59e0b' }}>Theta: +${analysis.net_greeks?.theta}/day</span>
                <span style={{ color: '#c084fc' }}>Vega: {analysis.net_greeks?.vega}/%</span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <svg viewBox="0 0 700 180" style={{ width: '100%', height: '180px' }}>
                {/* Zero line */}
                <line x1="40" y1="90" x2="680" y2="90" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                <text x="10" y="94" fill="#64748b" fontSize="10">$0</text>

                {(() => {
                  const pts = analysis.pnl_curve.map((pt, idx) => {
                    const x = 50 + (idx / (analysis.pnl_curve.length - 1)) * 620;
                    // Scale P&L to height: $0 is y=90, max is ~+300/-600
                    const y = 90 - (pt.pnl_dollars / 600.0) * 70;
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <>
                      <polyline fill="none" stroke="#10b981" strokeWidth="2.5" points={pts} />
                      {/* Breakeven lines */}
                      {analysis.breakevens?.map((be, bIdx) => {
                        const idx = analysis.pnl_curve.findIndex((p) => Math.abs(p.underlying_price - be) < 2.0);
                        if (idx >= 0) {
                          const x = 50 + (idx / (analysis.pnl_curve.length - 1)) * 620;
                          return (
                            <g key={bIdx}>
                              <line x1={x} y1="20" x2={x} y2="160" stroke="#f59e0b" strokeDasharray="2 2" />
                              <text x={x} y="15" fill="#f59e0b" fontSize="9" textAnchor="middle">BE ${be}</text>
                            </g>
                          );
                        }
                        return null;
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Legs Table & Atomic Execution Trigger */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📋 Contract Legs Breakdown ({analysis.legs?.length} Legs)</span>
              <button
                onClick={handleAtomicExecution}
                disabled={executing}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {executing ? 'Routing Atomic Legs...' : '⚡ Atomic Multi-Leg Order Execution'}
              </button>
            </div>

            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '8px' }}>Action</th>
                  <th style={{ padding: '8px' }}>Type</th>
                  <th style={{ padding: '8px' }}>Strike</th>
                  <th style={{ padding: '8px' }}>Qty</th>
                  <th style={{ padding: '8px' }}>Mid Premium</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Total Leg Value</th>
                </tr>
              </thead>
              <tbody>
                {analysis.legs?.map((leg, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '8px', fontWeight: 800, color: leg.action === 'BUY' ? '#10b981' : '#ef4444' }}>
                      {leg.action}
                    </td>
                    <td style={{ padding: '8px', color: '#fff', fontWeight: 700 }}>{leg.option_type}</td>
                    <td style={{ padding: '8px', color: '#38bdf8', fontWeight: 700 }}>${leg.strike}</td>
                    <td style={{ padding: '8px' }}>{leg.qty}x</td>
                    <td style={{ padding: '8px' }}>${leg.premium.toFixed(2)}</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: leg.action === 'BUY' ? '#ef4444' : '#10b981' }}>
                      {leg.action === 'BUY' ? '-' : '+'}${(leg.premium * leg.qty * 100).toFixed(0)}
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

export default OptionsStrategyArchitect;
