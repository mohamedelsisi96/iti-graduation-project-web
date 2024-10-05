import React from "react";

const FetchingData = () => {
  const fetchData = async () => {
    const res = await fetch("/api/courses", { caches: "force-cache" });
    const data = res.json();
    console.log(data);
    console.log('================== inside FetchingData ===============');
    return data;
  };
  
  return fetchData();
};

export default FetchingData;
