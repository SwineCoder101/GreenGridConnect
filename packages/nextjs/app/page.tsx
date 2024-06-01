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
    // Cria o gráfico usando ECharts
    const myChart = echarts.init(document.getElementById("chart") as HTMLDivElement);

    // Opções do gráfico
    const options = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    // Setar as opções e renderizar o gráfico
    myChart.setOption(options);

    // Limpa o gráfico quando o componente é desmontado
    return () => {
      myChart.dispose();
    };
  }, []);

  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/4 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Token allocated</h3>
            <p className="text-2xl font-bold text-blue-600">20</p>
          </div>
        </div>
        <div className="w-1/4 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Token left</h3>
            <p className="text-2xl font-bold text-red-400">10</p>
          </div>
        </div>
        <div className="w-1/4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Token sold</h3>
            <p className="text-2xl font-bold text-green-600">10</p>
          </div>
        </div>
      </div>

      <div id="chart" style={{ width: "50%", height: "400px" }}></div>
    </>
  );
};

export default Home;
