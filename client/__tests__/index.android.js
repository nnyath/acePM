import 'react-native';
import React from 'react';

import mockAudio from '../__mocks__/Audio'
jest.mock('react-native-audio', () => mockAudio)

import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON()
  expect(tree).toMatchSnapshot()
});
