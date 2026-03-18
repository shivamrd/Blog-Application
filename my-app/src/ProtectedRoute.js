// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const profile = JSON.parse(localStorage.getItem("profile"));

//   // ❌ Not logged in → go to signin
//   if (!profile) {
//     return <Navigate to="/signin" replace />;
//   }

//   // ✅ Logged in → allow access
//   return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();

  // ❌ Not logged in → redirect to signin
  if (!profile) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default ProtectedRoute;