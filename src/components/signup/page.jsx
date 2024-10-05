"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { TbLoader3 } from "react-icons/tb";
import { IoEyeOffOutline, GoEye } from "react-icons/io5";

function Page() {
  let router = useRouter();
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function register(values) {
    try {
      setLoading(true);
      setErrorMsg("");
    
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(res.data);
      router.push("/userinfo");
      setErrorMsg("");
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data.error.code);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required and  writen  as moh.eha@gmail.com")
        .matches(
          /^\w{3,}.?\w{3,}?@(\w{3,}).(\w{3,})$/i,
          "email is required and  writen  as moh.eha@gmail.com"
        ),
      password: Yup.string()
        .required(
          "password is required and sould have from 6-10 number and capital &small liter"
        )
        .matches(
          /^\d{6,10}[A-Z]{1}[a-z]{1}$/i,
          "password sould have from 6-10 number and capital &small liter"
        ),
    }),
    onSubmit: register,
  });

  return (
    <div className="min-h-screen flex rounded-lg flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 lg:p-0">
      <div className="lg:w-3/5 w-full h-full lg:h-[800px] bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 lg:rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
          <p className="text-gray-200">Please sign up to create an account.</p>
        </div>
      </div>
      <div className="lg:w-2/5 w-full  bg-gray-200 p-8 rounded-lg shadow-lg mt-8 lg:mt-0 lg:h-[800px] flex flex-col justify-center">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <h3 className="text-xl text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700 font-bold text-center underline">
            Sign Up
          </h3>
          <p className="text-center text-gray-700 sm:text-gray-500 md:text-gray-600 lg:text-gray-700">
            fill info to compleate your account
          </p>

          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-4 mt-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-400 text-gray-900"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-600">{formik.errors.email}</div>
          ) : null}
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <IoEyeOffOutline
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                <GoEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-600">{formik.errors.password}</div>
          ) : null}

          {errorMsg ? (
            <div className="text-sm text-red-600">{errorMsg}</div>
          ) : null}
          <button
            disabled={
              loading ||
              (formik.touched.email && formik.errors.email) ||
              (formik.touched.password && formik.errors.password)
            }
            type="submit"
            className="w-full text-center flex items-center justify-center bg-blue-500 mt-3 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            {loading ? <TbLoader3 /> : "Sign Up"}
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

///////////////////////////////////////////
