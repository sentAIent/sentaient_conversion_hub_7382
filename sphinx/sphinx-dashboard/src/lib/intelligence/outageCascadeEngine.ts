/**
 * outageCascadeEngine.ts
 * Sphinx Critical Infrastructure Interdependency Graph & Outage Cascade Simulator
 * Models directed relationships between:
 * - High-voltage power corridors & substations (Pacific Intertie, Path 15, ERCOT)
 * - Aqueduct pumping plants & municipal water reservoirs
 * - Trauma centers & hospital acute care ICU emergency generator reliance
 * - Data center fiberoptic conduits & cellular tower backhaul
 */

export interface InfrastructureNode {
  id: string;
  name: string;
  category: 'power_substation' | 'transmission_corridor' | 'water_pump' | 'hospital' | 'telecom_hub';
  coordinates: [number, number]; // [lon, lat]
  operator: string;
  capacityMetric: string;
  status: 'ONLINE_NORMAL' | 'CASCADE_OFFLINE' | 'EMERGENCY_BACKUP';
  backupRunwayHours?: number;
  dependentNodeIds: string[];
  description: string;
}

export interface CascadeSimulationResult {
  triggeredNodeId: string;
  totalNodesAffected: number;
  customersWithoutPowerEst: number;
  waterPumpsDown: number;
  hospitalsOnGenerators: number;
  telecomDegradationPct: number;
  cascadeStages: Array<{
    stageNumber: number;
    delayMinutes: number;
    affectedNodeId: string;
    affectedNodeName: string;
    impactDescription: string;
  }>;
}

export const STRATEGIC_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
  // 1. High-Voltage Power Hubs
  {
    id: 'sub-los-banos-500kv',
    name: 'Los Banos 500kV Substation (Path 15 North Gate)',
    category: 'power_substation',
    coordinates: [-120.880, 37.050],
    operator: 'PG&E / WAPA',
    capacityMetric: '5,400 MW Transfer Capacity',
    status: 'ONLINE_NORMAL',
    dependentNodeIds: ['pump-dos-amigos', 'sub-gates-500kv', 'hosp-fresno-regional', 'dci-silicon-valley-link'],
    description: 'Critical California Path 15 bulk transmission hub coupling Northern California grid to Southern generation.'
  },
  {
    id: 'sub-gates-500kv',
    name: 'Gates 500kV Substation (Path 15 South Gate)',
    category: 'power_substation',
    coordinates: [-120.100, 36.020],
    operator: 'PG&E',
    capacityMetric: '4,800 MW Transfer Capacity',
    status: 'ONLINE_NORMAL',
    dependentNodeIds: ['pump-buena-vista', 'hosp-bakersfield-memorial'],
    description: 'Southern terminus of California Path 15 handling bulk agricultural and water pumping loads.'
  },
  {
    id: 'sub-sylmar-converter',
    name: 'Sylmar Converter Station (Pacific DC Intertie)',
    category: 'power_substation',
    coordinates: [-118.490, 34.312],
    operator: 'LADWP',
    capacityMetric: '3,100 MW HVDC Converter',
    status: 'ONLINE_NORMAL',
    dependentNodeIds: ['pump-edmonston', 'hosp-ucla-medical', 'tel-one-wilshire'],
    description: 'Terminus of 846-mile ±500kV HVDC intertie importing Columbia River hydropower into the Los Angeles basin.'
  },

  // 2. Aqueduct Water Pumping Plants
  {
    id: 'pump-dos-amigos',
    name: 'Dos Amigos Pumping Plant (California Aqueduct)',
    category: 'water_pump',
    coordinates: [-120.850, 36.980],
    operator: 'California DWR',
    capacityMetric: '15,400 CFS Lift Capacity',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 4,
    dependentNodeIds: ['res-san-luis-reservoir'],
    description: 'Pumps 13,000+ CFS of water southward along the San Joaquin Valley. Requires 300+ MW continuous power.'
  },
  {
    id: 'pump-edmonston',
    name: 'A.D. Edmonston Pumping Plant (Tehachapi Lift)',
    category: 'water_pump',
    coordinates: [-118.870, 34.970],
    operator: 'California DWR',
    capacityMetric: '1,926 ft Vertical Water Lift (Largest in USA)',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 2,
    dependentNodeIds: ['res-castaic-lake'],
    description: 'Lifts water over the Tehachapi Mountains into Southern California. Single largest electricity consumer in California (800+ MW).'
  },
  {
    id: 'pump-buena-vista',
    name: 'Buena Vista Pumping Plant',
    category: 'water_pump',
    coordinates: [-119.340, 35.210],
    operator: 'California DWR',
    capacityMetric: '5,000 CFS Lift Capacity',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 6,
    dependentNodeIds: ['res-lake-perris'],
    description: 'Pumping stage lifting California Aqueduct water across the southern Central Valley.'
  },

  // 3. Hospitals & Trauma Centers
  {
    id: 'hosp-fresno-regional',
    name: 'Community Regional Medical Center (Fresno)',
    category: 'hospital',
    coordinates: [-119.780, 36.740],
    operator: 'Community Medical Centers',
    capacityMetric: 'Trauma Level I / 685 Acute Beds',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 72,
    dependentNodeIds: [],
    description: 'Only Level 1 Trauma Center between Sacramento and Los Angeles. Relies on diesel generators during grid failure.'
  },
  {
    id: 'hosp-ucla-medical',
    name: 'Ronald Reagan UCLA Medical Center',
    category: 'hospital',
    coordinates: [-118.445, 34.066],
    operator: 'UCLA Health',
    capacityMetric: 'Trauma Level I / 520 Acute ICU Beds',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 96,
    dependentNodeIds: [],
    description: 'Major tertiary hospital & research trauma center. Has rooftop heliport and on-site cogeneration turbine.'
  },
  {
    id: 'hosp-bakersfield-memorial',
    name: 'Bakersfield Memorial Hospital',
    category: 'hospital',
    coordinates: [-119.030, 35.390],
    operator: 'Dignity Health',
    capacityMetric: 'Trauma Level II / 385 Beds',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 48,
    dependentNodeIds: [],
    description: 'Key southern San Joaquin Valley medical emergency facility.'
  },

  // 4. Telecommunication & Data Centers
  {
    id: 'tel-one-wilshire',
    name: 'One Wilshire Telecom Meet-Me-Room',
    category: 'telecom_hub',
    coordinates: [-118.256, 34.048],
    operator: 'CoreSite',
    capacityMetric: 'Pacific Rim Gateway / 300+ Telco Carriers',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 120,
    dependentNodeIds: [],
    description: 'Most densely connected telecommunication carrier hub in North America, terminating trans-Pacific subsea cables.'
  },
  {
    id: 'dci-silicon-valley-link',
    name: 'Silicon Valley DCI Optical Carrier Hub (Santa Clara)',
    category: 'telecom_hub',
    coordinates: [-121.950, 37.350],
    operator: 'Equinix / Digital Realty',
    capacityMetric: '100+ Tbps Interconnect',
    status: 'ONLINE_NORMAL',
    backupRunwayHours: 72,
    dependentNodeIds: [],
    description: 'High-density fiber cross-connect linking primary tech cloud availability zones.'
  }
];

export class OutageCascadeEngine {
  /**
   * Simulates a cascade failure starting from an initial damaged or tripped node
   */
  public static simulateCascade(
    initialNodeId: string,
    severity: 'minor_derate' | 'substation_trip' | 'black_sky_cascade' = 'substation_trip'
  ): CascadeSimulationResult {
    const nodeMap = new Map<string, InfrastructureNode>();
    STRATEGIC_INFRASTRUCTURE_NODES.forEach((n) => nodeMap.set(n.id, { ...n }));

    const root = nodeMap.get(initialNodeId);
    if (!root) {
      return {
        triggeredNodeId: initialNodeId,
        totalNodesAffected: 0,
        customersWithoutPowerEst: 0,
        waterPumpsDown: 0,
        hospitalsOnGenerators: 0,
        telecomDegradationPct: 0,
        cascadeStages: []
      };
    }

    const stages: CascadeSimulationResult['cascadeStages'] = [];
    const visited = new Set<string>();
    const queue: Array<{ id: string; stage: number; delay: number }> = [{ id: initialNodeId, stage: 1, delay: 0 }];

    let customersLost = 0;
    let waterPumpsDown = 0;
    let hospitalsOnGenerators = 0;
    let telecomDegradation = 0;

    // Severity multipliers
    const mult = severity === 'black_sky_cascade' ? 2.5 : severity === 'substation_trip' ? 1.0 : 0.3;

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current.id)) continue;
      visited.add(current.id);

      const node = nodeMap.get(current.id);
      if (!node) continue;

      let impactDesc = '';
      if (node.category === 'power_substation') {
        customersLost += Math.round(480000 * mult);
        impactDesc = `Main bus fault at ${node.name}. Trip signals propagate across 500kV intertie.`;
      } else if (node.category === 'water_pump') {
        waterPumpsDown += 1;
        impactDesc = `Loss of line voltage tripped heavy synchronous pumps at ${node.name}. Water flow halted.`;
      } else if (node.category === 'hospital') {
        hospitalsOnGenerators += 1;
        impactDesc = `${node.name} transferred to emergency diesel generators (${node.backupRunwayHours}h fuel reserve).`;
      } else if (node.category === 'telecom_hub') {
        telecomDegradation += Math.min(35, Math.round(25 * mult));
        impactDesc = `${node.name} on secondary battery UPS; regional internet latency elevated +45ms.`;
      }

      stages.push({
        stageNumber: current.stage,
        delayMinutes: current.delay,
        affectedNodeId: node.id,
        affectedNodeName: node.name,
        impactDescription: impactDesc
      });

      // Propagate dependencies
      node.dependentNodeIds.forEach((depId, idx) => {
        if (!visited.has(depId)) {
          queue.push({
            id: depId,
            stage: current.stage + 1,
            delay: current.delay + (idx + 1) * (severity === 'black_sky_cascade' ? 4 : 12)
          });
        }
      });
    }

    return {
      triggeredNodeId: initialNodeId,
      totalNodesAffected: visited.size,
      customersWithoutPowerEst: customersLost,
      waterPumpsDown,
      hospitalsOnGenerators,
      telecomDegradationPct: Math.min(100, telecomDegradation),
      cascadeStages: stages
    };
  }
}
