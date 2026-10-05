import React, { useState, useEffect } from 'react';
import { Excalidraw } from "@excalidraw/excalidraw";

const StrategyCanvas = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Load Canvas elements on mount
  useEffect(() => {
    if (!excalidrawAPI) return;

    const loadCanvas = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/fincept/canvas');
        if (res.ok) {
          const data = await res.json();
          if (data && data.elements && data.elements.length > 0) {
            excalidrawAPI.updateScene({
              elements: data.elements,
              appState: { ...data.appState, theme: 'dark' }
            });
          }
        }
      } catch (err) {
        console.error("Failed to load canvas blueprint:", err);
      }
    };

    loadCanvas();
  }, [excalidrawAPI]);

  const handleSaveCanvas = async () => {
    if (!excalidrawAPI) return;
    setSaveStatus('Saving...');
    try {
      const elements = excalidrawAPI.getSceneElements();
      const res = await fetch('http://127.0.0.1:8000/api/fincept/canvas/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          elements,
          appState: { theme: 'dark' }
        })
      });
      if (res.ok) {
        setSaveStatus('Saved! ✓');
        setTimeout(() => setSaveStatus(''), 2000);
      } else {
        throw new Error('Save response not ok');
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('Failed ✕');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 60px)', width: '100%', position: 'relative' }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        theme="dark"
      />
      {/* Floating Toolbar */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '60px', // Shift slightly left to not overlap default Excalidraw widgets
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '6px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <button 
          onClick={handleSaveCanvas}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'opacity 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.target.style.opacity = 0.9}
          onMouseLeave={(e) => e.target.style.opacity = 1}
        >
          💾 Save Blueprint
        </button>
        {saveStatus && (
          <span style={{ fontSize: '0.8rem', color: saveStatus.includes('Failed') ? '#ef4444' : '#10b981', fontWeight: '500' }}>
            {saveStatus}
          </span>
        )}
      </div>
    </div>
  );
};

export default StrategyCanvas;
