import React from 'react'
import { Dropdown } from 'rsuite';

const Search = () => {
  return (
    <div className='w-full'>
    
      <div className=" lg:mx-[9%] sm:mx-2 my-3 ">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-black bg-white border rounded-full focus:border-newPeach focus:ring-newPeach focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    // onKeyUp={search}
                />
                <button className="px-4 text-white bg-btnColor rounded-full ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Search