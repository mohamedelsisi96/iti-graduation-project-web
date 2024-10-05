"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DefaultImages from "../../../app/DefaultImages";
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../../app/firebaseConfig';

function CourseDetails({id}) {
  const [data, setData] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot2 = await getDocs(collection(db, "courses"));
        querySnapshot2.forEach((doc) => {
          const courseid = doc.id;
          if (courseid === id) {
            const coursesData2 = doc.data();
            setData([
              coursesData2.title,
              coursesData2.instructor,
              DefaultImages[coursesData2.title],
            ]);
            fetchVideoUrl(coursesData2.instructor, coursesData2.title);
          }
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchVideoUrl = async (instructor, title) => {
      try {
        const videoRef = ref(storage, `${instructor}/${title}/${title}.mp4`);
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };

    fetchData();
  }, [id, storage]);
  
  useEffect(()=>{
    var newData = [];
    console.log(id);
    const fetchData = async ()=>{
      try {
        const querySnapshot2 = await getDocs(collection(db, "courses"));
        querySnapshot2.forEach((doc) => {
            const courseid = doc.id;
            if (courseid == id) {
              const coursesData2 = doc.data();
          newData = [
            coursesData2.title,
            coursesData2.instructor,
            DefaultImages[coursesData2.title],
          ];
            }
        });

    } catch (error){
        console.error("Error fetching data: ", error);
    }
    setData(newData);
    };
    fetchData();
  },[]);
  return (
    <div className='flex justify-between px-50 py-10'>
      <div className="flex flex-col justify-center items-center container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{data[0]}</h1>
          <Image
            src={data[2]}
            alt={data[0]}
            width={200}
            height={200}
            className="mb-4"
          />
          <p className="text-black dark:text-white">Instructor: {data[1]}</p>
      </div>
      <div>
        {videoUrl && <video src={videoUrl} controls />}
      </div>
    </div>
  );
}

export default CourseDetails;