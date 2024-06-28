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

const loggedIn = localStorage.getItem("loggedIn");
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");

if (loginButton) {
  loginButton.addEventListener("click", function (event) {
    if (loggedIn === "true") {
      alert("Already Logged In");
    } else {
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
            localStorage.setItem("UserName", username);
            window.location.href = "../home/index.html";
          })
          .catch((error) => {
            alert("Error: " + error.message);
            console.error("Login Error:", error);
          });
      } else {
        alert("Please enter both username and password");
      }
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", function (event) {
    if (loggedIn === "true") {
      signOut(auth)
        .then(() => {
          alert("You'll be logged out");
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("UserName");

          window.location.href = "../home/index.html";
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Logout Error:", error);
        });
    } else {
      alert("Already Logged Out");
    }
  });
}
