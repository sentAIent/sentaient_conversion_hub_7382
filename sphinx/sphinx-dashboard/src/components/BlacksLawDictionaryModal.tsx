"use client";
import React, { useState, useMemo } from 'react';
import { X, Search, Scale, BookOpen, ShieldCheck, ExternalLink, Filter, Sparkles, FileText, ChevronRight, Bookmark } from 'lucide-react';
import { BLACKS_LAW_ENTRIES, CLASSICAL_LEGAL_MAXIMS, BlacksLawEntry, LegalMaximEntry, searchBlacksLaw } from '../lib/intelligence/blacksLawDictionary';

interface BlacksLawDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAI?: (query: string) => void;
}

export const BlacksLawDictionaryModal: React.FC<BlacksLawDictionaryModalProps> = ({
  isOpen,
  onClose,
  onAskAI
}) => {
  const [activeTab, setActiveTab] = useState<'TERMS' | 'MAXIMS'>('TERMS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<BlacksLawEntry>(BLACKS_LAW_ENTRIES[0]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLACKS_LAW_ENTRIES.map(e => e.category)));
    return ['ALL', ...cats];
  }, []);

  const searchResults = useMemo(() => {
    return searchBlacksLaw(searchQuery);
  }, [searchQuery]);

  const filteredTerms = useMemo(() => {
    if (selectedCategory === 'ALL') return searchResults.entries;
    return searchResults.entries.filter(e => e.category === selectedCategory);
  }, [searchResults.entries, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[92vh] bg-neutral-950 border border-amber-500/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-gray-200 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-500/20 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-amber-300 tracking-wider uppercase">
                  Black&apos;s Law Dictionary &amp; Classical Legal Maxims
                </h2>
                <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-700/60 px-1.5 py-0.5 rounded font-mono font-bold">
                  1st–6th ED. JURISPRUDENCE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Authoritative legal definitions, statutory vs. common-law canons, and binding judicial precedents
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs & Search Controls */}
        <div className="p-3 bg-neutral-900/50 border-b border-white/5 space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('TERMS')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'TERMS' ? 'bg-amber-950 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Definitions &amp; Terms ({BLACKS_LAW_ENTRIES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('MAXIMS')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'MAXIMS' ? 'bg-amber-950 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Classical Latin Maxims ({CLASSICAL_LEGAL_MAXIMS.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search term, doctrine, or Latin maxim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/60 border border-white/15 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Category Chips (Zero-Slider Rule) */}
          {activeTab === 'TERMS' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider pl-1 pr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border text-[10px] font-semibold ${selectedCategory === cat ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.25)]' : 'bg-black/30 border-white/10 text-gray-400 hover:text-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body: Two-Column Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {activeTab === 'TERMS' ? (
            <>
              {/* Left Column: Term List */}
              <div className="w-1/3 min-w-[240px] max-w-[320px] border-r border-white/10 bg-neutral-900/30 overflow-y-auto p-2 space-y-1">
                {filteredTerms.map(entry => {
                  const isSelected = selectedTerm.term === entry.term;
                  return (
                    <button
                      key={entry.term}
                      type="button"
                      onClick={() => setSelectedTerm(entry)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all flex flex-col gap-1 ${isSelected ? 'bg-amber-950/50 border-amber-400 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]' : 'bg-black/30 border-white/5 text-gray-300 hover:bg-white/5'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-200">{entry.term}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-gray-600'}`} />
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">{entry.category}</span>
                      <p className="text-[10px] text-gray-400 line-clamp-2">
                        {entry.editions[0]?.definition}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Detailed Term Dossier */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-amber-300 tracking-wide uppercase">
                        {selectedTerm.term}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 border border-amber-600/60 text-amber-300">
                        {selectedTerm.category}
                      </span>
                    </div>
                    {selectedTerm.etymology && (
                      <p className="text-xs text-gray-500 font-mono mt-0.5">Etymology: {selectedTerm.etymology}</p>
                    )}
                  </div>
                  {onAskAI && (
                    <button
                      type="button"
                      onClick={() => onAskAI(`Explain the Black's Law Dictionary definition of ${selectedTerm.term} and its constitutional protections`)}
                      className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/60 text-amber-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI Dossier</span>
                    </button>
                  )}
                </div>

                {/* Editions Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                    <span>Historical Edition Definitions:</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedTerm.editions.map(ed => (
                      <div key={ed.edition} className="p-3 rounded-lg bg-black/50 border border-white/10 space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-mono text-amber-400 font-bold">
                          <span>{ed.edition}</span>
                          {ed.pageOrCite && <span className="text-gray-500">{ed.pageOrCite}</span>}
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed italic">
                          &ldquo;{ed.definition}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statutory vs Common Law Distinctions */}
                {selectedTerm.statutoryVsCommonLaw && (
                  <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5" />
                      <span>Statutory Code vs. Common Law Distinction:</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase">Statutory Meaning</span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedTerm.statutoryVsCommonLaw.statutoryMeaning}
                        </p>
                      </div>
                      <div className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Common Law Definition</span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedTerm.statutoryVsCommonLaw.commonLawMeaning}
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-amber-950/40 border border-amber-700/50 text-[11px] text-amber-200 font-mono">
                      <strong>Critical Legal Rule:</strong> {selectedTerm.statutoryVsCommonLaw.criticalDistinction}
                    </div>
                  </div>
                )}

                {/* Key Precedents */}
                {selectedTerm.keyPrecedents.length > 0 && (
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Binding Judicial Precedents:</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTerm.keyPrecedents.map(p => (
                        <span key={p} className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-xs font-mono text-cyan-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practical Field & Courtroom Application */}
                {selectedTerm.practicalApplication && (
                  <div className="p-3 rounded-lg bg-neutral-900 border border-white/10 space-y-1">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      🛡️ Practical Field &amp; Courtroom Application
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {selectedTerm.practicalApplication}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Classical Latin Maxims Table */
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.maxims.map(m => (
                  <div key={m.latin} className="p-3.5 rounded-lg bg-black/50 border border-white/10 hover:border-amber-500/40 transition-colors space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-amber-300 italic font-serif">
                          {m.latin}
                        </h4>
                        <p className="text-xs font-semibold text-gray-200">
                          &ldquo;{m.english}&rdquo;
                        </p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-800 border border-white/10 text-amber-400">
                        {m.branch}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {m.meaning}
                    </p>
                    <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Significance: {m.legalSignificance.slice(0, 50)}...</span>
                      {onAskAI && (
                        <button
                          type="button"
                          onClick={() => onAskAI(`Explain the Latin legal maxim "${m.latin}" (${m.english}) and how to apply it in court`)}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                        >
                          <span>Ask AI</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
