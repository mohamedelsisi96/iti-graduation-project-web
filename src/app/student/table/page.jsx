import React from "react";
import Breadcrumb from "../../../components/studentComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/studentComponents/Layouts/DefaultLayout";
import TableOne from "../../../components/studentComponents/Tables/TableOne";

function page() {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Table" />
        <div className="flex flex-col gap-10">
          <TableOne />
          {/* <TableTwo />
        <TableThree /> */}
        </div>
      </DefaultLayout>
    </>
  );
}

export default page;
