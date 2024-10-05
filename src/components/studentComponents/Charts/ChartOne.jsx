"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
// import ReactApexChart from "react-apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const options = {
    legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: "straight",
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: "category",
        categories: [
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: "0px",
            },
        },
        min: 0,
        max: 100,
    },
};

const ChartOne = () => {
    const series = [
        {
            name: "Instructors rate",
            data: [33, 51, 42, 67, 23, 32, 17, 61, 34, 72, 30, 45],
        },
    ];
    const series2 = [
        {
            name: "Students rate",
            data: [10, 25, 50, 30, 65, 25, 35, 70, 88, 30, 15, 40],
        },
    ];
    const series3 = [
        {
            name: "Courses sales rate",
            data: [5, 20, 25, 35, 40, 30, 45, 50, 55, 60, 65, 70],
        },
    ];
    const [currentSeries, setCurrentSeries] = useState(series);
    const handleRadioChange = (event) => {
        const value = event.target.value;
        if (value === "instructors") {
            setCurrentSeries(series);
        } else if (value === "students") {
            setCurrentSeries(series2);
        } else if (value === "courses") {
            setCurrentSeries(series3);
        }
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="form-control  min-w-47.5">
                        <label className="label cursor-pointer">
                            <span className="label-text m-2 font-semibold text-secondary">
                                Instructors rate
                            </span>
                            <input
                                type="radio"
                                name="radio-10"
                                className="radio checked:bg-red-500"
                                value="instructors"
                                defaultChecked
                                onChange={handleRadioChange}
                            />
                        </label>
                        <p className="text-sm font-medium">12.08.2024</p>
                    </div>
                    {/* ////////////////// */}
                    {/* /////////////// */}
                    <div className="form-control min-w-47.5">
                        <label className="label cursor-pointer">
                            <span className="label-text m-2 font-semibold text-secondary">
                                Students rate
                            </span>
                            <input
                                type="radio"
                                name="radio-10"
                                className="radio checked:bg-red-500"
                                value="students"
                                onChange={handleRadioChange}
                            />
                        </label>
                        <p className="text-sm font-medium">12.08.2024</p>
                    </div>
                    {/* ////////////////// */}
                    <div className="form-control min-w-47.5">
                        <label className="label cursor-pointer">
                            <span className="label-text font-semibold text-secondary">
                                Courses sales rate
                            </span>
                            <input
                                type="radio"
                                name="radio-10"
                                className="radio checked:bg-red-500 m-2"
                                value="courses"
                                onChange={handleRadioChange}
                            />
                        </label>
                        <p className="text-sm font-medium">12.08.2024</p>
                    </div>
                    {/* ////////////////// */}
                </div>
            </div>
            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={currentSeries}
                        type="area"
                        height={350}
                        width={"100%"}
                    />
                </div>
            </div>
        </div>
    );
};
export default ChartOne;
