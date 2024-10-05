// pages/accept-students.jsx
"use client";
import Breadcrumb from "../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../components/adminComponents/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Variants from "../../../Spinner";
const AcceptStudents = () => {
  const [brandData, setBrandData] = useState([]);
  const [selectedField, setSelectedField] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(brandData);
  const [selectedOption, setSelectedOption] = useState({});
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const applicantsCollection = collection(db, "UserData");
        const applicantsSnapshot = await getDocs(applicantsCollection);
        const applicantsList = applicantsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBrandData(applicantsList);
        console.table(applicantsList);
      } catch (error) {
        console.error("Error fetching applicants: ", error);
      }
    };
    fetchApplicants();
  }, []);
  useEffect(() => {
    setFilteredData(
      brandData.filter(
        (applicant) =>
          applicant.type === "applicant" &&
          (searchTerm === "" ||
            applicant.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.lname.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, brandData]);
  const handleAccept = async (applicant) => {
    try {
      if (selectedOption[applicant.id] === "accepted") {
        ////////////////////////////////
        await updateDoc(doc(db, "UserData", applicant.id), {
          type: "student",
        });
        ////////////////////////////////
        const newStudent = {
          fname: applicant.fname,
          lname: applicant.lname,
          email: applicant.email,
          number: applicant.number,
          uid: applicant.uid,
          field: applicant.field || "Front-end",
          // degree: 0, 
        };
        await setDoc(doc(db, "students", applicant.id), newStudent);
        setBrandData(brandData.filter((item) => item.id !== applicant.id));
        setSuccess(true);
      } else if (selectedOption[applicant.id] === "rejected") {
        await updateDoc(doc(db, "UserData", applicant.id), {
          type: "buyer",
        });
        setBrandData(brandData.filter((item) => item.id !== applicant.id));
      } else {
        ////////////////////////////////
        await updateDoc(doc(db, "UserData", applicant.id), {
          type: "student",
        });
        ////////////////////////////////
        const newStudent = {
          fname: applicant.fname,
          lname: applicant.lname,
          email: applicant.email,
          number: applicant.number,
          uid: applicant.uid, // Copy uid from applicant
          field: applicant.field || "Front-end", // Default value
          // field: selectedField[applicant.id] || "Front-end", // Default value
          // degree: 0, // Default value

        };
        await setDoc(doc(db, "students", applicant.id), newStudent);
        setBrandData(brandData.filter((item) => item.id !== applicant.id));
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error processing student: ", error);
      alert("Failed to process student");
    }
  };
  const handleOptionChange = (id, value) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleFieldChange = (id, value) => {
    setSelectedField((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  if (!filteredData)
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Accept Students" />
        <div className="mt-3 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex items-center justify-between">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              All applicants
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
            <div className="max-h-full">
              <Variants></Variants>

            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accept Students" />
      <div className="mt-3 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex items-center justify-between">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            All applicants
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

          <div className="grid grid-cols-7 gap-2 p-2.5 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
            <h5 className="text-[6px] xl:text-base text-center font-medium uppercase xsm:text-base">
              Name
            </h5>
            <h5 className="text-[6px] xl:text-base font-medium text-center uppercase xsm:text-base">
              Phone
            </h5>
            <h5 className="text-[6px] xl:text-base font-medium text-center uppercase xsm:text-base">
              Email
            </h5>

            <h5 className="text-[6px] xl:text-base sm:block text-sm text-center font-medium uppercase xsm:text-base">
              Selected Field
            </h5>
            <h5 className="text-[6px] xl:text-base sm:block text-sm text-center font-medium uppercase xsm:text-base">
              Grads
            </h5>
            <h5 className="text-[6px] xl:text-base sm:block text-sm text-center font-medium uppercase xsm:text-base">
              Approvement
            </h5>
            <h5 className="text-[6px] xl:text-base sm:block text-sm text-center font-medium uppercase xsm:text-base">
              Confirmation
            </h5>
          </div>
          {filteredData.map((applicant, key) => (
            <div
              className={`grid grid-cols-7 gap-2 ${key === filteredData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
                } p-2.5`}
              key={applicant.id}
            >
              <p className="text-[6px] xl:text-base text-black dark:text-white">
                {applicant.fname} {applicant.lname}
              </p>
              <p className="text-[6px] xl:text-base text-meta-3 text-center">{applicant.number}</p>
              <p className="text-[6px] xl:text-base text-meta-3 text-center">
                {applicant.email
                  ? applicant.email.split("@")[0] + "@"
                  : "No Email"}
              </p>
              <p className="text-[6px] xl:text-base text-black dark:text-white text-center">
                {applicant.field}
              </p>
              <p className="text-[6px] xl:text-base text-black dark:text-white text-center">
                {+applicant.grade > 5 ? (
                  <span className="text-[6px] xl:text-base">
                    <span className="text-[6px] xl:text-base text-meta-3"> {applicant.grade}</span>/10
                  </span>
                ) : (
                  <span className="text-[6px] xl:text-base">
                    <span className="text-meta-1 text-[6px] xl:text-base">
                      {applicant.grade}
                    </span>/10
                  </span>
                )}
              </p>
              <p className="text-[6px] xl:text-base text-black dark:text-white text-center">
                <select
                  onChange={(e) =>
                    handleOptionChange(applicant.id, e.target.value)
                  }
                  name="status"
                  className="text-[6px] xl:text-base bg-transparent"
                >
                  <option
                    value="accepted"
                    className="text-[6px] xl:text-base bg-transparent text-black"
                  >
                    accepted
                  </option>
                  <option
                    value="rejected"
                    className="text-[6px] xl:text-base bg-transparent text-black"
                  >
                    rejected
                  </option>
                </select>
              </p>
              <button
                className="text-[6px] xl:text-base text-center bg-rose-800 w-fit mx-auto p-2 rounded-md text-white"
                onClick={() => handleAccept(applicant)}
              >
                Confim
              </button>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AcceptStudents;
