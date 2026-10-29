"use client";
import React, { useState } from 'react';
import { BookOpen, Search, X, AlertTriangle, Copy, Check } from 'lucide-react';

interface ManualEntry {
  id: string;
  category: 'survival' | 'medicine' | 'comms' | 'cbrn' | 'navigation';
  title: string;
  summary: string;
  steps: string[];
  tips: string[];
}

const MANUALS: ManualEntry[] = [
  {
    id: 'tccc-march',
    category: 'medicine',
    title: 'TCCC / MARCH Trauma Algorithm',
    summary: 'Tactical Combat Casualty Care primary assessment protocol for life-threatening battlefield and crisis trauma.',
    steps: [
      'M — Massive Hemorrhage: Apply CoTCCC-approved tourniquet HIGH & TIGHT over clothes immediately. Tighten windlass until bleeding stops and distal pulse absent. Write time on TQ strap.',
      'A — Airway: Assess responsiveness. If unconscious, perform head-tilt chin-lift or recovery position. Place nasopharyngeal airway (NPA) in right nostril with bevel toward septum.',
      'R — Respiration: Inspect chest for open/sucking chest wounds. Apply vented chest seal on exhalation. Monitor for tension pneumothorax (distended neck veins, tracheal deviation, severe respiratory distress).',
      'C — Circulation: Re-assess all tourniquets. Pack junctional wounds (groin, axilla) with hemostatic combat gauze and hold direct pressure for minimum 3 minutes. Check radial pulses.',
      'H — Hypothermia & Head: Prevent heat loss immediately. Strip wet clothes, place casualty on insulated mat, wrap in hypothermia reflector blanket. Assess for TBI.'
    ],
    tips: [
      'Hypothermia combined with acidosis and coagulopathy forms the Trauma Triad of Death. Even in warm climates, hemorrhagic shock rapidly drops core body temperature.',
      'Never loosen a tourniquet once placed unless directed by a surgeon.'
    ]
  },
  {
    id: 'sere-water',
    category: 'survival',
    title: 'Water Procurement & Field Solar Stills',
    summary: 'Extracting potable water in arid, wilderness, and contaminated urban zones without utility power.',
    steps: [
      'Improvised Solar Still: Dig a hole 1m wide by 60cm deep. Place collection cup in the center bottom. Fill perimeter of hole with non-poisonous green vegetation or salt water.',
      'Seal Cover: Stretch clear plastic sheet over the pit, anchoring edges with rocks and dirt. Place a small stone in center above the cup to create a 45-degree condensation cone.',
      'Boiling & Thermal Sterilization: Bring water to a rolling boil for minimum 1 minute (3 minutes at elevations above 2,000m / 6,500ft) to destroy all waterborne protozoa, bacteria, and viruses.',
      'Charcoal Sand Biofilter: In emergency, layer sand, crushed wood charcoal from campfire, and pebbles in an inverted bottle with cotton base to remove particulates and organic toxins before boiling.'
    ],
    tips: [
      'Solar distillation removes dissolved salts, heavy metals, and radiation fallout.',
      'Do not consume cactus milk (except prickly pear pads/tuna) as high oxalic acid causes kidney failure.'
    ]
  },
  {
    id: 'cbrn-decay',
    category: 'cbrn',
    title: 'Nuclear Fallout & The 7/10 Decay Rule',
    summary: 'Predicting radiation decay and calculating shelter halving thickness following a nuclear blast.',
    steps: [
      'The 7/10 Rule: Radiation dose rate decreases tenfold for every sevenfold increase in time after detonation.',
      'Example Timeline: If fallout dose rate is 1,000 R/hr at H+1 hour -> Drops to 100 R/hr at H+7 hours -> Drops to 10 R/hr at H+49 hours (~2 days) -> Drops to 1 R/hr at H+343 hours (~2 weeks).',
      'Shelter Halving Thickness: Thickness of material that reduces gamma radiation dose rate by 50%:',
      '  - Steel / Iron: 2.5 cm (1 inch)',
      '  - Solid Concrete / Brick: 6.0 cm (2.4 inches)',
      '  - Earth, Sand, or Dirt: 9.1 cm (3.6 inches)',
      '  - Water: 18.0 cm (7.2 inches)',
      '  - Wood / Timber: 28.0 cm (11 inches)',
      'Basement Geometry Factor: Moving to the center of a below-ground basement with earth banked on outside walls provides protection factor of 10 to 50x.'
    ],
    tips: [
      'Stay completely sheltered for minimum 72 hours; 14 days is ideal to allow 99% of fallout decay.',
      'Decontaminate outer clothing before entering shelter airlocks: gently brush off dust and discard outer layer.'
    ]
  },
  {
    id: 'radio-morse',
    category: 'comms',
    title: 'Emergency Radio, Morse SOS & NATO Signals',
    summary: 'Standard international emergency frequencies, distress signals, and phonetic alphabet.',
    steps: [
      'International Morse SOS: . . .   - - -   . . . (3 short dots, 3 long dashes, 3 short dots). Transmit via whistle, flashlight, mirror flash, or RF transmitter.',
      'Emergency Guard Frequencies:',
      '  - VHF Marine Channel 16: 156.800 MHz (International Maritime Calling & Distress)',
      '  - International Air Guard: 121.500 MHz (Civil) & 243.000 MHz (Military)',
      '  - Search & Rescue Transponder: 406.025 MHz (COSPAS-SARSAT EPIRB/PLB)',
      '  - CB Emergency: Channel 9 (27.065 MHz AM)',
      'Ground-to-Air Visual Symbols:',
      '  - [ V ] : Require Assistance',
      '  - [ X ] : Require Medical Assistance',
      '  - [ N ] : No / Negative',
      '  - [ Y ] : Yes / Affirmative',
      '  - [ -> ] : Proceeding in this direction',
      'NATO Phonetic Alphabet: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.'
    ],
    tips: [
      'Ground markers should be at least 3m (10ft) long using high-contrast rocks, logs, or stomped snow.',
      'When calling Mayday, state: 1) Vessel/Callsign 2) Coordinates/Position 3) Nature of emergency 4) Persons on board.'
    ]
  },
  {
    id: 'nav-celestial',
    category: 'navigation',
    title: 'Celestial Compass & GPS-Denied Orientation',
    summary: 'Determining true cardinal headings using stellar navigation and solar shadows when GPS is jammed.',
    steps: [
      'Northern Hemisphere (Polaris / North Star):',
      '  1. Locate the Big Dipper (Ursa Major). Find the two outer pointer stars on the bowl (Merak and Dubhe).',
      '  2. Draw an imaginary line from Merak through Dubhe and extend it forward approximately 5 times the distance between them.',
      '  3. The first moderately bright star you strike is Polaris (alpha Ursae Minoris), located within 0.7 degrees of True North.',
      'Southern Hemisphere (Southern Cross / Crux):',
      '  1. Locate the four bright stars forming the Crux cross. Identify the long axis stars (Gacrux to Acrux).',
      '  2. Extend a line from Gacrux through Acrux 4.5 times the length of the cross.',
      '  3. Drop a vertical line straight down to the horizon to mark True South.',
      'Daytime Shadow-Stick Method:',
      '  1. Plant a 1m straight stick upright in flat ground. Mark the tip of the shadow with a stone (Point 1 = West).',
      '  2. Wait 15-20 minutes. Mark the new tip of the shadow with a second stone (Point 2 = East).',
      '  3. Draw a line between Point 1 and Point 2. Stand with Point 1 (West) on your left; you are facing True North.'
    ],
    tips: [
      'Pace Counting (Ranger Beads): Average human takes 64-68 double-paces per 100 meters on flat terrain. Calibrate your pace count over a measured 100m course before operations.'
    ]
  }
];

export const FieldManualsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = MANUALS.filter(m => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.steps.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const copyToClipboard = (manual: ManualEntry) => {
    const text = `=== ${manual.title.toUpperCase()} ===\n${manual.summary}\n\nSTEPS:\n${manual.steps.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\nTACTICAL NOTES:\n${manual.tips.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(manual.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed top-24 sm:top-16 right-3 sm:right-6 z-50 max-w-[calc(100vw-24px)] w-[520px] max-h-[82vh] bg-neutral-950/95 border border-cyan-800/80 rounded-xl shadow-[0_0_35px_rgba(8,145,178,0.3)] backdrop-blur-md flex flex-col font-mono text-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950/80 to-blue-950/80 px-4 py-3 border-b border-cyan-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wider">
          <BookOpen size={18} className="text-cyan-400" />
          <span>TACTICAL FIELD MANUALS & SURVIVAL LIBRARY</span>
        </div>
        <button
          type="button"
          data-testid="close-manuals-panel"
          aria-label="Close Field Manuals"
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 bg-neutral-900/80 border-b border-white/5 space-y-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search protocols, algorithms, frequencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto text-[11px] pb-1">
          {['all', 'survival', 'medicine', 'comms', 'cbrn', 'navigation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 text-xs">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No field manuals match your query.</div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="bg-black/60 border border-white/10 rounded-lg p-3.5 space-y-2.5 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {m.category}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1">{m.title}</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(m)}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy cheat sheet to clipboard"
                >
                  {copiedId === m.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              <p className="text-gray-300 text-xs leading-relaxed">{m.summary}</p>

              <div className="bg-neutral-900/70 border border-white/5 rounded-md p-2.5 space-y-1.5 text-gray-200">
                <div className="text-[11px] font-semibold text-cyan-300">PROTOCOLS & STEPS:</div>
                <ul className="space-y-1 pl-1">
                  {m.steps.map((st, i) => (
                    <li key={i} className="text-[11px] leading-relaxed text-gray-300">
                      • {st}
                    </li>
                  ))}
                </ul>
              </div>

              {m.tips.length > 0 && (
                <div className="bg-amber-950/30 border border-amber-800/40 rounded p-2 text-[11px] text-amber-200 flex items-start gap-1.5">
                  <AlertTriangle size={13} className="shrink-0 mt-0.5 text-amber-400" />
                  <div className="space-y-0.5">
                    {m.tips.map((t, i) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Status */}
      <div className="bg-black/90 px-4 py-2 border-t border-white/10 text-[10px] text-gray-500 flex justify-between items-center">
        <span>OFFLINE CACHED FIELD REPOSITORY (5 MANUALS)</span>
        <span className="text-emerald-400 font-bold">100% DISCONNECTED READ READY</span>
      </div>
    </div>
  );
};
