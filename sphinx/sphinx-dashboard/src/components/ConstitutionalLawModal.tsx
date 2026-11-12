import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Scale, 
  Landmark, 
  BookOpen, 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  Compass, 
  Globe2, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  AlertTriangle, 
  Award 
} from 'lucide-react';
import { 
  US_CONSTITUTION_DATA, 
  STATE_CONSTITUTIONS_DATABASE, 
  US_TERRITORIES_DATABASE,
  StateConstitutionProfile,
  TerritoryConstitutionProfile,
  searchConstitutionalLaw
} from '../lib/intelligence/constitutionalDatabase';

interface ConstitutionalLawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'federal' | 'states' | 'territories' | 'comparison';
type FederalSubTab = 'bill_of_rights' | 'articles' | 'amendments' | 'doctrines';

export default function ConstitutionalLawModal({ isOpen, onClose }: ConstitutionalLawModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('federal');
  const [federalSubTab, setFederalSubTab] = useState<FederalSubTab>('bill_of_rights');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('CA');
  const [selectedTerritoryCode, setSelectedTerritoryCode] = useState<string>('PR');
  const [selectedComparisonTopic, setSelectedComparisonTopic] = useState<'privacy' | 'speech' | 'arms' | 'equality'>('privacy');

  const statesList = useMemo(() => {
    return Object.values(STATE_CONSTITUTIONS_DATABASE).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const territoriesList = useMemo(() => {
    return Object.values(US_TERRITORIES_DATABASE);
  }, []);

  const selectedState = useMemo(() => {
    return STATE_CONSTITUTIONS_DATABASE[selectedStateCode] || statesList[0];
  }, [selectedStateCode, statesList]);

  const selectedTerritory = useMemo(() => {
    return US_TERRITORIES_DATABASE[selectedTerritoryCode] || territoriesList[0];
  }, [selectedTerritoryCode, territoriesList]);

  // Search results across database if searchQuery is active
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchConstitutionalLaw(searchQuery);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-6xl h-[92vh] max-h-[920px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
        role="dialog"
        aria-modal="true"
        aria-labelledby="constitutional-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="constitutional-modal-title" className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  Sphinx Constitutional & Sovereign Law Repository
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-mono tracking-wider">
                    Federal • 50 States • 6 Territories
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                U.S. Federal Constitution • 50 State Declarations of Rights • State Super-Protections (Independent State Grounds) • Territory Fundamental Charters
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close Constitutional Law Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Controls & Tabs */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('federal')}
              className={'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ' + (
                activeTab === 'federal'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )}
            >
              <Landmark className="w-3.5 h-3.5" />
              US Constitution
            </button>
            <button
              onClick={() => setActiveTab('states')}
              className={'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ' + (
                activeTab === 'states'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              50 State Constitutions
            </button>
            <button
              onClick={() => setActiveTab('territories')}
              className={'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ' + (
                activeTab === 'territories'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )}
            >
              <Globe2 className="w-3.5 h-3.5" />
              6 US Territories
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ' + (
                activeTab === 'comparison'
                  ? 'bg-purple-500 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Super-Protections Matrix
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clauses, amendments, cases..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SEARCH OVERLAY (If query entered) */}
          {searchResults && (
            <div className="space-y-4 mb-6 p-4 rounded-xl bg-slate-900/90 border border-amber-500/40">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Search Results for "{searchQuery}"
                </span>
                <span className="text-[11px] text-slate-400">
                  {searchResults.federalMatches.length} Federal • {searchResults.stateMatches.length} States • {searchResults.territoryMatches.length} Territories
                </span>
              </div>

              {/* Federal matches */}
              {searchResults.federalMatches.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-amber-300">Federal Matches</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.federalMatches.slice(0, 6).map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs space-y-1">
                        <div className="font-semibold text-amber-400">{item.title || item.number}</div>
                        <p className="text-slate-300 text-[11px] line-clamp-2">{item.coreDoctrine || item.summary || item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* State matches */}
              {searchResults.stateMatches.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-emerald-400">State Matches</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.stateMatches.slice(0, 6).map((st) => (
                      <div 
                        key={st.code} 
                        onClick={() => { setSelectedStateCode(st.code); setActiveTab('states'); setSearchQuery(''); }}
                        className="p-3 bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-lg text-xs cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-emerald-400">{st.name} ({st.code})</span>
                          <span className="text-[10px] text-slate-500">{st.billOfRightsArticle}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] line-clamp-2">
                          {st.superProtections[0] || st.declarationOfRightsTitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Territory matches */}
              {searchResults.territoryMatches.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-cyan-400">Territory Matches</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {searchResults.territoryMatches.map((ter) => (
                      <div 
                        key={ter.code} 
                        onClick={() => { setSelectedTerritoryCode(ter.code); setActiveTab('territories'); setSearchQuery(''); }}
                        className="p-3 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 rounded-lg text-xs cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-cyan-400">{ter.name} ({ter.code})</span>
                          <span className="text-[10px] text-slate-500">{ter.politicalStatus}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] line-clamp-2">{ter.keyProtections[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: US CONSTITUTION */}
          {activeTab === 'federal' && (
            <div className="space-y-6">
              {/* Federal Subtabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: 'bill_of_rights', label: 'Bill of Rights (Amendments 1–10)' },
                  { id: 'articles', label: 'Articles I–VII (Structural Powers)' },
                  { id: 'amendments', label: 'Post-Civil War & Modern (11–27)' },
                  { id: 'doctrines', label: 'Judicial Scrutiny & Doctrines' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setFederalSubTab(st.id as FederalSubTab)}
                    className={'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ' + (
                      federalSubTab === st.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    )}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Bill of Rights */}
              {federalSubTab === 'bill_of_rights' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                    <strong>Preamble:</strong> "{US_CONSTITUTION_DATA.preamble}"
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {US_CONSTITUTION_DATA.billOfRights.map((am) => (
                      <div key={am.number} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                            <span className="text-sm font-bold text-amber-400">{am.title}</span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              Ratified {am.ratifiedYear}
                            </span>
                          </div>
                          <p className="mt-2.5 text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                            "{am.text}"
                          </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs">
                          <div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Core Doctrine:</span>
                            <span className="text-slate-200 text-xs">{am.coreDoctrine}</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-emerald-300/90">
                            <strong>Field Application:</strong> {am.fieldApplication}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles I-VII */}
              {federalSubTab === 'articles' && (
                <div className="space-y-4">
                  {US_CONSTITUTION_DATA.articles.map((art) => (
                    <div key={art.number} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-amber-400">
                          {art.number}: {art.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{art.summary}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {art.sections.map((sec, i) => (
                          <div key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                            <div className="font-semibold text-amber-300/90 text-xs">{sec.section}: {sec.heading}</div>
                            <p className="text-slate-400 text-[11px] leading-normal">{sec.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Amendments 11-27 */}
              {federalSubTab === 'amendments' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {US_CONSTITUTION_DATA.amendments11to27.map((am) => (
                    <div key={am.number} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                        <span className="font-bold text-amber-400">{am.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {am.ratifiedYear}
                        </span>
                      </div>
                      <div className="text-slate-300 text-xs">
                        <strong>Doctrine:</strong> {am.coreDoctrine}
                      </div>
                      <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                        <strong>Impact:</strong> {am.fieldApplication}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Judicial Scrutiny & Doctrines */}
              {federalSubTab === 'doctrines' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {US_CONSTITUTION_DATA.scrutinyStandards.map((std: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                        <span className="font-bold text-amber-400">{std.tier}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium">
                          {std.burden}
                        </span>
                      </div>
                      <div className="text-slate-200">
                        <strong>Standard:</strong> {std.test}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        <strong>Applied To:</strong> {std.applicability}
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        <strong>Landmark Precedent:</strong> {std.landmarkCases}
                      </div>
                    </div>
                  ))}

                  <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Incorporation Doctrine (14th Amendment Due Process)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Originally, the Bill of Rights constrained ONLY the Federal Government (<em>Barron v. Baltimore</em>, 1833). Following the Civil War and the ratification of the 14th Amendment (1868), the Supreme Court used the Due Process Clause to selectively incorporate almost all Bill of Rights provisions against State and municipal governments:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">1st Amendment</span>
                        *Gitlow v. New York* (1925), *Near v. Minnesota* (1931)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">2nd Amendment</span>
                        *McDonald v. Chicago* (2010)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">4th Amendment</span>
                        *Mapp v. Ohio* (1961), *Wolf v. Colorado* (1949)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">5th Amendment</span>
                        *Miranda v. Arizona* (1966), *Benton v. Maryland* (1969)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">6th Amendment</span>
                        *Gideon v. Wainwright* (1963)
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-emerald-400 font-semibold block">8th Amendment</span>
                        *Robinson v. California* (1962), *Timbs v. Indiana* (2019)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: 50 STATE CONSTITUTIONS */}
          {activeTab === 'states' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: State Selection List */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Select Jurisdiction (50 States)
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Total: {statesList.length}
                  </span>
                </div>

                {/* State selector chips */}
                <div className="max-h-[540px] overflow-y-auto space-y-1 pr-1">
                  {statesList.map((st) => (
                    <button
                      key={st.code}
                      onClick={() => setSelectedStateCode(st.code)}
                      className={'w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ' + (
                        selectedStateCode === st.code
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                          : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-5 rounded bg-slate-800 text-[10px] font-mono flex items-center justify-center font-bold text-slate-300">
                          {st.code}
                        </span>
                        <span>{st.name}</span>
                      </div>
                      {st.superProtections.length > 0 && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {st.superProtections.length} Super-Rights
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Selected State Dossier */}
              <div className="lg:col-span-8 space-y-4">
                {selectedState ? (
                  <div className="space-y-4">
                    {/* State Header Card */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white tracking-wide">
                              {selectedState.name} Constitution
                            </h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                              {selectedState.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {selectedState.declarationOfRightsTitle} ({selectedState.billOfRightsArticle})
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={selectedState.officialSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-colors"
                          >
                            <span>Official Text</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block">Adopted</span>
                          <span className="font-mono text-slate-200">{selectedState.adoptedYear}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block">Current Revision</span>
                          <span className="font-mono text-slate-200">{selectedState.currentRevisionYear}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 col-span-2">
                          <span className="text-[10px] text-slate-500 uppercase block">Amendment Procedure</span>
                          <span className="text-slate-300 text-[11px] truncate block">{selectedState.amendmentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* SUPER-PROTECTIONS: Independent State Grounds */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-bold text-emerald-300 tracking-wide uppercase">
                          State "Super-Protections" Exceeding Federal Floor
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Under the <strong>Independent and Adequate State Grounds Doctrine</strong> (Justice William J. Brennan Jr., 1977), the federal Bill of Rights acts as a <em>national baseline/floor</em>, not a ceiling. {selectedState.name} courts interpret state constitutional guarantees to provide citizens strictly greater protections:
                      </p>

                      <div className="space-y-2 pt-1">
                        {selectedState.superProtections.map((prot, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-xs text-emerald-200/90 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{prot}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Articles / Declaration of Rights */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        Key Constitutional Articles & Guarantees
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedState.keyArticles.map((art, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
                            <div className="font-semibold text-amber-300 text-xs">{art.citation}: {art.title}</div>
                            <p className="text-slate-400 text-[11px] leading-relaxed">{art.rightsGuaranteed}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Landmark State Supreme Court Precedents */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-slate-400" />
                        Landmark State High-Court Jurisprudence
                      </h4>
                      <div className="space-y-2.5">
                        {selectedState.landmarkStatePrecedents.map((prec, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white italic">{prec.caseName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{prec.citation} ({prec.year})</span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              <strong>Holding:</strong> {prec.holding}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-500 text-sm">
                    Select a state from the left list to view constitutional analysis.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: 6 US TERRITORIES */}
          {activeTab === 'territories' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Territory Selector */}
              <div className="lg:col-span-4 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    U.S. Territories & Federal District
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">6 Charters</span>
                </div>

                <div className="space-y-2">
                  {territoriesList.map((ter) => (
                    <button
                      key={ter.code}
                      onClick={() => setSelectedTerritoryCode(ter.code)}
                      className={'w-full text-left p-3 rounded-xl text-xs flex flex-col space-y-1 transition-colors ' + (
                        selectedTerritoryCode === ter.code
                          ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                          : 'text-slate-300 hover:bg-slate-900 border border-slate-800/80'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{ter.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono font-bold text-cyan-400">
                          {ter.code}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 truncate">{ter.politicalStatus}</span>
                    </button>
                  ))}
                </div>

                {/* Insular Cases Educational Box */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> The Insular Cases Doctrine
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Under the Supreme Court's <em>Insular Cases</em> (1901), unincorporated territories do not automatically receive all constitutional rights. Only "fundamental rights" apply ex proprio vigore (of their own force) unless extended by Congress via Organic Acts.
                  </p>
                </div>
              </div>

              {/* Territory Details */}
              <div className="lg:col-span-8 space-y-4">
                {selectedTerritory && (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white tracking-wide">
                              {selectedTerritory.name}
                            </h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                              {selectedTerritory.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {selectedTerritory.organicActOrConstitutionTitle} (Est. {selectedTerritory.yearEstablished})
                          </p>
                        </div>

                        <a
                          href={selectedTerritory.officialSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-colors"
                        >
                          <span>Official Charter</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Political Status</span>
                          <span className="text-cyan-300 font-medium">{selectedTerritory.politicalStatus}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fundamental Rights Charter</span>
                          <span className="text-slate-200">{selectedTerritory.fundamentalRightsArticle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Relationship to US Constitution */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Constitutional Relationship & Applicability
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {selectedTerritory.relationshipToUSConstitution}
                      </p>
                    </div>

                    {/* Key Protections */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                        Key Civil Liberties & Protections
                      </h4>
                      <div className="space-y-2">
                        {selectedTerritory.keyProtections.map((prot, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{prot}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Unique Governance Provisions */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Unique Local Governance & Jurisdictional Distinctions
                      </h4>
                      <div className="space-y-2">
                        {selectedTerritory.uniqueGovernanceProvisions.map((gov, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                            • {gov}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: RIGHTS COMPARISON MATRIX */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Topic Selector Chips */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
                {[
                  { id: 'privacy', label: '1. Privacy & Search/Seizure (4th Amend vs States)' },
                  { id: 'speech', label: '2. Free Speech in Private Malls (1st Amend vs Pruneyard)' },
                  { id: 'arms', label: '3. Right to Bear Arms (2nd Amend vs State Clauses)' },
                  { id: 'equality', label: '4. Equal Rights Amendments (Federal vs State ERAs)' }
                ].map((top) => (
                  <button
                    key={top.id}
                    onClick={() => setSelectedComparisonTopic(top.id as any)}
                    className={'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ' + (
                      selectedComparisonTopic === top.id
                        ? 'bg-purple-500 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    )}
                  >
                    {top.label}
                  </button>
                ))}
              </div>

              {/* TOPIC 1: Privacy & Search */}
              {selectedComparisonTopic === 'privacy' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                    <strong>The Constitutional Divide:</strong> The Federal 4th Amendment protects against "unreasonable searches and seizures" based on a subjective "reasonable expectation of privacy" (*Katz v. US*). However, multiple State Constitutions guarantee an <em>affirmative fundamental right to privacy</em> or prohibit disturbances of private affairs without lawful authority.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-amber-400">Federal 4th Amendment Baseline</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">U.S. SCOTUS</span>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p><strong>Open Fields Doctrine:</strong> Police can trespass onto private open land without a warrant (*Oliver v. United States*).</p>
                        <p><strong>Garbage Searches:</strong> Trash left at the curb has zero expectation of privacy (*California v. Greenwood*).</p>
                        <p><strong>Bank & Phone Records:</strong> Third-party doctrine allows warrantless acquisition of dialed numbers and bank statements (*Smith v. Maryland*, *US v. Miller*).</p>
                        <p><strong>Vehicle Frisks:</strong> Officers may inspect vehicle interiors during routine stops (*Michigan v. Long*).</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                        <span className="font-bold text-emerald-400">State Constitutional Super-Protections</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Independent State Grounds</span>
                      </div>
                      <div className="space-y-2 text-slate-200">
                        <p><strong>Washington (Art. I § 7):</strong> Rejects open fields; rejects warrantless garbage searches; protects dialed phone numbers without warrant (*State v. Gunwall*).</p>
                        <p><strong>California (Art. I § 1):</strong> Explicit inalienable right to privacy; applies directly to government and private corporations.</p>
                        <p><strong>Alaska (Art. I § 22):</strong> Right of privacy protects personal adult possession of cannabis in the home (*Ravin v. State*).</p>
                        <p><strong>New Jersey (Art. I ¶ 7):</strong> Rejects warrantless vehicle searches during routine traffic stops unless exigent circumstances arise unprompted (*State v. Pena-Flores*, *State v. Witt*).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIC 2: Free Speech in Malls */}
              {selectedComparisonTopic === 'speech' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                    <strong>Public Forums vs Private Property:</strong> Does free speech apply inside privately-owned shopping centers that function as town centers?
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-amber-400">Federal 1st Amendment (*Hudgens*)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">No State Action</span>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p>Under *Hudgens v. NLRB* (1976), the 1st Amendment protects citizens only against <strong>government suppression</strong> (state action).</p>
                        <p>Privately owned shopping centers and malls may exclude petition gatherers, demonstrators, and pamphleteers at will without violating the federal constitution.</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                        <span className="font-bold text-emerald-400">State *Pruneyard* Protections</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">California & Sister States</span>
                      </div>
                      <div className="space-y-2 text-slate-200">
                        <p>In *Robins v. Pruneyard Shopping Center* (1979), the California Supreme Court held California Art. I § 2 grants affirmative free speech rights in private shopping centers.</p>
                        <p>U.S. Supreme Court affirmed (*Pruneyard*, 1980): States may freely expand free speech protections on private property beyond federal standards.</p>
                        <p>Adopted in varying degrees by Massachusetts, Colorado, New Jersey, and Washington.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIC 3: Right to Bear Arms */}
              {selectedComparisonTopic === 'arms' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                    <strong>Federal 2nd Amendment vs State Right-to-Bear-Arms Clauses:</strong> 44 out of 50 states have explicit right-to-bear-arms provisions in their state constitutions.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-amber-400">Federal 2nd Amendment (*Bruen*)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Text, History & Tradition</span>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p>*DC v. Heller* (2008): Individual right to possess firearm for self-defense in home.</p>
                        <p>*McDonald v. Chicago* (2010): 2nd Amendment incorporated against states via 14th Amendment Due Process.</p>
                        <p>*NYSRPA v. Bruen* (2022): Public carry right; gun regulations must align with the historical tradition of firearm regulation from 1791–1868.</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                        <span className="font-bold text-emerald-400">State Strict Scrutiny Amendments</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">State Ballot Initiatives</span>
                      </div>
                      <div className="space-y-2 text-slate-200">
                        <p><strong>Missouri (Art. I § 23):</strong> Strict scrutiny mandated by constitutional text for any restriction on firearms or ammunition.</p>
                        <p><strong>Louisiana (Art. I § 11):</strong> Amended in 2012 to mandate highest level of judicial review (strict scrutiny).</p>
                        <p><strong>Iowa (Art. I § 1A):</strong> Approved by voters in 2022; requires strict scrutiny for all gun laws.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIC 4: Equal Rights Amendments */}
              {selectedComparisonTopic === 'equality' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
                    <strong>Equal Protection & Equal Rights Amendments (ERA):</strong> While the Federal Equal Rights Amendment passed Congress in 1972 but stalled at ratification deadlines, 28 states enacted State ERAs directly into their constitutions.
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-amber-400">Federal 14th Amendment Standard</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Intermediate Scrutiny</span>
                      </div>
                      <div className="space-y-2 text-slate-300">
                        <p>Sex-based discrimination claims under the federal Equal Protection Clause are subject to <strong>intermediate scrutiny</strong> (*Craig v. Boren*, *United States v. Virginia*).</p>
                        <p>Requires an "exceedingly persuasive justification" substantially related to an important government objective, but does not trigger strict scrutiny.</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                        <span className="font-bold text-emerald-400">State Constitutional ERAs</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Strict Scrutiny Standard</span>
                      </div>
                      <div className="space-y-2 text-slate-200">
                        <p><strong>Texas (Art. I § 3a):</strong> "Equality under the law shall not be denied or abridged because of sex, race, color, creed, or national origin." State high court applies strict scrutiny.</p>
                        <p><strong>Washington (Art. XXXI):</strong> Absolute prohibition on sex discrimination; virtually no exceptions permitted.</p>
                        <p><strong>Pennsylvania (Art. I § 28):</strong> Strictly enforces equality; invalidated numerous sex-differentiated statutory classifications.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Sphinx Sovereign Intelligence: Real-Time Legal & Constitutional Defense Architecture</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500">
              *State v. Hunt* 91 N.J. 338 (1982) • *State v. Gunwall* 106 Wn.2d 54 (1986)
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
