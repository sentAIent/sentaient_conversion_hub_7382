import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? 'http://127.0.0.1:8080/api/register' : 'http://127.0.0.1:8080/api/login';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Authentication failed');
      }

      const data = await response.json();
      
      if (isRegister) {
        // Automatically switch to login after successful register
        setIsRegister(false);
        setError('Registration successful. Please log in.');
      } else {
        // Save JWT to localStorage and trigger success callback
        localStorage.setItem('sentaient_jwt', data.token);
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewerLogin = () => {
    localStorage.setItem('sentaient_jwt', 'mock-app-store-reviewer-token-2026');
    localStorage.setItem('sentaient_user', 'AppStore_Reviewer');
    onLoginSuccess();
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <div className="login-header">
          <img src="/contango_quant_logo.png" alt="Contango" className="login-logo" />
          <h2>Contango Quant</h2>
          <p>Terminal Access Gate</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className={`login-message ${error.includes('successful') ? 'success' : 'error'}`}>{error}</div>}
          
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Initialize Session')}
          </button>
        </form>
        
        <div className="login-footer">
          <button className="toggle-mode" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Log In' : 'Need access? Request Invite (Register)'}
          </button>

          <button 
            type="button" 
            onClick={handleReviewerLogin}
            style={{ marginTop: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px dashed #3b82f6', color: '#60a5fa', padding: '8px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}
          >
            🛡️ Apple / Google Reviewer Demo Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
