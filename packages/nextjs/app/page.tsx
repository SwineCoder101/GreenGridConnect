"use client";

import { useEffect } from "react";
import * as echarts from "echarts";
// import Link from "next/link";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  //chartPricePerToken
  useEffect(() => {
    const chartPricePerToken = echarts.init(document.getElementById("chartPricePerToken") as HTMLDivElement);

    const options = {
      title: {
        text: "Price per unit of energy",
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

  // chartMap
  useEffect(() => {
    const chartMap = echarts.init(document.getElementById("chartMap") as HTMLDivElement);
    let options = "";

    fetch("/ireland_complete.svg")
      .then(response => response.text())
      .then(svg => {
        // Registrar o mapa com o conteúdo do SVG
        echarts.registerMap("ireland_complete.svg", { svg: svg });

        options = {
          title: {
            text: "Map of data centers",
          },
          tooltip: {
            show: true,
            formatter: function (params) {
              if (params.value && params.value.length >= 3) {
                const description = params.value[2];
                return description;
              } else {
                return "";
              }
            },
          },
          geo: {
            map: "ireland_complete.svg",
            roam: true,
          },
          series: {
            type: "custom",
            coordinateSystem: "geo",
            geoIndex: 0,
            zlevel: 1,
            data: [
              [650, 520, "Clonshaugh Industrial Estate"],
              [270, 530, "Sleepless"],
              [350, 870, "CIX - Cork Internet eXchange"],
              [630, 525, "EdgeConneX Dublin Campus"],
              [620, 545, "Profile Park Kilcarbery"],
              [650, 620, "Echelon"],
            ],
            renderItem(params, api) {
              const coord = api.coord([api.value(0, params.dataIndex), api.value(1, params.dataIndex)]);
              const circles = [];
              for (let i = 0; i < 5; i++) {
                circles.push({
                  type: "circle",
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 30,
                  },
                  style: {
                    stroke: "red",
                    fill: "none",
                    lineWidth: 2,
                  },
                  keyframeAnimation: {
                    duration: 4000,
                    loop: true,
                    delay: (-i / 4) * 4000,
                    keyframes: [
                      {
                        percent: 0,
                        scaleX: 0,
                        scaleY: 0,
                        style: {
                          opacity: 1,
                        },
                      },
                      {
                        percent: 1,
                        scaleX: 1,
                        scaleY: 0.4,
                        style: {
                          opacity: 0,
                        },
                      },
                    ],
                  },
                });
              }
              return {
                type: "group",
                x: coord[0],
                y: coord[1],
                children: [
                  ...circles,
                  {
                    type: "path",
                    shape: {
                      d: "M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z",
                      x: -10,
                      y: -35,
                      width: 20,
                      height: 40,
                    },
                    style: {
                      fill: "red",
                    },
                    keyframeAnimation: {
                      duration: 1000,
                      loop: true,
                      delay: Math.random() * 1000,
                      keyframes: [
                        {
                          y: -10,
                          percent: 0.5,
                          easing: "cubicOut",
                        },
                        {
                          y: 0,
                          percent: 1,
                          easing: "bounceOut",
                        },
                      ],
                    },
                  },
                ],
              };
            },
          },
        };

        console.log("optionsx: ", options);
        chartMap.setOption(options);
      })
      .catch(error => {
        console.error("Erro ao carregar o arquivo SVG:", error);
      });

    return () => {
      chartMap.dispose();
    };
  }, []);

  //chartConsumptionDataCenters
  useEffect(() => {
    const chartConsumptionDataCenters = echarts.init(
      document.getElementById("chartConsumptionDataCenters") as HTMLDivElement,
    );

    const options = {
      title: {
        text: "Consumption (%) per data centers",
        subtext: "May 2024",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: function (params) {
          console.log(params);
          return `${params.name}: ${params.data.value} KWh (${params.percent}%)`;
        },
      },
      legend: {
        orient: "horizontal",
        bottom: "0",
      },
      dataset: [
        {
          source: [
            { value: 17432, name: "Clonshaugh Industrial Estate" },
            { value: 40763, name: "Sleepless" },
            { value: 22124, name: "CIX - Cork Internet eXchange" },
            { value: 10899, name: "EdgeConneX Dublin Campus" },
            { value: 28556, name: "Profile Park Kilcarbery" },
            { value: 29782, name: "Echelon" },
          ],
        },
      ],
      series: [
        {
          type: "pie",
          radius: "50%",
        },
        {
          type: "pie",
          radius: "50%",
          label: { position: "inside", formatter: "{d}%", color: "white", fontSize: 15 },
          percentPrecision: 0,
          emphasis: {
            label: { show: true },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chartConsumptionDataCenters.setOption(options);

    return () => {
      chartConsumptionDataCenters.dispose();
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy Availability (KWh)</h3>
            <p className="text-2xl font-bold text-blue-500">500.000</p>
          </div>
        </div>
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy remaining (KWh)</h3>
            <p className="text-2xl font-bold text-red-500">350.444</p>
          </div>
        </div>
        <div className="w-1/5 mr-4">
          <div className="p-4 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-base font-semibold text-black mb-1">Energy consumed (KWh)</h3>
            <p className="text-2xl font-bold text-green-500">149.556</p>
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

      <div className="flex justify-center">
        <div className="w-1/2 mr-4">
          <div id="chartPricePerToken" className="mt-5 ml-6" style={{ width: "100%", height: "470px" }}></div>
          <div id="chartConsumptionDataCenters" className="mt-5 ml-6" style={{ width: "100%", height: "470px" }}></div>
        </div>

        <div className="w-1/2 mr-4">
          <div id="chartMap" className="mt-5 ml-6" style={{ width: "100%", height: "470px" }}></div>
        </div>
      </div>
    </>
  );
};

export default Home;
