"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import "./test.css";

const Redirect = (props) => {
  const router = useRouter();

  // useEffect(() => {
  //   const type = localStorage.getItem("type");
  //   if (type === "admin") router.push("/admin/home");
  //   else if (type === "buyer" || type === "applicant") router.push("/buyer");
  //   else if (type === "student") router.push("/student");
  //   else if (type === "instructor") router.push("/instructor");
  // }, []); // Ensure this effect only runs when type changes

  return (
    <div>
      <div>
        <br />
        <br />
        <h1>Just a moment...</h1>
        <br />
        <div className="slider">
          <div className="line" />
          <div className="break dot1" />
          <div className="break dot2" />
          <div className="break dot3" />
        </div>
        <p>
          We are redirecting you to our new site... Not working?{" "}
          <a href="#0">Click here.</a>
        </p>
      </div>
    </div>
  );
};

export default Redirect;
