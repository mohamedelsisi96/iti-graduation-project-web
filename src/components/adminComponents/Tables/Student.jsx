import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig"; 
import { IoMdClose } from "react-icons/io";
import { FiSearch } from 'react-icons/fi';
import Swal from "sweetalert2";


function Student() {
  const [studentData, setStudentData] = useState([]);
  const [selectedCourseGrades, setSelectedCourseGrades] = useState({});
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectedField, setSelectedField] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentFields, setStudentFields] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newInstructor, setNewInstructor] = useState(""); 
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);

  async function getInstructors() {
    try {
      const { data } = await axios.get("/api/instructors");
      setInstructors(data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  }
 async function fetchCourses() {
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  }
  async function getStudentData() {
    try {
      const { data } = await axios.get('/api/students');
      setStudentData(data);

      const initialSelectedCourses = {};
      const initialSelectedCourseGrades = {};
      data.forEach(student => {
        if (student.data && student.data.courses && student.data.courses.length > 0) {
          const firstCourse = student.data.courses[0];
          initialSelectedCourses[student.id] = firstCourse.course;
          initialSelectedCourseGrades[student.id] = firstCourse.degree; 
        }
      });
      setSelectedCourses(initialSelectedCourses);
      setSelectedCourseGrades(initialSelectedCourseGrades);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }
  //=======
  useEffect(() => {
    if (newInstructor) {
      const selectedInstructor = instructors.find(instructor => instructor.data.name === newInstructor);
      if (selectedInstructor) {
        setRelatedCourses(selectedInstructor.data.fields || []);
      }
    }
  }, [newInstructor, instructors]);
  useEffect(() => {
    getStudentData();
    getInstructors();
    fetchCourses()
  }, []);

  useEffect(() => {
    setFilteredData(
      studentData.filter((student) => 
        student.data.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.data.lname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, studentData]);

  function handleCourseChange(studentId, event) {
    const courseName = event.target.value;
    setSelectedCourses(prevState => ({
      ...prevState,
      [studentId]: courseName
    }));

    const course = studentData
      .find(student => student.id === studentId)
      ?.data.courses.find(course => course.course === courseName);

    setSelectedCourseGrades(prevState => ({
      ...prevState,
      [studentId]: course ? course.degree : '' 
    }));
  }

  function handleFieldChange(event) {
    setSelectedField(event.target.value);
  }

  const filteredStudentsByField = selectedField
    ? filteredStudents.filter(student => student.data.field === selectedField)
    : filteredStudents;

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudentData(studentData.filter((student) => student.id !== id));
    } catch (error) {
      alert("Error deleting student: ", error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setStudentName(`${student.data.fname} ${student.data.lname}`);
    setStudentEmail(student.data.email);
    setStudentPhone(student.data.number);
    setStudentFields(student.data.courses || []); 
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (selectedStudent) {
      try {
        const studentRef = doc(db, "students", selectedStudent.id);
        const docSnap = await getDoc(studentRef);
        const currentData = docSnap.data();

        const updatedCourses = studentFields.map(field => ({
          ...field,
          degree: Number(field.degree)
        }));

        await updateDoc(studentRef, {
          courses: updatedCourses
        });

        setStudentData(studentData.map(student =>
          student.id === selectedStudent.id ? {
            ...student,
            data: {
              ...student.data,
              courses: updatedCourses
            }
          } : student
        ));
   Swal.fire({
          text: 'Updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          width: "15em",
          timer: "1000"
        });
        setSelectedStudent(null);
        setStudentName("");
        setStudentEmail("");
        setStudentPhone("");
        setStudentFields([]);
      } catch (error) {
        alert("Error updating student: ", error);
      }
    }
  };

  const handleDeleteField = (index) => {
    setStudentFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    if (newCourse && newInstructor) {
      setStudentFields([...studentFields, { course: newCourse, instructor: newInstructor }]);
      setNewCourse("");
      // setNewDegree("");
      setNewInstructor(""); 
    }
  };

  return (
    <>
      <div className="flex flex-col text-sm">
        <div className='mb-7 flex justify-between'>
          <select className=' bg-white text-black dark:bg-slate-800 dark:text-white' onChange={handleFieldChange} value={selectedField}>
            <option value="">Tracks</option>
            {studentData?.length > 0 ? (
              [...new Set(studentData.map(student => student.data.field))].map((field, index) => (
                <option key={index} value={field}>{field}</option>
              ))
            ) : (
              <option>No fields available</option>
            )}
          </select>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="search about name..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full bg-transparent text-black dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        
        <div className="grid grid-cols-12 p-2 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
          <h5 className="col-span-2 text-sm text-center font-medium xsm:text-base">Name</h5>
          <h5 className="text-sm font-medium text-center xsm:text-base">Phone</h5>
          <h5 className="col-span-2 text-sm font-medium text-center xsm:text-base">Email</h5>
          <h5 className="col-span-2 hidden sm:block text-sm text-center font-medium xsm:text-base">Courses</h5>
          <h5 className="hidden col-span-1 sm:block text-sm text-center font-medium xsm:text-base">Degree</h5>
          <h5 className="hidden col-span-2 sm:block text-sm text-center font-medium xsm:text-base">Instructor</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Delete</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Update</h5>
        </div>
        {filteredStudentsByField.map(student => (
          <div className="grid grid-cols-12 gap-2 p-2.5" key={student.id}>
            <p className="col-span-2 text-black dark:text-white">{student.data.fname} {student.data.lname}</p>
            <p className="text-meta-3 text-center">{student.data.number.toString().slice(0,7)}..</p>
            <p className="text-meta-3 text-center col-span-2">
              {student.data.email ? student.data.email.split("@")[0] + "@" : "No Email"}
            </p>
            <p className="hidden sm:block text-black  dark:text-white text-center col-span-2 ">
              <select
                className='dark:bg-slate-800'
                value={selectedCourses[student.id] || ''}
                onChange={(e) => handleCourseChange(student.id, e)}
              >
                {student.data?.courses?.length > 0 ? (
                  student.data.courses.map((course, index) => (
                    <option key={index} value={course.course}>
                      {course.course.split(" ").slice(0,2).join(" ")}
                    </option>
                  ))
                ) : (
                  <option>No courses</option>
                )}
              </select>
            </p>
            <p className=" text-center w-fit mx-auto rounded-md text-black dark:text-white">
              {selectedCourseGrades[student.id] || '0'}
            </p>
            <p className="col-span-2 text-center w-fit mx-auto rounded-md text-black dark:text-white">
              {student.data.courses && Array.isArray(student.data.courses) ? 
                student.data.courses.find(course => course.course === selectedCourses[student.id])?.instructor || 'No Instructor'
                : 'No Courses Available'}
            </p>
            <button onClick={() => handleDelete(student.id)} className="hidden sm:block text-center bg-rose-800 w-fit mx-auto p-2 rounded-md text-white">
              Delete
            </button>
            <button onClick={() => handleUpdate(student)} className="hidden sm:block text-center bg-green-800 w-fit mx-auto p-2 rounded-md text-white">
              Update
            </button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 flex z-99999 items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="dark:bg-slate-800 dark:text-white bg-white p-5 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Update Student</h3>
            <form className="space-y-4 " onSubmit={handleSubmitUpdate}>
              <div>
                <label className="dark:text-white mb-3 block text-black text-sm font-medium my-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  readOnly
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="dark:text-white mb-3 block text-black text-sm font-medium my-1">
                  Email
                </label>
                <input
                  type="email"
                  value={studentEmail}
                  readOnly
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="dark:text-white mb-3 block text-black text-sm font-medium my-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={studentPhone}
                  readOnly
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="mt-4">
                <h4 className="dark:text-white text-lg font-medium text-black mb-2">Courses and Instructor</h4>
                {studentFields.map((field, index) => (
                  <div key={index} className="mb-2 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Course"
                      value={field.course}
                      readOnly
                      className="dark:bg-slate-800 dark:text-white w-1/3 rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                    />
                    {/* <input
                      type="number"
                      placeholder="Degree"
                      disabled
                      value="0"
                      onChange={(e) => {
                        const updatedFields = [...studentFields];
                        updatedFields[index].degree = e.target.value;
                        setStudentFields(updatedFields);
                      }}
                      className="dark:bg-slate-800 dark:text-white w-1/4 rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                    /> */}
                    <input
                      type="text"
                      placeholder="Instructor"
                      value={field.instructor}
                      onChange={(e) => {
                        const updatedFields = [...studentFields];
                        updatedFields[index].instructor = e.target.value;
                        setStudentFields(updatedFields);
                      }}
                      className="dark:bg-slate-800 dark:text-white w-1/2 rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteField(index)}
                      className="text-red-600 text-2xl"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row justify-between">
                 <select
                    value={newInstructor}
                    onChange={(e) => setNewInstructor(e.target.value)}
                    className=" dark:bg-slate-800 dark:text-white w-5/12 rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.data.name}>
                        {instructor.data.name } | ({instructor.data.fields.join("-")})
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="number"
                    placeholder="Degree"
                    disabled
                    value="0"
                    onChange={(e) => setNewDegree(e.target.value)}
                    className="dark:bg-slate-800 dark:text-white w-1/4 rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  /> */}
                 
                     <select
                  className="w-5/12 dark:bg-slate-800 dark:text-white rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                 onChange={(e) => setNewCourse(e.target.value)}
                  value={newCourse}
                >
                  <option value="" disabled selected>
                 Courses
                  </option>
                   {relatedCourses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
                </select>
                </div>
                <button
                  type="button"
                  onClick={handleAddField}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 w-full rounded-lg"
                >
                  Add Course
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-white bg-red-700 py-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Student;
