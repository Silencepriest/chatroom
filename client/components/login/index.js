import React from 'react'
import { useSelector } from 'react-redux'

import InputField from './input'
import Button from './button'
import { setPassword, setUsername } from '../../redux/reducers/auth'

function Login() {
  const { username, password } = useSelector((db) => db.auth)
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <InputField inputType="Username" value={username} action={setUsername} />
        </div>
        <div className="mb-6">
          <InputField inputType="Password" value={password} action={setPassword} />
        </div>
        <Button />
      </div>
      <p className="text-center text-gray-500 text-xs">&copy;2020 Silenthunt</p>
    </div>
  )
}

export default Login
