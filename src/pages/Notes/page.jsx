import Note from "../../components/Note";
import Newnote from "../../components/Newnote";
import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../../Contexts/Notes/NotesContext";

export default function Notes() {
  const { notes } = useContext(NoteContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  useEffect(() => {
    
  }, [notes]);

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "All" || note.category === selectedCategory)
  );

  const categories = ["My Notes", "Todo", "Lectures", "Examples"]; 

  return (
    <>
      <Newnote categories={categories} className="mb-10" />
      <div className="container py-4 mt-5">
        <h1 className="text-4xl text-gray-800 font-bold mb-4">Notes</h1>
      </div>
      
      <div className="mb-4 ">
        <ul className="list-none flex justify-evenly">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer text-xl bg-base-200 p-2 rounded-lg ${
                selectedCategory === category ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}

        </ul>
      </div>
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input text-lg rounded-sm max-w-x bg-base-100 focus:outline-none"

        />
         <button
    onClick={() => setSearchQuery("")}
    className="btn btn-primary btn-sm"
  >
    Clear
  </button>
      </div>
      <ul className="list-none mt-5 grid grid-cols-1 gap-1 bg-base-200  md:grid-cols-4 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes
            .reverse()
            .map((note) =>
              note ? (
                <Note  key={note._id} note={note} />
              ) : (
                <div key="placeholder">Note with missing _id</div>
              )
            )
        ) : (
          <li>No notes found. Please add a note</li>
        )}
      </ul>
    </>
  );
}
