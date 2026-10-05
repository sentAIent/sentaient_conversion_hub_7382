exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const report = JSON.parse(event.body);
      console.warn("🚨 CSP VIOLATION REPORTED:", JSON.stringify(report, null, 2));
      
      // We log it so it appears in the Netlify function logs.
      // In the future, this can be hooked up to Slack/Discord webhooks or Datadog/Sentry.
      
      return {
        statusCode: 204,
        body: ""
      };
    } catch (error) {
      console.error("Error parsing CSP report:", error);
      return { statusCode: 400, body: "Invalid CSP report format" };
    }
  }
  
  return { statusCode: 405, body: "Method Not Allowed" };
};
