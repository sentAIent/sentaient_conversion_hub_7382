import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const DATA_FILE = path.resolve(process.cwd(), 'public/data/community_reports_store.json');

interface StoredReport {
  id: string;
  type: string;
  category_label: string;
  name: string;
  coordinates: [number, number];
  reportedBy: string;
  reporters: string[];
  confirmationsCount: number;
  consensusThreshold: number;
  status: 'pending_consensus' | 'verified_system' | 'decommission_pending' | 'removed_verified';
  details: any;
  createdAt: string;
  updatedAt: string;
  promotedToSystemAt?: string;
}

function loadStoredReports(): StoredReport[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial: StoredReport[] = [
        {
          id: 'rep-camera-seed-01',
          type: 'camera',
          category_label: 'Surveillance / FLOCK',
          name: 'Flock Safety Falcon ALPR #941 (Austin Verified)',
          coordinates: [-97.7461, 30.2588],
          reportedBy: 'dev_austin_watchdog',
          reporters: ['dev_austin_watchdog', 'dev_osint_auditor_02', 'dev_civil_rights_atx'],
          confirmationsCount: 3,
          consensusThreshold: 3,
          status: 'verified_system',
          details: {
            vendor: 'flock',
            vendor_display: 'Flock Safety',
            model: 'Falcon v2 ALPR',
            camera_type: 'ALPR',
            operational_status: 'Active',
            direction: 180,
            install_date: '2023-04-10',
            mount_type: 'Solar Pole Mount',
            sharing_network: 'TALON Regional Network',
            notes: 'Verified municipal intersection deployment with solar mast'
          },
          createdAt: '2023-04-12T10:00:00.000Z',
          updatedAt: '2023-04-15T14:20:00.000Z',
          promotedToSystemAt: '2023-04-15T14:20:00.000Z'
        },
        {
          id: 'rep-camera-seed-removed-01',
          type: 'camera',
          category_label: 'Removed SURVEILLANCE',
          name: 'Flock Safety Falcon ALPR [REMOVED - Austin Council Ordinance]',
          coordinates: [-97.7428, 30.2632],
          reportedBy: 'dev_austin_clerk',
          reporters: ['dev_austin_clerk', 'dev_privacy_audit', 'dev_atx_citizen'],
          confirmationsCount: 3,
          consensusThreshold: 3,
          status: 'removed_verified',
          details: {
            vendor: 'flock',
            vendor_display: 'Flock Safety',
            model: 'Falcon v2 ALPR',
            camera_type: 'ALPR',
            operational_status: 'Removed',
            direction: 90,
            install_date: '2022-06-14',
            removal_date: '2024-03-12',
            removal_reason: 'City Council Resolution / Automated Tracking Audit Non-Renewal',
            notes: 'Physical camera decommissioned from utility pole following city privacy directive'
          },
          createdAt: '2024-03-12T18:00:00.000Z',
          updatedAt: '2024-03-14T09:30:00.000Z',
          promotedToSystemAt: '2024-03-14T09:30:00.000Z'
        }
      ];
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('[Sphinx Reports API] Error loading reports store:', e);
    return [];
  }
}

function saveStoredReports(reports: StoredReport[]) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2), 'utf8');
  } catch (e) {
    console.error('[Sphinx Reports API] Error writing reports store:', e);
  }
}

export async function GET(req: NextRequest) {
  const reports = loadStoredReports();
  const searchParams = req.nextUrl.searchParams;
  const statusFilter = searchParams.get('status');

  let result = reports;
  if (statusFilter === 'verified') {
    result = reports.filter(r => r.status === 'verified_system' || r.status === 'removed_verified');
  } else if (statusFilter === 'pending') {
    result = reports.filter(r => r.status === 'pending_consensus' || r.status === 'decommission_pending');
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    reports: result
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: StoredReport = await req.json();
    if (!body || !body.coordinates || !body.type) {
      return NextResponse.json({ error: 'Missing coordinates or report type' }, { status: 400 });
    }

    const reports = loadStoredReports();
    const existingIdx = reports.findIndex(r => r.id === body.id);

    if (existingIdx >= 0) {
      reports[existingIdx] = {
        ...reports[existingIdx],
        ...body,
        updatedAt: new Date().toISOString()
      };
    } else {
      reports.push({
        ...body,
        createdAt: body.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    saveStoredReports(reports);

    return NextResponse.json({
      success: true,
      report: existingIdx >= 0 ? reports[existingIdx] : body
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
