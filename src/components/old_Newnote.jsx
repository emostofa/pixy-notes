import React, { useEffect, useState, useContext } from "react";
import { NoteContext } from "../Contexts/Notes/NotesContext";
function NewNote(props) {
  
  const { addNote } = useContext(NoteContext);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [inputTitle, setTitle] = useState("");
  const [typingText, setTypingText] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    
    if(!focused){
     
      return () => {
        addNote(inputTitle, content);
        
      } 
    }
  }, [focused]) 
  
  
  

  function titleChanged(e) {
    setTitle(e.target.value);
  }

  function contentChanged(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    if (!typing && !typingText) {
      setFocused(false);
    }
    addNote(inputTitle, content);
  }, [focused, typing, typingText]);

  return (
    <>
    <div className="flex justify-center">
      <div
        onBlur={() => {
        setFocused(false);
        }}
        onFocus={() => {
        setFocused(true);
        }}
        className={`card w-96  shadow border-solid border-2 border-base-200 ease-in duration-200  ${
          focused
            ? " shadow-xl scale-x-105 scale-y-105 "
            : "bg-base-100 h-fit"
        }`}
      >
        <div className={`card-body p-3 `}>
          <input className={`input  w-full text-xl  max-w-xs ${focused ? "hidden" : ""}`} placeholder="Take a note..." />
          <input
            className="input w-full text-xl rounded-sm max-w-x focus:outline-none"
            id="title"
            type="text"
            onChange={titleChanged}
            value={inputTitle}
          />

          <textarea
            value={content}
            onChange={contentChanged}
            id="textarea1"
            className={`textarea w-full rounded-sm h-full max-w-xs focus:outline-none ${
              focused ? "text-lg" : "text-sm"
            }`}
          />
          
        </div>
        <button className={`btn btn-sm text-xs mr-4 hover:btn-warning ${focused ? "" : "hidden"}`}>
              <i className="fa-solid fa-camera text-xl text-blue-500"></i>
            </button>
      </div>
    </div>
    {/* <input
            className={`input w-full rounded-sm max-w-x focus:outline-none ${focused ? "" : "hidden"}`}
            id="title"
            type="text"
            onBlur={() => setTyping(false)}
            onFocus={() => {
              setFocused(true);
              setTypingText(true);
            }}
            onChange={titleChanged}
            value={inputTitle}
            placeholder="Give a title..."
          />

          <textarea
            value={content}
            onChange={contentChanged}
            onBlur={() => setTypingText(false)}
            onFocus={() => {
              setFocused(true);
              setTypingText(true);
            }}
            placeholder="Take a note..."
            id="textarea1"
            className={`textarea w-full rounded-sm h-full max-w-xs focus:outline-none ${
              focused ? "text-sm" : "text-xl"
            }`}
          /> */}
    </>
  );
}

export default NewNote;
