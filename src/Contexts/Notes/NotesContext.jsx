import { createContext, useState,useEffect } from "react";
import axios from "axios";

export const NoteContext = createContext();
const host = "http://192.168.0.143:4000";

// const localStorage.authToken = localStorage.localStorage.authToken;
  

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from server when component mounts
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    if (!localStorage.authToken) return console.log('Not signed In! ');

    try {
      const response = await axios.post(`${host}/api/notes/newnote`, newNote, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.authToken
        },
      });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (noteId, updatedNotes) => {
    if (!noteId) {
      return console.log("Provide a valid note!");
    }
    if (!updatedNotes) {
      return console.log("Provide a valid update note!")
    }
    try {
      await axios.patch(`${host}/api/notes/updatenote/${noteId}`, updatedNotes, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.authToken
        },
      });

      setNotes(notes.map(note => note._id === noteId ? updatedNotes : note));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (noteId) => {
    if (!noteId) return console.log("Please provide a VALID ID");
    if (!notes.find((note) => note._id === noteId)) return console.log("Invalid Note to delete");
    try {
      await axios.delete(`${host}/api/notes/deletenote/${noteId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.authToken
        },
      });

      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const getNotes = async () => {
    if (!localStorage.authToken) return console.log('Not signed In! ');
    try {
      const response = await axios.get(`${host}/api/notes/fetchnotes`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.authToken
        },
      });
      setNotes([...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider value={{ addNote, updateNote, deleteNote, notes, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};