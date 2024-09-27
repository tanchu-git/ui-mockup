import React from 'react'
import Navbar from "@/app/(components)/Navbar";

type Props = {}

const DashboardWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    // Sidebar navigation
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        {}        
        <main 
            // Top navigation bar
            className={'dark:bg-dark-bg flex w-full flex-col bg-gray-50  md:pl-64'}
        >
            <Navbar />
            
            {children}
        </main>
    </div>
  )
}

export default DashboardWrapper