jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  applicationDefault: jest.fn(),
}));

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

jest.mock('firebase-admin/messaging', () => ({
  getMessaging: jest.fn(() => ({
    send: jest.fn(),
  })),
}));

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: { findUnique: jest.fn(), update: jest.fn() },
      checkIn: { create: jest.fn(), updateMany: jest.fn(), findMany: jest.fn() },
      meetingRequest: { create: jest.fn(), update: jest.fn(), findUnique: jest.fn(), findMany: jest.fn() },
      opennessProfile: { upsert: jest.fn() },
    })),
    PrivacyTier: {},
    Color: {}
  };
});

import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '../server';

describe('GraphQL API', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  afterAll(async () => {
    await server.stop();
  });

  it('fails query if unauthenticated', async () => {
    const response = await server.executeOperation(
      {
        query: `query { me { id name } }`,
      },
      {
        contextValue: { user: null },
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeDefined();
      expect(response.body.singleResult.errors![0].extensions?.code).toBe('UNAUTHENTICATED');
    }
  });

  it('rejects presigned url if content type is invalid', async () => {
    const response = await server.executeOperation(
      {
        query: `mutation { getPresignedUploadUrl(contentType: "application/pdf") { uploadUrl } }`,
      },
      {
        contextValue: { user: { uid: 'test-user' } },
      }
    );

    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeDefined();
      expect(response.body.singleResult.errors![0].extensions?.code).toBe('BAD_USER_INPUT');
    }
  });
});
