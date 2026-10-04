import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Wallet, DollarSign, PlusCircle, Activity } from 'lucide-react';

export default function WalletDashboard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(125.50);
  const [limit, setLimit] = useState(50.00);
  const [transactions, setTransactions] = useState([
    { id: '1', date: '2026-09-30 14:02', desc: 'Premium Threat-Intel API (CrowdStrike)', amount: -0.15, type: 'THREAT_INTEL' },
    { id: '2', date: '2026-09-30 12:45', desc: 'Browser-Use Cloud Login Cost', amount: -0.05, type: 'API_COST' },
    { id: '3', date: '2026-09-29 09:00', desc: 'Wallet Deposit', amount: 100.00, type: 'DEPOSIT' }
  ]);

  const handleTopUp = () => {
    setBalance(prev => prev + 100);
    setTransactions(prev => [
      { id: Date.now().toString(), date: new Date().toLocaleString(), desc: 'Wallet Deposit via Stripe', amount: 100.00, type: 'DEPOSIT' },
      ...prev
    ]);
  };

  return (
    <div className="page-content fade-in" style={{ padding: '2rem', color: 'white' }}>
      <h1><Wallet size={32} /> Solvent Micro-Transactions</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Manage your autonomous AI budget. Agents will dynamically purchase premium threat intelligence during live attacks.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* Wallet Controls */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ color: '#aaa', margin: 0 }}>Current Balance</h3>
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', color: '#44ff44' }}>${balance.toFixed(2)}</h1>
          </div>
          
          <label style={{ display: 'block', marginTop: '1rem', color: '#aaa' }}>Auto-Spend Limit per Incident ($)</label>
          <input 
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', marginTop: '0.5rem' }}
          />
          
          <button 
            onClick={handleTopUp}
            className="glass-button" 
            style={{ marginTop: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,200,100,0.2)' }}
          >
            <PlusCircle size={16} /> Top-Up $100
          </button>
        </div>

        {/* Transaction Log */}
        <div style={{ background: 'rgba(25, 25, 35, 0.8)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3><Activity size={20} /> Real-Time Ledger</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {transactions.map(tx => (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                <div>
                  <strong>{tx.desc}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '0.2rem' }}>{tx.date} • {tx.type}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: tx.amount > 0 ? '#44ff44' : '#ff4444' }}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
