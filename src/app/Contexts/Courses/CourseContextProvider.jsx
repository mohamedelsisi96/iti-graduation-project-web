"use client";
import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import DefaultImages from "../../DefaultImages";
export const courseContext = createContext();
const func = () => {
  console.log("func called");
};
const CourseContextProvider = ({ children }) => {
  const [localCourse, setLocalCourse] = useState();
  useEffect(() => {
    axios
      .get("/api/courses")
      .then((response) => {
        if (response.data) {
          setLocalCourse(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
  localCourse?.map((course) => {
    // course.image =
    //   course?.image?.length == 0
    //     ? DefaultImages[course.data.title]
    //     : course.image;
    course.image =DefaultImages[course.data.title];
     
  });
  const obj = useMemo(
    () => ({
      localCourse,
      setLocalCourse,
    }),
    [localCourse]
  );

  return (
    <courseContext.Provider value={obj}>{children}</courseContext.Provider>
  );
};

export default memo(CourseContextProvider);
