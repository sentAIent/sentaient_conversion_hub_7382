// cotXmlEngine.ts
// Cursor-on-Target (CoT) XML & MIL-STD-2525C Tactical Interoperability Engine
// Supports ATAK, WinTAK, and iTAK packet generation and parsing

export interface CotEventPoint {
  uid: string;
  callsign: string;
  type: string; // MIL-STD-2525 e.g. "a-f-G-U-C" (friendly ground unit), "a-h-G" (hostile ground), "b-m-p-w" (waypoint)
  lat: number;
  lon: number;
  haeMeters?: number; // Height Above Ellipsoid
  remarks?: string;
  time?: string;
  staleMinutes?: number;
}

export class CotXmlEngine {
  /**
   * Generates a single Cursor-on-Target XML event string.
   */
  public static generateCotXml(point: CotEventPoint): string {
    const now = new Date();
    const timeIso = point.time || now.toISOString();
    const staleTime = new Date(now.getTime() + (point.staleMinutes || 60) * 60000).toISOString();
    const hae = point.haeMeters !== undefined ? point.haeMeters.toFixed(1) : '0.0';

    return `<?xml version="1.0" standalone="yes"?>
<event version="2.0" uid="${point.uid}" type="${point.type}" time="${timeIso}" start="${timeIso}" stale="${staleTime}" how="m-g">
  <point lat="${point.lat.toFixed(6)}" lon="${point.lon.toFixed(6)}" hae="${hae}" ce="10.0" le="10.0" />
  <detail>
    <contact callsign="${point.callsign}" />
    <remarks>${point.remarks || 'Sphinx Tactical OSINT Node'}</remarks>
  </detail>
</event>`;
  }

  /**
   * Generates an ATAK mission package CoT bundle containing multiple tactical entities.
   */
  public static generateCotBundleXml(points: CotEventPoint[]): string {
    const events = points.map(p => this.generateCotXml(p)).join('\n');
    return `<!-- SPHINX ATAK CURSOR-ON-TARGET BUNDLE -->\n${events}`;
  }

  /**
   * Parses inbound CoT XML string into array of CotEventPoints.
   */
  public static parseCotXml(xmlString: string): CotEventPoint[] {
    const points: CotEventPoint[] = [];
    if (!xmlString) return points;

    // Regex extraction to remain 100% lightweight without external DOMParser dependency issues
    const eventRegex = /<event\s+([^>]+)>([\s\S]*?)<\/event>/gi;
    let eventMatch: RegExpExecArray | null;

    while ((eventMatch = eventRegex.exec(xmlString)) !== null) {
      const eventAttrs = eventMatch[1];
      const eventBody = eventMatch[2];

      const uid = this.extractAttr(eventAttrs, 'uid') || `cot-${Date.now()}`;
      const type = this.extractAttr(eventAttrs, 'type') || 'a-u-G';

      // Parse <point>
      const pointMatch = /<point\s+([^>]+)\/?>/i.exec(eventBody);
      if (!pointMatch) continue;

      const latStr = this.extractAttr(pointMatch[1], 'lat');
      const lonStr = this.extractAttr(pointMatch[1], 'lon');
      const haeStr = this.extractAttr(pointMatch[1], 'hae');

      if (!latStr || !lonStr) continue;

      // Parse <contact> callsign
      const contactMatch = /<contact\s+([^>]+)\/?>/i.exec(eventBody);
      const callsign = contactMatch ? this.extractAttr(contactMatch[1], 'callsign') || uid : uid;

      // Parse <remarks>
      const remarksMatch = /<remarks>([\s\S]*?)<\/remarks>/i.exec(eventBody);
      const remarks = remarksMatch ? remarksMatch[1].trim() : '';

      points.push({
        uid,
        callsign,
        type,
        lat: parseFloat(latStr),
        lon: parseFloat(lonStr),
        haeMeters: haeStr ? parseFloat(haeStr) : 0,
        remarks
      });
    }

    return points;
  }

  private static extractAttr(attrString: string, attrName: string): string | null {
    const r = new RegExp(`${attrName}=["']([^"']+)["']`, 'i');
    const m = r.exec(attrString);
    return m ? m[1] : null;
  }
}
