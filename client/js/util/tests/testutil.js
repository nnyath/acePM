/*
    - Various test utilities for Enzyme / Jest
    - Enzyme does not support alpha versions of React
    - Currently React Native 45+ uses React 16.X.X alpha, 
        hence the need for these helper functions
    - https://mcculloughwebservices.com/2017/06/24/react-native-45-errors-jest/
*/

import consts from '../consts'

/* Return state of Enzyme shallow wrapper */
const _state = wrapper => wrapper.renderer._instance.state

/* Set state of Enzyme shallow wrapper */
const _setState = (wrapper, update) => wrapper.renderer._instance.state = update

const _instance = (wrapper) => wrapper.renderer._instance

/* 
    - Utilty to force a sync timeout using ES6 await
    - Useful for UI testing since simulating presses will not return a promise/callback
 */
const _wait = (ms) => new Promise(resolve => setTimeout(()=>resolve(),ms ? ms : consts.WAIT_TIME))

module.exports = {_state,_setState,_wait,_instance}