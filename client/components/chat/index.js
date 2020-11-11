import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socket } from '../../redux/index'
import LeftBar from './left-bar'
import Head from './head'
import MessageWindow from './message-window'
import MessageInput from './message-input'

function Chat() {
  const { currentChannel } = useSelector((db) => db.message)
  useEffect(() => {
    socket.connect()
    socket.emit('channel', currentChannel)
    socket.emit('get all messages', currentChannel)
  }, [])
  return (
    <div className="w-full border shadow bg-white">
      <div className="flex">
        <LeftBar />
        <div className="w-full flex flex-col">
          <Head />
          <MessageWindow />
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

export default Chat
