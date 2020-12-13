import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import products from './products'
import logsReducer from './logsReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    logsReducer
  })

export default createRootReducer
