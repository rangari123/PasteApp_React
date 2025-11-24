// to view single paste
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes } from "../redux/PasteSlice";
import { updateToPastes } from "../redux/PasteSlice";

const ViewPaste = () => {
  const { id } = useParams();

  const allpastes = useSelector((state) => state.paste.pastesArray);

  // specific paste

  const specificpaste = allpastes.filter((p) => p._id === id)[0];

  return (
    <div>
      {/* title and button */}
      <div className="flex flex-row  gap-5 mt-4 place-content-between">
        <input
          className="rounded-2xl w-[67%] pl-2 h-[50px]"
          type="text"
          placeholder="Enter Title"
          value={specificpaste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button
          onClick={createPaste}
          className=" p-3 rounded-2xl h-[50px] w-[200px]"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>

      {/* text area  */}
      <div className="mt-6">
        <textarea
          className="rounded-2xl mt-4 p-5 min-w-[500px]"
          placeholder="Enter Content "
          value={specificpaste.content}
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
