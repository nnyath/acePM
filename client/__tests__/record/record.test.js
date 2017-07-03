import React from 'react'
import { shallow } from 'enzyme'
import update from 'immutability-helper'
import Sinon from 'sinon'
import {_setState,_state,_wait} from '../../util/testutil'
import consts from '../../util/consts'

import mockRNFB from '../../__mocks__/RNFB'
import mockAudio from '../../__mocks__/Audio'
jest.mock('react-native-audio', () => mockAudio)
jest.mock('react-native-fetch-blob', ()=>mockRNFB)

import {AudioRecorder} from 'react-native-audio'
import Record from '../../components/record/record'



it('renders correctly', () => {
    const wrapper = shallow(<Record/>)
    expect(wrapper).toMatchSnapshot()
})

describe('recording button',  () =>{

    it('records with sufficient permissions', async () => {
        
        const recordSpy = Sinon.spy(AudioRecorder, 'startRecording')
        const wrapper = shallow(<Record/>)
        const render = wrapper.dive()


        _setState(wrapper, update(_state(wrapper), {permissions:{mic:{$set:true}}} ))
        
        render.find(`#${consts.UI.RECORD_BUTTON.ID}`).forEach(child => child.simulate('press'))
        await _wait()
        expect(recordSpy.calledOnce).toBe(true)
        recordSpy.restore()

    })

    it('does not record with sufficient permissions', async () => {

        const recordSpy = Sinon.spy(AudioRecorder, 'startRecording')
        const wrapper = shallow(<Record/>)
        const render = wrapper.dive()

        _setState(wrapper, update(_state(wrapper), {permissions:{mic:{$set:false}}} ))

        render.find(`#${consts.UI.RECORD_BUTTON.ID}`).forEach(child => child.simulate('press'))
        await _wait()
        expect(recordSpy.notCalled).toBe(true)
        recordSpy.restore()

    })

})

