export async function generatePDFFromHTML(htmlContent: string): Promise<Buffer> {
  const useGotenberg = process.env.USE_GOTENBERG === 'true';

  if (useGotenberg) {
    // Advanced: Gotenberg (Cloud Profile)
    // Here we would implement the call to Gotenberg API
    // e.g., fetching http://gotenberg:3000/forms/chromium/convert/html
    console.log('[PDF Engine] Using Gotenberg for PDF generation');
    
    // For now, return a placeholder or implement actual fetch if needed
    // const formData = new FormData();
    // formData.append('files', new Blob([htmlContent], { type: 'text/html' }), 'index.html');
    // const response = await fetch('http://localhost:3001/forms/chromium/convert/html', { method: 'POST', body: formData });
    // return Buffer.from(await response.arrayBuffer());
    
    throw new Error("Gotenberg integration not fully implemented yet");
  } else {
    // Lean: Stirling-PDF (Local Profile)
    console.log('[PDF Engine] Using Stirling-PDF for PDF generation');
    
    // Call Stirling PDF API for HTML to PDF
    // Endpoint: /api/v1/convert/html/pdf
    // Requires multipart/form-data with fileInput
    
    // Since we're in node, we use FormData from undici or built-in in Node 18+
    const formData = new FormData();
    formData.append('fileInput', new Blob([htmlContent], { type: 'text/html' }), 'index.html');
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/convert/html/pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Stirling-PDF conversion failed: ${response.statusText}`);
      }
      
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      console.error('[PDF Engine] Stirling-PDF error:', error);
      throw error;
    }
  }
}
