import React from 'react';

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, rca: null, isAnalyzing: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    this.analyzeError(error, errorInfo);
  }

  async analyzeError(error, errorInfo) {
    this.setState({ isAnalyzing: true });
    try {
      const errorTraceback = `${error.toString()}\n${errorInfo.componentStack}`;
      
      // Send to our Edge Function for Gemini-powered RCA
      const response = await fetch('/.netlify/functions/ai-rca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errorTraceback }),
      });

      if (response.ok) {
        const rca = await response.json();
        this.setState({ rca });
      } else {
        this.setState({ rca: { root_cause: "AI Analysis Failed", remediation: "The Gemini RCA service is currently unavailable or returned an error." } });
      }
    } catch (e) {
      console.error("Failed to fetch RCA:", e);
      this.setState({ rca: { root_cause: "Network Error", remediation: "Failed to connect to the RCA service." } });
    } finally {
      this.setState({ isAnalyzing: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white p-8 flex flex-col items-center justify-center font-mono">
          <div className="max-w-3xl w-full border border-red-500/30 bg-red-950/20 rounded-lg p-6 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
            <h1 className="text-2xl font-bold text-red-500 mb-4 uppercase tracking-widest">System Failure Detected</h1>
            
            <div className="bg-black/50 p-4 rounded text-sm text-red-400 mb-6 overflow-x-auto whitespace-pre-wrap">
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </div>

            <h2 className="text-lg font-bold text-yellow-500 mb-2 tracking-widest border-b border-yellow-500/20 pb-2">AI Root Cause Analysis</h2>
            
            {this.state.isAnalyzing ? (
              <div className="flex items-center gap-3 text-yellow-400/70 animate-pulse py-4">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gemini is analyzing the stack trace...
              </div>
            ) : this.state.rca ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-1">ROOT CAUSE:</h3>
                  <p className="text-slate-200">{this.state.rca.root_cause}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-1">REMEDIATION PLAN:</h3>
                  <p className="text-slate-200 whitespace-pre-wrap">{this.state.rca.remediation}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500">RCA Analysis unavailable.</p>
            )}

            <button 
              onClick={() => window.location.reload()}
              className="mt-8 bg-red-900/50 hover:bg-red-800 text-white px-6 py-2 rounded uppercase tracking-wider text-sm transition-colors border border-red-500/50"
            >
              Restart System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default GlobalErrorBoundary;
