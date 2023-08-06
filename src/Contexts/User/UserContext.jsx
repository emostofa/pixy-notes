import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast ,{ Toaster } from "react-hot-toast";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const host = "http://192.168.1.143:4000/api/auth";
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [responseText, setResponseText] = useState();

  useEffect(() => {
    if (responseText) {
      if (success) {
        toast.success(responseText);
      } else {
        toast.error(responseText);
        setSuccess(false);
        setResponseText("");
      }
    }
  }, [responseText, success]);

  const addUser = async (newUser) => {
    try {
      const response = await axios.post(`${host}/createuser`, newUser, {
        "Content-Type": "application/json",
      });

      setSuccess(true);
      setResponseText(response.data);
      navigate("/pages/signin");
    } catch (error) {
      
      setResponseText(error.response.data);
      setSuccess(false);
    }
  };

  const logUser = async (user) => {
    try {
      const response = await axios.post(`${host}/login`, user, {
        "Content-Type": "application/json",
      });
      setSuccess(true);
      setResponseText(`Welcome ${response.data.name}`);
      navigate("/pages/notes");
    } catch (error) {
      console.log(error);
      setResponseText(error.response.data);
      setSuccess(false);
    }
  };

  return (
    <UserContext.Provider value={{ addUser, logUser }}>
      {children}
    </UserContext.Provider>
  );
};
