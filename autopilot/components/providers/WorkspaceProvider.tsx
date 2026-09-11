'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { secureStorage } from '../../utils/secureStorage';
import { supabase } from '@/lib/supabase';

export type Brand = {
  id: string;
  name: string;
  role: string;
  assets: number;
  activeCampaigns: number;
};

type WorkspaceContextType = {
  activeWorkspace: string;
  setActiveWorkspace: (workspace: string) => void;
  brands: Brand[];
  addBrand: (brand: Omit<Brand, 'id' | 'assets' | 'activeCampaigns'>) => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspace, setActiveWorkspace] = useState('sentaient');
  const [brands, setBrands] = useState<Brand[]>([]);

  // Initialize and Sync to local storage
  useEffect(() => {
    const saved = secureStorage.getItem('activeWorkspace');
    if (saved) {setActiveWorkspace(saved);}
  }, []);

  useEffect(() => {
    secureStorage.setItem('activeWorkspace', activeWorkspace);
  }, [activeWorkspace]);

  // Sync Brands with Supabase
  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from('brands').select('*');
      if (error || !data || data.length === 0) {
        setBrands([
          { id: 'sentaient', name: 'SentAIent Demo', role: 'Agency Admin', assets: 142, activeCampaigns: 3 },
          { id: 'cloveh2o', name: 'CloveH2O Global', role: 'Client', assets: 84, activeCampaigns: 12 },
          { id: 'mindwave', name: 'Mindwave Official', role: 'Internal', assets: 312, activeCampaigns: 5 },
        ]);
      } else {
        // Map camelCase for UI since DB might use different casing (though we used camelCase in quotes)
        setBrands(data.map(b => ({
          id: b.id,
          name: b.name,
          role: b.role,
          assets: b.assets || 0,
          activeCampaigns: b.activeCampaigns || 0
        })));
      }
    };
    
    fetchBrands();

    const subscription = supabase
      .channel('public:brands')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'brands' }, payload => {
        fetchBrands(); // Refresh on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const addBrand = async (brandData: Omit<Brand, 'id' | 'assets' | 'activeCampaigns'>) => {
    const slug = brandData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await supabase.from('brands').insert({
      id: slug,
      name: brandData.name,
      role: brandData.role,
      assets: 0,
      activeCampaigns: 0
    });
    setActiveWorkspace(slug);
  };

  return (
    <WorkspaceContext.Provider value={{ activeWorkspace, setActiveWorkspace, brands, addBrand }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
