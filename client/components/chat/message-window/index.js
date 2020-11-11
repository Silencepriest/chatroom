import React from 'react'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'

import Message from './message'

function MessageWindow() {
  const { receivedMessages } = useSelector((db) => db.message)
  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      {receivedMessages.map((message) => {
        return <Message key={uuid()} data={message} />
      })}
    </div>
  )
}

export default MessageWindow
