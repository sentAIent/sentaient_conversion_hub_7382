import { useState, useEffect } from 'react';

const OrderBookDOM = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [depthData, setDepthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const fetchDepth = async (sym) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/market/depth?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setDepthData(json);
    } catch (err) {
      console.error('Failed to fetch DOM depth', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepth(symbol);
    const interval = setInterval(() => fetchDepth(symbol), 3000);
    return () => clearInterval(interval);
  }, [symbol]);

  const maxDepth = depthData
    ? Math.max(depthData.total_bid_depth, depthData.total_ask_depth)
    : 50000;

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📖 Level 2 Order Book Depth (DOM) & VPIN Toxicity Radar
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            High-frequency resting liquidity ladder, Cumulative Volume Delta (CVD), and Volume-Synchronized Probability of Toxicity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['SPY', 'QQQ', 'NVDA', 'AAPL', 'TSLA'].map((s) => (
            <button
              key={s}
              onClick={() => { setSymbol(s); setLoading(true); }}
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

      {loading && !depthData ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Connecting to Level 2 Market Depth Feed...</div>
      ) : depthData ? (
        <>
          {/* Top Metric Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Inside Spread</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {depthData.spread_cents}¢
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Tight Institutional Liquidity
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Book Imbalance Ratio</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: depthData.book_imbalance_ratio >= 0 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
                {depthData.book_imbalance_ratio >= 0 ? '+' : ''}{(depthData.book_imbalance_ratio * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                {depthData.total_bid_depth.toLocaleString()} Bids / {depthData.total_ask_depth.toLocaleString()} Asks
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>VPIN Toxicity Metric</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: depthData.vpin > 0.6 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
                {depthData.vpin.toFixed(3)}
              </div>
              <div style={{ fontSize: '0.75rem', color: depthData.vpin > 0.6 ? '#ef4444' : '#10b981', marginTop: '4px', fontWeight: 600 }}>
                {depthData.toxicity_regime}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cumulative Volume Delta</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: depthData.cumulative_volume_delta >= 0 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
                {depthData.cumulative_volume_delta >= 0 ? '+' : ''}{depthData.cumulative_volume_delta.toLocaleString()} sh
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                {depthData.cvd_trend}
              </div>
            </div>
          </div>

          {/* VPIN Alert Banner */}
          <div style={{ padding: '12px 16px', background: depthData.vpin > 0.6 ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.08)', border: `1px solid ${depthData.vpin > 0.6 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>⚡ Order Flow Toxicity Check:</strong> {depthData.vpin > 0.6
              ? 'Warning: Elevated VPIN detected. Informed participants are aggressively taking liquidity. Market makers widening bid-ask quotes.'
              : 'Organic flow conditions detected. Low adverse selection probability for passive limit order execution.'}
          </div>

          {/* Dual Column DOM Ladder */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Bid Depth Ladder */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>🟢 BIDS (BUY ORDERS)</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total: {depthData.total_bid_depth.toLocaleString()}</span>
              </div>
              <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th style={{ padding: '6px' }}>Price</th>
                    <th style={{ padding: '6px' }}>Size</th>
                    <th style={{ padding: '6px' }}>Cumul</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Depth %</th>
                  </tr>
                </thead>
                <tbody>
                  {depthData.bids.map((b) => {
                    const pct = Math.min(100, (b.size / 10000) * 100);
                    return (
                      <tr
                        key={b.price}
                        onClick={() => setSelectedPrice(b.price)}
                        style={{
                          cursor: 'pointer',
                          background: b.is_wall ? 'rgba(16,185,129,0.12)' : 'transparent',
                          borderBottom: '1px solid rgba(255,255,255,0.02)'
                        }}
                      >
                        <td style={{ padding: '6px', fontWeight: 700, color: '#10b981' }}>
                          ${b.price.toFixed(2)} {b.is_wall && '🧱'}
                        </td>
                        <td style={{ padding: '6px', color: '#fff' }}>{b.size.toLocaleString()}</td>
                        <td style={{ padding: '6px', color: '#94a3b8' }}>{b.cumulative.toLocaleString()}</td>
                        <td style={{ padding: '6px', textAlign: 'right' }}>
                          <div style={{ width: '60px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', display: 'inline-block' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: '#10b981', borderRadius: '2px' }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Ask Depth Ladder */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ef4444', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>🔴 ASKS (SELL ORDERS)</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total: {depthData.total_ask_depth.toLocaleString()}</span>
              </div>
              <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th style={{ padding: '6px' }}>Price</th>
                    <th style={{ padding: '6px' }}>Size</th>
                    <th style={{ padding: '6px' }}>Cumul</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Depth %</th>
                  </tr>
                </thead>
                <tbody>
                  {depthData.asks.map((a) => {
                    const pct = Math.min(100, (a.size / 10000) * 100);
                    return (
                      <tr
                        key={a.price}
                        onClick={() => setSelectedPrice(a.price)}
                        style={{
                          cursor: 'pointer',
                          background: a.is_wall ? 'rgba(239,68,68,0.12)' : 'transparent',
                          borderBottom: '1px solid rgba(255,255,255,0.02)'
                        }}
                      >
                        <td style={{ padding: '6px', fontWeight: 700, color: '#ef4444' }}>
                          ${a.price.toFixed(2)} {a.is_wall && '🧱'}
                        </td>
                        <td style={{ padding: '6px', color: '#fff' }}>{a.size.toLocaleString()}</td>
                        <td style={{ padding: '6px', color: '#94a3b8' }}>{a.cumulative.toLocaleString()}</td>
                        <td style={{ padding: '6px', textAlign: 'right' }}>
                          <div style={{ width: '60px', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', display: 'inline-block' }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

          {/* Quick Click Order Staging Action */}
          {selectedPrice && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56,189,248,0.08)', border: '1px solid #38bdf8', padding: '12px 18px', borderRadius: '8px' }}>
              <div>
                Selected Price: <strong style={{ color: '#38bdf8', fontSize: '1.1rem' }}>${selectedPrice.toFixed(2)}</strong>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: '12px' }}>Ready to stage limit order slice</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => alert(`Staged BUY Limit order: 100 ${symbol} @ $${selectedPrice.toFixed(2)}`)}
                  style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Buy @ ${selectedPrice.toFixed(2)}
                </button>
                <button
                  onClick={() => alert(`Staged SELL Limit order: 100 ${symbol} @ $${selectedPrice.toFixed(2)}`)}
                  style={{ padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Sell @ ${selectedPrice.toFixed(2)}
                </button>
                <button
                  onClick={() => setSelectedPrice(null)}
                  style={{ padding: '6px 10px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}

    </div>
  );
};

export default OrderBookDOM;
