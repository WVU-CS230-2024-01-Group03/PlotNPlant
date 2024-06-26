// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXy5_CIVZpfQzkZyCLkQ28SDPPqu_eYiA",
  authDomain: "plotnplant.firebaseapp.com",
  projectId: "plotnplant",
  storageBucket: "plotnplant.appspot.com",
  messagingSenderId: "999766157975",
  appId: "1:999766157975:web:b004f6047275603b8497d2",
  measurementId: "G-S07K5VLQ1Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

const colRef = collection(db, 'events');
getDocs(colRef)
  .then((snapshot)=> {
    console.log(snapshot.docs)
  })
