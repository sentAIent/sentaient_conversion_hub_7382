import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { PrismaClient, PrivacyTier, Color } from '@prisma/client';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import path from 'path';
import { sendPushNotification } from './services/pushNotifications';
import { sendEmail } from './services/email';
import { runPredictiveMatchmaking } from './jobs/matchmakingCron';
import { MeiliSearch } from 'meilisearch';

dotenv.config({ override: true });

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_MASTER_KEY || 'generate_a_random_secure_key_here_for_production'
});

const prisma = new PrismaClient();

initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID || 'icebreaker-6fb93',
});

// Cloudflare R2 / S3 Setup
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://<ACCOUNT_ID>.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const db = getFirestore();

export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    city: String
    trustScore: Float!
    opennessProfile: OpennessProfile
    matchScore: Float
    streakCount: Int!
    referralCode: String!
    profilePhotoUrl: String
    bio: String
    proStatus: Boolean
    proExpiresAt: String
    privacy: String
  }

  type OpennessProfile {
    activeColors: [String!]!
    showOnColorMap: Boolean!
  }

  type CheckIn {
    id: ID!
    userId: ID!
    privacyTier: String!
    latitude: Float!
    longitude: Float!
    fuzzyLatitude: Float!
    fuzzyLongitude: Float!
    createdAt: String!
    user: User!
  }

  type Content {
    id: ID!
    userId: ID!
    type: String!
    mediaUrl: String
    textBody: String
    sourceFlag: String!
    isMoment: Boolean!
    createdAt: String!
    user: User!
    productTags: [ProductTag!]
    likesCount: Int!
    commentsCount: Int!
    hasLiked: Boolean!
  }

  type ProductTag {
    id: ID!
    productId: ID!
    contentId: ID!
    product: Product!
  }

  union FeedItem = Content | CheckIn

  input LocationInput {
    latitude: Float!
    longitude: Float!
    privacyTier: String!
  }

  type MeetingRequest {
    id: ID!
    senderId: ID!
    receiverId: ID!
    status: String!
    proposedTime: String!
    locationName: String!
    createdAt: String!
  }

  type PresignedUrl {
    uploadUrl: String!
    fileKey: String!
  }

  type NearbyMatch {
    user: User!
    checkIn: CheckIn!
    matchScore: Float
  }

  type AdminAnalytics {
    totalUsers: Int!
    dau: Int!
    mau: Int!
    totalCheckIns: Int!
    totalMeetings: Int!
    meetingsAccepted: Int!
    totalReferrals: Int!
    averageTrustScore: Float!
    avgStreak: Float!
  }

  type WaitlistEntry {
    id: ID!
    email: String!
    timestamp: String!
  }

  type Notification {
    id: ID!
    type: String!
    message: String
    isRead: Boolean!
    createdAt: String!
    actor: User
  }

  type Wallet {
    id: ID!
    balance: Int!
    transactions: [Transaction!]!
  }

  type Transaction {
    id: ID!
    amount: Int!
    type: String!
    description: String
    createdAt: String!
  }

  type Storefront {
    id: ID!
    name: String!
    description: String
    products: [Product!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Int!
    imageUrl: String
  }

  type BountyClaim {
    id: ID!
    status: String!
    user: User!
    content: Content!
  }

  type Bounty {
    id: ID!
    venueId: ID!
    title: String!
    description: String!
    reward: Int!
    totalBudget: Int!
    latitude: Float!
    longitude: Float!
    isActive: Boolean!
    paymentStatus: String!
    checkoutUrl: String
    expiresAt: String!
    claimsCount: Int!
    claims: [BountyClaim!]
  }

  type SwarmCampaign {
    id: ID!
    venueId: ID!
    title: String!
    description: String!
    latitude: Float!
    longitude: Float!
    radiusMeters: Int!
    targetCheckIns: Int!
    maxDiscount: String!
    totalBudget: Int!
    paymentStatus: String!
    checkoutUrl: String
    isActive: Boolean!
    expiresAt: String!
  }

  type Like {
    id: ID!
    userId: ID!
    contentId: ID!
    createdAt: String!
    user: User!
  }

  type Comment {
    id: ID!
    userId: ID!
    contentId: ID!
    text: String!
    createdAt: String!
    user: User!
  }

  type UserProfile {
    user: User!
    contents: [Content!]!
  }

  type Message {
    id: ID!
    senderId: ID!
    receiverId: ID!
    text: String
    sharedContentId: ID
    sharedContent: Content
    isRead: Boolean!
    createdAt: String!
    sender: User!
  }

  type Conversation {
    otherUser: User!
    lastMessage: Message!
    unreadCount: Int!
  }

  type VenueAnalytics {
    totalImpressions: Int!
    storefrontSales: Int!
  }

  type SearchResult {
    bounties: [Bounty!]!
    venues: [User!]!
  }

  type Query {
    globalSearch(query: String!): SearchResult!
    me: User
    activeCheckIns: [CheckIn!]!
    myMeetingRequests: [MeetingRequest!]!
    nearbyUsers(latitude: Float!, longitude: Float!, radiusKm: Float!): [NearbyMatch!]!
    adminAnalytics(password: String!): AdminAnalytics!
    adminWaitlist(password: String!): [WaitlistEntry!]!
    followerFeed: [FeedItem!]!
    exploreFeed: [FeedItem!]!
    followerStories: [Content!]!
    pendingFollowRequests: [User!]!
    followStatus(userId: ID!): String!
    alerts: [Notification!]!
    userProfile(userId: ID!): UserProfile!
    myConversations: [Conversation!]!
    conversationMessages(userId: ID!): [Message!]!
    
    myWallet: Wallet
    activeBounties(latitude: Float!, longitude: Float!, radiusKm: Float!): [Bounty!]!
    myBounties: [Bounty!]!
    venueStorefront(venueId: ID!): Storefront
    activeSwarmCampaigns(latitude: Float!, longitude: Float!, radiusKm: Float!): [SwarmCampaign!]!
    mySwarmCampaigns: [SwarmCampaign!]!
    venueAnalytics(venueId: ID!): VenueAnalytics!
  }

  type Mutation {
    syncUser(inviteCode: String!): User!
    syncContacts(phones: [String!]!): [User!]!
    createOrUpdateCheckIn(location: LocationInput!): CheckIn
    updateOpennessProfile(activeColors: [String!]!, showOnColorMap: Boolean!): OpennessProfile
    updateUserDetails(name: String, username: String, bio: String, profilePhotoUrl: String): User
    getPresignedUploadUrl(contentType: String!): PresignedUrl
    sendMeetingRequest(receiverId: ID!, proposedTime: String!, locationName: String!): MeetingRequest
    sendWaitlistEmail(emails: [String!]!, subject: String!, html: String!, password: String!): Boolean!
    respondToMeetingRequest(requestId: ID!, status: String!): MeetingRequest
    submitMeetingRating(targetUserId: ID!, rating: Float!): User
    updatePushToken(token: String!): User
    redeemReferralCode(code: String!): User
    followUser(userId: ID!): Boolean!
    unfollowUser(userId: ID!): Boolean!
    approveFollowRequest(userId: ID!): Boolean!
    rejectFollowRequest(userId: ID!): Boolean!
    markAlertRead(id: ID!): Boolean!
    updatePrivacy(isPrivate: Boolean!): User
    adminDeleteWaitlistEntry(password: String!, id: ID!): Boolean!
    
    createStorefront(name: String!, description: String): Storefront
    addProduct(storefrontId: ID!, name: String!, price: Int!, imageUrl: String): Product
    createBounty(title: String!, description: String!, reward: Int!, totalBudget: Int!, latitude: Float!, longitude: Float!): Bounty
    createBountyCheckout(venueId: String!, title: String!, description: String!, reward: Int!, totalBudget: Int!, latitude: Float!, longitude: Float!): String!
    claimBounty(bountyId: ID!, contentId: ID!): Boolean!
    reviewBountyClaim(claimId: ID!, status: String!): Boolean!
    createSwarmCampaign(title: String!, description: String!, targetCheckIns: Int!, maxDiscount: String!, latitude: Float!, longitude: Float!, totalBudget: Int!): SwarmCampaign
    createContent(type: String!, textBody: String, mediaUrl: String, venueId: ID): Content
    autoMonetizeContent(contentId: ID!, venueId: ID!): [ProductTag!]
    likeContent(contentId: ID!): Boolean!
    unlikeContent(contentId: ID!): Boolean!
    commentContent(contentId: ID!, text: String!): Comment!
    sendMessage(receiverId: ID!, text: String, sharedContentId: ID): Message!
    markConversationRead(userId: ID!): Boolean!
    
    createPaymentIntent(amount: Int!): String!
    createOrder(items: [OrderItemInput!]!, paymentIntentId: String, shippingAddress: String): Order!
    exportWatermarkedVideo(contentId: ID!): String!
    payVenue(venueId: String!, amount: Int!): Boolean!
    cashOutWallet: CashOutResponse!
  }

  type CashOutResponse {
    status: String!
    url: String
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Int!
  }

  type Order {
    id: ID!
    userId: ID!
    totalAmount: Int!
    status: String!
    stripePaymentIntentId: String
    shippingAddress: String
    createdAt: String!
    items: [OrderItem!]!
  }

  type OrderItem {
    id: ID!
    orderId: ID!
    productId: ID!
    quantity: Int!
    priceAtPurchase: Int!
    product: Product!
  }
`;

export const trackActivity = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { lastActiveAt: new Date() }
  }).catch(() => {});
};

import { GoogleGenAI } from '@google/genai';
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

import Stripe from 'stripe';
import { stripe } from './services/stripe';

async function ensureUserExists(contextUser: any) {
  if (!contextUser || !contextUser.uid) return;
  const existing = await prisma.user.findUnique({ where: { id: contextUser.uid } });
  if (!existing) {
    const suffix = Math.floor(Math.random() * 100000).toString();
    await prisma.user.create({
      data: {
        id: contextUser.uid,
        email: contextUser.email || `${contextUser.uid}@placeholder.com`,
        username: `user_${suffix}`,
        name: contextUser.name || 'New User',
        referralCode: `REF${suffix}`
      }
    });
  }
}

export const resolvers = {
  Content: {
    likesCount: async (parent: any) => prisma.like.count({ where: { contentId: parent.id } }),
    commentsCount: async (parent: any) => prisma.comment.count({ where: { contentId: parent.id } }),
    hasLiked: async (parent: any, _: any, context: any) => {
      if (!context.user) return false;
      const like = await prisma.like.findUnique({ where: { userId_contentId: { userId: context.user.uid, contentId: parent.id } } });
      return !!like;
    }
  },
  CheckIn: {
    user: async (parent: any) => {
      return prisma.user.findUnique({ where: { id: parent.userId } });
    }
  },
  Bounty: {
    claims: async (parent: any) => prisma.bountyClaim.findMany({ where: { bountyId: parent.id } })
  },
  BountyClaim: {
    user: async (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    content: async (parent: any) => prisma.content.findUnique({ where: { id: parent.contentId } })
  },
  FeedItem: {
    __resolveType(obj: any, contextValue: any, info: any) {
      if (obj.latitude !== undefined) {
        return 'CheckIn';
      }
      if (obj.type !== undefined) {
        return 'Content';
      }
      return null;
    }
  },
  Query: {
    globalSearch: async (_: any, { query }: any) => {
      try {
        const [bountyRes, venueRes] = await Promise.all([
          meiliClient.index('bounties').search(query),
          meiliClient.index('venues').search(query)
        ]);
        
        const bountyIds = bountyRes.hits.map((h: any) => h.id);
        const venueIds = venueRes.hits.map((h: any) => h.id);
        
        const bounties = await prisma.bounty.findMany({ where: { id: { in: bountyIds } } });
        const venues = await prisma.user.findMany({ where: { id: { in: venueIds } } });
        
        return { bounties, venues };
      } catch(e) {
        console.error("Meilisearch error:", e);
        return { bounties: [], venues: [] };
      }
    },
    me: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);
      await trackActivity(context.user.uid);
      return prisma.user.findUnique({ 
        where: { id: context.user.uid },
        include: { opennessProfile: true }
      });
    },
    activeCheckIns: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      return prisma.checkIn.findMany({
        where: {
          isActive: true,
          createdAt: { gte: twelveHoursAgo }
        }
      });
    },
    myMeetingRequests: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      return prisma.meetingRequest.findMany({
        where: {
          OR: [
            { senderId: context.user.uid },
            { receiverId: context.user.uid }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });
    },
    nearbyUsers: async (_: any, { latitude, longitude, radiusKm }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await trackActivity(context.user.uid);
      
      const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
      const checkIns = await prisma.checkIn.findMany({
        where: {
          isActive: true,
          createdAt: { gte: twelveHoursAgo },
          userId: { not: context.user.uid }
        },
        include: { user: { include: { opennessProfile: true } } }
      });
      
      // Simple bounding box for distance (1 deg ~ 111km)
      const degRadius = radiusKm / 111.0;
      const nearbyCheckIns = checkIns.filter(c => 
        Math.abs(c.latitude - latitude) <= degRadius && Math.abs(c.longitude - longitude) <= degRadius
      );
      
      const userIds = nearbyCheckIns.map(c => c.userId);
      if (userIds.length === 0) return [];

      let scores: Record<string, number> = {};
      
      if (ai) {
        try {
          // Calculate cosine similarity using pgvector
          const matches: any[] = await prisma.$queryRawUnsafe(`
            SELECT id, 1 - (embedding <=> (SELECT embedding FROM "User" WHERE id = $1::text)) as score
            FROM "User"
            WHERE id = ANY($2::text[])
            AND embedding IS NOT NULL;
          `, context.user.uid, userIds);
          
          for (const match of matches) {
            scores[match.id] = match.score;
          }
        } catch (e) {
          console.error("Failed to query vector similarity:", e);
        }
      }

      return nearbyCheckIns.map(c => ({
        user: c.user,
        checkIn: c,
        matchScore: scores[c.userId] !== undefined ? Math.round((scores[c.userId] || 0) * 100) : null
      }));
    },
    adminAnalytics: async (_: any, { password }: any) => {
      if (password !== 'icebreaker2026') {
        throw new GraphQLError("Unauthorized admin access", { extensions: { code: 'UNAUTHENTICATED' } });
      }

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const totalUsers = await prisma.user.count();
      const dau = await prisma.user.count({ where: { lastActiveAt: { gte: oneDayAgo } } });
      const mau = await prisma.user.count({ where: { lastActiveAt: { gte: thirtyDaysAgo } } });
      const totalCheckIns = await prisma.checkIn.count();
      const totalMeetings = await prisma.meetingRequest.count();
      const meetingsAccepted = await prisma.meetingRequest.count({ where: { status: 'ACCEPTED' } });
      const totalReferrals = await prisma.referral.count();
      const usersAvg = await prisma.user.aggregate({
        _avg: {
          trustScore: true,
          streakCount: true
        }
      });

      return {
        totalUsers,
        dau,
        mau,
        totalCheckIns,
        totalMeetings,
        meetingsAccepted,
        totalReferrals,
        averageTrustScore: usersAvg._avg.trustScore || 5.0,
        avgStreak: usersAvg._avg.streakCount || 0
      };
    },
    adminWaitlist: async (_: any, { password }: any) => {
      if (password !== 'icebreaker2026') {
        throw new GraphQLError("Unauthorized admin access", { extensions: { code: 'UNAUTHENTICATED' } });
      }
      const snap = await db.collection('icebreaker_waitlist').orderBy('timestamp', 'desc').get();
      return snap.docs.map(d => ({
        id: d.id,
        email: d.data().email || '',
        timestamp: d.data().timestamp?.toDate ? d.data().timestamp.toDate().toISOString() : new Date(d.data().timestamp).toISOString()
      }));
    },
    followerFeed: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const following = await prisma.follows.findMany({
        where: { followerId: context.user.uid, status: 'ACCEPTED' },
        select: { followingId: true }
      });
      const followingIds = following.map(f => f.followingId);
      
      const checkIns = await prisma.checkIn.findMany({
        where: { userId: { in: followingIds }, isActive: true },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      const contents = await prisma.content.findMany({
        where: { userId: { in: followingIds }, isDeleted: false, isMoment: false },
        include: { 
          user: true,
          productTags: {
            include: { product: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      const items = [...checkIns, ...contents].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return items;
    },
    exploreFeed: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const mockVideos = Array.from({ length: 10 }).map((_, i) => ({
        __typename: 'Content',
        id: `mock-video-${i}`,
        userId: `mock-user-${i}`,
        type: 'video',
        mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        textBody: `Explore this amazing video! #${i}`,
        sourceFlag: 'mock',
        isMoment: false,
        createdAt: new Date(Date.now() - i * 3600000),
        user: {
          id: `mock-user-${i}`,
          name: `Creator ${i}`,
          username: `creator_${i}`,
          email: `creator${i}@example.com`,
          trustScore: 5.0,
          streakCount: 0,
          referralCode: `MOCK${i}`,
          profilePhotoUrl: `https://i.pravatar.cc/150?u=${i}`,
        },
        productTags: [],
        likesCount: Math.floor(Math.random() * 1000),
        commentsCount: Math.floor(Math.random() * 100),
        hasLiked: false,
      }));

      return mockVideos;
    },
    followerStories: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);

      const follows = await prisma.follows.findMany({
        where: { followerId: context.user.uid, status: 'ACCEPTED' },
        select: { followingId: true }
      });
      const followingIds = [context.user.uid, ...follows.map(f => f.followingId)];

      // Stories are isMoment = true and not expired
      const now = new Date();
      const stories = await prisma.content.findMany({
        where: { 
          userId: { in: followingIds }, 
          isDeleted: false, 
          isMoment: true,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: now } }
          ]
        },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      });
      
      return stories;
    },
    pendingFollowRequests: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);

      const requests = await prisma.follows.findMany({
        where: { followingId: context.user.uid, status: 'PENDING' },
        include: { follower: true }
      });

      return requests.map(r => r.follower);
    },
    followStatus: async (_: any, { userId }: any, context: any) => {
      if (!context.user) return 'NONE';
      
      const follow = await prisma.follows.findFirst({
        where: { followerId: context.user.uid, followingId: userId }
      });
      
      return follow ? follow.status : 'NONE';
    },
    alerts: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const notifications = await prisma.notification.findMany({
        where: { userId: context.user.uid },
        include: { actor: true },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
      return notifications;
    },
    myWallet: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      let wallet = await prisma.wallet.findUnique({
        where: { userId: context.user.uid },
        include: { transactions: { orderBy: { createdAt: 'desc' } } }
      });
      if (!wallet) {
        wallet = await prisma.wallet.create({
          data: { userId: context.user.uid, balance: 0 },
          include: { transactions: true }
        });
      }
      return wallet;
    },
    activeBounties: async (_: any, { latitude, longitude, radiusKm }: any, context: any) => {
      return prisma.bounty.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      });
    },
    myBounties: async (_: any, args: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      return prisma.bounty.findMany({
        where: { venueId: context.user.uid },
        orderBy: { createdAt: 'desc' }
      });
    },
    venueStorefront: async (_: any, { venueId }: any, context: any) => {
      return prisma.storefront.findUnique({
        where: { userId: venueId },
        include: { products: true }
      });
    },
    activeSwarmCampaigns: async (_: any, { latitude, longitude, radiusKm }: any, context: any) => {
      return prisma.swarmCampaign.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      });
    },
    mySwarmCampaigns: async (_: any, args: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      return prisma.swarmCampaign.findMany({
        where: { venueId: context.user.uid },
        orderBy: { createdAt: 'desc' }
      });
    },
    venueAnalytics: async (_: any, { venueId }: any, context: any) => {
      return {
        totalImpressions: 124500,
        storefrontSales: 425000
      };
    },
    userProfile: async (_: any, { userId }: any, context: any) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { opennessProfile: true }
      });
      if (!user) throw new GraphQLError("User not found", { extensions: { code: 'NOT_FOUND' } });
      const contents = await prisma.content.findMany({
        where: { userId, isDeleted: false },
        include: { 
          user: true,
          productTags: { include: { product: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
      return { user, contents };
    },
    myConversations: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const myId = context.user.uid;
      
      // Get all messages involving this user
      const messages = await prisma.message.findMany({
        where: { OR: [{ senderId: myId }, { receiverId: myId }] },
        orderBy: { createdAt: 'desc' },
        include: { sender: true, receiver: true }
      });

      // Group by the *other* user
      const conversationsMap = new Map();
      
      for (const msg of messages) {
        const otherUserId = msg.senderId === myId ? msg.receiverId : msg.senderId;
        const otherUser = msg.senderId === myId ? msg.receiver : msg.sender;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            otherUser,
            lastMessage: msg,
            unreadCount: 0
          });
        }
        
        // Count unread if I am the receiver and it's not read
        if (msg.receiverId === myId && !msg.isRead) {
          conversationsMap.get(otherUserId).unreadCount += 1;
        }
      }
      
      return Array.from(conversationsMap.values());
    },
    conversationMessages: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const myId = context.user.uid;
      
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: myId, receiverId: userId },
            { senderId: userId, receiverId: myId }
          ]
        },
        orderBy: { createdAt: 'desc' },
        include: { 
          sender: true,
          sharedContent: {
            include: { user: true }
          }
        }
      });
      return messages;
    }
  },
  Mutation: {
    syncUser: async (_: any, { inviteCode }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      let user = await prisma.user.findUnique({ where: { id: context.user.uid } });
      
      if (!user) {
        const inviter = await prisma.user.findUnique({ where: { inviteCode } });
        if (!inviter) throw new GraphQLError("Invalid invite code");
        
        const suffix = Math.floor(Math.random() * 100000).toString();
        user = await prisma.user.create({
          data: {
            id: context.user.uid,
            email: context.user.email || `${context.user.uid}@placeholder.com`,
            username: `user_${suffix}`,
            name: context.user.name || 'New User',
            referralCode: `REF${suffix}`,
            isFirePremium: true,
            invitedById: inviter.id
          }
        });
      }

      const now = new Date();
      let currentStreak = user.currentStreak || 0;
      let longestStreak = user.longestStreak || 0;
      
      if (user.lastLoginDate) {
        const lastLogin = new Date(user.lastLoginDate);
        lastLogin.setHours(0, 0, 0, 0);
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(0, 0, 0, 0);
        
        if (lastLogin.getTime() === yesterday.getTime()) {
          currentStreak += 1;
          if (currentStreak > longestStreak) longestStreak = currentStreak;
        } else if (lastLogin.getTime() < yesterday.getTime()) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
      }

      user = await prisma.user.update({
        where: { id: user.id },
        data: { currentStreak, longestStreak, lastLoginDate: now }
      });
      
      await trackActivity(context.user.uid);
      return user;
    },
    syncContacts: async (_: any, { phones }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const matchedUsers = await prisma.user.findMany({
        where: { phone: { in: phones } }
      });
      
      if (matchedUsers.length >= 3) {
        const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
        const matchedUserIds = matchedUsers.map((u: any) => u.id);
        const recentCheckIns = await prisma.checkIn.findFirst({
          where: { userId: { in: matchedUserIds }, isActive: true, createdAt: { gte: twelveHoursAgo } }
        });
        
        if (recentCheckIns) {
          const caller = await prisma.user.findUnique({ where: { id: context.user.uid } });
          if (caller?.pushToken) {
            await sendPushNotification({ to: caller.pushToken, title: "Swarm Alert", body: "3 of your contacts are at a Swarm!" });
          }
        }
      }
      
      return matchedUsers;
    },
    sendWaitlistEmail: async (_: any, { emails, subject, html, password }: any) => {
      if (password !== 'icebreaker2026') {
        throw new GraphQLError("Unauthorized admin password", { extensions: { code: 'UNAUTHENTICATED' } });
      }
      
      const success = await sendEmail(emails, subject, html);
      return success;
    },
    updateUserDetails: async (_: any, { name, username, bio, profilePhotoUrl }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);
      
      const dataToUpdate: any = {};
      if (name !== undefined) dataToUpdate.name = name;
      if (username !== undefined) dataToUpdate.username = username;
      if (bio !== undefined) dataToUpdate.bio = bio;
      if (profilePhotoUrl !== undefined) dataToUpdate.profilePhotoUrl = profilePhotoUrl;
      
      return prisma.user.update({
        where: { id: context.user.uid },
        data: dataToUpdate
      });
    },
    createOrUpdateCheckIn: async (_: any, { location }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);
      await trackActivity(context.user.uid);
      const { latitude, longitude, privacyTier } = location;
      
      let fuzzyLat = latitude;
      let fuzzyLng = longitude;
      if (privacyTier === 'neighborhood') {
        fuzzyLat += (Math.random() - 0.5) * 0.01;
        fuzzyLng += (Math.random() - 0.5) * 0.01;
      } else if (privacyTier === 'city') {
        fuzzyLat += (Math.random() - 0.5) * 0.1;
        fuzzyLng += (Math.random() - 0.5) * 0.1;
      }

      await prisma.checkIn.updateMany({
        where: { userId: context.user.uid, isActive: true },
        data: { isActive: false }
      });

      const currentUser = await prisma.user.findUnique({ where: { id: context.user.uid } });
      const now = new Date();
      let streakCount = currentUser?.streakCount || 0;
      const lastCheckInAt = currentUser?.lastCheckInAt;

      if (lastCheckInAt) {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.floor((now.getTime() - lastCheckInAt.getTime()) / msPerDay);
        if (diffDays === 1) {
          streakCount += 1;
        } else if (diffDays > 1) {
          streakCount = 1;
        }
      } else {
        streakCount = 1;
      }

      await prisma.user.update({
        where: { id: context.user.uid },
        data: { streakCount, lastCheckInAt: now }
      });

      return prisma.checkIn.create({
        data: {
          userId: context.user.uid,
          privacyTier: location.privacyTier,
          latitude: location.latitude,
          longitude: location.longitude,
          fuzzyLatitude: fuzzyLat,
          fuzzyLongitude: fuzzyLng,
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000)
        }
      });
    },
    updateOpennessProfile: async (_: any, { activeColors, showOnColorMap }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await ensureUserExists(context.user);
      
      const profile = await prisma.opennessProfile.upsert({
        where: { userId: context.user.uid },
        update: { activeColors, showOnColorMap },
        create: { userId: context.user.uid, activeColors, showOnColorMap }
      });

      if (ai && activeColors.length > 0) {
        try {
          const text = `User is open to: ${activeColors.join(', ')}`;
          const response = await ai.models.embedContent({
            model: 'text-embedding-004',
            contents: text,
          });
          
          if (response.embeddings && response.embeddings.length > 0 && response.embeddings[0]?.values) {
            const embedding = response.embeddings[0]?.values;
            // Use Prisma's raw query to update the vector column
            await prisma.$executeRawUnsafe(`
              UPDATE "User" SET embedding = $1::vector WHERE id = $2::text;
            `, embedding, context.user.uid);
          }
        } catch (e) {
          console.error("AI Embedding error", e);
        }
      }

      return profile;
    },
    getPresignedUploadUrl: async (_: any, { contentType }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      if (!['image/jpeg', 'image/png'].includes(contentType)) {
        throw new GraphQLError("Invalid content type", { extensions: { code: 'BAD_USER_INPUT' } });
      }
      
      const fileKey = `profiles/${context.user.uid}/${Date.now()}.jpg`;
      
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'icebreaker-assets',
        Key: fileKey,
        ContentType: contentType,
      });

      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return { uploadUrl, fileKey };
    },
    sendMeetingRequest: async (_: any, { receiverId, proposedTime, locationName }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      if (!locationName || locationName.trim() === "") throw new GraphQLError("Location name is required", { extensions: { code: 'BAD_USER_INPUT' } });
      
      const request = await prisma.meetingRequest.create({
        data: {
          senderId: context.user.uid,
          receiverId,
          proposedTime: new Date(proposedTime),
          locationName,
          status: "PENDING"
        }
      });

      try {
        const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
        if (receiver && receiver.pushToken) {
          await getMessaging().send({
            token: receiver.pushToken,
            notification: { title: "New Meeting Request! ☕️", body: `Someone wants to meet you at ${locationName}` }
          });
        }
      } catch (err) { console.error("Failed to send push:", err); }

      return request;
    },
    respondToMeetingRequest: async (_: any, { requestId, status }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      if (!['ACCEPTED', 'DECLINED'].includes(status)) throw new GraphQLError("Invalid status", { extensions: { code: 'BAD_USER_INPUT' } });
      
      const request = await prisma.meetingRequest.findUnique({ where: { id: requestId } });
      if (!request || request.receiverId !== context.user.uid) {
        throw new GraphQLError("Unauthorized to respond", { extensions: { code: 'FORBIDDEN' } });
      }

      const updatedRequest = await prisma.meetingRequest.update({
        where: { id: requestId },
        data: { status }
      });

      try {
        if (status === 'ACCEPTED') {
          const requester = await prisma.user.findUnique({ where: { id: request.senderId }, select: { pushToken: true } });
          const responder = await prisma.user.findUnique({ where: { id: context.user.uid }, select: { name: true } });
          if (requester?.pushToken) {
            sendPushNotification({ to: requester.pushToken, title: 'Meeting Accepted! 🤝', body: `${responder?.name} accepted your meeting request`, data: { type: 'meeting', requestId: requestId }, sound: 'default' });
          }
        }
      } catch (err) { console.error("Failed to send push:", err); }

      return updatedRequest;
    },
    submitMeetingRating: async (_: any, { targetUserId, rating }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      if (rating < 1 || rating > 5) throw new GraphQLError("Rating must be between 1 and 5", { extensions: { code: 'BAD_USER_INPUT' } });
      
      const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
      if (!targetUser) throw new GraphQLError("User not found", { extensions: { code: 'NOT_FOUND' } });

      const newScore = ((targetUser.trustScore * 10) + rating) / 11;
      return prisma.user.update({
        where: { id: targetUserId },
        data: { trustScore: newScore }
      });
    },
    updatePushToken: async (_: any, { token }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await trackActivity(context.user.uid);
      return prisma.user.update({
        where: { id: context.user.uid },
        data: { pushToken: token }
      });
    },
    redeemReferralCode: async (_: any, { code }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const currentUser = await prisma.user.findUnique({ where: { id: context.user.uid } });
      if (currentUser?.referredBy) throw new GraphQLError("You have already redeemed a referral code.");
      if (currentUser?.referralCode === code) throw new GraphQLError("You cannot redeem your own code.");

      const referrer = await prisma.user.findUnique({ where: { referralCode: code } });
      if (!referrer) throw new GraphQLError("Invalid referral code.");

      // Grant both users 7 days of Pro Status
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      // Create Referral Record
      await prisma.referral.create({
        data: {
          referrerId: referrer.id,
          referredUserId: context.user.uid,
          referralCode: code,
          expiresAt: sevenDaysFromNow,
          status: 'completed',
          completedAt: new Date()
        }
      });

      // Update Referrer
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          referralCount: { increment: 1 },
          proStatus: true,
          proExpiresAt: sevenDaysFromNow
        }
      });

      // Update Current User
      return prisma.user.update({
        where: { id: context.user.uid },
        data: {
          referredBy: referrer.id,
          proStatus: true,
          proExpiresAt: sevenDaysFromNow
        }
      });
    },
    followUser: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      if (context.user.uid === userId) throw new GraphQLError("Cannot follow yourself", { extensions: { code: 'BAD_USER_INPUT' } });
      
      const targetUser = await prisma.user.findUnique({ where: { id: userId } });
      if (!targetUser) throw new GraphQLError("User not found", { extensions: { code: 'NOT_FOUND' } });

      const status = targetUser.privacy === 'private' ? 'PENDING' : 'ACCEPTED';

      await prisma.follows.create({
        data: {
          followerId: context.user.uid,
          followingId: userId,
          status
        }
      }).catch(e => {
        // Ignore unique constraint violation if already following
        if (e.code !== 'P2002') throw e;
      });
      
      const followedUser = await prisma.user.findUnique({ where: { id: userId }, select: { pushToken: true, privacy: true } });
      const followerUser = await prisma.user.findUnique({ where: { id: context.user.uid }, select: { name: true } });
      if (followedUser?.pushToken) {
        const msg = followedUser.privacy === 'private' ? 'sent you a follow request' : 'started following you';
        sendPushNotification({ to: followedUser.pushToken, title: `${followerUser?.name || 'Someone'} ${msg}`, body: 'Tap to view their profile', data: { type: 'follow', userId: context.user.uid }, sound: 'default' });
      }

      return true;
    },
    unfollowUser: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      await prisma.follows.deleteMany({
        where: {
          followerId: context.user.uid,
          followingId: userId
        }
      });
      
      return true;
    },
    approveFollowRequest: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      await prisma.follows.updateMany({
        where: {
          followerId: userId,
          followingId: context.user.uid,
          status: 'PENDING'
        },
        data: { status: 'ACCEPTED' }
      });
      
      return true;
    },
    rejectFollowRequest: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      await prisma.follows.deleteMany({
        where: {
          followerId: userId,
          followingId: context.user.uid,
          status: 'PENDING'
        }
      });
      
      return true;
    },
    updatePrivacy: async (_: any, { isPrivate }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      return prisma.user.update({
        where: { id: context.user.uid },
        data: { privacy: isPrivate ? 'private' : 'public' }
      });
    },
    createStorefront: async (_: any, { name, description }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      return prisma.storefront.create({
        data: {
          userId: context.user.uid,
          name,
          description
        }
      });
    },
    addProduct: async (_: any, { storefrontId, name, price, imageUrl }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      return prisma.product.create({
        data: {
          storefrontId,
          name,
          price,
          imageUrl
        }
      });
    },
    createBounty: async (_: any, { title, description, reward, totalBudget, latitude, longitude }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const bounty = await prisma.bounty.create({
        data: {
          venueId: context.user.uid,
          title,
          description,
          reward,
          totalBudget,
          latitude,
          longitude,
          isActive: false,
          paymentStatus: 'PENDING',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      });

      try {
        await meiliClient.index('bounties').addDocuments([{
          id: bounty.id,
          title: bounty.title,
          description: bounty.description,
          venueId: bounty.venueId,
        }]);
      } catch (e) { console.error("Meilisearch sync error:", e); }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Bounty: ${title}`,
              description: description || 'Payment for bounty reward budget',
            },
            unit_amount: totalBudget,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3005/dashboard/bounties?payment_success=true`,
        cancel_url: `http://localhost:3005/dashboard/bounties/new?canceled=true`,
      });

      const updatedBounty = await prisma.bounty.update({
        where: { id: bounty.id },
        data: { stripeSessionId: session.id }
      });

      return {
        ...updatedBounty,
        checkoutUrl: session.url
      };
    },
    createBountyCheckout: async (_: any, args: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      
      // 1. Create pending bounty in DB
      const bounty = await prisma.bounty.create({
        data: {
          venueId: args.venueId,
          title: args.title,
          description: args.description,
          reward: args.reward,
          totalBudget: args.totalBudget,
          latitude: args.latitude,
          longitude: args.longitude,
          isActive: false,
          paymentStatus: "PENDING",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        }
      });

      // 2. Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Bounty: ${args.title}`,
                description: args.description,
              },
              unit_amount: args.totalBudget,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/dashboard/bounties?success=true`,
        cancel_url: `http://localhost:3000/dashboard/bounties?canceled=true`,
        client_reference_id: bounty.id,
      });

      // 3. Save Stripe session ID
      await prisma.bounty.update({
        where: { id: bounty.id },
        data: { stripeSessionId: session.id }
      });

      return session.url;
    },
    claimBounty: async (_: any, { bountyId, contentId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const bounty = await prisma.bounty.findUnique({ where: { id: bountyId } });
      if (!bounty || !bounty.isActive) throw new GraphQLError("Bounty not available");

      await prisma.bountyClaim.create({
        data: {
          bountyId,
          userId: context.user.uid,
          contentId,
          status: 'PENDING'
        }
      });

      const venueUser = await prisma.user.findUnique({ where: { id: bounty.venueId }, select: { pushToken: true, name: true } });
      const claimer = await prisma.user.findUnique({ where: { id: context.user.uid }, select: { name: true } });
      if (venueUser?.pushToken) {
        sendPushNotification({ to: venueUser.pushToken, title: 'Bounty Claimed! 📝', body: `${claimer?.name || 'Someone'} claimed your bounty: ${bounty.title} (Pending review)`, data: { type: 'bounty', bountyId: bounty.id }, sound: 'default' });
      }

      return true;
    },
    reviewBountyClaim: async (_: any, { claimId, status }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const claim = await prisma.bountyClaim.findUnique({
        where: { id: claimId },
        include: { bounty: true }
      });
      if (!claim) throw new GraphQLError("Claim not found");
      
      if (claim.bounty.venueId !== context.user.uid) {
        throw new GraphQLError("Unauthorized to review this claim");
      }
      
      if (claim.status !== 'PENDING') {
        throw new GraphQLError("Claim is not pending");
      }

      if (status === 'APPROVED') {
        await prisma.bountyClaim.update({
          where: { id: claimId },
          data: { status: 'APPROVED' }
        });
        
        let wallet = await prisma.wallet.findUnique({ where: { userId: claim.userId } });
        if (!wallet) {
          wallet = await prisma.wallet.create({ data: { userId: claim.userId, balance: 0 } });
        }
        await prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: claim.bounty.reward } }
        });
        await prisma.transaction.create({
          data: {
            walletId: wallet.id,
            amount: claim.bounty.reward,
            type: 'BOUNTY_PAYOUT',
            description: `Payout for bounty: ${claim.bounty.title}`
          }
        });
        
        await prisma.bounty.update({
          where: { id: claim.bounty.id },
          data: { totalBudget: { decrement: claim.bounty.reward } }
        });
      } else {
        await prisma.bountyClaim.update({
          where: { id: claimId },
          data: { status: 'REJECTED' }
        });
      }

      return true;
    },
    createSwarmCampaign: async (_: any, { title, description, targetCheckIns, maxDiscount, latitude, longitude, totalBudget }: any, context: any) => {
      await ensureUserExists(context.user);
      if (!context.user) throw new Error('Not authenticated');
      
      const campaign = await prisma.swarmCampaign.create({
        data: {
          venueId: context.user.uid,
          title,
          description,
          targetCheckIns,
          maxDiscount,
          latitude,
          longitude,
          totalBudget,
          paymentStatus: 'PENDING',
          isActive: false,
          expiresAt: new Date(Date.now() + 86400000)
        }
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Campaign: ${title}`,
              description: description || 'Payment for swarm campaign budget',
            },
            unit_amount: totalBudget,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3005/dashboard/campaigns?payment_success=true`,
        cancel_url: `http://localhost:3005/dashboard/campaigns/new?canceled=true`,
      });

      const updatedCampaign = await prisma.swarmCampaign.update({
        where: { id: campaign.id },
        data: { stripeSessionId: session.id }
      });

      return {
        ...updatedCampaign,
        checkoutUrl: session.url
      };
    },

    createContent: async (_: any, { type, textBody, mediaUrl, venueId }: any, context: any) => {
      await ensureUserExists(context.user);
      if (!context.user) throw new Error('Not authenticated');
      return prisma.content.create({
        data: {
          userId: context.user.uid,
          type: type as any,
          textBody,
          mediaUrl,
          venueId,
          sourceFlag: 'in_app_text',
        }
      });
    },

    autoMonetizeContent: async (_: any, { contentId, venueId }: any, context: any) => {
      await ensureUserExists(context.user);
      if (!context.user) throw new Error('Not authenticated');
      
      const content = await prisma.content.findUnique({ where: { id: contentId } });
      if (!content) throw new Error('Content not found');

      const storefront = await prisma.storefront.findUnique({
        where: { userId: venueId },
        include: { products: true }
      });
      if (!storefront || storefront.products.length === 0) {
        return [];
      }

      let taggedProductIds: string[] = [];

      if (ai) {
        const productListStr = storefront.products.map((p: any) => `- ID: ${p.id}, Name: ${p.name}, Desc: ${p.description || ''}`).join('\n');
        const prompt = `
          You are an AI auto-monetization agent. A user has posted the following content:
          "${content.textBody || content.mediaUrl}"
          
          Here are the available products from the venue's storefront:
          ${productListStr}
          
          Which products are likely featured or referenced in the user's content?
          Return ONLY a JSON array of the product IDs. Example: ["id1", "id2"]. If none match, return [].
        `;
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt
          });
          const text = response.text || '';
          const match = text.match(/\[.*\]/s);
          if (match) {
            taggedProductIds = JSON.parse(match[0]);
          }
        } catch (e) {
          console.error("AI tagging failed", e);
        }
      }

      // If AI fails or no GEMINI_API_KEY, mock it by picking the first product if any
      if (taggedProductIds.length === 0 && storefront && storefront.products && storefront.products.length > 0) {
         taggedProductIds = [(storefront as any).products[0].id];
      }

      const tags = [];
      for (const pId of taggedProductIds) {
        const existing = await prisma.productTag.findFirst({
          where: { productId: pId, contentId }
        });
        if (!existing) {
          const tag = await prisma.productTag.create({
            data: { productId: pId, contentId },
            include: { product: true }
          });
          tags.push(tag);
        }
      }

      return tags;
    },
    likeContent: async (_: any, { contentId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await prisma.like.create({
        data: { userId: context.user.uid, contentId }
      }).catch(e => {
        if (e.code !== 'P2002') throw e;
      });
      
      const content = await prisma.content.findUnique({ where: { id: contentId } });
      if (content && content.userId !== context.user.uid) {
        await prisma.notification.create({
          data: {
            userId: content.userId,
            actorId: context.user.uid,
            type: 'LIKE',
            message: 'liked your post'
          }
        });
      }
      return true;
    },
    unlikeContent: async (_: any, { contentId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      await prisma.like.deleteMany({
        where: { userId: context.user.uid, contentId }
      });
      return true;
    },
    commentContent: async (_: any, { contentId, text }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const comment = await prisma.comment.create({
        data: { userId: context.user.uid, contentId, text },
        include: { user: true }
      });
      
      const content = await prisma.content.findUnique({ where: { id: contentId } });
      if (content && content.userId !== context.user.uid) {
        await prisma.notification.create({
          data: {
            userId: content.userId,
            actorId: context.user.uid,
            type: 'COMMENT',
            message: `commented: ${text}`
          }
        });
      }
      return comment;
    },
    sendMessage: async (_: any, { receiverId, text, sharedContentId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const myId = context.user.uid;
      
      const message = await prisma.message.create({
        data: {
          senderId: myId,
          receiverId,
          text,
          sharedContentId
        },
        include: { sender: true, sharedContent: { include: { user: true } } }
      });
      
      // Optionally notify
      await prisma.notification.create({
        data: {
          userId: receiverId,
          actorId: myId,
          type: 'MESSAGE',
          message: sharedContentId ? 'shared a post with you' : 'sent you a message'
        }
      });
      
      // Send push notification to receiver
      const receiver = await prisma.user.findUnique({ where: { id: receiverId }, select: { pushToken: true, name: true } });
      const sender = await prisma.user.findUnique({ where: { id: context.user.uid }, select: { name: true } });
      if (receiver?.pushToken) {
        sendPushNotification({ to: receiver.pushToken, title: sender?.name || 'Someone', body: text || 'Sent you a message', data: { type: 'message', userId: context.user.uid }, sound: 'default' });
      }
      
      try {
        const chatId = [myId, receiverId].sort().join('_');
        await db.collection('chats').doc(chatId).collection('messages').doc(message.id).set({
          id: message.id,
          text: message.text || null,
          senderId: message.senderId,
          receiverId: message.receiverId,
          createdAt: message.createdAt.toISOString(),
          isRead: false,
          sharedContentId: message.sharedContentId || null,
          sender: {
            id: myId,
            name: sender?.name || null
          }
        });
      } catch (err) {
        console.error("Firestore sync failed:", err);
      }

      return message;
    },
    markConversationRead: async (_: any, { userId }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const myId = context.user.uid;
      
      await prisma.message.updateMany({
        where: { senderId: userId, receiverId: myId, isRead: false },
        data: { isRead: true }
      });
      
      try {
        const chatId = [myId, userId].sort().join('_');
        const batch = db.batch();
        const unreadDocs = await db.collection('chats').doc(chatId).collection('messages')
          .where('receiverId', '==', myId)
          .where('isRead', '==', false).get();
        
        unreadDocs.forEach(doc => {
          batch.update(doc.ref, { isRead: true });
        });
        await batch.commit();
      } catch (err) {
        console.error("Firestore read update failed:", err);
      }

      return true;
    },
    createPaymentIntent: async (_: any, { amount }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
      return paymentIntent.client_secret;
    },
    createOrder: async (_: any, { items, paymentIntentId, shippingAddress }: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const myId = context.user.uid;
      
      const totalAmount = items.reduce((acc: number, item: any) => acc + (item.quantity * item.priceAtPurchase), 0);
      
      const order = await prisma.order.create({
        data: {
          userId: myId,
          totalAmount,
          status: paymentIntentId ? 'PAID' : 'PENDING',
          stripePaymentIntentId: paymentIntentId,
          shippingAddress,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase
            }))
          }
        },
        include: { items: { include: { product: true } } }
      });
      
      return order;
    },
    exportWatermarkedVideo: async (_: any, { contentId }: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      
      // 1. Get the content
      const content = await prisma.content.findUnique({
        where: { id: contentId },
        select: { mediaUrl: true, type: true, user: { select: { username: true } } }
      });

      if (!content || !content.mediaUrl || content.type !== 'video') {
        throw new Error("Invalid content for video export");
      }

      // Simulate heavy video processing (FFmpeg watermarking)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. In a real scenario we would upload the watermarked video to Google Cloud Storage.
      // For the MVP, we just append a mock token/watermark flag to the URL so the frontend can share it.
      const exportedUrl = `${content.mediaUrl}?watermarked=true&author=${content.user.username}`;
      
      return exportedUrl;
    },
    payVenue: async (_: any, { venueId, amount }: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      if (amount <= 0) throw new Error("Amount must be positive");

      return await prisma.$transaction(async (tx) => {
        // Check if user has sufficient funds
        let userWallet = await tx.wallet.findUnique({ where: { userId: context.user.uid } });
        if (!userWallet || userWallet.balance < amount) {
          throw new Error("Insufficient funds");
        }

        // Check if venue has a wallet (the venueId corresponds to a Storefront or User)
        // Assume venueId is a storefront. Let's find its owner's wallet.
        const storefront = await tx.storefront.findUnique({ where: { id: venueId } });
        if (!storefront) throw new Error("Venue not found");

        let venueWallet = await tx.wallet.findUnique({ where: { userId: storefront.userId } });
        if (!venueWallet) {
          venueWallet = await tx.wallet.create({ data: { userId: storefront.userId, balance: 0 } });
        }

        // Debit User
        userWallet = await tx.wallet.update({
          where: { id: userWallet.id },
          data: { balance: { decrement: amount } }
        });

        await tx.transaction.create({
          data: { walletId: userWallet.id, amount: -amount, type: 'purchase', description: `Paid at ${storefront.name}` }
        });

        // Credit Venue
        await tx.wallet.update({
          where: { id: venueWallet.id },
          data: { balance: { increment: amount } }
        });

        await tx.transaction.create({
          data: { walletId: venueWallet.id, amount: amount, type: 'sale', description: `Sale from ${context.user.uid}` }
        });

        return true;
      });
    },
    cashOutWallet: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      const user = await prisma.user.findUnique({ where: { id: context.user.uid }, include: { wallet: true } });
      if (!user || !user.wallet) throw new GraphQLError("Wallet not found");
      
      const balance = user.wallet.balance;
      if (balance < 2000) {
        throw new GraphQLError("Minimum cash out is $20");
      }

      if (!user.stripeAccountId) {
        const { createConnectAccount } = require('./services/stripe');
        const { accountId, url } = await createConnectAccount(user.id, user.email);
        
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeAccountId: accountId }
        });
        
        return { status: "REQUIRES_ONBOARDING", url };
      }

      const { processPayout } = require('./services/stripe');
      try {
        await processPayout(user.stripeAccountId, balance);
        
        await prisma.wallet.update({
          where: { id: user.wallet.id },
          data: { balance: 0 }
        });
        
        await prisma.transaction.create({
          data: {
            walletId: user.wallet.id,
            amount: -balance,
            type: 'CASH_OUT',
            description: 'Wallet cash out to bank account'
          }
        });
        
        return { status: "SUCCESS", url: null };
      } catch (err: any) {
        throw new GraphQLError(err.message || "Payout failed");
      }
    }
  },
  
  ProductTag: {
    product: (parent: any) => prisma.product.findUnique({ where: { id: parent.productId } })
  }
};

async function startServer() {
  const app = express();
  
  // Basic Password Auth for Admin API
  const adminAuth = (req: any, res: any, next: any) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login && password && login === 'admin' && password === 'icebreaker2026') {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
  };

  // Serve static admin dashboard
  app.use('/admin', adminAuth, express.static(path.join(__dirname, '../admin')));

  // Detailed Analytics API for Analyst review
  app.get('/api/admin/stats', adminAuth, async (req, res) => {
    try {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Acquisition & Retention
      const totalUsers = await prisma.user.count();
      const mau = await prisma.user.count({ where: { lastActiveAt: { gte: thirtyDaysAgo } } });
      const dau = await prisma.user.count({ where: { lastActiveAt: { gte: oneDayAgo } } });

      // Engagement
      const totalCheckIns = await prisma.checkIn.count();
      const totalRequests = await prisma.meetingRequest.count();
      const acceptedRequests = await prisma.meetingRequest.count({ where: { status: 'ACCEPTED' } });
      const acceptanceRate = totalRequests > 0 ? (acceptedRequests / totalRequests) * 100 : 0;

      // Business & Marketing: Top locations (Group by locationName)
      const topLocations = await prisma.meetingRequest.groupBy({
        by: ['locationName'],
        _count: { locationName: true },
        orderBy: { _count: { locationName: 'desc' } },
        take: 10,
      });

      // Trust & Safety
      const users = await prisma.user.findMany({ select: { trustScore: true } });
      const avgTrustScore = users.length > 0 ? users.reduce((acc, u) => acc + u.trustScore, 0) / users.length : 5.0;

      // Openness Signals
      const profiles = await prisma.opennessProfile.findMany({ select: { activeColors: true } });
      const colorCounts: Record<string, number> = {};
      profiles.forEach(p => p.activeColors.forEach(c => {
        colorCounts[c] = (colorCounts[c] || 0) + 1;
      }));

      res.json({
        acquisition: { totalUsers, dau, mau },
        engagement: { totalCheckIns, totalRequests, acceptedRequests, acceptanceRate },
        business: { topLocations },
        trust: { avgTrustScore },
        signals: colorCounts
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock');
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      if (session.client_reference_id) {
        await prisma.bounty.update({
          where: { id: session.client_reference_id },
          data: { paymentStatus: 'PAID', isActive: true },
        });
      }
    }
    res.json({ received: true });
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
      // Log errors to console in backend for monitoring
      console.error(formattedError);
      return formattedError;
    },
  });
  
  await server.start();
  
  app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_123');
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.id) {
        await prisma.bounty.updateMany({
          where: { stripeSessionId: session.id },
          data: {
            isActive: true,
            paymentStatus: 'PAID'
          }
        });
        
        await prisma.swarmCampaign.updateMany({
          where: { stripeSessionId: session.id },
          data: {
            isActive: true,
            paymentStatus: 'PAID'
          }
        });
        console.log(`[Stripe Webhook] Payment completed for session: ${session.id}`);
      }
    }

    res.json({ received: true });
  });

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    (expressMiddleware(server, {
      context: async ({ req }: any) => {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (token) {
          try {
            const decodedToken = await getAuth().verifyIdToken(token);
            return { user: decodedToken };
          } catch (e) {
            console.error('Error verifying auth token', e);
          }
        }
        // Fallback for dev purposes without auth token
        return { user: { uid: 'dev-user-id' } }; 
      },
    }) as any),
  );
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📊 Admin Dashboard ready at http://localhost:${PORT}/admin`);
  });

  setInterval(runPredictiveMatchmaking, 5 * 60 * 1000);
}

if (require.main === module) {
  startServer().catch(console.error);
}
