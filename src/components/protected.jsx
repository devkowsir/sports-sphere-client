import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/auth";

const Protected = ({ children }) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useAuthContext();

  if (isLoading)
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="loading loading-lg"></div>
      </div>
    );
  if (!user) return <Navigate to={`/auth/login?redirectTo=${encodeURIComponent(pathname)}`} replace />;

  return children;
};

export default Protected;
