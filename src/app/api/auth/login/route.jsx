import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
export async function POST(request) {
  let { email, password } = await request.json();
  console.log(email);
  try {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    const querySnapshot = await getDocs(collection(db, "UsersTypes"));
    let userType;
    querySnapshot.forEach((doc) =>
      doc.data().UID == userData.user.uid ? (userType = doc.data().type) : null
    );
    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
