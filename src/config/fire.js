// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbpVPjE2wg8bljxllhsifhwW73WIaZZZA",
  authDomain: "trello-clone-2a7a6.firebaseapp.com",
  projectId: "trello-clone-2a7a6",
  storageBucket: "trello-clone-2a7a6.appspot.com",
  messagingSenderId: "443447736658",
  appId: "1:443447736658:web:41100c39f4ef71fe75a28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);