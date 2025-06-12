import React, { useEffect } from "react";
import Chart from "chart.js";

export default function CardLineChart() {
  useEffect(() => {
    let chartInstance = null;

    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/offres/getApplicationsOverTime"); // Change to your API URL
        const data = await res.json();

        // Extract labels and counts from your API data
        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.count);

        const ctx = document.getElementById("line-chart").getContext("2d");

        // Destroy previous chart instance if exists to prevent overlay
        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Applications Over Time",
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: counts,
                fill: false,
                lineTension: 0.4, // smooth curve
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                    beginAtZero: true,
                    precision: 0,
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        });
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    }

    fetchData();

    // Cleanup on unmount
    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, []);

  return (
  <>
    <div className="flex justify-center items-center min-h-screen bg-white-300 p-20">
      <div className="relative flex flex-col min-w-0 break-words w-full max-w-4xl mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1 text-center">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">
                Applications Over Time
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </>
);
}
