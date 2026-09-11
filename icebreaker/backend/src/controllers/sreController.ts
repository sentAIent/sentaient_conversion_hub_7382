import { Request, Response } from 'express';
// Assuming DLP utility is copied or imported from a shared package; we inline a simple version for standalone backend execution
import * as Sentry from '@sentry/node';

const PII_PATTERNS = [
  { type: 'EMAIL', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replacement: '[REDACTED_EMAIL]' },
  { type: 'SSN', regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g, replacement: '[REDACTED_SSN]' },
  { type: 'CREDIT_CARD', regex: /\b(?:\d[ -]*?){13,16}\b/g, replacement: '[REDACTED_CC]' }
];

function sanitizeLogText(text: string): string {
  if (!text) return text;
  let redacted = text;
  for (const pattern of PII_PATTERNS) {
    redacted = redacted.replace(pattern.regex, pattern.replacement);
  }
  return redacted;
}

/**
 * Controller to ingest crash reports and logs from Mobile/Web clients.
 * Redacts PII before sending the payload to Sentry and optionally storing it.
 */
export const ingestCrashReport = async (req: Request, res: Response) => {
  try {
    const { errorName, errorMessage, stackTrace, platform, context } = req.body;

    // Redact PII from the stack trace and message
    const sanitizedMessage = sanitizeLogText(errorMessage || 'Unknown Error');
    const sanitizedStack = sanitizeLogText(stackTrace || '');
    const sanitizedContext = sanitizeLogText(JSON.stringify(context || {}));

    // Send to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('platform', platform);
      scope.setExtra('context', JSON.parse(sanitizedContext));
      scope.setExtra('stackTrace', sanitizedStack);
      
      const error = new Error(sanitizedMessage);
      error.name = errorName || 'ClientCrash';
      
      Sentry.captureException(error);
    });

    console.log(`[SRE Ingest] Logged crash from ${platform}: ${sanitizedMessage}`);
    
    return res.status(200).json({ success: true, message: 'Crash report ingested securely.' });
  } catch (error) {
    console.error('[SRE Ingest Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to ingest crash report.' });
  }
};
