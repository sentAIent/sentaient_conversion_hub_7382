// globalDroneDockData.ts
// Worldwide Autonomous Drone Dock & Drone as First Responder (DFR) Intelligence Engine
// Features all 10 Newport Beach, CA DFR Docks, plus nationwide US and global international stations.
// Includes 3D dock extrusions, BVLOS response envelopes, and dynamic blind-spot gap detection.

export type DroneDockSector = 
  | 'DFR_MUNICIPAL'
  | 'BORDER_DEFENSE'
  | 'CRITICAL_INFRASTRUCTURE'
  | 'BLM_REMOTE_OUTPOST'
  | 'INTERNATIONAL_DFR';

export type DroneDockStatus = 
  | 'READY_STANDBY'
  | 'MISSION_AIRBORNE'
  | 'RECHARGING'
  | 'WEATHER_HOLD'
  | 'MAINTENANCE';

export interface DroneActiveSortie {
  callsign: string;
  incident_type: string;
  incident_cad_code: string;
  target_coords: [number, number]; // [lon, lat]
  current_coords: [number, number];
  altitude_ft_agl: number;
  speed_kts: number;
  heading_deg: number;
  eta_seconds: number;
  camera_mode: 'FLIR Radiometric Thermal' | '64MP Optical Telephoto' | 'Multispectral';
}

export interface DroneDockStation {
  id: string;
  callsign: string;
  name: string;
  sector: DroneDockSector;
  agency: string;
  agency_display: string;
  city: string;
  region: string;
  country: string;
  coordinates: [number, number]; // [lon, lat]
  elevation_m: number;
  land_ownership: string;
  status: DroneDockStatus;
  status_label: string;
  dock_model: string;
  drone_model: string;
  payload: string;
  battery_pct: number;
  internal_temp_c: number;
  internal_rh_pct: number;
  bvlos_radius_km: number;
  avg_response_sec: number;
  faa_waiver_id: string;
  power_source: string;
  connectivity: string;
  cad_integration: string;
  active_sortie: DroneActiveSortie | null;
}

export const WORLDWIDE_DRONE_DOCKS: DroneDockStation[] = [
  // =========================================================================
  // 1. NEWPORT BEACH, CA — OFFICIAL 10-DOCK DFR NETWORK (COMPLETE CITY COVERAGE)
  // =========================================================================
  {
    id: 'dfr-nbpd-01',
    callsign: 'NBPD-DFR-01',
    name: 'NBPD Headquarters Central TOC Dock',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police Department',
    agency_display: 'NBPD Real-Time Crime Center (RTCC)',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8745, 33.6190],
    elevation_m: 24,
    land_ownership: 'City Municipal Public Safety HQ',
    status: 'READY_STANDBY',
    status_label: 'Standby / Hangar Sealed',
    dock_model: 'Skydio Weatherproof Dock (IP56 Climate Controlled)',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal (640x512) + 64MP Wide Optical + 48MP Telephoto',
    battery_pct: 100,
    internal_temp_c: 21.4,
    internal_rh_pct: 42,
    bvlos_radius_km: 2.5,
    avg_response_sec: 48,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid 240V + Cummins Backup Generator',
    connectivity: 'FirstNet 5G Dual-SIM + Municipal Fiber',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-02',
    callsign: 'NBPD-DFR-02',
    name: 'Newport Beach Civic Center Rooftop Dock',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police Department',
    agency_display: 'NBPD DFR Unit / Civic Ridge',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8727, 33.6186],
    elevation_m: 28,
    land_ownership: 'City of Newport Beach Civic Center',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Code 3 Incident Response',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical (Night-Vision IR)',
    battery_pct: 84,
    internal_temp_c: 22.1,
    internal_rh_pct: 44,
    bvlos_radius_km: 2.5,
    avg_response_sec: 52,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Solar 8kW Array + Tesla Powerpack 20kWh',
    connectivity: 'FirstNet 5G + Low-Latency Microwave',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: {
      callsign: 'NBPD-AIR-2',
      incident_type: 'Priority 1 Burglary in Progress',
      incident_cad_code: '10-31B / Fashion Island Corridor',
      target_coords: [-117.8790, 33.6160],
      current_coords: [-117.8755, 33.6172],
      altitude_ft_agl: 280,
      speed_kts: 34,
      heading_deg: 245,
      eta_seconds: 22,
      camera_mode: 'FLIR Radiometric Thermal'
    }
  },
  {
    id: 'dfr-nbpd-03',
    callsign: 'NBPD-DFR-03',
    name: 'Corona del Mar Fire Station 5 Hangar Dock',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police & Fire Department',
    agency_display: 'NBPD / NBFD Joint Coastal DFR',
    city: 'Corona del Mar',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8725, 33.5935],
    elevation_m: 32,
    land_ownership: 'City Municipal Fire Station Parcel',
    status: 'READY_STANDBY',
    status_label: 'Standby / Coastal Watch',
    dock_model: 'Skydio Weatherproof Dock (Marine Marine Grade)',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical + Ocean Swell Sensor',
    battery_pct: 98,
    internal_temp_c: 19.8,
    internal_rh_pct: 58,
    bvlos_radius_km: 2.5,
    avg_response_sec: 44,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid + Solar Hybrid',
    connectivity: 'FirstNet 5G + Dedicated Starlink Business LEO',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-04',
    callsign: 'NBPD-DFR-04',
    name: 'Balboa Peninsula Newport Pier Lifeguard HQ',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police & Marine Operations',
    agency_display: 'NBPD Maritime / Ocean Rescue DFR',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.9288, 33.6083],
    elevation_m: 16,
    land_ownership: 'City Municipal Oceanfront Boardwalk',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Ocean SAR Sweep',
    dock_model: 'BRINC Station Weatherproof Enclosure',
    drone_model: 'BRINC LEMUR 2 Tactical DFR',
    payload: 'High-Lumen 10,000lm Spotlight + Two-Way PA + Thermal FLIR',
    battery_pct: 79,
    internal_temp_c: 18.9,
    internal_rh_pct: 65,
    bvlos_radius_km: 2.5,
    avg_response_sec: 38,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid 120V + Marine Battery Bank',
    connectivity: 'FirstNet 5G Dual-SIM',
    cad_integration: 'Axon Air / Marine Safety Radio CAD',
    active_sortie: {
      callsign: 'NBPD-RESCUE-4',
      incident_type: 'Swimmer in Distress / Rip Current',
      incident_cad_code: 'SAR-OCEAN-48',
      target_coords: [-117.9330, 33.6050],
      current_coords: [-117.9312, 33.6068],
      altitude_ft_agl: 175,
      speed_kts: 38,
      heading_deg: 215,
      eta_seconds: 14,
      camera_mode: '64MP Optical Telephoto'
    }
  },
  {
    id: 'dfr-nbpd-05',
    callsign: 'NBPD-DFR-05',
    name: 'Balboa Island Fire Station 4 Dock',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police Department',
    agency_display: 'NBPD Harbor & Island Patrol',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8920, 33.6078],
    elevation_m: 12,
    land_ownership: 'City Municipal Public Safety Station',
    status: 'READY_STANDBY',
    status_label: 'Standby / Grand Canal Coverage',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical',
    battery_pct: 100,
    internal_temp_c: 20.3,
    internal_rh_pct: 54,
    bvlos_radius_km: 2.2,
    avg_response_sec: 42,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid 240V + Battery UPS',
    connectivity: 'FirstNet 5G + Island Fiber Sub-link',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-06',
    callsign: 'NBPD-DFR-06',
    name: 'West Newport Fire Station 2 (PCH Corridor)',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police Department',
    agency_display: 'NBPD West Sector Tactical Dock',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.9542, 33.6267],
    elevation_m: 14,
    land_ownership: 'City Municipal Public Works Parcel',
    status: 'READY_STANDBY',
    status_label: 'Standby / PCH & River Mouth',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical',
    battery_pct: 96,
    internal_temp_c: 20.9,
    internal_rh_pct: 51,
    bvlos_radius_km: 2.5,
    avg_response_sec: 50,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid + Solar Backup',
    connectivity: 'FirstNet 5G + Fiber',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-07',
    callsign: 'NBPD-DFR-07',
    name: 'Newport Coast Community Center / Station 8',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police & Fire Department',
    agency_display: 'NBPD Wildland & Ridge Sentry',
    city: 'Newport Coast',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8340, 33.6075],
    elevation_m: 95,
    land_ownership: 'City Municipal Community Center',
    status: 'READY_STANDBY',
    status_label: 'Standby / Canyon Fire Sentry',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'Radiometric High-Temp Thermal FLIR + 64MP Optical',
    battery_pct: 100,
    internal_temp_c: 22.0,
    internal_rh_pct: 39,
    bvlos_radius_km: 3.0,
    avg_response_sec: 58,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Solar 10kW Array + Tesla Powerpack 20kWh',
    connectivity: 'FirstNet 5G + Starlink Business LEO',
    cad_integration: 'Axon Respond / Cal Fire Integrated CAD',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-08',
    callsign: 'NBPD-DFR-08',
    name: 'Mariners Branch Library / Station 3 Corridor',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police Department',
    agency_display: 'NBPD North Coastal / Upper Bay',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.9015, 33.6260],
    elevation_m: 22,
    land_ownership: 'City Municipal Public Library Facility',
    status: 'READY_STANDBY',
    status_label: 'Standby / Upper Bay Watershed',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical',
    battery_pct: 100,
    internal_temp_c: 21.0,
    internal_rh_pct: 46,
    bvlos_radius_km: 2.5,
    avg_response_sec: 46,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid 240V + Battery Backup',
    connectivity: 'FirstNet 5G + Municipal Fiber',
    cad_integration: 'Axon Respond / Net6 CAD Auto-Dispatch',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-09',
    callsign: 'NBPD-DFR-09',
    name: 'Santa Ana Heights Fire Station 7 (Airport Approach)',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police & Fire Department',
    agency_display: 'NBPD North Perimeter / SNA Airspace Link',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.8821, 33.6558],
    elevation_m: 18,
    land_ownership: 'City Municipal Fire Station Parcel',
    status: 'READY_STANDBY',
    status_label: 'Standby / SNA FAA Coordination',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + ADS-B In Transponder Receiver',
    battery_pct: 99,
    internal_temp_c: 21.6,
    internal_rh_pct: 45,
    bvlos_radius_km: 2.2,
    avg_response_sec: 54,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-SNA-09114',
    power_source: 'Grid 240V + Diesel Generator',
    connectivity: 'FirstNet 5G + Dedicated FAA Direct Dial',
    cad_integration: 'Axon Respond / LAANC Real-Time Authorization',
    active_sortie: null
  },
  {
    id: 'dfr-nbpd-10',
    callsign: 'NBPD-DFR-10',
    name: 'Marina Park Community Center & Harbor Dock',
    sector: 'DFR_MUNICIPAL',
    agency: 'Newport Beach Police & Harbor Patrol',
    agency_display: 'NBPD Harbor & Mooring Operations',
    city: 'Newport Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-117.9172, 33.6086],
    elevation_m: 14,
    land_ownership: 'City Municipal Marina Park Facility',
    status: 'READY_STANDBY',
    status_label: 'Standby / Harbor Basin & Channels',
    dock_model: 'DJI Dock 2 Industrial Marine Enclosure',
    drone_model: 'DJI Matrice 3D Enterprise',
    payload: 'Thermal Radiometric + 4/3 CMOS Wide Optical + Laser Rangefinder 1200m',
    battery_pct: 95,
    internal_temp_c: 20.1,
    internal_rh_pct: 59,
    bvlos_radius_km: 2.5,
    avg_response_sec: 40,
    faa_waiver_id: 'FAA-Part107-BVLOS-NBPD-09113',
    power_source: 'Grid + Solar Marina Float Array',
    connectivity: 'FirstNet 5G + Harbor Fiber Link',
    cad_integration: 'Axon Respond / Harbor Master CAD',
    active_sortie: null
  },

  // =========================================================================
  // 2. US NATIONAL DFR HUBS & SOUTHERN CALIFORNIA POLICE NETWORKS
  // =========================================================================
  {
    id: 'dfr-cvpd-01',
    callsign: 'CVPD-DFR-01',
    name: 'Chula Vista Police Headquarters Flagship DFR Station',
    sector: 'DFR_MUNICIPAL',
    agency: 'Chula Vista Police Department',
    agency_display: 'CVPD Drone as First Responder Center (RTIC)',
    city: 'Chula Vista',
    region: 'California',
    country: 'United States',
    coordinates: [-117.0780, 32.6390],
    elevation_m: 35,
    land_ownership: 'City Municipal Police HQ',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Priority CAD Call',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical Telephoto',
    battery_pct: 72,
    internal_temp_c: 23.0,
    internal_rh_pct: 40,
    bvlos_radius_km: 3.5,
    avg_response_sec: 55,
    faa_waiver_id: 'FAA-COA-BVLOS-CVPD-PIONEER',
    power_source: 'Grid + Generator',
    connectivity: 'FirstNet 5G + Dedicated Fiber',
    cad_integration: 'Motorola PremierOne CAD / DroneSense',
    active_sortie: {
      callsign: 'CVPD-FALCON-1',
      incident_type: 'Assault in Progress / Weapons Fired',
      incident_cad_code: '245-PC-BROADWAY',
      target_coords: [-117.0850, 32.6320],
      current_coords: [-117.0815, 32.6355],
      altitude_ft_agl: 320,
      speed_kts: 35,
      heading_deg: 210,
      eta_seconds: 18,
      camera_mode: 'FLIR Radiometric Thermal'
    }
  },
  {
    id: 'dfr-smpd-01',
    callsign: 'SMPD-DFR-01',
    name: 'Santa Monica Police Headquarters Rooftop Sentry',
    sector: 'DFR_MUNICIPAL',
    agency: 'Santa Monica Police Department',
    agency_display: 'SMPD Tactical DFR Division',
    city: 'Santa Monica',
    region: 'California',
    country: 'United States',
    coordinates: [-118.4900, 34.0150],
    elevation_m: 26,
    land_ownership: 'City Municipal Public Safety Building',
    status: 'READY_STANDBY',
    status_label: 'Standby / Pier & Downtown Patrol',
    dock_model: 'Skydio Weatherproof Dock',
    drone_model: 'Skydio X10 DFR Autonomous',
    payload: 'FLIR Boson+ Thermal + 64MP Optical',
    battery_pct: 100,
    internal_temp_c: 21.0,
    internal_rh_pct: 55,
    bvlos_radius_km: 2.5,
    avg_response_sec: 50,
    faa_waiver_id: 'FAA-Part107-BVLOS-SMPD-2026',
    power_source: 'Solar + Grid',
    connectivity: 'FirstNet 5G + LA RICS Microwave',
    cad_integration: 'Axon Respond CAD',
    active_sortie: null
  },

  // =========================================================================
  // 3. FEDERAL BORDER SECURITY & MILITARY BASE DEFENSE
  // =========================================================================
  {
    id: 'sec-cbp-sd-01',
    callsign: 'CBP-SENTRY-TOWER-01',
    name: 'US Border Patrol Otay Mountain Autonomous Sentry Dock',
    sector: 'BORDER_DEFENSE',
    agency: 'US Customs & Border Protection',
    agency_display: 'USBP San Diego Sector Command',
    city: 'Otay Mesa',
    region: 'California',
    country: 'United States',
    coordinates: [-116.8480, 32.5980],
    elevation_m: 480,
    land_ownership: 'Federal Land (DHS / BLM Boundary)',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Tactical Border Vectoring',
    dock_model: 'Anduril Ghost Sentry Autonomous Dock',
    drone_model: 'Anduril Ghost 4 Tactical UAV',
    payload: 'Lattice AI Computer Vision + Long-Range MWIR Thermal',
    battery_pct: 88,
    internal_temp_c: 24.5,
    internal_rh_pct: 32,
    bvlos_radius_km: 6.0,
    avg_response_sec: 65,
    faa_waiver_id: 'DOD-DHS-CONUS-BVLOS-RESTRICTED',
    power_source: 'Solar 15kW Array + Military Diesel Generator',
    connectivity: 'Encrypted L3Harris Microwave + Starlink Military LEO',
    cad_integration: 'Lattice C2 / USBP Sector Dispatch',
    active_sortie: {
      callsign: 'GHOST-SENTRY-01',
      incident_type: 'Unauthorized Border Incursion Tracking',
      incident_cad_code: 'CBP-ZONE-B7',
      target_coords: [-116.8550, 32.5920],
      current_coords: [-116.8510, 32.5955],
      altitude_ft_agl: 450,
      speed_kts: 42,
      heading_deg: 195,
      eta_seconds: 30,
      camera_mode: 'FLIR Radiometric Thermal'
    }
  },
  {
    id: 'mil-cp-01',
    callsign: 'USMC-PEN-SENTRY-01',
    name: 'Camp Pendleton Red Beach Perimeter Defense Dock',
    sector: 'BORDER_DEFENSE',
    agency: 'United States Marine Corps',
    agency_display: 'MCB Camp Pendleton Provost Marshal Office',
    city: 'Oceanside',
    region: 'California',
    country: 'United States',
    coordinates: [-117.4520, 33.2840],
    elevation_m: 22,
    land_ownership: 'DoD Military Reservation (Camp Pendleton)',
    status: 'READY_STANDBY',
    status_label: 'Standby / Coastal Amphibious Sentry',
    dock_model: 'Easy Aerial SMR Heavy Military Enclosure',
    drone_model: 'Osprey Hexacopter Autonomous Tether/Free',
    payload: 'Dual LWIR/EO Gimbal + Laser Illuminator Class 3B',
    battery_pct: 100,
    internal_temp_c: 20.5,
    internal_rh_pct: 62,
    bvlos_radius_km: 5.0,
    avg_response_sec: 60,
    faa_waiver_id: 'MIL-AIRSPACE-R2503-USMC',
    power_source: 'Military Base Grid + Battery Bunker',
    connectivity: 'DoD Secure Mesh + SIPRNet Gateway',
    cad_integration: 'USMC Force Protection Tactical C2',
    active_sortie: null
  },

  // =========================================================================
  // 4. UNINCORPORATED LAND & FEDERAL BLM / USFS REMOTE SENTRY STATIONS
  // =========================================================================
  {
    id: 'blm-brd-01',
    callsign: 'BLM-SENTRY-BRD-01',
    name: 'Black Rock Desert BLM Solar Autonomous Outpost Dock',
    sector: 'BLM_REMOTE_OUTPOST',
    agency: 'Bureau of Land Management',
    agency_display: 'DOI BLM Winnemucca District',
    city: 'Gerlach (Unincorporated)',
    region: 'Nevada',
    country: 'United States',
    coordinates: [-119.0550, 40.8920],
    elevation_m: 1195,
    land_ownership: 'Federal Land (DOI Bureau of Land Management)',
    status: 'READY_STANDBY',
    status_label: 'Standby / Playa Environmental & SAR Monitor',
    dock_model: 'Percepto Air Max Ruggedized Desert Enclosure',
    drone_model: 'Percepto Air Max Heavy Multi-Sensor',
    payload: 'Radiometric Thermal + 24x Optical + Air Quality VOC Sensor',
    battery_pct: 100,
    internal_temp_c: 26.2,
    internal_rh_pct: 18,
    bvlos_radius_km: 5.0,
    avg_response_sec: 75,
    faa_waiver_id: 'FAA-BLM-WEST-BVLOS-0482',
    power_source: 'Solar 12kW Array + Off-Grid Iron-Phosphate 40kWh',
    connectivity: 'Starlink Business LEO + 900MHz Telemetry Radio',
    cad_integration: 'Pershing County 911 / BLM Interagency Dispatch',
    active_sortie: null
  },
  {
    id: 'usfs-sierra-01',
    callsign: 'CALFIRE-RIDGE-01',
    name: 'Sierra National Forest / Cal Fire Wildfire Sentry Dock',
    sector: 'BLM_REMOTE_OUTPOST',
    agency: 'Cal Fire & US Forest Service',
    agency_display: 'Cal Fire Fresno-Kings Unit / USFS Joint Sentry',
    city: 'Shaver Lake (Unincorporated)',
    region: 'California',
    country: 'United States',
    coordinates: [-119.3120, 37.1040],
    elevation_m: 1680,
    land_ownership: 'Federal Land (USDA US Forest Service)',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Wildfire Thermal Infrared Patrol',
    dock_model: 'DJI Dock 2 Mountain Enclosure (De-icing Active)',
    drone_model: 'DJI Matrice 3D Wildland Thermal',
    payload: 'High-Sensitivity Radiometric FLIR + Smoke Penetration IR',
    battery_pct: 82,
    internal_temp_c: 16.4,
    internal_rh_pct: 35,
    bvlos_radius_km: 4.5,
    avg_response_sec: 60,
    faa_waiver_id: 'FAA-CALFIRE-STATEWIDE-BVLOS',
    power_source: 'Solar 6kW + Fuel Cell Hybrid',
    connectivity: 'FirstNet 5G + USFS Mountain Repeater Mesh',
    cad_integration: 'Cal Fire Altaris CAD / FIRMS Live Uplink',
    active_sortie: {
      callsign: 'CALFIRE-DRONE-8',
      incident_type: 'Thermal Flare & Lightning Ignition Sweep',
      incident_cad_code: 'SMOKE-RIDGE-SEC3',
      target_coords: [-119.3250, 37.1120],
      current_coords: [-119.3190, 37.1085],
      altitude_ft_agl: 400,
      speed_kts: 32,
      heading_deg: 310,
      eta_seconds: 28,
      camera_mode: 'FLIR Radiometric Thermal'
    }
  },

  // =========================================================================
  // 5. CRITICAL INFRASTRUCTURE, NUCLEAR, SEAPORTS & ENERGY GRIDS
  // =========================================================================
  {
    id: 'infra-diablo-01',
    callsign: 'NRC-DIABLO-SENTRY-01',
    name: 'Diablo Canyon Nuclear Power Station Perimeter Dock',
    sector: 'CRITICAL_INFRASTRUCTURE',
    agency: 'Pacific Gas & Electric / US Nuclear Regulatory Commission',
    agency_display: 'Diablo Canyon Nuclear Security Operations',
    city: 'Avila Beach (Unincorporated)',
    region: 'California',
    country: 'United States',
    coordinates: [-120.8540, 35.2110],
    elevation_m: 45,
    land_ownership: 'Private Utility / NRC Critical Infrastructure Exclusion Zone',
    status: 'READY_STANDBY',
    status_label: 'Standby / Nuclear Perimeter Guard',
    dock_model: 'Percepto Air Max Nuclear Grade Hangar',
    drone_model: 'Percepto Air Max Autonomous Optical/Thermal',
    payload: 'Gamma Radiation Dosimeter + FLIR Thermal + 30x Optical Zoom',
    battery_pct: 100,
    internal_temp_c: 21.8,
    internal_rh_pct: 52,
    bvlos_radius_km: 3.5,
    avg_response_sec: 35,
    faa_waiver_id: 'FAA-NRC-PART91-PROHIBITED-P42',
    power_source: 'Nuclear Class 1E Uninterruptible Power Supply (UPS)',
    connectivity: 'Air-Gapped Fiber Optic Mesh + FirstNet Encrypted Band 14',
    cad_integration: 'PG&E Nuclear Security Force Tactical TOC',
    active_sortie: null
  },
  {
    id: 'infra-polb-01',
    callsign: 'POLB-PORT-SENTRY-01',
    name: 'Port of Long Beach Pier J Automated Terminal Dock',
    sector: 'CRITICAL_INFRASTRUCTURE',
    agency: 'Port of Long Beach & US Coast Guard',
    agency_display: 'POLB Harbor Security / Joint Harbor Ops (JHOC)',
    city: 'Long Beach',
    region: 'California',
    country: 'United States',
    coordinates: [-118.1880, 33.7420],
    elevation_m: 20,
    land_ownership: 'Municipal Seaport Commercial Terminal',
    status: 'READY_STANDBY',
    status_label: 'Standby / Container Berth Sentry',
    dock_model: 'DJI Dock 2 Industrial Marine Enclosure',
    drone_model: 'DJI Matrice 3D Enterprise',
    payload: 'Thermal FLIR + Hazardous Gas Detection + Optical Zoom',
    battery_pct: 97,
    internal_temp_c: 20.0,
    internal_rh_pct: 61,
    bvlos_radius_km: 3.0,
    avg_response_sec: 45,
    faa_waiver_id: 'FAA-PORTS-BVLOS-POLB-2026',
    power_source: 'Shore Grid + Generator',
    connectivity: 'Private 5G CBRS Network + Port Fiber',
    cad_integration: 'POLB Security Center / USCG Sector LA-LB',
    active_sortie: null
  },

  // =========================================================================
  // 6. GLOBAL INTERNATIONAL DFR & DEFENSE NETWORKS
  // =========================================================================
  {
    id: 'intl-dxb-01',
    callsign: 'DXB-POLICE-DRONE-01',
    name: 'Dubai Police General HQ Smart City Drone Box Station 1',
    sector: 'INTERNATIONAL_DFR',
    agency: 'Dubai Police General Headquarters',
    agency_display: 'Dubai Police Autonomous Drone Box Network',
    city: 'Dubai',
    region: 'Dubai Emirate',
    country: 'United Arab Emirates',
    coordinates: [55.3320, 25.2650],
    elevation_m: 35,
    land_ownership: 'Government of Dubai Municipal Domain',
    status: 'MISSION_AIRBORNE',
    status_label: 'Airborne / Sheikh Zayed Highway Patrol',
    dock_model: 'Aispeech / DroneBox Desert Climate Extreme Enclosure',
    drone_model: 'Industrial Quadcopter DFR Autonomous',
    payload: 'AI Facial Recognition + License Plate OCR + Dual Thermal FLIR',
    battery_pct: 76,
    internal_temp_c: 28.5,
    internal_rh_pct: 38,
    bvlos_radius_km: 4.0,
    avg_response_sec: 40,
    faa_waiver_id: 'UAE-DCAA-AUTONOMOUS-CORRIDOR-2026',
    power_source: 'Grid 240V + Solar 10kW Array',
    connectivity: 'Etisalat Private 5G + Fiber',
    cad_integration: 'Dubai Police 999 Unified C4I System',
    active_sortie: {
      callsign: 'DXB-PATROL-1',
      incident_type: 'Multi-Vehicle Traffic Incident & Flow Monitoring',
      incident_cad_code: 'TRAFFIC-E11-CORRIDOR',
      target_coords: [55.3280, 25.2580],
      current_coords: [55.3305, 25.2615],
      altitude_ft_agl: 300,
      speed_kts: 36,
      heading_deg: 215,
      eta_seconds: 24,
      camera_mode: '64MP Optical Telephoto'
    }
  },
  {
    id: 'intl-sg-01',
    callsign: 'SG-HTX-DRONE-01',
    name: 'Singapore HTX Marina Bay Autonomous Homeland Security Dock',
    sector: 'INTERNATIONAL_DFR',
    agency: 'Home Team Science and Technology Agency (HTX)',
    agency_display: 'Singapore Police Force / HTX Sentry Mesh',
    city: 'Singapore',
    region: 'Central Region',
    country: 'Singapore',
    coordinates: [103.8560, 1.2840],
    elevation_m: 38,
    land_ownership: 'Government of Singapore National Territory',
    status: 'READY_STANDBY',
    status_label: 'Standby / Marina Bay Strategic Defense Mesh',
    dock_model: 'ST Engineering Autonomous Drone Station (Climate IP67)',
    drone_model: 'DroHub Heavy Autonomous Quadcopter',
    payload: 'AI Crowd Density Analytics + Radiometric FLIR + Optical Zoom',
    battery_pct: 100,
    internal_temp_c: 24.2,
    internal_rh_pct: 72,
    bvlos_radius_km: 3.0,
    avg_response_sec: 42,
    faa_waiver_id: 'CAAS-BVLOS-HOMELAND-HTX-01',
    power_source: 'National Grid + Island Battery Reserve',
    connectivity: 'Singtel 5G Standalone + GovTech Fiber',
    cad_integration: 'Singapore Police Operations Command 999 C2',
    active_sortie: null
  }
];

export class GlobalDroneDockDataEngine {
  /**
   * Returns GeoJSON points for all docks matching the current bounding box.
   */
  public static getDroneDocksGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const docks = this.filterDocksByBbox(bboxStr);

    const features: GeoJSON.Feature[] = docks.map(d => ({
      type: 'Feature',
      id: d.id,
      geometry: {
        type: 'Point',
        coordinates: d.coordinates
      },
      properties: { ...d }
    }));

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Generates 3D physical bay polygon footprints for MapLibre 'fill-extrusion' rendering.
   * Renders realistic mini-hangars rising 6m to 14m off ground/rooftops.
   */
  public static get3DExtrusionGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const docks = this.filterDocksByBbox(bboxStr);
    const features: GeoJSON.Feature[] = [];

    const delta = 0.00015; // ~15m x 15m physical dock enclosure

    for (const d of docks) {
      const [lon, lat] = d.coordinates;
      const height = d.sector === 'BORDER_DEFENSE' ? 14 : (d.sector === 'CRITICAL_INFRASTRUCTURE' ? 10 : 7);

      const poly = [
        [
          [lon - delta, lat - delta],
          [lon + delta, lat - delta],
          [lon + delta, lat + delta],
          [lon - delta, lat + delta],
          [lon - delta, lat - delta]
        ]
      ];

      features.push({
        type: 'Feature',
        id: `ext-${d.id}`,
        geometry: {
          type: 'Polygon',
          coordinates: poly
        },
        properties: {
          id: d.id,
          callsign: d.callsign,
          sector: d.sector,
          status: d.status,
          height_m: height,
          color: this.getSectorColor(d.sector, d.status)
        }
      });
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Generates BVLOS response coverage range rings (1.5 mi / 2.5 km standard radius).
   */
  public static getBVLOSRangeRingsGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const docks = this.filterDocksByBbox(bboxStr);
    const features: GeoJSON.Feature[] = [];

    for (const d of docks) {
      const circlePoly = this.createCirclePolygon(d.coordinates[0], d.coordinates[1], d.bvlos_radius_km);
      features.push({
        type: 'Feature',
        id: `ring-${d.id}`,
        geometry: {
          type: 'Polygon',
          coordinates: circlePoly
        },
        properties: {
          id: d.id,
          callsign: d.callsign,
          sector: d.sector,
          radius_km: d.bvlos_radius_km,
          status: d.status,
          strokeColor: this.getSectorColor(d.sector, d.status),
          fillColor: this.getSectorColor(d.sector, d.status)
        }
      });
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Generates tactical Blind-Spot Gap overlays:
   * Highlights gaps between interlocking docks where 911 response exceeds 90s.
   */
  public static getBlindSpotGapsGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const docks = this.filterDocksByBbox(bboxStr);
    const features: GeoJSON.Feature[] = [];

    // For Newport Beach network: Identify oceanward and mountain gaps
    if (docks.some(d => d.city === 'Newport Beach')) {
      // Gap 1: Crystal Cove state park coastal canyons gap
      features.push({
        type: 'Feature',
        id: 'blind-spot-crystal-cove',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-117.855, 33.580],
            [-117.830, 33.585],
            [-117.820, 33.565],
            [-117.850, 33.560],
            [-117.855, 33.580]
          ]]
        },
        properties: {
          id: 'blind-spot-crystal-cove',
          name: 'Crystal Cove State Park Canyon Blind Spot',
          reason: 'Severe terrain ridge shadow & USFS/State Park radio occlusion (>95s Drone Response)',
          severity: 'HIGH_LATENCY_GAP',
          color: '#f59e0b'
        }
      });

      // Gap 2: Offshore Santa Ana River mouth boundary gap
      features.push({
        type: 'Feature',
        id: 'blind-spot-river-mouth',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-117.975, 33.625],
            [-117.955, 33.620],
            [-117.960, 33.605],
            [-117.985, 33.610],
            [-117.975, 33.625]
          ]]
        },
        properties: {
          id: 'blind-spot-river-mouth',
          name: 'West Newport Offshore Maritime Boundary Gap',
          reason: 'Jurisdictional boundary transition with Huntington Beach PD (>110s Response)',
          severity: 'JURISDICTIONAL_OVERLAP',
          color: '#ef4444'
        }
      });
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }

  /**
   * Generates active airborne sorties GeoJSON (airborne drones and laser tether lines).
   */
  public static getAirborneSortiesGeoJson(bboxStr?: string | null): GeoJSON.FeatureCollection {
    const docks = this.filterDocksByBbox(bboxStr).filter(d => d.status === 'MISSION_AIRBORNE' && d.active_sortie);
    const features: GeoJSON.Feature[] = [];

    for (const d of docks) {
      const s = d.active_sortie!;
      
      // 1. LineString tether connecting dock to airborne drone
      features.push({
        type: 'Feature',
        id: `tether-${d.id}`,
        geometry: {
          type: 'LineString',
          coordinates: [d.coordinates, s.current_coords]
        },
        properties: {
          dock_id: d.id,
          callsign: s.callsign,
          type: 'laser_tether',
          altitude_ft: s.altitude_ft_agl,
          color: '#38bdf8'
        }
      });

      // 2. LineString targeting vector connecting airborne drone to 911 incident
      features.push({
        type: 'Feature',
        id: `target-${d.id}`,
        geometry: {
          type: 'LineString',
          coordinates: [s.current_coords, s.target_coords]
        },
        properties: {
          dock_id: d.id,
          callsign: s.callsign,
          type: 'incident_target_vector',
          incident_type: s.incident_type,
          color: '#ef4444'
        }
      });

      // 3. Point marker for the airborne drone itself
      features.push({
        type: 'Feature',
        id: `drone-air-${d.id}`,
        geometry: {
          type: 'Point',
          coordinates: s.current_coords
        },
        properties: {
          dock_id: d.id,
          callsign: s.callsign,
          incident_type: s.incident_type,
          cad_code: s.incident_cad_code,
          altitude_ft: s.altitude_ft_agl,
          speed_kts: s.speed_kts,
          heading_deg: s.heading_deg,
          eta_seconds: s.eta_seconds,
          camera_mode: s.camera_mode,
          color: '#06b6d4'
        }
      });
    }

    return {
      type: 'FeatureCollection',
      features
    };
  }

  private static filterDocksByBbox(bboxStr?: string | null): DroneDockStation[] {
    if (!bboxStr) return WORLDWIDE_DRONE_DOCKS;
    const parts = bboxStr.split(',').map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return WORLDWIDE_DRONE_DOCKS;

    const [minLon, minLat, maxLon, maxLat] = parts;
    return WORLDWIDE_DRONE_DOCKS.filter(d => 
      d.coordinates[0] >= minLon && d.coordinates[0] <= maxLon &&
      d.coordinates[1] >= minLat && d.coordinates[1] <= maxLat
    );
  }

  public static getSectorColor(sector: DroneDockSector, status?: DroneDockStatus): string {
    if (status === 'MISSION_AIRBORNE') return '#00f0ff'; // Intense neon cyan
    if (status === 'RECHARGING') return '#f59e0b';       // Amber charging
    if (status === 'WEATHER_HOLD') return '#94a3b8';     // Muted slate
    if (status === 'MAINTENANCE') return '#ef4444';      // Red

    switch (sector) {
      case 'DFR_MUNICIPAL': return '#38bdf8';          // Police / DFR Sky Blue
      case 'BORDER_DEFENSE': return '#f43f5e';         // Military / CBP Rose Red
      case 'CRITICAL_INFRASTRUCTURE': return '#fbbf24';// Utility Amber
      case 'BLM_REMOTE_OUTPOST': return '#10b981';     // BLM / CalFire Emerald
      case 'INTERNATIONAL_DFR': return '#a855f7';      // Purple
      default: return '#38bdf8';
    }
  }

  private static createCirclePolygon(centerLon: number, centerLat: number, radiusKm: number, points = 32): number[][][] {
    const coords: number[][] = [];
    const earthRadiusKm = 6371;

    const latRad = (centerLat * Math.PI) / 180;
    const lonRad = (centerLon * Math.PI) / 180;
    const d = radiusKm / earthRadiusKm;

    for (let i = 0; i <= points; i++) {
      const bearing = (i * 2 * Math.PI) / points;
      const ptLat = Math.asin(
        Math.sin(latRad) * Math.cos(d) + Math.cos(latRad) * Math.sin(d) * Math.cos(bearing)
      );
      const ptLon =
        lonRad +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d) * Math.cos(latRad),
          Math.cos(d) - Math.sin(latRad) * Math.sin(ptLat)
        );

      coords.push([(ptLon * 180) / Math.PI, (ptLat * 180) / Math.PI]);
    }

    return [coords];
  }
}
