import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import MassiveDataTable from '../components/MassiveDataTable';
import ConversionHeatmap from '../components/ConversionHeatmap';
import { VisualAuditor } from '../services/visualAuditor';

// --- MOCKS ---

// Mock AG-Grid to avoid complex DOM rendering issues in JSDOM
vi.mock('ag-grid-react', () => ({
    AgGridReact: ({ rowData }) => (
        <div data-testid="mock-ag-grid">
            Mocked Grid with {rowData?.length || 0} rows
        </div>
    )
}));

// Mock Turf.js for deterministic spatial tests
vi.mock('@turf/turf', () => ({
    featureCollection: vi.fn((f) => ({ features: f })),
    point: vi.fn((coords, props) => ({ geometry: { coordinates: coords }, properties: props })),
    centerOfMass: vi.fn(() => ({ geometry: { coordinates: [-73.98, 40.75] } })),
    circle: vi.fn(),
    pointsWithinPolygon: vi.fn(() => ({ features: [1, 2] }))
}));

// Mock Playwright for Visual Auditor
vi.mock('playwright', () => ({
    chromium: {
        launch: vi.fn().mockResolvedValue({
            newPage: vi.fn().mockResolvedValue({
                goto: vi.fn().mockResolvedValue(true),
                screenshot: vi.fn().mockResolvedValue(Buffer.from('mock-base64-image'))
            }),
            close: vi.fn().mockResolvedValue(true)
        })
    }
}));

// --- TESTS ---

describe('Advanced Modalities Integrations', () => {

    describe('MassiveDataTable.jsx', () => {
        it('renders the AG-Grid component with default mock data', () => {
            render(<MassiveDataTable />);
            
            // Check header
            expect(screen.getByText('Data Lake Viewer (AG-Grid)')).toBeInTheDocument();
            
            // Check if mock grid rendered the default 3 rows
            expect(screen.getByTestId('mock-ag-grid')).toHaveTextContent('Mocked Grid with 3 rows');
        });

        it('renders with custom row data', () => {
            const customData = [{ id: '1', platform: 'TikTok' }];
            render(<MassiveDataTable rowData={customData} />);
            
            expect(screen.getByTestId('mock-ag-grid')).toHaveTextContent('Mocked Grid with 1 rows');
        });
    });

    describe('ConversionHeatmap.jsx (Turf.js)', () => {
        it('renders spatial analysis results automatically', () => {
            render(<ConversionHeatmap geoJsonData={null} />);
            
            // Should display the mocked center of mass coordinates
            expect(screen.getByText(/Geospatial Analytics/i)).toBeInTheDocument();
            expect(screen.getByText(/-73.98, 40.75/i)).toBeInTheDocument(); // Center of mass
            expect(screen.getByText('2')).toBeInTheDocument(); // Mocked points near NYC
        });
    });

    describe('VisualAuditor.js (Playwright)', () => {
        it('successfully launches browser and returns audit result', async () => {
            const result = await VisualAuditor.auditLandingPage('https://example.com');
            
            expect(result.url).toBe('https://example.com');
            expect(result.status).toBe('success');
            expect(result.analysis).toContain('The primary CTA is below the fold');
        });
    });

});
