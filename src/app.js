// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , onAuthStateChanged,} from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from "firebase/firestore";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
import { F1Hub } from './user_backend.js';
import { RacerUI } from './ui.js';


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

let hub = null;

onAuthStateChanged(auth, user => {
    const ref = doc(db, "f1-assignment", user.uid);
    getDoc(ref)
    .then(snap => {
        console.log("Firestore call resolved");
        console.log("exists? ->", snap.exists());
        if (snap.exists()) console.log("Doc data ->", snap.data());
        hub = new F1Hub(snap.data().Username, snap.data().Racers, snap.data().Joined);
        hub.db = db;
        hub.user = user;
        hub.loadInitialFanData((racer, added) => {
            if (added) {
                UI.render(racer);
            } else {
                UI.removeRacer(racer);
            }
        });
        hub.getFanData((racer, added) => {
            if (added) {
                UI.render(racer);
            } else {
                UI.removeRacer(racer);
            }
        });
        console.log("User class: ", hub)
    })
    .catch(err => console.error("Firestore error ->", err));
});

const addRacerButton = document.querySelector(".search-button");
const destroyRacerButton = document.querySelector(".destroy-button");
const racerZone = document.querySelector(".racers-grid");
const UI = new RacerUI(racerZone);


addRacerButton.addEventListener("click", (e) => {
    if (!hub) {
        console.error("Hub is not initialized yet.");
        return;
    }
    e.preventDefault();
    const racerInput = document.querySelector(".search-input").value;
    const numericInput = Number(racerInput);
    if (racerInput.trim() === "" || Number.isNaN(numericInput)) {
        console.error("Invalid racer input. Please enter a valid racer name.");
        return;
    }
    hub.addRacer(racerInput);
});

destroyRacerButton.addEventListener("click", (e) => {
    if (!hub) {
        console.error("Hub is not initialized yet.");
        return;
    }
    e.preventDefault();
    const racerInput = document.querySelector(".search-input").value;
    const numericInput = Number(racerInput);
    if (racerInput.trim() === "" || Number.isNaN(numericInput)) {
        console.error("Invalid racer input. Please enter a valid racer name.");
        return;
    }
    hub.removeRacer(racerInput);
});
