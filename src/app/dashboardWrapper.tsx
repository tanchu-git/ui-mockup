import React from 'react'
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";

type Props = {}

const DashboardWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    // Sidebar navigation
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        <Sidebar />
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