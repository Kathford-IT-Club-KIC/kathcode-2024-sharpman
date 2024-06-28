import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
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
const auth = getAuth();
const db = getFirestore();


onAuthStateChanged(auth, (user) => {
  if (user) {
   
    const postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", async (event) => {
    event.preventDefault();
  
  const user = auth.currentUser;
  
  
  const authorizedUid = "yf1kCE6NFJdi2LzmvlJybUlCIsv1"; 
  
  if (user && user.uid === authorizedUid) {
    const title = document.getElementById("title").value;
    const details = document.getElementById("details").value;
    console.log("Title:", title); 
    console.log("Details:", details); 

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        details: details,
        userId: user.uid,

      });
      
      console.log("Post added with ID:", docRef.id);
      alert("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again later.");
    }
  } else {

    alert("You are not authorized to create posts.");
    console.log("Unauthorized user attempted to create a post.");
  }
});

  } else {
    // User is not signed in
    console.log("User is not signed in.");
  }
});

