import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../contexts/userContext";

const ProtectedRoute = ({ children, ...props }) => {
  const { isLoggedIn } = React.useContext(UserContext);

  if (!isLoggedIn) {
    return null;
  }

  return <Route {...props}>{children}</Route>;
};

export default ProtectedRoute;
