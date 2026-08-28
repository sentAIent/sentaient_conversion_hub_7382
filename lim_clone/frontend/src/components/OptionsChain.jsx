import React, { useState, useEffect } from 'react';
import VolatilitySurface3D from './VolatilitySurface3D';

const OptionsChain = ({ symbol }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('chain');

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/options-chain?symbol=${symbol}`)
      .then(res => res.json())
      .then(data => {
        setOptions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch options chain:", err);
        setLoading(false);
      });
  }, [symbol]);

  return (
    <div className="panel" style={{ marginTop: '16px', overflowY: 'auto', maxHeight: '550px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Options Chain & Skew Analytics</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setViewMode('chain')}
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: '4px',
              background: viewMode === 'chain' ? '#3b82f6' : '#1e293b',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            📋 Options Chain
          </button>
          <button 
            onClick={() => setViewMode('3d')}
            style={{
              padding: '6px 12px',
              fontSize: '0.8rem',
              borderRadius: '4px',
              background: viewMode === '3d' ? '#3b82f6' : '#1e293b',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            📊 3D Surface Skew
          </button>
        </div>
      </div>

      {viewMode === '3d' ? (
        <VolatilitySurface3D symbol={symbol} />
      ) : loading ? (
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading options data...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Contract</th>
              <th style={{ padding: '8px' }}>Type</th>
              <th style={{ padding: '8px' }}>Strike</th>
              <th style={{ padding: '8px' }}>Last Price</th>
              <th style={{ padding: '8px' }}>Implied Vol</th>
              <th style={{ padding: '8px', color: '#3b82f6' }}>Delta</th>
              <th style={{ padding: '8px', color: '#3b82f6' }}>Gamma</th>
              <th style={{ padding: '8px', color: '#3b82f6' }}>Theta</th>
              <th style={{ padding: '8px', color: '#3b82f6' }}>Vega</th>
              <th style={{ padding: '8px', color: '#3b82f6' }}>Rho</th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.contract_symbol}</td>
                <td style={{ padding: '8px', color: opt.option_type === 'call' ? '#10b981' : '#ef4444' }}>
                  {opt.option_type.toUpperCase()}
                </td>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>{opt.strike.toFixed(2)}</td>
                <td style={{ padding: '8px' }}>${opt.last_price.toFixed(2)}</td>
                <td style={{ padding: '8px' }}>{(opt.implied_volatility * 100).toFixed(1)}%</td>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.delta !== undefined ? opt.delta.toFixed(4) : '-'}</td>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.gamma !== undefined ? opt.gamma.toFixed(4) : '-'}</td>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.theta !== undefined ? opt.theta.toFixed(4) : '-'}</td>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.vega !== undefined ? opt.vega.toFixed(4) : '-'}</td>
                <td style={{ padding: '8px', color: '#e2e8f0' }}>{opt.rho !== undefined ? opt.rho.toFixed(4) : '-'}</td>
              </tr>
            ))}
            {options.length === 0 && (
              <tr>
                <td colSpan="10" style={{ padding: '12px', textAlign: 'center', color: '#64748b' }}>
                  No options data available for this symbol.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OptionsChain;
