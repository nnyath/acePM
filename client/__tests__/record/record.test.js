import React from 'react'
import { shallow } from 'enzyme'
import Sinon from 'sinon'

import mockAudio from '../../__mocks__/Audio'
jest.mock('react-native-audio', () => mockAudio)

import Record from '../../components/record/record'

//Setup
const wrapper = shallow(<Record/>)

it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

describe('Testing Record Button', ()=>{

    it('calls fn on button presses', () => {
        const render = wrapper.dive()
        const stateSpy = Sinon.spy(mockAudio.AudioRecorder, 'startRecording')
        
        render.find('Button').forEach(child => {
            child.simulate('press')
        })

        expect(stateSpy.calledOnce).toBe(false)

    })

})

