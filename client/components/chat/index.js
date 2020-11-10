import React, { useEffect } from 'react'

import { socket } from '../../redux/index'
import LeftBar from './left-bar'
import Head from './head'
import MessageWindow from './message-window'
import MessageInput from './message-input'

function Chat() {
  useEffect(() => {
    socket.connect()
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
