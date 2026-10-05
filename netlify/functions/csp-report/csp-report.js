exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const report = JSON.parse(event.body);
            console.log('CSP Violation Report:', JSON.stringify(report, null, 2));
            // In a production environment, this would be logged to Sentry or Datadog
        } catch (e) {
            console.error('Failed to parse CSP report', e);
        }
    }
    
    return {
        statusCode: 204,
        body: ''
    };
};
