import 'react-native'
import React from 'react'

import mockAudio from '../util/tests/mocks/Audio'
import mockRNFB from '../util/tests/mocks/RNFB'
jest.mock('react-native-audio', () => mockAudio)
jest.mock('react-native-fetch-blob', () => mockRNFB)
import Index from '../index.android.js'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
