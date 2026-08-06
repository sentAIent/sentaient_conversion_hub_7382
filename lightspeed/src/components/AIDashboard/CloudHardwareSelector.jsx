import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-top: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  
  label {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #ccc;
  }
  
  select, input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-family: inherit;
    &:focus {
      outline: none;
      border-color: #00ffcc;
    }
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #00ffcc, #00b3ff);
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 204, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultsCard = styled.div`
  margin-top: 24px;
  background: rgba(0, 0, 0, 0.4);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ModelItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:last-child {
    border-bottom: none;
  }
  
  .name {
    font-weight: 600;
    font-size: 1.1rem;
    color: #00ffcc;
  }
  
  .stats {
    font-size: 0.85rem;
    color: #aaa;
    margin-top: 4px;
    display: flex;
    gap: 16px;
  }
`;

export default function CloudHardwareSelector() {
  const [hardware, setHardware] = useState({ ram: 16, vram: 8, cores: 8 });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleEstimate = async () => {
    setLoading(true);
    setError(null);
    try {
      const functionUrl = 'https://us-central1-sentaient-conversion-hub.cloudfunctions.net/llmfitRecommend'; // Assuming default region and project name
      // For local testing in vite, we'll use a relative path if deployed to Firebase Hosting, or just proxy it.
      // But for now, we'll use a local emulator URL fallback in development:
      const url = window.location.hostname === 'localhost' 
        ? 'http://127.0.0.1:5001/sentaient-conversion-hub/us-central1/llmfitRecommend'
        : functionUrl;
        
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hardware)
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('Could not reach the cloud estimator. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Hardware-Aware AI (Cloud Estimator)</Title>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '24px' }}>
        Don't want to install the desktop app? Select your device specs below and we'll estimate the best local AI models for you.
      </p>

      <SelectGroup>
        <label>System RAM (GB)</label>
        <select value={hardware.ram} onChange={(e) => setHardware({...hardware, ram: parseInt(e.target.value)})}>
          <option value="8">8 GB</option>
          <option value="16">16 GB</option>
          <option value="32">32 GB</option>
          <option value="64">64+ GB</option>
        </select>
      </SelectGroup>

      <SelectGroup>
        <label>GPU VRAM (GB)</label>
        <select value={hardware.vram} onChange={(e) => setHardware({...hardware, vram: parseInt(e.target.value)})}>
          <option value="0">None / Integrated</option>
          <option value="4">4 GB</option>
          <option value="8">8 GB</option>
          <option value="12">12 GB</option>
          <option value="16">16 GB</option>
          <option value="24">24+ GB</option>
        </select>
        <small style={{ color: '#888', marginTop: '4px' }}>If you are on an Apple Silicon Mac (M1/M2/M3), select the same value as your System RAM.</small>
      </SelectGroup>

      <Button onClick={handleEstimate} disabled={loading}>
        {loading ? 'Analyzing...' : 'Get Recommendations'}
      </Button>

      {error && (
        <div style={{ color: '#ff4444', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {results && results.models && (
        <ResultsCard>
          <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem' }}>Top Recommended Models</h3>
          {results.models.map((model, idx) => (
            <ModelItem key={idx}>
              <div className="name">{model.name}</div>
              <div className="stats">
                <span>Fit: <strong>{model.fit_level}</strong></span>
                <span>Est. Speed: <strong>{model.estimated_tps} tps</strong></span>
                <span>Context: {model.effective_context_length}</span>
              </div>
            </ModelItem>
          ))}
        </ResultsCard>
      )}
    </Container>
  );
}
