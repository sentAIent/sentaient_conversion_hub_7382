/**
 * Maxun Client API Service
 * Interacts with our secure edge proxy to trigger Web Data Extractions via Maxun.
 */

const PROXY_URL = '/.netlify/functions/maxun-proxy';

export async function runScrapingJob(robotId, inputData = {}) {
  try {
    const response = await fetch(`${PROXY_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ robotId, inputData })
    });

    if (!response.ok) {
      throw new Error(`Scraping job failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error running Maxun scraping job:', error);
    throw error;
  }
}

export async function getScrapingResult(runId) {
  try {
    const response = await fetch(`${PROXY_URL}/result?runId=${runId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch scraping result: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Maxun scraping result:', error);
    throw error;
  }
}

export async function scrapeUrlToMarkdown(url) {
  try {
    const response = await fetch(`${PROXY_URL}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        robotId: 'generic-markdown-scraper', 
        inputData: { url } 
      })
    });

    if (!response.ok) {
      throw new Error(`Scraping job failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.markdown || data.text || "";
  } catch (error) {
    console.error('Error in scrapeUrlToMarkdown:', error);
    throw error;
  }
}
