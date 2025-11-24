import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// state.name =paste , value =pastesArray
const Paste = () => {
  // get all the pasteArraydata
  const pastesAll = useSelector((state) => state.paste.pastesArray);

  const [searchTerm, setSearchTerms] = useState("");

  // to dispatch actions from store.js
  const dispatch = useDispatch();

  const filterdData = pastesAll.filter((currpaste) => {
    return currpaste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log("filterdata ", filterdData);

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // console.log("pastes:", pastesAll);

  return (
    <div>
      <input
        className="rounded-2xl w-[600px] pl-2 h-[50px] m-3"
        type="text"
        placeholder="Search Paste"
        value={searchTerm}
        onChange={(e) => setSearchTerms(e.target.value)}
      />

      {/* cards for filtered data */}

      <div className="flex flex-col gap-5 mt-5">
        {filterdData.length > 0 &&
          filterdData.map((currpaste) => {
            return (
              <div className="border p-2 rounded-2xl" key={currpaste?._id}>
                <div className="m-2 text-left ">{currpaste.title}</div>
                <div className="m-2 text-left">{currpaste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly  mt-3 ">
                  <button>
                    <Link
                      to={`/?pasteId=${currpaste?._id}`}
                      className="text-white"
                    >
                      Edit
                    </Link>
                  </button>

                  <button className="">
                    <Link
                      to={`/paste/${currpaste?._id}`}
                      className="text-white"
                    >
                      View
                    </Link>
                  </button>

                  <button onClick={() => handleDelete(currpaste?._id)}>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currpaste?.content);

                      toast.success("Copied to ClipBoard ©️");
                    }}
                  >
                    Copy
                  </button>

                  <button>Share</button>
                </div>
                <div className="m-2 text-end">{currpaste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
