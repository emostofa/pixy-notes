import Note from "../../components/Note";
import Newnote from "../../components/Newnote";
import React, { useContext, useEffect } from "react";
import { NoteContext } from "../../Contexts/Notes/NotesContext";

export default function Notes() {
  const { notes } = useContext(NoteContext);

  useEffect(() => {
    // Your effect logic here
  }, [notes]);

  return (
    <>
      <Newnote className="mb-10" />
      <div className="container py-4 mt-5">
        <h1 className="text-4xl text-gray-800 font-bold mb-4">Notes</h1>
      </div>
      <ul className="list-none mt-5 grid grid-cols-2 gap-4">
        {notes.length > 0 ? (
          notes
            .reverse()
            .map((note) =>
              note ? (
                <Note key={note._id} note={note}></Note>
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
