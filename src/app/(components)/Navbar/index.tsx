import React from 'react'
import { Menu, Moon, Search, Settings, Sun } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setDarkMode, setSidebarCollapsed } from '@/state';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)
  const darkMode = useAppSelector((state) => state.global.darkMode)

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
        {/* Searchbar */}
        <div className='flex- items-center gap-8'>
          {/* Sidebar menu icon - create menu button if sidebar is collapsed */}
            {!sidebarCollapsed ? null : (
              <button onClick={() => dispatch(setSidebarCollapsed(!sidebarCollapsed))}>
                <Menu className='h-8 w-8 dark:text-white'/>
              </button>
            )}
            {/* Container */}
            <div className='relative flex h-min w-[200px]'>
                {/* Search icon set to left of the container. Transform cursor if hovered over */}
                <Search className='absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white'/>
                <input
                    className='w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white' 
                    type="search" 
                    placeholder="Search.."
                />
            </div>
        </div>

        {/* Buttons */}
        <div className='flex items-center'>
          {/* Dark Mode button */}
          <button onClick={() => dispatch(setDarkMode(!darkMode))} 
            className={darkMode ? `rounded p-2 dark:hover:bg-gray-700` : `rounded p-2 hover:bg-gray-100`}>
            {darkMode ? (
              <Sun className="h-6 w-6 cursor-pointer dark:text-white"/>
            ) : (
              <Moon className="h-6 w-6 cursor-pointer dark:text-white"/>
            )}
          </button>
            {/* Icons */}
            <Link
            href="/settings"
            className={
              darkMode 
                ? `h-min w-min rounded p-2 dark:hover:bg-gray-700` 
                : `h-min w-min rounded p-2 hover:bg-gray-100`
              }
            >
                <Settings className='h-6 w-6 cursor-pointer dark:text-white'/>
            </Link>
            {/* 'md:inline-block' - grey line to mark settings icon when screen is too wide, else is 'hidden' */}
            <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block'></div>
        </div>
    </div>
  )
}

export default Navbar