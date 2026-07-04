'use client';
import React, { useState, useEffect } from 'react';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { DriveExplorer } from '@/components/drive/DriveExplorer';

export default function BrandDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'knowledge';
  
  const { brands, setActiveWorkspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [brandData, setBrandData] = useState<any>(null);

  const brand = brands.find(b => b.id === params.id);

  useEffect(() => {
    if (!params.id) return;
    const unsubscribe = onSnapshot(doc(db, 'brands', params.id), (docSnap) => {
      if (docSnap.exists()) {
        setBrandData({ id: docSnap.id, ...docSnap.data() });
      } else if (brand) {
        // Fallback to provider data if doc doesn't exist yet but is in context
        setBrandData(brand);
      }
    });
    return () => unsubscribe();
  }, [params.id, brand]);

  if (!brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#60a9ff] border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading Brand Context...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={() => router.push('/brands')}
          className="text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-colors font-medium text-sm"
        >
          ← Back to Hub
        </button>

        <header className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm">
              {brandData.name}
            </h1>
            <span className="px-3 py-1 bg-white/10 border border-white/20 text-gray-300 text-xs font-bold rounded-full uppercase tracking-wider">
              {brandData.role}
            </span>
          </div>
          <p className="text-gray-400 font-medium tracking-wide">
            Workspace context is synced across all studios for this brand.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-white/10 mb-8 overflow-x-auto">
          {['knowledge', 'assets', 'brainstorm'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab 
                  ? 'border-[#60a9ff] text-[#60a9ff]' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'knowledge' ? 'Strategy & Knowledge' : tab === 'assets' ? 'Asset Library' : 'Brainstorming'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl min-h-[500px]">
          {activeTab === 'knowledge' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Brand Guidelines</h2>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all">
                  Edit Guidelines
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-[#60a9ff] font-bold mb-3 uppercase tracking-wider text-xs">Target Audience</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Tech-savvy professionals aged 25-45 looking for AI automation tools. High emphasis on productivity and ROI.
                  </p>
                </div>
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-[#60a9ff] font-bold mb-3 uppercase tracking-wider text-xs">Tone of Voice</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Authoritative, innovative, yet accessible. Avoid overly dense jargon. Focus on actionable insights.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DriveExplorer brandId={brandData.id} />
            </div>
          )}

          {activeTab === 'brainstorm' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6">Campaign Scratchpad</h2>
              <textarea 
                className="w-full h-64 bg-black/20 border border-white/10 rounded-2xl p-6 text-white focus:ring-2 focus:ring-[#60a9ff] resize-none outline-none"
                placeholder="Draft ideas, hook variations, and rough scripts here..."
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button className="px-6 py-2 bg-[#60a9ff]/20 text-[#60a9ff] hover:bg-[#60a9ff]/30 font-bold rounded-xl transition-all border border-[#60a9ff]/30">
                  Save Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
