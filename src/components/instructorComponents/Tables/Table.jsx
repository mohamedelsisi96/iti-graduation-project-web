"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";

const Table = () => {
  const [courseData, setCourseData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [gradeInputs, setGradeInputs] = useState({});
  const [uniqueFieldsArray, setUniqueFieldsArray] = useState([]);
  const [selectedField, setSelectedField] = useState("");

  const fullName = typeof window !== "undefined" && localStorage.getItem("fname") + 
  (localStorage.getItem("lname") === null || localStorage.getItem("lname") === "undefined" ? "" : " " + localStorage.getItem("lname"));

  console.log(fullName);

  const filteredCourseData = selectedField
    ? courseData.filter((course) => course.field === selectedField)
    : courseData;

  const handleGradeInputChange = (studentId, courseName, value) => {
    setGradeInputs((prev) => ({
      ...prev,
      [`${studentId}-${courseName}`]: value,
    }));
  };

  const handleEditGrade = async (studentId, courseName) => {
    const newGrade = gradeInputs[`${studentId}-${courseName}`];
    if (!newGrade) return;

    try {
      const studentDoc = doc(db, "students", studentId);
      const studentSnapshot = await getDoc(studentDoc);

      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();
        const updatedCourses = studentData.courses.map((course) =>
          course.course === courseName
            ? { ...course, degree: newGrade }
            : course
        );

        await updateDoc(studentDoc, { courses: updatedCourses });

        setCourseData((prevData) =>
          prevData.map((course) =>
            course.studentId === studentId && course.courseName === courseName
              ? { ...course, degree: newGrade }
              : course
          )
        );
        setGradeInputs((prev) => ({
          ...prev,
          [`${studentId}-${courseName}`]: "",
        }));
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error updating grade: ", error);
    }
  };

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

      const emadCourses = students.flatMap((student) => {
        if (
          !student.courses ||
          !Array.isArray(student.courses) ||
          student.courses.length === 0
        ) {
          return [];
        }

        return student.courses
          .filter((course) => course.instructor === fullName)
          .map((course) => ({
            studentId: student.id,
            courseStudent: student.fname + " " + student.lname,
            courseName: course.course,
            degree: course.degree || 0,
            field: student.field || "",
          }));
      });

      const uniqueFields = new Set(emadCourses.map((course) => course.field));

      setUniqueFieldsArray(Array.from(uniqueFields));

      setCourseData(emadCourses);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...courseData].sort((a, b) => {
      if (key === "degree") {
        const aValue = parseFloat(a[key]);
        const bValue = parseFloat(b[key]);

        if (aValue < bValue) {
          return direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      } else {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
    });

    setCourseData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <>
      <div className="w-80 m-auto">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select The Field
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option selected disabled>
            Choose a field
          </option>
          {uniqueFieldsArray.map((field, key) => (
            <option
              value={field}
              key={key}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:bg-gray cursor-pointer"
            >
              {field}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-sm w-3/4 mx-auto border border-stroke bg-white px-5 pb-6 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex flex-col">
          <div className="grid grid-cols-5 font-bold rounded-sm bg-neutral-200 dark:bg-white sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5
                className="text-[6px] md:text-sm uppercase cursor-pointer"
                onClick={() => sortData("courseStudent")}
              >
                Name {getSortDirection("courseStudent")}
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="text-[6px] md:text-sm uppercase cursor-pointer"
                onClick={() => sortData("courseName")}
              >
                Course {getSortDirection("courseName")}
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="text-[6px] md:text-sm uppercase cursor-pointer"
                onClick={() => sortData("degree")}
              >
                Grade {getSortDirection("degree")}
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5
                className="text-[6px] md:text-sm uppercase cursor-pointer"
                onClick={() => sortData("field")}
              >
                Field
                {getSortDirection("field")}
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-[6px] md:text-sm uppercase">Add Grade</h5>
            </div>
          </div>
          {filteredCourseData.map((course, key) => (
            <div
              className={`grid grid-cols-5 sm:grid-cols-5 ${
                key === filteredCourseData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="text-[6px] md:text-sm text-black dark:text-white sm:block">
                  {course.courseStudent}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-[6px] text-center md:text-sm text-black dark:text-white">
                  {course.courseName}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-[6px] md:text-sm text-black dark:text-white">
                  {course.degree}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-[6px] md:text-sm text-black dark:text-white">
                  {course.field}
                </p>
              </div>
              <div className="flex items-center justify-between p-2.5 xl:p-5">
                <input
                  type="number"
                  min="0"
                  className="w-5 sm:w-2/4 border outline-none text-black dark:text-black"
                  value={
                    gradeInputs[`${course.studentId}-${course.courseName}`] ||
                    ""
                  }
                  onChange={(e) =>
                    handleGradeInputChange(
                      course.studentId,
                      course.courseName,
                      e.target.value
                    )
                  }
                />
                <button
                  className="bg-sky-500 text-white px-3 py-1 rounded-lg w-5 sm:w-2/4"
                  onClick={() =>
                    handleEditGrade(course.studentId, course.courseName)
                  }
                >
                  <p className="flex items-center justify-center text-xs sm:text-sm xl:text-base">
                    {course.degree === "0" ? "Add" : "Edit"}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Table;
