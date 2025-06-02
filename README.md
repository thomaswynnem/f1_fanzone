# 🏁 F1 Fanzone
F1 Fanzone is a web application where users can log in, track their favorite Formula 1 racers, and receive dynamic updates using real-time database connections and external racing APIs. Built with a modern frontend tooling stack and Firebase backend, F1 Fanzone provides a smooth and interactive fan experience.

## 🚀 Features
* Firebase Auth for user login and session management
* Firestore DB for storing user-specific racer data
* Real-time updates when racer data changes
* Integration with OpenF1 API to fetch live driver info
* Dynamic frontend built with JavaScript modules and Webpack
* Fully deployed with GitHub Pages

## 🔧 Technical Stack
### Frontend
* Vanilla JavaScript (ES6 Modules): The app uses modular JavaScript (import/export) to separate UI logic and backend interaction (e.g., F1Hub, RacerUI).
* Webpack: Bundles JS files using production and development modes.
* Uses Babel with @babel/preset-env for compatibility.
* OpenF1 API:
  * Fetches live driver metadata (name, team, headshot, session info).
  * Example endpoint: https://api.openf1.org/v1/drivers?driver_number=1&session_key=XXXX


### Backend
* Firebase Authentication: Handles secure user login and session persistence.
* Firestore: Stores per-user racer selections.
    *Example structure:
      {
        "username": "jdoe",
        "Racers": ["1", "9"],
        "dateJoined": "2025-06-01"
      }
  
### Classes
* F1Hub
Holds user data including favorite f1 racers, name, and data joined
* RacerUI
Manages DOM updates and visual rendering of racers using OpenF1 data.

## 📁 Project Structure
/src
  ├── index.html
  ├── index.js         # Entry point
  ├── user_backend.js  # F1Hub logic (Firestore)
  ├── ui.js            # RacerUI logic (DOM)
  ├── style.css
  └── /assets
/dist                  # Webpack builds here


## 🛠 Setup Instructions
Clone the repository:
git clone https://github.com/thomaswynnem/f1_fanzone.git
cd f1_fanzone
Install dependencies:
npm install
Build for production:
npm run build


