import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user")!);
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (window.location.pathname.startsWith("/admin") && user.role !== "ADMIN") {
    return <Navigate to="/not-authorized" />;
  }

  return element;
};

export default ProtectedRoute;
