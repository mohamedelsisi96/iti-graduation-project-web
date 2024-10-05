"use client";
import React, { useState } from "react";
import Calendar from "../../../components/adminComponents/Calender/index";
import DefaultLayout from "../../../components/adminComponents/Layouts/DefaultLayout";

const CalendarPage = () => {
  const [selectedCalendar, setSelectedCalendar] = useState("Calendar 1");

  const handleCalendarChange = (e) => {
    setSelectedCalendar(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="my-4">
        <label htmlFor="calendarDropdown" className="mr-2">
          Select Calendar:
        </label>
        
        <select
          id="calendarDropdown"
          value={selectedCalendar}
          onChange={handleCalendarChange}
          className=" rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          <option value="Calendar 1">Front End</option>
          <option value="Calendar 2">Back End</option>
          <option value="Calendar 3">Mobil App</option>
        </select>
      </div>

      {selectedCalendar === 'Calendar 1' && <Calendar calendarId="front-end" />}
      {selectedCalendar === 'Calendar 2' && <Calendar calendarId="back-end" />}
      {selectedCalendar === 'Calendar 3' && <Calendar calendarId="mobile app" />}
    </DefaultLayout>
  );
};

export default CalendarPage;
