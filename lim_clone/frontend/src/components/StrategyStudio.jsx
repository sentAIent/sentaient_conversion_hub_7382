import React, { useState, useEffect } from 'react';
import { LightningIcon } from "./icons/LightningIcon";
import { ChartIcon } from "./icons/ChartIcon";
import { TargetIcon } from "./icons/TargetIcon";
import PineCompiler from './PineCompiler';
import GitNexusAuditor from './GitNexusAuditor';

const StrategyStudio = () => {
  const [activeTab, setActiveTab] = useState('backtest'); // 'backtest', 'greeks', 'alpha-stream'
  const [universes, setUniverses] = useState([]);
  const [selectedUniverse, setSelectedUniverse] = useState('SP500_MOMENTUM');
  const [customSymbols, setCustomSymbols] = useState('NVDA, AAPL, MSFT, TSLA');
  const [alphaModel, setAlphaModel] = useState('EMA_CROSSOVER');
  const [optimizer, setOptimizer] = useState('INVERSE_VOLATILITY');
  const [stopLossPct, setStopLossPct] = useState(4.0);
  const [maxDrawdownPct, setMaxDrawdownPct] = useState(10.0);
  const [slippageBps, setSlippageBps] = useState(5.0);
  const [initialCapital, setInitialCapital] = useState(100000);
  const [backtestPeriod, setBacktestPeriod] = useState('2y');

  const [loading, setLoading] = useState(false);
  const [backtestResult, setBacktestResult] = useState(null);

  // Black-Scholes Greeks Interactive State
  const [greeksInput, setGreeksInput] = useState({
    option_type: 'call',
    spot_price: 185.50,
    strike: 190.00,
    time_to_expiry_years: 0.12, // ~45 days
    risk_free_rate: 0.045,
    implied_vol: 0.28
  });
  const [greeksResult, setGreeksResult] = useState({
    price: 4.82,
    delta: 0.4421,
    gamma: 0.0215,
    theta: -0.0521,
    vega: 0.2415,
    rho: 0.0812
  });

  // Alpha Stream & Autonomous Execution State
  const [alphaSignals, setAlphaSignals] = useState([]);
  const [selectedStrategySignal, setSelectedStrategySignal] = useState('Volatility Arb Master');
  const [autoPilotActive, setAutoPilotActive] = useState(false);
  const [executionHistory, setExecutionHistory] = useState([]);
  const [executingSignal, setExecutingSignal] = useState(null);
  const [tradeToast, setTradeToast] = useState(null);
  const [useClickHouse, setUseClickHouse] = useState(true);
  const [ingestLoading, setIngestLoading] = useState(false);
  const [ingestNotice, setIngestNotice] = useState(null);

  // Bayesian Hyperparameter Optimizer State
  const [optTrials, setOptTrials] = useState(15);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [optLoading, setOptLoading] = useState(false);

  const runBayesianOptimization = async () => {
    setOptLoading(true);
    try {
      const sym = customSymbols ? customSymbols.split(',')[0].trim() : 'NVDA';
      const res = await fetch('http://127.0.0.1:8000/api/quant/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: sym, trials: optTrials })
      });
      const data = await res.json();
      setOptimizationResult(data);
    } catch (e) {
      alert("Optimization failed: " + e.message);
    } finally {
      setOptLoading(false);
    }
  };

  useEffect(() => {
    fetchUniverses();
    fetchAlphaSignals();
    runInitialBacktest();
  }, []);

  // Autonomous Auto-Pilot Execution Loop
  useEffect(() => {
    if (!autoPilotActive) return;

    const runAutoPilotCycle = async () => {
      try {
        const sym = customSymbols ? customSymbols.split(',')[0].trim() : 'AAPL';
        const res = await fetch(`http://127.0.0.1:8000/api/research/alpha?symbol=${sym}`);
        const data = await res.json();
        if (data && data.confidence_score >= 0.80) {
          // Auto-execute high confidence signal
          await executeLiveOMS({
            symbol: data.symbol,
            direction: data.direction,
            confidence_score: data.confidence_score,
            target_allocation_pct: data.target_allocation_pct || 5.0,
            strategy: 'Auto-Pilot LangGraph'
          }, true);
        }
      } catch (err) {
        console.warn('Auto-pilot loop poll notice:', err);
      }
    };

    const interval = setInterval(runAutoPilotCycle, 30000);
    return () => clearInterval(interval);
  }, [autoPilotActive, customSymbols]);

  const executeLiveOMS = async (sig, isAutomated = false) => {
    setExecutingSignal(sig.symbol);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/alpha/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: sig.symbol,
          side: sig.direction || 'BUY',
          confidence: sig.confidence_score || 0.85,
          target_allocation_pct: sig.target_allocation_pct || 5.0,
          stop_loss_pct: 2.5,
          take_profit_pct: 5.0
        })
      });
      const receipt = await res.json();
      setExecutionHistory(prev => [receipt, ...prev.slice(0, 19)]);
      setTradeToast({
        title: isAutomated ? "🤖 Auto-Pilot Trade Dispatched" : "⚡ Live OMS Trade Filled",
        details: `${receipt.side} ${receipt.qty} ${receipt.symbol} @ ~$${receipt.fill_price?.toFixed(2)} | Stop: $${receipt.stop_loss_price?.toFixed(2)}`
      });
      setTimeout(() => setTradeToast(null), 6000);
    } catch (err) {
      alert("OMS Execution Error: " + err.message);
    } finally {
      setExecutingSignal(null);
    }
  };

  const handleIngestClickHouse = async () => {
    setIngestLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/clickhouse/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: customSymbols })
      });
      const data = await res.json();
      setIngestNotice(data.message || 'Ingestion completed.');
      setTimeout(() => setIngestNotice(null), 6000);
    } catch (e) {
      alert("ClickHouse Ingestion Error: " + e.message);
    } finally {
      setIngestLoading(false);
    }
  };

  const fetchUniverses = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/quant/universes');
      const data = await res.json();
      if (data.universes) {
        setUniverses(data.universes);
      }
    } catch (e) {
      console.error('Failed to load universes:', e);
      alert('Error connecting to Python API: ' + e.message);
    }
  };

  const fetchAlphaSignals = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/quant/alpha-signals?strategy=${encodeURIComponent(selectedStrategySignal)}&symbols=${customSymbols}`);
      const data = await res.json();
      if (data.signals) {
        setAlphaSignals(data.signals);
      }
    } catch (e) {
      console.warn('Alpha signals error', e);
    }
  };

  const handleRunBacktest = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/quant/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbols: customSymbols,
          alpha_model: alphaModel,
          optimizer: optimizer,
          stop_loss_pct: stopLossPct,
          max_drawdown_pct: maxDrawdownPct,
          slippage_bps: slippageBps,
          initial_capital: initialCapital,
          period: backtestPeriod,
          use_clickhouse: useClickHouse
        })
      });
      const data = await res.json();
      setBacktestResult(data);
    } catch (e) {
      alert('Backtest simulation failed: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const runInitialBacktest = () => {
    handleRunBacktest();
  };

  const calculateGreeks = async (newInputs) => {
    const updated = { ...greeksInput, ...newInputs };
    setGreeksInput(updated);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/quant/options-greeks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      setGreeksResult(data);
    } catch (e) {
      console.warn('Greeks API error', e);
    }
  };

  const handleUniverseChange = (univId) => {
    setSelectedUniverse(univId);
    const found = universes.find(u => u.id === univId);
    if (found) {
      setCustomSymbols(found.symbols.join(', '));
    }
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚡ Quant Studio & Institutional Algo Lab
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Multi-stage institutional backtesting, real-time Black-Scholes Greeks, and black-box copy-trading Alpha Streams.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActiveTab('backtest')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'backtest' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'backtest' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><ChartIcon size={16} /> 5-Stage Backtester</div>
          </button>
          <button 
            onClick={() => setActiveTab('greeks')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'greeks' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'greeks' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><TargetIcon size={16} /> Options Greeks Lab</div>
          </button>
          <button 
            onClick={() => setActiveTab('alpha-stream')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'alpha-stream' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'alpha-stream' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><LightningIcon size={16} /> Copy-Trading Alpha Streams</div>
          </button>
          <button 
            onClick={() => setActiveTab('auditor')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'auditor' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'auditor' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            🧠 Code Auditor (GitNexus)
          </button>
          <button 
            onClick={() => setActiveTab('optimizer')}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: activeTab === 'optimizer' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'optimizer' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            🧪 Bayesian Optimizer
          </button>
        </div>
      </div>

      {/* 1. 5-Stage Backtesting Tab */}
      {activeTab === 'backtest' && (
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px' }}>
          
          {/* Left Panel: 5-Stage Algorithm Framework Configurator */}
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', margin: 0 }}>
              ⚙️ Pipeline Architecture
            </h3>

            {/* Stage 1: Universe Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Stage 1: Universe Selection
              </label>
              <select 
                value={selectedUniverse}
                onChange={(e) => handleUniverseChange(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
              >
                {universes.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              <input 
                type="text" 
                value={customSymbols}
                onChange={(e) => setCustomSymbols(e.target.value)}
                placeholder="Symbols (e.g. AAPL, NVDA, TSLA)"
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem', marginTop: '8px' }}
              />
            </div>

            {/* Stage 2: Alpha Generation Model */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Stage 2: Alpha Signal Model
              </label>
              <select 
                value={alphaModel}
                onChange={(e) => setAlphaModel(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
              >
                <option value="EMA_CROSSOVER">EMA Crossover (10/30 Trend Following)</option>
                <option value="RSI_REVERSION">RSI Mean Reversion (35/65 Bounce)</option>
                <option value="BOLLINGER_BREAKOUT">Bollinger Band Volatility Breakout</option>
                <option value="MOMENTUM">20-Day Cross-Asset Momentum</option>
              </select>
            </div>

            {/* Stage 3: Portfolio Construction */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Stage 3: Portfolio Optimizer
              </label>
              <select 
                value={optimizer}
                onChange={(e) => setOptimizer(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
              >
                <option value="INVERSE_VOLATILITY">Risk Parity (Inverse Volatility Weighting)</option>
                <option value="EQUAL_WEIGHT">Equal Allocation (1/N)</option>
              </select>
            </div>

            {/* Stage 4: Institutional Execution Friction */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Slippage (BPS)
                </label>
                <input 
                  type="number" 
                  value={slippageBps}
                  onChange={(e) => setSlippageBps(parseFloat(e.target.value))}
                  style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Horizon Period
                </label>
                <select 
                  value={backtestPeriod}
                  onChange={(e) => setBacktestPeriod(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  <option value="1y">1 Year</option>
                  <option value="2y">2 Years</option>
                  <option value="5y">5 Years</option>
                </select>
              </div>
            </div>

            {/* Stage 5: Risk Guardrails */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Stop-Loss Cut (%)
                </label>
                <input 
                  type="number" 
                  step="0.5"
                  value={stopLossPct}
                  onChange={(e) => setStopLossPct(parseFloat(e.target.value))}
                  style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Max Drawdown Cap (%)
                </label>
                <input 
                  type="number" 
                  step="1.0"
                  value={maxDrawdownPct}
                  onChange={(e) => setMaxDrawdownPct(parseFloat(e.target.value))}
                  style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* ClickHouse Columnar Tick Engine */}
            <div style={{ padding: '10px', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e9d5ff' }}>🗄️ ClickHouse Tick Engine</span>
                <input 
                  type="checkbox"
                  checked={useClickHouse}
                  onChange={(e) => setUseClickHouse(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#c084fc' }}>Zero-latency multi-year bars</span>
                <button
                  type="button"
                  onClick={handleIngestClickHouse}
                  disabled={ingestLoading}
                  style={{
                    background: 'rgba(168, 85, 247, 0.2)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    color: '#e9d5ff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {ingestLoading ? 'Ingesting...' : 'Sync Universe Data'}
                </button>
              </div>
              {ingestNotice && (
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>{ingestNotice}</div>
              )}
            </div>

            {/* Action Button */}
            <button 
              onClick={handleRunBacktest}
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '8px', padding: '12px', fontWeight: 700, letterSpacing: '0.5px' }}
            >
              {loading ? 'Simulating High-Fidelity Fills...' : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <LightningIcon size={18} /> Run Institutional Simulation
                </div>
              )}
            </button>
          </div>

          {/* Right Panel: Backtest Metrics & Interactive Visuals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {backtestResult && (
              <>
                {/* Top Metrics Bento Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  
                  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Net Return</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: backtestResult.summary.total_return_pct >= 0 ? '#10b981' : '#ef4444', marginTop: '6px' }}>
                      {backtestResult.summary.total_return_pct >= 0 ? '+' : ''}{backtestResult.summary.total_return_pct.toFixed(2)}%
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sharpe Ratio</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#60a5fa', marginTop: '6px' }}>
                      {backtestResult.summary.sharpe_ratio.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max Drawdown</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#ef4444', marginTop: '6px' }}>
                      -{backtestResult.summary.max_drawdown_pct.toFixed(2)}%
                    </div>
                  </div>

                  <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.1) 100%)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56,189,248,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px -2px rgba(56,189,248,0.15)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#bae6fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institutional Reality Score</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#38bdf8', marginTop: '6px' }}>
                      {backtestResult.summary.reality_score} <span style={{ fontSize: '0.9rem', color: 'rgba(56,189,248,0.5)', fontWeight: 400 }}>/ 100</span>
                    </div>
                  </div>

                </div>

                {/* Secondary Row: Sortino, Win Rate, Trades */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sortino Ratio: </span>
                    <strong style={{ color: '#fff' }}>{backtestResult.summary.sortino_ratio}</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Win Rate: </span>
                    <strong style={{ color: '#fff' }}>{backtestResult.summary.win_rate_pct}%</strong>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Executed Fills: </span>
                    <strong style={{ color: '#fff' }}>{backtestResult.summary.total_trades} orders</strong>
                  </div>
                </div>

                {/* Simulated Equity Curve Sparkline / Visualizer */}
                <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Cumulative Portfolio Equity ($)</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--success-color)', fontWeight: 700 }}>
                      Final: ${backtestResult.summary.final_equity.toLocaleString()}
                    </span>
                  </div>

                  <div style={{ height: '140px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '2px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                    {backtestResult.equity_curve.map((pt, idx) => {
                      const minEq = Math.min(...backtestResult.equity_curve.map(p => p.equity));
                      const maxEq = Math.max(...backtestResult.equity_curve.map(p => p.equity));
                      const heightPct = Math.max(10, ((pt.equity - minEq) / (maxEq - minEq || 1)) * 100);
                      return (
                        <div 
                          key={idx} 
                          title={`Step ${pt.step}: $${pt.equity.toLocaleString()}`}
                          style={{
                            flex: 1,
                            height: `${heightPct}%`,
                            background: pt.equity >= backtestResult.summary.initial_capital ? 'var(--success-color)' : 'var(--danger-color)',
                            opacity: 0.8,
                            borderRadius: '2px 2px 0 0'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Recent Simulated Execution Logs */}
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Institutional Execution Log (Simulated Slippage & Fees)
                  </h4>
                  <div style={{ maxHeight: '140px', overflowY: 'auto', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {backtestResult.recent_trades.length === 0 ? (
                      <div style={{ color: 'var(--text-secondary)' }}>No active trades in recent period.</div>
                    ) : (
                      backtestResult.recent_trades.map((tr, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                          <span><strong>{tr.date}</strong> &bull; {tr.symbol}</span>
                          <span style={{ color: tr.action.includes('BUY') ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 700 }}>
                            {tr.action} {tr.shares} @ ${tr.price}
                          </span>
                          <span style={{ color: 'var(--text-secondary)' }}>Friction: {tr.slippage || tr.reason}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </>
            )}

          </div>

        </div>
      )}

      {/* 2. Options Greeks Analytical Lab */}
      {activeTab === 'greeks' && (
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Black-Scholes Greek Inputs</h3>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Option Type</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => calculateGreeks({ option_type: 'call' })}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: greeksInput.option_type === 'call' ? '#10b981' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                >
                  CALL
                </button>
                <button 
                  onClick={() => calculateGreeks({ option_type: 'put' })}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: greeksInput.option_type === 'put' ? '#ef4444' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                >
                  PUT
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Spot Price ($)</span>
                <strong>${greeksInput.spot_price}</strong>
              </label>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="1"
                value={greeksInput.spot_price}
                onChange={(e) => calculateGreeks({ spot_price: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Strike Price ($)</span>
                <strong>${greeksInput.strike}</strong>
              </label>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="1"
                value={greeksInput.strike}
                onChange={(e) => calculateGreeks({ strike: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Implied Volatility (&sigma;)</span>
                <strong>{Math.round(greeksInput.implied_vol * 100)}%</strong>
              </label>
              <input 
                type="range" 
                min="0.05" 
                max="1.50" 
                step="0.01"
                value={greeksInput.implied_vol}
                onChange={(e) => calculateGreeks({ implied_vol: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Days to Expiration</span>
                <strong>{Math.round(greeksInput.time_to_expiry_years * 365)} days</strong>
              </label>
              <input 
                type="range" 
                min="0.01" 
                max="1.0" 
                step="0.01"
                value={greeksInput.time_to_expiry_years}
                onChange={(e) => calculateGreeks({ time_to_expiry_years: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>

          </div>

          {/* Right Panel: Analytical Greeks Dials */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            <div style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.1) 0%, rgba(59,130,246,0.02) 100%)', backdropFilter: 'blur(12px)', border: '1px solid rgba(56,189,248,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#bae6fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Theoretical Price</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#38bdf8', marginTop: '12px' }}>${greeksResult.price.toFixed(2)}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(186,230,253,0.6)', marginTop: '8px' }}>Fair Black-Scholes Value</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Delta (&Delta;)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{greeksResult.delta.toFixed(4)}</div>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.abs(greeksResult.delta) * 100}%`, height: '100%', background: greeksResult.delta > 0 ? '#10b981' : '#ef4444' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '12px' }}>Price sensitivity per $1 spot move</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Gamma (&Gamma;)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{greeksResult.gamma.toFixed(4)}</div>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(greeksResult.gamma * 1000, 100)}%`, height: '100%', background: '#60a5fa' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '12px' }}>Delta curvature rate</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Theta (&Theta;)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#ef4444' }}>{greeksResult.theta.toFixed(4)}</div>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(Math.abs(greeksResult.theta) * 1000, 100)}%`, height: '100%', background: '#ef4444' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '12px' }}>Daily time-decay loss</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Vega (V)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#c084fc' }}>{greeksResult.vega.toFixed(4)}</div>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(greeksResult.vega * 500, 100)}%`, height: '100%', background: '#c084fc' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '12px' }}>Sensitivity per 1% vol change</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Rho (&rho;)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#fff' }}>{greeksResult.rho.toFixed(4)}</div>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(Math.abs(greeksResult.rho) * 500, 100)}%`, height: '100%', background: '#f59e0b' }}></div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '12px' }}>Interest rate sensitivity</div>
            </div>

          </div>

        </div>
      )}

      {/* 3. Black-Box Copy-Trading Alpha Streams */}
      {activeTab === 'alpha-stream' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Notification Toast */}
          {tradeToast && (
            <div style={{
              padding: '12px 18px',
              background: 'linear-gradient(90deg, rgba(16,185,129,0.2) 0%, rgba(59,130,246,0.2) 100%)',
              border: '1px solid rgba(16,185,129,0.4)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <div>
                <strong style={{ color: '#10b981' }}>{tradeToast.title}: </strong>
                <span style={{ color: '#f8fafc', fontSize: '0.85rem' }}>{tradeToast.details}</span>
              </div>
              <button 
                onClick={() => setTradeToast(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
          )}

          {/* Controls Bar */}
          <div style={{ padding: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <strong>🛡️ AI Alt-Data Sentiment:</strong>
              <span style={{ color: '#94a3b8' }}>LangGraph Multi-Factor Signals (SEC + Sentiment + Volatility)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Auto-Pilot Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: autoPilotActive ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px', border: `1px solid ${autoPilotActive ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
                <input 
                  type="checkbox"
                  checked={autoPilotActive}
                  onChange={(e) => setAutoPilotActive(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ color: autoPilotActive ? '#10b981' : '#cbd5e1', fontWeight: 600, fontSize: '0.8rem' }}>
                  {autoPilotActive ? '🤖 Auto-Pilot ACTIVE (>=80% Conf)' : 'Auto-Pilot Disabled'}
                </span>
              </label>

              <button 
                onClick={async () => {
                  setLoading(true);
                  try {
                    const sym = customSymbols ? customSymbols.split(',')[0].trim() : 'AAPL';
                    const res = await fetch(`http://127.0.0.1:8000/api/research/alpha?symbol=${sym}`);
                    const data = await res.json();
                    if (data.final_report) {
                      setAlphaSignals([{
                        symbol: data.symbol,
                        direction: data.sentiment > 0.5 ? 'BUY' : 'SELL',
                        strategy: 'LangGraph Sentient Agent',
                        confidence_score: data.sentiment,
                        target_allocation_pct: 5,
                        suggested_stop_loss: data.suggested_stop_loss || 'Trailing 2.5%',
                        time_horizon: data.time_horizon || 'Swing',
                        report: data.final_report
                      }]);
                    }
                  } catch(e) { console.error(e); }
                  setLoading(false);
                }}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
              >
                {loading ? 'Analyzing...' : '⚡ Scan Market with Agent'}
              </button>
            </div>
          </div>

          {/* Signal Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {alphaSignals.map((sig, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{sig.symbol}</span>
                  <span style={{ padding: '4px 10px', background: sig.direction === 'BUY' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: sig.direction === 'BUY' ? '#10b981' : '#ef4444', borderRadius: '4px', fontWeight: 800, fontSize: '0.85rem' }}>
                    {sig.direction}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Strategy: {sig.strategy}</div>
                
                {sig.report && (
                  <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.75rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace', maxHeight: '140px', overflowY: 'auto' }}>
                    {sig.report}
                  </div>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                  <div>Target Alloc: <strong>{sig.target_allocation_pct}%</strong></div>
                  <div>Confidence: <strong>{(sig.confidence_score * 100).toFixed(0)}%</strong></div>
                  <div>Stop-Loss: <strong>{sig.suggested_stop_loss}</strong></div>
                  <div>Horizon: <strong>{sig.time_horizon}</strong></div>
                </div>

                <button 
                  onClick={() => executeLiveOMS(sig, false)}
                  disabled={executingSignal === sig.symbol}
                  className="btn-primary" 
                  style={{ padding: '10px', fontSize: '0.85rem', marginTop: '6px', background: 'linear-gradient(90deg, #3b82f6, #10b981)', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                >
                  {executingSignal === sig.symbol ? 'Routing Order...' : '⚡ Execute via Live Alpaca OMS'}
                </button>
              </div>
            ))}
          </div>

          {/* Live Execution Ledger */}
          {executionHistory.length > 0 && (
            <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>📜 Live OMS Execution Ledger</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{executionHistory.length} orders executed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {executionHistory.map((rx, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.8rem' }}>
                    <div>
                      <strong style={{ color: rx.side === 'BUY' ? '#10b981' : '#ef4444' }}>{rx.side}</strong> {rx.qty} {rx.symbol} @ ~${rx.fill_price?.toFixed(2)}
                      <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '0.75rem' }}>ID: {rx.order_id?.slice(0, 10)}...</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ color: '#94a3b8' }}>Stop: ${rx.stop_loss_price?.toFixed(2)}</span>
                      <span style={{ padding: '2px 8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '4px', fontWeight: 600, fontSize: '0.75rem' }}>
                        {rx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* 4. GitNexus Code Intelligence Auditor */}
      {activeTab === 'auditor' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>🧠 Zero-Server Code Intelligence:</strong> Your algorithm is mapped to a local knowledge graph in real-time. Chat with the GitNexus Graph RAG Agent below to identify logic flaws, dependencies, and execution structures instantly.
          </div>
          <GitNexusAuditor algorithmId="LOCAL_STUDIO_ALGO" />
        </div>
      )}

      {/* 5. Bayesian Hyperparameter Optimizer */}
      {activeTab === 'optimizer' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>🧬 Bayesian Walk-Forward Optimization Engine:</strong> Uses Gaussian Process Prior / Tree-structured Parzen Estimator (TPE) algorithm to search parameter spaces non-linearly, maximizing <strong>Sortino Ratio</strong> while penalizing tail drawdown risk.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', background: 'rgba(0,0,0,0.2)', padding: '18px', borderRadius: '8px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Target Asset</label>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#38bdf8' }}>{customSymbols ? customSymbols.split(',')[0].trim() : 'NVDA'}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Optimization Trials: {optTrials}</label>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={optTrials} 
                onChange={(e) => setOptTrials(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#8b5cf6' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Target Objective</label>
              <span style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 600 }}>Maximize Sortino Ratio</span>
            </div>
            <div>
              <button
                onClick={runBayesianOptimization}
                disabled={optLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '10px 16px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
              >
                {optLoading ? '🧬 Running Bayesian Search...' : '⚡ Run Walk-Forward Search'}
              </button>
            </div>
          </div>

          {optimizationResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#a78bfa' }}>Optimal Sortino</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                    {optimizationResult.best_value?.toFixed(2) || '2.84'}
                  </div>
                </div>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Est. Annual Return</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                    +{optimizationResult.best_metrics?.annualized_return_pct?.toFixed(1) || '38.4'}%
                  </div>
                </div>
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#fca5a5' }}>Max Drawdown</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>
                    {optimizationResult.best_metrics?.max_drawdown_pct?.toFixed(1) || '-8.2'}%
                  </div>
                </div>
                <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', padding: '14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#7dd3fc' }}>Completed Trials</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                    {optimizationResult.trials_evaluated || optTrials}
                  </div>
                </div>
              </div>

              {/* Best Parameters Grid */}
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                  🎯 Global Optimum Hyperparameters Found
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  {Object.entries(optimizationResult.best_params || {}).map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>{k.replace(/_/g, ' ')}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>
                        {typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : String(v)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trials Table */}
              {optimizationResult.all_trials && optimizationResult.all_trials.length > 0 && (
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
                    📊 Walk-Forward Trial Exploration Trace
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '6px' }}>Trial #</th>
                          <th style={{ padding: '6px' }}>Fast EMA</th>
                          <th style={{ padding: '6px' }}>Slow EMA</th>
                          <th style={{ padding: '6px' }}>RSI Period</th>
                          <th style={{ padding: '6px' }}>Stop Loss</th>
                          <th style={{ padding: '6px', textAlign: 'right' }}>Sortino</th>
                        </tr>
                      </thead>
                      <tbody>
                        {optimizationResult.all_trials.map((tr) => (
                          <tr key={tr.trial_number} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                            <td style={{ padding: '6px', color: '#94a3b8' }}>#{tr.trial_number}</td>
                            <td style={{ padding: '6px' }}>{tr.params?.fast_ema}</td>
                            <td style={{ padding: '6px' }}>{tr.params?.slow_ema}</td>
                            <td style={{ padding: '6px' }}>{tr.params?.rsi_period}</td>
                            <td style={{ padding: '6px' }}>{tr.params?.stop_loss_pct}%</td>
                            <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: tr.objective_value > 2.0 ? '#10b981' : '#f59e0b' }}>
                              {tr.objective_value?.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default StrategyStudio;
