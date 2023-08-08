import React, { useState, useEffect } from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import NewNote from "../../components/Newnote";
import DemoNote from "../../components/DemoNote";
import { Toaster } from "react-hot-toast";

export default function DemoPage() {
  const [demoNotes, setDemoNotes] = useState([
    {
      _id: 1,
      title: "Hey there!",
      description: "This is a demo note. Taken from Pixy-Notes",
    },
    {
      _id: 2,
      title: "Project Kickoff Meeting",
      description: "Discussion of project goals, team roles, and initial timeline.",
    },
    
    {
      _id: 3,
      title: "Market Research Findings",
      description: "Overview of key market trends, customer preferences, and potential competitors",
    },
    
    
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!focused) {
      handleAddNote();
    }
  }, [focused]);

  function handleAddNote() {
    if (inputTitle === "" && inputDescription === "") {
      return;
    }

    const newNote = {
      _id: demoNotes.length + 1, 
      title: inputTitle,
      description: inputDescription,
    };
    setFocused(false);
    setDemoNotes([...demoNotes, newNote]);
    setInputTitle("");
    setInputDescription("");
    setSearchQuery("");
  }

  function titleChanged(e) {
    setInputTitle(e.target.value);
  }

  function contentChanged(e) {
    setInputDescription(e.target.value);
  }

  function handleNoteDelete(noteId) {
    const updatedNotes = demoNotes.filter((note) => note._id !== noteId);
    setDemoNotes(updatedNotes);
  }

  function handleNoteUpdate(noteId, updatedNote) {
    const updatedNotes = demoNotes.map((note) =>
      note._id === noteId ? updatedNote : note
    );
    setDemoNotes(updatedNotes);
  }

  return (
    <>
      <div className="flex">
        <Sidebar>
          <Menu >
            <SubMenu label="My Notes">
              <MenuItem>Pie charts</MenuItem>
              <MenuItem>Line charts</MenuItem>
              <MenuItem>Bar charts</MenuItem>
            </SubMenu>
            <MenuItem>Todo</MenuItem>
            <MenuItem>Lectures</MenuItem>
            <MenuItem>Examples</MenuItem>
          </Menu>
        </Sidebar>
        <div className="flex justify-center">
          <Toaster />
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
          <div className="flex justify-center">
            <button className="btn btn-sm text-xs mr-4 hover:btn-warning">
              <i className="fa-solid fa-camera text-xl text-blue-500"></i>
            </button>
        
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-4">
  <input
    type="text"
    placeholder="Search notes..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="input  text-lg rounded-sm max-w-x bg-base-100 focus:outline-none"
  />
  <button
    onClick={() => setSearchQuery("")}
    className="btn btn-primary btn-sm"
  >
    Clear
  </button>
</div>

      <ul className="list-none mt-5 grid grid-cols-1 gap-1 bg-base-200  md:grid-cols-4 gap-4">
  {demoNotes.length > 0 ? (
    demoNotes
      .filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((note) => (
            <DemoNote
              key={note._id}
              note={note}
              onDelete={() => handleNoteDelete(note._id)}
              onUpdate={(updatedNote) =>
                handleNoteUpdate(note._id, updatedNote)
              }
            />
          ))
        ) : (
          <li>No notes found. Please add a note</li>
        )}
      </ul>
    </>
  );
}
