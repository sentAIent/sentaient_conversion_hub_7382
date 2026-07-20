import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloudHardwareSelector from './CloudHardwareSelector';
import DesktopHardwareSelector from './DesktopHardwareSelector';

const DashboardContainer = styled.div`
  padding: 40px 20px;
  background: #0f0f13;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #00ffcc, #00b3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    color: #aaa;
    font-size: 1.1rem;
    max-width: 600px;
    line-height: 1.6;
  }
`;

const DesktopBanner = styled.div`
  background: rgba(0, 255, 204, 0.1);
  border: 1px solid rgba(0, 255, 204, 0.3);
  color: #00ffcc;
  padding: 16px;
  border-radius: 12px;
  max-width: 600px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .text {
    font-size: 0.95rem;
  }
  
  a {
    color: black;
    background: #00ffcc;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.9rem;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

export default function AIDashboard() {
  const [isDesktopApp, setIsDesktopApp] = useState(false);

  useEffect(() => {
    // Detect if we are running inside Tauri
    if (window.__TAURI__) {
      setIsDesktopApp(true);
    }
  }, []);

  return (
    <DashboardContainer>
      <Header>
        <h1>Lightspeed AI Hub</h1>
        <p>Right-size your local LLMs for maximum privacy and performance. We analyze your hardware to recommend the perfect models.</p>
      </Header>

      {!isDesktopApp && (
        <DesktopBanner>
          <div className="text">
            <strong>For maximum privacy:</strong> Download the Lightspeed Desktop App. It automatically detects your hardware securely without sending data to the cloud.
          </div>
          <a href="#download">Download</a>
        </DesktopBanner>
      )}

      {isDesktopApp ? (
        <DesktopHardwareSelector />
      ) : (
        <CloudHardwareSelector />
      )}
    </DashboardContainer>
  );
}
