import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

function Note(props) {
  const { title: initialTitle, description: initialDescription, _id } = props.note;
  const [focused, setFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState(initialDescription);
  const [inputTitle, setInputTitle] = useState(initialTitle);

  const handleNoteUpdate = () => {
    setFocused(false);
    props.onUpdate({
      _id,
      title: inputTitle,
      description: inputDescription,
    });
  };

  const handleNoteDelete = () => {
    props.onDelete(_id);
  };

  function titleChanged(e) {
    setInputTitle(e.target.value);
  }

  function contentChanged(e) {
    setInputDescription(e.target.value);
  }

  return (
    <>
      <Toaster />
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
            <div className="flex justify-center">
              <button className="btn btn-sm text-xs mr-4 hover:btn-warning">
                <i className="fa-solid fa-camera text-xl text-blue-500"></i>
              </button>
              <button
                onClick={handleNoteDelete}
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
