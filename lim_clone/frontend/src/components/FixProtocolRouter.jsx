import { useState, useEffect } from 'react';

const FixProtocolRouter = () => {
  const [symbol, setSymbol] = useState('NVDA');
  const [side, setSide] = useState('BUY');
  const [qty, setQty] = useState(1000);
  const [limitPrice, setLimitPrice] = useState(142.50);
  const [strategy, setStrategy] = useState('DARK_FIRST');
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
  const [fixHistory, setFixHistory] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/fix/logs');
      const data = await res.json();
      if (Array.isArray(data)) {
        setFixHistory(data);
      }
    } catch (err) {
      console.warn('FIX logs polling notice', err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRouteOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/fix/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          side,
          qty: parseInt(qty),
          limit_price: parseFloat(limitPrice),
          strategy
        })
      });
      const data = await res.json();
      setActiveRoute(data);
      setFixHistory((prev) => [data, ...prev.slice(0, 19)]);
    } catch (err) {
      alert('FIX SOR Routing Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderHighlightedFix = (raw) => {
    if (!raw) return null;
    const parts = raw.split('|');
    return (
      <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: '1.6', wordBreak: 'break-all' }}>
        {parts.map((p, idx) => {
          if (!p) return null;
          const [tag, val] = p.split('=');
          const isMsgType = tag === '35';
          const isSymbol = tag === '55';
          const isQty = tag === '38' || tag === '32';
          const isPrice = tag === '44' || tag === '31';
          return (
            <span key={idx} style={{ marginRight: '6px' }}>
              <span style={{ color: '#64748b' }}>{tag}=</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isMsgType ? '#f59e0b' : (isSymbol ? '#38bdf8' : (isQty ? '#10b981' : (isPrice ? '#ec4899' : '#cbd5e1')))
                }}
              >
                {val}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🛰️ Institutional FIX 4.2 Protocol & Smart Order Router (SOR)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Direct-to-market SOH-delimited FIX tag inspection, sub-millisecond dark-cross routing, and exchange liquidity rebate optimization.
          </p>
        </div>

        <div style={{ padding: '6px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '6px', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
          ● FIX SESSION: ONLINE (TargetCompID: CONTANGO_HFT)
        </div>
      </div>

      {/* Main Grid: Order Form + SOR Slicer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px' }}>
        
        {/* Left: FIX Order Generator */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: '#38bdf8' }}>
            ⚡ Generate Institutional FIX Order (Tag 35=D)
          </div>

          <form onSubmit={handleRouteOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Symbol (Tag 55)</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Side (Tag 54)</label>
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontWeight: 700 }}
                >
                  <option value="BUY">1 = BUY</option>
                  <option value="SELL">2 = SELL</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Order Qty (Tag 38)</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Limit Price (Tag 44)</label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>SOR Venue Routing Strategy</label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#38bdf8', fontWeight: 700 }}
              >
                <option value="DARK_FIRST">Dark Pool Midpoint Cross First (Max Price Improvement)</option>
                <option value="MAX_REBATE">Max Maker Rebate Harvesting (BATS / ARCA)</option>
                <option value="MIN_LATENCY">Ultra-Low Latency Direct Route (NASDAQ INET)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px',
                padding: '10px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Routing FIX Slices...' : '🚀 Route via Smart Order Router'}
            </button>
          </form>
        </div>

        {/* Right: Active SOR Route Result & Inbound Tag 35 */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: '#10b981', display: 'flex', justifyContent: 'space-between' }}>
            <span>⚡ SOR Execution Breakdown & Liquidity Venues</span>
            {activeRoute && <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ClOrdID: {activeRoute.route_id}</span>}
          </div>

          {activeRoute ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Metric Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Avg Fill Price</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>${activeRoute.avg_execution_price.toFixed(3)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Price Improvement</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>+${activeRoute.total_price_improvement_dollars.toFixed(2)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Exchange Rebates</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>+${activeRoute.total_net_rebate_dollars.toFixed(2)}</div>
                </div>
              </div>

              {/* Venues Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '6px' }}>Venue</th>
                      <th style={{ padding: '6px' }}>Type</th>
                      <th style={{ padding: '6px' }}>Qty</th>
                      <th style={{ padding: '6px' }}>Fill Price</th>
                      <th style={{ padding: '6px' }}>Rebate Bps</th>
                      <th style={{ padding: '6px', textAlign: 'right' }}>Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRoute.venues.map((v, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '6px', fontWeight: 700, color: '#fff' }}>{v.venue}</td>
                        <td style={{ padding: '6px' }}>
                          <span style={{ padding: '2px 6px', background: v.venue_type === 'DARK' ? 'rgba(139,92,246,0.15)' : 'rgba(56,189,248,0.15)', color: v.venue_type === 'DARK' ? '#c084fc' : '#38bdf8', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                            {v.venue_type}
                          </span>
                        </td>
                        <td style={{ padding: '6px' }}>{v.allocated_qty} sh</td>
                        <td style={{ padding: '6px', color: '#10b981', fontWeight: 700 }}>${v.fill_price.toFixed(3)}</td>
                        <td style={{ padding: '6px' }}>+{v.rebate_fee_bps} bps</td>
                        <td style={{ padding: '6px', textAlign: 'right', color: '#94a3b8' }}>{v.latency_ms} ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Raw Inbound FIX Stream Box */}
              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
                  RAW INBOUND FIX MESSAGE (Tag 35=D NewOrderSingle):
                </div>
                {renderHighlightedFix(activeRoute.inbound_fix?.raw_fix_string)}
              </div>
            </div>
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              Submit a FIX order to trigger multi-venue smart routing simulation.
            </div>
          )}
        </div>

      </div>

      {/* Execution Reports History */}
      {fixHistory.length > 0 && (
        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
            📜 Recent FIX 4.2 Execution Reports (Tag 35=8)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {fixHistory.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.75rem' }}>
                <div>
                  <strong style={{ color: item.side === 'BUY' ? '#10b981' : '#ef4444' }}>{item.side}</strong> {item.total_qty} {item.symbol} @ ${item.avg_execution_price?.toFixed(2)}
                  <span style={{ color: '#64748b', marginLeft: '10px' }}>ID: {item.route_id}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#10b981' }}>Price Imp: +${item.total_price_improvement_dollars?.toFixed(2)}</span>
                  <span style={{ color: '#f59e0b' }}>Rebate: +${item.total_net_rebate_dollars?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default FixProtocolRouter;
