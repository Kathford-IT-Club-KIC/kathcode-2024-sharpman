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
const displayName = localStorage.getItem("UserName");

async function fetchAndDisplayPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));

    querySnapshot.forEach((postDoc) => {
      const postData = postDoc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h3>${postData.title}</h3>
        <p>${postData.details}</p>
        <button class="like-btn">Like</button>
        <button class="comment-toggle">Comments</button>
        <a href = "../donateFolder/donate.html"><button class="donate-btn">Donate</button></a>
        <div class="comment-section" style="display: none;">
          <div class="comments-list"></div>
          ${displayName ? '<input type="text" class="comment-input" placeholder="Write a comment..."><button class="comment-submit">Post</button>' : '<p>Please sign in to comment.</p>'}
        </div>
      `;
      postsContainer.appendChild(postElement);

      const commentToggle = postElement.querySelector(".comment-toggle");
      const commentSection = postElement.querySelector(".comment-section");
      const commentSubmit = postElement.querySelector(".comment-submit");
      const commentInput = postElement.querySelector(".comment-input");

      commentToggle.addEventListener("click", async () => {
        commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
        if (commentSection.style.display === "block") {
          await displayComments(postDoc.id, postElement);
        }
      });

      if (commentSubmit) {
        commentSubmit.addEventListener("click", async () => {
          if (commentInput.value.trim() === "") return;
          await addComment(postDoc.id, commentInput.value.trim(), displayName);
          commentInput.value = "";
          await displayComments(postDoc.id, postElement);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts. Please try again later.");
  }
}

async function displayComments(postId, postElement) {
  const commentsList = postElement.querySelector(".comments-list");
  commentsList.innerHTML = ""; // Clear previous comments

  try {
    const commentsQuery = query(collection(db, "posts", postId, "comments"));
    const commentsSnapshot = await getDocs(commentsQuery);

    commentsSnapshot.forEach((commentDoc) => {
      const commentData = commentDoc.data();
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `<strong>${commentData.displayName}</strong>: ${commentData.comment}`;
      commentsList.appendChild(commentElement);
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    alert("Failed to fetch comments. Please try again later.");
  }
}

async function addComment(postId, comment, displayName) {
  try {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      displayName,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    alert("Failed to add comment. Please try again later.");
  }
}

fetchAndDisplayPosts();
