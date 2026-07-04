'use client';
import React, { useState } from 'react';
import { useWorkspace } from '@/components/providers/WorkspaceProvider';
import { useRouter } from 'next/navigation';

export default function BrandsHub() {
  const { activeWorkspace, setActiveWorkspace, brands, addBrand } = useWorkspace();
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandRole, setNewBrandRole] = useState('Client');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName) return;
    
    setIsSubmitting(true);
    try {
      await addBrand({ name: newBrandName, role: newBrandRole });
      setShowModal(false);
      setNewBrandName('');
      setNewBrandRole('Client');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between text-center md:text-left gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#60a9ff] drop-shadow-sm mb-2">
              Brand Knowledge Hub
            </h1>
            <p className="text-gray-300 font-medium tracking-wide">Centralized housing for brand strategy, assets, and active workspaces.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#60a9ff]/25 tracking-wide"
          >
            + Onboard New Brand
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map(brand => {
            const isActive = activeWorkspace === brand.id;
            return (
              <div 
                key={brand.id}
                className={`flex flex-col bg-white/5 border rounded-3xl p-6 backdrop-blur-xl transition-all shadow-xl relative overflow-hidden group ${
                  isActive ? 'border-[#60a9ff]/50 bg-white/10' : 'border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#60a9ff]/20 blur-3xl -mr-16 -mt-16 rounded-full" />
                )}

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-wide">{brand.name}</h2>
                    <p className="text-xs text-[#60a9ff] font-bold uppercase tracking-wider mt-1">{brand.role}</p>
                  </div>
                  {isActive && (
                    <span className="px-3 py-1 bg-[#60a9ff]/20 text-[#60a9ff] text-xs font-bold rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex gap-4 mb-8">
                  <div className="flex-1 bg-black/20 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Assets</p>
                    <p className="text-2xl font-bold">{brand.assets}</p>
                  </div>
                  <div className="flex-1 bg-black/20 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Active</p>
                    <p className="text-2xl font-bold">{brand.activeCampaigns}</p>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 z-10 relative">
                  <button 
                    onClick={() => setActiveWorkspace(brand.id)}
                    disabled={isActive}
                    className={`col-span-2 py-3 rounded-xl font-bold text-sm transition-all ${
                      isActive 
                        ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10' 
                        : 'bg-[#60a9ff]/20 hover:bg-[#60a9ff]/40 text-[#60a9ff] border border-[#60a9ff]/30'
                    }`}
                  >
                    {isActive ? 'Current Workspace' : 'Switch Workspace'}
                  </button>
                  <button 
                    onClick={() => router.push(`/brands/${brand.id}?tab=knowledge`)}
                    className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-xs text-gray-300 transition-all"
                  >
                    Knowledge Base
                  </button>
                  <button 
                    onClick={() => router.push(`/brands/${brand.id}?tab=assets`)}
                    className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-xs text-gray-300 transition-all"
                  >
                    Asset Library
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Onboarding New Brand */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-white tracking-wide">Onboard New Brand</h2>
            <form onSubmit={handleAddBrand} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#60a9ff] text-white"
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role / Type</label>
                <select 
                  value={newBrandRole}
                  onChange={(e) => setNewBrandRole(e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#60a9ff] text-white [&>option]:bg-gray-800"
                >
                  <option value="Client">Client</option>
                  <option value="Internal">Internal</option>
                  <option value="Partner">Partner</option>
                  <option value="Agency Admin">Agency Admin</option>
                </select>
              </div>
              <div className="flex gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#60a9ff] hover:bg-[#4a85cc] text-white font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
