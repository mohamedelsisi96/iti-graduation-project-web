"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Variants from "../../Spinner";
import { courseContext } from "../../Contexts/Courses/CourseContextProvider";
import DefaultLayout from "../../../components/homeComponents/Layouts/DefaultLayout";
const Page = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { localCourse, setLocalCourse } = useContext(courseContext);
  useEffect(() => {
    setCourses(localCourse);
  }, [localCourse]);
  const openCourseDetails = async (id) => {
    push(`/user/Courses/${id}`);
  };
  const filteredCourses = courses?.filter((course) =>
    course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!courses)
    return (
      <div className="max-h-full flex flex-row flex-wrap">
        <DefaultLayout>
        <Variants></Variants>
        <Variants></Variants>
        <Variants></Variants>
        <Variants></Variants>
        </DefaultLayout>
      </div>
    );
  return (
    <DefaultLayout>
    <div>
      <div className="flex flex-col sm:flex-row items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">All courses</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="search about courses..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {courses?.map((course) => console.log(course))}
        {filteredCourses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={`${
                      course.image
                        ? course.image
                        : "/defaultCourse.jpeg"
                    }`}
                    alt={course.data.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course.data.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                  <p className="text-3xl text-color mb-4">{`Price: ${course.data.price}`}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      openCourseDetails(course.id);
                    }}
                  >
                    Open course
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </DefaultLayout>
  );
};
export default Page;
