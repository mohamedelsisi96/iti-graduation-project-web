"use client";
import Swal from "sweetalert2";
import Breadcrumb from "../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../components/adminComponents/Layouts/DefaultLayout";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { v4 } from "uuid";
import Image from "next/image";
import Variants from "../../../Spinner";
import axios from "axios";
import { courseContext } from "../../../Contexts/Courses/CourseContextProvider";

const Page = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [instractors, setInstractors] = useState(null);
  const {localCourse, setLocalCourse} = useContext(courseContext);
  async function getInstractor() {
    let { data } = await axios.get("/api/instructors");
    setInstractors(data);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/api/courses");
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const result = await response.json();
        setCourses(localCourse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    getInstractor();
  }, [localCourse]);

  const handleCourseDetails = async (id) => {
    push(`/admin/forms/add-course/${id}`);
  };
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  // const [cImage, setCImage] = useState("");
  const [cTrack, setCTrack] = useState("");
  const [cDetails, setCDetails] = useState("");
  const [cDuration, setCDuration] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  const [image, setImage] = useState();

  const handleCreate = async (event) => {
    event.preventDefault();
    const lowerCaseTitle = cTitle.toLowerCase();
    const existingCourse = courses.find(
      (course) => course.data.title.toLowerCase() === lowerCaseTitle
    );
    if (existingCourse) {
      Swal.fire({
        icon: "error",
        title: "Course name already exists",
        text: "Please choose a different name.",
        confirmButtonText: "OK",
      });
      return;
    }
    console.log(cTitle, cDetails, image?.name, cInstructor, cDuration);
    let imgPath = v4();
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: lowerCaseTitle,
        price: cPrice,
        details: cDetails,
        instructor: cInstructor,
        duration: cDuration,
        imgPath: imgPath,
        buyers: 0,
        track: cTrack,
      }),
    });

    const refresh = await fetch("/api/courses");

    const result = await refresh.json();

    if (image) {
      const imageRef = ref(storage, "images/courses/" + image.name + imgPath);
      uploadBytes(imageRef, image).then((res) => {
        console.log("======================");
        console.log(res);
        console.log("======================");
      });
    }

    setCourses(result);
    setCTitle("");
    setCPrice(0);
    // setCImage("");
    setCDetails("");
    setCInstructor("");
    setCDuration("");
    setCTrack("");
    setSuccess(true);
    setImage(null);
  };

  const handleDelete = async (id) => {
    let conf = confirm("are you sure you want to delete this course");
    if (conf) {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName: "courses", documentId: id }),
      });
      const refresh = await fetch("/api/courses");

      const result = await refresh.json();
      setCourses(result);
    }
  };
  const filteredCourses = courses?.filter((course) =>
    course.data?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  if (!courses)
    return (
      <div className="max-h-full">
        <Variants></Variants>
      </div>
    );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add new course" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Input course info
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <form className="max-w-sm">
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Course name
                </label>
                <input
                  type="text"
                  placeholder="Course name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cTitle}
                  onChange={(e) => {
                    setCTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Track name
                </label>
                <select
                  type="text"
                  placeholder="Instructor name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cTrack}
                  onChange={(e) => {
                    setCTrack(e.target.value);
                  }}
                >
                  <option value="front-end">Front-end</option>
                  <option value="back-end">Back-end</option>
                  <option value="mobile-app">Mobile-app</option>
                </select>
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Course Price
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cPrice}
                  onChange={(e) => {
                    setCPrice(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor name
                </label>
                <select
                  type="text"
                  placeholder="Instructor name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cInstructor}
                  onChange={(e) => {
                    setCInstructor(e.target.value);
                  }}
                >
                  <option>Instractor Name</option>
                  {instractors?.map((instractor) => (
                    <option key={instractor.id} value={instractor.data.name}>
                      {instractor.data.name} |{" "}
                      {instractor.data.fields.join(", ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Course duration
                </label>
                <input
                  type="text"
                  placeholder="Course duration"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cDuration}
                  onChange={(e) => {
                    setCDuration(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Course details
                </label>
                <textarea
                  rows={6}
                  placeholder="Course details"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={cDetails}
                  onChange={(e) => {
                    setCDetails(e.target.value);
                  }}
                ></textarea>
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <br />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
                  onClick={(e) => handleCreate(e)}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl dark:text-white">All courses</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {filteredCourses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data.title}
                  </h5>

                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={(e) => {
                      handleDelete(course.id);
                    }}
                  >
                    <big>
                      <b>X</b>
                    </big>
                  </button>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={`${
                      course.image ||
                      '/defaultCourse.jpeg'
                    }`}
                    alt={course.data.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base mb-2">{`by : ${course.data.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                  <p className="text-3xl text-gray-600 mb-4">{`Price: ${course.data.price}`}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      handleCourseDetails(course.id);
                    }}
                  >
                    Update course
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Page;
