/**
 * Data Loss Prevention (DLP) Utility
 * 
 * Redacts Personally Identifiable Information (PII) before it gets sent to external
 * APIs, like OpenAI, or stored in logs.
 */

const PII_PATTERNS = [
  {
    type: 'EMAIL',
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    replacement: '[REDACTED_EMAIL]'
  },
  {
    type: 'PHONE',
    // Basic US/International phone matcher
    regex: /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    replacement: '[REDACTED_PHONE]'
  },
  {
    type: 'SSN',
    // US Social Security Number
    regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    replacement: '[REDACTED_SSN]'
  },
  {
    type: 'CREDIT_CARD',
    // Basic CC pattern (not Luhn validated here, just pattern matched)
    regex: /\b(?:\d[ -]*?){13,16}\b/g,
    replacement: '[REDACTED_CC]'
  }
];

/**
 * Scans a string and replaces known PII patterns with redaction tags.
 * @param {string} text - The input text to redact
 * @returns {string} The redacted text
 */
export function redactPII(text) {
  if (typeof text !== 'string') return text;
  
  let redacted = text;
  for (const pattern of PII_PATTERNS) {
    redacted = redacted.replace(pattern.regex, pattern.replacement);
  }
  
  return redacted;
}

/**
 * Recursively scans an object and redacts PII from all string values.
 * Useful for redacting JSON payloads before logging.
 * @param {Object} obj - The object to redact
 * @returns {Object} A deep copy of the object with PII redacted
 */
export function redactObject(obj) {
  if (obj === null || obj === undefined) return obj;
  
  if (typeof obj === 'string') {
    return redactPII(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => redactObject(item));
  }
  
  if (typeof obj === 'object') {
    const redactedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      // Don't redact keys like 'email' if they are meant to hold actual email addresses 
      // in authorized database writes, but DO redact for logs.
      // Assuming this is used primarily for logging/AI:
      redactedObj[key] = redactObject(value);
    }
    return redactedObj;
  }
  
  return obj;
}
