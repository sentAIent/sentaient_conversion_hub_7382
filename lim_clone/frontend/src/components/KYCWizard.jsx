import React, { useState } from 'react';

const KYCWizard = () => {
  const [step, setStep] = useState(1);
  const [kycData, setKycData] = useState({
    fullName: '',
    age: 30,
    annualIncome: 100000,
    netWorth: 250000,
    riskTolerance: 'moderate', // 'conservative', 'moderate', 'aggressive'
    investmentGoal: 'growth', // 'income', 'growth', 'speculation'
    horizonYears: 10,
    liquidAssets: 50000,
    monthlyExpenses: 4000,
    futureNeedsDesc: 'Retirement & buying home',
    debtToEquity: 'low'
  });

  const [statementAnalysis, setStatementAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatedAllocation, setGeneratedAllocation] = useState(null);

  const handleInputChange = (field, val) => {
    setKycData(prev => ({ ...prev, [field]: val }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalyzing(true);
    // Simulate OCR and parser of Balance Sheet / Income Statement
    setTimeout(() => {
      setStatementAnalysis({
        fileName: file.name,
        parsedMetrics: {
          currentRatio: 2.14,
          debtToEquity: 0.45,
          profitMargin: '18.4%',
          freeCashFlow: '$42,500/yr',
          financialHealthScore: 'Excellent (A+)'
        }
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleGenerateThesis = () => {
    // Determine target assets based on KYC answers
    const risk = kycData.riskTolerance;
    let allocation = [];

    if (risk === 'conservative') {
      allocation = [
        { asset: 'Fixed Income (Bonds/Notes)', pct: 60, desc: 'High safety, low volatility yield matching short-term liquidity needs' },
        { asset: 'Equities (Large Cap / Blue-Chips)', pct: 25, desc: 'Stable dividend payers' },
        { asset: 'Commodities (Gold/Precious Metals)', pct: 10, desc: 'Inflation hedge boundary' },
        { asset: 'Cash/Cash Equivalents', pct: 5, desc: 'Emergency reserves' }
      ];
    } else if (risk === 'aggressive') {
      allocation = [
        { asset: 'Equities (Growth / Tech / Small Cap)', pct: 55, desc: 'Capital appreciation target' },
        { asset: 'Crypto / Digital Assets', pct: 15, desc: 'High beta alpha generators' },
        { asset: 'Commodities (Energy / Base Metals)', pct: 15, desc: 'Active trend trading' },
        { asset: 'Fixed Income & Hybrid notes', pct: 10, desc: 'Yield buffers' },
        { asset: 'Cash/Cash Equivalents', pct: 5, desc: 'Tactical cash buy zones' }
      ];
    } else {
      // Moderate default
      allocation = [
        { asset: 'Equities (Blend of Growth & Dividend)', pct: 45, desc: 'Broad market expansion indexing' },
        { asset: 'Fixed Income (Treasury/High Grade Corporate)', pct: 30, desc: 'Consistent cash flow buffer' },
        { asset: 'Commodities (Oil, Gold, Agriculture)', pct: 15, desc: 'Macro asset diversifier' },
        { asset: 'Crypto (BTC / ETH core holdings)', pct: 5, desc: 'Growth multiplier' },
        { asset: 'Cash', pct: 5, desc: 'Liquidity safety' }
      ];
    }

    setGeneratedAllocation({
      thesis: `Based on a ${kycData.horizonYears}-year horizon with a ${kycData.riskTolerance} risk profile and an income of $${kycData.annualIncome.toLocaleString()}/yr, our models target capital growth with a focus on macro asset diversification.`,
      allocation
    });
    setStep(4);
  };

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header Stepper */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>📋 Onboarding KYC & Portfolio Planner</h2>
        <div style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span style={{ color: step === 1 ? 'var(--accent-color)' : 'inherit', fontWeight: step === 1 ? 'bold' : 'normal' }}>1. Personal Profile</span>
          <span>&rarr;</span>
          <span style={{ color: step === 2 ? 'var(--accent-color)' : 'inherit', fontWeight: step === 2 ? 'bold' : 'normal' }}>2. Financial Condition</span>
          <span>&rarr;</span>
          <span style={{ color: step === 3 ? 'var(--accent-color)' : 'inherit', fontWeight: step === 3 ? 'bold' : 'normal' }}>3. Future Needs</span>
          <span>&rarr;</span>
          <span style={{ color: step === 4 ? 'var(--accent-color)' : 'inherit', fontWeight: step === 4 ? 'bold' : 'normal' }}>4. Allocation Thesis</span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <h3>Step 1: Qualitative Investment Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <label>
              <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Full Name</div>
              <input 
                type="text" 
                value={kycData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                placeholder="John Doe"
              />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Age</div>
                <input 
                  type="number" 
                  value={kycData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Target Investment Horizon (Years)</div>
                <input 
                  type="number" 
                  value={kycData.horizonYears}
                  onChange={(e) => handleInputChange('horizonYears', parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
            </div>
            <label>
              <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Investment Risk Profile</div>
              <select 
                value={kycData.riskTolerance}
                onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
              >
                <option value="conservative">Conservative (Capital preservation primary)</option>
                <option value="moderate">Moderate (Balanced risk / capital growth)</option>
                <option value="aggressive">Aggressive (High-volatility growth generation)</option>
              </select>
            </label>
            <button className="btn-primary" onClick={() => setStep(2)} style={{ marginTop: '12px' }}>
              Proceed to Financial Statement Analyzer
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 2: Financial Condition & Balance Sheet analysis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Annual Income ($)</div>
                <input 
                  type="number" 
                  value={kycData.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Total Liabilities / Debts ($)</div>
                <input 
                  type="number" 
                  value={kycData.netWorth - kycData.liquidAssets}
                  onChange={(e) => handleInputChange('netWorth', kycData.liquidAssets + parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
            </div>
            
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '24px', textAlign: 'center', background: 'rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '8px', fontSize: '1.5rem' }}>📤</div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Upload Financial Statement (PDF / CSV)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Analyze Income Sheet and Asset Ledger</div>
              <input 
                type="file" 
                accept=".pdf,.csv,.txt"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="statement-upload"
              />
              <label htmlFor="statement-upload" style={{ background: '#3b82f6', color: 'white', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', display: 'inline-block', fontSize: '0.85rem' }}>
                Select File
              </label>
            </div>

            {analyzing && <div style={{ textAlign: 'center', color: '#3b82f6', fontSize: '0.9rem' }}>Analyzing statement metrics...</div>}

            {statementAnalysis && (
              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success-color)', padding: '12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--success-color)', marginBottom: '6px' }}>&check; Statement Parsed successfully: {statementAnalysis.fileName}</div>
                <div><strong>Current Ratio:</strong> {statementAnalysis.parsedMetrics.currentRatio} (Strong Liquidity)</div>
                <div><strong>Debt-to-Equity:</strong> {statementAnalysis.parsedMetrics.debtToEquity} (Sustainable)</div>
                <div><strong>Net Profit Margin:</strong> {statementAnalysis.parsedMetrics.profitMargin}</div>
                <div><strong>Estimated Health Score:</strong> {statementAnalysis.parsedMetrics.financialHealthScore}</div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button className="btn-primary" onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Proceed to Future Needs
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Future Financial Needs & Liabilities Coverage</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <label>
              <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Describe your future target liquidity needs (e.g. retirement goals, property purchases, child trust)</div>
              <textarea 
                value={kycData.futureNeedsDesc}
                onChange={(e) => handleInputChange('futureNeedsDesc', e.target.value)}
                style={{ width: '100%', height: '100px', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', resize: 'none' }}
              />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Estimated Monthly Expenses ($)</div>
                <input 
                  type="number" 
                  value={kycData.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
              <label>
                <div style={{ marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Current Cash Reserves ($)</div>
                <input 
                  type="number" 
                  value={kycData.liquidAssets}
                  onChange={(e) => handleInputChange('liquidAssets', parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button className="btn-primary" onClick={() => setStep(2)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                Back
              </button>
              <button className="btn-primary" onClick={handleGenerateThesis}>
                Generate Portfolio Thesis
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && generatedAllocation && (
        <div>
          <h3>Step 4: Auto-Generated Allocation Model & Thesis</h3>
          
          <div style={{ marginTop: '16px' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)', marginBottom: '24px' }}>
              <div style={{ fontWeight: 600, marginBottom: '6px' }}>Generated Thesis Statement</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>{generatedAllocation.thesis}</p>
            </div>

            <div style={{ fontWeight: 600, marginBottom: '12px' }}>Target Asset Allocation Breakdowns</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {generatedAllocation.allocation.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.asset}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                    {item.pct}%
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn-primary" onClick={() => setStep(3)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                Back
              </button>
              <button className="btn-primary" onClick={() => alert('KYC Profile and Target Allocation Saved! Models will now utilize this thesis.')}>
                Confirm & Lock Allocations
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default KYCWizard;
