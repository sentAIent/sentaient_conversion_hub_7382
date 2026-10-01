with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'r') as f:
    content = f.read()

# Replace the alpha stream render block
old_alpha_stream = """      {/* 3. Black-Box Copy-Trading Alpha Streams */}
      {activeTab === 'alpha-stream' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong>🛡️ Proprietary IP Protection Active:</strong> Alpha Streams broadcast verified trade signals to subscribers without revealing creator source algorithms or parameters.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {alphaSignals.map((sig, idx) => (
              <div key={idx} style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{sig.symbol}</span>
                  <span style={{ padding: '4px 10px', background: sig.direction === 'BUY' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.1)', color: sig.direction === 'BUY' ? 'var(--success-color)' : '#fff', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem' }}>
                    {sig.direction}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Strategy: {sig.strategy}</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px' }}>
                  <div>Target Alloc: <strong>{sig.target_allocation_pct}%</strong></div>
                  <div>Confidence: <strong>{sig.confidence_score * 100}%</strong></div>
                  <div>Stop-Loss: <strong>{sig.suggested_stop_loss}</strong></div>
                  <div>Horizon: <strong>{sig.time_horizon}</strong></div>
                </div>

                <button 
                  onClick={() => alert(`Order queued for ${sig.symbol} (${sig.direction}) at ${sig.target_allocation_pct}% portfolio weight!`)}
                  className="btn-primary" 
                  style={{ padding: '8px', fontSize: '0.8rem', marginTop: '6px' }}
                >
                  ⚡ Mirror & Auto-Execute Signal
                </button>
              </div>
            ))}
          </div>

        </div>
      )}"""

new_alpha_stream = """      {/* 3. Black-Box Copy-Trading Alpha Streams */}
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
      )}"""

content = content.replace(old_alpha_stream, new_alpha_stream)

with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'w') as f:
    f.write(content)
