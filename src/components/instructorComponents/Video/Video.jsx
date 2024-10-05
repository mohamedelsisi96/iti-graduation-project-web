"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "../../../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Video = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState(null);

  const fullName = typeof window !== "undefined" && localStorage.getItem("fname") + 
  (localStorage.getItem("lname") === null || localStorage.getItem("lname") === "undefined" ? "" : " " + localStorage.getItem("lname"));

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const courseSet = new Set();
      const courses = students.flatMap((student) => {
        if (
          !student.courses ||
          !Array.isArray(student.courses) ||
          student.courses.length === 0
        ) {
          return [];
        }

        student.courses
          .filter((course) => course.instructor === fullName)
          .forEach((course) => courseSet.add(course.course));
        return [];
      });

      const uniqueCourses = Array.from(courseSet).map((courseName) => ({
        courseName,
      }));

      setCourseData(uniqueCourses);
      console.log(uniqueCourses);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !selectedCourse) {
      alert("Please select a course and a file to upload.");
      return;
    }

    setIsUploading(true);

    const storageRef = ref(
      storage,
      `${fullName}/${selectedCourse}/${file.name}`
    );

    let coursesData = JSON.parse(localStorage.getItem("coursesData")) || [];
    const newCourseData = {
      selectedCourse: selectedCourse,
      fileName: file.name,
    };
    coursesData.push(newCourseData);
    localStorage.setItem("coursesData", JSON.stringify(coursesData));

    const task = uploadBytesResumable(storageRef, file);
    setUploadTask(task);

    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  const handleStopUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      setIsUploading(false);
      setUploadProgress(0);
      alert("Upload cancelled");
    }
  };

  return (
    <form className="flex justify-center flex-col items-center">
      <div className="w-80">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Your Course
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option selected disabled>
            Choose a course
          </option>
          {courseData.map((course, key) => (
            <option
              value={course.courseName}
              key={key}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray cursor-pointer"
            >
              {course.courseName}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-12 w-80">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Course Video
        </label>
        <input
          className="block w-full text-sm text-gray-900 dark:text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept=".mp4,.avi,.mov,.wmv,.mkv,.flv,.webm,.mts,.m2ts,.ts"
          onChange={handleFileChange}
        />
      </div>
      {isUploading && (
        <div className="mt-10 w-52">
          <CircularProgressbar
            value={uploadProgress}
            text={`${Math.round(uploadProgress)}%`}
            styles={buildStyles({
              textColor: "#4A90E2",
              pathColor: "#4A90E2",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      )}
      {!isUploading ? (
        <button
          type="button"
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleUpload}
        >
          Add
        </button>
      ) : (
        <button
          type="button"
          className="mt-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={handleStopUpload}
        >
          Stop Upload
        </button>
      )}
    </form>
  );
};

export default Video;
