'use client';
import Breadcrumb from "../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from'../../../components/adminComponents/Layouts/DefaultLayout';
import Student from "../../../components/adminComponents/Tables/Student";
import Instractor from "../../../components/adminComponents/Tables/Instractor";
import { useState } from "react";

const TablesPage = () => {
  const [active, setActive] = useState("Instractor");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className="relative bottom-8 left-28 w-[90%]">
        <button
          onClick={() => setActive("Instractor")}
          className={`p-2 mr-5 duration-300 ${active === "Instractor"
            ? "bg-blue-500 text-white dark:bg-blue-800 dark:text-white"
            : "bg-slate-200 text-black dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300 dark:hover:text-white"
            }`}
        >
          Instructor
        </button>
        <button
          onClick={() => setActive("Student")}
          className={`p-2 duration-300 ${active === "Student"
            ? "bg-blue-500 text-white dark:bg-blue-800 dark:text-white"
            : "bg-slate-200 text-black dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300 dark:hover:text-white"
            }`}
        >
          Student
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {active === "Instractor" && <Instractor />}
        {active === "Student" && <Student />}
        {/* <TableTwo /> */}
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
