// defenseInfrastructureEngine.ts
// Comprehensive Geospatial Defense & Survival Infrastructure Engine
// Covers:
// 1. Military Bunkers & Underground Command Complexes (Continuity of Government, NORAD, DUMS, Nuclear C2)
// 2. Citizen-Access Bunkers & Public Fallout Shelters (Private survival communities, silo conversions, civil defense networks)
// 3. Bomb & Munitions Storage Depots (Hawthorne, KUMMSC nuclear vaults, MCAAP bomb plants, Trident depots)
// 4. Strategic Military Bases & Installations (Air Force, Army, Navy, Marines, Space Force, Joint global hubs)

export interface MilitaryBunker {
  id: string;
  name: string;
  codeName?: string;
  facilityType: 'Continuity of Government (CoG)' | 'Underground Combatant Command' | 'Deep Underground Command Fortress' | 'Nuclear Early Warning & C2' | 'Declassified Historical Redoubt';
  operator: string;
  depthFeet: number;
  blastOverpressurePsi: number;
  personnelCapacity: number;
  autonomyDurationDays: number;
  empHardeningDb: number;
  status: 'ACTIVE_TOP_SECRET' | 'ACTIVE_OPERATIONAL' | 'RESERVE_STANDBY' | 'DECOMMISSIONED_HISTORIC';
  subterraneanSqFt: number;
  blastDoorTons?: number;
  independentPower: string;
  waterSupply: string;
  airFiltration: string;
  lat: number;
  lon: number;
  locationDescription: string;
  country: string;
  keyFeatures: string[];
}

export interface CitizenBunker {
  id: string;
  name: string;
  bunkerCategory: 'Private Survival Community' | 'Converted Missile Silo' | 'Municipal Civil Defense Network' | 'Public Bedrock Fallout Shelter' | 'Subterranean Emergency Cache' | string;
  operator: string;
  accessProtocol: 'Public Open Access' | 'Member Community / Private Cohort' | 'Civil Defense Municipal' | 'Municipal Civil Defense' | 'Declassified Historic Shelter' | string;
  capacityPeople: number;
  autonomyDurationMonths: number;
  cbrnFiltration: boolean;
  filtrationDetails: string;
  blastRatingPsi?: number;
  lat: number;
  lon: number;
  cityState: string;
  country: string;
  annualEmergencyFoodReserveYears: number;
  amenities: string[];
  intakeRequirements: string;
}

export interface BombStorageDepot {
  id: string;
  name: string;
  depotCategory: 'Ammunition Depot & Logistics' | 'Underground Nuclear Weapons Storage (KUMMSC/WS3)' | 'Bomb & Warhead Manufacturing' | 'Strategic Submarine Weapons Facility (SLBM)' | 'Missile Maintenance & Storage';
  branchOrAgency: 'US Army' | 'US Navy' | 'US Air Force' | 'Defense Logistics Agency' | 'NATO Joint Command';
  landAreaAcres: number;
  storageBunkersCount: number; // earth-covered igloos / reinforced magazines
  primaryMunitions: string[];
  securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)' | 'Level 4 (Heavy Ordnance)' | 'Level 3 (Conventional Ammunition)';
  railConnected: boolean;
  airliftCapable: boolean;
  lat: number;
  lon: number;
  cityState: string;
  country: string;
  status: 'ACTIVE_MISSION_CRITICAL' | 'ACTIVE_OPERATIONAL' | 'DEMILITARIZATION_ACTIVE';
  historicalNote?: string;
}

export interface MilitaryBase {
  id: string;
  name: string;
  branch: 'US Army' | 'US Air Force' | 'US Navy' | 'US Marine Corps' | 'US Space Force' | 'Joint & Intelligence Commands' | 'International Allied';
  baseType: 'Major Combat Installation' | 'Naval Fleet Station' | 'Air Warfare Center & Range' | 'Space Launch & Satellite Control' | 'Proving Ground & Weapons Test' | 'Overseas Strategic Staging Hub';
  personnelActiveDuty: number;
  civilianPersonnel: number;
  landAreaAcres: number;
  headquartersOrHostWing: string;
  icaoCode?: string;
  primaryMission: string;
  lat: number;
  lon: number;
  locationString: string;
  country: string;
  strategicSignificance: string;
}

export class DefenseInfrastructureEngine {
  // 1. Curated Military Bunkers & Underground Command Centers
  public static readonly MILITARY_BUNKERS: MilitaryBunker[] = [
    {
      id: 'bunker-raven-rock',
      name: 'Raven Rock Mountain Complex (Site R / "Underground Pentagon")',
      codeName: 'Site R / Harry\'s Hole',
      facilityType: 'Continuity of Government (CoG)',
      operator: 'Defense Information Systems Agency / US DoD',
      depthFeet: 650,
      blastOverpressurePsi: 250,
      personnelCapacity: 3000,
      autonomyDurationDays: 45,
      empHardeningDb: 100,
      status: 'ACTIVE_TOP_SECRET',
      subterraneanSqFt: 300000,
      blastDoorTons: 34,
      independentPower: 'Six 1,000 kW diesel generators with 100,000+ gallon fuel reservoir',
      waterSupply: 'Two subterranean reservoirs holding millions of gallons with independent artesian wells',
      airFiltration: 'Positive pressure CBRN overpressure with blast valves and regenerative carbon HEPA',
      lat: 39.7342,
      lon: -77.4194,
      locationDescription: 'Liberty Township, Adams County, PA (Near Blue Ridge Summit)',
      country: 'USA',
      keyFeatures: [
        'Alternate National Military Command Center (ANMCC)',
        '34-ton steel blast doors inside solid granite mountain core',
        'Direct fiber and microwave interlinks to Pentagon and White House',
        'Freestanding multi-story buildings mounted on shock-absorbing springs'
      ]
    },
    {
      id: 'bunker-cheyenne-mountain',
      name: 'Cheyenne Mountain Complex',
      codeName: 'NORAD Alternate Command Center',
      facilityType: 'Nuclear Early Warning & C2',
      operator: 'US Air Force / North American Aerospace Defense Command (NORAD)',
      depthFeet: 2000,
      blastOverpressurePsi: 450,
      personnelCapacity: 1000,
      autonomyDurationDays: 60,
      empHardeningDb: 120,
      status: 'ACTIVE_OPERATIONAL',
      subterraneanSqFt: 200000,
      blastDoorTons: 25,
      independentPower: 'Six 1,750 hp diesel engine generators in dedicated excavated cavern',
      waterSupply: 'Subterranean freshwater lake holding 1.5 million gallons carved into granite',
      airFiltration: 'Triple-redundant NBC filtration system drawing from natural mountain aquifers',
      lat: 38.7439,
      lon: -104.8458,
      locationDescription: 'El Paso County, Colorado Springs, CO',
      country: 'USA',
      keyFeatures: [
        'Built beneath 2,000 feet of solid granite',
        '15 three-story steel buildings mounted on 1,319 giant helical steel shock springs',
        'Two 25-ton blast doors rated to seal against multi-megaton nuclear detonations',
        'Primary electromagnetic pulse (EMP) shielded aerospace defense nexus'
      ]
    },
    {
      id: 'bunker-mount-weather',
      name: 'Mount Weather Emergency Operations Center',
      codeName: 'High Point Special Facility / Area B',
      facilityType: 'Continuity of Government (CoG)',
      operator: 'Federal Emergency Management Agency (FEMA) / Executive Office',
      depthFeet: 400,
      blastOverpressurePsi: 200,
      personnelCapacity: 2500,
      autonomyDurationDays: 90,
      empHardeningDb: 90,
      status: 'ACTIVE_TOP_SECRET',
      subterraneanSqFt: 600000,
      blastDoorTons: 30,
      independentPower: 'Subterranean fossil/diesel power plant and UPS battery banks',
      waterSupply: 'Subterranean pond holding 2 million gallons and high-yield spring networks',
      airFiltration: 'Full military-grade nuclear fallout & chemical scrubbers',
      lat: 39.0628,
      lon: -77.8894,
      locationDescription: 'Bluemont, Clarke County, VA',
      country: 'USA',
      keyFeatures: [
        'Continuous civilian government relocation facility for President, Cabinet, and SCOTUS',
        'Houses presidential emergency broadcast studios with nationwide satellite uplinks',
        'Internal mass transit railway and electric shuttle system',
        'Complete subterranean hospital, dormitories, and dining halls'
      ]
    },
    {
      id: 'bunker-offutt-stratcom',
      name: 'USSTRATCOM Underground Command Center (C2F)',
      codeName: 'Global Operations Center (GOC)',
      facilityType: 'Underground Combatant Command',
      operator: 'United States Strategic Command (USSTRATCOM)',
      depthFeet: 100,
      blastOverpressurePsi: 150,
      personnelCapacity: 3500,
      autonomyDurationDays: 30,
      empHardeningDb: 110,
      status: 'ACTIVE_TOP_SECRET',
      subterraneanSqFt: 916000,
      blastDoorTons: 15,
      independentPower: 'Dedicated redundant substation grid and underground fuel cells',
      waterSupply: 'Closed-loop chilling and potable deep well system',
      airFiltration: 'Advanced CBRN filtration with hermetic blast locks',
      lat: 41.1172,
      lon: -95.9136,
      locationDescription: 'Offutt AFB, Bellevue, NE',
      country: 'USA',
      keyFeatures: [
        'Supreme Command and Control center for the entire US Nuclear Triad',
        'Full EMP-hardened construction built inside reinforced Faraday cages',
        'Direct real-time early warning data feeds from SBIRS satellites and PAVE PAWS radars',
        'Airborne Command Post (E-4B Nightwatch "Doomsday Plane") operations link'
      ]
    },
    {
      id: 'bunker-greenbrier',
      name: 'The Greenbrier Bunker (Project Greek Island)',
      codeName: 'Project Greek Island / Project Casper',
      facilityType: 'Declassified Historical Redoubt',
      operator: 'US Congress / Declassified (Historical Benchmark)',
      depthFeet: 72,
      blastOverpressurePsi: 80,
      personnelCapacity: 1100,
      autonomyDurationDays: 60,
      empHardeningDb: 60,
      status: 'DECOMMISSIONED_HISTORIC',
      subterraneanSqFt: 112544,
      blastDoorTons: 25,
      independentPower: 'Self-contained power plant with three 25,000-gallon diesel tanks',
      waterSupply: 'Intake from local reservoirs plus 100,000-gallon internal storage tank',
      airFiltration: 'Chemical and radiological air intake scrubbers with blast valves',
      lat: 37.7869,
      lon: -80.3094,
      locationDescription: 'White Sulphur Springs, Greenbrier County, WV',
      country: 'USA',
      keyFeatures: [
        'Hidden beneath the West Virginia Wing of the Greenbrier luxury resort',
        'Contained legislative chambers for both the Senate and the House of Representatives',
        'Declassified in 1992 following investigative report by The Washington Post',
        'Serves as the archetypal civil architecture prototype for hardened underground bunkers'
      ]
    },
    {
      id: 'bunker-peters-mountain',
      name: 'Peters Mountain Communications Complex',
      codeName: 'Project West Chester / AT&T Site 2',
      facilityType: 'Continuity of Government (CoG)',
      operator: 'US Intelligence Community / Continuity Communications',
      depthFeet: 350,
      blastOverpressurePsi: 180,
      personnelCapacity: 200,
      autonomyDurationDays: 60,
      empHardeningDb: 95,
      status: 'ACTIVE_TOP_SECRET',
      subterraneanSqFt: 85000,
      blastDoorTons: 20,
      independentPower: 'Heavy industrial Caterpillar diesel generators with underground fuel tanks',
      waterSupply: 'Natural mountain springs and independent chlorination system',
      airFiltration: 'HEPA and activated carbon positive pressure systems',
      lat: 37.5833,
      lon: -80.4833,
      locationDescription: 'Peters Mountain, Giles County, VA',
      country: 'USA',
      keyFeatures: [
        'Critical intelligence relay bunker built directly into ridge bedrock',
        'Reinforced microwave and optical trunk backbone junction',
        'Designed to maintain continuity of classified federal signals intelligence during nuclear exchange'
      ]
    },
    {
      id: 'bunker-yamantau',
      name: 'Mount Yamantau Subterranean Fortress',
      codeName: 'Mezhgorye / Object 007',
      facilityType: 'Deep Underground Command Fortress',
      operator: 'Main Directorate of Special Programs of the President (GUSP) Russia',
      depthFeet: 3000,
      blastOverpressurePsi: 800,
      personnelCapacity: 60000,
      autonomyDurationDays: 180,
      empHardeningDb: 120,
      status: 'ACTIVE_TOP_SECRET',
      subterraneanSqFt: 4000000,
      blastDoorTons: 50,
      independentPower: 'Subterranean dual-reactor / dedicated geothermal and fossil supply',
      waterSupply: 'Deep subterranean mountain aquifer tunnels',
      airFiltration: 'Multi-stage hermetic regenerative nuclear filtration',
      lat: 54.2547,
      lon: 58.1067,
      locationDescription: 'Beloretsky District, Republic of Bashkortostan, Russia',
      country: 'Russia',
      keyFeatures: [
        'Constructed inside a quartz mountain in the Southern Urals',
        'Estimated to be capable of housing 60,000 leadership and command personnel',
        'Direct rail lines connecting the complex to the closed city of Mezhgorye',
        'Capable of withstanding repeated direct strikes from modern earth-penetrating nuclear weapons'
      ]
    },
    {
      id: 'bunker-corsham-burlington',
      name: 'Burlington Bunker (Central Government War HQ)',
      codeName: 'Subterfuge / Turnstile / Site 3',
      facilityType: 'Declassified Historical Redoubt',
      operator: 'UK Ministry of Defence / Historical',
      depthFeet: 120,
      blastOverpressurePsi: 100,
      personnelCapacity: 4000,
      autonomyDurationDays: 90,
      empHardeningDb: 70,
      status: 'DECOMMISSIONED_HISTORIC',
      subterraneanSqFt: 1500000,
      blastDoorTons: 20,
      independentPower: 'Four large English Electric diesel generators',
      waterSupply: 'Underground reservoir and subterranean water treatment facility',
      airFiltration: 'Full NBC ventilation plants with toxic gas scrubbers',
      lat: 51.4258,
      lon: -2.1953,
      locationDescription: 'Corsham, Wiltshire, England',
      country: 'United Kingdom',
      keyFeatures: [
        '35-acre subterranean city carved out of former Bath stone limestone quarries',
        'Designed to house the UK Prime Minister, Cabinet, and Royal Family in a nuclear war',
        'Featured miles of paved roads, 60-line telephone exchange, and BBC broadcasting suite'
      ]
    }
  ];

  // 2. Curated Citizen-Access Bunkers & Civil Defense Shelters
  public static readonly CITIZEN_BUNKERS: CitizenBunker[] = [
    {
      id: 'citizen-vivos-xpoint',
      name: 'Vivos xPoint Survival Community',
      bunkerCategory: 'Private Survival Community',
      operator: 'The Vivos Group',
      accessProtocol: 'Member Community / Private Cohort',
      capacityPeople: 5000,
      autonomyDurationMonths: 12,
      cbrnFiltration: true,
      filtrationDetails: 'Military-grade HEPA & NBC positive pressure overpressure air system per igloo',
      blastRatingPsi: 100,
      lat: 43.1817,
      lon: -103.8569,
      cityState: 'Igloo / Black Hills, Fall River County, SD',
      country: 'USA',
      annualEmergencyFoodReserveYears: 1.5,
      amenities: [
        '575 hardened concrete and steel earth-bermed military munitions igloos',
        'Private water wells with 100,000+ gallon water storage tanks',
        'Equestrian facilities, general store, medical center, shooting ranges',
        'Private security force with hardened perimeter checkpoints'
      ],
      intakeRequirements: 'Pre-vetted private membership and bunker leasehold purchase'
    },
    {
      id: 'citizen-survival-condo',
      name: 'Survival Condo (Converted Atlas-F Silo)',
      bunkerCategory: 'Converted Missile Silo',
      operator: 'Survival Condo LLC',
      accessProtocol: 'Member Community / Private Cohort',
      capacityPeople: 75,
      autonomyDurationMonths: 60,
      cbrnFiltration: true,
      filtrationDetails: 'Nuclear, Biological, and Chemical (NBC) air filtration with automated backwash sand filters',
      blastRatingPsi: 200,
      lat: 39.4000,
      lon: -97.6667,
      cityState: 'Near Concordia, Cloud County, KS',
      country: 'USA',
      annualEmergencyFoodReserveYears: 5.0,
      amenities: [
        '15 subterranean levels built inside a 9-foot-thick hardened concrete missile silo',
        'Indoor hydroponics and aquaculture farm producing organic produce and fish',
        'Subterranean swimming pool, movie theater, classroom, library, and surgical suite',
        'Redundant wind turbine and diesel generator microgrid'
      ],
      intakeRequirements: 'Full background clearance and ownership of condo unit'
    },
    {
      id: 'citizen-helsinki-merihaka',
      name: 'Helsinki Bedrock Civil Defense Network (Merihaka)',
      bunkerCategory: 'Municipal Civil Defense Network',
      operator: 'City of Helsinki Rescue Department',
      accessProtocol: 'Public Open Access',
      capacityPeople: 6000,
      autonomyDurationMonths: 1,
      cbrnFiltration: true,
      filtrationDetails: 'Positive air pressure CBRN filtration systems with heavy steel blast valves',
      blastRatingPsi: 45,
      lat: 60.1800,
      lon: 24.9600,
      cityState: 'Merihaka, Helsinki',
      country: 'Finland',
      annualEmergencyFoodReserveYears: 0.25,
      amenities: [
        'Part of Finland’s 50,000+ shelter network protecting over 4.8 million citizens',
        'Dual-use sports complex, underground parking, and community recreation halls during peacetime',
        'Can be sealed and transitioned into full blast shelter within 72 hours',
        'Hardened bedrock decontamination airlocks and emergency medical dispatch'
      ],
      intakeRequirements: 'Open to all citizens and residents upon national civil defense siren activation'
    },
    {
      id: 'citizen-helsinki-itakeskus',
      name: 'Itäkeskus Underground Bedrock Civil Defense Complex',
      bunkerCategory: 'Public Bedrock Fallout Shelter',
      operator: 'City of Helsinki Civil Protection',
      accessProtocol: 'Public Open Access',
      capacityPeople: 3800,
      autonomyDurationMonths: 1,
      cbrnFiltration: true,
      filtrationDetails: 'Continuous gas-tight CBRN blast filtration with auxiliary diesel blowers',
      blastRatingPsi: 50,
      lat: 60.2108,
      lon: 25.0772,
      cityState: 'Itäkeskus, Helsinki',
      country: 'Finland',
      annualEmergencyFoodReserveYears: 0.25,
      amenities: [
        'Two 50-meter swimming pools and saunas in peacetime, convertible into decontamination stations',
        'Accommodates 3,800 civilians with bunking, clean water, and food rations',
        'Deep granite bedrock location resistant to conventional and tactical nuclear impacts',
        'Underground emergency telecommunications network'
      ],
      intakeRequirements: 'Immediate public access upon civil protection emergency order'
    },
    {
      id: 'citizen-sonnenberg-public',
      name: 'Sonnenberg Public Civil Shelter',
      bunkerCategory: 'Municipal Civil Defense Network',
      operator: 'Canton of Lucerne Civil Defense',
      accessProtocol: 'Municipal Civil Defense',
      capacityPeople: 20000,
      autonomyDurationMonths: 1,
      cbrnFiltration: true,
      filtrationDetails: 'Massive ventilation scrubbers with 350-ton blast doors sealing motorway tunnels',
      blastRatingPsi: 80,
      lat: 47.0425,
      lon: 8.2835,
      cityState: 'Lucerne',
      country: 'Switzerland',
      annualEmergencyFoodReserveYears: 0.2,
      amenities: [
        'Engineered to shelter 20,000 citizens in seven underground levels and two motorway tunnels',
        'Reflects Swiss federal law (Federal Act on Civil Protection) guaranteeing shelter space for 100% of citizens',
        'Contained underground operating theaters, radio transmitters, and municipal command centers'
      ],
      intakeRequirements: 'Designated civil shelter for Lucerne district residents'
    },
    {
      id: 'citizen-fortitude-colorado',
      name: 'Fortitude Ranch Colorado',
      bunkerCategory: 'Private Survival Community',
      operator: 'Fortitude Ranch Inc.',
      accessProtocol: 'Member Community / Private Cohort',
      capacityPeople: 500,
      autonomyDurationMonths: 12,
      cbrnFiltration: true,
      filtrationDetails: 'HEPA and chemical fallout filtration with solar-assisted positive pressure',
      blastRatingPsi: 35,
      lat: 38.1500,
      lon: -105.3500,
      cityState: 'Custer County, CO',
      country: 'USA',
      annualEmergencyFoodReserveYears: 1.0,
      amenities: [
        'Ecosystem of underground concrete shelters and reinforced log cabin ramparts',
        'Perimeter guard towers with thermal imaging and early warning sensor trips',
        'Livestock raising, greenhouses, solar photovoltaic arrays, and high-volume well water',
        'Physician-led trauma medical clinic'
      ],
      intakeRequirements: 'Active member subscription and orientation training'
    },
    {
      id: 'citizen-subtropolis',
      name: 'SubTropolis Subterranean Complex',
      bunkerCategory: 'Subterranean Emergency Cache',
      operator: 'Hunt Midwest',
      accessProtocol: 'Member Community / Private Cohort',
      capacityPeople: 10000,
      autonomyDurationMonths: 24,
      cbrnFiltration: false,
      filtrationDetails: 'Industrial underground air circulation utilizing natural 65°F limestone caverns',
      blastRatingPsi: 60,
      lat: 39.1583,
      lon: -94.4833,
      cityState: 'Kansas City, Jackson County, MO',
      country: 'USA',
      annualEmergencyFoodReserveYears: 2.0,
      amenities: [
        'World’s largest underground business and survival storage complex (55 million sq ft)',
        'Carved 150 feet beneath the surface into 270-million-year-old Bethany Falls limestone',
        'Holds millions of pounds of emergency food reserves, federal archives, and strategic medical caches',
        'Direct subterranean rail and semi-truck delivery tunnels'
      ],
      intakeRequirements: 'Commercial leaseholders, designated federal logistics teams, and affiliated staff'
    },
    {
      id: 'citizen-oppidum',
      name: 'The Oppidum Luxury Survival Shelter',
      bunkerCategory: 'Private Survival Community',
      operator: 'Oppidum Shelters',
      accessProtocol: 'Member Community / Private Cohort',
      capacityPeople: 100,
      autonomyDurationMonths: 120,
      cbrnFiltration: true,
      filtrationDetails: 'Military-spec NBC air filtration with 10-year independent carbon and ozone regeneration',
      blastRatingPsi: 150,
      lat: 49.9800,
      lon: 14.7800,
      cityState: 'Central Bohemian Region',
      country: 'Czech Republic',
      annualEmergencyFoodReserveYears: 10.0,
      amenities: [
        'World’s largest private high-security residential shelter (323,000 sq ft)',
        'Built within a former top-secret joint Soviet-Czechoslovak military project begun in 1984',
        'Subterranean garden with simulated sunlight, cinema, wine cellar, conference center, and spa',
        'Blast gates capable of withstanding near-direct nuclear or natural cataclysms'
      ],
      intakeRequirements: 'Private ownership'
    }
  ];

  // 3. Curated Bomb & Munitions Storage Depots
  public static readonly BOMB_STORAGE_DEPOTS: BombStorageDepot[] = [
    {
      id: 'depot-hawthorne',
      name: 'Hawthorne Army Depot (HWAD)',
      depotCategory: 'Ammunition Depot & Logistics',
      branchOrAgency: 'US Army',
      landAreaAcres: 147000,
      storageBunkersCount: 2927,
      primaryMunitions: [
        'Heavy Aerial Bombs (MK-82, MK-84, BLU-109)',
        'Conventional artillery rounds and propellant charges',
        'Rocket motors, missile components, and demilitarization lines',
        'Strategic War Reserve Munitions (WRM)'
      ],
      securityTier: 'Level 4 (Heavy Ordnance)',
      railConnected: true,
      airliftCapable: true,
      lat: 38.5256,
      lon: -118.6239,
      cityState: 'Hawthorne, Mineral County, NV',
      country: 'USA',
      status: 'ACTIVE_OPERATIONAL',
      historicalNote: 'The World’s Largest Ammunition Depot. Spans 226 square miles with nearly 3,000 reinforced concrete storage igloos.'
    },
    {
      id: 'depot-kummsc',
      name: 'Kirtland Underground Munitions Maintenance and Storage Complex (KUMMSC)',
      depotCategory: 'Underground Nuclear Weapons Storage (KUMMSC/WS3)',
      branchOrAgency: 'US Air Force',
      landAreaAcres: 51000,
      storageBunkersCount: 120,
      primaryMunitions: [
        'B61 Mod 3/4/7/11/12 thermonuclear gravity bombs',
        'B83 high-yield strategic nuclear bombs',
        'W78 and W87 Minuteman III ICBM thermonuclear warheads',
        'W80 cruise missile nuclear warheads'
      ],
      securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)',
      railConnected: true,
      airliftCapable: true,
      lat: 35.0400,
      lon: -106.5500,
      cityState: 'Kirtland AFB, Albuquerque, NM',
      country: 'USA',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'The largest nuclear weapons storage complex in the world. 300,000 sq ft underground bunker with robotic cranes and automated warhead handling.'
    },
    {
      id: 'depot-mcalester',
      name: 'McAlester Army Ammunition Plant (MCAAP)',
      depotCategory: 'Bomb & Warhead Manufacturing',
      branchOrAgency: 'US Army',
      landAreaAcres: 45000,
      storageBunkersCount: 2200,
      primaryMunitions: [
        'General Purpose Bombs (MK-80 series)',
        'GBU-28 and BLU-109 Hard Target Penetrator "Bunker Busters"',
        'Precision Guided Munitions (JDAM and Paveway warheads)',
        'Tomahawk Land Attack Missile (TLAM) warhead integration'
      ],
      securityTier: 'Level 4 (Heavy Ordnance)',
      railConnected: true,
      airliftCapable: false,
      lat: 34.8322,
      lon: -95.8361,
      cityState: 'McAlester, Pittsburg County, OK',
      country: 'USA',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'The DoD’s premier bomb manufacturing and loading plant, producing the overwhelming majority of air-dropped bombs for the US Air Force and Navy.'
    },
    {
      id: 'depot-swflant',
      name: 'Strategic Weapons Facility Atlantic (SWFLANT)',
      depotCategory: 'Strategic Submarine Weapons Facility (SLBM)',
      branchOrAgency: 'US Navy',
      landAreaAcres: 16000,
      storageBunkersCount: 95,
      primaryMunitions: [
        'UGM-133A Trident II D5 Submarine-Launched Ballistic Missiles (SLBMs)',
        'W76-1 / W76-2 low-yield thermonuclear warheads',
        'W88 high-yield strategic thermonuclear warheads'
      ],
      securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)',
      railConnected: true,
      airliftCapable: true,
      lat: 30.7989,
      lon: -81.5286,
      cityState: 'Naval Submarine Base Kings Bay, Camden County, GA',
      country: 'USA',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'Maintains and loads the nuclear missile battery for all Atlantic Fleet Ohio-class ballistic missile submarines (SSBNs).'
    },
    {
      id: 'depot-swfpac',
      name: 'Strategic Weapons Facility Pacific (SWFPAC)',
      depotCategory: 'Strategic Submarine Weapons Facility (SLBM)',
      branchOrAgency: 'US Navy',
      landAreaAcres: 7000,
      storageBunkersCount: 110,
      primaryMunitions: [
        'Trident II D5 strategic submarine missiles',
        'W76 and W88 nuclear warhead reentry vehicles',
        'Solid rocket motor storage magazines'
      ],
      securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)',
      railConnected: true,
      airliftCapable: true,
      lat: 47.7200,
      lon: -122.7200,
      cityState: 'Naval Base Kitsap-Bangor, Silverdale, WA',
      country: 'USA',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'Primary West Coast nuclear stockpile depot servicing all Pacific Fleet Trident submarines.'
    },
    {
      id: 'depot-crane',
      name: 'Crane Army Ammunition Activity (CAAA) / NSA Crane',
      depotCategory: 'Ammunition Depot & Logistics',
      branchOrAgency: 'US Navy',
      landAreaAcres: 98000,
      storageBunkersCount: 1800,
      primaryMunitions: [
        'Pyrotechnics, flares, and electronic warfare decoys',
        'Naval gun ammunition (5-inch/54 and 57mm shells)',
        'Special Operations explosive breaching charges',
        'Precision missile motor storage'
      ],
      securityTier: 'Level 4 (Heavy Ordnance)',
      railConnected: true,
      airliftCapable: false,
      lat: 38.8894,
      lon: -86.8378,
      cityState: 'Crane, Martin County, IN',
      country: 'USA',
      status: 'ACTIVE_OPERATIONAL',
      historicalNote: 'The third largest naval installation in the world by land area, housing comprehensive munitions maintenance and storage facilities.'
    },
    {
      id: 'depot-whiteman-wsa',
      name: 'Whiteman AFB Weapons Storage Area (WSA)',
      depotCategory: 'Underground Nuclear Weapons Storage (KUMMSC/WS3)',
      branchOrAgency: 'US Air Force',
      landAreaAcres: 4000,
      storageBunkersCount: 65,
      primaryMunitions: [
        'GBU-57A/B Massive Ordnance Penetrator (MOP 30,000-lb bunker buster)',
        'B61-7 and B61-11 earth-penetrating nuclear gravity bombs',
        'B83-1 strategic thermonuclear bombs (1.2 megaton yield)',
        'AGM-158 JASSM / JASSM-ER cruise missiles'
      ],
      securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)',
      railConnected: false,
      airliftCapable: true,
      lat: 38.7303,
      lon: -93.5478,
      cityState: 'Knob Noster, Johnson County, MO',
      country: 'USA',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'Exclusive ordnance depot for the 509th Bomb Wing B-2 Spirit Stealth Bomber fleet.'
    },
    {
      id: 'depot-incirlik-ws3',
      name: 'Incirlik Air Base Weapons Storage and Security System (WS3)',
      depotCategory: 'Underground Nuclear Weapons Storage (KUMMSC/WS3)',
      branchOrAgency: 'NATO Joint Command',
      landAreaAcres: 3500,
      storageBunkersCount: 25,
      primaryMunitions: [
        'B61 nuclear gravity bombs (approx. 20-50 warheads housed in subterranean vaults)',
        'NATO shared deterrence strike weapons'
      ],
      securityTier: 'Level 5 (Nuclear / Deadly Force Authorized)',
      railConnected: false,
      airliftCapable: true,
      lat: 37.0019,
      lon: 35.4258,
      cityState: 'Adana',
      country: 'Turkey',
      status: 'ACTIVE_MISSION_CRITICAL',
      historicalNote: 'Underground WS3 vaults built directly into aircraft shelter floors, enabling rapid nuclear strike loading under armor protection.'
    }
  ];

  // 4. Curated Major Military Bases & Strategic Installations
  public static readonly MILITARY_BASES: MilitaryBase[] = [
    {
      id: 'base-fort-liberty',
      name: 'Fort Liberty (formerly Fort Bragg)',
      branch: 'US Army',
      baseType: 'Major Combat Installation',
      personnelActiveDuty: 53700,
      civilianPersonnel: 14000,
      landAreaAcres: 161000,
      headquartersOrHostWing: 'HQ US Army Special Operations Command (USASOC) & 82nd Airborne Division',
      icaoCode: 'KPOB',
      primaryMission: 'Global airborne rapid-reaction force projection and special warfare operations',
      lat: 35.1400,
      lon: -78.9900,
      locationString: 'Fayetteville, Cumberland County, NC',
      country: 'USA',
      strategicSignificance: 'The most populous military installation in the United States and global HQ for Special Forces and Delta Force.'
    },
    {
      id: 'base-naval-station-norfolk',
      name: 'Naval Station Norfolk (NS Norfolk)',
      branch: 'US Navy',
      baseType: 'Naval Fleet Station',
      personnelActiveDuty: 45000,
      civilianPersonnel: 18000,
      landAreaAcres: 4300,
      headquartersOrHostWing: 'HQ US Fleet Forces Command & NATO Allied Command Transformation',
      icaoCode: 'KNGU',
      primaryMission: 'Homeport to the Atlantic Fleet, 75+ major surface warships, and 14 carrier piers',
      lat: 36.9458,
      lon: -76.3014,
      locationString: 'Norfolk, VA',
      country: 'USA',
      strategicSignificance: 'The largest naval station in the world, supporting aircraft carriers, guided-missile cruisers, and destroyers.'
    },
    {
      id: 'base-nellis-afb',
      name: 'Nellis Air Force Base & NTTR',
      branch: 'US Air Force',
      baseType: 'Air Warfare Center & Range',
      personnelActiveDuty: 12000,
      civilianPersonnel: 4000,
      landAreaAcres: 2900000,
      headquartersOrHostWing: 'USAF Warfare Center & 57th Wing (USAF Thunderbirds)',
      icaoCode: 'KLSV',
      primaryMission: 'Advanced tactical air combat training, RED FLAG exercises, and operational weapons testing',
      lat: 36.2361,
      lon: -115.0342,
      locationString: 'North Las Vegas, Clark County, NV',
      country: 'USA',
      strategicSignificance: 'Commands the Nevada Test and Training Range (NTTR), the largest contiguous air and ground space available for peacetime military operations in the free world.'
    },
    {
      id: 'base-area-51',
      name: 'Area 51 / Groom Lake (Detachment 3)',
      branch: 'US Air Force',
      baseType: 'Air Warfare Center & Range',
      personnelActiveDuty: 2000,
      civilianPersonnel: 1500,
      landAreaAcres: 38400,
      headquartersOrHostWing: 'Air Force Test Center Detachment 3',
      icaoCode: 'KXTA',
      primaryMission: 'Highly classified black project aerospace research, prototype evaluation, and stealth development',
      lat: 37.2431,
      lon: -115.7930,
      locationString: 'Lincoln County, NV (Within NTTR)',
      country: 'USA',
      strategicSignificance: 'Birthplace of the U-2, SR-71 Blackbird, F-117 Nighthawk, and next-generation NGAD experimental platforms.'
    },
    {
      id: 'base-camp-pendleton',
      name: 'Marine Corps Base Camp Pendleton',
      branch: 'US Marine Corps',
      baseType: 'Major Combat Installation',
      personnelActiveDuty: 42000,
      civilianPersonnel: 5000,
      landAreaAcres: 125000,
      headquartersOrHostWing: 'I Marine Expeditionary Force (I MEF) & 1st Marine Division',
      icaoCode: 'KNFG',
      primaryMission: 'Pacific amphitheater amphibious warfare assault training, infantry doctrine, and logistics',
      lat: 33.3500,
      lon: -117.4000,
      locationString: 'Oceanside, San Diego County, CA',
      country: 'USA',
      strategicSignificance: 'The premier West Coast expeditionary training facility with 17 miles of pristine coastal amphibious assault beaches.'
    },
    {
      id: 'base-schriever-sfb',
      name: 'Schriever Space Force Base',
      branch: 'US Space Force',
      baseType: 'Space Launch & Satellite Control',
      personnelActiveDuty: 3500,
      civilianPersonnel: 4000,
      landAreaAcres: 3840,
      headquartersOrHostWing: 'Space Delta 8 (Satellite Communications and Navigational Warfare) & Space Delta 9',
      primaryMission: 'Command and control of the global GPS constellation and defense military satellite communications (MILSATCOM)',
      lat: 38.8033,
      lon: -104.5250,
      locationString: 'El Paso County, Colorado Springs, CO',
      country: 'USA',
      strategicSignificance: 'The master control station for global GPS navigation, orbital electronic surveillance, and space combat domain operations.'
    },
    {
      id: 'base-white-sands',
      name: 'White Sands Missile Range (WSMR)',
      branch: 'US Army',
      baseType: 'Proving Ground & Weapons Test',
      personnelActiveDuty: 3500,
      civilianPersonnel: 5000,
      landAreaAcres: 2200000,
      headquartersOrHostWing: 'US Army Test and Evaluation Command (ATEC)',
      primaryMission: 'Hypersonic missile testing, laser directed-energy weapon development, and rocket motor evaluation',
      lat: 32.3833,
      lon: -106.4833,
      locationString: 'Doña Ana County, NM',
      country: 'USA',
      strategicSignificance: 'The largest military installation in the United States by land area (3,200 sq miles), containing the historic Trinity nuclear test site.'
    },
    {
      id: 'base-ramstein',
      name: 'Ramstein Air Base',
      branch: 'US Air Force',
      baseType: 'Overseas Strategic Staging Hub',
      personnelActiveDuty: 16000,
      civilianPersonnel: 6500,
      landAreaAcres: 3000,
      headquartersOrHostWing: 'HQ US Air Forces in Europe – Air Forces Africa (USAFE-AFAFRICA) & NATO Allied Air Command',
      icaoCode: 'ETAR',
      primaryMission: 'Central strategic airlift hub, medical evacuation center, and drone satellite relay for Europe, Africa, and the Middle East',
      lat: 49.4369,
      lon: 7.6003,
      locationString: 'Rhineland-Palatinate, Germany',
      country: 'Germany',
      strategicSignificance: 'The premier power-projection node for the US Armed Forces and NATO across the Eastern Hemisphere.'
    },
    {
      id: 'base-diego-garcia',
      name: 'Camp Thunder Cove (Naval Support Facility Diego Garcia)',
      branch: 'Joint & Intelligence Commands',
      baseType: 'Overseas Strategic Staging Hub',
      personnelActiveDuty: 3000,
      civilianPersonnel: 2000,
      landAreaAcres: 7400,
      headquartersOrHostWing: 'US Navy / UK Royal Navy Joint Facility',
      icaoCode: 'FJDG',
      primaryMission: 'Forward strategic bomber deployment runway, deep-water naval anchorage, and maritime prepositioning ships',
      lat: -7.3194,
      lon: 72.4228,
      locationString: 'Chagos Archipelago, British Indian Ocean Territory',
      country: 'United Kingdom / USA',
      strategicSignificance: 'Unassailable strategic redoubt in the central Indian Ocean providing heavy bomber staging into Asia and the Middle East.'
    },
    {
      id: 'base-pine-gap',
      name: 'Joint Defence Facility Pine Gap',
      branch: 'Joint & Intelligence Commands',
      baseType: 'Overseas Strategic Staging Hub',
      personnelActiveDuty: 800,
      civilianPersonnel: 1200,
      landAreaAcres: 2500,
      headquartersOrHostWing: 'US National Reconnaissance Office (NRO) / Central Intelligence Agency & Australian DoD',
      primaryMission: 'Worldwide signals intelligence (SIGINT), spy satellite telemetry downlink, and ballistic missile launch detection',
      lat: -23.7989,
      lon: 133.7372,
      locationString: 'Alice Springs, Northern Territory, Australia',
      country: 'Australia',
      strategicSignificance: 'One of the most vital intelligence facilities on Earth, controlling geostationary spy satellites monitoring Eurasia and the Indo-Pacific.'
    }
  ];

  /**
   * Generates MapLibre GeoJSON FeatureCollection for Military Bunkers & Underground Command Centers
   */
  public static getMilitaryBunkersGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.MILITARY_BUNKERS.map(bunker => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [bunker.lon, bunker.lat]
        },
        properties: {
          id: bunker.id,
          name: bunker.name,
          codeName: bunker.codeName || '',
          facilityType: bunker.facilityType,
          operator: bunker.operator,
          depthFeet: bunker.depthFeet,
          blastOverpressurePsi: bunker.blastOverpressurePsi,
          personnelCapacity: bunker.personnelCapacity,
          autonomyDurationDays: bunker.autonomyDurationDays,
          empHardeningDb: bunker.empHardeningDb,
          status: bunker.status,
          subterraneanSqFt: bunker.subterraneanSqFt,
          blastDoorTons: bunker.blastDoorTons || 0,
          locationDescription: bunker.locationDescription,
          country: bunker.country,
          color: bunker.status === 'ACTIVE_TOP_SECRET' ? '#ec4899' : '#a855f7',
          badgeText: '🛡️ MILITARY BUNKER',
          type: 'military_bunker'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON FeatureCollection for Citizen-Access Bunkers & Public Fallout Shelters
   */
  public static getCitizenBunkersGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.CITIZEN_BUNKERS.map(bunker => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [bunker.lon, bunker.lat]
        },
        properties: {
          id: bunker.id,
          name: bunker.name,
          bunkerCategory: bunker.bunkerCategory,
          operator: bunker.operator,
          accessProtocol: bunker.accessProtocol,
          capacityPeople: bunker.capacityPeople,
          autonomyDurationMonths: bunker.autonomyDurationMonths,
          cbrnFiltration: bunker.cbrnFiltration,
          filtrationDetails: bunker.filtrationDetails,
          blastRatingPsi: bunker.blastRatingPsi || 0,
          cityState: bunker.cityState,
          country: bunker.country,
          color: bunker.accessProtocol === 'Public Open Access' ? '#10b981' : '#06b6d4',
          badgeText: '🟢 CITIZEN SHELTER',
          type: 'citizen_bunker'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON FeatureCollection for Bomb & Munitions Storage Depots
   */
  public static getBombStorageDepotsGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.BOMB_STORAGE_DEPOTS.map(depot => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [depot.lon, depot.lat]
        },
        properties: {
          id: depot.id,
          name: depot.name,
          depotCategory: depot.depotCategory,
          branchOrAgency: depot.branchOrAgency,
          landAreaAcres: depot.landAreaAcres,
          storageBunkersCount: depot.storageBunkersCount,
          primaryMunitions: depot.primaryMunitions.join(' • '),
          securityTier: depot.securityTier,
          railConnected: depot.railConnected,
          airliftCapable: depot.airliftCapable,
          cityState: depot.cityState,
          country: depot.country,
          color: depot.depotCategory.includes('Nuclear') ? '#ef4444' : '#f59e0b',
          badgeText: '💣 BOMB / MUNITIONS DEPOT',
          type: 'bomb_storage_depot'
        }
      }))
    };
  }

  /**
   * Generates MapLibre GeoJSON FeatureCollection for Major Military Bases
   */
  public static getMilitaryBasesGeoJson(): GeoJSON.FeatureCollection {
    return {
      type: 'FeatureCollection',
      features: this.MILITARY_BASES.map(base => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [base.lon, base.lat]
        },
        properties: {
          id: base.id,
          name: base.name,
          branch: base.branch,
          baseType: base.baseType,
          personnelActiveDuty: base.personnelActiveDuty,
          civilianPersonnel: base.civilianPersonnel,
          landAreaAcres: base.landAreaAcres,
          headquartersOrHostWing: base.headquartersOrHostWing,
          icaoCode: base.icaoCode || '',
          locationString: base.locationString,
          country: base.country,
          color: base.branch === 'US Space Force' ? '#38bdf8' : base.branch === 'US Navy' ? '#3b82f6' : base.branch === 'US Air Force' ? '#60a5fa' : '#22c55e',
          badgeText: '⚔️ MILITARY BASE',
          type: 'military_base'
        }
      }))
    };
  }
}
