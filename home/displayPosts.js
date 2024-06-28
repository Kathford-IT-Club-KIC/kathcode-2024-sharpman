import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  setDoc,
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

const postsContainer = document.getElementById("postsContainer"); 
async function fetchAndDisplayPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((postDoc) => {
      const postData = postDoc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h2>${postData.title}</h2>
        <p>${postData.details}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts. Please try again later.");
  }
}
fetchAndDisplayPosts();

