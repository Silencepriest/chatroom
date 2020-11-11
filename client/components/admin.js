import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'

import { socket } from '../redux/index'

function Admin() {
  const { token } = useSelector((db) => db.auth)
  const { connections } = useSelector((db) => db.message)
  useEffect(() => {
    socket.connect()
    socket.emit('get connections', token.token)
  }, [])
  return (
    <div>
      {Object.keys(connections).map((connection) => {
        return (
          <div key={uuid()}>
            <b>{`${connections[connection]} (${connection})`}</b>
            <button
              type="button"
              className="px-4 py-2 bg-red-600"
              onClick={() => {
                socket.emit('disconnect user', { jwttoken: token.token, socketId: connection })
              }}
            >
              Kick
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Admin
