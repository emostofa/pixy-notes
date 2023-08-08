import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const UserContext = createContext();

const cookies = new Cookies();


export const UserContextProvider = ({ children }) => {
  const host = "http://192.168.1.143:4000/api/auth";
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
   
  }, [ isAuthenticated]);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(`${host}/createuser`, newUser, {
        "Content-Type": "application/json",
      });

      navigate("/pages/signin");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const logUser = async (user) => {
    try {
      const response = await axios.post(`${host}/login`, user, {
        "Content-Type": "application/json",
      });
      cookies.set("auth-token", response.data.authToken, { path: "/" });
      setIsAuthenticated(true);
      toast.success("Login successful!");
      navigate("/pages/notes");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
      setIsAuthenticated(false);
    }
  };
  

  return (
    <UserContext.Provider value={{ addUser, logUser, cookies, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
