import Note from "../../components/Note";
import Newnote from "../../components/Newnote";
import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../../Contexts/Notes/NotesContext";
export default function Notes() {
  
  const {  notes, addNote } = useContext(NoteContext);

  useEffect(() => {
    
  },[notes]);
  console.log('im on notes oage', notes)
  
  return (
    <>
    
    <Newnote className="mb-10" key={Math.random()} addNote={addNote}/>
    <div className="container py-4 mt-5">
      <h1 className="text-4xl text-gray-800 font-bold mb-4">Notes</h1>
      </div>
      <ul className="d-flex flex-wrap col-md-12 justify-content-evenly m-2 list-unstyled">
        {notes.length > 0
          ? notes
              .toReversed()
              .map((note) => <Note key={note._id} note={note}></Note>)
          : "No notes found"}
      </ul>
    </>
  );
}
