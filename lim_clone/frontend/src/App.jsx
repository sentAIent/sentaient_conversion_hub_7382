import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import AnalyticsPanel from './components/AnalyticsPanel';
import OptionsChain from './components/OptionsChain';
import TickerTape from './components/TickerTape';
import SettingsModal from './components/SettingsModal';
import PortfolioDashboard from './components/PortfolioDashboard';
import LoginScreen from './components/LoginScreen';
import SymbolSearch from './components/SymbolSearch';
import ResearchDashboard from './components/ResearchDashboard';

function App() {
  const chartContainerRef = useRef(null);
  const [query, setQuery] = useState('What happens to AAPL when it drops 5% over 10 days?');
  const [symbol, setSymbol] = useState('AAPL');
  const [isLivePaused, setIsLivePaused] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [simulationResult, setSimulationResult] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [paperBalance, setPaperBalance] = useState(0.00);
  const [activeView, setActiveView] = useState('terminal');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('sentaient_jwt');
  });

  // Deep Preferences State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customTickers, setCustomTickers] = useState(() => {
    const saved = localStorage.getItem('contango_tickers');
    return saved ? JSON.parse(saved) : ['SPY', 'QQQ', 'AAPL', 'MSFT', 'TSLA'];
  });

  useEffect(() => {
    localStorage.setItem('contango_tickers', JSON.stringify(customTickers));
  }, [customTickers]);

  useEffect(() => {
    // Initialize lightweight-charts with sleek dark mode styling
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    // Fetch initial historical data first (fallback or seed data)
    fetch(`http://127.0.0.1:8080/api/market-data?symbol=${symbol}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          candleSeries.setData(data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch initial market data:", err);
      });

    // Establish WebSocket for real-time live streaming from Alpaca
    const ws = new WebSocket(`ws://127.0.0.1:8080/ws/market-data`);
    ws.onmessage = (event) => {
      // Check if paused
      if (window.isLivePaused) return;
      
      try {
        const tick = JSON.parse(event.data);
        // Only update chart if tick matches our currently selected symbol
        if (tick.symbol === symbol) {
          candleSeries.update(tick);
        }
      } catch (err) {
        console.error("Failed to parse websocket tick", err);
      }
    };
    ws.onerror = (err) => {
      console.error("Market data websocket error", err);
    };

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ws.close();
      chart.remove();
    };
  }, [symbol]);

  // Fetch live account data from Go backend (Alpaca)
  const fetchAccountData = () => {
    fetch('http://127.0.0.1:8080/api/account')
      .then(res => res.json())
      .then(data => {
        if (data && data.equity !== undefined) {
          setAccountData(data);
          setPaperBalance(data.equity);
        }
      })
      .catch(err => {
        console.error("Failed to fetch Alpaca account data:", err);
      });
  };

  useEffect(() => {
    fetchAccountData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchAccountData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sync the React state to a global variable so the websocket callback can read the latest value
  // without needing to be re-bound on every pause toggle.
  useEffect(() => {
    window.isLivePaused = isLivePaused;
  }, [isLivePaused]);

  const handleQuery = async () => {
    setStatus('Executing query against XMIM Engine...');
    setSimulationResult(null);
    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) throw new Error('Query execution failed');
      const data = await response.json();
      
      setStatus('Query complete. Results displayed.');
      setSimulationResult(data.simulation_results);
    } catch (error) {
      console.error(error);
      setStatus('Error executing query. See console.');
    }
  };

  const executePaperTrade = async (type) => {
    setStatus(`Executing LIVE PAPER ${type} order for ${symbol}...`);
    try {
      const response = await fetch('http://127.0.0.1:8080/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: symbol,
          side: type, // "BUY" or "SELL"
          qty: "1"    // Default to 1 share for now
        })
      });
      
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Trade execution failed');
      }
      
      const data = await response.json();
      setStatus(`LIVE PAPER ${type} Filled! Order ID: ${data.id.substring(0,8)}...`);
      // Refresh balance immediately
      fetchAccountData();
    } catch (error) {
      console.error(error);
      setStatus(`Error executing trade: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : null}

      {/* Ticker Tape */}
      <TickerTape symbols={customTickers} />

      {/* Header */}
      <div className="panel header">
        {/* Left Side: Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/contango_quant_logo.png" alt="Contango Quant Logo" style={{ height: '36px', marginRight: '12px', objectFit: 'contain' }} />
          <span className="brand">Contango Quant</span>
          <span style={{ marginLeft: '12px', fontSize: '0.9rem', color: '#64748b' }}>// XMIM Engine</span>
        </div>
        
        {/* Right Side: All Buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          
          {/* Symbol Search */}
          <SymbolSearch currentSymbol={symbol} onSymbolChange={setSymbol} />

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '6px' }}>
            <button 
              onClick={() => setActiveView('terminal')}
              style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', background: activeView === 'terminal' ? '#3b82f6' : 'transparent', color: activeView === 'terminal' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Terminal
            </button>
            <button 
              onClick={() => setActiveView('portfolio')}
              style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', background: activeView === 'portfolio' ? '#3b82f6' : 'transparent', color: activeView === 'portfolio' ? '#fff' : '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Portfolio Dashboard
            </button>
          </div>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8' }}
          >
            ⚙️ Preferences
          </button>
          
          <button 
            onClick={() => setIsLivePaused(!isLivePaused)}
            style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', border: 'none', background: isLivePaused ? '#ef4444' : '#10b981', color: 'white' }}
          >
            {isLivePaused ? '▶ Resume Live Data' : '⏸ Pause Live Data'}
          </button>
        </div>
      </div>

      {activeView === 'portfolio' ? (
        <div className="portfolio-view">
          <PortfolioDashboard />
        </div>
      ) : activeView === 'research' ? (
        <div className="research-view" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px', padding: '0 16px' }}>
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '6px' }}>
              <button 
                onClick={() => setActiveView('terminal')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                NLP Sidebar
              </button>
              <button 
                onClick={() => setActiveView('research')}
                style={{ padding: '4px 12px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Research Hub
              </button>
            </div>
          </div>
          <ResearchDashboard symbol={symbol} />
        </div>
      ) : (
        <>
          {/* Sidebar: NLP Engine */}
          <div className="panel sidebar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3>Natural Language Engine</h3>
              <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.2)', padding: '2px', borderRadius: '6px' }}>
                <button 
                  onClick={() => setActiveView('terminal')}
                  style={{ padding: '2px 8px', borderRadius: '4px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  NLP
                </button>
                <button 
                  onClick={() => setActiveView('research')}
                  style={{ padding: '2px 8px', borderRadius: '4px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  Hub
                </button>
              </div>
            </div>
            <textarea 
              className="query-box" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter natural language query..."
            />
            <button className="btn-primary" onClick={handleQuery}>
              Execute Analysis
            </button>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '0.8rem' }}>Engine Status</h3>
              <p style={{ color: status.includes('Executing') ? '#3b82f6' : status.includes('Error') ? '#ef4444' : '#10b981', fontSize: '0.85rem', marginBottom: '16px' }}>
                {status}
              </p>

              {simulationResult && (
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div style={{ marginBottom: '8px', color: '#3b82f6' }}><strong>Backtest Results:</strong></div>
                  <div><strong>Symbol:</strong> {simulationResult.Symbol}</div>
                  <div><strong>Win Rate:</strong> {(simulationResult.WinRate * 100).toFixed(1)}%</div>
                  <div><strong>Total Trades:</strong> {simulationResult.TotalTrades}</div>
                  <div><strong>Net Return:</strong> {(simulationResult.NetReturn * 100).toFixed(2)}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Main Chart Area & Right Panels */}
          <div className="panel chart-area" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'transparent' }}>
            <div className="chart-container" ref={chartContainerRef} style={{ background: '#1e293b', borderRadius: '8px', minHeight: '400px' }}></div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <AnalyticsPanel symbol={symbol} />
              <OptionsChain symbol={symbol} />
            </div>
          </div>

          {/* Bottom Panel: Execution / OMS */}
          <div className="panel bottom-panel">
            <h3>Order Management System</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
              <div><strong>Account:</strong> {accountData ? `ALPACA-${accountData.id.substring(0,8)}` : 'DISCONNECTED'}</div>
              <div>
                <strong>Balance:</strong> 
                <span style={{ color: paperBalance >= 100000 ? '#10b981' : '#e2e8f0', marginLeft: '6px' }}>
                  ${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div><strong>Status:</strong> {accountData ? accountData.status : 'N/A'}</div>
              
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => executePaperTrade('BUY')}
                  style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid #10b981', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                  BUY MKT
                </button>
                <button 
                  onClick={() => executePaperTrade('SELL')}
                  style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                  SELL MKT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        customTickers={customTickers}
        setCustomTickers={setCustomTickers}
      />
      
    </div>
  );
}

export default App;
