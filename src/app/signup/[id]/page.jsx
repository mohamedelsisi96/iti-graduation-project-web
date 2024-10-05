"use client";
import React, { useState } from "react";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import { doc, setDoc } from "firebase/firestore";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { TbLoader3 } from "react-icons/tb";
function Page({ params }) {
  let router = useRouter();
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  async function register(values) {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await addDoc(collection(db, "UserData"), {
        uid: params.id,
        ...values,
        type: "buyer",
      });

      router.push("/login");
      setErrorMsg("");
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data.error.code);
    }
  }
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      userName: "",
      email: "",
      number: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .required("please enter first name")
        .min(3, "First name should have at least 3 characters"),
      lname: Yup.string()
        .required("please enter last name")
        .min(3, "last name should have at least 3 characters"),
      userName: Yup.string()
        .required("please enter your user name")
        .min(6, "user name should have at least 6 characters"),
      email: Yup.string()
        .required(
          "email is required and  writen  as moh.eha or o.y.sllem or omaryasyn@gmail.com"
        )
        .matches(
          /^.{4,}@(\w{3,}).(\w{3,})$/i,
          "email is required and  writen  as moh.eha or o.y.sllem or omaryasyn@gmail.com"
        ),
      number: Yup.string()
        .required("please enter phone number")
        .matches(
          /^(01[0125]|010)\d{8}$/,
          "please enter a valid Egyptian phone number"
        ),
    }),
    onSubmit: register,
  });

  return (
    <div className="min-h-screen flex rounded-lg flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 lg:p-0">
      <div className="lg:w-3/5 w-full h-full lg:h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
          <p className="text-gray-200">
            Please fill information to complete your account.
          </p>
        </div>
      </div>
      <div className="lg:w-2/5 w-full  bg-gray-200 p-8 rounded-lg shadow-lg mt-8 lg:mt-0 lg:h-[800px] flex flex-col justify-center">
        <form
          className="space-y-4"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="text-xl text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700 font-bold text-center underline">
            Account Info
          </h3>
          <p className="text-center text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">
            complete your account
          </p>
          <input
            type="text"
            placeholder="first name"
            id="fname"
            name="fname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fname}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-black dark:text-black"
          />
          {formik.touched.fname && formik.errors.fname ? (
            <div className="text-sm text-red-600">{formik.errors.fname}</div>
          ) : null}
          <input
            type="text"
            placeholder="last name"
            id="lname"
            name="lname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lname}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-black dark:text-black"
          />
          {formik.touched.lname && formik.errors.lname ? (
            <div className="text-sm text-red-600">{formik.errors.lname}</div>
          ) : null}
          <input
            type="text"
            placeholder="user name"
            id="userName"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-black dark:text-black"
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text-sm text-red-600">{formik.errors.userName}</div>
          ) : null}

          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-black dark:text-black"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-600">{formik.errors.email}</div>
          ) : null}

          <input
            type="tel"
            placeholder="phone number"
            id="number"
            name="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-black dark:text-black"
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="text-sm text-red-600">{formik.errors.number}</div>
          ) : null}

          {errorMsg ? (
            <div className="text-sm text-red-600">{errorMsg}</div>
          ) : null}
          <button
            disabled={loading || (formik.touched.email && formik.errors.email)}
            type="submit"
            className="w-full text-center flex items-center justify-center bg-blue-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            {loading ? <TbLoader3 /> : "confirm"}
          </button>
          <p className="text-center mt-4 text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Page;
