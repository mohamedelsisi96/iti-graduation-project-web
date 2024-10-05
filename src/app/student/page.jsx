"use client"
import Calendar from "../../components/studentComponents/Calender/index";
import DefaultLayout from'../../components/studentComponents/Layouts/DefaultLayout'
function page() {
    return (
        <DefaultLayout>
            <Calendar />
        </DefaultLayout>
    );
}

export default page;
