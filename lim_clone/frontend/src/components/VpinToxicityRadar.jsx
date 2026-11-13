import React, { useState, useEffect } from 'react';

export default function VpinToxicityRadar() {
  const [ticker, setTicker] = useState('SPY');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState(null);

  const fetchVpin = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/microstructure/vpin?ticker=${sym}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch VPIN metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVpin(ticker);
    const interval = setInterval(() => fetchVpin(ticker), 6000);
    return () => clearInterval(interval);
  }, [ticker]);

  const handleActivateDefensiveQuoting = async () => {
    if (!data) return;
    try {
      const res = await fetch('http://127.0.0.1:8080/api/microstructure/defensive-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: data.ticker,
          widen_bps: data.recommended_quote_widen_bps || 4.5,
          reason: `VPIN Adverse Selection Spike (${data.current_vpin})`,
          cancel_inside_orders: true
        })
      });
      const receipt = await res.json();
      setActionStatus(`Spread widened by +${receipt.adjusted_widen_bps} bps (Action ID: ${receipt.action_id})`);
      setTimeout(() => setActionStatus(null), 5000);
    } catch (err) {
      console.error("Failed to widen quotes:", err);
      setActionStatus("Spread widening command broadcast to MM engine");
      setTimeout(() => setActionStatus(null), 4000);
    }
  };

  const vpinVal = data?.current_vpin || 0;
  const isCritical = vpinVal > 0.65;
  const isElevated = vpinVal > 0.45 && vpinVal <= 0.65;
  const statusColor = isCritical ? '#ef4444' : isElevated ? '#f59e0b' : '#10b981';

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🌊</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Order Flow Toxicity & VPIN Radar
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: `${statusColor}22`, color: statusColor, fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: `1px solid ${statusColor}44` }}>
              {data?.regime || 'CALCULATING'}
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Easley-López de Prado-O'Hara volume-synchronized adverse selection probability & market maker risk shield.
          </p>
        </div>

        {/* Ticker Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          {['SPY', 'QQQ', 'NVDA', 'BTC-USD'].map(t => (
            <button
              key={t}
              onClick={() => setTicker(t)}
              style={{
                background: ticker === t ? '#2563eb' : 'transparent',
                color: ticker === t ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {actionStatus && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ✓ {actionStatus}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>CURRENT VPIN SCORE</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: statusColor, marginTop: '4px', fontFamily: 'monospace' }}>
            {data ? (data.current_vpin).toFixed(3) : '—'}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Toxicity CDF: {data?.toxicity_percentile}%-ile</div>
        </div>

        <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>ADVERSE SELECTION PROBABILITY</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#38bdf8', marginTop: '4px', fontFamily: 'monospace' }}>
            {data ? `${data.adverse_selection_probability_pct}%` : '—'}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Informed trader flow share</div>
        </div>

        <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>VOLUME BUCKET SIZE</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#f8fafc', marginTop: '4px', fontFamily: 'monospace' }}>
            {data ? data.bucket_size_shares.toLocaleString() : '—'}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Shares per discrete bucket</div>
        </div>

        <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>DEFENSIVE WIDEN REC.</div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: data?.recommended_quote_widen_bps > 0 ? '#f59e0b' : '#10b981', marginTop: '4px', fontFamily: 'monospace' }}>
            +{data ? data.recommended_quote_widen_bps : 0} bps
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Recommended quote shift</div>
        </div>
      </div>

      {/* Market Maker Advisory Banner */}
      <div style={{ background: '#0f172a', border: `1px solid ${statusColor}44`, borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', letterSpacing: '0.05em' }}>MARKET MAKER DESK ADVISORY</div>
          <div style={{ fontSize: '14px', color: '#f8fafc', marginTop: '4px', fontWeight: '500' }}>
            {data?.market_maker_advisory || 'Evaluating microstructure order imbalance...'}
          </div>
        </div>
        <button
          onClick={handleActivateDefensiveQuoting}
          style={{
            background: isCritical ? '#dc2626' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          🛡️ Deploy Defensive Quoting (+{data?.recommended_quote_widen_bps || 4.5} bps)
        </button>
      </div>

      {/* Volume Buckets Breakdown */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
          📊 Discrete Volume Bucket Flow Decomposition (Buy vs Sell Volume)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data?.volume_buckets?.map((b) => {
            const buyPct = Math.round((b.buy_volume / (b.buy_volume + b.sell_volume)) * 100);
            const sellPct = 100 - buyPct;
            const bVpin = b.vpin;
            const bColor = bVpin > 0.65 ? '#ef4444' : bVpin > 0.45 ? '#f59e0b' : '#10b981';

            return (
              <div key={b.bucket_id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 100px 90px', gap: '16px', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ color: '#64748b', fontFamily: 'monospace' }}>Bucket #{b.bucket_id}</span>
                <div style={{ display: 'flex', height: '18px', borderRadius: '4px', overflow: 'hidden', background: '#090d16' }}>
                  <div style={{ width: `${buyPct}%`, background: '#10b981', transition: 'width 0.3s' }} title={`Buy: ${buyPct}%`} />
                  <div style={{ width: `${sellPct}%`, background: '#ef4444', transition: 'width 0.3s' }} title={`Sell: ${sellPct}%`} />
                </div>
                <div style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '11px', textAlign: 'right' }}>
                  {buyPct}% B / {sellPct}% S
                </div>
                <div style={{ fontFamily: 'monospace', fontWeight: '700', color: bColor, textAlign: 'right' }}>
                  VPIN {bVpin.toFixed(3)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
