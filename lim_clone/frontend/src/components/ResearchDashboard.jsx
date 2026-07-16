import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ResearchDashboard = ({ symbol }) => {
  const [query, setQuery] = useState(`What is the latest news and sentiment for ${symbol}?`);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleRunResearch = async () => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) throw new Error('Research query failed');
      const data = await response.json();
      setReport(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel" style={{ flex: 1, margin: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', background: '#1e293b' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ marginBottom: '8px' }}>AI Research Hub</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid #334155',
              padding: '12px',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '1rem'
            }}
          />
          <button 
            onClick={handleRunResearch}
            disabled={loading}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0 24px',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Analyzing...' : 'Execute Research'}
          </button>
        </div>
      </div>

      {error && <div style={{ color: '#ef4444', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

      <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '8px' }}>
        {!report && !loading && !error && (
          <div style={{ color: '#64748b', textAlign: 'center', marginTop: '40px' }}>
            Enter a query above to generate a full-page AI research report using Gemini and real-time news scraping.
          </div>
        )}
        
        {loading && (
          <div style={{ color: '#3b82f6', textAlign: 'center', marginTop: '40px' }}>
            Scraping live data and analyzing sentiment...
          </div>
        )}

        {report && (
          <div style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
            <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '24px', borderLeft: '4px solid #3b82f6' }}>
              <h4 style={{ color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Derived Simulation Parameters</h4>
              <pre style={{ margin: 0, color: '#f8fafc' }}>
                {JSON.stringify(report.parsed_parameters, null, 2)}
              </pre>
            </div>
            
            <div className="markdown-content">
              {/* If your /ask endpoint returned a direct markdown summary you'd render it here. For now we just show the results. */}
              <h3>Simulation Engine Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Symbol</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{report.simulation_results?.Symbol || 'N/A'}</div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Win Rate</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: report.simulation_results?.WinRate > 0.5 ? '#10b981' : '#ef4444' }}>
                    {report.simulation_results?.WinRate ? (report.simulation_results.WinRate * 100).toFixed(1) + '%' : 'N/A'}
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Net Return</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: report.simulation_results?.NetReturn > 0 ? '#10b981' : '#ef4444' }}>
                    {report.simulation_results?.NetReturn ? (report.simulation_results.NetReturn * 100).toFixed(2) + '%' : 'N/A'}
                  </div>
                </div>
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Total Trades</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{report.simulation_results?.TotalTrades || 0}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchDashboard;
