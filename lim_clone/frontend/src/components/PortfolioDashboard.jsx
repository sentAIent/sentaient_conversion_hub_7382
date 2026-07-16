import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const mockPositions = [
  { symbol: 'AAPL', qty: 150, avgPrice: 165.20, currentPrice: 172.50, pnl: 1095.00 },
  { symbol: 'MSFT', qty: 100, avgPrice: 320.10, currentPrice: 335.20, pnl: 1510.00 },
  { symbol: 'TSLA', qty: 50, avgPrice: 240.00, currentPrice: 225.50, pnl: -725.00 },
  { symbol: 'SPY', qty: 200, avgPrice: 420.50, currentPrice: 440.10, pnl: 3920.00 }
];

const mockAllocation = mockPositions.map(p => ({
  name: p.symbol,
  value: p.qty * p.currentPrice
}));

const mockPerformance = [
  { date: '2023-01', value: 100000 },
  { date: '2023-02', value: 102500 },
  { date: '2023-03', value: 101200 },
  { date: '2023-04', value: 105600 },
  { date: '2023-05', value: 108400 },
  { date: '2023-06', value: 112000 },
];

const PortfolioDashboard = () => {
  const [positions, setPositions] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [totalEquity, setTotalEquity] = useState(0);
  const [timeframe, setTimeframe] = useState('1M');
  const [orderSymbol, setOrderSymbol] = useState('');
  const [orderQty, setOrderQty] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrade = async (side) => {
    if (!orderSymbol || !orderQty) {
      setOrderStatus({ type: 'error', msg: 'Symbol and Qty required' });
      return;
    }
    try {
      const res = await fetch('http://127.0.0.1:8080/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: orderSymbol.toUpperCase(), side, qty: orderQty })
      });
      if (res.ok) {
        setOrderStatus({ type: 'success', msg: `Successfully placed ${side} order for ${orderQty} ${orderSymbol.toUpperCase()}` });
        // Refresh positions
        const posRes = await fetch('http://127.0.0.1:8080/api/portfolio/positions');
        const posData = await posRes.json();
        setPositions(posData || []);
        const total = (posData || []).reduce((acc, pos) => acc + (pos.qty * pos.currentPrice), 0);
        setTotalEquity(total + 25000);
        const alloc = (posData || []).map(p => ({
          name: p.symbol,
          value: p.qty * p.currentPrice
        }));
        setAllocation(alloc);
      } else {
        const errData = await res.json().catch(() => ({ error: 'Unknown server error' }));
        setOrderStatus({ type: 'error', msg: `Failed: ${errData.error || 'Unknown error'}` });
      }
    } catch (err) {
      setOrderStatus({ type: 'error', msg: `Error: ${err.message}` });
    }
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const posRes = await fetch('http://127.0.0.1:8080/api/portfolio/positions');
        const posData = await posRes.json();
        setPositions(posData || []);

        const total = (posData || []).reduce((acc, pos) => acc + (pos.qty * pos.currentPrice), 0);
        setTotalEquity(total + 25000); // add some mock cash

        const alloc = (posData || []).map(p => ({
          name: p.symbol,
          value: p.qty * p.currentPrice
        }));
        setAllocation(alloc);
      } catch (err) {
        console.error("Failed to fetch positions", err);
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const histRes = await fetch(`http://127.0.0.1:8080/api/portfolio/history?period=${timeframe}`);
        const histData = await histRes.json();
        
        const formattedHistory = (histData || []).map(pt => {
          const d = new Date(parseInt(pt.date) * 1000);
          return {
            date: d.toLocaleDateString(),
            value: pt.value
          };
        });
        setPerformance(formattedHistory);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, [timeframe]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', height: '100%', paddingBottom: '24px' }}>
      
      {/* Left Column: Performance & Positions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Performance Chart */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: '0', color: '#e2e8f0', fontSize: '1.1rem' }}>Portfolio Performance</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['1W', '1M', '1A'].map(tf => (
                <button 
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  style={{
                    background: timeframe === tf ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                    border: 'none',
                    color: timeframe === tf ? '#fff' : '#94a3b8',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} domain={['auto', 'auto']} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Positions */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', flexGrow: 1 }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#e2e8f0', fontSize: '1.1rem' }}>Active Positions</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#94a3b8' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px 8px' }}>Symbol</th>
                  <th style={{ padding: '12px 8px' }}>Qty</th>
                  <th style={{ padding: '12px 8px' }}>Avg Price</th>
                  <th style={{ padding: '12px 8px' }}>Market Price</th>
                  <th style={{ padding: '12px 8px' }}>Unrealized P&L</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 8px', color: '#e2e8f0', fontWeight: 'bold' }}>{pos.symbol}</td>
                    <td style={{ padding: '12px 8px' }}>{pos.qty}</td>
                    <td style={{ padding: '12px 8px' }}>${pos.avgPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px 8px' }}>${pos.currentPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px 8px', color: pos.pnl >= 0 ? '#10b981' : '#ef4444' }}>
                      {pos.pnl >= 0 ? '+' : '-'}${Math.abs(pos.pnl).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Metrics & Allocation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Order Entry */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#e2e8f0', fontSize: '1.1rem' }}>Order Entry</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Symbol (e.g. AAPL)" 
                value={orderSymbol} 
                onChange={(e) => setOrderSymbol(e.target.value)}
                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
              />
              <input 
                type="number" 
                placeholder="Qty" 
                value={orderQty} 
                onChange={(e) => setOrderQty(e.target.value)}
                style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => handleTrade('BUY')}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#10b981', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                BUY
              </button>
              <button 
                onClick={() => handleTrade('SELL')}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                SELL
              </button>
            </div>
            {orderStatus && (
              <div style={{ marginTop: '8px', padding: '8px', borderRadius: '4px', fontSize: '0.85rem', background: orderStatus.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)', color: orderStatus.type === 'error' ? '#ef4444' : '#10b981' }}>
                {orderStatus.msg}
              </div>
            )}
          </div>
        </div>

        {/* Risk Metrics */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#e2e8f0', fontSize: '1.1rem' }}>Risk Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Portfolio Beta</span>
              <span style={{ color: '#e2e8f0', fontWeight: 'bold' }}>1.15</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Sharpe Ratio</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>1.82</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Max Drawdown</span>
              <span style={{ color: '#ef4444', fontWeight: 'bold' }}>-8.4%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Total Equity</span>
              <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#e2e8f0', fontSize: '1.1rem' }}>Asset Allocation</h3>
          <div style={{ flexGrow: 1, minHeight: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            {allocation.map((entry, index) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
