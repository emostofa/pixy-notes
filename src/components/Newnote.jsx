import React, { useState, useContext } from "react";
import { NoteContext } from "../Contexts/Notes/NotesContext";
import { Toaster } from "react-hot-toast";

function Note(props) {
  const categories = props.categories;
  const { addNote } = useContext(NoteContext);
  const [focused, setFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategory, setInputCategory] = useState(""); 
  const [typing, setTyping] = useState(false);
  const [imageUp, setImageUp] = useState(null);

  // let imageUrl = null;
  //   if (selectedFile) {
  //     imageUrl = await uploadImageToImgBB(selectedFile, "YOUR_API_KEY");
  //   }
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
    setInputCategory(categories[0]);
    setImageUp(null);
  }

  function titleChanged(e) {
    setInputTitle(e.target.value);
  }

  function contentChanged(e) {
    setInputDescription(e.target.value);
  }

  function handleFileChange(e) {
    setImageUp(e.target.files[0]);
  }

  function handleFileButton(e){
    document.getElementById("getFile").click();
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

          
            {/* <select
              className="mt-2 rounded-md p-1"
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
            >
              <option value="Category1"></option>
              <option value="Category2"></option>
              <option value="Category3"></option>
              
            </select> */}

            <div className="flex justify-center">
              <button className="btn btn-sm text-xs mr-4" onClick={handleFileButton}>
              <i className="fa-solid fa-camera text-xl text-blue-500"></i>
              </button>
              <input className="hidden"
               type="file"
               accept="image/*"
               onChange={handleFileChange}
               id="getFile"
               
              >
              </input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Note;
