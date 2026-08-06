import { NextResponse } from 'next/server';
import { generatePDFFromHTML } from '@/lib/pdfClient';

export async function POST(request: Request) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    // Wrap the HTML with basic print styling
    const printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { margin: 0; padding: 20px; }
            .print-hide { display: none !important; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        </style>
      </head>
      <body class="bg-white">
        ${html}
      </body>
      </html>
    `;

    // Generate the PDF Buffer
    const pdfBuffer = await generatePDFFromHTML(printHtml);

    // Return it as a downloadable file
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Invoice.pdf"',
      },
    });

  } catch (error: any) {
    console.error('[PDF API] Error generating PDF:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate PDF' }, { status: 500 });
  }
}
