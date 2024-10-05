'use client';
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebaseConfig';
import DefaultImages from "../../../app/DefaultImages";

const CourseCard = ({ course, instructor, imgPath, id }) => (
    <Link href={`/student/courses/${id}`}>
        <div className="card card-compact bg-base-100 w-60 hover:shadow-xl hover:scale-105 cardesbackgroundcourse duration-700 border rounded-lg">
            <figure>
                <Image
                    className="w-48 h-48 m-auto"
                    width={100}
                    height={100}
                    src={imgPath}
                    alt={course}
                />
            </figure>
            <div className="card-body py-4 px-4">
                <h2 className="font-bold text-black dark:text-white">{course}</h2>
                <p className='text-black dark:text-white'>{instructor}</p>
            </div>
        </div>
    </Link>
);


function Courses() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const firstname = localStorage.getItem("fname");
        const lastname = localStorage.getItem("lname");
        var newData = [];
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));

                querySnapshot.forEach((doc) => {
                    const coursesData = doc.data();
                    if (typeof coursesData === 'object' && typeof coursesData.courses === "object" && coursesData.email && coursesData.field
                        && coursesData.fname && coursesData.lname && coursesData.number && coursesData.uid) {
                        if (coursesData.fname === firstname && coursesData.lname === lastname) {
                            coursesData.courses.forEach((coursedata) => {
                                newData.push({ "course": coursedata.course, "instructor": coursedata.instructor });
                            });
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching data: ", error);
            };
            try {
                const querySnapshot2 = await getDocs(collection(db, "courses"));

                querySnapshot2.forEach((doc) => {
                    const courseid = doc.id;
                    const coursesData2 = doc.data();
                    if (typeof coursesData2 === 'object' && coursesData2.title && coursesData2.imgPath) {
                        if (newData.length >= 1) {
                            newData.map((coursedata, index) => {
                                if (coursedata.course == coursesData2.title) {
                                    Object.assign(newData[index], { "imgPath": DefaultImages[coursesData2.title], "id": courseid });
                                }
                            });
                        }
                    }
                });

            } catch {
                console.error("Error fetching data: ", error);
            }
            setData(newData);
            console.log(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="px-10 py-5 flex gap-y-4 justify-evenly flex-wrap">
                {data.map((coursed, index) => (
                    <CourseCard key={index} {...coursed} />
                ))}
            </div>
        </>
    )
}

export default Courses;
