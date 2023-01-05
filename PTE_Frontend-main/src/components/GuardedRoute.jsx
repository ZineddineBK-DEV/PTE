import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";

const GuardedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || isExpired(user.token)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default GuardedRoute;
