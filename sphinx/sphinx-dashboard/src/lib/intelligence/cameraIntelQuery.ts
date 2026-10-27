// Sphinx Tactical Camera & ALPR Intelligence Handler
// Inspired by MapQuest's Surveillance Layer (Flock, Axon, Ring, Motorola, Genetec)

import type { AIResponse, MapContext, MapAction } from './aiClient';
import { VENDOR_PALETTE, VERIFIED_SURVEILLANCE_REGISTRY } from './cameraData';

export function isCameraQuery(query: string): boolean {
  const lower = query.toLowerCase();
  return (
    lower.includes('camera') ||
    lower.includes('flock') ||
    lower.includes('axon') ||
    lower.includes('ring') ||
    lower.includes('alpr') ||
    lower.includes('lpr') ||
    lower.includes('license plate') ||
    lower.includes('surveillance') ||
    lower.includes('cctv') ||
    lower.includes('fov') ||
    lower.includes('sightline')
  );
}

export function generateCameraIntelligence(
  query: string,
  mapContext: MapContext,
  isDeepResearch: boolean
): AIResponse {
  const lower = query.toLowerCase();
  const sources = [
    'Sphinx Surveillance Network Registry',
    'MapQuest Surveillance Layer Technical Audit (Oct 2026)',
    'EFF Automated License Plate Readers (ALPR) Street Guide',
    'Flock Safety & Axon Enterprise Hardware Specifications',
    'OpenStreetMap Surveillance Node Registry'
  ];

  const actions: MapAction[] = [
    {
      type: 'FLY_TO',
      payload: { lat: 41.7948, lon: -87.6244, zoom: 15 } // Fly to Flock ALPR corridor
    }
  ];

  const text = `### 📸 SURVEILLANCE & ALPR INTELLIGENCE BRIEF: FLOCK, AXON & RING NETWORKS

Sphinx now tracks public and private automated surveillance nodes with **Directional Field-of-View (FOV) Sightline Cones**, inspired by MapQuest's October 2026 Surveillance Layer.

| Hardware Vendor | Primary Network Role | Optical Tech & Capabilities | Sightline & Range | Power & Connectivity | Data Retention & Sharing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Flock Safety** *(Falcon v2 / Sparrow)* | Automated License Plate Reader (ALPR) | Dual-lens IR + Color OCR; Vehicle Fingerprinting (Make, Model, Color, Bumper Stickers) | 42° Directional Cone (35–40m depth) | ⚡ Solar Panel + Internal Battery; Cellular 5G/LTE | 30-Day Automated Purge; **TALON** Regional Network (multi-agency cross-search) |
| **Axon Enterprise** *(Fleet 3 / Respond)* | Law Enforcement Tactical ALPR | AI Edge-processed Multi-Lane Plate Scan (up to 3 lanes simultaneous); 4K Evidence Capture | 50° High-Speed Cone (40–50m depth) | Vehicle 12V / Hardwired Grid; Secure Encrypted LTE | 60–180 Days; Direct CJIS & FBI NCIC Hotlist Integration |
| **Amazon Ring** *(Neighbors Mesh)* | Residential & Commercial Perimeter | 1080p/4K HDR Wide-Angle Video; 3D Radar Motion Detection; Two-Way Audio | 130°–140° Hemispherical Fan (20–25m depth) | Grid Hardwired / Battery; Wi-Fi 6 Mesh | 60-Day Cloud Storage; **Ring Neighbors Public Safety Service** (warrantless police portal requests) |
| **Motorola Solutions** *(Vigilant M500)* | High-Speed Highway & Arterial ALPR | High-Speed Plate Capture (speeds up to 120 mph); Dual-Spectrum Thermal IR | 35° Narrow Penetrating Beam (50m depth) | Grid Hardwired; Fiber / 5G | 90–365 Days; **NVLS** (National Vehicle Location Service with 2B+ plate scans) |
| **Genetec** *(AutoVu SharpV)* | Municipal & Toll Infrastructure | Deep Learning OCR; Uncalibrated Speed Estimation; Dangerous Cargo Placard ID | 40° High-Density Cone (45m depth) | Grid / PoE+; Dedicated Municipal Fiber | Municipal Discretion (often 1–3 years) |

---

#### 🧭 Understanding Directional Sightline Cones:
1. **Directional Wedges:** When zoomed to street level (\`zoom >= 12\`), Sphinx projects color-coded directional cones showing exactly where each camera points and its active optical detection perimeter.
2. **Color Legend:**
   - 🟡 **Amber:** Flock Safety ALPR Nodes
   - 🔵 **Blue:** Axon Enterprise Tactical Units
   - 🟣 **Purple:** Amazon Ring Neighborhood Surveillance Mesh
   - 🟢 **Emerald:** Motorola Vigilant Highway Gantries
   - 🔴 **Crimson:** Automated Red-Light & Speed Sentry Cameras
3. **Corridor Blind Spots:** Because ALPR cameras are fixed at rigid angles (e.g., 184° Southbound), vehicle maneuvers, alley cut-throughs, and opposite-direction lanes often lie outside the detection cone.

${isDeepResearch ? `\n#### 🔬 Deep Research: Regulatory & Counter-Surveillance Analysis
- **Legal Landscape:** Under Supreme Court 4th Amendment precedent (*Carpenter v. United States*), continuous long-term historical location tracking raises constitutional scrutiny. However, public-thoroughfare ALPR capture remains largely unregulated at the federal level.
- **Audit Trails:** 16 states (including California under SB 34 and Illinois) legally require agencies to maintain searchable public audit logs detailing every plate search and query justification.
- **False Positive Hotlist Risks:** Edge OCR errors on out-of-state plate fonts occasionally generate erroneous stolen-vehicle alerts. Axon Fleet 3 uses double-confirmation confidence thresholds to reduce false matches.` : ''}

*Interactive Map Action: Zoom into the map to inspect live camera sightlines, or click any camera marker to review its operating agency, retention policy, and detection capabilities.*`;

  return {
    text,
    isDeepResearch,
    actions,
    sources,
    timestamp: new Date().toISOString()
  };
}
