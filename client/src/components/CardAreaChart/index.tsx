"use client";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Icon } from "@iconify/react";

const colors = {
    "blue": "#008FFB",
    "green": "#5C4742",
    "pink": "#C4BBAF",
    "yellow": "#F9C80E",
}

interface CardAreaChartProps {
    themeColor: string,
    title: string,
    value: any,
    icon: string,
}

const CardAreaChart = ({ 
    themeColor, 
    title,
    value,
    icon,
}: CardAreaChartProps) => {
  const ChartData: any = {
    series: [
      {
        name: title,
        color: 	colors[themeColor as keyof typeof CardAreaChart],
        data: [3.3, 3.7, 4.1, 3.9, 4.4, 4.2, 4.6],
      },
    ],
    chart: {
      id: "total-income",
      type: "area",
      height: 100,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "inherit",
      foreColor: "#adb0bb",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.8,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };

  const lightThemes = {
    "red": "bg-red-100",
    "blue": "bg-blue-100",
    "yellow": "bg-yellow-100",
  }
  const solidThemes = {
    "red": "bg-red-500",
    "blue": "bg-blue-500",
    "yellow": "bg-yellow-500",
  }
  
  return (
      <div className={`${lightThemes[themeColor as keyof typeof CardAreaChart]} rounded-lg p-6 relative w-full break-words mb-5 hover:ring`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-14 h-10 rounded-full flex items-center justify-center ${solidThemes[themeColor as keyof typeof CardAreaChart]} text-white`}>
              <Icon icon={icon} height={24} />
            </span>
            <h5 className="text-2xl opacity-70">{title}</h5>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-[24px] items-end">
          <div className="xl:col-span-6 col-span-7">
            <h2 className="text-5xl font-bold mb-3">{value}</h2>
            <span className="font-semibold border rounded-full border-black/5 dark:border-white/10 
                py-0.5 px-[10px] leading-[normal] text-xs text-dark dark:text-darklink">
              <span className="opacity-70">4.5 last month</span>
            </span>
          </div>
          <div className="xl:col-span-6  col-span-5 ">
            <div className="rounded-bars md:ps-7">
              <Chart
                options={ChartData}
                series={ChartData.series}
                type="area"
                height='100px'
                width='100%'
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardAreaChart;
