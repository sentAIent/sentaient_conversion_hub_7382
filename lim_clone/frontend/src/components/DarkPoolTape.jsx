import { useState, useEffect } from 'react';

const DarkPoolTape = () => {
  const [symbol, setSymbol] = useState('SPY');
  const [tapeData, setTapeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mirroredPrint, setMirroredPrint] = useState(null);

  const fetchTape = async (sym) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/darkpool/prints?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setTapeData(json);
    } catch (err) {
      console.error('Failed to fetch dark pool tape', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTape(symbol);
    const interval = setInterval(() => fetchTape(symbol), 4000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleMirror = (p) => {
    setMirroredPrint(p);
    setTimeout(() => setMirroredPrint(null), 4000);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🕵️ Dark Pool ATS Block Detector & FINRA TRF Tape
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Real-time off-exchange block print inspection ($1M+ notional), NBBO cross classification, and institutional stealth accumulation clusters.
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

      {mirroredPrint && (
        <div style={{ padding: '12px 18px', background: 'rgba(56,189,248,0.15)', border: '1px solid #38bdf8', borderRadius: '8px', color: '#38bdf8', fontSize: '0.85rem' }}>
          ⚡ <strong>Whale Print Shadowed:</strong> Staged matching order for {mirroredPrint.size} {mirroredPrint.symbol} @ ${mirroredPrint.price} via Dark Cross SOR.
        </div>
      )}

      {loading && !tapeData ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Listening to FINRA TRF off-exchange feed...</div>
      ) : tapeData ? (
        <>
          {/* Key Dark Pool Telemetry */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dark Pool Volume Share</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {tapeData.dark_pool_volume_share_pct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Off-exchange ATS market share
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Accumulation Cluster Score</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                {tapeData.accumulation_cluster_score} / 100
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                {tapeData.cluster_bias.replace(/_/g, ' ')}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Dark Notional Detected</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                ${(tapeData.total_dark_notional_usd / 1e6).toFixed(1)}M
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                {tapeData.total_dark_shares_detected.toLocaleString()} shares
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Execution Classification</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                Aggressive Above-Ask
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Institutions taking liquidity
              </div>
            </div>
          </div>

          {/* Whale Prints Live Feed Table */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🐋 Recent FINRA TRF Institutional Block Prints ($1M+ Minimum)</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● LIVE DELAYED FEED</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '8px' }}>Time</th>
                    <th style={{ padding: '8px' }}>Symbol</th>
                    <th style={{ padding: '8px' }}>Price</th>
                    <th style={{ padding: '8px' }}>Block Size</th>
                    <th style={{ padding: '8px' }}>Notional USD</th>
                    <th style={{ padding: '8px' }}>Venue</th>
                    <th style={{ padding: '8px' }}>NBBO Flag</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tapeData.all_market_blocks?.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '8px', color: '#94a3b8' }}>{p.time}</td>
                      <td style={{ padding: '8px', fontWeight: 800, color: '#38bdf8' }}>{p.symbol}</td>
                      <td style={{ padding: '8px', fontWeight: 700, color: '#fff' }}>${p.price.toFixed(2)}</td>
                      <td style={{ padding: '8px' }}>{p.size.toLocaleString()} sh</td>
                      <td style={{ padding: '8px', fontWeight: 800, color: '#10b981' }}>
                        ${(p.total_value_usd / 1e6).toFixed(1)}M
                      </td>
                      <td style={{ padding: '8px', color: '#c084fc', fontSize: '0.75rem' }}>{p.venue}</td>
                      <td style={{ padding: '8px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            background: p.nbbo_class === 'ABOVE_ASK' ? 'rgba(16,185,129,0.15)' : (p.nbbo_class === 'BELOW_BID' ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)'),
                            color: p.nbbo_class === 'ABOVE_ASK' ? '#10b981' : (p.nbbo_class === 'BELOW_BID' ? '#ef4444' : '#38bdf8')
                          }}
                        >
                          {p.nbbo_class}
                        </span>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleMirror(p)}
                          style={{ padding: '4px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Shadow Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default DarkPoolTape;
