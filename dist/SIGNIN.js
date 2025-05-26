// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFPhjRm9lDp7ZA0vfoBbAmQPZXnbTxaSQ",
    authDomain: "user-logins-f72ad.firebaseapp.com",
    projectId: "user-logins-f72ad",
    storageBucket: "user-logins-f72ad.firebasestorage.app",
    messagingSenderId: "819210084565",
    appId: "1:819210084565:web:ab6f27891c09bda6f5025c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  const submit = document.querySelector(".submit");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const uid = user.uid;
            window.currentUserUID = uid;
            localStorage.setItem("uid", uid);
            window.location.href = "index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    

  })
