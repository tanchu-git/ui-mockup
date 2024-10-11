"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setSidebarCollapsed } from '@/state';
import { useGetBusinessQuery } from '@/state/api';
import { LockIcon, LucideIcon, X, ChartNoAxesCombined, TrendingUp, MessageSquareMore, MapPinHouse, Search, Settings, ChevronUp, ChevronDown, MapPin, Wallpaper, PlusSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { act, useState } from 'react'
import ModalAddBusiness from '../ModalAddBusiness';

// Set active user ID - make it dynamic later
let activeUser = 1;
let activeBusiness: number;

export function getActiveUser() {
  return activeUser;
}

export function getActiveBusiness() {
  return activeBusiness;
}

export function setActiveBusiness(active: number) {
  activeBusiness = active;
}

const Sidebar = () => {
  const [showLocations, setShowLocations] = useState(true);

  const {data: businesses} = useGetBusinessQuery({ownerId: Number(activeUser)});
  const dispatch = useAppDispatch();
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)
  const [isModalAddBusinessOpen, setIsModalAddBusinessOpen] = useState(false);

  // For sidebar layout - check if it's collapsed and act accordingly
  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl 
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white 
    ${sidebarCollapsed ? "w-0 hidden" : "w-64"}
  `

  const pathname = usePathname();
  return (
    <div className={sidebarClassNames}>
      {/* Logo section */}
      <div className='flex h-[100%] w-full flex-col justify-start'>
        {/* Top logo */}
        <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
          {/* Top left name */}
          <div className='text-xl font-bold text-gray-800 dark:text-white'>
            BIPCARDS
          </div>
          {sidebarCollapsed ? null : (
            <button className='py-3' onClick={() => {dispatch(setSidebarCollapsed(!sidebarCollapsed))}}>
              <X className='h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white'/>
            </button>
          )}
        </div>
        {/* Company */}
        <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700'>
          <Image src="/bipcards.png" alt="Logo" width={40} height={40}/>
          <div>
            <h3 className='text-md font-bold tracking-wide dark:text-gray-200'>
              RANKING DATA
            </h3>
            <div className='mt-1 flex items-start gap-2'>
              <LockIcon className='mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400'/>
              <p className='text-xs text-gray-500'>Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className='z-10 w-full'>
          <SidebarLink icon={Wallpaper} label='OVERVIEW' href={`/overview/${activeBusiness}`}/>
          <SidebarLink key={activeBusiness} icon={TrendingUp} label='IMPROVE RANK' href={`/improve_rank/${activeBusiness}`}/>
          <SidebarLink icon={ChartNoAxesCombined} label='CHARTS' href="/charts"/>
          <SidebarLink icon={MapPin} label='GEO INSIGHT' href="/geoInsight"/>
          <SidebarLink icon={MessageSquareMore} label='REVIEWS' href={`/reviews/${activeBusiness}`}/>
          <SidebarLink icon={Search} label='SEARCH' href="/search"/>
          <SidebarLink icon={Settings} label='SETTINGS' href="/settings"/>
        </nav>

        {/* Foldable submenu - LOCATIONS */}
        <button onClick={() => setShowLocations((prev) => !prev)} 
          className='flex w-full items-center justify-between px-8 py-3 font-bold text-gray-500'>
            <span className=''>LOCATIONS</span>
            {/* Switch up/down arrow */}
            {showLocations ? (<ChevronUp className='h-5 w-5'/>) : <ChevronDown className='h-5 w-5'/>}
        </button>
        {/* LOCATIONS list */}
        {/* Map each relevant business data for the active user */}        
        {showLocations && businesses?.map((business) => (
          <SidebarSubMenu
          active={business.id}
          icon={MapPinHouse}
          label={business.name}
        />
        ))}
        {/* Modal Add location */}
        <ModalAddBusiness
          isOpen={isModalAddBusinessOpen}
          onClose={() => setIsModalAddBusinessOpen(false)}
        />
        <button
          className="flex items-center rounded-md bg-blue-primary px-5 py-3 mx-6 my-2 text-white hover:bg-blue-600"
          onClick={() => setIsModalAddBusinessOpen(true)}
        >
          <PlusSquare className="mr-2 h-5 w-5" /> Add Location 
        </button>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className='w-full'>
      <div 
        // Sidebar links positional layout
        className={`relative flex cursor-pointer items-center gap-3 transition-colors 
          hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
            isActive ? "bg-gray-100 text-white dark:bg-slate-600" : ""
          } justify-start px-8 py-3`}
      >
        {/* Active link styling */}
        {isActive && (
          <div className='absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200'/>
        )}

        <Icon className='h-6 w-6 text-gray-800 dark:text-gray-100' />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  )
}

const SidebarSubMenu = ({
  active,
  icon: Icon,
  label
}: SidebarSubMenuProps) => {
  const isActive = (active: number) => active === activeBusiness
  const router = useRouter();
  let pathname = usePathname();

  if (pathname === "/search" || pathname === "/settings") {
    pathname = `/overview/${active}`;
  } else {
    pathname = pathname.substring(0, pathname.length - 1) + active;
  }

  function sideRoute() {
    router.push(pathname)
  }

  return (
    <button onClick={() => {setActiveBusiness(active), sideRoute()}} className='w-full'>
      <div 
        // Container styling
        className={`relative flex cursor-pointer items-center gap-2 transition-colors rounded-md 
          py-3 mx-8 my-2 hover:bg-blue-100 dark:bg-black ${
            isActive(active) ? "bg-blue-200 text-black dark:bg-blue-200" : "dark:hover:bg-blue-400"
          } justify-start px-3 py-3`}
      >
        {/* Icon styling */}
        <Icon className={`h-6 w-6 transition-colors ${
            isActive(active) ? "dark:hover:bg-blue-200 text-gray-800" 
            : "text-gray-800 dark:text-gray-100"
          }`}/>
        {/* Label styling */}
        <span className={`font-medium transition-colors ${
            isActive(active) ? "dark:hover:bg-blue-200 text-gray-800" 
            : "text-gray-800 dark:text-gray-100"
          }`}>
          {label}
        </span>
      </div>
    </button>
  )
}

interface SidebarSubMenuProps {
  active: number;
  icon: LucideIcon;
  label: string;
}

export default Sidebar