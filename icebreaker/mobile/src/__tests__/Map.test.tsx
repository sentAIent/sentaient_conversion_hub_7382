import React from 'react';
import { render } from '@testing-library/react-native';
import MapScreen from '../app/(tabs)/index';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const React = require('react');
  const MapView = (props: any) => React.createElement('MapView', props, props.children);
  const Marker = (props: any) => React.createElement('Marker', props, props.children);
  const Callout = (props: any) => React.createElement('Callout', props, props.children);
  MapView.Marker = Marker;
  MapView.Callout = Callout;
  return {
    __esModule: true,
    default: MapView,
    Marker,
    Callout,
  };
});

jest.mock('@apollo/client', () => ({
  gql: jest.fn(),
  useQuery: () => ({
    data: {
      nearbyUsers: [
        {
          id: 'test-user',
          name: 'Test Map User',
          bio: 'Test bio',
          lastKnownLocation: {
            lat: 37.7749,
            lng: -122.4194,
          },
        }
      ]
    },
    loading: false,
    error: null,
  }),
  useMutation: () => [jest.fn(), { loading: false }],
}));

describe('MapScreen', () => {
  it('renders the map', async () => {
    const { findByText } = render(<MapScreen />);

    // Verify map view controls are rendered after loading
    expect(await findByText('Broadcast Location')).toBeTruthy();
  });
});
