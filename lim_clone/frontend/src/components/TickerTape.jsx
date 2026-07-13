import React, { useEffect, useState } from 'react';

const Sparkline = ({ history, isPositive }) => {
  if (!history || history.length === 0) return null;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const width = 40;
  const height = 15;
  
  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const color = isPositive ? '#10b981' : '#ef4444';

  return (
    <svg width={width} height={height} style={{ marginLeft: '4px' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

const TickerTape = ({ symbols }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      if (!symbols || symbols.length === 0) return;
      try {
        const query = symbols.join(',');
        const res = await fetch(`http://localhost:8080/api/quotes?symbols=${query}`);
        if (!res.ok) throw new Error("Failed to fetch quotes");
        const data = await res.json();
        setQuotes(data || []);
      } catch (err) {
        console.error("Ticker fetch error:", err);
      }
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [symbols]);

  // Duplicate the array for a seamless marquee loop
  const displayQuotes = [...quotes, ...quotes];

  if (quotes.length === 0) {
    return (
      <div className="ticker-wrap" style={{ justifyContent: 'center', color: '#64748b' }}>
        <span>Loading Market Data...</span>
      </div>
    );
  }

  const formatVol = (vol) => {
    if (vol > 1000000) return (vol / 1000000).toFixed(1) + 'M';
    if (vol > 1000) return (vol / 1000).toFixed(1) + 'K';
    return vol;
  };

  return (
    <div className="ticker-wrap">
      <div className="ticker-marquee">
        {displayQuotes.map((q, idx) => {
          const isPositive = q.change >= 0;
          return (
            <div key={`${q.symbol}-${idx}`} className="ticker-item">
              <span className="ticker-symbol">{q.symbol}</span>
              <span className="ticker-price">${q.price.toFixed(2)}</span>
              <span className={`ticker-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '▲' : '▼'} ${Math.abs(q.change).toFixed(2)} ({isPositive ? '+' : ''}{q.changePct.toFixed(2)}%)
              </span>
              <Sparkline history={q.history} isPositive={isPositive} />
              <span className="ticker-vol">Vol: {formatVol(q.volume)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickerTape;
