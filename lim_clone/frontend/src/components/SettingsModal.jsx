import React, { useState, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, customTickers, setCustomTickers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Debounced Search Effect
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults(null);
      setError('');
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:8080/api/search-asset?q=${searchQuery}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Ticker not found or invalid.");
          throw new Error("Search failed.");
        }
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        setSearchResults(null);
        setError(err.message);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleAdd = () => {
    if (searchResults && searchResults.symbol) {
      if (!customTickers.includes(searchResults.symbol)) {
        const updated = [...customTickers, searchResults.symbol];
        setCustomTickers(updated);
        setSearchQuery('');
        setSearchResults(null);
      } else {
        setError('Ticker already in list.');
      }
    }
  };

  const handleRemove = (symbolToRemove) => {
    const updated = customTickers.filter(s => s !== symbolToRemove);
    setCustomTickers(updated);
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#f8fafc' }}>Deep Preferences</h2>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>Your Monitored Assets</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {customTickers.map(sym => (
              <div key={sym} style={pillStyle}>
                {sym}
                <button onClick={() => handleRemove(sym)} style={removeBtnStyle}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>Exact Ticker Lookup</h3>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '12px' }}>
            Look up any supported asset to add to your live ticker tape.
          </p>
          <input 
            type="text" 
            placeholder="Search by exact symbol (e.g., TSLA, NVDA)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
            style={inputStyle}
          />
          
          <div style={{ marginTop: '16px', minHeight: '100px' }}>
            {isSearching && <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Searching market data...</div>}
            
            {error && <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</div>}
            
            {searchResults && !isSearching && !error && (
              <div style={resultCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc' }}>{searchResults.symbol}</h4>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{searchResults.name}</div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <span style={badgeStyle}>{searchResults.exchange}</span>
                      <span style={badgeStyle}>{searchResults.class}</span>
                      {searchResults.tradable && <span style={{...badgeStyle, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)'}}>Tradable</span>}
                    </div>
                  </div>
                  <button onClick={handleAdd} style={addBtnStyle}>Add to Tape</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(4px)',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalStyle = {
  background: '#1e293b',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '24px',
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
};

const closeBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#94a3b8',
  cursor: 'pointer',
  fontSize: '1.2rem'
};

const pillStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'rgba(59, 130, 246, 0.1)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  color: '#60a5fa',
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '0.85rem',
  fontWeight: 600
};

const removeBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#60a5fa',
  cursor: 'pointer',
  padding: '0',
  fontSize: '1.1rem',
  lineHeight: '1'
};

const inputStyle = {
  width: '100%',
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '6px',
  padding: '10px 14px',
  color: '#f8fafc',
  fontSize: '0.9rem',
  boxSizing: 'border-box'
};

const resultCardStyle = {
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  padding: '16px'
};

const badgeStyle = {
  fontSize: '0.7rem',
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '2px 6px',
  borderRadius: '4px',
  color: '#cbd5e1'
};

const addBtnStyle = {
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 500
};

export default SettingsModal;
