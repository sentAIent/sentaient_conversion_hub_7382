import { useState, useEffect } from 'react';

const KellyCriterionLab = () => {
  const [winRate, setWinRate] = useState(0.58);
  const [payoffRatio, setPayoffRatio] = useState(1.65);
  const [currentDd, setCurrentDd] = useState(2.4);
  const [maxDd, setMaxDd] = useState(8.0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateKelly = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/risk/kelly-sizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          win_rate: parseFloat(winRate),
          payoff_ratio: parseFloat(payoffRatio),
          current_drawdown_pct: parseFloat(currentDd),
          max_tolerated_dd_pct: parseFloat(maxDd)
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Failed to compute Kelly sizing', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateKelly();
  }, [winRate, payoffRatio, currentDd, maxDd]);

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🛡️ Fractional Kelly Criterion Sizing & Probability-of-Ruin Shield
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Optimal logarithmic capital allocation fractions (Full, Half, Quarter Kelly) with dynamic drawdown anti-blowup haircuts.
          </p>
        </div>

        <button
          onClick={calculateKelly}
          disabled={loading}
          style={{ padding: '6px 14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {loading ? 'Solving...' : '⚡ Recompute Fractions'}
        </button>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Strategy Win Rate: <strong>{(winRate * 100).toFixed(0)}%</strong>
          </label>
          <input
            type="range"
            min="0.30"
            max="0.85"
            step="0.01"
            value={winRate}
            onChange={(e) => setWinRate(e.target.value)}
            style={{ width: '100%', accentColor: '#10b981' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Payoff Ratio (Win / Loss): <strong>{parseFloat(payoffRatio).toFixed(2)}x</strong>
          </label>
          <input
            type="range"
            min="0.8"
            max="4.0"
            step="0.05"
            value={payoffRatio}
            onChange={(e) => setPayoffRatio(e.target.value)}
            style={{ width: '100%', accentColor: '#38bdf8' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Current Drawdown: <strong>{parseFloat(currentDd).toFixed(1)}%</strong>
          </label>
          <input
            type="range"
            min="0.0"
            max="15.0"
            step="0.1"
            value={currentDd}
            onChange={(e) => setCurrentDd(e.target.value)}
            style={{ width: '100%', accentColor: '#ef4444' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
            Max Tolerated Drawdown: <strong>{parseFloat(maxDd).toFixed(0)}%</strong>
          </label>
          <input
            type="range"
            min="4.0"
            max="25.0"
            step="1.0"
            value={maxDd}
            onChange={(e) => setMaxDd(e.target.value)}
            style={{ width: '100%', accentColor: '#f59e0b' }}
          />
        </div>
      </div>

      {result && (
        <>
          {/* Output Allocation Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Recommended Allocation (Half Kelly)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                {result.drawdown_shield?.effective_throttled_allocation_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Haircut Scaler: {result.drawdown_shield?.haircut_multiplier}x
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Full Kelly (Aggressive)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {result.kelly_fractions?.full_kelly_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px' }}>
                High Volatility (~{result.probability_of_ruin_comparison?.full_kelly_ruin_prob_pct}% Ruin Risk)
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quarter Kelly (Endowment)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {result.kelly_fractions?.quarter_kelly_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
                Zero Ruin Risk (&lt; 0.1%)
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Capital Protection Status</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {result.drawdown_shield?.status.replace(/_/g, ' ')}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Anti-blowup active
              </div>
            </div>
          </div>

          {/* Probability of Ruin Comparison Table */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
              📊 Probability of Catastrophic Drawdown / Ruin Comparison
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div style={{ background: 'rgba(239,68,68,0.08)', padding: '14px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Full Kelly Ruin Risk</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                  {result.probability_of_ruin_comparison?.full_kelly_ruin_prob_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Dangerous geometric drag</div>
              </div>

              <div style={{ background: 'rgba(16,185,129,0.08)', padding: '14px', borderRadius: '6px', border: '1px solid rgba(16,185,129,0.3)' }}>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Half Kelly Ruin Risk</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                  {result.probability_of_ruin_comparison?.half_kelly_ruin_prob_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>Sweet spot compounding</div>
              </div>

              <div style={{ background: 'rgba(56,189,248,0.08)', padding: '14px', borderRadius: '6px', border: '1px solid rgba(56,189,248,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Quarter Kelly Ruin Risk</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                  {result.probability_of_ruin_comparison?.quarter_kelly_ruin_prob_pct}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Minimal drawdown variance</div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default KellyCriterionLab;
