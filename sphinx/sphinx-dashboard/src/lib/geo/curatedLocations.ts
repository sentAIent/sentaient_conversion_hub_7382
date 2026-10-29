// Strategic Curated Locations Intelligence Database
// Provides instant 0ms recognition and fuzzy matching for:
// 1. Ski & Snowboard Resorts (North American & Global)
// 2. Major Lakes, Reservoirs, and Water Bodies
// 3. Iconic Mountain Peaks & Natural Landmarks

import { STRATEGIC_SNOWBOARD_RESORTS, SnowboardResort } from '../routing/snowboardResorts';

export type CuratedCategory = 'ski_resort' | 'lake' | 'mountain' | 'city' | 'location';

export interface CuratedLocation {
  id: string;
  name: string;
  aliases: string[];
  category: CuratedCategory;
  icon: string;
  subtitle: string;
  lat: number;
  lon: number;
  zoom: number;
  stateOrCountry: string;
  metadata?: {
    elevationFt?: number;
    summitFt?: number;
    baseFt?: number;
    verticalDropFt?: number;
    lifts?: number;
    runs?: number;
    surfaceAreaSqMi?: number;
    depthFt?: number;
    resortData?: SnowboardResort;
  };
}

export const CURATED_LAKES: CuratedLocation[] = [
  // California & Nevada Lakes
  {
    id: 'lake-tahoe',
    name: 'Lake Tahoe',
    aliases: ['tahoe', 'lake tahoe', 'emerald bay', 'south lake tahoe', 'north lake tahoe', 'tahoe city'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Sierra Nevada, California / Nevada (6,225 ft elevation • 191 sq mi)',
    lat: 39.0968,
    lon: -120.0324,
    zoom: 11,
    stateOrCountry: 'California / Nevada',
    metadata: { elevationFt: 6225, surfaceAreaSqMi: 191, depthFt: 1645 }
  },
  {
    id: 'big-bear-lake',
    name: 'Big Bear Lake',
    aliases: ['big bear', 'big bear lake', 'bear lake ca', 'big bear reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'San Bernardino Mountains, California (6,752 ft elevation • 4.6 sq mi)',
    lat: 34.2439,
    lon: -116.9114,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 6752, surfaceAreaSqMi: 4.6, depthFt: 72 }
  },
  {
    id: 'lake-arrowhead',
    name: 'Lake Arrowhead',
    aliases: ['arrowhead', 'lake arrowhead', 'lake arrowhead reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'San Bernardino Mountains, California (5,108 ft elevation)',
    lat: 34.2581,
    lon: -117.1856,
    zoom: 13,
    stateOrCountry: 'California',
    metadata: { elevationFt: 5108, surfaceAreaSqMi: 1.2, depthFt: 185 }
  },
  {
    id: 'silverwood-lake',
    name: 'Silverwood Lake',
    aliases: ['silverwood', 'silverwood lake', 'silverwood lake state recreation area'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'San Bernardino County, California (3,353 ft elevation • State Rec Area)',
    lat: 34.2989,
    lon: -117.3275,
    zoom: 13,
    stateOrCountry: 'California',
    metadata: { elevationFt: 3353, surfaceAreaSqMi: 1.5 }
  },
  {
    id: 'castaic-lake',
    name: 'Castaic Lake',
    aliases: ['castaic', 'castaic lake', 'castaic reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Los Angeles County, California (Upper & Lower Lagoon)',
    lat: 34.5208,
    lon: -118.6042,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1515, surfaceAreaSqMi: 3.5 }
  },
  {
    id: 'pyramid-lake-ca',
    name: 'Pyramid Lake (California)',
    aliases: ['pyramid lake', 'pyramid lake ca', 'pyramid reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Angeles National Forest / Interstate 5, California',
    lat: 34.6644,
    lon: -118.7847,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 2578, surfaceAreaSqMi: 2.0 }
  },
  {
    id: 'diamond-valley-lake',
    name: 'Diamond Valley Lake',
    aliases: ['diamond valley', 'diamond valley lake', 'hemet reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Riverside County, California (Metropolitan Water District)',
    lat: 33.6833,
    lon: -117.0333,
    zoom: 12,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1535, surfaceAreaSqMi: 7.0 }
  },
  {
    id: 'lake-perris',
    name: 'Lake Perris',
    aliases: ['perris', 'lake perris', 'lake perris state recreation area'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Riverside County, California (State Recreation Area)',
    lat: 33.8617,
    lon: -117.1850,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1588, surfaceAreaSqMi: 3.6 }
  },
  {
    id: 'lake-elsinore',
    name: 'Lake Elsinore',
    aliases: ['elsinore', 'lake elsinore', 'lake elsinore ca'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Riverside County, California (Largest natural freshwater lake in SoCal)',
    lat: 33.6681,
    lon: -117.3273,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1244, surfaceAreaSqMi: 4.7 }
  },
  {
    id: 'canyon-lake-ca',
    name: 'Canyon Lake',
    aliases: ['canyon lake', 'canyon lake reservoir', 'railroad canyon reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Riverside County, California',
    lat: 33.6842,
    lon: -117.2611,
    zoom: 13,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1382, surfaceAreaSqMi: 0.8 }
  },
  {
    id: 'lake-casitas',
    name: 'Lake Casitas',
    aliases: ['casitas', 'lake casitas'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Ventura County / Ojai, California',
    lat: 34.3917,
    lon: -119.3333,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 567, surfaceAreaSqMi: 4.3 }
  },
  {
    id: 'lake-piru',
    name: 'Lake Piru',
    aliases: ['piru', 'lake piru', 'lake piru reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Los Padres National Forest / Ventura County, California',
    lat: 34.4689,
    lon: -118.7561,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1055, surfaceAreaSqMi: 1.9 }
  },
  {
    id: 'salton-sea',
    name: 'Salton Sea',
    aliases: ['salton sea', 'salton sea ca', 'salton', 'bombay beach'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Imperial / Riverside Counties, California (-236 ft below sea level • 343 sq mi)',
    lat: 33.3286,
    lon: -115.8436,
    zoom: 9.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: -236, surfaceAreaSqMi: 343 }
  },
  {
    id: 'mono-lake',
    name: 'Mono Lake',
    aliases: ['mono lake', 'mono', 'lee vining', 'mono basin'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Eastern Sierra / Lee Vining, California (Tufa towers • 6,383 ft)',
    lat: 37.9972,
    lon: -119.0097,
    zoom: 11,
    stateOrCountry: 'California',
    metadata: { elevationFt: 6383, surfaceAreaSqMi: 69 }
  },
  {
    id: 'june-lake',
    name: 'June Lake',
    aliases: ['june lake', 'june lake loop', 'gull lake', 'silver lake june loop'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Eastern Sierra / June Lake Loop, California (7,621 ft elevation)',
    lat: 37.7816,
    lon: -119.0768,
    zoom: 13.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 7621 }
  },
  {
    id: 'convict-lake',
    name: 'Convict Lake',
    aliases: ['convict lake', 'convict lake resort', 'mammoth convict'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Eastern Sierra / Mammoth Lakes, California (7,850 ft elevation)',
    lat: 37.5947,
    lon: -118.8522,
    zoom: 14,
    stateOrCountry: 'California',
    metadata: { elevationFt: 7850 }
  },
  {
    id: 'crowley-lake',
    name: 'Crowley Lake',
    aliases: ['crowley', 'crowley lake', 'lake crowley', 'crowley columns'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Eastern Sierra / Mono County, California (6,781 ft elevation)',
    lat: 37.5872,
    lon: -118.7231,
    zoom: 12,
    stateOrCountry: 'California',
    metadata: { elevationFt: 6781, surfaceAreaSqMi: 8.3 }
  },
  {
    id: 'mammoth-lakes-basin',
    name: 'Mammoth Lakes Basin',
    aliases: ['mammoth lakes', 'lake mary', 'lake george', 'horseshoe lake mammoth'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Mammoth Mountain Basin, California (Lake Mary, Lake George, Horseshoe)',
    lat: 37.6083,
    lon: -119.0167,
    zoom: 13,
    stateOrCountry: 'California',
    metadata: { elevationFt: 8966 }
  },
  {
    id: 'shasta-lake',
    name: 'Shasta Lake',
    aliases: ['shasta', 'lake shasta', 'shasta lake', 'shasta reservoir', 'shasta dam'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Shasta County, California (Largest reservoir in CA • 46 sq mi)',
    lat: 40.7303,
    lon: -122.3789,
    zoom: 11,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1067, surfaceAreaSqMi: 46 }
  },
  {
    id: 'lake-oroville',
    name: 'Lake Oroville',
    aliases: ['oroville', 'lake oroville', 'oroville dam', 'oroville reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Butte County, California (Feather River • 25 sq mi)',
    lat: 39.5392,
    lon: -121.4642,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 900, surfaceAreaSqMi: 25 }
  },
  {
    id: 'folsom-lake',
    name: 'Folsom Lake',
    aliases: ['folsom', 'folsom lake', 'folsom reservoir', 'folsom dam'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Sacramento / El Dorado Counties, California (American River)',
    lat: 38.7188,
    lon: -121.1444,
    zoom: 12,
    stateOrCountry: 'California',
    metadata: { elevationFt: 466, surfaceAreaSqMi: 18 }
  },
  {
    id: 'clear-lake-ca',
    name: 'Clear Lake',
    aliases: ['clear lake', 'clear lake ca', 'konocti'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Lake County, California (Largest natural freshwater lake entirely in CA)',
    lat: 39.0232,
    lon: -122.8122,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 1329, surfaceAreaSqMi: 68 }
  },
  {
    id: 'lake-berryessa',
    name: 'Lake Berryessa',
    aliases: ['berryessa', 'lake berryessa', 'monticello dam', 'glory hole berryessa'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Napa County, California (32 sq mi • Monticello Dam)',
    lat: 38.5833,
    lon: -122.2333,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 443, surfaceAreaSqMi: 32 }
  },
  {
    id: 'lake-isabella',
    name: 'Lake Isabella',
    aliases: ['isabella', 'lake isabella', 'isabella reservoir', 'kern river lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Kern County, California (Southern Sierra / Kern River)',
    lat: 35.6558,
    lon: -118.4722,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 2605, surfaceAreaSqMi: 17 }
  },
  {
    id: 'shaver-lake',
    name: 'Shaver Lake',
    aliases: ['shaver', 'shaver lake', 'shaver reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Fresno County, California (Sierra National Forest • 5,370 ft)',
    lat: 37.1083,
    lon: -119.3083,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 5370, surfaceAreaSqMi: 3.4 }
  },
  {
    id: 'bass-lake-ca',
    name: 'Bass Lake',
    aliases: ['bass lake', 'bass lake ca', 'pines resort bass lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Madera County, California (Near Yosemite South Gate • 3,377 ft)',
    lat: 37.3167,
    lon: -119.5500,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 3377, surfaceAreaSqMi: 1.8 }
  },
  {
    id: 'lake-almanor',
    name: 'Lake Almanor',
    aliases: ['almanor', 'lake almanor', 'chester ca lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Plumas County, California (Southern Cascades • 4,505 ft • 44 sq mi)',
    lat: 40.2333,
    lon: -121.1667,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 4505, surfaceAreaSqMi: 44 }
  },
  {
    id: 'pyramid-lake-nv',
    name: 'Pyramid Lake (Nevada)',
    aliases: ['pyramid lake nevada', 'pyramid lake nv', 'paiute pyramid lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Washoe County, Nevada (Remnant of prehistoric Lake Lahontan • 188 sq mi)',
    lat: 40.0139,
    lon: -119.5592,
    zoom: 10.5,
    stateOrCountry: 'Nevada',
    metadata: { elevationFt: 3793, surfaceAreaSqMi: 188 }
  },

  // Major Western & US Lakes
  {
    id: 'lake-mead',
    name: 'Lake Mead',
    aliases: ['mead', 'lake mead', 'hoover dam lake', 'lake mead nra', 'lake mead reservoir'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Nevada / Arizona (Largest US reservoir by volume • Hoover Dam • 247 sq mi)',
    lat: 36.1435,
    lon: -114.4172,
    zoom: 10.5,
    stateOrCountry: 'Nevada / Arizona',
    metadata: { elevationFt: 1060, surfaceAreaSqMi: 247, depthFt: 532 }
  },
  {
    id: 'lake-powell',
    name: 'Lake Powell',
    aliases: ['powell', 'lake powell', 'glen canyon', 'glen canyon dam', 'wahweap'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Utah / Arizona (Glen Canyon • Colorado River • 254 sq mi)',
    lat: 37.0673,
    lon: -111.2433,
    zoom: 10.5,
    stateOrCountry: 'Utah / Arizona',
    metadata: { elevationFt: 3700, surfaceAreaSqMi: 254, depthFt: 583 }
  },
  {
    id: 'lake-havasu',
    name: 'Lake Havasu',
    aliases: ['havasu', 'lake havasu', 'lake havasu city', 'london bridge havasu'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Arizona / California (Colorado River • London Bridge • 30 sq mi)',
    lat: 34.4258,
    lon: -114.3725,
    zoom: 11.5,
    stateOrCountry: 'Arizona / California',
    metadata: { elevationFt: 449, surfaceAreaSqMi: 30 }
  },
  {
    id: 'lake-mohave',
    name: 'Lake Mohave',
    aliases: ['mohave', 'lake mohave', 'davis dam lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Nevada / Arizona (Colorado River • Davis Dam)',
    lat: 35.3789,
    lon: -114.6186,
    zoom: 11,
    stateOrCountry: 'Nevada / Arizona',
    metadata: { elevationFt: 647, surfaceAreaSqMi: 44 }
  },
  {
    id: 'crater-lake',
    name: 'Crater Lake',
    aliases: ['crater lake', 'crater lake national park', 'wizard island'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Klamath County, Oregon (Deepest lake in USA • 1,949 ft depth • 6,178 ft elev)',
    lat: 42.9446,
    lon: -122.1090,
    zoom: 12,
    stateOrCountry: 'Oregon',
    metadata: { elevationFt: 6178, surfaceAreaSqMi: 20.6, depthFt: 1949 }
  },
  {
    id: 'great-salt-lake',
    name: 'Great Salt Lake',
    aliases: ['great salt lake', 'salt lake', 'antelope island lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Utah (Largest saltwater lake in Western Hemisphere • ~1,700 sq mi)',
    lat: 41.1158,
    lon: -112.5997,
    zoom: 9,
    stateOrCountry: 'Utah',
    metadata: { elevationFt: 4200, surfaceAreaSqMi: 1700 }
  },
  {
    id: 'lake-chelan',
    name: 'Lake Chelan',
    aliases: ['chelan', 'lake chelan', 'stehekin'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Chelan County, Washington (50.5 miles long • 1,486 ft depth)',
    lat: 47.9667,
    lon: -120.2833,
    zoom: 10.5,
    stateOrCountry: 'Washington',
    metadata: { elevationFt: 1100, surfaceAreaSqMi: 52, depthFt: 1486 }
  },
  {
    id: 'lake-washington',
    name: 'Lake Washington',
    aliases: ['lake washington', 'lake washington seattle', 'mercer island lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'King County / Seattle, Washington (34 sq mi)',
    lat: 47.6200,
    lon: -122.2500,
    zoom: 11,
    stateOrCountry: 'Washington',
    metadata: { elevationFt: 21, surfaceAreaSqMi: 34 }
  },
  {
    id: 'flathead-lake',
    name: 'Flathead Lake',
    aliases: ['flathead', 'flathead lake', 'polson lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Montana (Largest natural freshwater lake west of Mississippi • 197 sq mi)',
    lat: 47.8833,
    lon: -114.1167,
    zoom: 10,
    stateOrCountry: 'Montana',
    metadata: { elevationFt: 2893, surfaceAreaSqMi: 197, depthFt: 370 }
  },
  {
    id: 'lake-coeur-dalene',
    name: 'Lake Coeur d\'Alene',
    aliases: ['coeur dalene', 'lake coeur d\'alene', 'lake coeur dalene', 'cda lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Kootenai County, Idaho (49.8 sq mi)',
    lat: 47.5333,
    lon: -116.8000,
    zoom: 10.5,
    stateOrCountry: 'Idaho',
    metadata: { elevationFt: 2128, surfaceAreaSqMi: 50 }
  },

  // Great Lakes
  {
    id: 'lake-superior',
    name: 'Lake Superior',
    aliases: ['superior', 'lake superior', 'great lake superior'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'US / Canada (Largest freshwater lake by surface area on Earth • 31,700 sq mi)',
    lat: 47.7000,
    lon: -87.5000,
    zoom: 7,
    stateOrCountry: 'United States / Canada',
    metadata: { elevationFt: 600, surfaceAreaSqMi: 31700, depthFt: 1332 }
  },
  {
    id: 'lake-michigan',
    name: 'Lake Michigan',
    aliases: ['michigan', 'lake michigan', 'great lake michigan', 'chicago lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'United States (Only Great Lake entirely within US • 22,404 sq mi)',
    lat: 44.0000,
    lon: -87.0000,
    zoom: 7,
    stateOrCountry: 'United States',
    metadata: { elevationFt: 577, surfaceAreaSqMi: 22404, depthFt: 923 }
  },
  {
    id: 'lake-huron',
    name: 'Lake Huron',
    aliases: ['huron', 'lake huron', 'georgian bay lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'US / Canada (Great Lakes • 23,000 sq mi • Mackinac Island)',
    lat: 45.0000,
    lon: -82.5000,
    zoom: 7,
    stateOrCountry: 'United States / Canada',
    metadata: { elevationFt: 577, surfaceAreaSqMi: 23000, depthFt: 750 }
  },
  {
    id: 'lake-erie',
    name: 'Lake Erie',
    aliases: ['erie', 'lake erie', 'great lake erie'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'US / Canada (Great Lakes • 9,910 sq mi • Niagara source)',
    lat: 42.2000,
    lon: -81.2000,
    zoom: 7.5,
    stateOrCountry: 'United States / Canada',
    metadata: { elevationFt: 569, surfaceAreaSqMi: 9910, depthFt: 210 }
  },
  {
    id: 'lake-ontario',
    name: 'Lake Ontario',
    aliases: ['ontario', 'lake ontario', 'great lake ontario'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'US / Canada (Great Lakes • 7,340 sq mi • St. Lawrence outflow)',
    lat: 43.7000,
    lon: -77.9000,
    zoom: 7.5,
    stateOrCountry: 'United States / Canada',
    metadata: { elevationFt: 243, surfaceAreaSqMi: 7340, depthFt: 802 }
  },

  // Other Notable US & World Lakes
  {
    id: 'lake-of-the-ozarks',
    name: 'Lake of the Ozarks',
    aliases: ['ozarks', 'lake of the ozarks', 'baganell dam lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Missouri (84 sq mi • 1,150 miles of winding shoreline)',
    lat: 38.2000,
    lon: -92.6167,
    zoom: 10,
    stateOrCountry: 'Missouri',
    metadata: { elevationFt: 659, surfaceAreaSqMi: 84 }
  },
  {
    id: 'lake-travis',
    name: 'Lake Travis',
    aliases: ['travis', 'lake travis', 'mansfield dam lake', 'austin lake travis'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Travis / Burnet Counties / Austin, Texas (Colorado River • 30 sq mi)',
    lat: 30.4333,
    lon: -97.9833,
    zoom: 11,
    stateOrCountry: 'Texas',
    metadata: { elevationFt: 681, surfaceAreaSqMi: 30 }
  },
  {
    id: 'lake-champlain',
    name: 'Lake Champlain',
    aliases: ['champlain', 'lake champlain', 'burlington lake'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'New York / Vermont / Quebec (514 sq mi • Green Mtns backdrop)',
    lat: 44.5333,
    lon: -73.3333,
    zoom: 9.5,
    stateOrCountry: 'New York / Vermont',
    metadata: { elevationFt: 95, surfaceAreaSqMi: 514 }
  },
  {
    id: 'lake-george-ny',
    name: 'Lake George',
    aliases: ['lake george', 'queen of american lakes', 'lake george ny'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Adirondack Mountains, New York (32 miles long • Queen of American Lakes)',
    lat: 43.6167,
    lon: -73.6167,
    zoom: 11,
    stateOrCountry: 'New York',
    metadata: { elevationFt: 320, surfaceAreaSqMi: 44 }
  },
  {
    id: 'lake-louise-lake',
    name: 'Lake Louise (Glacial Lake)',
    aliases: ['lake louise', 'lake louise alberta', 'lake louise water'],
    category: 'lake',
    icon: '🌊',
    subtitle: 'Banff National Park, Alberta, Canada (Glacial turquoise waters • 5,680 ft)',
    lat: 51.4150,
    lon: -116.2160,
    zoom: 13,
    stateOrCountry: 'Alberta, Canada',
    metadata: { elevationFt: 5680 }
  }
];

// Build curated ski resorts directly from STRATEGIC_SNOWBOARD_RESORTS
export const CURATED_SKI_RESORTS: CuratedLocation[] = STRATEGIC_SNOWBOARD_RESORTS.map((resort) => {
  const aliases = [
    resort.name.toLowerCase(),
    resort.id.replace(/-/g, ' '),
    resort.name.toLowerCase().replace(/resort|mountain|ski area|ski resort/gi, '').trim()
  ];

  // Mountain-specific popular shorthand aliases
  if (resort.id === 'mt-baldy') {
    aliases.push('baldy', 'mt baldy', 'mount baldy', 'mt. baldy', 'mount baldy ski');
  } else if (resort.id === 'mammoth-mountain') {
    aliases.push('mammoth', 'mammoth ski', 'mammoth lakes ski');
  } else if (resort.id === 'palisades-tahoe') {
    aliases.push('palisades', 'squaw', 'squaw valley', 'alpine meadows', 'olympic valley');
  } else if (resort.id === 'heavenly') {
    aliases.push('heavenly', 'heavenly resort', 'south lake tahoe ski');
  } else if (resort.id === 'snow-summit') {
    aliases.push('snow summit', 'big bear', 'bear mountain', 'big bear mountain', 'big bear ski');
  } else if (resort.id === 'mountain-high') {
    aliases.push('mountain high', 'mt high', 'wrightwood ski', 'mthigh');
  } else if (resort.id === 'vail') {
    aliases.push('vail', 'vail co', 'vail ski');
  } else if (resort.id === 'breckenridge') {
    aliases.push('breck', 'breckenridge', 'breckenridge ski');
  } else if (resort.id === 'aspen-snowmass') {
    aliases.push('aspen', 'snowmass', 'buttermilk', 'aspen highlands');
  } else if (resort.id === 'park-city') {
    aliases.push('park city', 'park city ski', 'canyons');
  } else if (resort.id === 'whistler-blackcomb') {
    aliases.push('whistler', 'blackcomb', 'whistler ski');
  } else if (resort.id === 'jackson-hole') {
    aliases.push('jackson hole', 'teton village', 'jackson hole ski');
  } else if (resort.id === 'lake-louise') {
    aliases.push('lake louise ski', 'lake louise resort');
  }

  return {
    id: `resort-${resort.id}`,
    name: resort.name,
    aliases,
    category: 'ski_resort',
    icon: '⛷️',
    subtitle: `${resort.region}, ${resort.stateOrCountry} (${resort.summitElevationFt?.toLocaleString()} ft • ${resort.lifts} Lifts • ${resort.runs} Runs)`,
    lat: resort.lat,
    lon: resort.lng,
    zoom: 13.5,
    stateOrCountry: resort.stateOrCountry,
    metadata: {
      elevationFt: resort.summitElevationFt,
      summitFt: resort.summitElevationFt,
      baseFt: resort.baseElevationFt,
      verticalDropFt: resort.verticalDropFt,
      lifts: resort.lifts,
      runs: resort.runs,
      resortData: resort
    }
  };
});

// Mountain peaks that users frequently search
export const CURATED_PEAKS: CuratedLocation[] = [
  {
    id: 'peak-mt-san-antonio',
    name: 'Mount San Antonio (Mt. Baldy Peak)',
    aliases: ['mount san antonio', 'mt san antonio', 'baldy peak', 'mt baldy summit'],
    category: 'mountain',
    icon: '🏔️',
    subtitle: 'Highest peak in San Gabriel Mountains, California (10,064 ft elevation)',
    lat: 34.2891,
    lon: -117.6464,
    zoom: 13,
    stateOrCountry: 'California',
    metadata: { elevationFt: 10064 }
  },
  {
    id: 'peak-mt-whitney',
    name: 'Mount Whitney',
    aliases: ['whitney', 'mount whitney', 'mt whitney', 'whitney portal'],
    category: 'mountain',
    icon: '🏔️',
    subtitle: 'Sierra Nevada, California (Highest summit in contiguous US • 14,505 ft)',
    lat: 36.5786,
    lon: -118.2920,
    zoom: 12.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 14505 }
  },
  {
    id: 'peak-mt-shasta',
    name: 'Mount Shasta',
    aliases: ['shasta', 'mount shasta', 'mt shasta'],
    category: 'mountain',
    icon: '🏔️',
    subtitle: 'Cascade Range, Northern California (Stratovolcano • 14,179 ft elevation)',
    lat: 41.4092,
    lon: -122.1949,
    zoom: 11.5,
    stateOrCountry: 'California',
    metadata: { elevationFt: 14179 }
  },
  {
    id: 'peak-mt-rainier',
    name: 'Mount Rainier',
    aliases: ['rainier', 'mount rainier', 'mt rainier', 'tahoma'],
    category: 'mountain',
    icon: '🏔️',
    subtitle: 'Cascade Range, Washington (Highest volcanic peak in Cascades • 14,411 ft)',
    lat: 46.8523,
    lon: -121.7603,
    zoom: 11.5,
    stateOrCountry: 'Washington',
    metadata: { elevationFt: 14411 }
  }
];

export const ALL_CURATED_LOCATIONS: CuratedLocation[] = [
  ...CURATED_SKI_RESORTS,
  ...CURATED_LAKES,
  ...CURATED_PEAKS
];

/**
 * Instant local search with fuzzy and prefix scoring
 */
export function searchCuratedLocations(query: string, maxResults = 6): CuratedLocation[] {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  const tokens = clean.split(/\s+/).filter(Boolean);

  interface ScoredMatch {
    location: CuratedLocation;
    score: number;
  }

  const matches: ScoredMatch[] = [];

  for (const loc of ALL_CURATED_LOCATIONS) {
    let bestScore = 0;
    const nameLower = loc.name.toLowerCase();

    // Exact name match
    if (nameLower === clean) {
      bestScore = 1000;
    } else if (nameLower.startsWith(clean)) {
      bestScore = 500 + (100 - nameLower.length);
    } else {
      // Check aliases
      for (const alias of loc.aliases) {
        if (alias === clean) {
          bestScore = Math.max(bestScore, 900);
          break;
        } else if (alias.startsWith(clean)) {
          bestScore = Math.max(bestScore, 400 + (50 - alias.length));
        } else if (alias.includes(clean)) {
          bestScore = Math.max(bestScore, 200);
        }
      }

      // Check if all search tokens match name or aliases
      if (bestScore === 0) {
        const fullSearchText = `${nameLower} ${loc.aliases.join(' ')} ${loc.subtitle.toLowerCase()}`;
        const allTokensFound = tokens.every(tok => fullSearchText.includes(tok));
        if (allTokensFound) {
          bestScore = 150;
        }
      }
    }

    if (bestScore > 0) {
      matches.push({ location: loc, score: bestScore });
    }
  }

  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);

  return matches.slice(0, maxResults).map(m => m.location);
}
