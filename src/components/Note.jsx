import React, { useEffect, useState, useContext } from "react";
import { NoteContext } from "../Contexts/Notes/NotesContext";
import { Toaster } from "react-hot-toast";

function Note(props) {
  const { title: initialTitle, description: initialDescription, _id, category: initialCategory } = props.note;
  const { deleteNote, updateNote } = useContext(NoteContext);
  const [focused, setFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState(initialDescription);
  const [inputTitle, setInputTitle] = useState(initialTitle);
  const categories = ["My Notes", "Todo", "Lectures", "Examples"];
  
  const [inputCategory, setInputCategory] = useState(initialCategory); 

  useEffect(() => {
    // Your effect logic here
  }, [focused]);

  const handleNoteUpdate = () => {
    setFocused(false);
    updateNote(_id, {
      _id: _id,
      editedOn: Date.now(),
      title: inputTitle,
      description: inputDescription,
      category: inputCategory, 
    });
  };

  const handleNoteDelete = (noteId) => {
    deleteNote(noteId);
  };

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
          onBlur={handleNoteUpdate}
          onFocus={() => setFocused(true)}
          className={`card  w-96 shadow border-solid border-2 border-base-200 ease-in duration-200 ${
            focused ? "shadow-xl scale-x-110 scale-y-105" : "bg-base-100 h-fit"
          }`}
        >
          <div className="card-body p-2">
            <input
              className="input w-full text-xl rounded-sm max-w-x focus:outline-none"
              id="title"
              type="text"
              onChange={titleChanged}
              value={inputTitle}
            />

            <textarea
              value={inputDescription}
              onChange={contentChanged}
              id="textarea1"
              className={`textarea w-full rounded-sm h-full max-w-xs focus:outline-none ${
                focused ? "text-lg" : "text-sm"
              }`}
            />

            
            <select
              className=" mt-2 rounded-md p-1 "
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
            >
              
              {categories.map((category) => (
            <option
              value={category}
              key={category}
            >
              {category}
            </option>
              ))}
            </select>
          

            <div className="flex justify-center mt-2">
              <button className="btn btn-sm text-xs mr-4 hover:btn-warning">
                <i className="fa-solid fa-camera text-xl text-blue-500"></i>
              </button>
              <button
                onClick={() => handleNoteDelete(_id)}
                className="btn btn-sm text-xs hover:btn-error"
              >
                <i className="fa-solid fa-trash text-xl text-red-500 "></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Note;
