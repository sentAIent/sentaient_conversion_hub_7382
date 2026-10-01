import React, { useState, useEffect } from 'react';

const SocialLeaderboard = () => {
  const [activeLeader, setActiveLeader] = useState(null);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState(() => {
    const saved = localStorage.getItem('contango_blocked_traders');
    return saved ? JSON.parse(saved) : [];
  });
  const [reportingUser, setReportingUser] = useState(null);
  const [reportReason, setReportReason] = useState('Inappropriate Content / Spam');

  // Check if native mobile app environment or web
  const [isMobilePlatform, setIsMobilePlatform] = useState(false);

  useEffect(() => {
    // Detect Capacitor or mobile user agent
    const isNative = typeof window !== 'undefined' && (window.Capacitor?.isNativePlatform?.() || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    setIsMobilePlatform(isNative);
  }, []);

  // Mock global leaderboard data
  const initialUsers = [
    { id: 'usr_1', rank: 1, name: 'AlphaGator_Quant', roi: 142.8, activeDays: 312, winRate: 74.2, strategyName: 'Crypto Momentum Alpha', price: 99, followers: 843 },
    { id: 'usr_2', rank: 2, name: 'CommodityGoldStandard', roi: 98.4, activeDays: 240, winRate: 68.9, strategyName: 'Futures Spread Engine', price: 49, followers: 512 },
    { id: 'usr_3', rank: 3, name: 'FixedIncomeYieldMaster', roi: 64.1, activeDays: 450, winRate: 88.5, strategyName: 'High-Yield Macro Overlay', price: 29, followers: 231 },
    { id: 'usr_4', rank: 4, name: 'BetaHedger', roi: 54.3, activeDays: 95, winRate: 61.2, strategyName: 'Equity Rotation Swarm', price: 39, followers: 98 },
    { id: 'usr_5', rank: 5, name: 'TrendFollowingBot', roi: 49.0, activeDays: 180, winRate: 59.8, strategyName: 'Moving Average Breakthrough', price: 19, followers: 412 },
    { id: 'usr_6', rank: 6, name: 'MeanReverter_x', roi: 41.5, activeDays: 120, winRate: 57.4, strategyName: 'Bollinger Band Scalper', price: 29, followers: 77 }
  ];

  const visibleUsers = initialUsers.filter(u => !blockedUsers.includes(u.id));

  const handleSubscribe = (leader) => {
    setActiveLeader(leader);
  };

  const handleBlockUser = (user) => {
    if (window.confirm(`Block ${user.name}? Their strategy signals and posts will be hidden from your feed.`)) {
      const updated = [...blockedUsers, user.id];
      setBlockedUsers(updated);
      localStorage.setItem('contango_blocked_traders', JSON.stringify(updated));
      alert(`${user.name} has been blocked.`);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert(`Report submitted for ${reportingUser.name}. Reason: "${reportReason}". Our compliance and safety moderation team will review this account within 24 hours pursuant to Apple & Google UGC guidelines.`);
    setReportingUser(null);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutProcessing(true);

    setTimeout(() => {
      alert(`Subscription Success! You have subscribed to ${activeLeader.name}'s "${activeLeader.strategyName}" strategy via ${isMobilePlatform ? 'Store In-App Purchase' : 'Secure Checkout'}. The algorithm is now live on your Strategy Canvas.`);
      setCheckoutProcessing(false);
      setActiveLeader(null);
    }, 1200);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Header & Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🏆 Social Leaderboard & Strategy Hub
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Compete with verified quant traders, analyze real-time paper ROI rankings, and subscribe to community algorithms.
          </p>
        </div>
        <div style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          ● Live Verification Active
        </div>
      </div>

      {/* Leaderboard Table */}
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px' }}>Rank</th>
              <th style={{ padding: '12px' }}>Quant Trader</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Total ROI (%)</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Win Rate</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Active</th>
              <th style={{ padding: '12px' }}>Offered Strategy</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                <td style={{ padding: '14px 12px', fontWeight: 700, color: u.rank <= 3 ? '#fbbf24' : 'var(--text-secondary)' }}>
                  {u.rank === 1 ? '🥇 1' : u.rank === 2 ? '🥈 2' : u.rank === 3 ? '🥉 3' : u.rank}
                </td>
                <td style={{ padding: '14px 12px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{u.name}</span>
                    <span style={{ fontSize: '0.7rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px' }}>Verified</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right', color: 'var(--success-color)', fontWeight: 700 }}>
                  +{u.roi}%
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right' }}>{u.winRate}%</td>
                <td style={{ padding: '14px 12px', textAlign: 'right', color: 'var(--text-secondary)' }}>{u.activeDays}d</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 500 }}>{u.strategyName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.followers} active subscribers</div>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleSubscribe(u)}
                      style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                    >
                      Subscribe (${u.price}/mo)
                    </button>
                    <button 
                      onClick={() => setReportingUser(u)} 
                      title="Report Inappropriate Content"
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      🚩
                    </button>
                    <button 
                      onClick={() => handleBlockUser(u)} 
                      title="Block Trader"
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#ef4444', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      🚫
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance & Risk Warning Footer */}
      <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '4px' }}>
          ⚖️ Regulatory & App Store Compliance Disclaimer
        </div>
        <p>
          Contango Quant is a quantitative modeling and simulated backtesting platform. All leaderboard figures, ROI rankings, and trade executions reflect simulated paper-trading performance unless otherwise specified. Past performance is no guarantee of future financial results. Contango Quant is not a registered broker-dealer, financial advisor, or asset manager. Content shared by community members represents personal algorithmic hypotheses and is subject to our zero-tolerance User Content Guidelines.
        </p>
      </div>

      {/* UGC Report Modal */}
      {reportingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '420px' }}>
            <h3 style={{ marginBottom: '12px', color: '#fff' }}>🚩 Report Trader / Strategy</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              We enforce a strict zero-tolerance policy regarding spam, market manipulation, abusive behavior, and inappropriate content.
            </p>
            
            <form onSubmit={handleReportSubmit}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px' }}>
                Reason for Reporting:
              </label>
              <select 
                value={reportReason} 
                onChange={(e) => setReportReason(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', marginBottom: '16px' }}
              >
                <option value="Inappropriate Content / Spam">Inappropriate Content / Spam</option>
                <option value="Misleading Claims or Falsified Signals">Misleading Claims or Falsified Signals</option>
                <option value="Harassment or Abusive User Profile">Harassment or Abusive User Profile</option>
                <option value="Other Policy Violation">Other Policy Violation</option>
              </select>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setReportingUser(null)} 
                  style={{ padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-color)', color: '#94a3b8', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 16px', background: '#ef4444', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Checkout Modal (StoreKit / Google Play / Web Compliant) */}
      {activeLeader && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ background: '#1e293b', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '440px', position: 'relative' }}>
            <button 
              onClick={() => setActiveLeader(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>
              &times;
            </button>
            
            <h3 style={{ marginBottom: '16px', color: 'white' }}>
              {isMobilePlatform ? '📱 In-App Subscription' : '💳 Strategy Subscription Checkout'}
            </h3>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div><strong>Quant Trader:</strong> {activeLeader.name}</div>
              <div><strong>Algorithm:</strong> {activeLeader.strategyName}</div>
              <div style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                <span>Monthly Access:</span>
                <span style={{ color: 'var(--success-color)' }}>${activeLeader.price}.00 / month</span>
              </div>
            </div>

            {isMobilePlatform ? (
              <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '8px', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                <p>
                  <strong>Apple / Google Subscription Terms:</strong> Payment will be charged to your Apple ID / Google Account upon confirmation. Subscription automatically renews monthly unless cancelled at least 24 hours prior to the end of the current billing cycle. You may manage or cancel your subscription anytime via your device Account Settings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Card Number</div>
                  <input 
                    type="text" 
                    placeholder="4111 2222 3333 4444" 
                    required
                    style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                  />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <label>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Expiry</div>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      required
                      style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                    />
                  </label>
                  <label>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>CVV</div>
                    <input 
                      type="password" 
                      placeholder="123" 
                      required
                      style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                    />
                  </label>
                </div>
              </form>
            )}

            <button 
              type="button" 
              onClick={handleCheckoutSubmit}
              className="btn-primary" 
              disabled={checkoutProcessing}
              style={{ marginTop: '12px', width: '100%' }}
            >
              {checkoutProcessing ? 'Authorizing with Store...' : (isMobilePlatform ? `Subscribe via Store ($${activeLeader.price}.00/mo)` : `Confirm & Authorize $${activeLeader.price}.00`)}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Terms of Use (EULA) &bull; Privacy Policy</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SocialLeaderboard;
