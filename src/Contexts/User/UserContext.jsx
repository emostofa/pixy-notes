import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const host = "http://192.168.0.143:4000/api/auth";
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [responseText, setResponseText] = useState();

  useEffect(() => {
    if (responseText) {
      if (success) {
        alert(responseText);
      } else {
        alert(responseText);
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
      navigate("/login");
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
      localStorage.setItem('authToken', response.data.authToken);
      navigate("/notes");
    } catch (error) {
      console.log(error);
      setResponseText(error.response.data);
      setSuccess(false);
    }
  };

  return (
    <UserContext.Provider value={{ success, addUser, logUser }}>
      {children}
    </UserContext.Provider>
  );
};
