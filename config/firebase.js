// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GetAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABeXyaJ_5eX5-cgWiWGRVru0C2FQAv4yg",
  authDomain: "petshop-app-3atb.firebaseapp.com",
  projectId: "petshop-app-3atb",
  storageBucket: "petshop-app-3atb.firebasestorage.app",
  messagingSenderId: "1025054868757",
  appId: "1:1025054868757:web:5da66297eaa7adf958951c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = GetAuth(app);