export class PiiRedactor {
  // Regex patterns for common PII
  private static patterns = [
    // SSN
    { regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g, replacement: '[REDACTED_SSN]' },
    // Credit Cards
    { regex: /\b(?:\d[ -]*?){13,16}\b/g, replacement: '[REDACTED_CARD]' },
    // Emails
    { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: '[REDACTED_EMAIL]' },
    // Phone numbers (US simplified)
    { regex: /\b(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/g, replacement: '[REDACTED_PHONE]' }
  ];

  /**
   * Scans text and replaces any matching PII with a placeholder
   */
  static redact(text: string): string {
    if (!text) return text;
    let redacted = text;
    for (const { regex, replacement } of this.patterns) {
      redacted = redacted.replace(regex, replacement);
    }
    return redacted;
  }

  /**
   * Recursively redact an object
   */
  static redactObject(obj: any): any {
    if (typeof obj === 'string') {
      return this.redact(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.redactObject(item));
    }
    if (typeof obj === 'object' && obj !== null) {
      const redactedObj: Record<string, any> = {};
      for (const [key, value] of Object.entries(obj)) {
        // Redact specific keys regardless of value
        if (key.toLowerCase().includes('ssn') || key.toLowerCase().includes('password')) {
          redactedObj[key] = '[REDACTED]';
        } else {
          redactedObj[key] = this.redactObject(value);
        }
      }
      return redactedObj;
    }
    return obj;
  }
}
