import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBnMRzyU23h5NvfcuXs1CRkO9ignFZI030",
    authDomain: "maclearningproject.firebaseapp.com",
    projectId: "maclearningproject",
    storageBucket: "maclearningproject.firebasestorage.app",
    messagingSenderId: "492614817138",
    appId: "1:492614817138:web:7fe535240cae5e4ea379eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
