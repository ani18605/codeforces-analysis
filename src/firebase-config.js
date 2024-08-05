// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAuth, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKm2wSau2kdg7Te6OgNxt037UQUe4hNKI",
  authDomain: "cp-analyser.firebaseapp.com",
  projectId: "cp-analyser",
  storageBucket: "cp-analyser.appspot.com",
  messagingSenderId: "858616662792",
  appId: "1:858616662792:web:25bebd35c570d3ca523abd",
  measurementId: "G-8J9QCVSHP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);
// const analytics = getAnalytics(app);

export default auth;