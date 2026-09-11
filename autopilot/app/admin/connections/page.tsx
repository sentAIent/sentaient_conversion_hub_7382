"use client";

import React, { useState, useEffect } from 'react';
import { Network, Link as LinkIcon, Unlink, ExternalLink, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

type ConnectionStatus = {
  tiktok: boolean;
  meta: boolean;
  linkedin: boolean;
  x: boolean;
};

export default function ConnectionsAdmin() {
  const [status, setStatus] = useState<ConnectionStatus>({
    tiktok: false,
    meta: false,
    linkedin: false,
    x: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      // In development, the proxy is usually running on 8080 or next.js rewrites
      const res = await fetch('http://localhost:8080/admin/credentials/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
    } catch (err: any) {
      console.error("Failed to fetch connection status", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (platform: string) => {
    // Redirects to our backend init route which redirects to the OAuth provider
    window.location.href = `http://localhost:8080/api/auth/${platform}/init`;
  };

  const platforms = [
    {
      id: 'tiktok',
      name: 'TikTok',
      color: 'bg-[#ff0050]',
      hoverColor: 'hover:bg-[#ff0050]/80',
      textColor: 'text-[#ff0050]',
      borderColor: 'border-[#ff0050]',
      desc: 'Connect your TikTok account to enable autonomous video publishing.'
    },
    {
      id: 'meta',
      name: 'Instagram / Meta',
      color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]',
      hoverColor: 'hover:opacity-80',
      textColor: 'text-[#ee2a7b]',
      borderColor: 'border-[#ee2a7b]',
      desc: 'Connect your Instagram Professional account for autonomous Reels.'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      color: 'bg-[#0077b5]',
      hoverColor: 'hover:bg-[#0077b5]/80',
      textColor: 'text-[#0077b5]',
      borderColor: 'border-[#0077b5]',
      desc: 'Connect LinkedIn to publish thought leadership content.'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      color: 'bg-neutral-800',
      hoverColor: 'hover:bg-neutral-700',
      textColor: 'text-neutral-400',
      borderColor: 'border-neutral-500',
      desc: 'Connect X to publish viral threads and tweets.'
    }
  ];

  if (loading) return <div className="p-8 text-white">Loading Connections...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            <Network className="w-8 h-8 text-emerald-400" />
            Social Connections
          </h1>
          <p className="text-neutral-400 mt-2">
            Securely link your brand accounts using OAuth to enable autonomous publishing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => {
            const isConnected = status[platform.id as keyof ConnectionStatus];
            
            return (
              <div 
                key={platform.id} 
                className={`bg-neutral-900 border rounded-xl p-6 shadow-xl relative overflow-hidden transition-all ${
                  isConnected ? 'border-emerald-500/50' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      {platform.name}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">{platform.desc}</p>
                  </div>
                  {isConnected ? (
                    <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4" />
                      Connected
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-neutral-800 text-neutral-400 px-3 py-1 rounded-full text-xs font-bold border border-neutral-700">
                      <Unlink className="w-4 h-4" />
                      Not Connected
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-neutral-800/50 flex justify-end">
                  {isConnected ? (
                    <button 
                      className="text-sm text-neutral-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                      onClick={() => toast.error("Disconnecting accounts must be done in the respective app's settings.")}
                    >
                      Revoke Access
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(platform.id)}
                      className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all ${platform.color} ${platform.hoverColor}`}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Connect {platform.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
