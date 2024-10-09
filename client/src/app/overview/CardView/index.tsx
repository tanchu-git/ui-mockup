

"use client";

import {
  Priority,
  Task,
  useGetRankDataQuery,
  useGetTasksQuery,
} from "@/state/api";
import React from "react";
import { useAppSelector } from "../../redux";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getActiveBusiness, getActiveUser } from "@/components/Sidebar";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Props = {
    id: string;
  };

const Overview = ({ id }: Props) => {
  const {
    data: rankData,
    isLoading: rankDataLoading,
    isError: rankDataError
  } = useGetRankDataQuery({ businessId: Number(id) });

  const darkMode = useAppSelector((state) => state.global.darkMode);

  if (rankDataLoading) return <div>Loading..</div>;
  if (rankDataError || !rankData ) return <div>Error fetching ranking data</div>;

  const chartColors = darkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      <Header name="Overview" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
                Task Priority Distribution
            </h3>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Etc
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Overview;
