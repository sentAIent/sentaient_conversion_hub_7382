import React, { useState, useEffect } from 'react';

export default function ConvertibleArbLab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deployedArb, setDeployedArb] = useState(null);

  const fetchConvertibles = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/convertible-arb/screener');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch convertibles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvertibles();
  }, []);

  const convertibles = data?.convertible_universe || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>💎</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Convertible Bond Arbitrage & Delta-Gamma Hedging Lab
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              TSIVERIOTIS-FERNANDES (1998)
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Straight bond investment floor vs embedded equity option decomposition with dynamic short delta hedging.
          </p>
        </div>

        <button
          onClick={fetchConvertibles}
          style={{
            background: '#1e293b',
            color: '#38bdf8',
            border: '1px solid #334155',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🔄 Revalue Universe
        </button>
      </div>

      {deployedArb && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ✓ Delta-neutral hedge staged: Long 10 bonds {deployedArb.ticker} & Short {(deployedArb.delta_hedge_short_shares * 10).toFixed(0)} shares
        </div>
      )}

      {/* Convertible Universe Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {convertibles.map((cb, idx) => {
          const isUndervalued = cb.mispricing_pct > 0;

          return (
            <div
              key={idx}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '20px',
                borderLeft: `4px solid ${isUndervalued ? '#10b981' : '#64748b'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#f8fafc' }}>{cb.issuer}</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#1e293b', color: '#38bdf8', fontFamily: 'monospace' }}>
                      CUSIP: {cb.cusip}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      {cb.coupon_pct}% Mat {cb.maturity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                    Strategy: <span style={{ color: isUndervalued ? '#10b981' : '#f8fafc', fontWeight: '600' }}>{cb.volatility_arbitrage_rating}</span>
                  </div>
                </div>

                <button
                  onClick={() => setDeployedArb(cb)}
                  style={{
                    background: isUndervalued ? '#059669' : '#334155',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Deploy Delta-Neutral Pair (Buy Bond / Short Stock)
                </button>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', background: '#090d16', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Market Price</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>${cb.market_price}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Conversion Parity</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8', fontFamily: 'monospace' }}>${cb.conversion_parity}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Straight Bond Floor</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#c084fc', fontFamily: 'monospace' }}>${cb.straight_bond_floor}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Theoretical Value</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: isUndervalued ? '#10b981' : '#f8fafc', fontFamily: 'monospace' }}>${cb.theoretical_fair_value}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Equity Delta (Δ)</div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b', fontFamily: 'monospace' }}>{cb.delta}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>Hedge Ratio</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#10b981', fontFamily: 'monospace' }}>Short {cb.delta_hedge_short_shares} shs</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
