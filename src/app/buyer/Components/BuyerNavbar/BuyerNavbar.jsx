// 'use client';
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { CourseBuyerContext } from "../../../BuyerContext";
import styles from "./style.module.css"; // Import the CSS module
import ThemeToggle from "./../../../../components/Navbar/ThemeToggle";
import { useRouter } from "next/navigation";
import LogoImage from '../../../../../public/test3.png'

const Logo = () => (
  <h2 className="font-bold text-2xl text-white dark:text-white mr-12">
    <Link href="/buyer">
      <Image
        // className="w-48 h-48 m-auto"
        width={150}
        height={150}
        src={LogoImage}
        alt={`Logo`}
      />
    </Link>
  </h2>
);

const NavIcons = ({ handleRouteChange }) => {
  let { courseBuyerCart, courseBuyerWish } = useContext(CourseBuyerContext);

  const handleCart = () => {
    handleRouteChange("MyCart");
  };

  const handleWish = () => {
    handleRouteChange("MyWishlist");
  };

  return (
    <ul className="flex items-center text-color space-x-5">
      {[
        {
          Icon: FaRegHeart,
          size: 24,
          label: "Favorites",
          count: courseBuyerWish.length, // Assuming courseBuyerWish is an array
          onClick: handleWish,
        },
        {
          Icon: IoCartOutline,
          size: 30,
          label: "Cart",
          count: courseBuyerCart.length, // Assuming courseBuyerCart is an array
          onClick: handleCart,
        },
      ].map(({ Icon, size, label, count, onClick }) => (
        <li
          key={label}
          className={`text-color cursor-pointer ${styles.cartIcon}`}
          onClick={onClick}
        >
          <Icon size={size} />
          {count > 0 && <span className={styles.cartBadge}>{count}</span>}
        </li>
      ))}
    </ul>
  );
};

const BuyerNavbar = ({ handleRouteChange }) => {
  const { data, status } = useSession();
  let router = useRouter();
  return (
    <nav
      className="flex items-center cardesbackground justify-between px-20 py-7 w-full"
      role="navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000, // Ensure the navbar is above other content
        // A white background to overlay on content
      }}
    >
      <div className="flex items-center cardesbackground ">
        <Logo />
      </div>
      <ul className="flex items-center space-x-5">
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("courses")}
        >
          Courses
        </li>
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("MyLearning")}
        >
          MyLearning
        </li>
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("Scholarship")}
        >
          Scholarship
        </li>
      </ul>

      <div className="flex items-center space-x-5">
        <NavIcons handleRouteChange={handleRouteChange} />
        {/* <UserProfile /> */}
        <div className="flex justify-between items-center gap-2">
          {status === "loading" && (
            <p className="text-sm sm:text-base">Loading...</p>
          )}
          {status == "authenticated" && (
            <button
              onClick={() => {
                signOut();
              }}
              className="text-sm sm:text-base hover:text-warning"
            >
              Logout
            </button>
          )}

          {status == "unauthenticated" && (
            <button
              onClick={() => {
                router.push("/api/auth/signin");
              }}
              className="text-sm sm:text-base hover:text-warning"
            >
              Login
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default BuyerNavbar;
