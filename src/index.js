import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3Cp5WBn2v3N9qKm5SZHVW70BKaGggKAQ",
    authDomain: "cart-3363d.firebaseapp.com",
    projectId: "cart-3363d",
    storageBucket: "cart-3363d.appspot.com",
    messagingSenderId: "901452867406",
    appId: "1:901452867406:web:eb29749bbfadfab7d0601f"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

