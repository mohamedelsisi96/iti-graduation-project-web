import { useContext, createContext, useState } from "react";

export let CourseBuyerContext = createContext();

export default function CourseBuyerProvider({ children }) {
  const [courseBuyer, setCourseBuyer] = useState("");

  <CourseBuyerContext.Provider value={{ courseBuyer, setCourseBuyer }}>
    {children}
  </CourseBuyerContext.Provider>;
}
