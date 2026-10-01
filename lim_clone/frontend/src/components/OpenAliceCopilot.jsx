import React, { useState } from 'react';

const OpenAliceCopilot = () => {
  const [proposals, setProposals] = useState([
    {
      id: "PR-4921",
      title: "Long AAPL - Earnings Arbitrage",
      status: "pending",
      author: "Alice (AI)",
      time: "2 mins ago",
      description: "Based on options chain analysis, delta skew indicates a 75% probability of a post-earnings volatility crush. Proposing a synthetic long to capture premium decay.",
      files: [
        { name: "thesis.md", size: "1.2 KB" },
        { name: "risk_model.json", size: "4.5 KB" },
        { name: "execution_plan.py", size: "2.1 KB" }
      ],
      metrics: {
        riskReward: "1:3.5",
        winProbability: "68%",
        maxDrawdown: "-2.1%"
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState('conversation');
  const [committed, setCommitted] = useState(false);

  const handleCommit = () => {
    setCommitted(true);
    setProposals(prev => prev.map(p => ({ ...p, status: "committed" })));
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{proposals[0].title} <span style={{ color: '#64748b', fontWeight: 400 }}>#{proposals[0].id}</span></h2>
            <span style={{ 
              background: committed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)', 
              color: committed ? '#10b981' : '#eab308', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              fontSize: '0.8rem', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: committed ? '#10b981' : '#eab308' }}></div>
              {committed ? 'Committed to Market' : 'Pending Review'}
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
            <strong style={{ color: '#e2e8f0' }}>{proposals[0].author}</strong> opened this proposal {proposals[0].time} • 3 files changed
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
            Reject Proposal
          </button>
          {!committed && (
            <button onClick={handleCommit} style={{ background: '#10b981', border: 'none', color: '#fff', padding: '8px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
              </svg>
              Commit Trade
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '24px' }}>
        <button onClick={() => setActiveTab('conversation')} style={{ background: 'none', border: 'none', color: activeTab === 'conversation' ? '#fff' : '#94a3b8', padding: '16px 0', borderBottom: activeTab === 'conversation' ? '2px solid #3b82f6' : '2px solid transparent', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>
          Conversation
        </button>
        <button onClick={() => setActiveTab('files')} style={{ background: 'none', border: 'none', color: activeTab === 'files' ? '#fff' : '#94a3b8', padding: '16px 0', borderBottom: activeTab === 'files' ? '2px solid #3b82f6' : '2px solid transparent', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>
          Files Changed <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '6px' }}>3</span>
        </button>
        <button onClick={() => setActiveTab('checks')} style={{ background: 'none', border: 'none', color: activeTab === 'checks' ? '#fff' : '#94a3b8', padding: '16px 0', borderBottom: activeTab === 'checks' ? '2px solid #3b82f6' : '2px solid transparent', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>
          Risk Checks <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '6px' }}>4/4 Passed</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', gap: '24px' }}>
        
        {/* Left Column (Main) */}
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {activeTab === 'conversation' && (
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: '#e2e8f0' }}>Alice (AI)</strong> commented {proposals[0].time}
              </div>
              <div style={{ padding: '24px' }}>
                <p style={{ lineHeight: '1.6', color: '#cbd5e1', margin: '0 0 16px 0' }}>{proposals[0].description}</p>
                
                <h4 style={{ marginTop: '24px', marginBottom: '12px', color: '#f8fafc' }}>Generated Reasoning (Markdown)</h4>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)' }}>
                  # Thesis for AAPL<br/><br/>
                  1. Implied Volatility (IV) is currently in the 98th percentile.<br/>
                  2. Historical earnings moves for AAPL rarely exceed 4%.<br/>
                  3. By selling the 180 straddle and buying the 170/190 wings, we limit max risk to $1000 while targeting a $350 max profit.<br/><br/>
                  *Action:* Route to Alpaca via paper account.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {proposals[0].files.map((f, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'monospace', color: '#60a5fa' }}>{f.name}</span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{f.size}</span>
                  </div>
                  <div style={{ padding: '16px', color: '#94a3b8', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                    <div style={{ display: 'flex' }}><span style={{ color: '#ef4444', marginRight: '12px' }}>-</span> <span>// Old parameter</span></div>
                    <div style={{ display: 'flex' }}><span style={{ color: '#10b981', marginRight: '12px' }}>+</span> <span>{f.name.endsWith('.json') ? '"target_allocation": 0.05' : 'execute_straddle_strategy(symbol="AAPL")'}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Trade Metrics</h4>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Risk/Reward</span>
                <span style={{ fontWeight: 600, color: '#f8fafc' }}>{proposals[0].metrics.riskReward}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Win Prob.</span>
                <span style={{ fontWeight: 600, color: '#10b981' }}>{proposals[0].metrics.winProbability}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Max Drawdown</span>
                <span style={{ fontWeight: 600, color: '#ef4444' }}>{proposals[0].metrics.maxDrawdown}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Reviewers</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>U</div>
              <span style={{ color: '#cbd5e1' }}>You (Pending)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OpenAliceCopilot;
