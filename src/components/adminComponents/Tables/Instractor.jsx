"use client";
import React, { useState, useEffect } from "react";
import { getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";


const Instructor = () => {
  const [brandData, setBrandData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [instructorPhone, setInstructorPhone] = useState("");
  const [instructorFields, setInstructorFields] = useState("");
  const [fieldsList, setFieldsList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFieldTerm, setSearchFieldTerm] = useState("");
  const [filteredData, setFilteredData] = useState(brandData);
console.log(brandData);

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
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        instructor.fields.some((field) => field.toLowerCase().includes(searchFieldTerm.toLowerCase()))
      )
    );
  }, [searchTerm, searchFieldTerm, brandData]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "instructors", id));
      setBrandData(brandData.filter(instructor => instructor.id !== id));
    } catch (error) {
      alert("Error deleting instructor: ", error);
    }
  };

  const handleUpdate = (instructor) => {
    setSelectedInstructor(instructor);
    setInstructorName(instructor.name);
    setInstructorEmail(instructor.email);
    setInstructorPhone(instructor.phone);
    setFieldsList(instructor.fields);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (selectedInstructor) {
      try {
        const instructorRef = doc(db, "instructors", selectedInstructor.id);
        await updateDoc(instructorRef, {
          name: instructorName,
          email: instructorEmail,
          phone: instructorPhone,
          fields: fieldsList,
        });
        setBrandData(brandData.map(instructor =>
          instructor.id === selectedInstructor.id ? { ...instructor, name: instructorName, email: instructorEmail, phone: instructorPhone, fields: fieldsList } : instructor
        ));
        setSelectedInstructor(null);
         Swal.fire({
          text: 'Updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          width: "15em",
          timer: "1000"
        });
      } catch (error) {
        alert("Error updating instructor: ", error);
      }
    }
  };

  const handleAddField = () => {
    if (instructorFields.trim() && !fieldsList.includes(instructorFields)) {
      setFieldsList([...fieldsList, instructorFields]);
      setInstructorFields("");
    }
  };

  const handleDeleteItem = (index) => {
    setFieldsList(fieldsList.filter((_, i) => i !== index));
  };

  return (
    <div className="text-sm rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between">
        <h4 className="mb-6 mr-5 text-xl font-semibold text-black dark:text-white">
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
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="search about field..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5 bg-transparent text-black  dark:text-white"
            value={searchFieldTerm}
            onChange={(e) => setSearchFieldTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-6  p-2.5 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
          <h5 className="text-sm text-center font-medium xsm:text-base">
            Name
          </h5>
          <h5 className="text-sm font-medium text-center  xsm:text-base">
            Phone
          </h5>
          <h5 className="text-sm font-medium text-center  xsm:text-base">
            Email
          </h5>
          <h5 className="sm:block text-sm text-center font-medium  xsm:text-base">
            Courses
          </h5>
          <h5 className="sm:block text-sm text-center font-medium xsm:text-base">
            Delete
          </h5>
          <h5 className="sm:block text-sm text-center font-medium xsm:text-base">
            Update
          </h5>
        </div>
        {filteredData.map((instructor, key) => (
          <div
            className={`grid grid-cols-6 gap-2 ${key === filteredData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              } p-2.5`}
            key={instructor.id}
          >
            <p className="text-black dark:text-white text-center">{instructor.name}</p>
            <p className="text-meta-3 text-center">{instructor.phone}</p>
            <p className="text-meta-3 text-center">
              {instructor.email ? instructor.email.split("@")[0] + "@" : "No Email"}
            </p>
            <p className="sm:block text-black dark:text-white text-center">
              <select name="field" className="bg-transparent">
                {instructor.fields
                  .sort((a, b) => b.length - a.length)
                  .map((field, index) => (
                    <option
                      key={index}
                      value={field}
                      onClick={handleAddField}
                      className="bg-transparent text-black"
                    >
                      {field}
                    </option>
                  ))}
              </select>
            </p>
            <button
              className="sm:block text-center bg-rose-800 w-fit mx-auto p-2 rounded-md text-white"
              onClick={() => handleDelete(instructor.id)}
            >
              Delete
            </button>
            <button
              className="sm:block text-center bg-green-800 w-fit mx-auto p-2 rounded-md text-white"
              onClick={() => handleUpdate(instructor)}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {selectedInstructor && (
        <div className="fixed z-99999 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 ">
          <div className="dark:bg-slate-800 dark:text-white bg-white p-5 rounded-lg shadow-lg max-w-md max-h-[80vh] overflow-y-auto ">
            <h3 className="text-xl font-semibold mb-4">Update Instructor</h3>
            <form className="max-w-sm" onSubmit={handleSubmitUpdate}>
              <div>
                <label className="dark:text-white mb-3 block text-black text-sm font-medium  my-1">
                  Instructor Name
                </label>
                {/* <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  required
                /> */}
                  <select
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    className=" dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select Instructor</option>
                    {brandData.map((instructor) => (
                      <option key={instructor.id} value={instructor.name}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div>
                <label className="dark:text-white mb-3 block text-sm font-medium text-black my-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Instructor Email"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="dark:text-white mb-3 block text-sm font-medium text-black  my-1">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Instructor Phone"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={instructorPhone}
                  onChange={(e) => setInstructorPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="dark:text-white mb-3 block text-sm font-medium text-black ">
                  Add Field
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add field"
                    className="flex-grow rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={instructorFields}
                    onChange={(e) => setInstructorFields(e.target.value)}
                  /></div>
                  <div>
                    <label className="dark:text-white mb-3 block text-sm font-medium text-black my-1">
                      Select Course
                    </label>
                    <select
                      className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={(e) => setFieldsList([...fieldsList, e.target.value])}
                    >
                      <option value="" disabled selected>
                        Select a course
                      </option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.data.title}>
                          {course.data.title}
                        </option>
                      ))}
                    </select>
                  </div> 
                <ul className="mt-3 ">
                  {fieldsList.map((field, index) => (
                    <li key={index} className="dark:text-white flex justify-between items-center text-black hover:bg-black hover:text-white duration-500 p-1">
                      <span>{field}</span>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <IoMdClose className="text-white bg-rose-600 text-xl cursor-pointer" />
                      </button>
                    </li>

                  ))}
                </ul>
              </div>

              {/* <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Select Course
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={(e) => setFieldsList([...fieldsList, e.target.value])}
                >
                  <option value="" disabled selected>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.data.category}>
                      {course.data.category}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className=" rounded-lg bg-primary text-white w-fit p-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedInstructor(null)}
                  className="w-fit rounded-lg bg-primary  text-white p-2"
                >
                  Cancel
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructor;
