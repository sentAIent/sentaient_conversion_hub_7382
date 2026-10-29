// sphinx-dashboard/src/lib/intelligence/toxicSitesData.ts
// Comprehensive Registry of Current & Historical Toxic Industrial Contamination Sites
// Covering EPA Superfund (CERCLA NPL), PFAS DoD installations, Brownfields, Chemical Refineries,
// Heavy Metal Smelters, and Legacy Solvent Plumes for Homebuyer Due Diligence.

export interface ToxicSite {
  site_id: string;
  name: string;
  epa_id: string;
  site_type: 
    | 'EPA Superfund (NPL)'
    | 'PFAS Military Installation'
    | 'Chemical Manufacturing'
    | 'Petrochemical Refinery'
    | 'Heavy Metal Smelter / Mine'
    | 'Legacy Dry Cleaner / Solvent'
    | 'Nuclear / Radiological';
  status: 
    | 'Active Plume Uncontrolled'
    | 'Active Groundwater Pump & Treat'
    | 'Post-Remediation Monitored'
    | 'Emergency Removal';
  primary_contaminants: string[];
  affected_media: ('Groundwater Aquifer' | 'Soil / Vadose Zone' | 'Vapor Intrusion' | 'Surface Watershed')[];
  flow_direction_deg: number;          // Hydraulic gradient vector (0° = North, 90° = East, etc.)
  seepage_velocity_ft_yr: number;      // Darcy linear groundwater velocity (ft/year)
  core_radius_miles: number;           // Saturated source zone radius
  plume_5yr_length_miles: number;      // 5-year migration length downgradient
  plume_15yr_length_miles: number;     // 15-year migration length downgradient
  safe_buffer_miles: number;           // Recommended real estate perimeter buffer
  aquifer_depth_ft: number;            // Depth to contaminated water table
  residential_risk_rating: 'CRITICAL_NO_BUILD' | 'HIGH_CONTAMINATION_RISK' | 'MODERATE_MONITORED';
  homebuyer_advisory: string;
  coordinates: [number, number];       // [lon, lat]
  city: string;
  state: string;
  country: string;
  historical_background: string;
  facility_footprint_m: number;        // Footprint radius for 3D extrusion
  extrusions_count: number;            // Number of 3D facility structures
}

export const GLOBAL_TOXIC_SITES: ToxicSite[] = [
  // --- SOUTHERN CALIFORNIA & REGIONAL SITES ---
  {
    site_id: 'TOX-CA-001',
    name: 'Santa Susana Field Laboratory (SSFL)',
    epa_id: 'CAD074103771',
    site_type: 'Nuclear / Radiological',
    status: 'Active Plume Uncontrolled',
    primary_contaminants: ['Trichloroethylene (TCE)', 'Perchlorate', 'Strontium-90', 'Cesium-137', 'Polychlorinated Biphenyls (PCBs)'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Vapor Intrusion', 'Surface Watershed'],
    flow_direction_deg: 135, // Flows SE towards Bell Canyon, Dayton Canyon & West Hills / San Fernando Valley
    seepage_velocity_ft_yr: 180,
    core_radius_miles: 1.2,
    plume_5yr_length_miles: 2.8,
    plume_15yr_length_miles: 5.2,
    safe_buffer_miles: 6.0,
    aquifer_depth_ft: 45,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Major fracture-bedrock groundwater TCE and radionuclide plume migrating towards Simi Valley and West Hills. High vapor intrusion and cancer cluster risk.',
    coordinates: [-118.696, 34.231],
    city: 'Simi Hills',
    state: 'CA',
    country: 'USA',
    historical_background: 'Site of 1959 Sodium Reactor Experiment partial nuclear meltdown and over 30,000 rocket engine tests using TCE solvent flushes.',
    facility_footprint_m: 350,
    extrusions_count: 8
  },
  {
    site_id: 'TOX-CA-002',
    name: 'Stringfellow Acid Pits Superfund Site',
    epa_id: 'CAD980737533',
    site_type: 'EPA Superfund (NPL)',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Trichloroethylene (TCE)', 'Perchlorate', 'Sulfuric Acid', 'Hexavalent Chromium', 'Heavy Metals'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Surface Watershed'],
    flow_direction_deg: 215, // Flows SW down Pyrite Canyon toward Jurupa Valley & Santa Ana River
    seepage_velocity_ft_yr: 240,
    core_radius_miles: 0.6,
    plume_5yr_length_miles: 2.1,
    plume_15yr_length_miles: 4.5,
    safe_buffer_miles: 5.0,
    aquifer_depth_ft: 35,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Over 34 million gallons of liquid hazardous industrial acids dumped into unlined rock pits. Plume extends down Pyrite Canyon into residential Chino Basin aquifer.',
    coordinates: [-117.472, 34.018],
    city: 'Jurupa Valley / Glen Avon',
    state: 'CA',
    country: 'USA',
    historical_background: 'Former hazardous waste disposal facility operating 1956-1972 where chemical, aerospace, and plating industries dumped toxic acid wastes directly into unlined canyons.',
    facility_footprint_m: 220,
    extrusions_count: 5
  },
  {
    site_id: 'TOX-CA-003',
    name: 'Montrose Chemical Corp / Torrance DDT Plume',
    epa_id: 'CAD008242711',
    site_type: 'Chemical Manufacturing',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Dichlorodiphenyltrichloroethane (DDT)', 'Chlorobenzene', 'Trichloroethylene (TCE)', 'Hexavalent Chromium'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Vapor Intrusion'],
    flow_direction_deg: 180, // Flows South towards Harbor Gateway & Dominguez Channel
    seepage_velocity_ft_yr: 150,
    core_radius_miles: 0.5,
    plume_5yr_length_miles: 1.6,
    plume_15yr_length_miles: 3.8,
    safe_buffer_miles: 4.5,
    aquifer_depth_ft: 60,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: World’s largest historical manufacturer of DDT. Dual-aquifer chlorobenzene and volatile organic solvent groundwater contamination beneath residential neighborhoods.',
    coordinates: [-118.293, 33.834],
    city: 'Torrance',
    state: 'CA',
    country: 'USA',
    historical_background: 'Manufactured DDT from 1947 to 1982. Discharged hundreds of tons of DDT into local sewers and groundwater recharge basins.',
    facility_footprint_m: 260,
    extrusions_count: 6
  },
  {
    site_id: 'TOX-CA-004',
    name: 'Orange County Water District (OCWD) North Basin Plume',
    epa_id: 'CAN000908760',
    site_type: 'EPA Superfund (NPL)',
    status: 'Active Plume Uncontrolled',
    primary_contaminants: ['Tetrachloroethylene (PCE)', 'Trichloroethylene (TCE)', '1,4-Dioxane', 'Perchlorate'],
    affected_media: ['Groundwater Aquifer', 'Vapor Intrusion'],
    flow_direction_deg: 240, // Flows WSW through Fullerton and Anaheim towards Buena Park
    seepage_velocity_ft_yr: 210,
    core_radius_miles: 1.1,
    plume_5yr_length_miles: 3.2,
    plume_15yr_length_miles: 6.0,
    safe_buffer_miles: 4.0,
    aquifer_depth_ft: 85,
    residential_risk_rating: 'HIGH_CONTAMINATION_RISK',
    homebuyer_advisory: 'HIGH CONTAMINATION RISK: Regional chlorinated solvent plume 5 miles long affecting principal drinking water aquifer beneath Fullerton and Anaheim. Deep municipal extraction wells impacted.',
    coordinates: [-117.935, 33.870],
    city: 'Fullerton / Anaheim',
    state: 'CA',
    country: 'USA',
    historical_background: 'Dozens of historical aerospace degreasers, circuit board manufacturers, and dry cleaners released TCE and PCE into shallow groundwater over 4 decades.',
    facility_footprint_m: 180,
    extrusions_count: 4
  },
  {
    site_id: 'TOX-CA-005',
    name: 'El Toro Marine Corps Air Station (MCAS) PFAS & TCE',
    epa_id: 'CA6170023208',
    site_type: 'PFAS Military Installation',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['PFAS / PFOA / PFOS', 'Trichloroethylene (TCE)', 'Benzene', 'Aviation Fuel VOCs'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Surface Watershed'],
    flow_direction_deg: 250, // Flows WSW down San Diego Creek towards Irvine & Upper Newport Bay
    seepage_velocity_ft_yr: 195,
    core_radius_miles: 0.9,
    plume_5yr_length_miles: 2.4,
    plume_15yr_length_miles: 4.8,
    safe_buffer_miles: 4.0,
    aquifer_depth_ft: 40,
    residential_risk_rating: 'HIGH_CONTAMINATION_RISK',
    homebuyer_advisory: 'HIGH RISK: AFFF firefighting foam and aircraft wash-down created a massive 3-mile VOC and PFAS plume draining towards San Diego Creek watershed and Upper Newport Bay basin.',
    coordinates: [-117.728, 33.676],
    city: 'Irvine / Great Park',
    state: 'CA',
    country: 'USA',
    historical_background: 'Decommissioned military air station active 1942-1999. Decades of heavy aircraft maintenance solvents and aqueous film-forming foam (AFFF) infiltration.',
    facility_footprint_m: 400,
    extrusions_count: 7
  },

  // --- MAJOR US NATIONAL SUPERFUND & CONTAMINATION PLUMES ---
  {
    site_id: 'TOX-NY-001',
    name: 'Love Canal Superfund Site',
    epa_id: 'NYD000606947',
    site_type: 'EPA Superfund (NPL)',
    status: 'Post-Remediation Monitored',
    primary_contaminants: ['2,3,7,8-TCDD (Dioxin)', 'Benzene', 'Hexachlorocyclohexane (Lindane)', 'Chlorobenzene', 'Toluene'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Vapor Intrusion', 'Surface Watershed'],
    flow_direction_deg: 210, // Flows SSW toward Niagara River
    seepage_velocity_ft_yr: 90,
    core_radius_miles: 0.4,
    plume_5yr_length_miles: 1.1,
    plume_15yr_length_miles: 2.2,
    safe_buffer_miles: 3.5,
    aquifer_depth_ft: 12,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 21,800 tons of chemical carcinogens and dioxins buried directly in residential canal; historical basement seeps led to emergency federal evacuation and CERCLA enactment.',
    coordinates: [-78.977, 43.081],
    city: 'Niagara Falls',
    state: 'NY',
    country: 'USA',
    historical_background: 'Hooker Chemical buried hazardous wastes in an abandoned canal in the 1940s-1950s. Soil subsidence and rising water tables flooded toxins into homes and elementary school in 1978.',
    facility_footprint_m: 200,
    extrusions_count: 3
  },
  {
    site_id: 'TOX-MA-001',
    name: 'Wells G & H Superfund Site (Woburn)',
    epa_id: 'MAD980732161',
    site_type: 'EPA Superfund (NPL)',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Trichloroethylene (TCE)', 'Tetrachloroethylene (PCE)', '1,2-trans-Dichloroethylene', 'Arsenic', 'Lead'],
    affected_media: ['Groundwater Aquifer', 'Surface Watershed', 'Vapor Intrusion'],
    flow_direction_deg: 160, // Flows SSE towards Aberjona River valley
    seepage_velocity_ft_yr: 280,
    core_radius_miles: 0.7,
    plume_5yr_length_miles: 2.2,
    plume_15yr_length_miles: 4.1,
    safe_buffer_miles: 4.0,
    aquifer_depth_ft: 20,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Landmark site documented in "A Civil Action". High concentrations of TCE and PCE in shallow aquifer resulted in childhood leukemia clusters in east Woburn.',
    coordinates: [-71.144, 42.493],
    city: 'Woburn',
    state: 'MA',
    country: 'USA',
    historical_background: 'Industrial waste dumping by W.R. Grace, Beatrice Foods, and Unifirst contaminated the Aberjona River valley aquifer supplying city drinking water wells G and H.',
    facility_footprint_m: 240,
    extrusions_count: 5
  },
  {
    site_id: 'TOX-WA-001',
    name: 'Hanford Nuclear Reservation 300 & 200 Areas',
    epa_id: 'WA1890090078',
    site_type: 'Nuclear / Radiological',
    status: 'Active Plume Uncontrolled',
    primary_contaminants: ['Hexavalent Chromium', 'Tritium (H-3)', 'Strontium-90', 'Technetium-99', 'Carbon Tetrachloride', 'Uranium'],
    affected_media: ['Groundwater Aquifer', 'Surface Watershed', 'Soil / Vadose Zone'],
    flow_direction_deg: 75, // Flows ENE toward Columbia River shoreline
    seepage_velocity_ft_yr: 350,
    core_radius_miles: 2.5,
    plume_5yr_length_miles: 5.5,
    plume_15yr_length_miles: 10.0,
    safe_buffer_miles: 12.0,
    aquifer_depth_ft: 65,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 56 million gallons of radioactive/chemical waste in 177 underground tanks. Groundwater plumes of hexavalent chromium and tritium continuously discharging into Columbia River.',
    coordinates: [-119.533, 46.551],
    city: 'Richland',
    state: 'WA',
    country: 'USA',
    historical_background: 'Manhattan Project plutonium production facility for weapons. Decades of unlined trench disposal created 80 square miles of contaminated groundwater.',
    facility_footprint_m: 600,
    extrusions_count: 12
  },
  {
    site_id: 'TOX-NC-001',
    name: 'Camp Lejeune Military Base (Hadnot Point / Tarawa Terrace)',
    epa_id: 'NC6170022580',
    site_type: 'PFAS Military Installation',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Trichloroethylene (TCE)', 'Tetrachloroethylene (PCE)', 'Vinyl Chloride', 'Benzene', 'PFAS / PFOA'],
    affected_media: ['Groundwater Aquifer', 'Vapor Intrusion', 'Surface Watershed'],
    flow_direction_deg: 190, // Flows South towards New River and Wallace Creek
    seepage_velocity_ft_yr: 220,
    core_radius_miles: 1.0,
    plume_5yr_length_miles: 2.9,
    plume_15yr_length_miles: 5.4,
    safe_buffer_miles: 5.5,
    aquifer_depth_ft: 25,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: One of the deadliest drinking water contamination sites in US military history. Massive chlorinated solvent plumes infiltrated residential barracks wells (1953-1987).',
    coordinates: [-77.348, 34.721],
    city: 'Jacksonville',
    state: 'NC',
    country: 'USA',
    historical_background: 'Leaking underground fuel storage tanks, ABC One-Hour Cleaners off-base dumping, and chemical disposal pits contaminated multiple municipal water distribution systems.',
    facility_footprint_m: 320,
    extrusions_count: 6
  },
  {
    site_id: 'TOX-OK-001',
    name: 'Tar Creek Superfund Site & Picher Mining District',
    epa_id: 'OKD980629844',
    site_type: 'Heavy Metal Smelter / Mine',
    status: 'Emergency Removal',
    primary_contaminants: ['Lead', 'Zinc', 'Cadmium', 'Arsenic', 'Acid Mine Drainage'],
    affected_media: ['Soil / Vadose Zone', 'Surface Watershed', 'Groundwater Aquifer'],
    flow_direction_deg: 170, // Flows South down Tar Creek to Neosho River & Grand Lake
    seepage_velocity_ft_yr: 310,
    core_radius_miles: 2.0,
    plume_5yr_length_miles: 4.5,
    plume_15yr_length_miles: 8.0,
    safe_buffer_miles: 8.0,
    aquifer_depth_ft: 15,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 75 million tons of toxic lead/zinc chat piles and acid mine drainage. Declared an uninhabitable ghost town after child blood lead toxicity tests; federal buyout completed.',
    coordinates: [-94.832, 36.981],
    city: 'Picher / Ottawa County',
    state: 'OK',
    country: 'USA',
    historical_background: 'Part of Tri-State Mining District producing lead and zinc for WWI and WWII. Mine tailings ("chat") blew dust across schools and poisoned Boone and Roubidoux aquifers.',
    facility_footprint_m: 500,
    extrusions_count: 9
  },
  {
    site_id: 'TOX-MT-001',
    name: 'Berkeley Pit & Silver Bow Creek / Butte Superfund',
    epa_id: 'MT980502777',
    site_type: 'Heavy Metal Smelter / Mine',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Arsenic', 'Cadmium', 'Copper', 'Zinc', 'Sulfuric Acid (pH 2.5)'],
    affected_media: ['Groundwater Aquifer', 'Surface Watershed'],
    flow_direction_deg: 260, // Flows West down Silver Bow Creek towards Clark Fork River
    seepage_velocity_ft_yr: 190,
    core_radius_miles: 1.5,
    plume_5yr_length_miles: 3.5,
    plume_15yr_length_miles: 7.2,
    safe_buffer_miles: 7.0,
    aquifer_depth_ft: 10,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 40 billion gallons of acidic heavy-metal water in 1,780-foot deep open copper pit. Massive groundwater cone of depression with acid seepage along Silver Bow Creek.',
    coordinates: [-112.511, 46.016],
    city: 'Butte',
    state: 'MT',
    country: 'USA',
    historical_background: 'Former Anaconda Copper open-pit mine flooded after pumping ceased in 1982. Largest volume toxic acidic pit in North America.',
    facility_footprint_m: 450,
    extrusions_count: 8
  },
  {
    site_id: 'TOX-NJ-001',
    name: 'Lipari Landfill Superfund Site',
    epa_id: 'NJD980505941',
    site_type: 'EPA Superfund (NPL)',
    status: 'Post-Remediation Monitored',
    primary_contaminants: ['Bis(2-chloroethyl) ether (BCEE)', 'Benzene', 'Trichloroethylene', 'Methylene Chloride', 'Lead'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Surface Watershed'],
    flow_direction_deg: 90, // Flows East into Chestnut Branch and Alcyon Lake
    seepage_velocity_ft_yr: 140,
    core_radius_miles: 0.3,
    plume_5yr_length_miles: 1.2,
    plume_15yr_length_miles: 2.4,
    safe_buffer_miles: 3.0,
    aquifer_depth_ft: 18,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Ranked #1 worst hazardous waste landfill on the original EPA National Priorities List. Chemical trench leaching into residential lakes and Cohansey aquifer.',
    coordinates: [-75.138, 39.734],
    city: 'Pitman / Mantua',
    state: 'NJ',
    country: 'USA',
    historical_background: 'Industrial chemical dumpsite in a former sand/gravel pit from 1958-1971 where 3 million gallons of chemical wastes were dumped directly onto unlined ground.',
    facility_footprint_m: 180,
    extrusions_count: 3
  },
  {
    site_id: 'TOX-AL-001',
    name: 'Anniston PCB Superfund Site (Monsanto / Solutia)',
    epa_id: 'ALD983166299',
    site_type: 'Chemical Manufacturing',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Polychlorinated Biphenyls (PCBs)', 'Lead', 'Mercury', 'Dioxins'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Surface Watershed'],
    flow_direction_deg: 220, // Flows SW down Snow Creek and Choccolocco Creek
    seepage_velocity_ft_yr: 160,
    core_radius_miles: 0.8,
    plume_5yr_length_miles: 2.6,
    plume_15yr_length_miles: 5.8,
    safe_buffer_miles: 6.0,
    aquifer_depth_ft: 28,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Manufactured almost all commercial PCBs in North America (1935-1971). Massive PCB soil saturation and sediment contamination extending 40 miles downstream.',
    coordinates: [-85.845, 33.652],
    city: 'Anniston',
    state: 'AL',
    country: 'USA',
    historical_background: 'Monsanto chemical plant discharged an estimated 27 million pounds of PCB-laden waste into Snow Creek ditch and local landfills.',
    facility_footprint_m: 280,
    extrusions_count: 6
  },
  {
    site_id: 'TOX-AZ-001',
    name: 'Tucson International Airport Area (TIAA) TCE Plume',
    epa_id: 'AZD980737530',
    site_type: 'EPA Superfund (NPL)',
    status: 'Active Groundwater Pump & Treat',
    primary_contaminants: ['Trichloroethylene (TCE)', '1,4-Dioxane', 'PFAS', 'Chromium'],
    affected_media: ['Groundwater Aquifer', 'Vapor Intrusion'],
    flow_direction_deg: 340, // Flows NNW toward central Tucson municipal wellfields
    seepage_velocity_ft_yr: 380,
    core_radius_miles: 1.2,
    plume_5yr_length_miles: 3.8,
    plume_15yr_length_miles: 6.8,
    safe_buffer_miles: 5.0,
    aquifer_depth_ft: 110,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 5-mile long high-velocity regional aquifer plume supplying Tucson’s South Side. Severe historical contamination linked to elevated cancer rates and birth defects.',
    coordinates: [-110.941, 32.116],
    city: 'Tucson',
    state: 'AZ',
    country: 'USA',
    historical_background: 'Air Force Plant 44 and defense contractors dumped cleaning solvents directly into unlined pits from 1952 until 1977.',
    facility_footprint_m: 350,
    extrusions_count: 7
  },

  // --- PROMINENT INTERNATIONAL TOXIC INDUSTRIAL DISASTERS ---
  {
    site_id: 'TOX-INT-001',
    name: 'Union Carbide India Toxic Pesticide Plant (Bhopal)',
    epa_id: 'INT-IND-BHOPAL',
    site_type: 'Chemical Manufacturing',
    status: 'Active Plume Uncontrolled',
    primary_contaminants: ['Methyl Isocyanate residues', '1-Naphthol', 'Carbon Tetrachloride', 'Mercury', 'Trichlorobenzene'],
    affected_media: ['Groundwater Aquifer', 'Soil / Vadose Zone', 'Surface Watershed'],
    flow_direction_deg: 45, // Flows NE towards local municipal colonies
    seepage_velocity_ft_yr: 210,
    core_radius_miles: 0.9,
    plume_5yr_length_miles: 2.5,
    plume_15yr_length_miles: 4.6,
    safe_buffer_miles: 5.0,
    aquifer_depth_ft: 22,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: 1984 toxic gas disaster source; over 40 tons of chemical waste remain abandoned in solar evaporation ponds, steadily poisoning residential tube wells.',
    coordinates: [77.408, 23.280],
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    country: 'India',
    historical_background: 'Site of the 1984 Bhopal disaster that killed over 15,000 people. Abandoned toxic chemicals continue to poison local groundwater to this day.',
    facility_footprint_m: 300,
    extrusions_count: 6
  },
  {
    site_id: 'TOX-INT-002',
    name: 'Minamata Bay Chisso Chemical Plant',
    epa_id: 'INT-JPN-MINAMATA',
    site_type: 'Chemical Manufacturing',
    status: 'Post-Remediation Monitored',
    primary_contaminants: ['Methylmercury', 'Acetaldehyde Residues', 'Heavy Metals'],
    affected_media: ['Surface Watershed', 'Groundwater Aquifer', 'Soil / Vadose Zone'],
    flow_direction_deg: 270, // Flows West into Minamata Bay & Yatsushiro Sea
    seepage_velocity_ft_yr: 130,
    core_radius_miles: 0.7,
    plume_5yr_length_miles: 1.8,
    plume_15yr_length_miles: 3.2,
    safe_buffer_miles: 4.0,
    aquifer_depth_ft: 15,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: Decades of industrial methylmercury wastewater discharge into coastal bay causing severe neurological Minamata disease across thousands of residents.',
    coordinates: [130.388, 32.222],
    city: 'Minamata',
    state: 'Kumamoto',
    country: 'Japan',
    historical_background: 'Chisso Corporation dumped 27 tons of methylmercury into the bay between 1932 and 1968, bioaccumulating throughout the marine food chain.',
    facility_footprint_m: 250,
    extrusions_count: 5
  },
  {
    site_id: 'TOX-INT-003',
    name: 'Norilsk Nickel Polar Smelting Complex',
    epa_id: 'INT-RUS-NORILSK',
    site_type: 'Heavy Metal Smelter / Mine',
    status: 'Active Plume Uncontrolled',
    primary_contaminants: ['Nickel', 'Copper', 'Cobalt', 'Lead', 'Diesel Fuel (Ambarnaya River)', 'Sulfur Dioxide'],
    affected_media: ['Surface Watershed', 'Soil / Vadose Zone', 'Groundwater Aquifer'],
    flow_direction_deg: 320, // Flows NW down Daldykan & Ambarnaya rivers to Lake Pyasino
    seepage_velocity_ft_yr: 320,
    core_radius_miles: 2.2,
    plume_5yr_length_miles: 6.0,
    plume_15yr_length_miles: 12.0,
    safe_buffer_miles: 10.0,
    aquifer_depth_ft: 10,
    residential_risk_rating: 'CRITICAL_NO_BUILD',
    homebuyer_advisory: 'DO NOT BUY OR BUILD: One of the most polluted industrial sites on Earth. 21,000-ton diesel storage collapse and continuous toxic heavy metal river runoff.',
    coordinates: [88.196, 69.349],
    city: 'Norilsk',
    state: 'Krasnoyarsk Krai',
    country: 'Russia',
    historical_background: 'World’s largest nickel-palladium mining and metallurgical complex; permafrost thawing destabilized fuel tanks and mine tailings dams.',
    facility_footprint_m: 550,
    extrusions_count: 10
  }
];
