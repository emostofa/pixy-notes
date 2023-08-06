import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Demo from "./pages/Demo/page";
import Home from "./pages/Home/page";
import Login from "./pages/Signin/page";
import Signup from "./pages/Signup/page";
import { NoteContextProvider } from "./Contexts/Notes/NotesContext";
import { UserContextProvider } from "./Contexts/User/UserContext";
import { Route, Routes } from "react-router-dom";
import Notes from "./pages/Notes/page";

function App() {
  return (
    <>
      <UserContextProvider>
        <NoteContextProvider>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pages/notes" element={<Notes />}></Route>
            <Route path="/pages/demo" element={<Demo />}></Route>
            <Route path="/pages/signin" element={<Login />}></Route>
            <Route path="/pages/signup" element={<Signup />}></Route>
          </Routes>
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
