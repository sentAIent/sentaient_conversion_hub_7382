'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, Copy, Check, Trash2, Key, Terminal, Code, 
  BarChart3, RefreshCw, Send, ChevronRight, Play, CheckCircle
} from '@/components/icons';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ApiKey, UsageHour } from '@/types/models';

export default function DeveloperPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [usage, setUsage] = useState<UsageHour[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create Key Form
  const [newKeyName, setNewKeyName] = useState('');
  const [creatingKey, setCreatingKey] = useState(false);

  // Copied Key Feedback
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Sandbox Playground
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/v1/projections');
  const [sandboxResponse, setSandboxResponse] = useState<any>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);

  // Documentation Tabs
  const [activeLang, setActiveLang] = useState<'curl' | 'js' | 'python'>('curl');

  async function loadData() {
    setLoading(true);
    try {
      const keysRes = await fetch('/api/developer/keys');
      const keysJson = await keysRes.json();
      if (keysJson.success && keysJson.data) {
        setKeys(keysJson.data);
        if (keysJson.data.length > 0) {
          setSelectedKey(keysJson.data[0].key_value);
        }
      }

      const usageRes = await fetch('/api/developer/usage');
      const usageJson = await usageRes.json();
      if (usageJson.success && usageJson.data) {
        setUsage(usageJson.data);
      }
    } catch (err) {
      console.error("Error loading developer data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    setCreatingKey(true);
    try {
      const res = await fetch('/api/developer/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName })
      });
      const json = await res.json();
      if (json.success) {
        alert("Developer API Key generated successfully!");
        setNewKeyName('');
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingKey(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this API key? This cannot be undone and any applications using it will lose access.")) return;
    try {
      const res = await fetch(`/api/developer/keys?id=${keyId}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success) {
        alert("API Key revoked successfully.");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleTestEndpoint = async () => {
    if (!selectedKey) return;
    setSandboxLoading(true);
    try {
      const res = await fetch(`${selectedEndpoint}?api_key=${selectedKey}`);
      const json = await res.json();
      setSandboxResponse(json);
    } catch (err: any) {
      setSandboxResponse({ success: false, error: err.message });
    } finally {
      setSandboxLoading(false);
    }
  };

  const totalRequests = usage.reduce((acc, hour) => acc + hour.requests, 0);
  const avgLatency = usage.length > 0 
    ? +(usage.reduce((acc, hour) => acc + hour.latency, 0) / usage.length).toFixed(0) 
    : 0;
  const errorRate = totalRequests > 0 
    ? +((usage.reduce((acc, hour) => acc + hour.errors, 0) / totalRequests) * 100).toFixed(2)
    : 0;

  // Code snippets generator
  const getCodeSnippet = () => {
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${selectedEndpoint}` : `https://sentaient.com${selectedEndpoint}`;
    
    if (activeLang === 'curl') {
      return `curl -X GET "${fullUrl}" \\\n  -H "x-api-key: ${selectedKey || 'fq_live_YOUR_API_KEY'}"`;
    }
    if (activeLang === 'js') {
      return `fetch("${fullUrl}", {\n  headers: {\n    "x-api-key": "${selectedKey || 'fq_live_YOUR_API_KEY'}"\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data));`;
    }
    if (activeLang === 'python') {
      return `import requests\n\nurl = "${fullUrl}"\nheaders = {\n    "x-api-key": "${selectedKey || 'fq_live_YOUR_API_KEY'}"\n}\n\nresponse = requests.get(url, headers=headers)\nprint(response.json())`;
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
            <Cpu className="text-blue-400" /> B2B Developer Portal
          </h1>
          <p className="text-gray-400 mt-1">
            Access programmatic endpoints for optimized projections and system schemes (Quant-as-a-Service).
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-80 text-gray-500 text-sm gap-2">
          <RefreshCw size={16} className="animate-spin text-blue-400" /> Loading Developer environment...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Key Manager & Metrics */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Usage Metrics Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">24H API Calls</span>
                <span className="text-2xl font-black text-white mt-1">{totalRequests.toLocaleString()}</span>
              </div>
              <div className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Avg Latency</span>
                <span className="text-2xl font-black text-indigo-400 mt-1">{avgLatency}ms</span>
              </div>
              <div className="bg-gray-900 border border-gray-850 p-4 rounded-2xl flex flex-col justify-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Error Rate</span>
                <span className="text-2xl font-black text-orange-400 mt-1">{errorRate}%</span>
              </div>
            </div>

            {/* Latency & Calls Charts */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <BarChart3 size={14} className="text-blue-400" /> Request Volume & Latency Performance
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} />
                    <YAxis stroke="#4b5563" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                    <Area type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" name="Requests" />
                    <Area type="monotone" dataKey="latency" stroke="#818cf8" strokeWidth={1.5} fillOpacity={0} name="Latency (ms)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* API Keys Manager */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-850 pb-4">
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  <Key size={18} className="text-gray-400" /> API Keys
                </h3>
              </div>

              {/* Generate Key Form */}
              <form onSubmit={handleGenerateKey} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Key Label (e.g. iOS App, Analytics Script)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none focus:border-blue-500/50"
                  required
                />
                <button
                  type="submit"
                  disabled={creatingKey}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl text-xs font-black transition-all"
                >
                  {creatingKey ? <RefreshCw size={12} className="animate-spin" /> : "Generate Key"}
                </button>
              </form>

              <div className="space-y-2 pt-2">
                {keys.map((key) => {
                  const maskedKey = `${key.key_value.substring(0, 12)}...${key.key_value.substring(key.key_value.length - 6)}`;
                  const isRevoked = key.status === 'revoked';

                  return (
                    <div key={key.id} className={`p-4 bg-gray-950 rounded-xl border border-gray-850 flex items-center justify-between ${isRevoked ? 'opacity-40' : ''}`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{key.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                            key.tier === 'pro' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-gray-800 text-gray-400 border border-gray-700'
                          }`}>
                            {key.tier} Tier
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono text-gray-500">{maskedKey}</code>
                          {!isRevoked && (
                            <button
                              onClick={() => copyToClipboard(key.key_value, key.id)}
                              className="text-gray-500 hover:text-gray-300 transition-colors"
                              title="Copy API Key"
                            >
                              {copiedKeyId === key.id ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right text-xs">
                          <div className="font-bold text-white">{key.usage_count.toLocaleString()}</div>
                          <div className="text-[9px] text-gray-500 uppercase">Requests (Limit: {key.usage_limit})</div>
                        </div>

                        {!isRevoked && (
                          <button
                            onClick={() => handleRevokeKey(key.id)}
                            className="p-2 hover:bg-red-500/10 text-gray-600 hover:text-red-400 rounded-lg transition-all"
                            title="Revoke Key"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Documentation & Sandbox Sandbox */}
          <div className="space-y-6">
            
            {/* Sandbox Playground */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Play size={14} className="text-indigo-400" /> API Sandbox Playground
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase block mb-1">Select Authorization Key</label>
                  <select
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none text-white font-mono"
                  >
                    {keys.filter(k => k.status === 'active').map(k => (
                      <option key={k.id} value={k.key_value}>{k.name} ({k.key_value.substring(0, 12)}...)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase block mb-1">Select Endpoint</label>
                  <select
                    value={selectedEndpoint}
                    onChange={(e) => setSelectedEndpoint(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-850 rounded-xl text-xs focus:outline-none text-white font-mono"
                  >
                    <option value="/api/v1/projections">GET /api/v1/projections (Player projections feed)</option>
                    <option value="/api/v1/coaches">GET /api/v1/coaches (Coaching system evaluations)</option>
                  </select>
                </div>

                <button
                  onClick={handleTestEndpoint}
                  disabled={sandboxLoading || !selectedKey}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-850 text-white rounded-xl text-xs font-black shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all flex items-center justify-center gap-1.5"
                >
                  {sandboxLoading ? <RefreshCw size={12} className="animate-spin" /> : <><Send size={12} /> Send Request</>}
                </button>
              </div>

              {sandboxResponse && (
                <div className="space-y-1.5">
                  <div className="text-[9px] text-gray-500 uppercase font-black">Response JSON</div>
                  <pre className="p-3 bg-gray-950 border border-gray-850 rounded-xl text-[10px] font-mono text-green-400 overflow-x-auto max-h-56">
                    {JSON.stringify(sandboxResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Quickstart Docs */}
            <div className="bg-gray-900 border border-gray-850 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Terminal size={14} className="text-gray-400" /> Quickstart Documentation
              </h3>

              <div className="flex bg-gray-950 p-1 border border-gray-850 rounded-lg gap-1">
                {(['curl', 'js', 'python'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`flex-1 py-1 text-[10px] font-black uppercase rounded transition-all ${
                      activeLang === lang ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {lang === 'js' ? 'JavaScript' : lang}
                  </button>
                ))}
              </div>

              <div className="relative">
                <pre className="p-3 bg-gray-950 border border-gray-850 rounded-xl text-[10px] font-mono text-gray-300 overflow-x-auto leading-relaxed select-all">
                  {getCodeSnippet()}
                </pre>
              </div>

              <div className="pt-2 text-[10px] text-gray-500 leading-relaxed space-y-1">
                <div className="font-bold text-gray-400">Notes:</div>
                <p>• Programmatic access operates at maximum bandwidth. Default request limit is reset monthly.</p>
                <p>• Custom integrations or enterprise-limit requests can be configured by contacting B2B sales.</p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
