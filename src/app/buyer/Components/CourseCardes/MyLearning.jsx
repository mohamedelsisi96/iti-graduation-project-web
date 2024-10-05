import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";
import { courseContext } from "./../../../Contexts/Courses/CourseContextProvider";
import Image from "next/image";

function MyLearning() {
  const [buyedCourses, setBuyedCourses] = useState([]);
  const [courses, setCourses] = useState(null);
  const [learningCourses, setLearningCourses] = useState([]);
  const { localCourse } = useContext(courseContext);
  console.log(localCourse);

  useEffect(() => {
    setCourses(localCourse);
  }, [localCourse]);
  function openCourseDetails(id) {
    console.log(id);
  }

  useEffect(() => {
    const fetchCourseDetails = async () => {
      for (const courseId of selectedCourses) {
        if (!videoUrls[courseId]) {
          setIsLoading(true);
          try {
            const courseRef = doc(db, "courses", courseId);
            const courseSnap = await getDoc(courseRef);
            if (courseSnap.exists()) {
              const courseData = courseSnap.data();
              const videoRef = ref(
                storage,
                `${courseData.instructor}/${courseData.title}/${courseData.title}.mp4`
              );
              const url = await getDownloadURL(videoRef);
              setVideoUrls((prev) => ({
                ...prev,
                [courseId]: {
                  title: courseData.title,
                  instructor: courseData.instructor,
                  url,
                },
              }));
            } else {
              console.error("No such course!");
            }
          } catch (error) {
            console.error("Error fetching course:", error);
            setError("Error fetching course: " + error.message);
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    fetchCourseDetails();
  }, [selectedCourses]);

  async function getData() {
    try {
      let buyerEmail = "";

      if (window !== "undefined") {
        buyerEmail= window.localStorage.getItem("email");
      }
      const UserDataCollection = collection(db, "UserData");
      const q = query(UserDataCollection, where("email", "==", buyerEmail));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        let userDocument = userDoc.data();
        setBuyedCourses(userDocument.buyedCourses);
        console.log(userDocument.buyedCourses);
        console.log("Firebase update successful");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (courses && buyedCourses?.length > 0) {
      const filteredCourses = courses.filter((course) =>
        buyedCourses.includes(course.id)
      );
      setLearningCourses(filteredCourses);
    }
  }, [courses, buyedCourses]);

  return (
    <div>
      <div className="flex items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">Learning courses</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {learningCourses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course.image}
                    alt={course.data.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course.data.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      openCourseDetails(course.id);
                    }}
                  >
                    start learning
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly items-center">
        {/* {isLoading && <p>Loading...</p>} */}
        {error && <p>Error: {error}</p>}
        {Object.entries(videoUrls).map(([courseId, videoData]) => (
          <div key={courseId} className="mb-6">
            <h3 className="text-2xl mb-2">{videoData.title}</h3>
            <p className="mb-2">Instructor: {videoData.instructor}</p>
            <video width="320" height="240" controls>
              <source src={videoData.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyLearning;
