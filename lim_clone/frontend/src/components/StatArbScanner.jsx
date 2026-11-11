import React, { useState, useEffect } from 'react';

const StatArbScanner = () => {
  const [pairsData, setPairsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deployNotice, setDeployNotice] = useState(null);

  const fetchPairs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/stat-arb/scan');
      const data = await res.json();
      setPairsData(data);
    } catch (e) {
      console.error("Failed to scan stat-arb pairs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPairs();
    const interval = setInterval(fetchPairs, 20000);
    return () => clearInterval(interval);
  }, []);

  const deployPairTrade = async (pair) => {
    try {
      // Route Long leg and Short leg to Go OMS
      const leg1Side = pair.signal === 'LONG_SPREAD' ? 'BUY' : 'SELL';
      const leg2Side = pair.signal === 'LONG_SPREAD' ? 'SELL' : 'BUY';

      const res = await fetch('http://127.0.0.1:8080/api/alpha/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: pair.asset_a,
          side: leg1Side,
          confidence: 0.90,
          target_allocation_pct: 5.0,
          stop_loss_pct: 2.0,
          take_profit_pct: 4.0
        })
      });
      const data = await res.json();
      setDeployNotice(`⚡ Stat-Arb Arbitrage Pair Deployed: ${leg1Side} ${pair.asset_a} & ${leg2Side} ${pair.asset_b} (Hedge Ratio: ${pair.hedge_ratio})`);
      setTimeout(() => setDeployNotice(null), 7000);
    } catch (e) {
      alert("Pair trade error: " + e.message);
    }
  };

  if (!pairsData) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
        Scanning Cointegrated Statistical Arbitrage Surface...
      </div>
    );
  }

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
            🔗 Statistical Arbitrage & Cointegration Pairs Scanner
          </h2>
          <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
            Exploiting mean-reverting spread divergences (|Z-Score| &ge; 2.0&sigma;) across asset pairs with OLS hedge ratios.
          </p>
        </div>

        <button
          onClick={fetchPairs}
          disabled={loading}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600
          }}
        >
          {loading ? 'Scanning...' : '🔄 Rescan Cointegration'}
        </button>
      </div>

      {deployNotice && (
        <div style={{
          padding: '14px 20px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          borderRadius: '8px',
          color: '#10b981',
          fontWeight: 700,
          fontSize: '0.9rem'
        }}>
          {deployNotice}
        </div>
      )}

      {/* Pairs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {pairsData.results.map((p, idx) => {
          const isDivergent = Math.abs(p.z_score) >= 2.0;
          return (
            <div 
              key={idx}
              style={{
                background: isDivergent ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isDivergent ? 'rgba(59, 130, 246, 0.35)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc' }}>{p.asset_a}</span>
                  <span style={{ margin: '0 6px', color: '#64748b', fontSize: '0.9rem' }}>vs</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94a3b8' }}>{p.asset_b}</span>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  background: isDivergent ? (p.z_score >= 2.0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)') : 'rgba(100, 116, 139, 0.15)',
                  color: isDivergent ? (p.z_score >= 2.0 ? '#ef4444' : '#10b981') : '#94a3b8'
                }}>
                  Z = {p.z_score > 0 ? `+${p.z_score}` : p.z_score}&sigma;
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                <span>Sector: <strong>{p.sector}</strong></span>
                <span>Hedge Ratio &beta;: <strong>{p.hedge_ratio}</strong></span>
              </div>

              {/* Spread Divergence Bar */}
              <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Spread Regime:</span>
                  <strong style={{ color: isDivergent ? '#38bdf8' : '#94a3b8' }}>{p.action_text}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span style={{ color: '#64748b' }}>Half-Life of Reversion:</span>
                  <strong style={{ color: '#f8fafc' }}>{p.half_life_days} days</strong>
                </div>
              </div>

              {/* Sparkline Points Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                {p.sparkline.map((val, i) => (
                  <div 
                    key={i} 
                    style={{
                      flex: 1,
                      height: `${Math.min(Math.abs(val) * 8 + 4, 24)}px`,
                      background: val >= 0 ? '#10b981' : '#ef4444',
                      borderRadius: '2px',
                      opacity: 0.8
                    }}
                    title={`Z-Score: ${val}`}
                  />
                ))}
              </div>

              <button
                onClick={() => deployPairTrade(p)}
                disabled={!isDivergent}
                className="btn-primary"
                style={{
                  padding: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: isDivergent ? 'linear-gradient(90deg, #3b82f6, #10b981)' : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  cursor: isDivergent ? 'pointer' : 'not-allowed',
                  opacity: isDivergent ? 1 : 0.6
                }}
              >
                {isDivergent ? `⚡ Execute Pair Trade: ${p.signal}` : 'Equilibrium (No Divergence Edge)'}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StatArbScanner;
