"use client";
import React, { useState, useMemo } from 'react';
import { 
  CURATED_MEDICINAL_FLORA, 
  FloraSpecies, 
  FloraNaturopathicEngine,
  FloraCategory 
} from '../lib/intelligence/floraNaturopathicEngine';
import { 
  Sprout, 
  Search, 
  X, 
  HeartPulse, 
  Sparkles, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Droplet,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface FloraNaturopathicModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewportBounds?: { west: number; south: number; east: number; north: number };
  onFlyToPlant?: (coords: [number, number], zoom?: number) => void;
  selectedPlantId?: string | null;
}

export const FloraNaturopathicModal: React.FC<FloraNaturopathicModalProps> = ({
  isOpen,
  onClose,
  viewportBounds,
  onFlyToPlant,
  selectedPlantId
}) => {
  const [activeTab, setActiveTab] = useState<'viewport' | 'materia_medica' | 'phytochemistry'>('viewport');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | FloraCategory>('all');
  const [organFilter, setOrganFilter] = useState<string>('all');
  const [activePlantId, setActivePlantId] = useState<string>(selectedPlantId || CURATED_MEDICINAL_FLORA[0].id);

  // Sync selectedPlantId prop
  React.useEffect(() => {
    if (selectedPlantId) {
      setActivePlantId(selectedPlantId);
      setActiveTab('materia_medica');
    }
  }, [selectedPlantId]);

  // Viewport-aware evaluation
  const viewportResult = useMemo(() => {
    const bounds = viewportBounds || { west: -125, south: 25, east: -70, north: 50 };
    return FloraNaturopathicEngine.getFloraForViewport(bounds, 5);
  }, [viewportBounds]);

  const activePlant = useMemo(() => {
    return CURATED_MEDICINAL_FLORA.find(p => p.id === activePlantId) || CURATED_MEDICINAL_FLORA[0];
  }, [activePlantId]);

  const filteredSpecies = useMemo(() => {
    const list = activeTab === 'viewport' ? viewportResult.species : CURATED_MEDICINAL_FLORA;
    return list.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (organFilter !== 'all' && !p.phytochemistry.organAffinity.includes(organFilter as any)) return false;
      
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.commonName.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.phytochemistry.keyCompounds.some(c => c.toLowerCase().includes(q)) ||
        p.naturopathy.primaryTherapeuticUses.some(u => u.toLowerCase().includes(q)) ||
        p.homeopathy.primaryRemedyName.toLowerCase().includes(q)
      );
    });
  }, [activeTab, viewportResult.species, categoryFilter, organFilter, searchQuery]);

  if (!isOpen) return null;

  return (
    <div 
      data-testid="flora-naturopathic-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md font-mono select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-slate-950 border border-emerald-800/80 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-emerald-900/60 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-900/50 border border-emerald-500/60 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sprout size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wider text-emerald-200">
                  NATIVE MEDICINAL FLORA & NATUROPATHIC INTEL
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/70 text-emerald-300 border border-emerald-600 font-bold">
                  {viewportResult.species.length} IN VIEWPORT
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Phytochemicals • Clinical Naturopathy • Homeopathic Materia Medica • Viewport Bio-Prospecting
              </p>
            </div>
          </div>
          <button 
            type="button"
            data-testid="btn-close-flora-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 bg-black/50 px-5 pt-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('viewport')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'viewport'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Compass size={14} />
            <span>Viewport Bio-Survey ({viewportResult.species.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('materia_medica')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'materia_medica'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BookOpen size={14} />
            <span>Materia Medica & Monograph</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('phytochemistry')}
            className={`pb-2.5 px-3 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'phytochemistry'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles size={14} />
            <span>Phytochemical Taxonomy</span>
          </button>
        </div>

        {/* Filters & Search Bar (Zero Sliders Rule) */}
        <div className="p-3 px-5 bg-slate-900/50 border-b border-gray-800 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'tree', 'herb', 'flower', 'fungi', 'shrub_succulent'] as const).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    categoryFilter === cat
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-black/40 text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {cat === 'shrub_succulent' ? 'Shrub / Succulent' : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-[10px] text-gray-500 mr-1">AFFINITY:</span>
              {['all', 'Immune', 'Nervous', 'Respiratory', 'Musculoskeletal', 'Integumentary'].map(org => (
                <button
                  key={org}
                  type="button"
                  onClick={() => setOrganFilter(org)}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all ${
                    organFilter === org
                      ? 'bg-cyan-700 text-white'
                      : 'bg-black/30 text-gray-400 hover:text-gray-200 border border-gray-800'
                  }`}
                >
                  {org}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search botanical species, phytochemicals (Shikimic acid, Quercetin), remedy name, or organ affinities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-gray-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-gray-300 flex-1">
          
          {/* TAB 1: VIEWPORT BIO-SURVEY */}
          {activeTab === 'viewport' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-emerald-300 block">MAP VIEWPORT ECOREGIONS</span>
                  <p className="text-[11px] text-gray-400">{viewportResult.summary}</p>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">{viewportResult.species.length} Species Identified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSpecies.map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => {
                      setActivePlantId(plant.id);
                      setActiveTab('materia_medica');
                    }}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-gray-800 hover:border-emerald-600 hover:bg-slate-800/60 transition-all cursor-pointer flex flex-col justify-between gap-2 group"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{plant.icon}</span>
                          <div>
                            <span className="font-bold text-white text-xs group-hover:text-emerald-300 transition-colors">
                              {plant.commonName}
                            </span>
                            <span className="block text-[10px] text-gray-400 italic">
                              {plant.scientificName} ({plant.family})
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                          {plant.category}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-[11px]">
                        <p><strong className="text-gray-400">Phytochemical Class:</strong> <span className="text-emerald-400">{plant.phytochemistry.primaryClass}</span></p>
                        <p><strong className="text-gray-400">Key Actives:</strong> <span className="text-gray-200">{plant.phytochemistry.keyCompounds.slice(0, 3).join(', ')}</span></p>
                        <p><strong className="text-gray-400">Naturopathic Role:</strong> <span className="text-cyan-300">{plant.naturopathy.primaryTherapeuticUses[0]}</span></p>
                        <p><strong className="text-gray-400">Homeopathic Key:</strong> <span className="text-amber-300">{plant.homeopathy.primaryRemedyName} ({plant.homeopathy.commonPotencies[0]})</span></p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400">
                      <span>Harvest: {plant.floweringHarvestWindow.split('(')[0]}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore Dossier <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MATERIA MEDICA & MONOGRAPH */}
          {activeTab === 'materia_medica' && activePlant && (
            <div className="space-y-4">
              
              {/* Plant Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-600/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 rounded-xl bg-black/40 border border-emerald-700/60">{activePlant.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{activePlant.commonName}</span>
                      <span className="text-xs text-emerald-400 font-normal italic">({activePlant.scientificName})</span>
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Family: {activePlant.family} • Category: {activePlant.category.toUpperCase()} • Growth: {activePlant.activeGrowthSeason}
                    </p>
                  </div>
                </div>

                {activePlant.primaryLocations?.[0] && onFlyToPlant && (
                  <button
                    type="button"
                    onClick={() => {
                      onFlyToPlant(activePlant.primaryLocations[0].coordinates, 8);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Compass size={13} />
                    <span>Fly to Habitat ({activePlant.primaryLocations[0].name.split(',')[0]})</span>
                  </button>
                )}
              </div>

              {/* Grid: 3 Pillars (Phytochemistry, Naturopathy, Homeopathy) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* 1. Phytochemistry & Molecular Actions */}
                <div className="bg-slate-900/80 border border-emerald-900/80 p-3.5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-gray-800 pb-1.5">
                    <Sparkles size={15} />
                    <span>Chemical Composition</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <p><strong className="text-gray-400">Primary Class:</strong> <span className="text-emerald-300 font-bold">{activePlant.phytochemistry.primaryClass}</span></p>
                    <div>
                      <strong className="text-gray-400 block mb-1">Key Phytochemicals:</strong>
                      <div className="flex flex-wrap gap-1">
                        {activePlant.phytochemistry.keyCompounds.map((c, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-800 text-[10px]">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-1">
                      <strong className="text-gray-400 block mb-0.5">Pharmacological Mechanism:</strong>
                      <p className="text-gray-300 leading-relaxed text-[10px] bg-black/40 p-2 rounded border border-gray-800">
                        {activePlant.phytochemistry.mechanismOfAction}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Evidence-Based Naturopathic Therapeutics */}
                <div className="bg-slate-900/80 border border-cyan-900/80 p-3.5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-gray-800 pb-1.5">
                    <HeartPulse size={15} />
                    <span>Naturopathic Health Benefits</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Clinical Grade:</span>
                      <span className="font-bold text-cyan-300">{activePlant.naturopathy.clinicalEvidenceGrade}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 block mb-1">Therapeutic Indications:</strong>
                      <ul className="space-y-1 text-gray-300 text-[10px]">
                        {activePlant.naturopathy.primaryTherapeuticUses.map((u, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-1">
                      <strong className="text-gray-400 block mb-0.5">Preparations:</strong>
                      <p className="text-cyan-200 text-[10px]">{activePlant.naturopathy.preparations.join(' • ')}</p>
                    </div>
                    <div className="p-2 rounded bg-red-950/50 border border-red-800/60 text-[10px] text-red-300">
                      <strong>Caution / Contraindications:</strong> {activePlant.naturopathy.contraindications.join(' ')}
                    </div>
                  </div>
                </div>

                {/* 3. Classical Homeopathic Materia Medica */}
                <div className="bg-slate-900/80 border border-amber-900/80 p-3.5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-gray-800 pb-1.5">
                    <Droplet size={15} />
                    <span>Homeopathic Materia Medica</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <span className="text-gray-400 block">Homeopathic Latin Title:</span>
                      <span className="font-bold text-amber-300 text-xs">{activePlant.homeopathy.primaryRemedyName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Common Potencies:</span>
                      <span className="text-white font-mono text-[10px]">{activePlant.homeopathy.commonPotencies.join(', ')}</span>
                    </div>
                    <div>
                      <strong className="text-gray-400 block mb-0.5">Keynote Indication:</strong>
                      <p className="text-gray-300 text-[10px] leading-relaxed bg-black/40 p-2 rounded border border-gray-800">
                        {activePlant.homeopathy.keynoteIndication}
                      </p>
                    </div>
                    <div>
                      <strong className="text-gray-400 block mb-0.5">Modalities (Heat/Cold/Motion):</strong>
                      <p className="text-amber-200 text-[10px]">{activePlant.homeopathy.modalityWarmthCold}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Foraging Ethics & Habitat Locations */}
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-gray-800 text-[11px] space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck size={15} />
                  <span>Sustainable Foraging Ethics & Regional Habitats</span>
                </div>
                <p className="text-gray-300 text-[11px]">{activePlant.foragingEthicsAdvisory}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activePlant.primaryLocations.map((loc, i) => (
                    <div key={i} className="px-2.5 py-1 rounded-lg bg-black/50 border border-gray-800 flex items-center gap-2 text-[10px]">
                      <span className="text-gray-400">{loc.name}</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                        {loc.densityLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PHYTOCHEMICAL TAXONOMY */}
          {activeTab === 'phytochemistry' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-gray-800 text-[11px] leading-relaxed">
                <h4 className="font-bold text-white mb-1">PHYTOCHEMICAL TAXONOMY & ACTIVE MOLECULES</h4>
                <p className="text-gray-400">
                  Medicinal actions of wild plants derive from secondary metabolites synthesized for plant defense, UV protection, and communication. Here is the biochemical taxonomy across all mapped species:
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Terpenoids & Resins',
                    color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
                    desc: 'Lipophilic hydrocarbon molecules (monoterpenes, sesquiterpenes, diterpenes) that penetrate the blood-brain barrier and pulmonary tissue.',
                    species: CURATED_MEDICINAL_FLORA.filter(p => p.phytochemistry.primaryClass === 'Terpenoids & Resins')
                  },
                  {
                    title: 'Polyphenols, Flavonoids & Anthocyanins',
                    color: 'text-purple-400 border-purple-800 bg-purple-950/40',
                    desc: 'Potent phenolic antioxidants neutralizing reactive oxygen species (ROS), protecting micro-capillaries, and blocking viral attachment.',
                    species: CURATED_MEDICINAL_FLORA.filter(p => p.phytochemistry.primaryClass === 'Polyphenols & Flavonoids')
                  },
                  {
                    title: 'Polysaccharides & Beta-Glucans',
                    color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40',
                    desc: 'Complex carbohydrate branching polymers that bind leukocyte TLR and Dectin receptors, activating innate immune surveillance.',
                    species: CURATED_MEDICINAL_FLORA.filter(p => p.phytochemistry.primaryClass === 'Polysaccharides & Beta-Glucans')
                  },
                  {
                    title: 'Alkaloids & Nitrogenous Actives',
                    color: 'text-amber-400 border-amber-800 bg-amber-950/40',
                    desc: 'Nitrogen-containing ring structures with profound physiological actions on neurotransmitter systems, smooth muscle, and cellular mitosis.',
                    species: CURATED_MEDICINAL_FLORA.filter(p => p.phytochemistry.primaryClass === 'Alkaloids')
                  },
                  {
                    title: 'Glycosides & Saponins',
                    color: 'text-lime-400 border-lime-800 bg-lime-950/40',
                    desc: 'Aglycone molecules bonded to sugar moieties that release pharmacologically active compounds upon digestive enzymatic cleavage.',
                    species: CURATED_MEDICINAL_FLORA.filter(p => p.phytochemistry.primaryClass === 'Glycosides & Saponins')
                  }
                ].map((group, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border ${group.color} space-y-2`}>
                    <h5 className="font-bold text-xs flex items-center justify-between">
                      <span>{group.title}</span>
                      <span className="text-[10px] text-gray-400">{group.species.length} Species Cataloged</span>
                    </h5>
                    <p className="text-[11px] text-gray-300">{group.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {group.species.map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setActivePlantId(s.id);
                            setActiveTab('materia_medica');
                          }}
                          className="px-2.5 py-1 rounded bg-black/60 hover:bg-black/90 border border-white/10 text-[10px] text-white flex items-center gap-1.5 transition-colors"
                        >
                          <span>{s.icon}</span>
                          <span>{s.commonName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 px-5 border-t border-gray-800 bg-black/60 flex items-center justify-between text-[11px] text-gray-400">
          <span>Sphinx Botanical Intelligence • Evidence-Based Phytotherapy</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
