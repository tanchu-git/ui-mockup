"use client";

import React, { useEffect } from 'react'
import StoreProvider, { useAppSelector } from './redux';

const Layout = ({children} : {children: React.ReactNode}) => {

  return (
    // Sidebar navigation
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>
        <main>            
            {children}
        </main>
    </div>
  )
}

// Make it compatible with redux toolki by wrapping the layout and export it 
const LayoutWrapper = ({children} : {children: React.ReactNode}) => {
  return (
    <StoreProvider>
      <Layout>{children}</Layout>
    </StoreProvider>
  )
}

export default LayoutWrapper