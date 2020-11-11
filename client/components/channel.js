import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux'

import { setNewChannel, setNewChannelName } from '../redux/reducers/message'

const Channel = () => {
  const dispatch = useDispatch()
  const { newChannel } = useSelector((db) => db.message)
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Channel Name
          </label>
          <input
            type="text"
            value={newChannel}
            onChange={(e) => dispatch(setNewChannelName(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="Username"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              dispatch(setNewChannel())
              history.push('/')
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Channel
