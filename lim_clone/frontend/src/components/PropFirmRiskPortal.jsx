import { useState, useEffect } from 'react';

const PropFirmRiskPortal = () => {
  const [portalState, setPortalState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lockdownLoading, setLockdownLoading] = useState(false);
  const [replicateSymbol, setReplicateSymbol] = useState('SPY');
  const [replicateSide, setReplicateSide] = useState('BUY');
  const [replicateQty, setReplicateQty] = useState(100);
  const [replicateResult, setReplicateResult] = useState(null);

  const fetchState = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/prop/accounts');
      const data = await res.json();
      setPortalState(data);
    } catch (err) {
      console.error('Failed to fetch prop accounts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleToggleLockdown = async () => {
    setLockdownLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8080/api/prop/lockdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setPortalState(data.state);
    } catch (err) {
      alert('Lockdown toggle failed: ' + err.message);
    } finally {
      setLockdownLoading(false);
    }
  };

  const handleCopyTrade = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8080/api/prop/copy-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: replicateSymbol,
          side: replicateSide,
          qty: parseFloat(replicateQty)
        })
      });
      const data = await res.json();
      setReplicateResult(data);
      setTimeout(() => setReplicateResult(null), 5000);
    } catch (err) {
      alert('Trade replication failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            🛡️ Turnkey Prop Firm Master-Sub Account & Hard Risk Guard
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Multi-account funded trader management, 4.0% daily drawdown circuit breaker, auto-liquidation, and 1-to-N trade fan-out replication.
          </p>
        </div>

        {/* Emergency Kill Switch */}
        <button
          onClick={handleToggleLockdown}
          disabled={lockdownLoading}
          style={{
            padding: '10px 18px',
            background: portalState?.lockdown_active ? '#10b981' : '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(239,68,68,0.3)'
          }}
        >
          {lockdownLoading
            ? 'Updating Risk State...'
            : portalState?.lockdown_active
            ? '🔓 Unlock Firm Trading'
            : '🛑 EMERGENCY FIRM KILL-SWITCH'}
        </button>
      </div>

      {portalState?.lockdown_active && (
        <div style={{ padding: '14px 18px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🚨 FIRM EMERGENCY LOCKDOWN ACTIVE: All open sub-account positions have been flattened. Order entry is restricted until manual unlock.</span>
        </div>
      )}

      {replicateResult && (
        <div style={{ padding: '12px 18px', background: 'rgba(16,185,129,0.12)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem' }}>
          ✓ Master order ({replicateResult.master_side} {replicateResult.master_qty} {replicateResult.master_symbol}) replicated across <strong>{replicateResult.total_mirrored} active sub-accounts</strong> proportionally.
        </div>
      )}

      {loading && !portalState ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading Prop Firm Telemetry...</div>
      ) : portalState ? (
        <>
          {/* Key Firm Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Total Firm AUM</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                ${(portalState.total_aum / 1e6).toFixed(2)}M
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                High-Watermark: ${(portalState.high_watermark / 1e6).toFixed(2)}M
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Master Treasury Balance</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                ${(portalState.master_balance / 1e6).toFixed(2)}M
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                2/20 Incentive Fee Accrual
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Circuit Breaker Limit</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
                {portalState.circuit_breaker_pct}% Max Daily Loss
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Auto-liquidation threshold
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Sub-Accounts</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {portalState.sub_accounts?.filter((a) => a.status === 'ACTIVE').length} / {portalState.sub_accounts?.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Funded challenge traders
              </div>
            </div>
          </div>

          {/* Sub-Accounts Ledger Table */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>👥 Managed Funded Trader Sub-Accounts</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hard liquidation rules enforced server-side</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '8px' }}>Account ID</th>
                    <th style={{ padding: '8px' }}>Trader & Strategy</th>
                    <th style={{ padding: '8px' }}>Tier</th>
                    <th style={{ padding: '8px' }}>Balance</th>
                    <th style={{ padding: '8px' }}>Daily PNL</th>
                    <th style={{ padding: '8px' }}>Drawdown %</th>
                    <th style={{ padding: '8px' }}>Multiplier</th>
                    <th style={{ padding: '8px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {portalState.sub_accounts?.map((sub) => {
                    const isDrawdownCritical = sub.current_drawdown_pct >= 4.0;
                    return (
                      <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '8px', fontWeight: 700, color: '#38bdf8' }}>{sub.id}</td>
                        <td style={{ padding: '8px', color: '#fff', fontWeight: 600 }}>{sub.trader_name}</td>
                        <td style={{ padding: '8px', color: '#94a3b8' }}>{sub.account_tier}</td>
                        <td style={{ padding: '8px', fontWeight: 700 }}>${sub.balance.toLocaleString()}</td>
                        <td style={{ padding: '8px', fontWeight: 700, color: sub.daily_pnl >= 0 ? '#10b981' : '#ef4444' }}>
                          {sub.daily_pnl >= 0 ? '+' : ''}${sub.daily_pnl.toLocaleString()}
                        </td>
                        <td style={{ padding: '8px' }}>
                          <span style={{ fontWeight: 800, color: isDrawdownCritical ? '#ef4444' : (sub.current_drawdown_pct > 2.5 ? '#f59e0b' : '#10b981') }}>
                            {sub.current_drawdown_pct}%
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '4px' }}>/ {sub.max_daily_loss_pct}%</span>
                        </td>
                        <td style={{ padding: '8px', color: '#c084fc' }}>{sub.multiplier}x</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          <span
                            style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              background: sub.status === 'ACTIVE' ? 'rgba(16,185,129,0.15)' : (sub.status === 'WARNING' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)'),
                              color: sub.status === 'ACTIVE' ? '#10b981' : (sub.status === 'WARNING' ? '#f59e0b' : '#ef4444')
                            }}
                          >
                            {sub.status} {sub.auto_liquidated && '(LIQUIDATED)'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Master Proportional Fan-Out Order Replicator */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: '#c084fc' }}>
              📡 Master-to-Sub Account 1-to-N Trade Replicator
            </div>
            <form onSubmit={handleCopyTrade} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr)) 160px', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Master Symbol</label>
                <input
                  type="text"
                  value={replicateSymbol}
                  onChange={(e) => setReplicateSymbol(e.target.value.toUpperCase())}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontWeight: 700 }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Side</label>
                <select
                  value={replicateSide}
                  onChange={(e) => setReplicateSide(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontWeight: 700 }}
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Master Base Qty</label>
                <input
                  type="number"
                  value={replicateQty}
                  onChange={(e) => setReplicateQty(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '9px',
                  background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ⚡ Mirror Across Sub-Accounts
              </button>
            </form>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default PropFirmRiskPortal;
