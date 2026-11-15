// src/lib/intelligence/kiwixConnector.ts
// Kiwix ZIM Offline Knowledge & Tactical Emergency Medical Triage Engine

export interface KiwixSearchResult {
  title: string;
  snippet: string;
  bookName: string;
  url: string;
}

export interface OfflineEmergencyProtocol {
  id: string;
  title: string;
  category: 'Trauma & Hemorrhage' | 'Airway & Respiration' | 'CBRN & Toxins' | 'Thermal & Environmental' | 'Water & Sanitation';
  immediateActions: string[];
  vitalThresholds: string;
  contraindications: string[];
  referenceStandard: string;
}

// Curated Offline Medical Triage Knowledge Base (Always Available with Zero Internet/Server)
export const EMERGENCY_TRIAGE_PROTOCOLS: OfflineEmergencyProtocol[] = [
  {
    id: 'trauma-tourniquet',
    title: 'Arterial Hemorrhage Control & Tourniquet Application',
    category: 'Trauma & Hemorrhage',
    immediateActions: [
      '1. Apply direct manual pressure with hemostatic gauze (QuikClot / Celox) directly into wound cavity.',
      '2. Place CoTCCC-approved windlass tourniquet (CAT / SOFT-T) 2–3 inches proximal to bleeding site (not over joint).',
      '3. Tighten windlass until arterial pulse ceases and active bright red pulsatile bleeding stops completely.',
      '4. Mark exact time of application (T=HH:MM) on tourniquet time strap with permanent marker.',
      '5. If bleeding persists, apply second tourniquet immediately proximal to the first.'
    ],
    vitalThresholds: 'Target MAP > 65 mmHg, systolic BP 80–90 mmHg (permissive hypotension until surgical intervention).',
    contraindications: [
      'Never loosen or release tourniquet intermittently (causes fatal re-bleeding and reperfusion shock).',
      'Do not apply over pocket items, holster clips, or fractured joints.'
    ],
    referenceStandard: 'Committee on Tactical Combat Casualty Care (CoTCCC 2024 Guidelines)'
  },
  {
    id: 'airway-tension-pneumothorax',
    title: 'Tension Pneumothorax Decompression Protocol',
    category: 'Airway & Respiration',
    immediateActions: [
      '1. Assess for triad: progressive respiratory distress, unilateral absent breath sounds, jugular venous distention / tracheal deviation.',
      '2. Immediate needle thoracostomy: insert 14-gauge 3.25-inch needle with catheter into 2nd intercostal space at mid-clavicular line, or 4th/5th intercostal space anterior axillary line.',
      '3. Listen for air release hiss, remove needle, leave plastic cannula taped in place.',
      '4. Apply vented chest seal (Halo / Chest Seal with one-way flutter valve) over any penetrating chest wound.'
    ],
    vitalThresholds: 'SpO2 < 90%, respiratory rate > 30/min, asymmetric chest excursion.',
    contraindications: [
      'Do not use unvented occlusion without continuous monitoring for tension development.'
    ],
    referenceStandard: 'TCCC Field Manual & Advanced Trauma Life Support (ATLS)'
  },
  {
    id: 'cbrn-organophosphate-atropine',
    title: 'Nerve Agent & Organophosphate Poisoning (SLUDGEM Protocol)',
    category: 'CBRN & Toxins',
    immediateActions: [
      '1. Rapid triage for SLUDGEM syndrome: Salivation, Lacrimation, Urination, Defecation, GI cramping, Emesis, Miosis (pinpoint pupils).',
      '2. Administer autoinjector Mark I NAAK / ATNAA: Atropine sulfate (2mg IM) + Pralidoxime chloride 2-PAM (600mg IM).',
      '3. Repeat atropine every 5–10 minutes until tracheobronchial secretions dry and lungs are clear to auscultation.',
      '4. Administer Midazolam 10mg IM or Diazepam for seizure prophylaxis.',
      '5. Complete reactive skin decontamination with RSDL or 0.5% sodium hypochlorite wash.'
    ],
    vitalThresholds: 'Bradycardia (<50 bpm), severe bronchorrhea, respiratory arrest.',
    contraindications: [
      'Do not stop atropine based on pupil dilation; endpoint of atropinization is dry lung fields.'
    ],
    referenceStandard: 'USAMRICD Medical Management of Chemical Casualties Handbook'
  },
  {
    id: 'thermal-hypothermia-rewarming',
    title: 'Severe Accidental Hypothermia Rewarming Protocol',
    category: 'Thermal & Environmental',
    immediateActions: [
      '1. Handle patient extremely gently to avoid triggering refractory ventricular fibrillation.',
      '2. Strip wet clothing and place into insulated hypothermia wrap (vapor barrier + fleece + reflective Mylar bivy).',
      '3. Active external core rewarming: place chemical heat pads on axillae, groin, and lateral chest (never extremities first).',
      '4. If conscious, administer warm sweet fluids (40°C–45°C). Never administer alcohol or caffeine.',
      '5. Continue active rewarming until core tympanic/rectal temperature exceeds 35°C (95°F).'
    ],
    vitalThresholds: 'Core temp < 32°C (90°F) = severe hypothermia with loss of shivering mechanism.',
    contraindications: [
      'Do not rub cold frostbitten extremities (causes tissue necrosis).',
      'Avoid rapid peripheral rewarming which causes "afterdrop" core shock.'
    ],
    referenceStandard: 'Wilderness Medical Society (WMS) Clinical Practice Guidelines'
  }
];

export class KiwixConnector {
  private static DEFAULT_URL = 'http://nomad.local:8080/kiwix';

  // Search LAN Kiwix ZIM server
  public static async searchKiwix(query: string, kiwixUrl = this.DEFAULT_URL): Promise<{
    results: KiwixSearchResult[];
    connected: boolean;
  }> {
    try {
      const res = await fetch(`${kiwixUrl.replace(/\/+$/, '')}/search?pattern=${encodeURIComponent(query)}`, {
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) {
        const data = await res.json();
        return {
          results: (data.results || []).map((r: any) => ({
            title: r.title,
            snippet: r.snippet,
            bookName: r.book || 'Kiwix ZIM Library',
            url: `${kiwixUrl}${r.path}`
          })),
          connected: true
        };
      }
    } catch {
      // Fallback
    }

    return { results: [], connected: false };
  }

  // Search curated offline emergency protocols
  public static searchOfflineProtocols(query: string): OfflineEmergencyProtocol[] {
    const q = query.toLowerCase().trim();
    if (!q) return EMERGENCY_TRIAGE_PROTOCOLS;

    return EMERGENCY_TRIAGE_PROTOCOLS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.immediateActions.some(a => a.toLowerCase().includes(q)) ||
      p.referenceStandard.toLowerCase().includes(q)
    );
  }
}
