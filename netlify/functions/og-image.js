exports.handler = async (event, context) => {
  // Extract parameters from the query string (e.g., ?title=Hello&subtitle=World)
  const { title = "SentAIent Hub", subtitle = "The ultimate AI platform" } = event.queryStringParameters;

  // Generate a dynamic SVG image
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      
      <!-- Accent Line -->
      <rect x="100" y="50" width="100" height="10" fill="#10b981" />

      <!-- Text Elements -->
      <text x="100" y="250" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="#ffffff" width="1000">
        ${escapeHTML(title)}
      </text>
      
      <text x="100" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="500" fill="#94a3b8">
        ${escapeHTML(subtitle)}
      </text>

      <!-- Brand -->
      <text x="100" y="550" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="bold" fill="#10b981">
        Sentaient.com
      </text>
    </svg>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
    body: svg,
  };
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
}
