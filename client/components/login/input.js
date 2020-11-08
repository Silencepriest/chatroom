import React from 'react'
import { useDispatch } from 'react-redux'

function InputField({ inputType, value, action }) {
  const dispatch = useDispatch()
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        {inputType}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={inputType.toLowerCase()}
        type="text"
        placeholder={inputType}
        value={value}
        onChange={(e) => dispatch(action(e.target.value))}
      />
    </div>
  )
}

export default InputField
