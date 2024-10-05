"use client";
import dynamic from "next/dynamic";
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { courseContext } from "../../../app/Contexts/Courses/CourseContextProvider";
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
      "Aug",
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
    label: {
      formatter: function (value) {
        return value.toFixed(0);
      },
    },
  },
};
const ChartOne = () => {
  const [totalProfit, setTotalProfit] = useState(0);
  const [studentData, setStudentData] = useState([]);
  async function getCourseData() {
    try {
      const { data } = await axios.get('/api/courses');
      const courses = data.map((course) => {
        const profit = course.data.price * course.data.buyers;
        return {
          buyers: course.data.buyers,
          price: course.data.price,
          profit: profit.toFixed(2),
        };
      });
      const total = courses.reduce((acc, course) => acc + parseFloat(course.profit), 0);
      setTotalProfit(total.toFixed(2));
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }
  useEffect(() => {
    getCourseData();
  }, []);
  const totalYearProfit = 1000;
  let profitPersentage = ((totalProfit/totalYearProfit)*100).toFixed(0);
  let profitPersentage2 = (profitPersentage*1.5).toFixed(0);
///////////////////////////////////////////////////////////////////////////////// 
async function getStudentData() {
  try {
    const { data } = await axios.get('/api/students');
    setStudentData(data);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
}
function calculateTotalPercentage(students) {
  const totalPercentage = students.reduce((acc, student) => {
    if (student.data && student.data.courses && student.data.courses.length > 0) {
      const totalDegrees = student.data.courses.reduce((acc, course) => { return acc + (Number(course.degree) || 0);} , 0);
      const maxDegrees = student.data.courses.length * 100;
      const percentage = (totalDegrees / maxDegrees) * 100;
      return acc + (isNaN(percentage) ?0 : percentage);
    }
    return acc;
  }, 0);
  return totalPercentage.toFixed(2);
}
useEffect(() => {
  getStudentData();
}, []);
const totalPercentage = calculateTotalPercentage(studentData);
console.log("totalPercentage :", totalPercentage);
const totalYearPersentage = 300;
let studentsPersentage = ((totalPercentage/totalYearPersentage)*100).toFixed(0);
let studentsPersentage2 = (studentsPersentage*0.4).toFixed(0);
  const series2 = [
    {
      name: "Students Persentage rate",
      data: [studentsPersentage,studentsPersentage2,0,0,0,0,0,0,0,0,0,0],
    },
  ];
  const series3 = [
    {
      name: "Courses sales rate",
      data: [profitPersentage,profitPersentage2,0,0,0,0,0,0,0,0,0,0],
    },
  ];
  const [currentSeries, setCurrentSeries] = useState(series2);
  const handleRadioChange = (event) => {
    const value = event.target.value;
    if (value === "students") {
      setCurrentSeries(series2);
    } else if (value === "courses") {
      setCurrentSeries(series3);
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
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
            <p className="text-sm font-medium">08.2024</p>
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
            <p className="text-sm font-medium">08.2024</p>
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
