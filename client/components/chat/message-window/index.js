import React from 'react'

import Message from './message'

function MessageWindow() {
  return (
    <div className="px-6 py-4 flex-1 overflow-scroll-x">
      <Message />
    </div>
  )
}

export default MessageWindow
