"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import CardAreaChart from "../CardAreaChart";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = {
    "red": ['#EA3546', '#f9a3a4'],
    "yellow": ['#F9C80E', '#c7f464'],
    "green": ['#5A2A27', '#8D5B4C'],
    "dark": ['#2E294E', '#546E7A'],
    "gray": ['#33b2df', '#4ecdc4']
  }

interface CardTreemapChartProps {
  themeColor: string,
  title: string,
  value: any,
  icon: string,
}

const CardTreemapChart = ({ 
  themeColor, 
  title,
  value,
  icon,
}: CardTreemapChartProps) => {
  const ChartData: any = {
    series: [
        {
            data: [
              {
                x: "Twitter",
                y: 14,
              },
              {
                x: "Instagram",
                y: 34,
              },
              {
                x: "Facebook",
                y: 22,
              },
              {
                x: "Threads",
                y: 7,
              },
              {
                x: "TikTok",
                y: 8,
              },
            ],
          },
    ],
    chart: {
      fontFamily: "inherit",
      type: "treemap",
      height: 100,
      stacked: true,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: colors[themeColor as keyof typeof CardTreemapChart],
    plotOptions: {
      btreemap: {
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: '#CD363A'
            },
            {
              from: 0.001,
              to: 6,
              color: '#52B12C'
            }
          ]
        }
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      theme: "dark",
    },
  };

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
      <div className={`${lightThemes[themeColor as keyof typeof CardTreemapChart]} rounded-lg p-6 relative
        w-full break-words mb-5 hover:ring dark:hover:ring-orange-500 dark:shadow-dark-tertiary shadow-md`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-14 h-10 rounded-full flex items-center justify-center 
              ${solidThemes[themeColor as keyof typeof CardTreemapChart]} text-white`}>
              <Icon icon={icon} height={24} />
            </span>
            <h5 className="text-2xl opacity-70">{title}</h5>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[24px] items-end">
          <div className="xl:col-span-6 col-span-7">
            <h2 className="text-5xl font-bold mb-3">{value}</h2>
            <span className="font-semibold border rounded-full border-black/5 dark:border-white/10 py-0.5 px-[10px] leading-[normal] text-xs text-dark dark:text-darklink">
              <span className="opacity-70">+23% last month</span>
            </span>
          </div>
          <div className="xl:col-span-6  col-span-5 ">
            <div className="rounded-bars md:ps-7">
              <Chart
                options={ChartData}
                series={ChartData.series}
                type="treemap"
                height='100px'
                width='100%'
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardTreemapChart;
