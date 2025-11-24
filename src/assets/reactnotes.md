# Example

const pastesAll = useSelector((state) => state.paste.pastesArray);

Breakdown:

state → represents the entire Redux store

state.paste → the slice you created using createSlice (name: "paste")

state.paste.pastesArray → the value inside that slice you want

So pastesAll now contains all the pastes stored in Redux.

### new roadmap

# 🔥 ROADMAP — How the whole project was built step-by-step

🧱 STEP 1 — Create React project

Reason → We need a frontend UI

npm create vite@latest my-paste-app
cd my-paste-app
npm install

📦 STEP 2 — Install required libraries
npm install @reduxjs/toolkit react-redux react-hot-toast
npm install react-router-dom
npm install tailwindcss

# redux

Redux Toolkit To store all pastes globally so any page can access them
React Router To navigate Home ↔ Paste Editor ↔ View Paste
Toast To show success notifications
Tailwind For UI styling
🗂 STEP 3 — Folder Structure
src
├ components
│ ├ Home.jsx
│ ├ Paste.jsx (Create/Edit page)
│ ├ ViewPaste.jsx
│ ├ Navbar.jsx
├ redux
│ ├ PasteSlice.js
│ ├ store.js

Reason → Organizing pages cleanly makes maintenance easy

# 🧠 STEP 4 — Create Redux store

📌 File: store.js

import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./PasteSlice";

export const store = configureStore({
reducer: {
paste: pasteReducer,
},
});

Reason → The store holds global data accessible from anywhere

# STEP 5 — Create PasteSlice.js

This file handles logic for CRUD operations.

const initialState = {
pastes: localStorage.getItem("paste_Key")
? JSON.parse(localStorage.getItem("paste_Key"))
: [],
};

Function What it does
addToPastes Add new paste
updateToPastes Modify paste
removeFromPastes Delete paste
resetAllPastes Delete all pastes

Reason →
Redux slice manages business logic + localStorage sync

# STEP 6 — Setup Routing

📌 In App.jsx

<Routes>
  <Route path="/" element={<Paste />} />
  <Route path="/all-pastes" element={<Home />} />
  <Route path="/paste/:id" element={<ViewPaste />} />
</Routes>

Reason →

Route Purpose
/ Create / Edit paste
/all-pastes List all pastes
/paste/:id View single paste

# 🎯 STEP 7 — Build Features

Component Functionality
Paste.jsx Creates new paste or edits existing one
Home.jsx Show list of all pastes + Search + Delete + Copy + Share
ViewPaste.jsx Open one paste in viewer mode
🔁 How data flows (VERY IMPORTANT)

# ➤ When user clicks Create My Paste

dispatch(addToPastes(data))
↓
Redux saves paste in state.pastes
↓
Paste stored in localStorage
↓
Home page reads & shows updated list

# ➤ When user clicks Edit

We pass ID inside URL query like:

/?pasteId=123

Paste.jsx → checks if pasteId exists → loads title & content into form

# ➤ When user clicks Update Save

updateToPastes() runs → replaces the paste in array → UI auto updates

# ➤ When user clicks Delete

removeFromPastes(id) → removes from array → updates localStorage

📌 Sharing Logic

Share button generates link → lets user share via WhatsApp / Telegram / X
