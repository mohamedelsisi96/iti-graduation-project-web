"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CourseBuyerContext } from "../../../BuyerContext";
import { MdDeleteSweep } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Image from "next/image";
import Swal from "sweetalert2";

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import CartPayment from "./CartPayment";
import { db } from "./../../../firebaseConfig";

const Coursess = ({ handleRouteChange }) => {
  let {
    courseBuyerCart,
    setCourseBuyerCart,
    courseBuyerWish,
    setCourseBuyerWish,
  } = useContext(CourseBuyerContext);
  const [courses, setCourses] = useState(courseBuyerCart);
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    setCourseBuyerCart(updatedCourses);
    localStorage.setItem("courseBuyerCart", JSON.stringify(updatedCourses));
  };

  const handlePaymentSuccess = async () => {
    try {
      debugger;
      const purchasedCourseIds = courses
        .filter((course) => course != null && course.id != null)
        .map((course) => course.id);
      console.log("Purchased Course IDs:", purchasedCourseIds);

      // 1. Update local state
      setCourses([]);
      setSearchTerm("");
      if (window !== "undefined") {
        localStorage.removeItem("courseBuyerCart");
      }
      let buyerEmail = "";
      if (window !== "undefined") {
        buyerEmail = window.localStorage.getItem("email");
      }
      console.log("Buyer Email:", buyerEmail);

      // 2. Update external database (if you're still using this)
      await fetch("/api/update-user-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchasedCourses: purchasedCourseIds,
        }),
      });

      // 3. Update Firebase
      const UserDataCollection = collection(db, "UserData");
      const q = query(UserDataCollection, where("email", "==", buyerEmail));
      console.log("Query:", q);

      const querySnapshot = await getDocs(q);
      console.log("Query Snapshot:", querySnapshot);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log("User Document:", userDoc.data());

        const userRef = doc(db, "UserData", userDoc.id);

        // Update the buyedCourses array with the new purchased course IDs
        await updateDoc(userRef, {
          buyedCourses: arrayUnion(...purchasedCourseIds),
        });

        console.log("Firebase update successful");

        ////////////////////////////////////////////////
        // Update the 'buyers' field in each course document
        for (const courseId of purchasedCourseIds) {
          const courseRef = doc(db, "courses", courseId);

          // Get the current 'buyers' count for the course
          const courseSnapshot = await getDoc(courseRef);
          const currentBuyersCount = courseSnapshot.data()?.buyers || 0;

          // Increment the 'buyers' field by 1 for the course
          const updatedBuyersCount = currentBuyersCount + 1;

          // Update the 'buyers' field in the course document
          await updateDoc(courseRef, { buyers: updatedBuyersCount });

          console.log(
            `Buyers count updated successfully for course ${courseId}`
          );
        }

        // 4. Show success message
        Swal.fire({
          position: "center-center",
          icon: "success",
          title:
            "Payment successful! You now have access to the purchased courses.",
          showConfirmButton: false,
          timer: 1500,
        });

        // 5. Redirect user
        handleRouteChange("MyLearning");
      } else {
        console.error("No matching user document found");
        throw new Error("User document not found");
      }
    } catch (error) {
      console.error("Error in post-payment processing:", error);

      Swal.fire({
        position: "center-center",
        icon: "error",
        title:
          "Payment was successful, but there was an error updating your account. Please contact support.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("courseBuyerCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCourseBuyerCart(parsedCart);
        setCourses(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        // If there's an error parsing, clear the invalid data
        localStorage.removeItem("courseBuyerCart");
        setCourseBuyerCart([]);
        setCourses([]);
      }
    }
  }, []);

  if (!courseBuyerCart || courseBuyerCart.length === 0) {
    return (
      <div className="max-h-full">
        <h2>No courses added to your cart please add courses</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">All Cart courses</h2>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="search about courses..."
            className="border border-gray-300 rounded-lg pl-10 dark:text-black pr-4 py-2 w-72 mr-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {courses?.map((course) => console.log(course))}

        {courses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data?.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course?.image}
                    alt={course?.data?.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course?.data?.instructor
                    ?.split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                  <p className="text-3xl text-color mb-4">{`Price: ${course?.data?.price}`}</p>
                </div>
                <div className="mt-7 flex flex-row items-center gap-2">
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="flex rounded-md h-12 w-45 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300 p-2"
                  >
                    <MdDeleteSweep className="text-3xl mr-2 " />
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CartPayment courses={courses} onSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default Coursess;
