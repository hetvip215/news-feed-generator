import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
