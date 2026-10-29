// Native crawler implementation without external dependencies

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { url } = JSON.parse(event.body);

    if (!url) {
      return { statusCode: 400, body: JSON.stringify({ error: 'URL is required' }) };
    }

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SentAIentCrawler/1.0)' }
    });
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
                      html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

    const headers = [];
    const headerRegex = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi;
    let match;
    while ((match = headerRegex.exec(html)) !== null && headers.length < 10) {
      const clean = match[1].replace(/<[^>]+>/g, '').trim();
      if (clean) headers.push(clean);
    }

    const pricingIndicators = [];
    const textChunks = html.replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .split(/\s{2,}|\n/);
    for (const chunk of textChunks) {
      const trimmed = chunk.trim();
      if ((trimmed.includes('$') || trimmed.toLowerCase().includes('pricing')) && trimmed.length > 2 && trimmed.length < 100) {
        pricingIndicators.push(trimmed);
        if (pricingIndicators.length >= 5) break;
      }
    }

    const scrapedData = {
      url,
      title,
      description,
      h1,
      headers,
      pricingIndicators
    };

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
