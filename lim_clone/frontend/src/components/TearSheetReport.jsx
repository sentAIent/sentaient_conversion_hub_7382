import React, { useState, useEffect } from 'react';

export default function TearSheetReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTearSheet = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/report/tear-sheet');
      const json = await res.json();
      if (json.status === 'success') {
        setData(json.tear_sheet);
      }
    } catch (err) {
      console.error("Failed to fetch tear sheet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTearSheet();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
        Loading GIPS-audited tear sheet metrics...
      </div>
    );
  }

  const ratios = data?.institutional_ratios || {};
  const heatmap = data?.monthly_performance_heatmap || [];
  const underwater = data?.underwater_drawdown_curve || [];

  return (
    <div style={{ padding: '24px', color: '#e2e8f0', background: '#0a0d14', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📊</span>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
              {data?.fund_name || 'Contango Quant Institutional Flagship LP'}
            </h1>
            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              {data?.auditor_status || 'GIPS VERIFIED COMPLIANT'}
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '6px 0 0 0' }}>
            Audited Performance Tear Sheet & LP Investor Risk Profile • Benchmark: {data?.benchmark} • Capacity: ${data?.aum_capacity_millions}M
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🖨️ Export / Print LP Tear Sheet
          </button>
        </div>
      </div>

      {/* Institutional Key Ratios Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>ANNUALIZED RETURN</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
            +{ratios.annualized_compound_return_pct}%
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Net of 2/20 fees</div>
        </div>

        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>SHARPE RATIO</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>
            {ratios.sharpe_ratio}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Rf = 4.25%</div>
        </div>

        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>SORTINO RATIO</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#a855f7', marginTop: '4px' }}>
            {ratios.sortino_ratio}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Downside dev 3.8%</div>
        </div>

        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>CALMAR RATIO</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
            {ratios.calmar_ratio}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Ret / MaxDD</div>
        </div>

        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>MAX DRAWDOWN</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#ef4444', marginTop: '4px' }}>
            {ratios.maximum_peak_drawdown_pct}%
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Recovery: 28 days</div>
        </div>

        <div style={{ background: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>OMEGA RATIO</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>
            {ratios.omega_ratio}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Gain/Pain: {ratios.gain_to_pain_ratio}</div>
        </div>
      </div>

      {/* Monthly Performance Heatmap */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
            🗓️ Monthly Return Matrix (% Net of Fees)
          </h2>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            Benchmark: <span style={{ color: '#f8fafc', fontWeight: '600' }}>SPYTR</span> • Alpha: <span style={{ color: '#10b981', fontWeight: '700' }}>+14.2%</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Year</th>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <th key={m} style={{ padding: '10px' }}>{m}</th>
                ))}
                <th style={{ padding: '10px', background: '#334155', color: '#f8fafc', fontWeight: '700' }}>YTD</th>
              </tr>
            </thead>
            <tbody>
              {heatmap.map((row) => (
                <tr key={row.year} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '12px 10px', textAlign: 'left', fontWeight: '700', color: '#f8fafc' }}>
                    {row.year}
                  </td>
                  {row.months.map((m, mIdx) => {
                    const ret = m.ret;
                    let bg = 'transparent';
                    let color = '#94a3b8';
                    if (ret !== null && ret !== undefined) {
                      if (ret > 3) bg = 'rgba(16, 185, 129, 0.35)';
                      else if (ret > 0) bg = 'rgba(16, 185, 129, 0.15)';
                      else if (ret < -2) bg = 'rgba(239, 68, 68, 0.35)';
                      else if (ret < 0) bg = 'rgba(239, 68, 68, 0.15)';
                      color = ret >= 0 ? '#34d399' : '#f87171';
                    }
                    return (
                      <td key={mIdx} style={{ padding: '12px 6px', background: bg, color: color, fontWeight: '600', fontFamily: 'monospace' }}>
                        {ret !== null && ret !== undefined ? `${ret > 0 ? '+' : ''}${ret.toFixed(1)}%` : '—'}
                      </td>
                    );
                  })}
                  <td style={{ padding: '12px 10px', background: '#1e293b80', color: '#10b981', fontWeight: '800', fontFamily: 'monospace', fontSize: '13px' }}>
                    +{row.ytd_return_pct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Underwater Drawdown Chart & Risk Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: Underwater Drawdown */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
            📉 Underwater Peak-to-Trough Drawdown (%)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {underwater.map((pt, idx) => {
              const dd = pt.drawdown_pct;
              const widthPct = Math.min(Math.abs(dd) * 10, 100);
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                  <span style={{ width: '65px', color: '#64748b', fontFamily: 'monospace' }}>{pt.period}</span>
                  <div style={{ flex: 1, background: '#090d16', height: '20px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${widthPct}%`,
                        background: dd === 0 ? '#10b981' : '#ef4444',
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  <span style={{ width: '50px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: dd === 0 ? '#10b981' : '#f87171' }}>
                    {dd === 0 ? '0.0%' : `${dd.toFixed(1)}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Institutional Due Diligence Stats */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc', margin: '0 0 16px 0' }}>
            🛡️ LP Due Diligence & Risk Profile
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Peer Group Ranking:</span>
              <span style={{ color: '#38bdf8', fontWeight: '700' }}>{ratios.peer_group_percentile}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Value at Risk (99% 1-Day):</span>
              <span style={{ color: '#f8fafc', fontFamily: 'monospace', fontWeight: '700' }}>{ratios.var_99_1day_pct}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Expected Shortfall (CVaR 99%):</span>
              <span style={{ color: '#f8fafc', fontFamily: 'monospace', fontWeight: '700' }}>{ratios.cvar_99_expected_shortfall_pct}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Information Ratio vs SPY:</span>
              <span style={{ color: '#10b981', fontFamily: 'monospace', fontWeight: '700' }}>{ratios.information_ratio_vs_spy}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Annualized Volatility:</span>
              <span style={{ color: '#f8fafc', fontFamily: 'monospace', fontWeight: '700' }}>{ratios.annualized_volatility_pct}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Max Drawdown Duration:</span>
              <span style={{ color: '#f59e0b', fontWeight: '700' }}>{ratios.drawdown_duration_days} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
