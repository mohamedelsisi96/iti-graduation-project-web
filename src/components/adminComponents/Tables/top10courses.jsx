import React, { useState, useEffect } from 'react';
import axios from 'axios';
const TopCourses = () => {
  const [courseData, setCourseData] = useState([]);
  async function getCourseData() {
    try {
      const { data } = await axios.get('/api/courses');
      const courses = data.map((course) => {
        const profit = course.data.price * course.data.buyers; 
        return {
          id: course.data.id,
          title: course.data.title,
          buyers: course.data.buyers,
          price: course.data.price,
          profit: profit.toFixed(2),
        };
      });
      const sortedCourses = courses.sort((a, b) => b.profit - a.profit).slice(0, 10);
      setCourseData(sortedCourses);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }
  useEffect(() => {
    getCourseData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 10 Courses by Profit
      </h4>
      <div className="flex flex-col mb-6 mt-4">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Title</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Profit</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Buyers</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Price</h5>
          </div>
        </div>
        {courseData.map((course, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === courseData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={course.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.title}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${course.profit}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.buyers}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">${course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopCourses;