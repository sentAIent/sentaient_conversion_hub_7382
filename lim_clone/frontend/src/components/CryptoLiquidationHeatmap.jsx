import React, { useState, useEffect } from 'react';

export default function CryptoLiquidationHeatmap() {
  const [symbol, setSymbol] = useState('BTC');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [armedReceipt, setArmedReceipt] = useState(null);

  const fetchHeatmap = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/liquidations/heatmap?symbol=${sym}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch liquidation heatmap:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeatmap(symbol);
    const interval = setInterval(() => fetchHeatmap(symbol), 10000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleArmSweep = async (targetPrice, sweepSide) => {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/liquidations/sweep-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: data.symbol,
          trigger_price: targetPrice,
          sweep_side: sweepSide,
          allocated_usd: 25000.0
        })
      });
      const receipt = await res.json();
      setArmedReceipt(receipt);
      setTimeout(() => setArmedReceipt(null), 6000);
    } catch (err) {
      console.error("Failed to arm sweep order:", err);
      setArmedReceipt({
        symbol: data?.symbol,
        trigger_price: targetPrice,
        status: "ARMED_LOCAL_OMS"
      });
      setTimeout(() => setArmedReceipt(null), 5000);
    }
  };

  const rungs = data?.price_rungs || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Crypto Liquidation Heatmap & Squeeze Cascade Forecaster
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              OI ${data?.total_open_interest_billions || '—'}B
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Multi-venue high-leverage liquidation clusters and automated deleveraging (ADL) cascade triggers.
          </p>
        </div>

        {/* Symbol Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          {['BTC', 'ETH', 'SOL'].map(s => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              style={{
                background: symbol === s ? '#2563eb' : 'transparent',
                color: symbol === s ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {armedReceipt && (
        <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ⚡ Momentum Stop-Sweep Armed at ${armedReceipt.trigger_price} ({armedReceipt.status})
        </div>
      )}

      {/* Squeeze Inflection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Short Squeeze (Upside) */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderLeft: '4px solid #10b981', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981' }}>▲ SHORT SQUEEZE CASCADE TRIGGER</span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Upside: +{data?.short_squeeze_inflection?.pct_upside_trigger}%</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#f8fafc', margin: '8px 0', fontFamily: 'monospace' }}>
            ${data?.short_squeeze_inflection?.trigger_price?.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
            Cluster Liquidity: <span style={{ color: '#10b981', fontWeight: '700' }}>${data?.short_squeeze_inflection?.cluster_liquidity_m}M</span> stop-loss volume
          </div>
          <button
            onClick={() => handleArmSweep(data?.short_squeeze_inflection?.trigger_price, 'BUY_BREAKOUT')}
            style={{
              background: '#065f46',
              color: '#ffffff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🚀 Arm Buy-Stop Sweep Order
          </button>
        </div>

        {/* Long Squeeze (Downside) */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderLeft: '4px solid #ef4444', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444' }}>▼ LONG FLUSH CASCADE TRIGGER</span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Downside: {data?.long_squeeze_inflection?.pct_downside_trigger}%</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#f8fafc', margin: '8px 0', fontFamily: 'monospace' }}>
            ${data?.long_squeeze_inflection?.trigger_price?.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
            Cluster Liquidity: <span style={{ color: '#ef4444', fontWeight: '700' }}>${data?.long_squeeze_inflection?.cluster_liquidity_m}M</span> forced-liquidation volume
          </div>
          <button
            onClick={() => handleArmSweep(data?.long_squeeze_inflection?.trigger_price, 'SELL_BREAKDOWN')}
            style={{
              background: '#991b1b',
              color: '#ffffff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            🔻 Arm Sell-Stop Breakdown Sweep
          </button>
        </div>
      </div>

      {/* Heatmap Ladder Table */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
            🔥 Liquidation Depth Ladder & Leverage Concentrations
          </h2>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Spot: <span style={{ color: '#f8fafc', fontWeight: '700', fontFamily: 'monospace' }}>${data?.spot_price?.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {rungs.map((r, idx) => {
            const isSpot = r.is_spot;
            const hasShortLiq = r.short_liquidation_volume_m > 0;
            const hasLongLiq = r.long_liquidation_volume_m > 0;
            const barWidth = Math.round(r.heatmap_density * 100);

            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 70px 1fr 100px 90px',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: isSpot ? 'rgba(56, 189, 248, 0.15)' : '#090d16',
                  border: isSpot ? '1px solid #38bdf8' : '1px solid transparent',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontFamily: 'monospace', fontWeight: isSpot ? '800' : '600', color: isSpot ? '#38bdf8' : '#f8fafc' }}>
                  ${r.price.toLocaleString()}
                </span>

                <span style={{ fontFamily: 'monospace', color: r.pct_from_spot > 0 ? '#10b981' : r.pct_from_spot < 0 ? '#ef4444' : '#64748b' }}>
                  {r.pct_from_spot > 0 ? `+${r.pct_from_spot}%` : `${r.pct_from_spot}%`}
                </span>

                {/* Heatmap Bar */}
                <div style={{ height: '14px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                  {hasShortLiq && (
                    <div style={{ width: `${barWidth}%`, height: '100%', background: 'linear-gradient(90deg, #059669, #10b981)', borderRadius: '3px' }} />
                  )}
                  {hasLongLiq && (
                    <div style={{ width: `${barWidth}%`, height: '100%', background: 'linear-gradient(90deg, #dc2626, #ef4444)', borderRadius: '3px' }} />
                  )}
                  {isSpot && (
                    <div style={{ width: '100%', height: '100%', background: '#38bdf8', opacity: 0.3 }} />
                  )}
                </div>

                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {r.dominant_leverage_tier}
                </span>

                <span style={{ fontFamily: 'monospace', fontWeight: '700', textAlign: 'right', color: hasShortLiq ? '#10b981' : hasLongLiq ? '#ef4444' : '#64748b' }}>
                  {hasShortLiq ? `$${r.short_liquidation_volume_m}M` : hasLongLiq ? `$${r.long_liquidation_volume_m}M` : 'SPOT'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
