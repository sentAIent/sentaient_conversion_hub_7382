import React, { useState } from 'react';
import { GitBranch, Search } from 'lucide-react';

export default function CodeAuditModal({ onClose, onScanComplete }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/scan-repository', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      });

      if (!response.ok) throw new Error("Failed to scan repository.");
      
      const data = await response.json();
      onScanComplete(data.tasks);
    } catch (err) {
      console.error(err);
      alert("Error scanning repository via GitNexus MCP.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'rgba(25, 25, 35, 0.95)',
        padding: '2.5rem',
        borderRadius: '16px',
        width: '500px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <GitBranch size={28} /> GitNexus Code Audit
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
          Connect a repository. GitNexus will index your codebase and surface technical compliance violations (e.g., GDPR PII leaks, license issues) directly to your Kanban board.
        </p>

        <form onSubmit={handleScan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            required
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/your-org/your-repo"
            style={{
              padding: '0.8rem',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="glass-button"
              style={{ flex: 1, padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? 'Analyzing...' : <><Search size={16} /> Scan Codebase</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
