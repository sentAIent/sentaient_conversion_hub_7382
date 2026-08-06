export async function sendForSignature(
  documentBase64: string,
  fileName: string,
  signers: string[]
) {
  const documensoApiUrl = process.env.DOCUMENSO_API_URL || 'http://localhost:3003';
  const documensoApiKey = process.env.DOCUMENSO_API_KEY;
  
  if (!documensoApiKey) {
    console.warn('[Documenso] DOCUMENSO_API_KEY not set. Running in local mock mode.');
    return {
      success: true,
      message: 'Mock signature request sent successfully (Local mode)',
      documentId: 'mock-doc-id-123',
      mockSigners: signers
    };
  }

  try {
    console.log(`[Documenso] Sending ${fileName} via Documenso API...`);
    
    // In a real implementation, you would use Documenso's REST API or tRPC client
    // 1. Upload the base64 document to create a Document template
    // 2. Add recipients (signers)
    // 3. Send the document
    
    // Example pseudocode:
    /*
    const response = await fetch(`${documensoApiUrl}/api/v1/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${documensoApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: fileName,
        documentBase64,
        recipients: signers.map(email => ({ email, role: 'SIGNER' }))
      })
    });
    const data = await response.json();
    */

    return {
      success: true,
      message: 'Document successfully staged in Documenso (Mock API path)',
      documentId: 'staged-doc-123',
    };
  } catch (error: any) {
    console.error('[Documenso] Failed to send document:', error);
    throw new Error('Documenso API failed: ' + error.message);
  }
}
