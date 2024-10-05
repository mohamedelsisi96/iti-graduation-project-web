"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CourseBuyerContext } from "../../../BuyerContext";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Image from "next/image";

const Coursess = ({ handleRouteChange }) => {
  let {
    courseBuyerCart,
    setCourseBuyerCart,
    courseBuyerWish,
    setCourseBuyerWish,
  } = useContext(CourseBuyerContext);
  const [courses, setCourses] = useState(courseBuyerWish);
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  function addCourse(courseId) {
    const isAlreadyInCart = courseBuyerCart.some(
      (item) => item?.id === courseId
    );

    if (isAlreadyInCart) {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "This course is already in your Course Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const updatedCart = [...courseBuyerCart, courses];
      debugger;
      console.log(updatedCart);
      setCourseBuyerCart(updatedCart);
      if (window !== "undefined") {
        localStorage.setItem("courseBuyerCart", JSON.stringify(updatedCart));
      }

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Course added to cart successfully to Course Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    push(`/buyer`);
  }

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    setCourseBuyerWish(updatedCourses);
    if (window !== "undefined") {
      localStorage.setItem("courseBuyerWish", JSON.stringify(updatedCourses));
    }
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Course removed successfully from wishlist",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("courseBuyerWish");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCourseBuyerWish(parsedCart);
        setCourses(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // If there's an error parsing, clear the invalid data
        localStorage.removeItem("courseBuyerWish");
        setCourseBuyerWish([]);
        setCourses([]);
      }
    }
  }, []);

  if (!courseBuyerWish || courseBuyerWish.length === 0) {
    return (
      <div className="max-h-full">
        <h2>No courses added to your favourite cart please add courses</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">All Wish courses</h2>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="search about courses..."
            className="border border-gray-300 rounded-lg pl-10 dark:text-black pr-4 py-2 w-72 mr-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {courses?.map((course) => console.log(course))}
        {courses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data?.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course.image}
                    alt={course.data?.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course.data?.instructor?.split(" ").slice(0, 3).join(" ")}`}</p>
                  <p className="text-3xl text-color mb-4">{`Price: ${course.data?.price}`}</p>
                </div>

                <div className="mt-7 flex flex-row items-center gap-6">
                  <button
                    onClick={() => addCourse(course.id)}
                    className="flex rounded-md h-12 w-40 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
                  >
                    <BiShoppingBag className="text-lg mr-2" />
                    Add to cart
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="flex rounded-md h-12 w-40 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
                  >
                    <MdDeleteSweep className="text-3xl mr-2 " />
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coursess;
