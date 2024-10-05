"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "../../../hooks/useLocalStorage"
import ClickOutside from "../ClickOutside";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (arg: boolean) => void;
// }

const menuGroups = [
    {
        name: "MENU",
        menuItems: [
            {
                icon: (
                    <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                            fill=""
                        />
                    </svg>
                ),
                label: "Schedule",
                route: "/instructor",
            },
            {
                icon: (
                    <svg
                        className="fill-current"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_130_9756)">
                            <path
                                d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                                fill=""
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_130_9756">
                                <rect
                                    width="18"
                                    height="18"
                                    fill="white"
                                    transform="translate(0 0.052124)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                ),
                label: "Table",
                route: "/instructor/table",
            },
            {
                icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="4" width="16" height="16" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M22 7l-6 5 6 5V7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
                label: "Add Video",
                route: "/instructor/video",
            },
            {
                icon: (
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                label: "Home",
                route: "/",
              },
              {
                icon: (
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6h-3.17L12 2 7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM12 4.5l3.5 3.5h-7L12 4.5zM4 20V8h16v12H4zm3-8h2v5H7zm4 0h2v5h-2zm4 0h2v5h-2z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                label: "Courses",
                route: "/user/Courses",
              },
              {
                icon: (
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm1 9h-2v-2h2v2zm0-4h-2V7h2v2z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                label: "About",
                route: "/user/About",
              },
              {
                icon: (
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"
                      fill="currentColor"
                    />
                  </svg>
                ),
                label: "Contact",
                route: "/user/Contact",
              },
        ],
    },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>

            <aside
                className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <Link href="/">

                    </Link>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        className="block lg:hidden"
                    >
                        <svg
                            className="fill-current"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                    {group.name}
                                </h3>

                                <ul className="mb-6 flex flex-col gap-1.5">
                                    {group.menuItems.map((menuItem, menuIndex) => (
                                        <SidebarItem
                                            key={menuIndex}
                                            item={menuItem}
                                            pageName={pageName}
                                            setPageName={setPageName}
                                        />

                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;
