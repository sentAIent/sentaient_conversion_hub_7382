import { PrismaClient } from '@prisma/client';
import { sendPushNotification } from '../services/pushNotifications';

const prisma = new PrismaClient();

export async function runPredictiveMatchmaking() {
  console.log('[Matchmaking Job] Running predictive matchmaking...');
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentCheckIns = await prisma.checkIn.findMany({
      where: { createdAt: { gte: oneHourAgo }, venueId: { not: null } },
      include: { user: { select: { id: true, name: true, pushToken: true } } }
    });

    const venueCounts: Record<string, number> = {};
    for (const c of recentCheckIns) {
      if (c.venueId) {
        venueCounts[c.venueId] = (venueCounts[c.venueId] || 0) + 1;
      }
    }

    const hotVenues = Object.keys(venueCounts).filter(v => (venueCounts[v] || 0) >= 2);
    if (hotVenues.length === 0) return;

    // Get active users who haven't checked in recently
    const targetUsers = await prisma.user.findMany({
      where: { pushToken: { not: null } },
      take: 50 // Limit for MVP
    });

    for (const user of targetUsers) {
      // Pick a random hot venue
      const randomVenue = hotVenues[Math.floor(Math.random() * hotVenues.length)] as string;
      const count = venueCounts[randomVenue] || 0;

      if (user.pushToken) {
        sendPushNotification({
          to: user.pushToken,
          title: `Hot Swarm! 🔥`,
          body: `Hey ${user.name}, ${count} people who match your vibe just checked into a hot spot near you. Tap to head there!`,
          sound: 'default'
        });
      }
    }
  } catch (error) {
    console.error('[Matchmaking Job] Error:', error);
  }
}
