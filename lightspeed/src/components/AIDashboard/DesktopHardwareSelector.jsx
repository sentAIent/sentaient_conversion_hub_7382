import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Command } from '@tauri-apps/plugin-shell';

const Container = styled.div`
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 255, 204, 0.3);
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
  display: flex;
  align-items: center;
  gap: 12px;
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
  margin-top: 16px;
  
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

const SystemInfo = styled.div`
  background: rgba(0, 255, 204, 0.05);
  border: 1px solid rgba(0, 255, 204, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  font-size: 0.9rem;
  
  div {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default function DesktopHardwareSelector() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  // Optionally auto-fetch on mount
  useEffect(() => {
    handleScan();
  }, []);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    try {
      // Execute the llmfit sidecar securely
      const command = Command.sidecar('bin/llmfit', ['recommend', '--json']);
      const output = await command.execute();
      
      if (output.code !== 0 && !output.stdout.trim().startsWith('{')) {
        throw new Error(output.stderr || 'Failed to analyze hardware natively.');
      }
      
      const data = JSON.parse(output.stdout);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('Could not run native hardware scan. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>
        <span style={{ fontSize: '1.8rem' }}>⚡️</span>
        Native Hardware Detection
      </Title>
      <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '16px' }}>
        Running locally on your machine. We securely analyze your physical CPU, RAM, and GPU to find the perfect models.
      </p>

      {results && results.system && (
        <SystemInfo>
          <div><strong>CPU:</strong> {results.system.cpu?.model || 'Unknown'}</div>
          <div><strong>RAM:</strong> {Math.round(results.system.ram_total_gb)} GB</div>
          <div><strong>GPU:</strong> {results.system.gpu?.model || 'None'}</div>
        </SystemInfo>
      )}

      <Button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning Hardware...' : 'Rescan Hardware'}
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
                <span>Fit: <strong style={{ color: model.fit_level === 'perfect' ? '#00ffcc' : 'white' }}>{model.fit_level}</strong></span>
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
