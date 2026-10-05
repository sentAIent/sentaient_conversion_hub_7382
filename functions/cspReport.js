/**
 * CSP Violation Reporting Endpoint
 * 
 * Ingests Content Security Policy violation reports sent by the browser.
 * This allows us to know when a third-party script gets hijacked or an XSS attempt occurs.
 */

/**
 * Express/Cloud Function handler to receive CSP reports.
 */
exports.reportCspViolation = (req, res) => {
  if (req.body) {
    console.warn('[Security] CSP Violation Detected:', JSON.stringify(req.body, null, 2));
    
    // In production, send this to Datadog, Sentry, or Slack
    // logToSecurityDashboard(req.body);
  } else {
    console.warn('[Security] CSP Violation endpoint hit, but no body provided.');
  }

  // Always return 204 No Content for reports
  res.status(204).end();
};
