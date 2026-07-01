import '@testing-library/jest-native/extend-expect';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    __esModule: true,
    Ionicons: () => React.createElement('Ionicons', null),
    MaterialIcons: () => React.createElement('MaterialIcons', null),
  };
}, { virtual: true });

jest.mock('expo-blur', () => {
  const React = require('react');
  return {
    __esModule: true,
    BlurView: (props: any) => React.createElement('BlurView', props, props.children),
  };
}, { virtual: true });

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => Promise.resolve({ coords: { latitude: 37.7749, longitude: -122.4194 } })),
}), { virtual: true });
