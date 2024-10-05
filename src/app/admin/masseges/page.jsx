"use client";
import Swal from "sweetalert2";
import Breadcrumb from "../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/adminComponents/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Variants from "../../Spinner";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages from Firestore
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setMessages(fetchedMessages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages: ", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle open message
  const handleOpenMessage = (message) => {
    Swal.fire({
      title: message.data.subject,
      text: message.data.message,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  // Handle delete message
  const handleDeleteMessage = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "messages", id));
        setMessages(messages.filter((message) => message.id !== id));
        Swal.fire("Deleted!", "Your message has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting message: ", error);
        Swal.fire("Error!", "There was an error deleting the message.", "error");
      }
    }
  };

  return (
    <DefaultLayout>
  <Breadcrumb pageName="All Messages" />
  <div className="flex flex-col mb-6 mt-4 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    {/* Header */}
    <div className="grid grid-cols-12 rounded-sm bg-gray-2 dark:bg-meta-4">
      <div className="col-span-3 p-2.5 xl:p-5 text-left">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
      </div>
      <div className="col-span-3 p-2.5 xl:p-5 text-center">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
      </div>
      <div className="col-span-3 p-2.5 xl:p-5 text-center">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Open</h5>
      </div>
      <div className="col-span-3 p-2.5 xl:p-5 text-center hidden sm:block">
        <h5 className="text-sm font-medium uppercase xsm:text-base">Delete</h5>
      </div>
    </div>
    
    {/* Content */}
    {loading ? (
      <Variants />
    ) : (
      messages.map((message) => (
        <div className="grid grid-cols-12 gap-2 p-2.5 border-b border-stroke dark:border-strokedark" key={message.id}>
          <p className="col-span-3 text-black dark:text-white">{message.data.name}</p>
          <p className="col-span-3 text-center text-meta-3">{message.data.email}</p>
          <button
            className="col-span-3 text-center bg-green-800 w-full p-2 rounded-md text-white"
            onClick={() => handleOpenMessage(message)}
          >
            Open Message
          </button>
          <button
            className="col-span-3 text-center bg-rose-800 w-full p-2 rounded-md text-white hidden sm:block"
            onClick={() => handleDeleteMessage(message.id)}
          >
            Delete Message
          </button>
        </div>
      ))
    )}
  </div>
</DefaultLayout>
  );
};

export default Page;

