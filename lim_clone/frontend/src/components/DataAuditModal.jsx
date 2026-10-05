import React, { useState, useEffect } from 'react';
import GitNexusAuditor from './GitNexusAuditor';

const DataAuditModal = ({ isOpen, onClose, symbol = 'AAPL' }) => {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [benchmark, setBenchmark] = useState('SPY');

  useEffect(() => {
    if (isOpen) {
      runAudit();
    }
  }, [isOpen, symbol, benchmark]);

  const runAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/audit/verify?symbol=${symbol}&benchmark=${benchmark}`);
      const data = await res.json();
      setAuditData(data);
    } catch (e) {
      console.warn('Audit fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', color: '#f8fafc', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔬 Institutional Quantitative & Data Audit
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
              Continuous mathematical formula proofs, GIPS standards verification, and OHLCV data integrity.
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#60a5fa' }}>
            Auditing mathematical formulas and historical bars for {symbol}...
          </div>
        ) : auditData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            
            {/* Top Scorecard Banner */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Data Provenance Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                  {auditData.ohlcv_provenance?.score}% ({auditData.ohlcv_provenance?.status})
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                  {auditData.ohlcv_provenance?.data_points} bars verified
                </div>
              </div>

              <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>Compliance Standard</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', marginTop: '6px' }}>
                  {auditData.institutional_compliance}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  Risk-Free Rate: {(auditData.mathematical_audit?.risk_free_rate_used * 100).toFixed(1)}% (US 3M T-Bill)
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #334155', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target vs Benchmark</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>
                  {auditData.symbol} vs {auditData.benchmark}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                  Observations: {auditData.mathematical_audit?.observations_audited} trading days
                </div>
              </div>
            </div>

            {/* OHLCV Integrity Audit Checklist */}
            <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#cbd5e1' }}>OHLCV Boundary & Anomaly Audit</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {auditData.ohlcv_provenance?.issues?.map((iss, idx) => (
                  <li key={idx} style={{ color: iss.includes('CRITICAL') ? '#ef4444' : (iss.includes('WARNING') ? '#f59e0b' : '#10b981') }}>
                    {iss}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mathematical Formula Proofs Table */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#cbd5e1' }}>
                Mathematical Proofs & Standard Verification Matrix
              </h4>
              <div style={{ overflowX: 'auto', border: '1px solid #1e293b', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', color: '#cbd5e1' }}>
                      <th style={{ padding: '10px 14px' }}>Metric</th>
                      <th style={{ padding: '10px 14px' }}>Calculated Value</th>
                      <th style={{ padding: '10px 14px' }}>Analytical Formula</th>
                      <th style={{ padding: '10px 14px' }}>Audit Proof Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditData.mathematical_audit?.verifications?.map((v, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: '#f1f5f9' }}>{v.metric}</td>
                        <td style={{ padding: '10px 14px', color: '#60a5fa', fontWeight: 700 }}>{v.calculated_value}</td>
                        <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#a78bfa' }}>{v.formula}</td>
                        <td style={{ padding: '10px 14px', color: '#34d399', fontWeight: 600 }}>{v.proof_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* GitNexus Code Intelligence Auditor */}
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#cbd5e1' }}>
                Zero-Server Code Intelligence Audit (GitNexus)
              </h4>
              <GitNexusAuditor algorithmId={symbol} />
            </div>

          </div>
        ) : null}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.85rem' }}>
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};

export default DataAuditModal;
