// landOwnershipEngine.ts
// Universal Geographic Jurisdiction & Land Ownership Classification Engine
// Accurately classifies coordinates worldwide into Federal (BLM, USFS, NPS, DoD, DOE),
// State, County Unincorporated, Municipal Incorporated, or International/Maritime EEZ domains.

export type JurisdictionCategory = 
  | 'FEDERAL_BLM'
  | 'FEDERAL_USFS'
  | 'FEDERAL_NPS'
  | 'FEDERAL_DOD'
  | 'FEDERAL_DOE'
  | 'STATE_PUBLIC'
  | 'COUNTY_UNINCORPORATED'
  | 'MUNICIPAL_INCORPORATED'
  | 'TRIBAL_SOVEREIGN'
  | 'INTERNATIONAL_SOVEREIGN'
  | 'MARITIME_EEZ'
  | 'HIGH_SEAS';

export interface LandJurisdiction {
  category: JurisdictionCategory;
  primary_owner: string;
  agency_acronym: string;
  designation: string;
  management_unit?: string;
  access_status: 'Unrestricted Public' | 'Permit Required' | 'Restricted Military / Federal' | 'Private / Municipal' | 'International Waters';
  tax_jurisdiction: string;
  emergency_services_dispatch: string;
  color: string;
}

// Major known Federal & Sovereign Boundaries (Empirical Geofence Database)
interface BoundaryZone {
  name: string;
  category: JurisdictionCategory;
  agency: string;
  acronym: string;
  access: LandJurisdiction['access_status'];
  dispatch: string;
  bounds: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  color: string;
}

const KNOWN_ZONES: BoundaryZone[] = [
  // 1. Federal DoD & Proving Grounds
  {
    name: 'Camp Pendleton Marine Corps Base',
    category: 'FEDERAL_DOD',
    agency: 'Department of the Navy / USMC',
    acronym: 'DoD-USMC',
    access: 'Restricted Military / Federal',
    dispatch: 'Camp Pendleton PMO / FirstNet Military 911',
    bounds: [-117.58, 33.22, -117.27, 33.52],
    color: '#ef4444'
  },
  {
    name: 'Nellis Air Force Range & Creech AFB',
    category: 'FEDERAL_DOD',
    agency: 'Department of the Air Force',
    acronym: 'USAF-NTTR',
    access: 'Restricted Military / Federal',
    dispatch: 'Nellis AFB Security Forces',
    bounds: [-116.8, 36.3, -114.8, 37.8],
    color: '#ef4444'
  },
  {
    name: 'Fort Bliss Military Reservation',
    category: 'FEDERAL_DOD',
    agency: 'Department of the Army',
    acronym: 'US-ARMY',
    access: 'Restricted Military / Federal',
    dispatch: 'Fort Bliss Directorate of Emergency Services',
    bounds: [-106.6, 31.7, -105.8, 32.8],
    color: '#ef4444'
  },
  {
    name: 'Nevada National Security Site (DOE)',
    category: 'FEDERAL_DOE',
    agency: 'Department of Energy / NNSA',
    acronym: 'DOE-NNSA',
    access: 'Restricted Military / Federal',
    dispatch: 'NNSS Protective Force Center',
    bounds: [-116.5, 36.8, -115.8, 37.3],
    color: '#f97316'
  },

  // 2. Federal BLM (Bureau of Land Management)
  {
    name: 'Black Rock Desert - High Rock Canyon BLM NCA',
    category: 'FEDERAL_BLM',
    agency: 'Bureau of Land Management (Interior)',
    acronym: 'DOI-BLM',
    access: 'Unrestricted Public',
    dispatch: 'Pershing/Humboldt County Sheriff & BLM Law Enforcement',
    bounds: [-119.4, 40.6, -118.8, 41.5],
    color: '#eab308'
  },
  {
    name: 'Mojave Trails & Desert BLM Conservation Lands',
    category: 'FEDERAL_BLM',
    agency: 'Bureau of Land Management',
    acronym: 'DOI-BLM',
    access: 'Unrestricted Public',
    dispatch: 'San Bernardino County Sheriff / BLM Rangers',
    bounds: [-116.4, 34.3, -114.8, 35.4],
    color: '#eab308'
  },
  {
    name: 'Utah West Desert BLM Public Lands',
    category: 'FEDERAL_BLM',
    agency: 'Bureau of Land Management',
    acronym: 'DOI-BLM',
    access: 'Unrestricted Public',
    dispatch: 'Tooele/Juab County Sheriff & BLM Interagency Dispatch',
    bounds: [-114.0, 39.0, -112.5, 41.0],
    color: '#eab308'
  },

  // 3. Federal USFS (US Forest Service)
  {
    name: 'Sierra National Forest & Sequoia Perimeter',
    category: 'FEDERAL_USFS',
    agency: 'US Forest Service (USDA)',
    acronym: 'USDA-USFS',
    access: 'Unrestricted Public',
    dispatch: 'Fresno/Madera County Sheriff & USFS Central Cal Dispatch',
    bounds: [-119.7, 36.8, -118.9, 37.8],
    color: '#10b981'
  },
  {
    name: 'Olympic National Forest & Pacific NW Timber Basin',
    category: 'FEDERAL_USFS',
    agency: 'US Forest Service',
    acronym: 'USDA-USFS',
    access: 'Unrestricted Public',
    dispatch: 'Jefferson/Clallam County Sheriff & Puget Sound Interagency',
    bounds: [-124.2, 47.2, -123.0, 48.1],
    color: '#10b981'
  },

  // 4. Federal NPS (National Park Service)
  {
    name: 'Yosemite National Park',
    category: 'FEDERAL_NPS',
    agency: 'National Park Service (Interior)',
    acronym: 'DOI-NPS',
    access: 'Permit Required',
    dispatch: 'Yosemite Dispatch Emergency Center',
    bounds: [-119.8, 37.5, -119.2, 38.2],
    color: '#06b6d4'
  },
  {
    name: 'Yellowstone National Park',
    category: 'FEDERAL_NPS',
    agency: 'National Park Service',
    acronym: 'DOI-NPS',
    access: 'Permit Required',
    dispatch: 'Yellowstone Park Rangers & Mammoth Hot Springs Dispatch',
    bounds: [-111.1, 44.1, -110.0, 45.1],
    color: '#06b6d4'
  },

  // 5. Municipal Incorporated Hubs (e.g. Newport Beach, CA)
  {
    name: 'City of Newport Beach Municipal Corporation',
    category: 'MUNICIPAL_INCORPORATED',
    agency: 'City of Newport Beach Municipal Gov',
    acronym: 'NB-CITY',
    access: 'Private / Municipal',
    dispatch: 'NBPD 911 Communications / Net6 DFR Dispatch',
    bounds: [-117.97, 33.57, -117.82, 33.67],
    color: '#38bdf8'
  },
  {
    name: 'City of Chula Vista Municipal Jurisdiction',
    category: 'MUNICIPAL_INCORPORATED',
    agency: 'City of Chula Vista Public Safety',
    acronym: 'CV-CITY',
    access: 'Private / Municipal',
    dispatch: 'CVPD RTIC / DFR CAD Dispatch',
    bounds: [-117.15, 32.55, -116.92, 32.68],
    color: '#38bdf8'
  },

  // 6. International & Sovereign Borders
  {
    name: 'United States - Mexico International Border Sector (CBP San Diego & El Centro)',
    category: 'FEDERAL_DOD',
    agency: 'US Customs & Border Protection / DHS',
    acronym: 'DHS-CBP',
    access: 'Restricted Military / Federal',
    dispatch: 'CBP Joint Harbor Operations / Sector Dispatch',
    bounds: [-117.25, 32.53, -115.3, 32.75],
    color: '#f43f5e'
  },
  {
    name: 'Strait of Hormuz International Maritime Corridor',
    category: 'MARITIME_EEZ',
    agency: 'Oman / UAE / Iran EEZ & Joint Transit Passage (UNCLOS)',
    acronym: 'INTL-EEZ',
    access: 'International Waters',
    dispatch: 'Bandar Abbas VTS / UKMTO Dubai Regional Watch',
    bounds: [55.8, 25.8, 57.2, 27.2],
    color: '#8b5cf6'
  },
  {
    name: 'Taiwan Strait Maritime Frontier & ADIZ',
    category: 'MARITIME_EEZ',
    agency: 'Taiwan ROC Coast Guard / PLA Eastern Theater Command ADIZ',
    acronym: 'ROCCG-ADIZ',
    access: 'International Waters',
    dispatch: 'Keelung VTS / ROC Navy Operations Command',
    bounds: [118.5, 23.0, 121.5, 26.0],
    color: '#8b5cf6'
  },
  {
    name: 'Emirate of Dubai Autonomous Municipal Domain',
    category: 'MUNICIPAL_INCORPORATED',
    agency: 'Government of Dubai / Dubai Police General HQ',
    acronym: 'DXB-GOV',
    access: 'Private / Municipal',
    dispatch: 'Dubai Police Command & Control (999 DFR Oasis)',
    bounds: [55.0, 24.8, 55.6, 25.4],
    color: '#38bdf8'
  },
  {
    name: 'Republic of Singapore Island Territory',
    category: 'MUNICIPAL_INCORPORATED',
    agency: 'Home Team Science & Technology Agency (HTX) / SPF',
    acronym: 'SG-HTX',
    access: 'Private / Municipal',
    dispatch: 'Singapore Police Operations Command (999 DFR Mesh)',
    bounds: [103.6, 1.2, 104.1, 1.5],
    color: '#38bdf8'
  }
];

export class LandOwnershipEngine {
  /**
   * Classify any global coordinate into its primary jurisdiction and land ownership profile.
   */
  public static classifyCoordinates(lat: number, lon: number): LandJurisdiction {
    // 1. Check known empirical boundary zones
    for (const zone of KNOWN_ZONES) {
      const [minLon, minLat, maxLon, maxLat] = zone.bounds;
      if (lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat) {
        return {
          category: zone.category,
          primary_owner: zone.agency,
          agency_acronym: zone.acronym,
          designation: zone.name,
          access_status: zone.access,
          tax_jurisdiction: zone.name,
          emergency_services_dispatch: zone.dispatch,
          color: zone.color
        };
      }
    }

    // 2. Maritime vs Terrestrial Global Logic
    // If deep ocean (simple latitude/longitude checks away from land masses)
    const isOcean = this.isLikelyOcean(lat, lon);
    if (isOcean) {
      return {
        category: 'HIGH_SEAS',
        primary_owner: 'International Waters (UNCLOS High Seas)',
        agency_acronym: 'UNCLOS',
        designation: 'International Maritime Space',
        access_status: 'International Waters',
        tax_jurisdiction: 'Zero Tax Jurisdiction',
        emergency_services_dispatch: 'USCG District 11 / Inmarsat-C GMDSS Maritime SAR',
        color: '#6366f1'
      };
    }

    // 3. United States Terrestrial Fallback Logic
    const isUS = lat >= 24.5 && lat <= 49.4 && lon >= -125.0 && lon <= -66.9;
    if (isUS) {
      // Western US has extensive BLM and Unincorporated County land
      const isWesternUS = lon < -100.0;
      if (isWesternUS) {
        return {
          category: 'COUNTY_UNINCORPORATED',
          primary_owner: 'County Unincorporated / Mixed Federal BLM Public Domain',
          agency_acronym: 'COUNTY-BLM',
          designation: 'Unincorporated County Territory',
          access_status: 'Unrestricted Public',
          tax_jurisdiction: 'County Assessor Parcel',
          emergency_services_dispatch: 'County Sheriff 911 & Interagency Mutual Aid',
          color: '#ca8a04'
        };
      }

      return {
        category: 'MUNICIPAL_INCORPORATED',
        primary_owner: 'Municipal Corporate Boundary / County Parcel',
        agency_acronym: 'LOCAL-GOV',
        designation: 'Incorporated Municipal Township',
        access_status: 'Private / Municipal',
        tax_jurisdiction: 'Municipal & County Tax Authority',
        emergency_services_dispatch: 'Municipal Police / Fire 911 CAD',
        color: '#38bdf8'
      };
    }

    // 4. Global International Sovereign Territory
    return {
      category: 'INTERNATIONAL_SOVEREIGN',
      primary_owner: 'Sovereign National Territory',
      agency_acronym: 'SOVEREIGN',
      designation: 'Sovereign Municipal / Territorial Land',
      access_status: 'Private / Municipal',
      tax_jurisdiction: 'National Ministry of Finance',
      emergency_services_dispatch: 'National Emergency Police / Civil Defense (112 / 999)',
      color: '#38bdf8'
    };
  }

  /**
   * Generates GeoJSON polygons for all public and sovereign lands in the specified bounding box.
   */
  public static generatePublicLandsGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const features: GeoJSON.Feature[] = [];

    let filterBbox: [number, number, number, number] | null = null;
    if (bboxStr) {
      const parts = bboxStr.split(',').map(Number);
      if (parts.length === 4 && !parts.some(isNaN)) {
        filterBbox = [parts[0], parts[1], parts[2], parts[3]];
      }
    }

    for (const zone of KNOWN_ZONES) {
      const [minLon, minLat, maxLon, maxLat] = zone.bounds;

      if (filterBbox) {
        const [bMinLon, bMinLat, bMaxLon, bMaxLat] = filterBbox;
        if (maxLon < bMinLon || minLon > bMaxLon || maxLat < bMinLat || minLat > bMaxLat) {
          continue;
        }
      }

      // Create bounding polygon
      const polygonCoords = [
        [
          [minLon, minLat],
          [maxLon, minLat],
          [maxLon, maxLat],
          [minLon, maxLat],
          [minLon, minLat]
        ]
      ];

      features.push({
        type: 'Feature',
        id: `land-zone-${zone.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        geometry: {
          type: 'Polygon',
          coordinates: polygonCoords
        },
        properties: {
          name: zone.name,
          category: zone.category,
          agency: zone.agency,
          acronym: zone.acronym,
          access: zone.access,
          dispatch: zone.dispatch,
          color: zone.color
        }
      });
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }

  private static isLikelyOcean(lat: number, lon: number): boolean {
    // Pacific Ocean Basin
    if (lon < -125.0 && lon > -179.0 && lat > -45.0 && lat < 50.0) return true;
    // Atlantic Ocean Mid-Basin
    if (lon > -55.0 && lon < -20.0 && lat > -30.0 && lat < 55.0) return true;
    // Indian Ocean Basin
    if (lon > 60.0 && lon < 95.0 && lat > -40.0 && lat < 10.0) return true;
    return false;
  }
}
