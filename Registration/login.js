import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", function () {
  const authButton = document.getElementById("authButton");
  function updateAuthButton() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      authButton.textContent = "LogOut";
      authButton.href = "#";
      authButton.removeEventListener("click", handleLogin);
      authButton.addEventListener("click", handleLogout);
    } else {
      authButton.textContent = "LogIn";
      authButton.href = "#";
      authButton.removeEventListener("click", handleLogout);
      authButton.addEventListener("click", handleLogin);
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;

    if (username && password) {
      const email = `${username}@example.com`;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem("loggedIn", "true");
          window.location.href = "#";
          localStorage.setItem("UserName", username);
          // ...
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Login Error:", error);
        });
    } else {
      window.location.href = "#";
    }
  }
  function handleLogout (event){

    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedIn");
        alert("You'll be logged out");
        window.location.href = "#";
        localStorage.removeItem("UserName")
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error("Logout Error:", error);
      });
  }
  updateAuthButton();
});
