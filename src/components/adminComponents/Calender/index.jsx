"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";
import Swal from "sweetalert2";

const Calendar = ({ calendarId }) => {
  const [events, setEvents] = useState({});
  const [editingEvent, setEditingEvent] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [newInstructor, setNewInstructor] = useState("");
  const [newCourse, setNewCourse] = useState("");

  // Fetch instructors and courses when the component mounts
  useEffect(() => {
    async function getInstructors() {
      try {
        const { data } = await axios.get("/api/instructors");
        setInstructors(data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    }

    getInstructors();
  }, []);
  useEffect(() => {
    if (newInstructor) {
      const selectedInstructor = instructors.find(
        (instructor) => instructor.data.name === newInstructor
      );
      if (selectedInstructor) {
        setRelatedCourses(selectedInstructor.data.fields || []);
        // Reset the selected course when a new instructor is selected
        setNewCourse("");
      }
    }
  }, [newInstructor, instructors]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const docRef = doc(db, "course_instructor", calendarId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Fetched events: ", docSnap.data());
          setEvents(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, [calendarId]);

  const handleSaveClick = async () => {
    if (editingEvent) {
      const { title, date } = editingEvent.event;
      if (newCourse.trim() && newInstructor.trim() && date.trim()) {
        try {
          const updatedEvents = {
            ...events,
            [editingEvent.day]: {
              title: newCourse,
              instructor: newInstructor,
              date: date,
            },
          };

          const docRef = doc(db, "course_instructor", calendarId);
          await setDoc(docRef, updatedEvents);

          Swal.fire({
            text: "Saved successfully!",
            icon: "success",
            confirmButtonText: "OK",
            width: "15em",
            timer: "1000",
          });

          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setEvents(docSnap.data());
          }
        } catch (error) {
          console.error("Error saving event: ", error);
        }
      } else {
        Swal.fire({
          text: "Please fill all fields.",
          icon: "warning",
          confirmButtonText: "OK",
          width: "15em",
          timer: "1000",
        });
      }
      setEditingEvent(null);
    }
  };

  const handleEditClick = (day) => {
    const event = events[day] || { title: "", date: "" };
    const currentMonth = new Date().getMonth() + 1; // Get the current month
    const currentYear = new Date().getFullYear(); // Get the current year
    const formattedDate = `${currentYear}-${currentMonth}-${day}`; // Format the date as 'day-month-year'

    setEditingEvent({
      day,
      event: { ...event, date: formattedDate },
    });
    setNewInstructor(event.instructor || "");
    setNewCourse(event.title || "");
  };
  const handleInputChange = async (e, field) => {
    const value = e.target.value;

    if (field === "instructor") {
      setNewInstructor(value);
      setNewCourse("");
    } else if (field === "title") {
      setNewCourse(value);
    }

    setEditingEvent((prev) => ({
      ...prev,
      event: {
        ...prev.event,
        [field]: value,
      },
    }));
  };

  const handleDeleteClick = () => {
    if (editingEvent) {
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        delete updatedEvents[editingEvent.day];

        const docRef = doc(db, "course_instructor", calendarId);
        setDoc(docRef, updatedEvents)
          .then(() => {
            Swal.fire({
              text: "Deleted successfully!",
              icon: "success",
              confirmButtonText: "OK",
              width: "15em",
              timer: "1000",
            });
          })
          .catch((error) => {
            console.error("Error deleting event: ", error);
          });

        return updatedEvents;
      });

      setEditingEvent(null);
    }
  };
  const handleCancelClick = () => {
    // Reset the form fields
    setNewInstructor("");
    setNewCourse("");
    setEditingEvent(null); // Close the modal
  };
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {/* Header row for days of the week */}
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => (
                <td
                  key={i + 1}
                  className={`ease relative h-20 border border-stroke p-2 duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${
                    events[i + 1] !== undefined
                      ? "md:bg-white md:dark:bg-boxdark bg-green-600 dark:bg-green-600"
                      : "transition"
                  }`}
                  onClick={() => handleEditClick((i + 1).toString())}
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-fit flex-grow cursor-pointer py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] h-[50%] xl:h-[40%] md:opacity-100">
                        <span className="event-name text-xs xl:text-xs font-semibold text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-xs xl:text-xs font-medium text-black dark:text-white">
                          {events[i + 1].instructor.split(" ")[0]}{" "}
                          {events[i + 1].instructor
                            .split(" ")[1]
                            ?.substring(0, 6)}
                          ..
                        </span>
                        <span className="time text-xs xl:text-xs font-medium text-black dark:text-white">
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

        {editingEvent && (
          <div className="bg-gray-800 fixed inset-0 z-99 flex items-center justify-center bg-opacity-50">
            <div className="dark:bg-slate-800 dark:text-white bg-white p-5 rounded-lg shadow-lg max-w-md max-h-[80vh] overflow-y-auto border border-primary">
              <h3 className="text-lg font-bold">Edit Event</h3>

              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Instructor
                </label>
                <select
                  value={newInstructor}
                  onChange={(e) => handleInputChange(e, "instructor")}
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                >
                  <option value="" disabled>
                    Select Instructor
                  </option>
                  {instructors.length > 0 ? (
                    instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.data.name}>
                        {instructor.data.name} | (
                        {instructor.data.fields.join("-")})
                      </option>
                    ))
                  ) : (
                    <option value="">No instructors available</option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Course
                </label>
                <select
                  value={newCourse}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {relatedCourses.length > 0 ? (
                    relatedCourses.map((course, index) => (
                      <option key={index} value={course}>
                        {course}
                      </option>
                    ))
                  ) : (
                    <option value="">No courses available</option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Date
                </label>
                <input
                  type="text"
                  value={editingEvent.event.date}
                  onChange={(e) => handleInputChange(e, "date")}
                  className="dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  readOnly
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSaveClick}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelClick}
                  className="rounded bg-gray-500 px-4 py-2 text-white bg-slate-600 hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
