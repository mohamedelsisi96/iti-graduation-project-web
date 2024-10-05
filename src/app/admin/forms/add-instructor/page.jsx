"use client";
import Breadcrumb from "../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../components/adminComponents/Layouts/DefaultLayout";
// import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Variants from "../../../Spinner";
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';

import { getDocs, collection, doc, deleteDoc, updateDoc , addDoc } from "firebase/firestore";
import { db, auth } from "../../../../app/firebaseConfig";
import { FiSearch } from "react-icons/fi";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Page = () => {
  const [instructors, setInstructors] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [courses, setCourses] = useState([]);
  const [fieldsList, setFieldsList] = useState([]);
  const [instructorName, setInstructorName] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [instructorPhone, setInstructorPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const [brandData, setBrandData] = useState([]);
  // const [selectedInstructor, setSelectedInstructor] = useState(null);
  // const [instructorFields, setInstructorFields] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchFieldTerm, setSearchFieldTerm] = useState("");
  const [filteredData, setFilteredData] = useState(brandData);

  ////////////////////////get instructors////////////////
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const instructorsCollection = collection(db, "instructors");
        const instructorSnapshot = await getDocs(instructorsCollection);
        const instructorsList = instructorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(instructorsList);

        setBrandData(instructorsList);
      } catch (error) {
        console.error("Error fetching instructors: ", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCourses(result);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchInstructors();
    fetchCourses();
  }, []);
  useEffect(() => {
    setFilteredData(
      brandData.filter((instructor) =>
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, brandData]);


  //////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchInstructors = () => {
      fetch("/api/instructors")
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          setInstructors(result);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchInstructors();
  }, []);

  useEffect(() => {
    const fetchCourses = () => {
      fetch("/api/courses")
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          setCourses(result);
        })
        .catch(error => {
          setError(error.message);
        });
    };
    fetchCourses();
  }, []);

  const generateRandomNumbers = (length) => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const generatePassword = (instructorName) => {
    const firstLetter = instructorName.charAt(0).toUpperCase();
    const secondLetter = instructorName.charAt(1).toLowerCase();
    const randomNumbers = generateRandomNumbers(6);
    return `${firstLetter}${secondLetter}@${randomNumbers}`;
  };

  const isValidEmail = (email) => {
    return email.length >= 14 && email.includes('@gmail.com');
  };


  const handleCreate = async (event) => {
    event.preventDefault();

    if (instructorName && instructorEmail && instructorPhone && fieldsList.length > 0) {
      if (!isValidEmail(instructorEmail)) {
        Swal.fire({
          icon: 'error',
          text: 'Please enter a valid email with at least 4 characters and ends with "@gmail.com".',
          confirmButtonText: 'OK',
        });
        return;
      }
      const uniquePassword = generatePassword(instructorName);
      // register({email:instructorEmail , password: uniquePassword});
      const userData = await createUserWithEmailAndPassword(
        auth,
        instructorEmail,
        uniquePassword,
      );
      console.log(userData);
      console.log("==================");
      const docRef = await addDoc(collection(db, "UserData"), {
        uid: userData.user.uid,
        type: "instructor",
        fname: instructorName,
        email: instructorEmail,
        phone: instructorPhone,
        fields: fieldsList,
      });
      console.log("Document written with ID: ", docRef.id);



      ////////////////////////////////////////////////
      const response = await fetch("/api/instructors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: instructorName,
          email: instructorEmail,
          phone: instructorPhone,
          fields: fieldsList,
          password: uniquePassword,
        }),
      });
      if (response.ok) {

        const newInstructor = await response.json();
        console.log(newInstructor);
        setInstructors((prevInstructors) => [...prevInstructors, newInstructor]);
        //const result = await response.json();
        //const refresh = await fetch("/api/instructors");
        //const refreshedInstructors = await refresh.json();
        //setInstructors(refreshedInstructors);

        //alert(`An instructor added successfully with : \nname : ${instructorName} \npassword :${uniquePassword}`);
        Swal.fire({
          icon: 'success',
          title: 'An instructor added successfully with :',
          text: `E-mail: ${instructorEmail} | Password :${uniquePassword}`,
          confirmButtonText: 'OK',
        });

        setInstructorName("");
        setInstructorEmail("");
        setInstructorPhone("");
        setFieldsList([]);
        setSuccess(true);
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Failed to add instructor.',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Please enter all required information.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCourseChange = (e) => {
    const selected = e.target.value;
    if (selected && !fieldsList.includes(selected)) {
      setFieldsList([...fieldsList, selected]);
    }
    setSelectedCourse('');
  };

  const handleDeleteItem = (index) => {
    const updatedFieldsList = [...fieldsList];
    updatedFieldsList.splice(index, 1);
    setFieldsList(updatedFieldsList);
  };

  if (loading) return <Variants />;
  if (error) return <div>Error: {error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Instructor" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-115 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Input Instructor Info</h3>
          </div>
          <div className="flex w-full flex-col gap-5.5 p-6.5">
            <form className="max-w-sm">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Instructor Name</label>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Instructor Email</label>
                <input
                  type="email"
                  placeholder="Instructor E-mail"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Instructor Phone Number</label>
                <input
                  type="tel"
                  placeholder="Instructor Phone Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorPhone}
                  onChange={(e) => setInstructorPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Select Course</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select a Course</option>
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <option key={course.id} value={course.data.title}>
                          {course.data.title}
                        </option>
                      ))
                    ) : (
                      <option value="">No courses available</option>
                    )}
                  </select>
                </div>
              </div>
              {/* Display added courses */}
              <div className="mt-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Added Courses</label>
                <ul>
                  {fieldsList.map((field, index) => (
                    <li key={index} className="flex items-center justify-between mt-2 text-sm font-medium text-black dark:text-white">
                      {field}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-500 hover:text-red-700 text-xl dark:text-red-400 dark:hover:text-red-300"
                      >
                        <IoMdClose className="bg-rose-700 text-white rounded-full" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  onClick={handleCreate}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ////////////////////////////////////// */}
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Instructors
          </h4>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="search about name..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5 bg-transparent text-black  dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-6 gap-4 p-2.5 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
            <h5 className="text-[6px] md:text-sm text-center font-medium">
              #
            </h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium">
              Name
            </h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium"></h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium">
              Email
            </h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium"></h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium">
              Password
            </h5>
            <h5 className="text-[6px] md:text-sm text-center font-medium"></h5>
          </div>
          {filteredData.map((instructor, index) => (
            <div
              className={`grid grid-cols-6 gap-4 ${index === filteredData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                } p-2.5`}
              key={instructor.id}
            >
              <p className="text-center text-black dark:text-white">
                {index + 1}
              </p>
              <p className="text-[6px] md:text-sm text-center text-black dark:text-white">
                {instructor.name}
              </p>
              <p className="text-[6px] md:text-sm text-center text-black dark:text-white"></p>
              <p className="text-[6px] md:text-sm text-center text-meta-3">
                {instructor.email}
              </p>
              <p className="text-[6px] md:text-sm text-center text-black dark:text-white"></p>
              <p className="text-[6px] md:text-sm text-center text-meta-3">
                {instructor.password}
              </p>
              <p className="text-[6px] md:text-sm text-center text-black dark:text-white"></p>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
