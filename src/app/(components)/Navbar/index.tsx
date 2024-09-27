import React from 'react'
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
        {/* Searchbar */}
        <div className='flex- items-center gap-8'>
            {/* Container */}
            <div className='relative flex h-min w-[200px]'>
                {/* Search icon set to left of the container. Transform cursor if hovered over*/}
                <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
                <input
                    className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white' 
                    type="search" 
                    placeholder="Search.."
                />
            </div>
        </div>
    </div>
  )
}

export default Navbar