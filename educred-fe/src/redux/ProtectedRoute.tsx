// src/components/ProtectedRoute.tsx

import { useSelector } from "react-redux";
import type { RootState } from "./store";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    alert("Please login to continue!");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
