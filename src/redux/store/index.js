import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reduces from '../reducers'

const middlewares = [thunk]

const store = createStore(reduces, applyMiddleware(...middlewares))

export default store
