import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socket } from '../../redux/index'
import { setPendingMessage } from '../../redux/reducers/message'

function MessageInput() {
  const dispatch = useDispatch()
  const { pendingMessage } = useSelector((store) => store.message)
  return (
    <div className="flex m-6 rounded-lg border-2 border-grey overflow-hidden">
      <span className="text-3xl text-grey px-3 border-r-2 border-grey">+</span>
      <input
        type="text"
        value={pendingMessage}
        onChange={(e) => dispatch(setPendingMessage(e.target.value))}
        className="w-full px-4"
        placeholder="Message to #general"
      />
      <button type="button" onClick={() => socket.emit('chat message', 'we fucking did it!!!11')}>FUCKING SEND!</button>
    </div>
  )
}

export default MessageInput
