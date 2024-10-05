"use client"
import { CiMobile1 } from "react-icons/ci";
import { SlEnvolopeLetter } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import DefaultLayout from "../../../components/homeComponents/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';
import { getDocs, collection, doc, deleteDoc, updateDoc , addDoc } from "firebase/firestore";
import { db, auth } from "../../../app/firebaseConfig";
function ContactPage() {
  // const [messages, setMessages] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        subject,
        message,
      });
      Swal.fire("Success!", "Your message has been sent!", "success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire("Error!", "There was an error sending your message.", "error");
    }
  };
  return (
    <DefaultLayout>
    <div className="min-h-screen text-color flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full p-4">
        <div className="box-1 flex flex-col justify-center p-6">
          <h4 className="text-lg font-semibold mb-2 text-blue-700">
            Contact Us
          </h4>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            How Can I Help You?
          </h2>
          <p className="mb-4">Fill in the form or drop an email</p>
          <div className="tele space-y-2 grid grid-cols-2 md:grid-cols-1 ">
            <h3 className="flex items-center text-lg">
              <CiMobile1 className="mr-2" /> <span>+1282185755</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <SlEnvolopeLetter className="mr-2" /> <span>exm@gmail.com</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <BsTelephone className="mr-2" /> <span>0483643317</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <CiLocationOn className="mr-2" /> <span>banha.ITI</span>
            </h3>
          </div>
        </div>
        <div className="box-2 flex flex-col justify-center p-6 bg-gray-100 rounded-md shadow-2xl  border-1">
          <form className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="mt-1 block w-full p-2 border rounded-md text-black"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-700 hover:bg-blue-600 duration-300 w-full text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
    </DefaultLayout>
  );
}
export default ContactPage;
