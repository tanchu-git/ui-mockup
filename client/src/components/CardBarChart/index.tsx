"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import { title } from "process";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = {
  "red": ['#EA3546', '#f9a3a4'],
  "yellow": ['#F9C80E', '#c7f464'],
  "green": ['#5A2A27', '#8D5B4C'],
  "dark": ['#2E294E', '#546E7A'],
  "gray": ['#33b2df', '#4ecdc4']
}

interface CardBarChartProps {
  themeColor: string,
  title: string,
  value: any,
  icon: string,
}

const CardBarChart = ({ 
  themeColor, 
  title,
  value,
  icon,
}: CardBarChartProps) => {
  const ChartData: any = {
    series: [
      {
        name: "1",
        data: [29, 52, 38, 47, 56],
      },
      {
        name: "2",
        data: [71, 71, 71, 71, 71],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: 100,
      stacked: true,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 1,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: colors[themeColor as keyof typeof CardBarChart],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: [3],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      show: false,
    },
  };

  const theme = "bg-red-500";

  return (
      <div className={`bg-${themeColor}-100 rounded-lg p-6 relative w-full break-words mb-5 hover:ring`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-14 h-10 rounded-full flex items-center justify-center ${theme} text-white`}>
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
              <span className="opacity-70">+23% last month</span>
            </span>
          </div>
          <div className="xl:col-span-6  col-span-5 ">
            <div className="rounded-bars md:ps-7">
              <Chart
                options={ChartData}
                series={ChartData.series}
                type="bar"
                height='100px'
                width='100%'
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardBarChart;
