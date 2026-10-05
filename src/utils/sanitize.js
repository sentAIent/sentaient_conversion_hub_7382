import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Should be used whenever rendering user-generated content or 3rd-party HTML via dangerouslySetInnerHTML.
 *
 * @param {string} dirtyHtml - The untrusted HTML string.
 * @returns {string} - The sanitized, safe HTML string.
 */
export const sanitizeHtml = (dirtyHtml) => {
  if (typeof dirtyHtml !== 'string') {
    return '';
  }
  
  // Use DOMPurify's default configuration, which strips out script tags, malicious event handlers, etc.
  // Add specific allowed tags/attributes if needed in the future.
  return DOMPurify.sanitize(dirtyHtml, {
    USE_PROFILES: { html: true }, // strict HTML profile
  });
};

/**
 * Strips all HTML tags and returns only text.
 */
export const stripHtml = (dirtyHtml) => {
  if (typeof dirtyHtml !== 'string') {
    return '';
  }
  return DOMPurify.sanitize(dirtyHtml, { ALLOWED_TAGS: [] });
};
