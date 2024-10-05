import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../../firebaseConfig";
import "./../../../globals.css";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const Scholarship = () => {
  const [field, setField] = useState(null);
  const questions = {
    "Front-end": [
      {
        questions: "1. What does HTML stand for?",
        answers: [
          "A) HyperText Markup Language",
          "B) HyperText Management Language",
          "C) Hyper Transfer Markup Language",
          "D) HighText Markup Language",
        ],
        rightAnswer: 0,
      },
      {
        questions: "2. Which of the following is used to style a web page?",
        answers: ["A) HTML", "B) CSS", "C) JavaScript", "D) PHP"],
        rightAnswer: 1,
      },
      {
        questions: "3. Which HTML tag is used to create a hyperlink?",
        answers: ["A) <a>", "B) <link>", "C) <href>", "D) <url>"],
        rightAnswer: 0,
      },
      {
        questions: "4. What is the purpose of the <div> tag in HTML?",
        answers: [
          "A) To create a clickable button",
          "B) To define a section or a division in the document",
          "C) To insert an image",
          "D) To add a line break",
        ],
        rightAnswer: 1,
      },
      {
        questions: "5. Which CSS property is used to change the text color?",
        answers: [
          "A) color",
          "B) background-color",
          "C) text-style",
          "D) font-color",
        ],
        rightAnswer: 0,
      },
      {
        questions: "6. What does the id attribute do in HTML?",
        answers: [
          "A) Assigns a unique identifier to an element",
          "B) Specifies a class for styling",
          "C) Defines the type of an element",
          "D) Indicates the content type of an element",
        ],
        rightAnswer: 0,
      },
      {
        questions: "7. Which of the following is a valid CSS selector?",
        answers: [
          "A) .class-name",
          "B) #id-name",
          "C) element",
          "D) All of the above",
        ],
        rightAnswer: 3,
      },
      {
        questions: `8. In JavaScript, what does document.getElementById("myId") do?`,
        answers: [
          "A) Retrieves an element by its class name",
          "B) Creates a new element with the specified ID",
          "C) Selects an element with the given ID",
          "D) Deletes an element with the specified ID",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "9. Which HTML attribute is used to provide alternative text for an image?",
        answers: ["A) alt", "B) src", "C) title", "D) href"],
        rightAnswer: 0,
      },
      {
        questions:
          "10. Which of the following properties is used to control the spacing between the border and the content of an element in CSS?",
        answers: ["A) margin", "B) padding", "C) border-spacing", "D) gap"],
        rightAnswer: 1,
      },
    ],
    "Back-end": [
      {
        questions:
          "1. Which of the following is a commonly used back-end programming language?",
        answers: ["A) HTML", "B) CSS", " C) JavaScript", "  D) Python"],
        rightAnswer: 3,
      },
      {
        questions:
          "2. What is the purpose of a database in back-end development?",
        answers: [
          "A) To style web pages",
          "B) To store and manage data",
          "C) To handle client-side interactions",
          "D) To create user interfaces",
        ],

        rightAnswer: 1,
      },
      {
        questions:
          "3. Which of the following is a relational database management system (RDBMS)?",
        answers: ["A) MongoDB", "B) Firebase", "C) MySQL", "D) Redis"],
        rightAnswer: 2,
      },
      {
        questions: "4. In a RESTful API, what does the GET method do?",
        answers: [
          "A) Creates a new resource",
          "B) Updates an existing resource",
          "C) Retrieves data from the server",
          "D) Deletes a resource",
        ],

        rightAnswer: 3,
      },
      {
        questions:
          "5. Which HTTP method is used to send data to a server to create a new resource?",
        answers: ["A) GET", "B) POST", "C) PUT", "D) DELETE"],
        rightAnswer: 1,
      },
      {
        questions: "6. What does SQL stand for?",
        answers: [
          "A) Structured Query Language",
          "B) Simple Query Language",
          "C) Sequential Query Language",
          "D) Standard Query Language",
        ],
        rightAnswer: 0,
      },
      {
        questions:
          "7. Which of the following is a common back-end framework for JavaScript?",
        answers: ["A) Django", "B) Express", "C) Laravel", "D) Flask"],

        rightAnswer: 1,
      },
      {
        questions: "8. In the context of web development, what is middleware?",
        answers: [
          "A) A type of database",
          "B) A web server configuration tool",
          "C) Software that sits between an application and a database or other services",
          "D) A CSS framework",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "9. What is the primary purpose of using environment variables in back-end development?",
        answers: [
          "A) To manage user authentication",
          "B) To configure settings specific to different deployment environments (e.g., development, testing, production)",
          "C) To define CSS styles",
          "D) To handle client-side interactions",
        ],
        rightAnswer: 1,
      },
      {
        questions:
          "10. Which of the following is an example of an Object-Relational Mapping (ORM) tool?",
        answers: ["A) Sequelize", "B) Express", "C) Flask", "D) Bootstrap"],
        rightAnswer: 0,
      },
    ],
    "Mobile-app": [
      {
        questions:
          "1. Which programming language is primarily used for Android app development?",
        answers: ["A) Swift", "B) Java", "C) Kotlin", "D) Objective-C"],
        rightAnswer: 1,
      },
      {
        questions:
          "2. Which of the following is the official IDE for Android development?",
        answers: [
          "A) Xcode",
          "B) Visual Studio Code",
          "C) Android Studio",
          "D) IntelliJ IDEA",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "3. What is the primary language used for iOS app development?",
        answers: ["A) Java", "B) Kotlin", "C) Swift", "D) Python"],
        rightAnswer: 2,
      },
      {
        questions:
          "4. Which framework is commonly used for building cross-platform mobile applications?",
        answers: ["A) Angular", "B) React Native", "C) Django", "D) Laravel"],
        rightAnswer: 1,
      },
      {
        questions: `5. In mobile development, what does "UI" stand for?`,
        answers: [
          "A) Unified Interface",
          "B) User Interaction",
          "C) User Interface",
          "D) Universal Integration",
        ],
        rightAnswer: 2,
      },
      {
        questions:
          "6. Which of the following is used to handle data persistence in Android apps?",
        answers: [
          "A) SQLite",
          "B) MongoDB",
          "C) Firebase Realtime Database",
          "D) Redis",
        ],
        rightAnswer: 0,
      },
      {
        questions: "7. What is the name of Apple's app distribution platform?",
        answers: [
          "A) Google Play Store",
          "B) App Store",
          "C) Microsoft Store",
          "D) Amazon Appstore",
        ],

        rightAnswer: 1,
      },
      {
        questions: "8. In React Native, what does JSX stand for?",
        answers: [
          "A) JavaScript XML",
          "B) JavaScript Extension",
          "C) Java Syntax",
          "D) JSON XML",
        ],
        rightAnswer: 0,
      },
      {
        questions:
          "9. Which component in Flutter is used to build a user interface?",
        answers: ["A) Widget", "B) Fragment", "C) View", "D) Activity"],
        rightAnswer: 0,
      },
      {
        questions: "10. What is the purpose of an API in mobile development?",
        answers: [
          "A) To design user interfaces",
          "B) To handle user input",
          "C) To allow communication between the mobile app and external services",
          "D) To store local data",
        ],
        rightAnswer: 2,
      },
    ],
  };
  const router = useRouter();
  const [docData, setDocData] = useState();
  const [docId, setDocId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, "UserData");
      const q = query(
        usersCollection,
        where("email", "==", localStorage.getItem("email"))
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
        setDocData(doc.data());
      });
    };

    fetchData();
  }, []);
  const submitHandle = () => {
    if (field) {
      Swal.fire({
        title: "Scholarship Application",
        text: "Are you sure you want to submit the application?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          let grade = 0;
          for (let i = 0; i < questions[field].length; i++) {
            {
              if (answers[i] == questions[field][i].rightAnswer) grade++;
            }
          }
          const updateUser = async () => {
            const docRef = doc(db, "UserData", docId);
            await updateDoc(docRef, { type: "applicant", grade: grade, field });
          };
          updateUser();
          Swal.fire(
            "Submitted!",
            "Your application has been submitted.",
            "success"
          );
        } else if (result.isDismissed) {
          Swal.fire(
            "Cancelled",
            "Your application has been canceled.",
            "error"
          );
        }
        router.push("/buyer");
      });
    } else {
      Swal.fire("Error", "Please select a field", "error");
    }
  };
  let answers = [];
  if (docData?.type == "applicant")
    return (
      <div>
        <h2 className="text-primary text-3xl">You are already an applicant</h2>
        <p className="text-xl">You can not apply again</p>
      </div>
    );

  return (
    <div>
      <label htmlFor="" style={{ fontSize: "1.4rem" }}>
        Select Field you want
      </label>
      <select
        type="text"
        placeholder="Instructor name"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        required
        style={{ fontSize: "1rem" }}
        value={field}
        onChange={(e) => {
          setField(e.target.value);
        }}
      >
        <option selected value="">
          -- select field --
        </option>
        <option value="Front-end">Front-end</option>
        <option value="Back-end">Back-end</option>
        <option value="Mobile-app">Mobile App</option>
      </select>
      {field?.length > 0 ? (
        <div className="cardesbackgroundcourse rounded-2xl p-4 m-4">
          {questions[field]?.map((q, i) => {
            return (
              <div key={i} style={{ margin: "1rem" }}>
                <h2 style={{ fontSize: "1.4rem" }}>{q?.questions}</h2>
                {q?.answers?.map((a, j) => {
                  return (
                    <div key={i + j}>
                      <input
                        type="radio"
                        name={"question" + i}
                        id={"question" + i + j}
                        value={a}
                        onChange={() => (answers[i] = j)}
                        style={{ margin: ".5rem", marginLeft: "1rem" }}
                      />
                      <label
                        htmlFor={"question" + i + j}
                        style={{ fontSize: "1.1rem" }}
                      >
                        {" "}
                        {a}
                      </label>
                    </div>
                  );
                })}
                <hr />
              </div>
            );
          })}

          <div className="flex justify-center items-center ">
            <button
              onClick={submitHandle}
              type="button"
              style={{ margins: "0 auto" }}
              className="text-white m-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-6"
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Scholarship;
