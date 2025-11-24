import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastesArray: localStorage.getItem("paste_Key")
    ? JSON.parse(localStorage.getItem("paste_Key"))
    : [],
};

export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const currpaste = action.payload;

      // // if paste already exist dont add in pastesarray how to do this
      // const pasteAlreadyExist = state.pastesArray.some(
      //   (paste) => paste._id === currpaste.id
      // );

      // if (pasteAlreadyExist) {
      //   toast.error("Paste Alredy Exists");
      //   return;
      // }

      state.pastesArray.push(currpaste);

      localStorage.setItem("paste_Key", JSON.stringify(state.pastesArray));

      toast("Paste Created Successfully ✅");
    },

    updateToPastes: (state, action) => {
      const currpaste = action.payload;

      const index = state.pastesArray.findIndex(
        (item) => item._id == currpaste._id
      );

      if (index >= 0) {
        state.pastesArray[index] = currpaste;

        localStorage.setItem("paste_key", JSON.stringify(state.pastesArray));

        toast("Paste Updated");
      }
    },

    resetAllPastes: (state, action) => {
      state.pastesArray = [];

      localStorage.removeItem("paste_Key");
      toast.success("All Pastes Removed 🔄");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      // console.log(pasteId);

      const index = state.pastesArray.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastesArray.splice(index, 1);

        localStorage.setItem("paste_Key", JSON.stringify(state.pastesArray));

        toast("Paste Deleted 🗑️");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  PasteSlice.actions;

export default PasteSlice.reducer;
