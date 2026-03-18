// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import ProtectedRoute from "./ProtectedRoute";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// function App({ mode, setMode }) {
//   return (
//     <>
  
//       <Navbar mode={mode} setMode={setMode} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route
//           path="/blogs"
//           element={
//             <ProtectedRoute>
//               <Blogs />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/blog/search"
//           element={
//             <ProtectedRoute>
//               <Blogs />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;



import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function App({ mode, setMode }) {

  const profile = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <Navbar mode={mode} setMode={setMode} />

      <Routes>
        {/* ✅ FIXED HOME ROUTE */}
        <Route
          path="/"
          element={
            profile ? (
              <Navigate to="/blogs" replace />
            ) : (
              <Home />
            )
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/search"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;