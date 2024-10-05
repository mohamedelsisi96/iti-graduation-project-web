"use client";
import React, { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");

    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-6 flex items-center dark:bg-teal-600 bg-slate-900
      cursor-pointer p-1 rounded-full"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      <FaMoon className="text-white" size={14} />
      <div
        className="absolute  bg-white dark:bg-medium w-5 h-5 rounded-full shadow-md
        transform transition-transform duration-300"
        style={darkMode ? { left: "2px" } : { right: "2px" }}
      ></div>
      <BsSunFill className="text-yellow-500 ml-auto" size={14} />
    </div>
  );
}

export default ThemeToggle;
