// import { createUserWithEmailAndPassword } from "firebase/auth";

// import { NextResponse } from "next/server";
// import { auth } from "../../../firebaseConfig";
// export async function POST(request) {
//   let { email, password } = await request.json();
//   try {
//     const userData = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     return NextResponse.json({ user: userData.user }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// File: /pages/api/auth/signup.js
// File: /pages/api/auth/signup.js

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "../../../firebaseConfig";
import cors from '../../_cors'; 

export async function POST(req) {
  const res = new NextResponse(); 
  
  cors(req, res); 

  if (req.method === 'OPTIONS') {
    return res; 
  }

  try {
    const { email, password } = await req.json();

    const userData = await createUserWithEmailAndPassword(auth, email, password);

    return NextResponse.json({ user: userData.user }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
