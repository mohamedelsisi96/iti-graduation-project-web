"use client";
import React, { useContext, useEffect, useState } from "react";

import DefaultLayout from "../../components/homeComponents/Layouts/DefaultLayout";
function UserPage() {
  return (
    <DefaultLayout>
   <div className=" mb-30 mt-10">
      <div
        className="m-0 p-0 min-w-100 cardesbackground dark:text-white bg-blue-900 text-white p-4 dark:bg-[#2D344A]"
        style={{
          // "--mask":
          //   "radial-gradient(58.14px at 50% 78px, #000 99%, #54000000 101%) calc(50% - 52px) 0 / 104px 51% repeat-x, radial-gradient(58.14px at 50% -52px, #0000 99%, #000 101%) 50% 26px / 104px calc(51% - 26px) repeat-x, radial-gradient(58.14px at 50% calc(100% - 78px), #000 99%, #0000 101%) calc(50% - 52px) 100% / 104px 51% repeat-x, radial-gradient(58.14px at 50% calc(100% + 52px), #0000 99%, #000 101%) 50% calc(100% - 26px) / 104px calc(51% - 26px) repeat-x",
       "--mask":
            "radial-gradient(129.69px at 50% 174px,#000 99%,#0000 101%) calc(50% - 116px) 0/232px 51% repeat-x, radial-gradient(129.69px at 50% -116px,#0000 99%,#000 101%) 50% 58px/232px calc(51% - 58px) repeat-x, radial-gradient(129.69px at 50% calc(100% - 174px),#000 99%,#0000 101%) calc(50% - 116px) 100%/232px 51% repeat-x, radial-gradient(129.69px at 50% calc(100% + 116px),#0000 99%,#000 101%) 50% calc(100% - 58px)/232px calc(51% - 58px) repeat-x",
          WebkitMask: "var(--mask)",
          mask: "var(--mask)",
         marginLeft: "-4rem",
          marginRight: "-1.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          height: "30rem",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
          

        }}
      >
        <header
          className="header flex flex-col items-center text-center"
          
        >
          <h1 className="text-5xl ">
            Welcome to E-Learning
          </h1>
          <p className="text-3xl mb-5">
            Unlock Your Potential with Our Expert-Led Courses
          </p>

          <p className="text-xl">
            Our courses are designed to help you grow your career, learn new
            skills, or explore new hobbies.
          </p>
        </header>
      </div>
</div>
    </DefaultLayout>
  );
}
export default UserPage;
