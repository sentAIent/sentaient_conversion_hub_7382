/**
 * SPHINX Tactical Pin Threat Proximity & Dynamic Mitigation Engine
 *
 * Real-time geospatial threat assessment for user custom pins:
 * - Survival Caches & Food Storage
 * - Emergency Refuges & Bunkers
 * - Water Wells & Springs
 * - Homesteads & Agricultural Assets
 * - Tactical Observation Posts & Safehouses
 *
 * Evaluates proximity to:
 * - Wildfires & Thermal Anomalies
 * - Earthquakes & Seismic Ruptures
 * - Dams & Flood Inundation Zones
 * - Chemical Sprays, Toxic Spills & Industrial Facilities
 * - Radiation Anomalies & Nuclear Facilities
 * - Severe Storms & Weather Hazards
 *
 * Generates dynamic, step-by-step mitigation checklists from the Civil Preparedness Codex.
 * Zero sectarian or theological references.
 */

import { CustomPin } from '../useSettings';

export type HazardClass = 'fire' | 'earthquake' | 'flood' | 'chemical' | 'radiation' | 'weather' | 'disaster';
export type ThreatSeverity = 'critical' | 'warning' | 'advisory';
export type OverallPinStatus = 'clear' | 'advisory' | 'warning' | 'critical';

export interface PinThreat {
  id: string;
  hazardType: HazardClass;
  severity: ThreatSeverity;
  distanceMiles: number;
  bearingDegrees: number;
  compassDirection: string;
  title: string;
  description: string;
  sourceId: string;
  checklistCategory: string;
  protocols: string[];
}

export interface PinThreatReport {
  pinId: string;
  pinLabel: string;
  pinCategory: string;
  lat: number;
  lon: number;
  overallStatus: OverallPinStatus;
  threats: PinThreat[];
  evaluatedAt: string;
}

export interface ThreatRadarSummary {
  totalPins: number;
  threatenedPins: number;
  criticalPins: number;
  warningPins: number;
  advisoryPins: number;
  clearPins: number;
  reports: PinThreatReport[];
}

export interface ThreatEvaluationDatasets {
  wildfires?: any[];
  earthquakes?: any[];
  dams?: Array<{ id: string; name: string; lat: number; lon: number; hazardRating?: string }>;
  toxicSites?: any[];
  chemicalSprays?: Array<{ id: string; chemicalName: string; lat: number; lon: number; status?: string; bufferRadiusMiles?: number }>;
  radiationSensors?: Array<{ id: string; name: string; lat: number; lon: number; cpm?: number; isAlert?: boolean }>;
  disasters?: any[];
  weatherCells?: any[];
}

export class PinThreatEngine {
  /**
   * Geodesic Haversine distance in statute miles
   */
  public static calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8; // Earth's mean radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round((R * c) * 10) / 10;
  }

  /**
   * Initial bearing in degrees (0-360) from point 1 to point 2
   */
  public static calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = Math.atan2(y, x);
    const bearing = (θ * 180 / Math.PI + 360) % 360;
    return Math.round(bearing);
  }

  /**
   * Convert degree bearing to 8-point compass direction
   */
  public static getCompassDirection(bearing: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  }

  /**
   * Evaluates a single CustomPin against active hazard datasets
   */
  public static evaluatePin(pin: CustomPin, datasets: ThreatEvaluationDatasets): PinThreatReport {
    const threats: PinThreat[] = [];

    // 1. Wildfire Detection
    if (datasets.wildfires && datasets.wildfires.length > 0) {
      datasets.wildfires.forEach((fire, idx) => {
        let fLat = 0;
        let fLon = 0;
        let title = 'Wildfire Thermal Anomaly';
        let desc = 'Satellite thermal detection active.';

        if (fire.geometry?.coordinates) {
          fLon = fire.geometry.coordinates[0];
          fLat = fire.geometry.coordinates[1];
        } else if (fire.lat != null && fire.lon != null) {
          fLat = fire.lat;
          fLon = fire.lon;
        } else {
          return;
        }

        if (fire.properties?.title || fire.properties?.name) {
          title = fire.properties.title || fire.properties.name;
        }
        if (fire.properties?.frp) {
          desc = `Thermal intensity: ${fire.properties.frp} MW. Active perimeter detection.`;
        }

        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, fLat, fLon);
        if (dist <= 35) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 5) severity = 'critical';
          else if (dist <= 15) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, fLat, fLon);
          threats.push({
            id: `fire-${idx}-${fire.id || idx}`,
            hazardType: 'fire',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Wildfire: ${title}`,
            description: `${desc} Located ${dist} miles ${this.getCompassDirection(bearing)} of pin.`,
            sourceId: String(fire.id || idx),
            checklistCategory: 'Wildfire Defense & Smoke Mitigation',
            protocols: [
              'Stage 96-hour bug-out pack and tactical emergency kit immediately.',
              'Don N95 or P100 particulate filtration masks; deploy smoke seal goggles.',
              'Clear 30-foot defensible perimeter around cache/structure; remove dry brush and combustible fuels.',
              'Inspect and seal water storage reservoirs; charge backup 12V well pump battery systems.',
              'Verify secondary evacuation route away from prevailing downwind perimeter vector.'
            ]
          });
        }
      });
    }

    // 2. Earthquake Detection
    if (datasets.earthquakes && datasets.earthquakes.length > 0) {
      datasets.earthquakes.forEach((eq, idx) => {
        let eLat = 0;
        let eLon = 0;
        let mag = 0;
        let place = 'Seismic Rupture';

        if (eq.geometry?.coordinates) {
          eLon = eq.geometry.coordinates[0];
          eLat = eq.geometry.coordinates[1];
        } else if (eq.lat != null && eq.lon != null) {
          eLat = eq.lat;
          eLon = eq.lon;
        } else {
          return;
        }

        if (eq.properties) {
          mag = Number(eq.properties.mag || 0);
          place = eq.properties.place || place;
        }

        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, eLat, eLon);
        let severity: ThreatSeverity | null = null;

        if ((mag >= 6.0 && dist <= 60) || (mag >= 4.5 && dist <= 25)) {
          severity = 'critical';
        } else if ((mag >= 4.0 && dist <= 50) || (mag >= 3.0 && dist <= 15)) {
          severity = 'warning';
        } else if (mag >= 3.0 && dist <= 40) {
          severity = 'advisory';
        }

        if (severity) {
          const bearing = this.calculateBearing(pin.lat, pin.lon, eLat, eLon);
          threats.push({
            id: `eq-${idx}-${eq.id || idx}`,
            hazardType: 'earthquake',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Seismic: M${mag.toFixed(1)} ${place}`,
            description: `Magnitude ${mag.toFixed(1)} earthquake recorded ${dist} miles ${this.getCompassDirection(bearing)} of pin.`,
            sourceId: String(eq.id || idx),
            checklistCategory: 'Seismic Structural & Infrastructure Defense',
            protocols: [
              'Isolate primary natural gas utility shutoff valve immediately; do NOT operate electrical switches or open flames.',
              'Assess structural stability of subterranean cache, bunker entrance, and structural foundations.',
              'Check rigid water storage containers and plumbing conduits for hydraulic fractures.',
              'Tune VHF/UHF tactical radio receiver to emergency monitoring channels; listen for aftershock advisories.',
              'Prepare slow-sand or 0.2-micron ceramic water filtration against seismic sediment disruption.'
            ]
          });
        }
      });
    }

    // 3. Flood & Dam Inundation Detection
    if (datasets.dams && datasets.dams.length > 0) {
      datasets.dams.forEach((dam) => {
        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, dam.lat, dam.lon);
        if (dist <= 35) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 8) severity = 'critical';
          else if (dist <= 20) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, dam.lat, dam.lon);
          threats.push({
            id: `dam-${dam.id}`,
            hazardType: 'flood',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Hydrological Threat: ${dam.name}`,
            description: `Major water retention structure located ${dist} miles ${this.getCompassDirection(bearing)}. Potential downstream breach corridor.`,
            sourceId: dam.id,
            checklistCategory: 'Hydrological Breach & Flood Defense',
            protocols: [
              'Elevate dry food supplies, electronics, and ammo minimum 4 feet above ground/floor elevation.',
              'Cap and seal domestic water well casing to prevent agricultural/sewage runoff contamination.',
              'Prepare bailer and hand-pump salvage gear if subterranean cache or basement is inundated.',
              'Execute high-ground retreat plan using pre-charted ridge waypoints; avoid low-lying culverts.',
              'Stage chlorine HTH or 8.25% sodium hypochlorite for post-flood well water shock chlorination.'
            ]
          });
        }
      });
    }

    // 4. Chemical Activity, Sprays & Toxic Sites Detection
    // 4a. Chemical Spraying Incidents
    if (datasets.chemicalSprays && datasets.chemicalSprays.length > 0) {
      datasets.chemicalSprays.forEach((spray) => {
        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, spray.lat, spray.lon);
        const radius = spray.bufferRadiusMiles || 15;
        if (dist <= radius) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 3) severity = 'critical';
          else if (dist <= 10) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, spray.lat, spray.lon);
          threats.push({
            id: `spray-${spray.id}`,
            hazardType: 'chemical',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Chemical Application: ${spray.chemicalName}`,
            description: `Active or planned chemical spraying zone located ${dist} miles ${this.getCompassDirection(bearing)} of pin.`,
            sourceId: spray.id,
            checklistCategory: 'Chemical Agent Defense & In-Place Shelter',
            protocols: [
              'Initiate SIRQ Protocol: Safety, Isolation, Reverse isolation, and Quarantine.',
              'Shut down HVAC systems, attic fans, and outside air intakes immediately.',
              'Deploy 4-mil polyethylene sheeting and 2-inch duct tape to seal doors, windows, and vents (1-hr safe room).',
              'Don multi-gas respirators with activated charcoal and P100 organic vapor filters.',
              'If outdoor transit is required, execute 90-degree crosswind evasion to escape downwind toxic plume corridor.'
            ]
          });
        }
      });
    }

    // 4b. Toxic Superfund / Industrial Sites
    if (datasets.toxicSites && datasets.toxicSites.length > 0) {
      datasets.toxicSites.forEach((site, idx) => {
        let sLat = 0;
        let sLon = 0;
        let name = 'Industrial Toxic Facility';
        let desc = 'Hazardous material storage.';

        if (site.geometry?.coordinates) {
          sLon = site.geometry.coordinates[0];
          sLat = site.geometry.coordinates[1];
        } else if (site.lat != null && site.lon != null) {
          sLat = site.lat;
          sLon = site.lon;
        } else {
          return;
        }

        if (site.properties?.name || site.properties?.site_name) {
          name = site.properties.name || site.properties.site_name;
        }
        if (site.properties?.hazard || site.properties?.status) {
          desc = `Contaminant status: ${site.properties.hazard || site.properties.status}`;
        }

        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, sLat, sLon);
        if (dist <= 25) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 3) severity = 'critical';
          else if (dist <= 10) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, sLat, sLon);
          threats.push({
            id: `toxic-${idx}-${site.id || idx}`,
            hazardType: 'chemical',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Toxic Industrial Site: ${name}`,
            description: `${desc} Located ${dist} miles ${this.getCompassDirection(bearing)} of pin.`,
            sourceId: String(site.id || idx),
            checklistCategory: 'Chemical & Industrial Hazardous Release Protocol',
            protocols: [
              'Verify reverse-osmosis and activated-carbon water purification readiness.',
              'Monitor groundwater well samples for chemical leachate or volatile organic compounds (VOCs).',
              'Seal food storage containers in airtight Mylar or food-grade HDPE barrels to prevent vapor contamination.',
              'Stage chemical neutralization compounds (sodium bicarbonate, dilute vinegar) for decontamination.',
              'Establish emergency perimeter cordon and prepare upwind evacuation corridor.'
            ]
          });
        }
      });
    }

    // 5. Radiation / Nuclear Detection
    if (datasets.radiationSensors && datasets.radiationSensors.length > 0) {
      datasets.radiationSensors.forEach((rad) => {
        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, rad.lat, rad.lon);
        if (dist <= 30 && (rad.isAlert || (rad.cpm && rad.cpm > 50))) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 10 || (rad.cpm && rad.cpm > 100)) severity = 'critical';
          else if (dist <= 20) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, rad.lat, rad.lon);
          threats.push({
            id: `rad-${rad.id}`,
            hazardType: 'radiation',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Radiation Anomaly: ${rad.name}`,
            description: `Elevated radiation reading (${rad.cpm || 'Alert'} CPM) detected ${dist} miles ${this.getCompassDirection(bearing)}.`,
            sourceId: rad.id,
            checklistCategory: 'Radiological Defense & Fallout Shelter Protocol',
            protocols: [
              'Enact Potassium Iodide (KI) dosage protocol (Adult 130mg, Child 65mg) within 2-4 hours of exposure.',
              'Seek shelter providing minimum 18 inches of packed earth or 12 inches of solid concrete (Half-Value Layer shielding).',
              'Apply 7/10 Rule for radiological decay tracking (every 7-fold increase in time reduces radiation dose 10-fold).',
              'Seal clothing and contaminated outer footwear in heavy contractor bags outside living area.',
              'Decontaminate skin with cold water and mild soap; avoid hot water to prevent opening dermal pores.'
            ]
          });
        }
      });
    }

    // 6. Severe Storms & Weather Hazards
    if (datasets.weatherCells && datasets.weatherCells.length > 0) {
      datasets.weatherCells.forEach((cell, idx) => {
        let wLat = 0;
        let wLon = 0;
        let type = 'Severe Weather Cell';

        if (cell.geometry?.coordinates) {
          wLon = cell.geometry.coordinates[0];
          wLat = cell.geometry.coordinates[1];
        } else if (cell.lat != null && cell.lon != null) {
          wLat = cell.lat;
          wLon = cell.lon;
        } else {
          return;
        }

        if (cell.properties?.headline || cell.properties?.event) {
          type = cell.properties.headline || cell.properties.event;
        }

        const dist = this.calculateDistanceMiles(pin.lat, pin.lon, wLat, wLon);
        if (dist <= 25) {
          let severity: ThreatSeverity = 'advisory';
          if (dist <= 10) severity = 'warning';

          const bearing = this.calculateBearing(pin.lat, pin.lon, wLat, wLon);
          threats.push({
            id: `storm-${idx}`,
            hazardType: 'weather',
            severity,
            distanceMiles: dist,
            bearingDegrees: bearing,
            compassDirection: this.getCompassDirection(bearing),
            title: `Weather Alert: ${type}`,
            description: `Severe atmospheric cell active ${dist} miles ${this.getCompassDirection(bearing)} of pin.`,
            sourceId: String(idx),
            checklistCategory: 'Severe Weather & Storm Hardening Protocol',
            protocols: [
              'Secure external solar panels, communications antennas, and perimeter equipment.',
              'Top off battery storage banks and ensure emergency generators have stabilized fuel reserves.',
              'Disconnect sensitive transceiver electronics from antenna leads to prevent induced EMP/lightning surges.',
              'Inspect drainage culverts and clear debris around structural foundations.',
              'Stage emergency non-electric illumination and secondary communications radios.'
            ]
          });
        }
      });
    }

    // Sort threats: Critical first, then Warning, then Advisory, then ascending distance
    const severityScore: Record<ThreatSeverity, number> = { critical: 3, warning: 2, advisory: 1 };
    threats.sort((a, b) => {
      if (severityScore[a.severity] !== severityScore[b.severity]) {
        return severityScore[b.severity] - severityScore[a.severity];
      }
      return a.distanceMiles - b.distanceMiles;
    });

    // Determine overall pin status
    let overallStatus: OverallPinStatus = 'clear';
    if (threats.some((t) => t.severity === 'critical')) {
      overallStatus = 'critical';
    } else if (threats.some((t) => t.severity === 'warning')) {
      overallStatus = 'warning';
    } else if (threats.some((t) => t.severity === 'advisory')) {
      overallStatus = 'advisory';
    }

    return {
      pinId: pin.id,
      pinLabel: pin.label,
      pinCategory: pin.category || 'Waypoint',
      lat: pin.lat,
      lon: pin.lon,
      overallStatus,
      threats,
      evaluatedAt: new Date().toISOString()
    };
  }

  /**
   * Evaluates all pins and returns a threat radar summary
   */
  public static evaluateAllPins(pins: CustomPin[], datasets: ThreatEvaluationDatasets): ThreatRadarSummary {
    const reports = pins.map((p) => this.evaluatePin(p, datasets));
    let threatenedPins = 0;
    let criticalPins = 0;
    let warningPins = 0;
    let advisoryPins = 0;
    let clearPins = 0;

    reports.forEach((rep) => {
      if (rep.overallStatus === 'critical') {
        criticalPins++;
        threatenedPins++;
      } else if (rep.overallStatus === 'warning') {
        warningPins++;
        threatenedPins++;
      } else if (rep.overallStatus === 'advisory') {
        advisoryPins++;
        threatenedPins++;
      } else {
        clearPins++;
      }
    });

    return {
      totalPins: pins.length,
      threatenedPins,
      criticalPins,
      warningPins,
      advisoryPins,
      clearPins,
      reports
    };
  }
}
