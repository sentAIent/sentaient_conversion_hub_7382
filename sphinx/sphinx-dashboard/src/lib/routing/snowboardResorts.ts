// Strategic Snowboard & Ski Resorts Intelligence Database
// Curated dataset of premier North American & international snowboard/ski mountains
// Includes coordinates, elevations, vertical drops, terrain parks, and trails.
import { ADDITIONAL_SNOWBOARD_RESORTS } from './additionalSnowboardResorts';

export interface SnowboardResort {
  id: string;
  name: string;
  region: string;
  stateOrCountry: string;
  lat: number;
  lng: number;
  summitElevationFt: number;
  baseElevationFt: number;
  verticalDropFt: number;
  skiableAcres: number;
  runs: number;
  lifts: number;
  terrainParks: number;
  hasHalfpipe: boolean;
  nightRiding: boolean;
  highlights: string[];
}

const CORE_SNOWBOARD_RESORTS: SnowboardResort[] = [
  // Southern California & Lake Tahoe
  {
    id: 'mt-baldy',
    name: 'Mt. Baldy Resort',
    region: 'Southern California / San Gabriel Mountains',
    stateOrCountry: 'California',
    lat: 34.27243,
    lng: -117.61025,
    summitElevationFt: 8600,
    baseElevationFt: 6500,
    verticalDropFt: 2100,
    skiableAcres: 800,
    runs: 30,
    lifts: 4,
    terrainParks: 1,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Chair 1 to The Notch', 'Thunder Mountain summit', 'Devils Backbone & Rollercoaster', 'Steep natural tree glades on Chair 3']
  },
  {
    id: 'palisades-tahoe',
    name: 'Palisades Tahoe',
    region: 'Lake Tahoe',
    stateOrCountry: 'California',
    lat: 39.1970,
    lng: -120.2357,
    summitElevationFt: 9050,
    baseElevationFt: 6200,
    verticalDropFt: 2850,
    skiableAcres: 6000,
    runs: 270,
    lifts: 42,
    terrainParks: 5,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Legendary freeride terrain', 'KT-22 lift', 'Terrain parks across 2 mountains']
  },
  {
    id: 'mammoth-mountain',
    name: 'Mammoth Mountain',
    region: 'Eastern Sierra',
    stateOrCountry: 'California',
    lat: 37.6308,
    lng: -119.0326,
    summitElevationFt: 11053,
    baseElevationFt: 7953,
    verticalDropFt: 3100,
    skiableAcres: 3500,
    runs: 175,
    lifts: 25,
    terrainParks: 10,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Unbound Terrain Parks (Top in world)', 'Superpipe & 22ft transition', 'Long snow season']
  },
  {
    id: 'heavenly',
    name: 'Heavenly Mountain Resort',
    region: 'Lake Tahoe',
    stateOrCountry: 'CA / NV',
    lat: 38.9353,
    lng: -119.9400,
    summitElevationFt: 10067,
    baseElevationFt: 6540,
    verticalDropFt: 3500,
    skiableAcres: 4800,
    runs: 97,
    lifts: 28,
    terrainParks: 4,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Straddles California/Nevada border', 'Lake Tahoe panoramic vistas', 'Extensive tree runs']
  },
  {
    id: 'northstar',
    name: 'Northstar California',
    region: 'Lake Tahoe',
    stateOrCountry: 'California',
    lat: 39.2746,
    lng: -120.1211,
    summitElevationFt: 8610,
    baseElevationFt: 6330,
    verticalDropFt: 2280,
    skiableAcres: 3170,
    runs: 100,
    lifts: 20,
    terrainParks: 7,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Shaun White 22ft superpipe legacy', 'Award-winning progression parks', 'Groomed cruisers']
  },
  {
    id: 'bear-mountain',
    name: 'Bear Mountain / Big Bear',
    region: 'San Bernardino',
    stateOrCountry: 'California',
    lat: 34.2267,
    lng: -116.8611,
    summitElevationFt: 8805,
    baseElevationFt: 7140,
    verticalDropFt: 1665,
    skiableAcres: 748,
    runs: 55,
    lifts: 12,
    terrainParks: 8,
    hasHalfpipe: true,
    nightRiding: true,
    highlights: ['Freestyle snowboarding Mecca', 'Park runs top to bottom', 'All-mountain freestyle setup']
  },

  // Colorado
  {
    id: 'breckenridge',
    name: 'Breckenridge Ski Resort',
    region: 'Summit County',
    stateOrCountry: 'Colorado',
    lat: 39.4802,
    lng: -106.0667,
    summitElevationFt: 12998,
    baseElevationFt: 9600,
    verticalDropFt: 3398,
    skiableAcres: 2908,
    runs: 187,
    lifts: 35,
    terrainParks: 4,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['5 distinct peaks (Peaks 6-10)', 'Highest chairlift in North America (Imperial Express)', 'Freeway Terrain Park']
  },
  {
    id: 'vail',
    name: 'Vail Mountain',
    region: 'Vail Valley',
    stateOrCountry: 'Colorado',
    lat: 39.6391,
    lng: -106.3742,
    summitElevationFt: 11570,
    baseElevationFt: 8120,
    verticalDropFt: 3450,
    skiableAcres: 5317,
    runs: 195,
    lifts: 31,
    terrainParks: 3,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Legendary Back Bowls', 'Blue Sky Basin backcountry feel', 'Immense terrain width']
  },
  {
    id: 'aspen-snowmass',
    name: 'Snowmass / Aspen',
    region: 'Roaring Fork Valley',
    stateOrCountry: 'Colorado',
    lat: 39.2084,
    lng: -106.9498,
    summitElevationFt: 12510,
    baseElevationFt: 8104,
    verticalDropFt: 4406,
    skiableAcres: 3342,
    runs: 98,
    lifts: 20,
    terrainParks: 3,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Massive 4406ft continuous vertical', 'X Games Superpipe at Buttermilk', 'Vast glades and powder bowls']
  },
  {
    id: 'keystone',
    name: 'Keystone Resort',
    region: 'Summit County',
    stateOrCountry: 'Colorado',
    lat: 39.6053,
    lng: -105.9540,
    summitElevationFt: 12408,
    baseElevationFt: 9280,
    verticalDropFt: 3128,
    skiableAcres: 3149,
    runs: 130,
    lifts: 20,
    terrainParks: 4,
    hasHalfpipe: false,
    nightRiding: true,
    highlights: ['A51 Progression Park', 'Night riding under stadium lights', 'Bergman Bowl expansion']
  },
  {
    id: 'steamboat',
    name: 'Steamboat Resort',
    region: 'Yampa Valley',
    stateOrCountry: 'Colorado',
    lat: 40.4572,
    lng: -106.8045,
    summitElevationFt: 10568,
    baseElevationFt: 6900,
    verticalDropFt: 3668,
    skiableAcres: 3741,
    runs: 170,
    lifts: 23,
    terrainParks: 4,
    hasHalfpipe: true,
    nightRiding: true,
    highlights: ['Champagne Powder® snow', 'Wild West tree skiing & snowboarding', 'Mahogany Ridge expansion']
  },

  // Utah
  {
    id: 'park-city',
    name: 'Park City Mountain',
    region: 'Wasatch Mountains',
    stateOrCountry: 'Utah',
    lat: 40.6514,
    lng: -111.5080,
    summitElevationFt: 10026,
    baseElevationFt: 6800,
    verticalDropFt: 3226,
    skiableAcres: 7300,
    runs: 330,
    lifts: 43,
    terrainParks: 6,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Largest ski/snowboard resort in the USA', 'Quicksilver Gondola link', 'Kings Crown & 3 Kings Parks']
  },
  {
    id: 'brighton',
    name: 'Brighton Resort',
    region: 'Big Cottonwood Canyon',
    stateOrCountry: 'Utah',
    lat: 40.5980,
    lng: -111.5832,
    summitElevationFt: 10500,
    baseElevationFt: 8755,
    verticalDropFt: 1745,
    skiableAcres: 1050,
    runs: 66,
    lifts: 8,
    terrainParks: 5,
    hasHalfpipe: false,
    nightRiding: true,
    highlights: ['Snowboarders favorite in Utah', '500+ inches of dry Wasatch powder', 'Top-tier night riding & jib park']
  },
  {
    id: 'snowbird',
    name: 'Snowbird',
    region: 'Little Cottonwood Canyon',
    stateOrCountry: 'Utah',
    lat: 40.5810,
    lng: -111.6563,
    summitElevationFt: 11000,
    baseElevationFt: 7760,
    verticalDropFt: 3240,
    skiableAcres: 2500,
    runs: 140,
    lifts: 14,
    terrainParks: 1,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Aerial Tram to Hidden Peak', 'Mineral Basin powder bowl', 'Steep big-mountain freeriding']
  },

  // Pacific Northwest & Canada
  {
    id: 'whistler-blackcomb',
    name: 'Whistler Blackcomb',
    region: 'Coast Mountains',
    stateOrCountry: 'BC, Canada',
    lat: 50.1163,
    lng: -122.9574,
    summitElevationFt: 7494,
    baseElevationFt: 2214,
    verticalDropFt: 5280,
    skiableAcres: 8171,
    runs: 240,
    lifts: 37,
    terrainParks: 5,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Mile-high 5,280ft vertical drop', 'Peak 2 Peak Gondola', 'Vast alpine bowls & glaciers']
  },
  {
    id: 'mt-baker',
    name: 'Mt. Baker Ski Area',
    region: 'Cascades',
    stateOrCountry: 'Washington',
    lat: 48.8569,
    lng: -121.6669,
    summitElevationFt: 5089,
    baseElevationFt: 3500,
    verticalDropFt: 1589,
    skiableAcres: 1000,
    runs: 31,
    lifts: 10,
    terrainParks: 1,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['World record snowfall (1,140 inches)', 'Legendary Mount Baker Banked Slalom', 'Pure powder freeriding']
  },
  {
    id: 'mt-hood-meadows',
    name: 'Mt. Hood Meadows',
    region: 'Mount Hood',
    stateOrCountry: 'Oregon',
    lat: 45.3317,
    lng: -121.6645,
    summitElevationFt: 7300,
    baseElevationFt: 4523,
    verticalDropFt: 2777,
    skiableAcres: 2150,
    runs: 85,
    lifts: 11,
    terrainParks: 5,
    hasHalfpipe: true,
    nightRiding: true,
    highlights: ['Heather Canyon backcountry steeps', 'Forest terrain parks', 'Scenic volcano glades']
  },

  // Northern Rockies
  {
    id: 'jackson-hole',
    name: 'Jackson Hole Mountain Resort',
    region: 'Teton Range',
    stateOrCountry: 'Wyoming',
    lat: 43.5875,
    lng: -110.8279,
    summitElevationFt: 10450,
    baseElevationFt: 6311,
    verticalDropFt: 4139,
    skiableAcres: 2500,
    runs: 133,
    lifts: 13,
    terrainParks: 4,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Corbets Couloir', 'Big Red Aerial Tram', '4139ft continuous vertical']
  },
  {
    id: 'big-sky',
    name: 'Big Sky Resort',
    region: 'Madison Range',
    stateOrCountry: 'Montana',
    lat: 45.2858,
    lng: -111.4013,
    summitElevationFt: 11166,
    baseElevationFt: 6800,
    verticalDropFt: 4350,
    skiableAcres: 5850,
    runs: 300,
    lifts: 39,
    terrainParks: 4,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Lone Peak Tram to 11,166ft', 'Triple Dips & North Summit Snowfield', 'Zero lift lines']
  },

  // Northeast
  {
    id: 'killington',
    name: 'Killington Grand Resort',
    region: 'Green Mountains',
    stateOrCountry: 'Vermont',
    lat: 43.6247,
    lng: -72.7967,
    summitElevationFt: 4241,
    baseElevationFt: 1165,
    verticalDropFt: 3050,
    skiableAcres: 1509,
    runs: 155,
    lifts: 22,
    terrainParks: 6,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Beast of the East', 'The Stash (Jake Burton all-wood natural park)', '3050ft vertical']
  },
  {
    id: 'stowe',
    name: 'Stowe Mountain Resort',
    region: 'Mount Mansfield',
    stateOrCountry: 'Vermont',
    lat: 44.5303,
    lng: -72.7814,
    summitElevationFt: 4393,
    baseElevationFt: 1280,
    verticalDropFt: 2360,
    skiableAcres: 485,
    runs: 116,
    lifts: 12,
    terrainParks: 3,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Front Four steep trails (Goat, Starr, National, Liftline)', 'Mount Mansfield peak']
  },

  // International
  {
    id: 'niseko-united',
    name: 'Niseko United',
    region: 'Hokkaido',
    stateOrCountry: 'Japan',
    lat: 42.8625,
    lng: 140.7042,
    summitElevationFt: 4291,
    baseElevationFt: 840,
    verticalDropFt: 3451,
    skiableAcres: 2191,
    runs: 70,
    lifts: 30,
    terrainParks: 3,
    hasHalfpipe: false,
    nightRiding: true,
    highlights: ['Japow world capital (600+ inches of dry Siberian powder)', 'Extensive night riding', 'Gate system into backcountry']
  },
  {
    id: 'chamonix',
    name: 'Chamonix Mont-Blanc',
    region: 'French Alps',
    stateOrCountry: 'France',
    lat: 45.9237,
    lng: 6.8694,
    summitElevationFt: 12605,
    baseElevationFt: 3400,
    verticalDropFt: 9205,
    skiableAcres: 4500,
    runs: 119,
    lifts: 49,
    terrainParks: 2,
    hasHalfpipe: false,
    nightRiding: false,
    highlights: ['Vallee Blanche 20km glacial descent', 'Aiguille du Midi cable car', 'Extreme big-mountain freeriding']
  },
  {
    id: 'zermatt',
    name: 'Zermatt / Matterhorn Glacier',
    region: 'Valais Alps',
    stateOrCountry: 'Switzerland',
    lat: 45.9766,
    lng: 7.7291,
    summitElevationFt: 12792,
    baseElevationFt: 5315,
    verticalDropFt: 7477,
    skiableAcres: 8895,
    runs: 148,
    lifts: 53,
    terrainParks: 2,
    hasHalfpipe: true,
    nightRiding: false,
    highlights: ['Matterhorn backdrop', 'Year-round glacier snowboarding', 'Cross-border to Cervinia, Italy']
  }
];

export const STRATEGIC_SNOWBOARD_RESORTS: SnowboardResort[] = [
  ...CORE_SNOWBOARD_RESORTS,
  ...ADDITIONAL_SNOWBOARD_RESORTS
];

export function getAllSnowboardResorts(): SnowboardResort[] {
  return STRATEGIC_SNOWBOARD_RESORTS;
}

export function getSnowboardResortsGeoJSON() {
  return {
    type: 'FeatureCollection' as const,
    features: STRATEGIC_SNOWBOARD_RESORTS.map(resort => ({
      type: 'Feature' as const,
      properties: {
        id: resort.id,
        name: resort.name,
        region: resort.region,
        stateOrCountry: resort.stateOrCountry,
        summitElevationFt: resort.summitElevationFt,
        baseElevationFt: resort.baseElevationFt,
        verticalDropFt: resort.verticalDropFt,
        skiableAcres: resort.skiableAcres,
        runs: resort.runs,
        lifts: resort.lifts,
        terrainParks: resort.terrainParks,
        hasHalfpipe: resort.hasHalfpipe,
        nightRiding: resort.nightRiding,
        highlights: resort.highlights,
        summitFt: resort.summitElevationFt,
        baseFt: resort.baseElevationFt,
        lat: resort.lat,
        lng: resort.lng
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [resort.lng, resort.lat]
      }
    }))
  };
}
