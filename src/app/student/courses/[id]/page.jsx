import React from 'react';
import CourseDetails from "../../../../components/studentComponents/CourseDeatils/CourseDeatils";

function page({ params }) {
    return (
        <>
            <CourseDetails id={params.id} />
        </>
    )
}

export default page
