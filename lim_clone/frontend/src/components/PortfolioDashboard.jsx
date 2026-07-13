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
  const [positions, setPositions] = useState(mockPositions);
  const [allocation, setAllocation] = useState(mockAllocation);
  const [performance, setPerformance] = useState(mockPerformance);
  const [totalEquity, setTotalEquity] = useState(0);

  useEffect(() => {
    // In the future, this will fetch real Alpaca portfolio data
    // For now, calculate total equity from mock positions
    const total = positions.reduce((acc, pos) => acc + (pos.qty * pos.currentPrice), 0);
    setTotalEquity(total + 25000); // add $25k cash
  }, [positions]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', height: '100%', paddingBottom: '24px' }}>
      
      {/* Left Column: Performance & Positions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Performance Chart */}
        <div style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#e2e8f0', fontSize: '1.1rem' }}>Portfolio Performance (YTD)</h3>
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
