import React, { useContext, useNavigate } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../Contexts/User/UserContext";

export default function ProtectedRoute({ path, element }) {
    const { isAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();
  
    if (isAuthenticated) {
      return <Route path={path} element={element} />;
    } else {
      return <Navigate to="/login" />;
    }
  }
  