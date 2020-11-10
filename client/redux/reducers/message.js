const initValues = {
  pendingMessage: '',
  receivedMessages: []
}

const SET_PENDING_MESSAGE = 'SET_PENDING_MESSAGE'
const SET_RECEIVED_MESSAGE = 'SET_RECEIVED_MESSAGE'

export function setPendingMessage(message) {
  return {
    type: SET_PENDING_MESSAGE,
    payload: message
  }
}

export function addReceivedMessage(message) {
  return {
    type: SET_RECEIVED_MESSAGE,
    payload: message
  }
}

function Message(store = initValues, action) {
  switch (action.type) {
    case SET_PENDING_MESSAGE:
      return {
        ...store,
        pendingMessage: action.payload
      }
    case SET_RECEIVED_MESSAGE:
      return {
        ...store,
        receivedMessages: [...store.receivedMessages, action.payload]
      }
    default:
      return { ...store }
  }
}

export default Message
