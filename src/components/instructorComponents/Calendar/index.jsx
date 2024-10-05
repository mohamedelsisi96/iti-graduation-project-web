import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";

const Calendar = () => {
  const [events, setEvents] = useState({});

  const fullName = typeof window !== "undefined" && localStorage.getItem("fname") + 
  (localStorage.getItem("lname") === null || localStorage.getItem("lname") === "undefined" ? "" : " " + localStorage.getItem("lname"));

  console.log(fullName);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "course_instructor"));
      const newEvents = {};

      querySnapshot.forEach((doc) => {
        const courseType = doc.id; // This will be 'back-end', 'front-end', or 'mobile app'
        const courses = doc.data();

        Object.entries(courses).forEach(([key, course]) => {
          if (
            typeof course === "object" &&
            course.date &&
            course.instructor &&
            course.title
          ) {
            // Only process this course if the instructor matches fullName
            if (course.instructor === fullName) {
              const dateObj = new Date(course.date);
              const formattedDate = dateObj.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              });
              const day = dateObj.getDate();

              const newEvent = {
                title: course.title,
                date: formattedDate,
                // courseType: courseType
              };

              // if (!newEvents[day]) {
              //   newEvents[day] = [];
              // }
              newEvents[day] = newEvent;
            }
          }
        });
      });

      console.log(newEvents);
      setEvents(newEvents);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl" id="content">
      <Breadcrumb pageName="Schedule" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white"></tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => (
                <td
                  key={i + 1}
                  className={`ease relative h-20 border border-stroke p-2  duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${events[i + 1] != undefined
                    ? `md:bg-white md:dark:bg-boxdark bg-green-600 dark:bg-green-600`
                    : `transition`
                    }`}
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-16 w-full flex-grow py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-0 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] h-[50%] xl:h-[40%] md:opacity-100">
                        <span className="event-name text-xs xl:text-sm font-semibold text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-xs xl:text-sm font-medium text-black dark:text-white">
                          {events[i + 1].date}
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
