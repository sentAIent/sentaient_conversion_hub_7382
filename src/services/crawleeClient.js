export const scrapeCompetitor = async (url) => {
  try {
    const response = await fetch('/.netlify/functions/crawl-competitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error scraping competitor:', error);
    throw error;
  }
};
