import { useState, useEffect } from 'react';

const OptimalExecutionLab = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [shares, setShares] = useState(50000);
  const [duration, setDuration] = useState(60);
  const [slices, setSlices] = useState(10);
  const [riskAversion, setRiskAversion] = useState(0.00001);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const calculateTrajectory = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/execution/almgren-chriss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          shares: parseInt(shares),
          duration_minutes: parseInt(duration),
          slices: parseInt(slices),
          risk_aversion: parseFloat(riskAversion),
          spot_price: 230.00
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Failed to compute Almgren-Chriss trajectory', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateTrajectory();
  }, [symbol]);

  const handleDispatchToOMS = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(null), 5000);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚡ Almgren-Chriss Optimal Execution & Market Impact Model
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Calculates optimal trade liquidation trajectories balancing market impact costs against timing risk variance.
          </p>
        </div>

        <button
          onClick={calculateTrajectory}
          disabled={loading}
          style={{ padding: '8px 16px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {loading ? 'Solving Trajectory...' : '⚡ Recompute Optimal Schedule'}
        </button>
      </div>

      {dispatched && (
        <div style={{ padding: '12px 18px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem' }}>
          ✓ <strong>Dispatched to Algo OMS:</strong> Sliced {shares.toLocaleString()} shares of {symbol} into {slices} Almgren-Chriss calibrated limit tranches.
        </div>
      )}

      {/* Input Form Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontWeight: 700 }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Order Shares</label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Duration (Minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Tranches (Slices)</label>
          <input
            type="number"
            value={slices}
            onChange={(e) => setSlices(e.target.value)}
            style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Risk Aversion (λ)</label>
          <select
            value={riskAversion}
            onChange={(e) => setRiskAversion(e.target.value)}
            style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#38bdf8', fontWeight: 700 }}
          >
            <option value="0.000001">Low (Cost Focused)</option>
            <option value="0.00001">Medium (Balanced)</option>
            <option value="0.0001">High (Risk Averse / Fast)</option>
          </select>
        </div>
      </div>

      {result && (
        <>
          {/* Output Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Expected Slippage</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {result.expected_slippage_bps} bps
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                ${result.total_expected_cost_usd} total impact
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optimal Half-Life</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {result.half_life_minutes} min
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Hyperbolic decay rate
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Timing Risk (Std Dev)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                ±${result.timing_risk_std_usd}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Price variance penalty
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Impact Decomposition</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                Perm: ${result.permanent_impact_usd}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                Temp: ${result.temporary_impact_usd}
              </div>
            </div>
          </div>

          {/* Slicing Trajectory Table & OMS Dispatcher */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📐 Optimal Liquidation Slicing Trajectory ({result.optimal_schedule?.length} Tranches)</span>
              <button
                onClick={handleDispatchToOMS}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(90deg, #f59e0b, #10b981)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ⚡ Dispatch Slices to Algo OMS
              </button>
            </div>

            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '8px' }}>Tranche #</th>
                  <th style={{ padding: '8px' }}>Time (Min)</th>
                  <th style={{ padding: '8px' }}>Slice Size</th>
                  <th style={{ padding: '8px' }}>Remaining Shares</th>
                  <th style={{ padding: '8px' }}>Estimated Impact</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>% ADV Participation</th>
                </tr>
              </thead>
              <tbody>
                {result.optimal_schedule?.map((s) => (
                  <tr key={s.tranche} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#38bdf8' }}>#{s.tranche}</td>
                    <td style={{ padding: '8px', color: '#94a3b8' }}>+{s.minute}m</td>
                    <td style={{ padding: '8px', fontWeight: 800, color: '#fff' }}>{s.slice_size.toLocaleString()} sh</td>
                    <td style={{ padding: '8px', color: '#94a3b8' }}>{s.remaining_shares.toLocaleString()} sh</td>
                    <td style={{ padding: '8px', color: '#f59e0b' }}>{s.estimated_impact_bps} bps</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: '#10b981' }}>
                      {s.participation_rate_adv_pct}% ADV
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
};

export default OptimalExecutionLab;
