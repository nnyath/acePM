import React from 'react'
import { shallow } from 'enzyme'
import update from 'immutability-helper'
import Sinon from 'sinon'

import configureStore from 'redux-mock-store'

import {_setState,_state,_wait} from '../../../js/util/tests/testutil'
import consts from '../../../js/util/consts'

import Splash from '../../../js/containers/Splash/Splash'


describe('init', ()=>{

    const initialState = { main : {init: false }} 
    let store, wrapper

    beforeEach(()=>{
        store = configureStore()(initialState)
        wrapper = shallow(<Splash/>, {context:{store:store}})
    })

    afterEach(()=>{
    })

    it('renders correctly', () => {
        expect(wrapper.dive()).toMatchSnapshot()
    })

})



