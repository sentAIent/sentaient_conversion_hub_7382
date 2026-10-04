const { onRequest } = require("firebase-functions/v2/https");

/**
 * CSP Violation Report Endpoint
 * Logs Content Security Policy violations to Firebase Functions logs.
 */
exports.cspReport = onRequest({ cors: true }, (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        // CSP reports are sent as application/csp-report
        let report;
        if (req.body && typeof req.body === 'object') {
            report = req.body['csp-report'] || req.body;
        } else {
            // If body-parser didn't parse it automatically
            report = JSON.parse(req.rawBody.toString());
            report = report['csp-report'] || report;
        }

        console.warn('[CSP VIOLATION]', JSON.stringify(report, null, 2));

        // Always return 204 No Content for report-uri endpoints
        res.status(204).send();
    } catch (err) {
        console.error('Error parsing CSP report:', err);
        res.status(400).send('Bad Request');
    }
});
