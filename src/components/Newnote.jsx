import React, { useState, useContext } from "react";
import { NoteContext } from "../Contexts/Notes/NotesContext";
import { Toaster } from "react-hot-toast";

function Note() {
  const { addNote } = useContext(NoteContext);
  const [focused, setFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategory, setInputCategory] = useState("Category1"); // Initial category
  const [typing, setTyping] = useState(false);
  const [imageUp, setImageUp] = useState(null);

  function handleAddNote() {
    
    const newNote = {
      title: inputTitle === "" ? " " : inputTitle,
      description: inputDescription === "" ? " " : inputDescription,
      category: inputCategory, 
      image: imageUp ?? null,
    };
    if (inputTitle === "" && inputDescription === "") {
      return;
    }
    addNote(newNote);
    setFocused(false);
    setInputTitle("");
    setInputDescription("");
    setInputCategory("Category1"); // Reset category after adding note
  }

  function titleChanged(e) {
    setInputTitle(e.target.value);
  }

  function contentChanged(e) {
    setInputDescription(e.target.value);
  }

  return (
    <>
      <Toaster></Toaster>
      <div className="flex justify-center m-2">
        <div
          onFocus={() => setFocused(true)}
          className={`card  w-96 shadow border-solid border-2 border-base-200 ease-in duration-200 ${
            focused
              ? "shadow-xl scale-x-110 scale-y-105"
              : "bg-base-100 h-fit"
          }`}
        >
          <div className="card-body p-2">
            <input
              onFocus={() => setTyping(true)}
              onBlur={() => setTyping(false)}
              className="input w-full text-lg rounded-sm max-w-x focus:outline-none"
              id="title"
              type="text"
              onChange={titleChanged}
              value={inputTitle}
              placeholder="Take a note..."
            />

            <textarea
              onBlur={handleAddNote}
              value={inputDescription}
              onChange={contentChanged}
              placeholder={`${focused ? "Give it a description" : ""} `}
              id="textarea1"
              className={`textarea w-full rounded-sm h-full max-w-xs focus:outline-none ${
                focused ? "text-sm" : "hidden"
              }`}
            />

            {/* Category dropdown */}
            <select
              className="mt-2 rounded-md p-1"
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
            >
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
              <option value="Category3">Category3</option>
              {/* Add more categories as needed */}
            </select>

            <div className="flex justify-center">
              <button className="btn btn-sm text-xs mr-4 hover:btn-warning">
                <i className="fa-solid fa-camera text-xl text-blue-500"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Note;
