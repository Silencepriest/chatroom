const initValues = {
  pendingMessage: ''
}

const SET_PENDING_MESSAGE = 'SET_PENDING_MESSAGE'

export function setPendingMessage(message) {
  return {
    type: SET_PENDING_MESSAGE,
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
    default:
      return { ...store }
  }
}

export default Message
