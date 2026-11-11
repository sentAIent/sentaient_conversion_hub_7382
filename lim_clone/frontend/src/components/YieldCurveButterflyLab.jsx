import React, { useState, useEffect } from 'react';

export default function YieldCurveButterflyLab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedFly, setStagedFly] = useState(null);

  const fetchYieldCurve = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/yield-curve/sofr');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch yield curve:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYieldCurve();
  }, []);

  const points = data?.curve_points || [];
  const butterflies = data?.butterfly_opportunities || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📈</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Yield Curve Fitter & SOFR Swaps Butterfly Lab
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              NELSON-SIEGEL-SVENSSON (4F)
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            SOFR swaps & US Treasury zero-curve bootstrapping, Key Rate Duration (KRD), and butterfly relative-value RV spreads.
          </p>
        </div>

        <button
          onClick={fetchYieldCurve}
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
          🔄 Recalibrate NSS Model
        </button>
      </div>

      {stagedFly && (
        <div style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', color: '#c084fc', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ✓ Staged duration-neutral order: {stagedFly.name} (Z-Score: {stagedFly.z_score})
        </div>
      )}

      {/* Butterfly RV Opportunities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {butterflies.map((fly, idx) => {
          const isCheap = fly.z_score > 0;
          return (
            <div
              key={idx}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '18px',
                borderLeft: `4px solid ${isCheap ? '#10b981' : '#f59e0b'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>{fly.name}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: isCheap ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: isCheap ? '#10b981' : '#f59e0b', fontWeight: '700' }}>
                  Z-Score {fly.z_score > 0 ? `+${fly.z_score}` : fly.z_score}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '20px', margin: '14px 0', fontSize: '12px' }}>
                <div>
                  <div style={{ color: '#64748b' }}>Current Fly</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc', fontFamily: 'monospace' }}>
                    {fly.current_fly_bps} bps
                  </div>
                </div>
                <div>
                  <div style={{ color: '#64748b' }}>Fair Value</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8', fontFamily: 'monospace' }}>
                    {fly.fair_value_bps} bps
                  </div>
                </div>
                <div>
                  <div style={{ color: '#64748b' }}>Mispricing</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: isCheap ? '#10b981' : '#f59e0b', fontFamily: 'monospace' }}>
                    {Math.abs(fly.current_fly_bps - fly.fair_value_bps).toFixed(1)} bps
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '14px', background: '#090d16', padding: '8px 12px', borderRadius: '6px' }}>
                {fly.recommendation}
              </div>

              <button
                onClick={() => setStagedFly(fly)}
                style={{
                  background: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                ⚡ Stage Duration-Neutral Fly Execution
              </button>
            </div>
          );
        })}
      </div>

      {/* Yield Curve Table & KRD */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
          📊 Term Structure Tenor Grid & Key Rate Durations (KRD)
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '10px' }}>Tenor</th>
                <th style={{ padding: '10px' }}>Maturity (Yrs)</th>
                <th style={{ padding: '10px' }}>Market Yield</th>
                <th style={{ padding: '10px' }}>NSS Fitted Yield</th>
                <th style={{ padding: '10px' }}>Residual (bps)</th>
                <th style={{ padding: '10px' }}>KRD (Years)</th>
                <th style={{ padding: '10px' }}>DV01 per $10M</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.tenor} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '10px', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>
                    {p.tenor}
                  </td>
                  <td style={{ padding: '10px', color: '#94a3b8', fontFamily: 'monospace' }}>
                    {p.years < 1 ? `${(p.years * 12).toFixed(0)}m` : `${p.years.toFixed(1)}y`}
                  </td>
                  <td style={{ padding: '10px', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>
                    {p.market_yield.toFixed(2)}%
                  </td>
                  <td style={{ padding: '10px', color: '#38bdf8', fontFamily: 'monospace' }}>
                    {p.nss_fitted_yield.toFixed(2)}%
                  </td>
                  <td style={{ padding: '10px', fontFamily: 'monospace', color: Math.abs(p.residual_bps) > 5 ? '#f59e0b' : '#10b981' }}>
                    {p.residual_bps > 0 ? `+${p.residual_bps}` : p.residual_bps} bps
                  </td>
                  <td style={{ padding: '10px', color: '#c084fc', fontFamily: 'monospace' }}>
                    {p.krd_duration}y
                  </td>
                  <td style={{ padding: '10px', fontWeight: '700', color: '#10b981', fontFamily: 'monospace' }}>
                    ${p.dv01_per_10m}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
