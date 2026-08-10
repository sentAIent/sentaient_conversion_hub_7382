import React from 'react';
import render from 'react-test-renderer';
import App from './App';

describe('<App />', () => {
  it('renders correctly without crashing', () => {
    const tree = render.create(<App />).toJSON();
    expect(tree).toBeTruthy();
  });

  it('renders sentAIent brand title', () => {
    const component = render.create(<App />);
    const root = component.root;
    const titles = root.findAllByProps({ children: 'sentAIent' });
    expect(titles.length).toBeGreaterThan(0);
  });
});
