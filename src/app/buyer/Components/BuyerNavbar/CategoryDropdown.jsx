"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const CategoryDropdown = ({ handleCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(null);
  // const { courseBuyer, setCourseBuyer } = useContext(CourseBuyerContext);

  const categoryCourse = async (e) => {
    const selectedCategory = e.target.getAttribute("value");
    setCategory(selectedCategory);
    toggleDropdown();
    const courses = await getQuery(selectedCategory);
    handleCategory(courses);
    console.log(courses);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  async function getQuery(selectedCategory) {
    console.log(selectedCategory);
    // try {
    const q = query(
      collection(db, "courses"),
      where("category", "==", selectedCategory)
    );

    const queryCourse = await getDocs(q);

    if (queryCourse.empty) {
      console.log("No matching documents.");
      return [];
    }

    const coursesData = queryCourse.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Courses data:", coursesData);
    return coursesData;
    // } catch (error) {
    //   console.error("Error in getQuery:", error);
    //   throw error;
    // }
  }
  useEffect(() => console.log(category), [category]);
  return (
    <div className="relative">
      <div
        className="flex items-center text-color border-2  px-4 py-2 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        <button className="font-bold text-lg text-color">Categories</button>
        {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDropdown}
          ></div>
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
            {/* Add your dropdown content here */}
            <div className="p-4 text-color cardesbackground">
              <h3 className="font-bold mb-2">Category List</h3>
              <ul>
                <li
                  value="backend"
                  className="cursor-pointer"
                  onClick={categoryCourse}
                >
                  Back-End
                </li>
                <li
                  value="frontend"
                  className="cursor-pointer"
                  onClick={categoryCourse}
                >
                  Front-End
                </li>

                <li
                  value="mobileapp"
                  className="cursor-pointer"
                  onClick={categoryCourse}
                >
                  Mobile-App
                </li>
                {/* Add more categories as needed */}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDropdown;
