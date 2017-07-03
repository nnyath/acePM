import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

import reducers from '../reducers/reducers'

const middleware = applyMiddleware(promiseMiddleware(), thunk, logger)

export default createStore(reducers, middleware)