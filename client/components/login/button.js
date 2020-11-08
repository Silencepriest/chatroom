import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'

import { addUser } from '../../redux/reducers/auth'

function Button() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isRegistration = pathname === '/register'
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => dispatch(addUser(isRegistration))}
      >
        {isRegistration ? 'Sign In' : 'Log In'}
      </button>
      {isRegistration ? (
        <Link className="text-gray-700" to="/login">
          login
        </Link>
      ) : (
        <Link className="text-gray-700" to="/register">
          registration
        </Link>
      )}
    </div>
  )
}

export default Button
