import React, { useState, useEffect } from 'react';

const SymbolSearch = ({ currentSymbol, onSymbolChange }) => {
  const [inputValue, setInputValue] = useState(currentSymbol || '');

  useEffect(() => {
    setInputValue(currentSymbol);
  }, [currentSymbol]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSymbolChange(inputValue.trim().toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <span style={{ color: '#94a3b8', marginRight: '6px', fontSize: '0.85rem' }}>🔍</span>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => setInputValue(currentSymbol)} // Reset if they click away without submitting
        placeholder="Ticker..."
        style={{
          background: 'transparent',
          border: 'none',
          color: '#f8fafc',
          outline: 'none',
          width: '80px',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          fontWeight: '600'
        }}
      />
    </form>
  );
};

export default SymbolSearch;
