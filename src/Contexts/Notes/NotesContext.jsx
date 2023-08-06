import { createContext, useState,useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";

export const NoteContext = createContext();
const host = "http://192.168.1.143:4000";
const cookies = new Cookies();
const tokenCookie = cookies.get('auth-token');

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from server when component mounts
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    
    if (!tokenCookie) return toast.error("Please login first");

    try {
      const response = await axios.post(`${host}/api/notes/newnote`, newNote, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token':   tokenCookie
        },
      });
      
      setNotes([...notes, response.data]);
      toast.success("Note added successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (noteId, updatedNotes) => {
    if (!noteId) {
      return toast.error("Provide a valid note!");
    }
    if (!updatedNotes) {
      return toast.error("Provide a valid update note!")
    }
    try {
      await axios.patch(`${host}/api/notes/updatenote/${noteId}`, updatedNotes, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': tokenCookie
        },
      });

      setNotes(notes.map(note => note._id === noteId ? updatedNotes : note));
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (noteId) => {
    if (!noteId) return toast.error("Please provide a VALID ID");
    if (!notes.find((note) => note._id === noteId)) return toast.error("Invalid Note to delete");
    try {
      await axios.delete(`${host}/api/notes/deletenote/${noteId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': tokenCookie
        },
      });

      setNotes(notes.filter(note => note._id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const getNotes = async () => {
    if (!tokenCookie) return toast.error("Please login first to see the notes!");
    try {
      const response = await axios.get(`${host}/api/notes/fetchnotes`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': cookies.get('auth-token')
        },
      });
      console.log(cookies.get('auth-token'),tokenCookie)
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