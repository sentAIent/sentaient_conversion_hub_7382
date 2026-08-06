import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in React component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: 'rgba(255, 50, 50, 0.1)', border: '1px solid var(--danger-color)', borderRadius: '8px', margin: '2rem', color: 'white' }}>
          <h2>Something went wrong in the UI.</h2>
          <p style={{ color: 'var(--text-muted)' }}>{this.state.error?.message}</p>
          <button 
            className="glass-button" 
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}
