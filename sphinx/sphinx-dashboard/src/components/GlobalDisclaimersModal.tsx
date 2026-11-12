import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  Satellite,
  Radio,
  Globe2,
  FileText,
  Activity,
  X,
  CheckCircle2,
  Lock,
  Search,
  ExternalLink
} from 'lucide-react';

interface GlobalDisclaimersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisclaimerSection {
  id: string;
  category: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  details: string[];
}

const DISCLAIMER_SECTIONS: DisclaimerSection[] = [
  {
    id: 'life-safety-non-reliance',
    category: 'emergency',
    icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
    badge: 'CRITICAL WARNING',
    badgeColor: 'bg-red-950/80 text-red-300 border-red-700/60',
    title: 'Life Safety, Search & Rescue, and Statutory Emergency Dispatch Non-Reliance',
    summary: 'SPHINX is an offline-capable situational intelligence platform and NOT a certified 911/112 public safety answering point.',
    details: [
      'SPHINX intelligence overlays, dam breach wave projections, flood contours, and wildfire vectors are heuristic simulations intended exclusively for situational awareness, training, and emergency self-reliance planning.',
      'Never disregard, delay, or supersede official evacuation directives, air raid sirens, tsunami alerts, or civil defense orders issued by sovereign authorities or local emergency management agencies based on data displayed in this application.',
      'In an active emergency, always attempt primary contact with official sovereign emergency dispatch services (e.g., 112 in Europe, 911 in North America, 999 in the UK, 000 in Australia, 119 in Japan/South Korea) and utilize COSPAS-SARSAT certified 406 MHz satellite distress beacons.'
    ]
  },
  {
    id: 'satellite-revisit-latency',
    category: 'satellite',
    icon: <Satellite className="w-5 h-5 text-amber-400" />,
    badge: 'SENSOR LIMITATIONS',
    badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
    title: 'Satellite Revisit Latency, Orbital Shadows & Sensor Occlusions',
    summary: 'Spaceborne thermal and optical sensor detections are subject to orbital schedules, dense cloud cover, and topographic blind spots.',
    details: [
      'Orbital Revisit Intervals: Thermal anomaly detectors (VIIRS 375m and MODIS 1km) pass overhead 2 to 4 times every 24 hours. Wildfire perimeters and flash chemical leaks can migrate several miles in the intervals between orbital passes.',
      'Atmospheric Occlusion: Dense cloud decks, thunderstorm anvils, and thick pyrocumulonimbus smoke plumes can blind optical and infrared satellite sensors, resulting in false negatives for active ground fires.',
      'Radar Shadowing: Synthetic Aperture Radar (SAR) imagery used for flood water detection suffers from specular reflections and radar shadow distortions in steep alpine valleys and dense urban skyscraper canyons.'
    ]
  },
  {
    id: 'heuristic-simulation-boundaries',
    category: 'simulation',
    icon: <Activity className="w-5 h-5 text-cyan-400" />,
    badge: 'ALGORITHMIC APPROXIMATIONS',
    badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
    title: 'Heuristic Simulation Models & Hydro-Geological Approximations',
    summary: 'Dam breach hydrographs and flood inundations utilize simplified shallow water and cellular automata equations.',
    details: [
      'Topographic Resolution: Digital Elevation Models (DEM) operate on 30-meter to 90-meter grid spacing. Micro-topography such as roadside culverts, levee sandbags, retaining walls, and subway stairs may not be resolved in the underlying terrain elevation mesh.',
      'Dam Breach Dynamics: Peak discharge calculations utilize empirical dam-safety equations (Froehlich & MacDonald approximations). Actual structural failure modes (piping, overtopping, foundation sliding) depend on complex geotechnical variables impossible to forecast with 100% precision.',
      'Urban Drainage Bottlenecks: Flooding simulations do not model subterranean storm sewer capacity or pressurized backflow from clogged storm drains during torrential 500-year cloudburst events.'
    ]
  },
  {
    id: 'sovereign-censorship-osint',
    category: 'geopolitical',
    icon: <Globe2 className="w-5 h-5 text-purple-400" />,
    badge: 'SOVEREIGN DATA SECRECY',
    badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
    title: 'Sovereign Secrecy, State Censorship & Authoritarian Information Warfare',
    summary: 'Global infrastructure, radiation readings, and disaster casualty figures in non-transparent nations reflect OSINT estimates.',
    details: [
      'Statutory State Secrecy: In closed or non-transparency jurisdictions (e.g., Russia, China, North Korea, Iran, Myanmar), exact pipeline routing, strategic petroleum stockpile reserves, radiological telemetry, and dam storage levels are legally classified state secrets.',
      'Deliberate GPS/GNSS Spoofing: Electronic warfare units in conflict zones (Baltic, Black Sea, Middle East) actively broadcast false GPS coordinates and false AIS transponder telemetry, degrading consumer positioning receiver accuracy.',
      'OSINT Synthesis: SPHINX utilizes multi-source open intelligence (declassified blueprints, commercial SAR, scholarly hydrology papers). Data points in authoritarian regions should be regarded as high-confidence estimates rather than official government disclosures.'
    ]
  },
  {
    id: 'foreign-resident-consular',
    category: 'expat',
    icon: <Lock className="w-5 h-5 text-emerald-400" />,
    badge: 'EXPATRIATE LAW',
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
    title: 'Foreign Resident Sovereign Vulnerabilities, Consular Limits & Exit Bans',
    summary: 'Living abroad entails submission to host-nation legal jurisdiction with strictly bounded consular protection.',
    details: [
      'No Consular Immunity: Foreign citizens and long-term permanent residents living abroad possess zero diplomatic immunity. In civil disputes, criminal investigations, or emergency declarations, you are entirely subject to local law enforcement and military rule.',
      'Prescription Drug Criminalization: Common medications legally prescribed in Western nations (such as Adderall, Ritalin, Codeine, Tramadol) are classified as illicit narcotics subject to mandatory detention, prison, or corporal punishment in jurisdictions like Japan, UAE, and Singapore without prior governmental narcotics import licenses.',
      'Exit Bans & Draft Liabilities: Civil court travel bans (e.g., PRC Civil Procedure Law Article 231) and dual-nationality military conscription (e.g., South Korea, Israel, Greece, Singapore) can trap travelers at border checkpoints without legal intervention from your passport nation.'
    ]
  },
  {
    id: 'medical-naturopathic-cbrn',
    category: 'medical',
    icon: <Radio className="w-5 h-5 text-rose-400" />,
    badge: 'MEDICAL & CBRN NOTICE',
    badgeColor: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
    title: 'Medical, Botanical Foraging & CBRN Decontamination Guidance',
    summary: 'Educational field references intended solely for off-grid self-reliance when professional emergency medical care is unavailable.',
    details: [
      'Field Medicine Disclaimers: TCCC MARCH protocols, wound packing, and chest needle decompression instructions are for extreme contingency training when no medical professional can be reached. Improper execution can cause fatal arterial damage or pneumothorax.',
      'Botanical Toxicity: Many wild plants and mushrooms possess lethal toxic lookalikes (e.g., Death Cap Amanita phalloides vs edible meadow mushrooms). SPHINX botanical guides cannot replace formal mycological certification.',
      'Radiological & CBRN Safety: Fallout 7/10 rules and improvised decontamination do not guarantee prevention of acute radiation syndrome (ARS) or fatal radionuclide inhalation. Relocation away from fallout plumes is always the top priority.'
    ]
  }
];

export default function GlobalDisclaimersModal({ isOpen, onClose }: GlobalDisclaimersModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Disclaimers', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'emergency', label: 'Life Safety', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'satellite', label: 'Sensors & Latency', icon: <Satellite className="w-3.5 h-3.5" /> },
    { id: 'simulation', label: 'Simulations', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'geopolitical', label: 'Sovereign Secrecy', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'expat', label: 'Expat & Borders', icon: <Lock className="w-3.5 h-3.5" /> },
    { id: 'medical', label: 'Medical & CBRN', icon: <Radio className="w-3.5 h-3.5" /> },
  ];

  const filteredSections = DISCLAIMER_SECTIONS.filter(section => {
    const matchesCategory = activeCategory === 'all' || section.category === activeCategory;
    const matchesSearch =
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  SPHINX Global Intelligence & Analytics Limitations
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-amber-950/80 text-amber-300 border border-amber-800/60">
                  LEGAL ADVISORY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Statutory disclosures, data latency constraints, heuristic simulation approximations & foreign resident defense
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close disclaimers modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls (Chips & Search - Zero Sliders) */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 space-y-3">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm shadow-amber-500/10'
                      : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:bg-slate-800'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search disclaimers by keyword (e.g. 911, satellite latency, Adderall, dam breach, radiation)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <AlertTriangle className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-medium">No disclaimer sections match your query.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-3 px-3 py-1.5 rounded bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredSections.map(section => (
              <div
                key={section.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-all hover:border-slate-700/80 space-y-3"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                      {section.icon}
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">
                      {section.title}
                    </h3>
                  </div>
                  <span className={`self-start sm:self-auto px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase border ${section.badgeColor}`}>
                    {section.badge}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-amber-200/90 font-medium leading-relaxed bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
                  {section.summary}
                </p>

                {/* Bullet details */}
                <ul className="space-y-2 text-xs text-slate-300">
                  {section.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className={`w-4 h-4 ${acknowledged ? 'text-emerald-400' : 'text-slate-600'}`} />
            <span>
              By using SPHINX, you acknowledge the probabilistic nature of predictive analytics.
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setAcknowledged(true);
                setTimeout(onClose, 250);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
