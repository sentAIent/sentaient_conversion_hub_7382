import React, { useState, useEffect } from 'react';
import DataAuditModal from './DataAuditModal';

const AnalyticsPanel = ({ symbol }) => {
  const [stats, setStats] = useState(null);
  const [benchmark, setBenchmark] = useState('^GSPC'); // Default S&P 500
  const [loading, setLoading] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8080/api/portfolio-stats?symbol=${symbol}&benchmark=${benchmark}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, [symbol, benchmark]);

  return (
    <div className="panel" style={{ marginTop: '16px', overflowY: 'auto', maxHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>Advanced Analytics</h3>
          <button 
            onClick={() => setIsAuditOpen(true)}
            style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', cursor: 'pointer', fontWeight: 600 }}
          >
            🔬 Audit Math
          </button>
        </div>
        <select 
          value={benchmark} 
          onChange={(e) => setBenchmark(e.target.value)}
          style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px' }}
        >
          <option value="^GSPC">S&P 500 (^GSPC)</option>
          <option value="SPY">SPDR S&P 500 (SPY)</option>
          <option value="QQQ">Invesco QQQ (QQQ)</option>
        </select>
      </div>

      {loading || !stats ? (
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading quantitative metrics...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
          <StatBox label="Alpha" value={(stats.alpha * 100).toFixed(2) + '%'} color={stats.alpha > 0 ? '#10b981' : '#ef4444'} />
          <StatBox label="Beta" value={stats.beta.toFixed(2)} />
          <StatBox label="Sharpe Ratio" value={stats.sharpe.toFixed(2)} color={stats.sharpe > 1 ? '#10b981' : '#94a3b8'} />
          <StatBox label="Sortino Ratio" value={stats.sortino.toFixed(2)} color={stats.sortino > 1 ? '#10b981' : '#94a3b8'} />
          <StatBox label="Omega Ratio" value={stats.omega.toFixed(2)} />
          <StatBox label="M-Squared" value={(stats.m_squared * 100).toFixed(2) + '%'} />
          <StatBox label="R-Squared" value={stats.r_squared.toFixed(2)} />
          <StatBox label="Correlation" value={stats.correlation.toFixed(2)} />
          <StatBox label="Upside Dev" value={(stats.upside_dev * 100).toFixed(2) + '%'} color="#3b82f6" />
          <StatBox label="Downside Dev" value={(stats.downside_dev * 100).toFixed(2) + '%'} color="#ef4444" />
          <StatBox label="Skewness" value={stats.skewness.toFixed(2)} />
          <StatBox label="Kurtosis" value={stats.kurtosis.toFixed(2)} />
        </div>
      )}

      <DataAuditModal 
        isOpen={isAuditOpen} 
        onClose={() => setIsAuditOpen(false)} 
        symbol={symbol} 
      />
    </div>
  );
};

const StatBox = ({ label, value, color = '#f8fafc' }) => (
  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '6px' }}>
    <div style={{ color: '#64748b', marginBottom: '4px', fontSize: '0.75rem', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ color: color, fontWeight: 'bold', fontSize: '1rem' }}>{value}</div>
  </div>
);

export default AnalyticsPanel;
