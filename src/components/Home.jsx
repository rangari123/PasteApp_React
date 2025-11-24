import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes } from "../redux/PasteSlice";
import { updateToPastes } from "../redux/PasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");

  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allpastes = useSelector((state) => state.paste.pastesArray);

  useEffect(() => {
    if (pasteId) {
      const currpaste = allpastes.find((p) => p._id === pasteId);

      setTitle(currpaste.title);
      setValue(currpaste.content);
    }
  }, [pasteId]);

  function createPaste() {
    // send the created paste and forward to slice

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      //   createdAt: new Date().toISOString(),
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      // create new paste in ls
      dispatch(addToPastes(paste));
    }

    // after creation/updation

    setValue("");
    setTitle("");
    setSearchParams({});

    // console.log(paste);
  }

  return (
    <div>
      {/* title and button */}
      <div className="flex flex-row  gap-5 mt-4 place-content-between">
        <input
          className="rounded-2xl w-[67%] pl-2 h-[50px]"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className=" p-3 rounded-2xl h-[50px] w-[200px]"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      {/* text area  */}
      <div className="mt-6">
        <textarea
          className="rounded-2xl mt-4 p-5 min-w-[500px]"
          placeholder="Enter Content "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;

/**
 * 1. // change button text using params -- parameterid
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteid");


2. function createPaste() {
    // send the created paste and forward to slice

    // below  is the paste we create after clickd on [create my paste]
    const paste = {}

3. // store this paste in local storage if pasteid exist update paste

    if (pasteId) {
      // update the paste in ls -- logic written in reducer functn
      access using dispatch funciton
    } else {
      // create new paste in ls
     }

4. if(pasteId) {
      // send the paste we create as payload
      dispatch(updateToPastes(paste));
      }else(){}

 */
