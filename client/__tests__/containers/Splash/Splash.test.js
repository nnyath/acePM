import React from 'react'
import { shallow } from 'enzyme'
import update from 'immutability-helper'
import Sinon from 'sinon'

import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import configureStore from 'redux-mock-store'

import {_setState,_state,_wait,_instance} from '../../../js/util/tests/testutil'
import consts from '../../../js/util/consts'

import Splash from '../../../js/containers/Splash/Splash'
import * as actions from '../../../js/containers/Splash/actions'
import main from '../../../js/reducers/main'

const middlewares = [thunk,promiseMiddleware()]

const initialState = { main : {init: false }} 
let store, wrapper, instance, spy

beforeEach(()=>{
    store = configureStore(middlewares)(initialState)
    wrapper = shallow(<Splash/>, {context:{store:store}})
    instance = _instance(wrapper.dive())
    spy = null
})

afterEach(()=>{
    spy && spy.restore()
})

describe('initial render', ()=>{

    it('renders correctly', () => {
        expect(wrapper.dive()).toMatchSnapshot()
    })

})

describe('simulate loading messages', ()=>{

    it('starts loading ellipses when loading', () => {
        instance.iterateMsg = (msgs,count)=>{}
        spy = Sinon.spy(instance, 'startEllipses')
        instance.simulateLoading(consts.UI.LOADING_MESSAGES,1)
        expect(spy.calledOnce).toBe(true)
    })

    it('updates current loading messages', async ()=>{
        instance.simulateLoading(consts.UI.LOADING_MESSAGES,1,10)
        await _wait(10)
        expect(instance.state.info).not.toBe('Loading')
    })

    it('stops loading ellipses when loaded', async () => {
        instance.iterateMsg = (msgs,count)=>{}
        spy = Sinon.spy(instance, 'stopEllipses')
        await instance.simulateLoading(consts.UI.LOADING_MESSAGES,1)
        expect(spy.calledOnce).toBe(true)
    })

    it('dispatches action when loaded', async () => {
        spy = Sinon.spy(actions,'initLoad')
        await instance.simulateLoading(consts.UI.LOADING_MESSAGES,1)
        expect(spy.calledOnce).toBe(true)
    })

})

describe('ellipses', ()=>{

    it('updates ellipses state after loading', async ()=>{
        instance.state.ellipses.rate = 1
        instance.startEllipses()
        await _wait(2)
        expect(instance.state.ellipses.display).not.toBe('')
    })

    it('destroys ellipses setInterval after loaded', async () => {
        instance.iterateMsg = (msgs,count)=>{}
        await instance.stopEllipses()
        expect(instance.state.ellipses.handler).toBe(null)
    })

})

describe('loading messages iteration', ()=>{

    it('errors when invalid messages array is passed', async ()=>{
        await expect(instance.iterateMsg('notanarray',0)).rejects.toEqual(Error('Invalid loading messages'))
    })

    it('continues when max+ count is passed', async ()=>{
        expect(await instance.iterateMsg(['MIN','MAX'],3,10)).toEqual([])
    })
    
    it('finally returns remaining messages', async ()=>{
        expect((await instance.iterateMsg(['One','Two','Three'],2,10)).length).toBe(1)
    })

    it('sets state.info (loading message) on each iteration',()=>{
        
    })

})

describe('redux actions', ()=>{

    it('initLoad is successful', async ()=>{

        actions.initLoad = () => ({
            type:consts.REDUX.INIT_LOADING,
            payload:Promise.resolve(true)
        })

        const { action } = await store.dispatch(actions.initLoad())
        expect(action.type).toBe(consts.REDUX.INIT_LOADING_FULFILLED)
        expect(action.payload).toBe(true)
    })

    /* TODO: Further investigate Thunk reject with redux mock store */
    it('initLoad is unsuccessful', async ()=>{

        actions.initLoad = () => ({
            type:consts.REDUX.INIT_LOADING,
            payload:Promise.reject('Should return _REJECTED action')
        })

        const { action } = await store.dispatch(actions.initLoad())
        expect(action.type).toBe(consts.REDUX.INIT_LOADING_REJECTED)

    })

})

describe('redux reducers', ()=>{
    it(`should set init:true on ${consts.INIT_LOADING_FULFILLED}`, ()=>{
        expect(main({init:false},{type:consts.REDUX.INIT_LOADING_FULFILLED,payload:true})).toMatchSnapshot()
    })
})
