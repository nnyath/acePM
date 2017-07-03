import React from 'react'
import { shallow } from 'enzyme'
import update from 'immutability-helper'
import Sinon from 'sinon'
import {_setState,_state,_wait} from '../../js/util/tests/testutil'
import consts from '../../js/util/consts'

import mockRNFB from '../../js/util/tests/mocks/RNFB'
import mockAudio from '../../js/util/tests/mocks/Audio'
jest.mock('react-native-audio', () => mockAudio)
jest.mock('react-native-fetch-blob', ()=>mockRNFB)

import {AudioRecorder} from 'react-native-audio'
import Record from '../../js/components/record/record'



it('renders correctly', () => {
    const wrapper = shallow(<Record/>)
    expect(wrapper).toMatchSnapshot()
})

describe('recording button',  () =>{

    let recordSpy,wrapper,render

    beforeEach(()=>{
        recordSpy = Sinon.spy(AudioRecorder, 'startRecording')
        wrapper = shallow(<Record/>)
        render = wrapper.dive()
    })

    afterEach(()=>{
        recordSpy.restore()
    })

    it('records with sufficient permissions', async () => {
        
        _setState(wrapper, update(_state(wrapper), {permissions:{mic:{$set:true}}} ))
        
        render.find(`#${consts.UI.RECORD_BUTTON.ID}`).forEach(child => child.simulate('press'))
        await _wait()
        expect(recordSpy.calledOnce).toBe(true)

    })

    it('does not record with sufficient permissions', async () => {

        _setState(wrapper, update(_state(wrapper), {permissions:{mic:{$set:false}}} ))

        render.find(`#${consts.UI.RECORD_BUTTON.ID}`).forEach(child => child.simulate('press'))
        await _wait()
        expect(recordSpy.notCalled).toBe(true)
        
    })

})

