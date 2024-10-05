// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getDocFromCache, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeUXPKzKQ-Ij8oMtzqI9C_cWUrbPo2GQE",

  authDomain: "grad-projcet.firebaseapp.com",

  projectId: "grad-projcet",

  storageBucket: "grad-projcet.appspot.com",

  messagingSenderId: "880621406110",

  appId: "1:880621406110:web:5be96f9fe4fcfb0a8af88f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);


// storeCloud
const storage = getStorage(app)
export { db, auth,storage };
