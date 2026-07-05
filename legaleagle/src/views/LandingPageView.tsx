import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPageView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Legal Eagle SaaS</h1>
      <p>Automate your legal workflow.</p>
      <button onClick={() => navigate('/app')}>Go to App</button>
    </div>
  );
};
