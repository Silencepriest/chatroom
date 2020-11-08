import React from 'react'

function Head() {
  return (
    <div className="border-b flex px-6 py-2 items-center">
      <div className="flex flex-col">
        <h3 className="text-grey-900 text-md mb-1 font-extrabold">#general</h3>
        <div className="text-grey-200 font-thin text-sm">
          Chit-chattin about ugly HTML and mixing of concerns.
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <input type="search" placeholder="Search" className="border border-grey rounded-lg p-2" />
      </div>
    </div>
  )
}

export default Head
