import React from 'react'

function Message(props) {
  const messageTime = new Date(+props.data[2])
  return (
    <div className="flex items-start mb-4">
      <img
        alt="avatar"
        src="https://avatars2.githubusercontent.com/u/343407?s=460&v=4"
        className="w-10 h-10 rounded mr-3"
      />
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="font-bold text-md mr-2 font-sans">{props.data[1]}</span>
          <span className="text-grey-200 text-xs font-light">{messageTime.toString()}</span>
        </div>
        <p className="font-light text-md text-grey-darkest pt-1">{props.data[0]}</p>
      </div>
    </div>
  )
}

export default Message
