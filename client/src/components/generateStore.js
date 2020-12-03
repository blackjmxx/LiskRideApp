import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import reducers from '../bootstrap/reducers'

const middleware = [thunk, apiMiddleware, logger]

export default function configureStore (initialState) {
  return createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  )
}
