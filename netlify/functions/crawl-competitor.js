const { CheerioCrawler } = require('crawlee');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return { statusCode: 400, body: JSON.stringify({ error: 'URL is required' }) };
    }

    let scrapedData = {};

    const crawler = new CheerioCrawler({
      maxRequestsPerCrawl: 1,
      async requestHandler({ request, $, log }) {
        log.info(`Processing ${request.url}...`);
        
        // Extract basic competitor intel
        const title = $('title').text();
        const description = $('meta[name="description"]').attr('content') || '';
        const h1 = $('h1').text().trim();
        
        // Extract all headers for content analysis
        const headers = [];
        $('h2, h3').each((i, el) => {
          headers.push($(el).text().trim());
        });

        // Basic pricing extraction heuristic
        const pricingText = [];
        $('*').each((i, el) => {
          const text = $(el).text();
          if (text.includes('$') || text.toLowerCase().includes('pricing')) {
            // Very naive extraction for demo purposes
            if (text.length < 100) pricingText.push(text.trim());
          }
        });

        scrapedData = {
          url: request.url,
          title,
          description,
          h1,
          headers: headers.slice(0, 10), // Limit to top 10
          pricingIndicators: pricingText.slice(0, 5)
        };
      },
    });

    await crawler.run([url]);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: scrapedData })
    };

  } catch (error) {
    console.error('Crawl failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to crawl website', details: error.message })
    };
  }
};
