'use client';

import React, { useState, useEffect } from 'react';
import { Database, LayoutTemplate, Lock, Loader2 } from '@/components/icons';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function DataStudioPage() {
  const [isMaxTier, setIsMaxTier] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'nocodb' | 'databasement'>('nocodb');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTier() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsMaxTier(false);
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase.from('users').select('tier').eq('id', user.id).single();
      setIsMaxTier(profile?.tier === 'max' || profile?.tier === 'pro');
      setLoading(false);
    }
    checkTier();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-blue-500" /></div>;
  }

  if (!isMaxTier) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-57px)] bg-[#0b0c10] text-gray-400 p-8">
        <Lock size={64} className="text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2 tracking-wide">Data Studio Locked</h1>
        <p className="text-center max-w-md text-sm mb-6 leading-relaxed">
          The Raw Data Studio (NocoDB & Databasement Embeds) is reserved for Pro and Max tier users. 
          Upgrade your account to get raw access to the underlying relational datasets and visual schema explorers.
        </p>
        <Link 
          href="/pricing"
          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
        >
          Upgrade Now
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] bg-[#0b0c10] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-[#0f1115]">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Database size={16} className="text-blue-400" /> Data Studio
          </h1>
          <div className="flex p-0.5 bg-white/[0.03] border border-white/[0.06] rounded-lg ml-4">
            <button 
              onClick={() => setActiveTab('nocodb')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'nocodb' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <LayoutTemplate size={14} /> NocoDB
            </button>
            <button 
              onClick={() => setActiveTab('databasement')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'databasement' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Database size={14} /> Databasement
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Read-Replica
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/[0.02]">
        {activeTab === 'nocodb' && (
          <iframe 
            src="http://localhost:8080/dashboard" 
            className="w-full h-full border-none"
            title="NocoDB Embed"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        )}
        {activeTab === 'databasement' && (
          <iframe 
            src="http://localhost:3002" 
            className="w-full h-full border-none"
            title="Databasement Embed"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        )}
      </div>
    </div>
  );
}
