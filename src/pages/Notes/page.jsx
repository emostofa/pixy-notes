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

  const categories = ["All", "General"]; 

  return (
    <>
      <Newnote className="mb-10" />
      <div className="container py-4 mt-5">
        <h1 className="text-4xl text-gray-800 font-bold mb-4">Notes</h1>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input text-lg rounded-sm max-w-x bg-base-100 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <ul className="list-none">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${
                selectedCategory === category ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <ul className="list-none mt-5 grid grid-cols-1 gap-1 bg-base-200  md:grid-cols-4 gap-4">
        {filteredNotes.length > 0 ? (
          filteredNotes
            .reverse()
            .map((note) =>
              note ? (
                <Note key={note._id} note={note} />
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
