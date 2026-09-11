/**
 * Data Loss Prevention (DLP) Utility
 * 
 * Scans strings and objects to redact PII (Emails, Phone Numbers, SSNs, Credit Cards)
 * before transmission to external services (like AI inference or logging endpoints).
 */

const PII_PATTERNS = [
  {
    type: 'EMAIL',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    replacement: '[REDACTED_EMAIL]'
  },
  {
    type: 'PHONE',
    regex: /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    replacement: '[REDACTED_PHONE]'
  },
  {
    type: 'SSN',
    regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    replacement: '[REDACTED_SSN]'
  },
  {
    type: 'CREDIT_CARD',
    regex: /\b(?:\d[ -]*?){13,16}\b/g,
    replacement: '[REDACTED_CC]'
  }
];

/**
 * Scans a string and redacts matched PII.
 */
export function redactPII(text: string): string {
  if (!text || typeof text !== 'string') return text;
  
  let redacted = text;
  for (const pattern of PII_PATTERNS) {
    redacted = redacted.replace(pattern.regex, pattern.replacement);
  }
  return redacted;
}

/**
 * Recursively scans an object and redacts PII from string values.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function redactObject(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return redactPII(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => redactObject(item));
  }
  
  if (typeof obj === 'object') {
    const redactedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      redactedObj[key] = redactObject(value);
    }
    return redactedObj;
  }
  
  return obj;
}
