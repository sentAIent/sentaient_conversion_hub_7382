import { useState, useEffect } from 'react';

const BasisCarryEngine = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deployingId, setDeployingId] = useState(null);
  const [activeReceipts, setActiveReceipts] = useState([]);

  const fetchCarry = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/basis-carry/scan');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch basis carry opportunities', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/basis-carry/orders');
      const orders = await res.json();
      if (Array.isArray(orders)) {
        setActiveReceipts(orders);
      }
    } catch (err) {
      console.warn('Orders notice', err);
    }
  };

  useEffect(() => {
    fetchCarry();
    fetchOrders();
    const interval = setInterval(fetchCarry, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDeployCarry = async (opp) => {
    setDeployingId(opp.id);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/basis-carry/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carry_id: opp.id,
          pair: opp.pair,
          capital_usd: 50000.0,
          strategy: opp.strategy,
          net_apy_pct: opp.net_annualized_apy_pct
        })
      });
      const receipt = await res.json();
      setActiveReceipts((prev) => [receipt, ...prev.slice(0, 15)]);
    } catch (err) {
      alert('Basis carry deployment failed: ' + err.message);
    } finally {
      setDeployingId(null);
    }
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🌾 Cash-and-Carry Basis Arbitrage & Perp Funding Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Zero-beta delta-neutral yield harvesting across crypto perpetual funding rates, Treasury cash-futures repo, and synthetic forward carry.
          </p>
        </div>

        <div style={{ padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '6px', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
          ● DELTA: 0.00 (MARKET NEUTRAL CARRY)
        </div>
      </div>

      {loading && !data ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Scanning global cash-and-carry basis spreads...</div>
      ) : data ? (
        <>
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Top Annualized Net APY</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                +{data.max_net_apy_pct}% APY
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Pair: {data.max_yield_pair} (Pure Delta Neutral)
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Avg Crypto Perp Yield</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                +{data.avg_crypto_perp_apy_pct}% APR
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Across Binance, Bybit, OKX, Coinbase
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Treasury Cash-Futures Basis</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                +4.85% APY
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Sovereign risk-free repo carry
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Basis Opportunities</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {data.total_active_opportunities} Spreads
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Real-time 8-hour settlement loops
              </div>
            </div>
          </div>

          {/* Basis Opportunities Table */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>📊 Live Basis & Funding Yield Opportunities</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Auto-rebalanced delta-neutral execution</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '8px' }}>Pair / Spread</th>
                    <th style={{ padding: '8px' }}>Class</th>
                    <th style={{ padding: '8px' }}>Venue</th>
                    <th style={{ padding: '8px' }}>8h Funding Rate</th>
                    <th style={{ padding: '8px' }}>Gross APR</th>
                    <th style={{ padding: '8px' }}>Borrow Cost</th>
                    <th style={{ padding: '8px' }}>Net Annual APY</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.opportunities?.map((opp) => (
                    <tr key={opp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '8px' }}>
                        <strong style={{ color: '#fff' }}>{opp.pair}</strong>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>{opp.strategy}</span>
                      </td>
                      <td style={{ padding: '8px', color: '#94a3b8' }}>{opp.asset_class}</td>
                      <td style={{ padding: '8px', color: '#38bdf8' }}>{opp.venue}</td>
                      <td style={{ padding: '8px', color: '#f59e0b', fontWeight: 700 }}>
                        {opp.funding_rate_8h_pct > 0 ? `+${opp.funding_rate_8h_pct}%` : 'N/A'}
                      </td>
                      <td style={{ padding: '8px' }}>+{opp.annualized_gross_apr_pct}%</td>
                      <td style={{ padding: '8px', color: '#ef4444' }}>-{opp.borrow_cost_apr_pct}%</td>
                      <td style={{ padding: '8px', fontWeight: 800, color: '#10b981', fontSize: '0.95rem' }}>
                        +{opp.net_annualized_apy_pct}%
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeployCarry(opp)}
                          disabled={deployingId === opp.id}
                          style={{
                            padding: '6px 12px',
                            background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          {deployingId === opp.id ? 'Deploying...' : 'Deploy $50k Carry'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Deployed Carry Positions Ledger */}
          {activeReceipts.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginBottom: '10px' }}>
                📜 Active Deployed Basis Carry Positions ({activeReceipts.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeReceipts.map((rx) => (
                  <div key={rx.receipt_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontSize: '0.75rem' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{rx.pair}</strong>
                      <span style={{ color: '#64748b', marginLeft: '10px' }}>ID: {rx.receipt_id}</span>
                      <span style={{ color: '#94a3b8', marginLeft: '10px' }}>Long Spot: ${rx.long_spot_usd?.toLocaleString()} | Short Perp: ${rx.short_perp_usd?.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#10b981' }}>+{rx.net_apy_pct}% APY</span>
                      <span style={{ padding: '2px 8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>
                        HARVESTING
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}

    </div>
  );
};

export default BasisCarryEngine;
