import React, { useState, useRef } from 'react';
import { FileText, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from '../contexts/AuthContext';

export default function ReportGeneratorModal({ onClose }) {
  const { user } = useAuth();
  const [reportType, setReportType] = useState('SOC2');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const reportRef = useRef(null);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8001/compile-report-data?company_id=${user.id}`);
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching report data');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    
    // Hide UI elements during print
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`LightSpeed_${reportType}_Report.pdf`);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', color: '#000', width: '800px', height: '90vh', overflowY: 'auto', borderRadius: '8px', position: 'relative' }}>
        
        {/* Controls Toolbar */}
        <div style={{ position: 'sticky', top: 0, background: '#f5f5f5', padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 10 }}>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="SOC2">SOC2 Type II Compliance</option>
            <option value="HIPAA">HIPAA Compliance</option>
            <option value="GDPR">GDPR Data Privacy</option>
          </select>
          <button onClick={fetchReportData} disabled={loading} style={{ padding: '0.5rem 1rem', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Compiling...' : 'Generate Preview'}
          </button>
          
          {reportData && (
            <>
              <button onClick={handleDownload} style={{ padding: '0.5rem 1rem', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Download Official PDF
              </button>
              <button onClick={async () => {
                await fetch('http://localhost:8001/transmit-legal-eagle', { method: 'POST' });
                alert('Report securely transmitted to Legal Eagle portal.');
              }} style={{ padding: '0.5rem 1rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Transmit to Legal Eagle
              </button>
            </>
          )}

          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid #ccc', padding: '0.5rem 1rem', cursor: 'pointer' }}>Close</button>
        </div>

        {/* PDF Rendering Canvas */}
        <div ref={reportRef} style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
          {reportData ? (
            <>
              <h1 style={{ borderBottom: '2px solid #0066cc', paddingBottom: '10px' }}>LightSpeed Security: {reportType} Report</h1>
              <p><strong>Date:</strong> {reportData.report_date}</p>
              <p><strong>Company ID:</strong> {reportData.company_id}</p>

              <h2 style={{ marginTop: '30px' }}>Executive Summary</h2>
              <p style={{ lineHeight: '1.6' }}>{reportData.executive_summary}</p>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '15px', background: '#f8f9fa', borderLeft: '4px solid #ff4444' }}>
                  <h3>Open Tasks</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{reportData.open_tasks}</p>
                </div>
                <div style={{ padding: '15px', background: '#f8f9fa', borderLeft: '4px solid #ff9900' }}>
                  <h3>Recent Alerts</h3>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{reportData.recent_alerts}</p>
                </div>
              </div>

              <h2 style={{ marginTop: '30px' }}>Control Status Matrix</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr style={{ background: '#eee', textAlign: 'left' }}>
                    <th style={{ padding: '10px', border: '1px solid #ccc' }}>Control ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
                    <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.controls.map((c, i) => (
                    <tr key={i}>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{c.id}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{c.name}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc', color: c.status === 'Passed' ? 'green' : 'red' }}>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #ccc', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                Generated autonomously by Sentinel • LightSpeed Security Operations
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: '#999', marginTop: '100px' }}>
              <FileText size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
              <h2>Ready to Compile</h2>
              <p>Select a framework above and generate the preview.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
