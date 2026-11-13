/**
 * Netlify Serverless Function: Daily Analytics Digest
 * Sends or schedules the daily analytics report to bleonard@sentaient.com
 */

const https = require('https');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    let body = {};
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        body = {};
      }
    }

    const recipient = body.recipient || process.env.ANALYTICS_RECIPIENT || 'bleonard@sentaient.com';
    const subject = body.subject || `sentAIent Daily Analytics Digest — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    const html = body.html || `<p>Daily Analytics Digest for ${recipient}</p>`;

    console.log(`[Daily Analytics Digest] Preparing digest delivery for ${recipient}`);

    // If RESEND_API_KEY is configured in Netlify env
    if (process.env.RESEND_API_KEY) {
      const resendData = JSON.stringify({
        from: 'sentAIent Telemetry <analytics@sentaient.com>',
        to: [recipient],
        subject: subject,
        html: html
      });

      const options = {
        hostname: 'api.resend.com',
        port: 443,
        path: '/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Length': Buffer.byteLength(resendData)
        }
      };

      await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let resBody = '';
          res.on('data', chunk => resBody += chunk);
          res.on('end', () => {
            console.log('[Resend Delivery Response]', resBody);
            resolve(resBody);
          });
        });
        req.on('error', reject);
        req.write(resendData);
        req.end();
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          deliveredVia: 'Resend',
          recipient,
          deliveredAt: new Date().toISOString()
        })
      };
    }

    // If SENDGRID_API_KEY is configured
    if (process.env.SENDGRID_API_KEY) {
      const sgData = JSON.stringify({
        personalizations: [{ to: [{ email: recipient }] }],
        from: { email: 'analytics@sentaient.com', name: 'sentAIent Telemetry' },
        subject: subject,
        content: [{ type: 'text/html', value: html }]
      });

      const options = {
        hostname: 'api.sendgrid.com',
        port: 443,
        path: '/v3/mail/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Length': Buffer.byteLength(sgData)
        }
      };

      await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          let resBody = '';
          res.on('data', chunk => resBody += chunk);
          res.on('end', () => resolve(resBody));
        });
        req.on('error', reject);
        req.write(sgData);
        req.end();
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          deliveredVia: 'SendGrid',
          recipient,
          deliveredAt: new Date().toISOString()
        })
      };
    }

    // Default: Email report compiled and ready for dispatch
    console.log(`[Daily Analytics Digest] Digest compiled successfully for ${recipient} (Waiting for provider API key)`);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        recipient,
        compiledAt: new Date().toISOString(),
        message: `Daily report compiled and queued for ${recipient}. To send live emails, set RESEND_API_KEY or SENDGRID_API_KEY in your Netlify site settings.`
      })
    };
  } catch (err) {
    console.error('[Daily Analytics Digest Error]', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
