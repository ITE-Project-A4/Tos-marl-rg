import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/** Wrap any route that requires the signed-in user to have role: "admin". */
export default function AdminRoute({ children }) {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
