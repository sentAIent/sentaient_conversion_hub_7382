import React, { useState, useEffect } from 'react';

export default function LeadLagMatrix() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedTrade, setStagedTrade] = useState(null);

  const fetchMatrix = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/lead-lag/matrix');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch lead-lag matrix:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatrix();
  }, []);

  const signals = data?.primary_signals || [];
  const matrix = data?.correlation_matrix || {};
  const universe = data?.tracked_universe || [];
  const alerts = data?.active_arbitrage_alerts || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🔗</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              Lead-Lag Cross-Correlation & Information Flow Matrix
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              GRANGER CAUSALITY & TRANSFER ENTROPY
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            High-frequency cross-asset directional front-running: identify macro leads before secondary asset repricing.
          </p>
        </div>

        <button
          onClick={fetchMatrix}
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
          🔄 Rescan Lags
        </button>
      </div>

      {stagedTrade && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', fontWeight: '600' }}>
          ✓ Arbitrage trade staged: {stagedTrade.pair} ({stagedTrade.action})
        </div>
      )}

      {/* Active Divergence Alerts */}
      {alerts.map((al, idx) => (
        <div key={idx} style={{ background: '#0f172a', border: '1px solid #ef4444', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444', letterSpacing: '0.05em' }}>● ACTIVE LEAD DIVERGENCE ARBITRAGE</span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>• {al.pair}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: '600' }}>
              {al.lead_asset_move} ➔ <span style={{ color: '#38bdf8' }}>{al.predicted_lag_response}</span>
            </div>
          </div>
          <button
            onClick={() => setStagedTrade(al)}
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            ⚡ Stage {al.action}
          </button>
        </div>
      ))}

      {/* Primary Lead-Lag Signals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {signals.map((sig, idx) => (
          <div key={idx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8', fontFamily: 'monospace' }}>
                {sig.information_flow_direction}
              </span>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: '#1e293b', color: '#10b981', fontWeight: '600' }}>
                p = {sig.granger_p_value}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '10px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#64748b' }}>Optimal Lag</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>
                  {sig.optimal_lag_minutes} mins
                </div>
              </div>
              <div>
                <div style={{ color: '#64748b' }}>Peak Cross-Corr</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: sig.max_cross_corr > 0 ? '#10b981' : '#ef4444', fontFamily: 'monospace' }}>
                  {sig.max_cross_corr > 0 ? `+${sig.max_cross_corr}` : sig.max_cross_corr}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.4, background: '#090d16', padding: '8px', borderRadius: '6px' }}>
              {sig.economic_rationale}
            </div>
          </div>
        ))}
      </div>

      {/* 8x8 Pairwise Correlation Matrix */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
          🌐 Cross-Asset Pairwise Correlation Matrix
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Asset</th>
                {universe.map(u => (
                  <th key={u} style={{ padding: '8px', fontFamily: 'monospace' }}>{u}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {universe.map(rowAsset => (
                <tr key={rowAsset} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px', textAlign: 'left', fontWeight: '700', color: '#f8fafc', fontFamily: 'monospace' }}>
                    {rowAsset}
                  </td>
                  {universe.map(colAsset => {
                    const corr = matrix[rowAsset]?.[colAsset];
                    let bg = 'transparent';
                    let col = '#94a3b8';
                    if (corr !== undefined) {
                      if (corr > 0.6) bg = 'rgba(16, 185, 129, 0.25)';
                      else if (corr > 0.2) bg = 'rgba(16, 185, 129, 0.1)';
                      else if (corr < -0.6) bg = 'rgba(239, 68, 68, 0.25)';
                      else if (corr < -0.2) bg = 'rgba(239, 68, 68, 0.1)';
                      col = corr >= 0 ? '#34d399' : '#f87171';
                    }
                    return (
                      <td key={colAsset} style={{ padding: '8px', background: bg, color: col, fontFamily: 'monospace', fontWeight: '600' }}>
                        {corr !== undefined ? (corr > 0 ? `+${corr.toFixed(2)}` : corr.toFixed(2)) : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
