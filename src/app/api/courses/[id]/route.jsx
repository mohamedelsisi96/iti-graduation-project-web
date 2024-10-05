import { db, storage } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
import { NextResponse } from "next/server";
export async function GET(request) {
  let imageUrls = [];

  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
  let imagesRef = ref(storage, "images/courses/");

  await listAll(imagesRef).then((response) =>
    response.items.forEach((item) =>
      getDownloadURL(item).then((url) => imageUrls.push(url))
    )
  );
  const querySnapshot = await getDocs(collection(db, "courses"));
  let result;
  querySnapshot.forEach((doc) => {
    doc.id === id
      ? (result = {
          id,
          ...doc.data(),
          image: imageUrls.find((url) => url.includes(doc.data().imgPath)),
        })
      : (request = null);
  });

  return NextResponse.json(result);
}

export async function DELETE(request) {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
  try {
    await deleteDoc(doc(db, "courses", id));
    return NextResponse.json({
      message: `course with ${id} has been deleted`,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PUT(request) {
  try {
    const res = new URL(request.url);
    const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
    const { title, price, imgPath, details, duration, instructor, buyers, track } = await request.json();
    const oldDoc = doc(db, "courses", id);
    updateDoc(oldDoc, { title, price, imgPath, details, duration, instructor, buyers, track });
    return NextResponse.json({
      message: `course with ${id} has been updated`,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
