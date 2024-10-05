"use client";
import { useContext, createContext, useState } from "react";

export let CourseBuyerContext = createContext();

export default function CourseBuyerProvider({ children }) {
  const [courseBuyerCart, setCourseBuyerCart] = useState([]);
  const [courseBuyerLearn, setCourseBuyerLearn] = useState([]);
  const [courseBuyerWish, setCourseBuyerWish] = useState([]);

  return (
    <CourseBuyerContext.Provider
      value={{
        courseBuyerCart,
        setCourseBuyerCart,
        courseBuyerLearn,
        setCourseBuyerLearn,
        courseBuyerWish,
        setCourseBuyerWish,
      }}
    >
      {children}
    </CourseBuyerContext.Provider>
  );
}
