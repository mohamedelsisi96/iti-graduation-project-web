"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TbLoader3 } from "react-icons/tb";
import { signIn } from "next-auth/react";
import { db, auth } from "../../app/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import styles from "./PasswordInput.module.css";

function Login() {
  const router = useRouter();
  let [loading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  const [icon, setIcon] = useState(eye);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (showPassword == false) {
      setIcon(eyeOff);
    } else {
      setIcon(eye);
    }
  };
  const handleSet = (value) => {
    setUser(value);
  };
  async function handleLogin(values) {
    try {
      debugger;
      setLoading(true);
      setErrorMsg("");
      const dbuser = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const UserType = collection(db, "UserData");
      const q = await query(UserType, where("uid", "==", dbuser.user.uid));
      const result = await getDocs(q);
      console.log(result.docs[0].data());
      if (window !== "undefined") {
        localStorage.setItem("type", result.docs[0].data().type);
        localStorage.setItem("fname", result.docs[0].data()?.fname);
        localStorage.setItem("lname", result.docs[0].data()?.lname);
        localStorage.setItem("email", values.email);

        localStorage.setItem("type", result.docs[0].data().type);
        document.cookie = `userType=${result.docs[0].data().type}`;
      }
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/redirect",
      });
      debugger;
      console.log(res);
      router.push("/redirect");
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
          /^.{4,}@(\w{3,}).(\w{3,})$/i,
          "email is required and  writen  as moh.ehab or o.y.sliem or omaryasyn"
        ),
      password: Yup.string()
        .required(
          "password is required and sould have from 6-10 number and capital &small liter"
        )
        .matches(
          /^(?=(.*\d){6,})(?=(.*[A-Z]){1})(?=(.*[a-z]){1})(?=(.*\W){1}).{9,}$/i,
          "password sould have at least 6 number and capital & small liter and have at least special characters"
        ),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          {/* <img className='w-16 mx-auto' src="src/logo.jpeg" alt="logo" /> */}
          <h2 className="text-3xl font-extrabold text-black dark:text-black">
            Hello!
          </h2>
        </div>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black dark:text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red dark:text-red">
                {formik.errors.email}
              </div>
            ) : null}
            <div className="relative">
              <div className="flex items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-black dark:text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 right-0 flex items-center pr-3`}
                  onClick={togglePasswordVisibility}
                >
                  <Icon className="text-black" icon={icon}></Icon>
                </button>
              </div>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red dark:text-red">
                {formik.errors.password}
              </div>
            ) : null}
            {errorMsg ? (
              <div className="text-sm text-red dark:text-red">{errorMsg}</div>
            ) : null}
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center py-2 px-4 border border-transparent w-full text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? <TbLoader3 /> : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-black dark:text-black">
            Do not have an account?
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-5"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
