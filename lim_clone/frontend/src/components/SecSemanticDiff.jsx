import { useState, useEffect } from 'react';

const SecSemanticDiff = () => {
  const [symbol, setSymbol] = useState('NVDA');
  const [diffData, setDiffData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDiff = async (sym) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/sec/semantic-diff?symbol=${encodeURIComponent(sym)}`);
      const json = await res.json();
      setDiffData(json);
    } catch (err) {
      console.error('Failed to fetch SEC semantic diff', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiff(symbol);
  }, [symbol]);

  return (
    <div style={{ padding: '24px', background: 'var(--panel-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', color: '#f8fafc', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📜 SEC 10-K / 10-Q Semantic Diff Analyzer & Earnings Tone NLP
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Sentence-by-sentence textual redline comparisons across quarterly SEC filings and executive evasiveness scoring from earnings calls.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['NVDA', 'AAPL', 'MSFT', 'TSLA'].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                background: symbol === s ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                color: symbol === s ? '#fff' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && !diffData ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Comparing consecutive quarterly SEC filings...</div>
      ) : diffData ? (
        <>
          {/* Top Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Executive Confidence Tone</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
                {diffData.executive_tone_score} / 100
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                {diffData.tone_change_vs_prior} vs prior quarter
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Executive Evasiveness Index</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: diffData.evasiveness_index === 'LOW' ? '#38bdf8' : '#f59e0b', marginTop: '4px' }}>
                {diffData.evasiveness_index}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                Direct answers to analyst queries
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Filing Comparison</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
                {diffData.latest_filing}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                vs {diffData.prior_filing} (Filed {diffData.filing_date})
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>C-Suite Sentiment Badges</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <span style={{ padding: '3px 8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                  CEO: {diffData.earnings_call_nlp?.ceo_sentiment}
                </span>
                <span style={{ padding: '3px 8px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                  CFO: {diffData.earnings_call_nlp?.cfo_sentiment}
                </span>
              </div>
            </div>
          </div>

          {/* Redline Text Diffs in Risk Factors */}
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🔍 Item 1A Risk Factors Textual Shifts (Redline Added/Modified Clauses)</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{diffData.risk_factors_diff?.length} clauses modified</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {diffData.risk_factors_diff?.map((rf, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#38bdf8' }}>{rf.section}</span>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, background: rf.type === 'ADDED_CLAUSE' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)', color: rf.type === 'ADDED_CLAUSE' ? '#f59e0b' : '#10b981' }}>
                      {rf.type}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5', fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px' }}>
                    {rf.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Call Key Semantic Keywords */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px' }}>
              🎙️ Most Frequently Emphasized C-Suite Linguistic Keywords
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {diffData.earnings_call_nlp?.key_keywords?.map((kw, idx) => (
                <span key={idx} style={{ padding: '6px 14px', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '20px', fontSize: '0.8rem', color: '#c084fc', fontWeight: 700 }}>
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default SecSemanticDiff;
