const initValues = {
  pendingMessage: '',
  currentChannel: 'general',
  newChannel: '',
  receivedMessages: []
}

const SET_PENDING_MESSAGE = 'SET_PENDING_MESSAGE'
const SET_RECEIVED_MESSAGE = 'SET_RECEIVED_MESSAGE'
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL'
const SET_CURRENT_CHANNEL_NAME = 'SET_CURRENT_CHANNEL_NAME'

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

export function setNewChannelName(newName) {
  return {
    type: SET_CURRENT_CHANNEL_NAME,
    payload: newName
  }
}

export function setNewChannel() {
  return (dispatch, getState) => {
    const { newChannel } = getState().message
    dispatch({ type: SET_CURRENT_CHANNEL, payload: newChannel })
  }
}

function Message(store = initValues, action) {
  switch (action.type) {
    case SET_CURRENT_CHANNEL_NAME:
      return {
        ...store,
        newChannel: action.payload
      }
    case SET_CURRENT_CHANNEL:
      return {
        ...store,
        currentChannel: action.payload
      }
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
