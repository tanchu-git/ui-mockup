"use client";

import React, { useEffect } from 'react'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({children} : {children: React.ReactNode}) => {
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)
  const darkMode = useAppSelector((state) => state.global.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  })

  return (
    // Sidebar navigation
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        <Sidebar />
        <main 
            // Top navigation bar - no padding if sidebar is collapsed
            className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 
                ${sidebarCollapsed ? "" : "md:pl-64"}
              `}
        >
            <Navbar />
            
            {children}
        </main>
    </div>
  )
}

// Make it compatible with redux toolki by wrapping the layout and export it 
const DashboardWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper