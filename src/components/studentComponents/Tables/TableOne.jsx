// import { BRAND } from "@/types/brand";
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebaseConfig';

const TableOne = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const firstname = localStorage.getItem("fname");
        const lastname = localStorage.getItem("lname");
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                var newData = [];

                querySnapshot.forEach((doc) => {
                    const coursesData = doc.data();
                    if (typeof coursesData === 'object' && typeof coursesData.courses === "object" && coursesData.email && coursesData.field
                        && coursesData.fname && coursesData.lname && coursesData.number && coursesData.uid) {
                        if (coursesData.fname === firstname && coursesData.lname === lastname) {
                            coursesData.courses.forEach((coursedata) => {
                                var coursePercentage = (coursedata.degree / 100) * 100;
                                var courseStatus = "Pass";
                                if (coursePercentage >= 50) {
                                    courseStatus = "Pass";
                                } else {
                                    courseStatus = "Fail";
                                }
                                newData.push({ "course": coursedata.course, "degree": coursedata.degree, "instructor": coursedata.instructor, "percentage": coursePercentage, "status": courseStatus });
                            });
                        }
                    }
                });
                setData(newData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            };
        }
        fetchData();
    }, []);


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Courses You Take
            </h4>
            <br></br>
            <div className="flex flex-col">
                <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-[6px] md:text-sm font-medium uppercase">
                            Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-[6px] md:text-sm font-medium uppercase">
                            Grade
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-[6px] md:text-sm font-medium uppercase">
                            Percentage
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-[6px] md:text-sm font-medium uppercase">
                            Status
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-[6px] md:text-sm font-medium uppercase">
                            instructor
                        </h5>
                    </div>
                </div>
                {data.map((course, key) => (
                    <div
                        className={`grid grid-cols-5 ${key === data.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                            <p className="text-[6px] md:text-sm text-black dark:text-white sm:block">
                                {course.course}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-[6px] md:text-sm text-black dark:text-white">{course.degree}/100</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className={`text-[6px] md:text-sm text-meta-3 ${course.percentage >= 50 ? `text-success` : `text-red`}`}>{course.percentage}%</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className={`text-[6px] md:text-sm text-meta-3 ${course.status == "Pass" ? `text-success` : `text-red`}`}>{course.status}</p>
                        </div>

                        <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
                            <p className="text-[6px] md:text-sm text-black dark:text-white sm:block">
                                {course.instructor}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
