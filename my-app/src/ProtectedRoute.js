import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  // ❌ Not logged in → go to signin
  if (!profile) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;
