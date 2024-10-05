import React, { useState, useEffect } from 'react';
import axios from 'axios';
const TopStudents = () => {
    const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredData] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  async function getStudentData() {
    try {
      const { data } = await axios.get('/api/students');
      setStudentData(data);
      filteredStudents(data);
      //setBrandData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }
  function calculateStudentPercentages(students) {
    return students.map((student) => {
      if (student.data && student.data.courses) {
        const totalDegrees = student.data.courses.reduce((acc, course) => {
          const degree = parseFloat(course.degree);
          return acc + (isNaN(degree) ? 0 : degree);
        }, 0);
  
        const numberOfCourses = student.data.courses.length; 
  
        const percentage = (totalDegrees / numberOfCourses);
        return {
          id: student.id,
          name: `${student.data.fname} ${student.data.lname}`,
          percentage: percentage.toFixed(2),
          field: student.data.field,
          phone: student.data.number,
        };
      }
      return null;
    }).filter(Boolean);
  }
  function getTop10Students(students) {
    const studentsWithPercentages = calculateStudentPercentages(students);
    return studentsWithPercentages.sort((a, b) => b.percentage - a.percentage).slice(0, 10);
  }
  useEffect(() => {
    getStudentData();
  }, []);
  useEffect(() => {
    setFilteredData(
      studentData.filter((student) => 
        student.data.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.data.lname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, studentData]);
  const filteredStudentsByField = selectedField
    ? filteredStudents.filter(student => student.data.field === selectedField)
    : filteredStudents;
  const top10Students = getTop10Students(filteredStudentsByField);
  const dataStudents = top10Students;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top 10 students by percentage
      </h4>
      <div className="flex flex-col mb-6 mt-4">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Percentage</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Field</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Phone</h5>
          </div>
        </div>
        {dataStudents.map((student, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === dataStudents.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={student.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">{student.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{student.percentage}%</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{student.field}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{student.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TopStudents;
