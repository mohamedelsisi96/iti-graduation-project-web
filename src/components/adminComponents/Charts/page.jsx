"use client";
import dynamic from "next/dynamic";
import React from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartOne from "./ChartOne";

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />
      <ChartOne />
    </>
  );
};

export default Chart;
