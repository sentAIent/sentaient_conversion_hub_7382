import { CheerioCrawler, log } from 'crawlee';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const runBountyScraper = async (systemVenueId: string) => {
  log.info('Starting Bounty Scraper for tech events...');

  const crawler = new CheerioCrawler({
    requestHandler: async ({ $, request }) => {
      log.info(`Processing ${request.url}...`);
      
      const posts: any[] = [];
      
      $('.athing').slice(0, 10).each((i, el) => {
        const titleElement = $(el).find('.titleline > a');
        const title = titleElement.text() || 'Unknown Tech Event';
        const url = titleElement.attr('href') || '';
        
        const subtextRow = $(el).next();
        const scoreElement = subtextRow.find('.score');
        const scoreText = scoreElement.text() || '100 points';
        const points = parseInt(scoreText) || 100;
        
        posts.push({ title, url, points });
      });

      log.info(`Found ${posts.length} tech events. Injecting as Bounties...`);

      for (const post of posts) {
        // San Francisco base coordinates with slight random offset
        const lat = 37.7749 + (Math.random() - 0.5) * 0.05;
        const lng = -122.4194 + (Math.random() - 0.5) * 0.05;

        // Reward based on points (e.g. 150 points = $15.00 = 1500 cents)
        const reward = post.points * 10;
        const totalBudget = reward * 10; // Allow up to 10 claims

        await prisma.bounty.create({
          data: {
            venueId: systemVenueId,
            title: `Tech Bounty: ${post.title.substring(0, 50)}`,
            description: `Check in and verify you are building something cool related to: ${post.url}`,
            reward,
            totalBudget,
            latitude: lat,
            longitude: lng,
            isActive: true,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          }
        });
      }

      log.info('Bounty scraping complete!');
    },
    maxRequestsPerCrawl: 1, // We only need the front page
  });

  await crawler.run(['https://news.ycombinator.com/']);
};
