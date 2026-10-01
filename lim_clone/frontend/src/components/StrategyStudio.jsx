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

  // Alpha Stream Signals State
  const [alphaSignals, setAlphaSignals] = useState([]);
  const [selectedStrategySignal, setSelectedStrategySignal] = useState('Volatility Arb Master');

  useEffect(() => {
    fetchUniverses();
    fetchAlphaSignals();
    runInitialBacktest();
  }, []);

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
          period: backtestPeriod
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

            {/* Action Button */}
            <button 
              onClick={handleRunBacktest}
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: '8px', padding: '12px', fontWeight: 700, letterSpacing: '0.5px' }}
            >
              {loading ? 'Simulating High-Fidelity Fills...' : '<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><LightningIcon size={18} /> Run Institutional Simulation</div>'}
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
          
          <div style={{ padding: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>🛡️ AI Alt-Data Sentiment Active:</strong> LangGraph Agent is monitoring market sentiment natively via Reddit & SEC filings.
            </div>
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
                      suggested_stop_loss: 'Trailing 2.5%',
                      time_horizon: 'Swing',
                      report: data.final_report
                    }]);
                  }
                } catch(e) { console.error(e); }
                setLoading(false);
              }}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
            >
              {loading ? 'Analyzing...' : 'Run Agent Scan'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
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
                  <div style={{ padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.75rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
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
                  onClick={() => alert(`Live OMS Execution queued for ${sig.symbol} (${sig.direction})!`)}
                  className="btn-primary" 
                  style={{ padding: '10px', fontSize: '0.85rem', marginTop: '6px', background: 'linear-gradient(90deg, #3b82f6, #10b981)', border: 'none' }}
                >
                  ⚡ Execute via Live Alpaca OMS
                </button>
              </div>
            ))}
          </div>

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

    </div>
  );
};

export default StrategyStudio;
