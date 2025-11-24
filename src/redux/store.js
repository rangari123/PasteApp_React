import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "../redux/PasteSlice";

export const store = configureStore({
  reducer: {
    // link the reducer form pasteslice.jsx
    paste: pasteReducer,
  },
});
