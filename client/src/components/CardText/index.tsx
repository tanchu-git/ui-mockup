"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

const colors = {
    "red": ['#EA3546', '#f9a3a4'],
    "yellow": ['#F9C80E', '#c7f464'],
    "green": ['#5A2A27', '#8D5B4C'],
    "dark": ['#2E294E', '#546E7A'],
    "gray": ['#33b2df', '#4ecdc4']
  }

interface CardTextProps {
    themeColor: string,
    title: string,
    value: any,
    fontSize: string,
    icon: string,
}

const CardText = ({ 
    themeColor, 
    title,
    value,
    fontSize,
    icon,
}: CardTextProps) => {
  const lightThemes = {
    "red": "bg-red-100",
    "blue": "bg-blue-100",
    "yellow": "bg-yellow-100",
    "gray": "bg-gray-100",
    "pink": "bg-pink-100",
    "green": "bg-green-100",
    "teal": "bg-teal-100",
    "rose": "bg-rose-100",
    "cyan": "bg-cyan-100",
    "violet": "bg-violet-100",
    "dark": "bg-zinc-200",
  }
  const solidThemes = {
    "red": "bg-red-500",
    "blue": "bg-blue-500",
    "yellow": "bg-yellow-500",
    "gray": "bg-gray-500",
    "pink": "bg-pink-500",
    "green": "bg-green-500",
    "teal": "bg-teal-500",
    "rose": "bg-rose-500",
    "cyan": "bg-cyan-500",
    "violet": "bg-violet-500",
    "dark": "bg-zinc-500",
  }
  
  return (
      <div className={`${lightThemes[themeColor as keyof typeof CardText]} rounded-lg p-6 relative
        w-full break-words mb-5 hover:ring dark:hover:ring-orange-500 dark:shadow-dark-tertiary shadow-md`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-14 h-10 rounded-full flex items-center justify-center 
                ${solidThemes[themeColor as keyof typeof CardText]} text-white`}>
              <Icon icon={icon} height={24} />
            </span>
            <h5 className="text-2xl opacity-70">{title}</h5>
          </div>
        </div>
        <div className="mt-6">
            <h2 className={`${fontSize} font-bold mb-3`}>{value}</h2>
            <span className="font-semibold border rounded-full border-black/5 dark:border-white/10 
                py-0.5 px-[10px] leading-[normal] text-xs text-dark dark:text-darklink">
              <span className="opacity-70">'Yelp' last month</span>
            </span>
        </div>
      </div>
  );
};

export default CardText;
