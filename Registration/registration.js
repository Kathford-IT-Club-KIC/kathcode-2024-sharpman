import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAI8rUzxFl7RkdGnPzvT9R0k2RwMDsktOc",
  authDomain: "fire-aid-nepal.firebaseapp.com",
  projectId: "fire-aid-nepal",
  storageBucket: "fire-aid-nepal.appspot.com",
  messagingSenderId: "1038346908102",
  appId: "1:1038346908102:web:088384b413c00a2e1382c7",
  measurementId: "G-52QWK1HCJH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registration = document.getElementById("registration");

registration.addEventListener("click", function (event) {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const email = `${username}@example.com`;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      
      const user = userCredential.user;


      try {

        const docRef = await addDoc(collection(db,"users"),{
        userId:user.uid,
        firstName:firstname,
        lastName:lastname,
        userName:username

        });
        console.log("Document written")
      } catch (error) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
        alert("Error: " + error.message);
        console.error("Registration Error:", error);
      // ..
    });
});
