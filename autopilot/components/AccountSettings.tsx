import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Link2, Server, Key, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

function AccountPlatformGroup({ platform, handles, onRemove, onManageCredentials }: { platform: string, handles: string[], onRemove: (platform: string, handle: string) => void, onManageCredentials: (p: string, h: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
      <button 
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-neutral-900/50 px-5 py-3 border-b border-neutral-800 flex justify-between items-center hover:bg-neutral-800/50 transition-colors"
      >
        <h4 className="font-semibold text-sm text-neutral-300">{platform}</h4>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-500 bg-neutral-800 px-2 py-1 rounded-md">{handles.length} linked</span>
          <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-2">
          {handles.length === 0 ? (
            <p className="text-xs text-neutral-600 italic px-4 py-3 text-center">No identities configured for this platform.</p>
          ) : (
            <ul className="space-y-1">
              {handles.map(handle => (
                <li key={handle} className="flex justify-between items-center px-4 py-3 hover:bg-neutral-900 rounded-lg transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="font-medium text-neutral-200">{handle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onManageCredentials(platform, handle)}
                      className="text-emerald-500/70 hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100 p-1 text-xs font-medium border border-emerald-500/30 rounded px-2"
                      title="Manage Credentials"
                    >
                      <Key className="w-3 h-3 inline mr-1" />
                      Keys
                    </button>
                    <button 
                      onClick={() => onRemove(platform, handle)}
                      className="text-neutral-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                      title="Revoke access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function AccountSettings() {
  const [accounts, setAccounts] = useState<Record<string, string[]>>({
    TikTok: [],
    Instagram: [],
    X: [],
    LinkedIn: []
  });
  const [loading, setLoading] = useState(true);
  const [newAccount, setNewAccount] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('TikTok');
  const [credentialModal, setCredentialModal] = useState<{platform: string, handle: string, data: any} | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch('http://localhost:18080/admin/accounts');
      if (res.ok) {
        const data = await res.json();
        setAccounts({
          TikTok: data.TikTok || [],
          Instagram: data.Instagram || [],
          X: data.X || [],
          LinkedIn: data.LinkedIn || []
        });
      }
    } catch (err) {
      console.error("Failed to load accounts", err);
      toast.error('Failed to connect to Orchestrator API');
    } finally {
      setLoading(false);
    }
  };

  const saveAccounts = async (updatedAccounts: Record<string, string[]>) => {
    try {
      const res = await fetch('http://localhost:18080/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAccounts)
      });
      if (res.ok) {
        setAccounts(updatedAccounts);
        toast.success('Accounts updated successfully!');
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.error("Failed to save accounts", err);
      toast.error('Failed to save accounts. Check API connection.');
    }
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccount.trim()) return;

    const updated = { ...accounts };
    if (!updated[selectedPlatform]) updated[selectedPlatform] = [];
    
    // Prevent duplicates
    if (!updated[selectedPlatform].includes(newAccount.trim())) {
      updated[selectedPlatform].push(newAccount.trim());
      saveAccounts(updated);
    } else {
      toast.error('Account already exists for this platform!');
    }
    
    setNewAccount('');
  };

  const handleRemoveAccount = (platform: string, accountToRemove: string) => {
    const updated = { ...accounts };
    updated[platform] = updated[platform].filter(acc => acc !== accountToRemove);
    saveAccounts(updated);
  };

  const handleManageCredentials = async (platform: string, handle: string) => {
    try {
      const res = await fetch('http://localhost:18080/admin/credentials');
      const allCreds = await res.json();
      const key = `${platform}:${handle}`;
      const data = allCreds[key] || {};
      setCredentialModal({ platform, handle, data: JSON.stringify(data, null, 2) });
    } catch (err) {
      toast.error('Failed to load credentials');
    }
  };

  const handleSaveCredentials = async () => {
    if (!credentialModal) return;
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(credentialModal.data);
      } catch (e) {
        toast.error('Invalid JSON format');
        return;
      }
      
      const resAll = await fetch('http://localhost:18080/admin/credentials');
      const allCreds = await resAll.json();
      
      const key = `${credentialModal.platform}:${credentialModal.handle}`;
      allCreds[key] = parsedData;

      const res = await fetch('http://localhost:18080/admin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allCreds)
      });
      
      if (res.ok) {
        toast.success('Credentials saved securely!');
        setCredentialModal(null);
      } else {
        throw new Error('Failed to save');
      }
    } catch (err) {
      toast.error('Failed to save credentials');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin text-emerald-500"><Activity className="w-8 h-8" /></div>
    </div>
  );

  return (
    <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 mb-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Link2 className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Connected Accounts</h2>
          <p className="text-sm text-neutral-500 mt-1">Manage external platform integrations and social handles.</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-8 relative z-10">
        {/* ADD ACCOUNT FORM */}
        <div>
          <form onSubmit={handleAddAccount} className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 space-y-5 shadow-inner">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Link New Handle
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Platform Target</label>
                <select 
                  value={selectedPlatform} 
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none"
                >
                  <option value="TikTok">TikTok (Bytedance)</option>
                  <option value="Instagram">Instagram (Meta)</option>
                  <option value="X">X (Twitter)</option>
                  <option value="LinkedIn">LinkedIn (Professional)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Account Handle</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-neutral-500" />
                  </div>
                  <input 
                    type="text" 
                    value={newAccount} 
                    onChange={(e) => setNewAccount(e.target.value)}
                    placeholder="@sentaient"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!newAccount.trim()}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Server className="w-4 h-4" />
              Authorize & Connect
            </button>
          </form>
        </div>

        {/* ACCOUNTS LIST */}
        <div className="space-y-4">
          {Object.entries(accounts).map(([platform, handles]) => (
            <AccountPlatformGroup 
              key={platform} 
              platform={platform} 
              handles={handles} 
              onRemove={handleRemoveAccount} 
              onManageCredentials={handleManageCredentials}
            />
          ))}
        </div>
      </div>

      {/* CREDENTIAL MODAL */}
      {credentialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-500" />
                Edit Credentials
              </h3>
              <button onClick={() => setCredentialModal(null)} className="text-neutral-500 hover:text-white">✕</button>
            </div>
            <div className="p-6">
              <p className="text-sm text-neutral-400 mb-4">
                Define the API keys/tokens for <span className="font-mono text-emerald-400">{credentialModal.platform}:{credentialModal.handle}</span> in JSON format.
              </p>
              <textarea
                value={credentialModal.data}
                onChange={e => setCredentialModal({ ...credentialModal, data: e.target.value })}
                className="w-full h-48 bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-emerald-400 font-mono text-sm focus:outline-none focus:border-emerald-500"
                spellCheck={false}
              />
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => setCredentialModal(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCredentials}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg transition-colors"
                >
                  Save Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
