import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import io from 'socket.io-client'

import { addReceivedMessage } from './reducers/message'
import rootReducer from './reducers'
import createHistory from './history'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)

export const socket = io('http://localhost:8090', { transports: ['websocket'], autoConnect: false })
socket.on('connect', () => {
  const { token } = store.getState().auth
  socket.emit('auth', token.token)
})
socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    socket.connect()
  }
})
socket.on('incoming message', (msg) => store.dispatch(addReceivedMessage(msg)))

socket.on('get all messages', (msg) => {
  console.log(msg)
  msg.forEach((message) => {
    store.dispatch(addReceivedMessage(message))
  })
})

export default store
