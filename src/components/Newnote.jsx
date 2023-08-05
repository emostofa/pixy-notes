import React, { useEffect, useState } from "react";

function NewNote(props) {
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [typingText, setTypingText] = useState(false);
  const [typing, setTyping] = useState(false);

  function newNoteAdded() {
    props.add(title, content);
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
        className={`card ml-20 w-96  shadow border-solid border-2 border-base-200  ${
          focused
            ? " shadow-xl scale-x-110 scale-y-105 ease-in duration-200"
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
            value={title}
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
