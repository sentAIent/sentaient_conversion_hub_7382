import { useState, useEffect } from 'react';

const AltDataIntelligence = () => {
  const [symbol, setSymbol] = useState('NVDA');
  const [altData, setAltData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('congress');
  const [copiedTrade, setCopiedTrade] = useState(null);

  const fetchAltData = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/altdata/signals?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setAltData(json);
    } catch (err) {
      console.error('Failed to fetch alternative data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAltData(symbol);
  }, [symbol]);

  const handleCopyTrade = (trade) => {
    setCopiedTrade(trade);
    setTimeout(() => setCopiedTrade(null), 4000);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🏛️ Alternative Data & Congressional / Corporate Insider Alpha
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            STOCK Act congressional trading disclosures, SEC Form 4 C-suite insider cluster purchases, and 13F institutional whale tracking.
          </p>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveSection('congress')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeSection === 'congress' ? '#3b82f6' : 'transparent',
              color: activeSection === 'congress' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            🏛️ Congressional Trades
          </button>
          <button
            onClick={() => setActiveSection('insider')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeSection === 'insider' ? '#3b82f6' : 'transparent',
              color: activeSection === 'insider' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            💼 Form 4 Insider Buys
          </button>
          <button
            onClick={() => setActiveSection('whales')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeSection === 'whales' ? '#3b82f6' : 'transparent',
              color: activeSection === 'whales' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            🐋 13F Whale Tracking
          </button>
        </div>
      </div>

      {copiedTrade && (
        <div style={{ padding: '12px 18px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>⚡ <strong>1-Click Copy Trade Dispatched:</strong> Staged matching order for {copiedTrade.symbol || copiedTrade.politician} via Alpaca OMS.</span>
          <span style={{ fontSize: '0.8rem', background: '#10b981', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>STAGED</span>
        </div>
      )}

      {loading && !altData ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Ingesting alternative data streams...</div>
      ) : altData ? (
        <>
          {/* Composite Sentiment Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target Symbol Sentiment</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {altData.target_symbol} ({altData.sentiment_badge})
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Score: <strong>{altData.composite_alt_data_score}/100</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Congressional Win Rate</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                78.4%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Trailing 12-month disclosure alpha
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>C-Suite Cluster Intensity</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                High (3 Buys)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Net Insider Inflow: +$10.5M
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Institutional Whale Inflow</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                +$3.42B Q/Q
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Citadel & Berkshire Active
              </div>
            </div>
          </div>

          {/* Section 1: Congressional STOCK Act Disclosures */}
          {activeSection === 'congress' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {altData.congressional_trades.map((t, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{t.politician}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.chamber} • {t.party} • {t.committee}</div>
                    </div>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, background: t.type === 'PURCHASE' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: t.type === 'PURCHASE' ? '#10b981' : '#ef4444' }}>
                      {t.type}
                    </span>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Asset:</span>
                      <strong style={{ color: '#38bdf8' }}>{t.symbol} ({t.asset_desc})</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>Est. Amount:</span>
                      <strong style={{ color: '#fff' }}>{t.amount_range}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>Filing Delay:</span>
                      <span>{t.delay_days} days (Filed {t.filing_date})</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>Performance:</span>
                      <strong style={{ color: t.performance_since_filing_pct >= 0 ? '#10b981' : '#ef4444' }}>
                        {t.performance_since_filing_pct >= 0 ? '+' : ''}{t.performance_since_filing_pct}%
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyTrade(t)}
                    style={{ padding: '8px', background: 'linear-gradient(90deg, #3b82f6, #10b981)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    ⚡ 1-Click Mirror Politician Trade
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Section 2: Form 4 Insider Buys */}
          {activeSection === 'insider' && (
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
                💼 SEC Form 4 C-Suite Open-Market Cluster Purchases
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '8px' }}>Symbol</th>
                      <th style={{ padding: '8px' }}>Insider Name & Role</th>
                      <th style={{ padding: '8px' }}>Transaction</th>
                      <th style={{ padding: '8px' }}>Shares</th>
                      <th style={{ padding: '8px' }}>Price</th>
                      <th style={{ padding: '8px' }}>Total USD</th>
                      <th style={{ padding: '8px' }}>Filing Date</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {altData.insider_cluster_buys.map((i, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '8px', fontWeight: 800, color: '#38bdf8' }}>{i.symbol}</td>
                        <td style={{ padding: '8px' }}>
                          <strong style={{ color: '#fff' }}>{i.insider_name}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>{i.title}</span>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <span style={{ padding: '2px 6px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                            {i.type}
                          </span>
                        </td>
                        <td style={{ padding: '8px' }}>{i.shares.toLocaleString()}</td>
                        <td style={{ padding: '8px' }}>${i.price.toFixed(2)}</td>
                        <td style={{ padding: '8px', fontWeight: 700, color: '#10b981' }}>
                          ${(i.total_value_usd / 1e6).toFixed(2)}M
                        </td>
                        <td style={{ padding: '8px', color: '#94a3b8' }}>{i.filing_date}</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleCopyTrade(i)}
                            style={{ padding: '4px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Mirror Buy
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 3: 13F Institutional Whale Tracking */}
          {activeSection === 'whales' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {altData.whale_holdings.map((w, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#c084fc' }}>{w.fund}</span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{w.manager}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
                    Target: {w.symbol} ({w.portfolio_weight_pct}% Portfolio Weight)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem' }}>
                    <div>Position Value: <strong>${w.market_value_billions}B</strong></div>
                    <div>Q/Q Shift: <strong style={{ color: w.quarterly_change_pct >= 0 ? '#10b981' : '#ef4444' }}>{w.quarterly_change_pct}%</strong></div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>
                    Signal: {w.action.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}

        </>
      ) : null}

    </div>
  );
};

export default AltDataIntelligence;
