const fs = require('fs');
let code = `
import React from 'react';
import { Html } from '@react-three/drei';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '', stack: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.toString(), stack: error.stack };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center zIndexRange={[1000, 0]}>
          <div style={{ padding: 20, background: 'red', color: 'white', width: '80vw', borderRadius: 10 }}>
            <h2>Something broke!</h2>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorMsg}</pre>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 10 }}>{this.state.stack}</pre>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}
`;
fs.writeFileSync('components/ErrorBoundary.js', code);
