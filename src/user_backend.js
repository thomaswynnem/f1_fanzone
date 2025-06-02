import {  doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
export class F1Hub {
    constructor(username, racers, dateJoined) {
        this.username = username;
        this.racers = racers;
        this.dateJoined = dateJoined;
    }
    addRacer = async (racer) => {
        const ref = doc(this.db, "f1-assignment", this.user.uid);
        racer = Number(racer.trim().replace(/\s+/g, ""));
        getDoc(ref)
            .then(snap => {
                if (snap.exists()) console.log("Doc data ->", snap.data());
                const currentRacers = snap.data().Racers;
                if (currentRacers.includes(racer)) {
                    console.log("Racer already exists in the list.");
                    return;
                } else {
                    const updatedRacers = [...currentRacers, racer];
                    updateDoc(ref, { Racers: updatedRacers });
                    console.log("Racer added to the list.");
                }
            })
            .catch(err => console.error("Firestore error ->", err));
    }
    removeRacer = async (racer) => {
        const ref = doc(this.db, "f1-assignment", this.user.uid);
        racer = Number(racer.trim().replace(/\s+/g, ""));
        getDoc(ref)
            .then(snap => {
                if (snap.exists()) console.log("Doc data ->", snap.data());
                const currentRacers = snap.data().Racers;  
                if (!currentRacers.includes(racer)) {
                    console.log("Racer does not exist in the list.");
                    return;
                } else {
                    const updatedRacers = currentRacers.filter(r => r !== racer);
                    updateDoc(ref, { Racers: updatedRacers });
                    console.log("Racer removed from the list.");
                }
            })
            .catch(err => console.error("Firestore error ->", err));
    }
    getFanData = async (userFunc) => {
        const ref = doc(this.db, "f1-assignment", this.user.uid)
        onSnapshot(ref, snapshot => {
                const data = snapshot.data();
                const prevRacers = this.racers;
                const currentRacers = data.Racers;
                let newRacers = currentRacers.filter(racer => !prevRacers.includes(racer));
                let firedRacers = prevRacers.filter(racer => !currentRacers.includes(racer));
                newRacers.forEach(racer => {
                    this.racers.push(racer);
                    userFunc(racer, true);
                });
                firedRacers.forEach(racer => {
                    this.racers = this.racers.filter(r => r !== racer);
                    userFunc(racer, false);
                });
            });
        }
    loadInitialFanData = async (userFunc) => {
        const ref = doc(this.db, "f1-assignment", this.user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            const data = snap.data();
            const currentRacers = data.Racers || [];
            this.racers = [...currentRacers];
            currentRacers.forEach(racer => userFunc(racer, true)); // treat as "added"
        }
    };
}
