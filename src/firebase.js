// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBedPf9TCKYuR-dV7azpkjlhaYGocZXClU",
    authDomain: "neueda-hackathon.firebaseapp.com",
    databaseURL: "https://neueda-hackathon-default-rtdb.firebaseio.com",
    projectId: "neueda-hackathon",
    storageBucket: "neueda-hackathon.firebasestorage.app",
    messagingSenderId: "649932171164",
    appId: "1:649932171164:web:ffe1463c46ce5b77a58a59",
    measurementId: "G-08KVF5WJ70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
