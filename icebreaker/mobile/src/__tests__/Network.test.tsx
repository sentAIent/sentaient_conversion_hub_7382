import React from 'react';
import { render } from '@testing-library/react-native';
import NetworkScreen from '../app/(tabs)/network';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  gql: jest.fn(),
  useQuery: () => ({
    data: {
      myMeetingRequests: [
        {
          id: '1',
          senderId: 'dev-user-id',
          receiverId: 'other-user',
          status: 'PENDING',
          proposedTime: new Date().toISOString(),
          locationName: 'Test Cafe',
          createdAt: new Date().toISOString(),
        }
      ]
    },
    loading: false,
    error: null,
  }),
  useMutation: () => [jest.fn(), { loading: false }],
}));

describe('NetworkScreen', () => {
  it('renders pending meeting requests correctly', async () => {
    const { findByText } = render(
      <NetworkScreen />
    );

    const title = await findByText('Inbox');
    expect(title).toBeTruthy();
    
    // Check if the mock meeting request location renders
    const cafeText = await findByText('Test Cafe');
    expect(cafeText).toBeTruthy();
  });
});
