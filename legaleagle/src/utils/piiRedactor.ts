/**
 * PII Redactor Utility
 * 
 * Intercepts text before sending to LLM APIs and redacts Personally Identifiable Information.
 */

const PII_PATTERNS = {
    EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    PHONE: /(?:\+\d{1,3}[- ]?)?\(?\d{3}\)?[- .]?\d{3}[- .]?\d{4}/g,
    SSN: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
};

export const redactPII = (text: string): { redactedText: string; mapping: Record<string, string> } => {
    let redactedText = text;
    const mapping: Record<string, string> = {};
    let counter = 1;

    const replacePattern = (pattern: RegExp, placeholderPrefix: string) => {
        redactedText = redactedText.replace(pattern, (match) => {
            const placeholder = `[${placeholderPrefix}_${counter++}]`;
            mapping[placeholder] = match;
            return placeholder;
        });
    };

    replacePattern(PII_PATTERNS.EMAIL, 'EMAIL');
    replacePattern(PII_PATTERNS.PHONE, 'PHONE');
    replacePattern(PII_PATTERNS.SSN, 'SSN');

    return { redactedText, mapping };
};

export const restorePII = (redactedText: string, mapping: Record<string, string>): string => {
    let restoredText = redactedText;
    for (const [placeholder, original] of Object.entries(mapping)) {
        // Escape brackets for Regex
        const regex = new RegExp(placeholder.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g');
        restoredText = restoredText.replace(regex, original);
    }
    return restoredText;
};
