import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { runBountyScraper } from './scraper';

const prisma = new PrismaClient();

export const initCronJobs = async () => {
  console.log('[Cron] Initializing background jobs...');

  // Ensure System User exists for Bounties
  let systemUser = await prisma.user.findUnique({
    where: { email: 'system@sentaient.com' }
  });

  if (!systemUser) {
    console.log('[Cron] Creating System Venue account...');
    systemUser = await prisma.user.create({
      data: {
        id: '00000000-0000-0000-0000-000000000000', // Static system ID
        name: 'Sentaient System Agent',
        username: 'sentaient_system',
        email: 'system@sentaient.com',
        emailVerified: true,
        isActive: true,
        referralCode: 'SYSTEM_BOT',
      }
    });
  }

  const systemVenueId = systemUser.id;

  // Schedule the crawler to run every day at midnight
  // For testing, you could change this to '* * * * *' (every minute)
  cron.schedule('0 0 * * *', async () => {
    console.log('[Cron] Running daily Crawlee Bounty extraction...');
    try {
      await runBountyScraper(systemVenueId);
      console.log('[Cron] Extraction complete.');
    } catch (error) {
      console.error('[Cron] Crawler failed:', error);
    }
  });

  console.log('[Cron] Background jobs successfully scheduled.');
};
