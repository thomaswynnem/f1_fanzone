// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
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

  const goToSignin = document.querySelector(".go-to-signin");
    goToSignin.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "signin.html";
    });

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            const parsedName = user.email.split('@')[0];

            const userRef = doc(db, 'f1-assignment', uid);  // UID is used as document ID

            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
              await setDoc(userRef, {
                Username: parsedName,
                Joined: new Date(),
                Racers: []
              });
            }
            window.location.href = "index.html";
          })
          .catch((error) => {
            console.error("Error signing up:", error);
          });

  })
