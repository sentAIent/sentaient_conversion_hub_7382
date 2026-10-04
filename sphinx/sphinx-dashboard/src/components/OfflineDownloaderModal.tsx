import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bbox: string | null;
  clientId: string;
}

export function OfflineDownloaderModal({ isOpen, onClose, bbox, clientId }: Props) {
  const [maxZoom, setMaxZoom] = useState(14);
  const [deadlineOption, setDeadlineOption] = useState('24h');
  const [customDeadline, setCustomDeadline] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (jobId && status?.status !== 'completed') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:3117/api/cache/region/status/${jobId}`);
          if (res.ok) {
            const data = await res.json();
            setStatus(data);
          }
        } catch (e) {
          console.error('Failed to poll status', e);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [jobId, status]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setError(null);
    let deadlineTs = Date.now();
    if (deadlineOption === 'asap') {
      deadlineTs += 60 * 1000; // 1 min
    } else if (deadlineOption === '24h') {
      deadlineTs += 24 * 60 * 60 * 1000; // 24 hours
    } else if (deadlineOption === '7d') {
      deadlineTs += 7 * 24 * 60 * 60 * 1000; // 7 days
    } else if (deadlineOption === 'custom' && customDeadline) {
      deadlineTs = new Date(customDeadline).getTime();
    }

    try {
      const res = await fetch('http://127.0.0.1:3117/api/cache/region/enqueue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bbox,
          minZoom: 8,
          maxZoom,
          clientId,
          deadline: deadlineTs
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to start download');
      }

      setJobId(data.jobId);
      setStatus({ status: 'queued', progress: 0 });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Offline Region Downloader</h2>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        
        {!jobId ? (
          <>
            <div style={formGroupStyle}>
              <label>Target Area Bounding Box:</label>
              <input type="text" readOnly value={bbox || ''} style={inputStyle} />
            </div>

            <div style={formGroupStyle}>
              <label>Max Detail (Zoom Level):</label>
              <select value={maxZoom} onChange={e => setMaxZoom(Number(e.target.value))} style={inputStyle}>
                <option value={12}>12 (City Overview)</option>
                <option value={14}>14 (Neighborhoods)</option>
                <option value={16}>16 (Street Level - High Storage)</option>
              </select>
            </div>

            <div style={formGroupStyle}>
              <label>When do you need this map offline?</label>
              <select value={deadlineOption} onChange={e => setDeadlineOption(e.target.value)} style={inputStyle}>
                <option value="24h">Within 24 Hours (Recommended)</option>
                <option value="7d">Within 1 Week (Safest)</option>
                <option value="asap">ASAP (High Risk of Rate Limits)</option>
                <option value="custom">Custom Date/Time</option>
              </select>
            </div>

            {deadlineOption === 'custom' && (
              <div style={formGroupStyle}>
                 <input 
                   type="datetime-local" 
                   value={customDeadline} 
                   onChange={e => setCustomDeadline(e.target.value)}
                   style={inputStyle} 
                 />
              </div>
            )}

            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <button onClick={handleDownload} style={buttonStyle}>Start Background Download</button>
              <button onClick={onClose} style={cancelButtonStyle}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ margin: '20px 0' }}>
              <h3>Status: {status?.status}</h3>
              <div style={{ width: '100%', height: 20, background: '#333', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${status?.progress || 0}%`, height: '100%', background: '#4caf50', transition: 'width 0.5s' }} />
              </div>
              <p>{status?.downloadedTiles} / {status?.totalTiles} Tiles ({status?.progress}%)</p>
            </div>
            {status?.status === 'completed' && (
              <button onClick={onClose} style={buttonStyle}>Close</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  padding: '30px',
  borderRadius: '8px',
  width: '500px',
  color: 'white',
  fontFamily: 'monospace'
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  backgroundColor: '#2d2d2d',
  color: 'white',
  border: '1px solid #444',
  borderRadius: '4px'
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const cancelButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#f44336'
};
export default OfflineDownloaderModal;
