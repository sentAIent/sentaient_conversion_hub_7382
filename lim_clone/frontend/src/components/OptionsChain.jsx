import React, { useState, useEffect } from 'react';

const OptionsChain = ({ symbol }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/options-chain?symbol=${symbol}`)
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
    <div className="panel" style={{ marginTop: '16px', overflowY: 'auto', maxHeight: '400px' }}>
      <h3 style={{ marginBottom: '12px' }}>Live Options Chain (Calls & Puts)</h3>

      {loading ? (
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
