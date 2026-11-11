import React, { useState, useEffect } from 'react';

export default function CommodityTermStructure() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCommodity, setActiveCommodity] = useState('CL');
  const [stagedRoll, setStagedRoll] = useState(null);

  const fetchCurves = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/commodity/curves');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch commodity curves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurves();
  }, []);

  const commodities = data?.commodities || [];
  const selected = commodities.find(c => c.symbol === activeCommodity) || commodities[0];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🌾</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Systematic Commodity Term Structure & Roll Optimizer
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              DECENNIAL SEASONAL OVERLAY
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Physical forward curves, annualized roll yield capture (backwardation vs contango), and seasonal cycle execution.
          </p>
        </div>

        {/* Commodity Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          {commodities.map(c => (
            <button
              key={c.symbol}
              onClick={() => setActiveCommodity(c.symbol)}
              style={{
                background: activeCommodity === c.symbol ? '#2563eb' : 'transparent',
                color: activeCommodity === c.symbol ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {stagedRoll && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ✓ Staged roll order for {stagedRoll.name}: {stagedRoll.optimal_roll_strategy}
        </div>
      )}

      {selected && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>CURVE STRUCTURE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: selected.curve_structure === 'BACKWARDATION' ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
                {selected.curve_structure}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                {selected.curve_structure === 'BACKWARDATION' ? 'Positive Roll Yield' : 'Negative Roll Yield'}
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>ANNUALIZED ROLL YIELD</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: selected.annualized_roll_yield_pct > 0 ? '#10b981' : '#ef4444', marginTop: '4px', fontFamily: 'monospace' }}>
                {selected.annualized_roll_yield_pct > 0 ? `+${selected.annualized_roll_yield_pct}%` : `${selected.annualized_roll_yield_pct}%`}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Prompt vs M2 forward spread</div>
            </div>

            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>SEASONAL CYCLE WIN RATE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8', marginTop: '4px', fontFamily: 'monospace' }}>
                {selected.seasonal_win_rate}%
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>10-Year historical track record</div>
            </div>

            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b' }}>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>PROMPT SPOT PRICE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#f8fafc', marginTop: '4px', fontFamily: 'monospace' }}>
                ${selected.prompt_price} <span style={{ fontSize: '12px', color: '#94a3b8' }}>{selected.unit}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Front-month contract</div>
            </div>
          </div>

          {/* Strategy & Seasonal Action Box */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>RECOMMENDED QUANT STRATEGY</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', marginTop: '4px' }}>
                {selected.optimal_roll_strategy}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                Seasonal Trend: <span style={{ color: '#cbd5e1' }}>{selected.seasonal_cycle}</span>
              </div>
            </div>
            <button
              onClick={() => setStagedRoll(selected)}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ⚡ Stage Roll Optimization Trade
            </button>
          </div>

          {/* Forward Curve Expiries Table */}
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
              📈 Complete Forward Curve Term Structure ({selected.name})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selected.curve.length}, 1fr)`, gap: '12px' }}>
              {selected.curve.map((pt, idx) => (
                <div key={idx} style={{ background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b', textAlign: 'center' }}>
                  <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>{pt.month}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', marginTop: '6px', fontFamily: 'monospace' }}>
                    ${pt.price}
                  </div>
                  <div style={{ fontSize: '11px', color: pt.price >= selected.prompt_price ? '#10b981' : '#ef4444', marginTop: '4px', fontFamily: 'monospace' }}>
                    {(pt.price - selected.prompt_price) >= 0 ? `+$${(pt.price - selected.prompt_price).toFixed(2)}` : `-$${Math.abs(pt.price - selected.prompt_price).toFixed(2)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
