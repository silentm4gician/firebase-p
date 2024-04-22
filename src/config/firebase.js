import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


    const firebaseConfig = {
    apiKey: "AIzaSyAFZw_SodzZD2y_lom102MwONVejrEN8Pw",
    authDomain: "fir-course-f8613.firebaseapp.com",
    projectId: "fir-course-f8613",
    storageBucket: "fir-course-f8613.appspot.com",
    messagingSenderId: "745849841872",
    appId: "1:745849841872:web:047f65e42d9387a7dd16d5",
    measurementId: "G-K0LP5FMMYX"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
//database
export const db = getFirestore(app)
//storage
export const storage = getStorage(app)