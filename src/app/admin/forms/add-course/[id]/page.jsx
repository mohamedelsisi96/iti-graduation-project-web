"use client";
import Breadcrumb from "../../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../../components/adminComponents/Layouts/DefaultLayout";
import Variants from "../../../../Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import Image from "next/image";
const Page = ({ params }) => {
  const [courses, setCourses] = useState();
  const { push } = useRouter();
  const [cTitle, setCTitle] = useState("");
  const [cTrack, setCTrack] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  const [cDuration, setCDuration] = useState("");
  const [cImage, setCImage] = useState("");
  const [loading, setLoading] = useState(true);
    // const [instructors, setInstructors] = useState([]);

  //  async function getInstractor() {
  //   let { data } = await axios.get("/api/instructors");
  //   setInstructors(data);
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setCTitle(result.title);
        setCPrice(result.price);
        setCDetails(result.details);
        setCImage(result.image);
        setCInstructor(result.instructor);
        setCDuration(result.duration);
        setCTrack(result.track);
        setCourses(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  const handlePUT = async (event) => {
    event.preventDefault();
    let imgPath = v4();
    // console.log(cImage.name + imgPath);

    if (cImage) {
      const imageRef = ref(storage, "images/courses/" + cImage.name + imgPath);
      uploadBytes(imageRef, cImage).then(() => {});
    }
    const response = await fetch(`/api/courses/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cTitle,
        price: cPrice,
        imgPath: cImage?.name + imgPath,
        details: cDetails,
        instructor: cInstructor,
        duration: cDuration,
        buyers:0,
        track: cTrack,
      }),
    });
    const data = await response.json();
    if (data.message !== null){push("/admin/forms/add-course");} 
  };

  if (loading)
    return (
      <div className="max-h-full">
        <Variants></Variants>;
      </div>
    );

  return (
    <DefaultLayout>
    <Breadcrumb pageName="update the course" />
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Input course info
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <form className="max-w-sm">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Course name
              </label>
              <input
                type="text"
                placeholder="Course name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
                value={cTitle}
                onChange={(e) => {
                  setCTitle(e.target.value);
                }}
              />
            </div>
            <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Track name
                </label>
                <select
                  type="text"
                  placeholder="Instructor name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                  value={cTrack}
                  onChange={(e) => {
                    setCTrack(e.target.value);
                  }}
                >
                  <option value="front-end">Front-end</option>
                  <option value="back-end">Back-end</option>
                  <option value="mobile-app">Mobile-app</option>
                </select>
              </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Course Price
              </label>
              <input
                type="number"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
                value={cPrice}
                onChange={(e) => {
                  setCPrice(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Instructor name
              </label>
              <input
                type="text"
                placeholder="Instructor name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
                value={cInstructor}
                onChange={(e) => {
                  setCInstructor(e.target.value);
                }}
              />
             {/* <select
        required
        value={instructors}
        onChange={(e) => setInstructors(e.target.value)}
        className="dark:bg-form-input dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
      >
        <option value="">Select Instructor</option>
        {Array.isArray(cInstructor) ? (
          instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.data.name}>
              {instructor.data.name}
            </option>
          ))
        ) : (
          <option value="" disabled>No instructors </option>
        )}
      </select> */}
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Course duration
              </label>
              <input
                type="text"
                placeholder="Course duration"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
                value={cDuration}
                onChange={(e) => {
                  setCDuration(e.target.value);
                }}
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Course details
              </label>
              <textarea
                rows={6}
                placeholder="Course details"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={cDetails}
                onChange={(e) => {
                  setCDetails(e.target.value);
                }}
              ></textarea>
            </div>

            {/* إضافة الصورة هنا */}
            <div className="my-4 flex justify-center">
              <Image
                width={100}
                height={100}
                src={cImage}
                alt={cTitle}
                className="border border-stroke rounded-lg object-cover"
                style={{ width: '200px', height: '200px' }}
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach file
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                onChange={(e) => setCImage(e.target.files[0])}
              />
            </div>
            <br />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
                onClick={(e) => handlePUT(e)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
  </DefaultLayout>
  );
};

export default Page;
