import { useState } from "react";
import TopStudents from './top10students';
import TopCourses from "./top10courses";
function TableOne() {
  const [active, setActive] = useState("Student");
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 10
      </h4>
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="form-control min-w-47.5">
            <label className="label cursor-pointer">
              <span className="label-text m-2 font-semibold text-secondary">
                Top Students
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                value="students"
                defaultChecked
                onChange={() => setActive("Student")}
              />
            </label>
          </div>
          <div className="form-control min-w-47.5">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-secondary">
                Top Courses
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500 m-2"
                value="courses"
                onChange={() => setActive("Course")}
              />
            </label>
          </div>
        </div>
      </div>
        {active === "Student" && <TopStudents />}
        {active === "Course" && <TopCourses />}
    </div>
  );
}
export default TableOne;