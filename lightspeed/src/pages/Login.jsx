import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    // Attempt login
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      if (signInError.message.toLowerCase().includes('invalid login credentials')) {
        // Auto-provisioning logic for local dev
        console.log("Auto-provisioning user:", email);
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });
        
        if (signUpError) {
          setErrorMsg("Failed to auto-provision: " + signUpError.message);
        } else if (signUpData?.user) {
          // Assign role based on email prefix
          let role = 'devops'; // default
          if (email.startsWith('ciso')) role = 'ciso';
          if (email.startsWith('secops')) role = 'secops';
          
          await supabase.from('user_roles').insert({
            id: signUpData.user.id,
            role: role
          });
          
          // Trigger manual login again to ensure session
          await supabase.auth.signInWithPassword({ email, password });
        }
      } else {
        setErrorMsg(signInError.message);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: 'radial-gradient(circle at top right, #1a1a2e, #0f0f13)' }}>
      <form onSubmit={handleLogin} style={{ 
        background: 'rgba(25, 25, 35, 0.6)', 
        backdropFilter: 'blur(20px)', 
        padding: '3rem', 
        borderRadius: '16px', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', background: 'linear-gradient(90deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LightSpeed</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enterprise Security Platform</p>
        </div>
        
        {errorMsg && (
          <div style={{ background: 'rgba(255, 50, 50, 0.1)', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
            placeholder="e.g. ciso@lightspeed.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Password</label>
          <input 
            type="password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="glass-button" 
          style={{ padding: '1rem', marginTop: '1rem', fontWeight: 'bold' }}
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
          <p>Local Dev Tip: Use prefixes to auto-provision roles:</p>
          <p>ciso@..., secops@..., devops@...</p>
        </div>
      </form>
    </div>
  );
}
