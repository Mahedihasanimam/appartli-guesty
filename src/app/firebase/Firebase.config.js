// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDx3-EyhmncplI0jSVqNTt63RSaucZkJVM",
  authDomain: "firbase-projects-75668.firebaseapp.com",
  projectId: "firbase-projects-75668",
  storageBucket: "firbase-projects-75668.firebasestorage.app",
  messagingSenderId: "683832739430",
  appId: "1:683832739430:web:b0c1e6aaa498a121df0fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {auth,app};