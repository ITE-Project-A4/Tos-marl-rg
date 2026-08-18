import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/** Wrap any route that requires the user to be signed in. */
export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
