import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG0x6o9BAogmo_CA1JI19HnRQAS9TBG2A",
  authDomain: "swasthyax.firebaseapp.com",
  projectId: "swasthyax",
  storageBucket: "swasthyax.appspot.com",
  messagingSenderId: "16642587520",
  appId: "1:16642587520:web:744c5242c48ecd13ca9f65",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (messageDiv) {
      messageDiv.style.display = "block";
      messageDiv.innerHTML = message;
      setTimeout(() => {
        messageDiv.style.display = "none";
      }, 5000);
    } else {
      console.error(`Message container with ID "${divId}" not found.`);
    }
  }

  document.getElementById('submitSignUp').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      firstName,
      lastName,
    });

    showMessage("Account Created Successfully", "signUpMessage");
    window.location.href = "homepage.html";
  } catch (error) {
    const errorCode = error.code;
    showMessage(errorCode === "auth/email-already-in-use" ? "Email already exists!" : "Unable to create user", "signUpMessage");
  }
});

document.getElementById('submitSignIn').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("loggedInUserId", userCredential.user.uid);
    showMessage("Login Successful", "signInMessage");
    window.location.href = "homepage.html";
  } catch (error) {
    const errorCode = error.code;
    showMessage(errorCode === "auth/user-not-found" ? "Account does not exist" : "Invalid credentials", "signInMessage");
  }
});
