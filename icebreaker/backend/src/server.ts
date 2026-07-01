import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { PrismaClient, PrivacyTier, Color } from '@prisma/client';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import path from 'path';

dotenv.config({ override: true });

const prisma = new PrismaClient();

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  initializeApp({
    credential: applicationDefault(),
  });
}

// Cloudflare R2 / S3 Setup
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://<ACCOUNT_ID>.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

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

  type Notification {
    id: ID!
    type: String!
    message: String
    isRead: Boolean!
    createdAt: String!
    actor: User
  }

  type Query {
    me: User
    activeCheckIns: [CheckIn!]!
    myMeetingRequests: [MeetingRequest!]!
    nearbyUsers(latitude: Float!, longitude: Float!, radiusKm: Float!): [NearbyMatch!]!
    adminAnalytics(password: String!): AdminAnalytics!
    followerFeed: [FeedItem!]!
    exploreFeed: [FeedItem!]!
    followerStories: [Content!]!
    pendingFollowRequests: [User!]!
    followStatus(userId: ID!): String!
    alerts: [Notification!]!
  }

  type Mutation {
    createOrUpdateCheckIn(location: LocationInput!): CheckIn
    updateOpennessProfile(activeColors: [String!]!, showOnColorMap: Boolean!): OpennessProfile
    updateUserDetails(name: String, username: String, bio: String, profilePhotoUrl: String): User
    getPresignedUploadUrl(contentType: String!): PresignedUrl
    sendMeetingRequest(receiverId: ID!, proposedTime: String!, locationName: String!): MeetingRequest
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
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      const items = [...checkIns, ...contents].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return items;
    },
    exploreFeed: async (_: any, __: any, context: any) => {
      if (!context.user) throw new GraphQLError("Unauthorized", { extensions: { code: 'UNAUTHENTICATED' } });
      
      const checkIns = await prisma.checkIn.findMany({
        where: { isActive: true },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 30
      });

      const contents = await prisma.content.findMany({
        where: { isDeleted: false, isMoment: false },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
        take: 30
      });

      const items = [...checkIns, ...contents].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return items;
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
    }
  },
  Mutation: {
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
          const sender = await prisma.user.findUnique({ where: { id: request.senderId } });
          if (sender && sender.pushToken) {
            await getMessaging().send({
              token: sender.pushToken,
              notification: { title: "Meeting Accepted! 🎉", body: `Your meeting at ${request.locationName} was accepted.` }
            });
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
    }
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
  
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    (expressMiddleware(server, {
      context: async ({ req }: any) => {
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (token && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
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
}

if (require.main === module) {
  startServer().catch(console.error);
}
