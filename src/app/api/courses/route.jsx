import React, { useMemo } from "react";
import { db, storage } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
let flage = true;
let data=[];
export async function GET(request) {
  if (flage) {
    let imagesRef = ref(storage, "images/courses/");
    let imageUrls = [];
    let res = await listAll(imagesRef).then((response) =>
      response.items.forEach((item) =>
        getDownloadURL(item).then((url) => imageUrls.push(url))
      )
    );
    console.log("================================================");
    console.log(res);
    console.log("================================================");
    const querySnapshot = await getDocs(collection(db, "courses"));
    if (querySnapshot) console.log("get done");
    data=[];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
        image: imageUrls.filter((url, i) => url.includes(doc.data().imgPath)),
      });
    });
    // localStorage.setItem("courses", data);
    flage = false;

    return NextResponse.json(data);
  } else {
    console.log("###################################");
    console.log("iniside cahing");
    // let data = localStorage.getItem("courses");
    return NextResponse.json(data);
  }
}
export async function POST(request) {
  const { title, price, details, duration, instructor, imgPath , buyers , track } =
    await request.json();

  try {
    console.log(imgPath);
    const docRef = await addDoc(collection(db, "courses"), {
      title: title,
      price: price,
      details: details,
      instructor: instructor,
      duration: duration,
      imgPath: imgPath != null ? imgPath : null,
      buyers : buyers,
      track : track ,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  //   console.log(res);
  console.log("============================");
  //   const data = await req.json();
  //   console.log(data);
  return NextResponse.json({ message: "course created" });
}
