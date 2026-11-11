import React, { useState, useEffect } from 'react';

const RiskStressTestLab = () => {
  const [stressData, setStressData] = useState(null);
  const [monteCarloData, setMonteCarloData] = useState(null);
  const [portfolioVal, setPortfolioVal] = useState(100000);
  const [simulations, setSimulations] = useState(2500);
  const [horizonDays, setHorizonDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('blackswan'); // 'blackswan', 'montecarlo'

  const runCalculations = async () => {
    setLoading(true);
    try {
      // 1. Stress test
      const res1 = await fetch('http://127.0.0.1:8000/api/risk/stress-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio_value: portfolioVal })
      });
      const data1 = await res1.json();
      setStressData(data1);

      // 2. Monte Carlo
      const res2 = await fetch('http://127.0.0.1:8000/api/risk/monte-carlo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portfolio_value: portfolioVal,
          simulations: simulations,
          horizon_days: horizonDays
        })
      });
      const data2 = await res2.json();
      setMonteCarloData(data2);
    } catch (e) {
      console.error("Risk simulation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runCalculations();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px' }}>
      
      {/* Top Banner */}
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
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f8fafc', fontWeight: 800 }}>
            🛡️ Black Swan Macro Stress Testing & Monte Carlo VaR Lab
          </h2>
          <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
            Simulating extreme liquidity freezes, correlation breakdowns, and 10,000 randomized return paths to protect capital.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('blackswan')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'blackswan' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'blackswan' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            💥 Historical Crash Replay
          </button>
          <button
            onClick={() => setActiveTab('montecarlo')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'montecarlo' ? '#3b82f6' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'montecarlo' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            🎲 Monte Carlo VaR (95%/99%)
          </button>
        </div>
      </div>

      {/* Inputs Bar */}
      <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Portfolio Equity ($)</label>
          <input 
            type="number"
            value={portfolioVal}
            onChange={(e) => setPortfolioVal(parseFloat(e.target.value) || 100000)}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Simulations Count</label>
          <select
            value={simulations}
            onChange={(e) => setSimulations(parseInt(e.target.value))}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
          >
            <option value="1000">1,000 Paths</option>
            <option value="2500">2,500 Paths</option>
            <option value="5000">5,000 Paths (Institutional)</option>
            <option value="10000">10,000 Paths (Full Tail)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Horizon Window</label>
          <select
            value={horizonDays}
            onChange={(e) => setHorizonDays(parseInt(e.target.value))}
            style={{ padding: '8px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
          >
            <option value="10">10 Days</option>
            <option value="30">30 Days (1 Month)</option>
            <option value="90">90 Days (1 Quarter)</option>
          </select>
        </div>

        <button
          onClick={runCalculations}
          disabled={loading}
          className="btn-primary"
          style={{ alignSelf: 'flex-end', padding: '10px 18px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
        >
          {loading ? 'Simulating Shocks...' : '⚡ Re-Calculate Risk Surface'}
        </button>
      </div>

      {/* Tab 1: Historical Crash Replays */}
      {activeTab === 'blackswan' && stressData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {stressData.scenarios.map((sc, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc', fontWeight: 800 }}>{sc.name}</h4>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: sc.survival_rating === 'RESILIENT' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                    color: sc.survival_rating === 'RESILIENT' ? '#10b981' : '#ef4444'
                  }}>
                    {sc.survival_rating}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.4' }}>{sc.description}</p>

                {/* Drawdown Progress Bar */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>Portfolio Drawdown:</span>
                    <strong style={{ color: '#ef4444' }}>{sc.portfolio_drawdown_pct}%</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(Math.abs(sc.portfolio_drawdown_pct), 100)}%`, height: '100%', background: '#ef4444' }}></div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Dollar Loss:</span>
                    <strong style={{ color: '#ef4444' }}>-${Math.abs(sc.portfolio_dollar_impact).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Post-Crash Capital:</span>
                    <strong style={{ color: '#f8fafc' }}>${sc.post_crash_value.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Market Volatility Shock:</span>
                    <strong style={{ color: '#f59e0b' }}>VIX {sc.vix_spike}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Monte Carlo Value at Risk */}
      {activeTab === 'montecarlo' && monteCarloData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Key VaR Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase' }}>95% Value at Risk (1M)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginTop: '6px' }}>
                ${monteCarloData.var_95_dollar.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                -{monteCarloData.var_95_pct}% maximum loss at 95% confidence
              </div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase' }}>99% Tail Risk (Extreme)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>
                ${monteCarloData.var_99_dollar.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                -{monteCarloData.var_99_pct}% maximum loss at 99% confidence
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Median Expectation</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '6px' }}>
                ${monteCarloData.expected_median_value.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>50th Percentile Drift</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>99th Percentile Upside</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>
                ${monteCarloData.expected_max_value.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Optimal Bullish Trajectory</div>
            </div>
          </div>

          {/* Simulation Paths Visualizer */}
          <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#f8fafc', fontWeight: 700 }}>
              🎲 Monte Carlo Path Trajectories ({monteCarloData.simulations_count} Runs)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {monteCarloData.sample_trajectories.map((traj, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{traj.label}</span>
                  <strong style={{ color: traj.points[traj.points.length - 1] >= portfolioVal ? '#10b981' : '#ef4444' }}>
                    ${traj.points[traj.points.length - 1].toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default RiskStressTestLab;
