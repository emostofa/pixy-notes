
import "./App.css";
import Header from "./components/Header";
import Demo from "./pages/Demo/page";
import Home from "./pages/Home/page";
import Login from "./pages/Signin/page";
import Signup from "./pages/Signup/page";
import { NoteContextProvider } from "./Contexts/Notes/NotesContext";
import { UserContextProvider } from "./Contexts/User/UserContext";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Notes from "./pages/Notes/page";

function App() {
  const router = createBrowserRouter([
    
   
  {
    
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/pages/notes",
        element:<Notes/>
      },
      {
        path:"/pages/demo",
        element:<Demo/>
      },
      {
        path:"/pages/signup",
        element:<Signup/>
      },
      {
        path:"/pages/signin",
        element:<Login/>
      }
    ]

  }
    
  ]);
  return (
    <>
    <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
}
function Layout() {
  return (
    <>
       <UserContextProvider>
        <NoteContextProvider>
          <Header></Header>
          
          <Outlet />
        </NoteContextProvider>
      </UserContextProvider>
    </>
  );
}


export default App;
