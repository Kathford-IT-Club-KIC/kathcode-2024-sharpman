import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";



const firebaseConfig = {
    apiKey: "AIzaSyAI8rUzxFl7RkdGnPzvT9R0k2RwMDsktOc",
    authDomain: "fire-aid-nepal.firebaseapp.com",
    projectId: "fire-aid-nepal",
    storageBucket: "fire-aid-nepal.appspot.com",
    messagingSenderId: "1038346908102",
    appId: "1:1038346908102:web:088384b413c00a2e1382c7",
    measurementId: "G-52QWK1HCJH"
  };


  const app = initializeApp(firebaseConfig);


  const registration = document.getElementById("registration")
  