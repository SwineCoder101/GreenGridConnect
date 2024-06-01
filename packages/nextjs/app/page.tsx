"use client";

import { useEffect } from "react";
import * as echarts from "echarts";
// import Link from "next/link";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  useEffect(() => {
    const chartPricePerToken = echarts.init(document.getElementById("chartPricePerToken") as HTMLDivElement);

    const options = {
      title: {
        text: "Price per token",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
        min: 0.15,
        axisLabel: {
          formatter: "€ {value}",
        },
      },
      legend: {
        data: ["Mine", "AVG Others"],
      },
      series: [
        {
          name: "Mine",
          data: [0.15, 0.17, 0.2, 0.16, 0.23, 0.25, 0.24],
          type: "line",
        },
        {
          name: "AVG Others",
          data: [0.15, 0.16, 0.22, 0.18, 0.24, 0.27, 0.26],
          type: "line",
        },
      ],
    };

    chartPricePerToken.setOption(options);

    return () => {
      chartPricePerToken.dispose();
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy Availability per month (KWh)</h3>
            <p className="text-2xl font-bold text-blue-600">500.000</p>
          </div>
        </div>
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy remaining (KWh)</h3>
            <p className="text-2xl font-bold text-red-400">350.444</p>
          </div>
        </div>
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy consumed (KWh)</h3>
            <p className="text-2xl font-bold text-green-600">149.556</p>
          </div>
        </div>
        <div className="w-1/5">
          <div className="flex justify-center">
            <div className="p-4 bg-green-500 shadow-md rounded-lg text-center mr-4">
              <h3 className="text-base font-semibold text-white mb-1">Profit</h3>
              <p className="text-2xl font-bold text-white">€ 180.45</p>
            </div>

            <div className="p-4 bg-red-500 shadow-md rounded-lg text-center">
              <h3 className="text-base font-semibold text-white mb-1">Loss</h3>
              <p className="text-2xl font-bold text-white">€ 45.77</p>
            </div>
          </div>
        </div>
      </div>

      <div id="chartPricePerToken" className="mt-5 ml-6" style={{ width: "50%", height: "450px" }}></div>
    </>
  );
};

export default Home;
