import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";

const Calendar = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const firstname = localStorage.getItem("fname");
    const lastname = localStorage.getItem("lname");
    var field = null;
    var cdata = [];
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        var newEvents = {};

        querySnapshot.forEach((doc) => {
          const coursesData = doc.data();
          // const currentStudent= coursesData.map(st=>st?.fname== firstname && st?.lname== lastname)
          console.log(coursesData);

          // if (
          //   typeof coursesData === "object" &&
          //   typeof coursesData.courses === "object" &&
          //   coursesData.email &&
          //   coursesData.field &&
          //   coursesData.fname &&
          //   coursesData.lname &&
          //   coursesData.number &&
          //   coursesData.uid
          // ) {
          console.log(
            `${coursesData.fname}---------------------------------${coursesData.lname}`
          );
          if (
            coursesData.fname === firstname &&
            coursesData.lname === lastname
          ) {
            console.log("---------------------get data-----------------------");
            field = coursesData.field.toLowerCase();
            coursesData?.courses?.map((c, index) => {
              cdata.push(c.course);
              console.log(cdata);
            });
            console.log(field);
          }
          // }
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      if (field) {
        try {
          const querySnapshot2 = await getDocs(
            collection(db, "course_instructor")
          );
          querySnapshot2.forEach((doc2) => {
            const courseType = doc2.id;
            if (courseType == field) {
              const coursesData2 = doc2.data();
              console.log(courseType);
              Object.entries(coursesData2).forEach(([key, course]) => {
                if (
                  typeof course == "object" &&
                  course.date &&
                  course.instructor &&
                  course.title
                ) {
                  cdata.forEach((c2) => {
                    if (c2 == course.title) {
                      console.log(course.title);
                      const dateObj2 = new Date(course.date);
                      const formattedDate2 = dateObj2.toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short" }
                      );
                      const day2 = dateObj2.getDate();

                      var newEvent = {
                        title: course.title,
                        date: formattedDate2,
                        instructor: course.instructor,
                        courseType: courseType,
                      };

                      newEvents[day2] = newEvent;
                    }
                  });
                }
              });
            }
          });
          console.log(newEvents);
          setEvents(newEvents);
        } catch {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();
  }, []);

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
                  className={`ease relative h-20 border border-stroke p-2  duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${
                    events[i + 1] != undefined
                      ? `md:bg-white md:dark:bg-boxdark bg-green-600 dark:bg-green-600`
                      : `transition`
                  }`}
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-16 w-full flex-grow py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-0 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] h-[50%] md:opacity-100">
                        <span className="event-name text-[7.5px] xl:text-xs text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-[7.5px] xl:text-xs text-black dark:text-white">
                          {events[i + 1].instructor}
                        </span>
                        <span className="time text-[7.5px] xl:text-xs text-black dark:text-white">
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
