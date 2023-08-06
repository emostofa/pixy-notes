import React, { useEffect, useState, useContext } from "react";
import { NoteContext } from "../Contexts/Notes/NotesContext";
function NewNote(props) {
  
  // const { title, description, _id } = props.note;
  // const { notes,deleteNote,updateNote } = useContext(NoteContext);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [inputTitle, setTitle] = useState("");
  const [typingText, setTypingText] = useState(false);
  const [typing, setTyping] = useState(false);

  function newNoteAdded() {
    props.add(inputTitle, content);
    setTitle("");
    setContent("");
  }

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
  }, [focused, typing, typingText]);

  return (
    <>
      <div
        onBlur={() => {
          setTypingText(false);
          if (!typing && !typingText) {
            setFocused(false);
          }
        }}
        className={`card ml-20 w-96  shadow border-solid border-2 border-base-200 ease-in duration-200  ${
          focused
            ? " shadow-xl scale-x-110 scale-y-105 "
            : "bg-base-100 h-fit"
        }`}
      >
        <div className="card-body ">
          <input
            className={`input w-full rounded-sm max-w-x ${focused ? "" : "hidden"}`}
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
            className={`textarea w-full rounded-sm h-full max-w-xs ${
              focused ? "text-sm" : "text-xl"
            }`}
          />
        </div>
      </div>
    </>
  );
}

export default NewNote;
