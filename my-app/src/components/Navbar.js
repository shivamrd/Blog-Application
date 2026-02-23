// import React, { useState } from "react";
// import { Box, Button, Modal, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Form from "./Form";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const profile = JSON.parse(localStorage.getItem("profile"));
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });

//   };

//   const handleCreateBlog = () => {
//     if (!profile) {
//       navigate("/signin");
//     } else {
//       setOpen(true);
//     }
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingY: "20px",
//           paddingX: "50px",
//           boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{ cursor: "pointer" }}
//           onClick={() => navigate("/blogs")}
//         >
//           Blog Website
//         </Typography>

//         <Box>
//           {profile && (
//             <Button
//               sx={{
//                 mr: 1,
//                 bgcolor: "black",
//                 color: "white",
//                 borderRadius: 10,
//                 "&:hover": { bgcolor: "#FFD42F", color: "black" },
//               }}
//               onClick={handleCreateBlog}
//             >
//               Create Blog
//             </Button>
//           )}

//           {!profile ? (
//             <Button
//               sx={{
//                 bgcolor: "black",
//                 color: "white",
//                 borderRadius: 10,
//                 "&:hover": { bgcolor: "#FFD42F", color: "black" },
//               }}
//               onClick={() => navigate("/signin")}
//             >
//               Sign In
//             </Button>
//           ) : (
//             <Button
//               sx={{
//                 bgcolor: "red",
//                 color: "white",
//                 borderRadius: 10,
//               }}
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           )}
//         </Box>
//       </Box>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Form />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Navbar = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));
  const role = profile?.result?.role;
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const baseBtn = {
    borderRadius: "999px",
    px: 2.5,
    py: 1,
    fontWeight: 600,
    textTransform: "none",
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 6,
          py: 2,
          bgcolor: "background.paper",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* LOGO */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, cursor: "pointer" }}
          onClick={() => navigate("/blogs")}
        >
          Blog<span style={{ color: "#1976d2" }}>Hub</span>
        </Typography>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          {/* THEME TOGGLE */}
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>

          {profile && (
            <>
              <Button sx={baseBtn} onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>

              <Button sx={baseBtn} onClick={() => navigate("/blogs")}>
                My Blogs
              </Button>

              {role === "admin" && (
                <Button
                  sx={{
                    ...baseBtn,
                    color: "#f59e0b",
                  }}
                  onClick={() => navigate("/users")}
                >
                  Users
                </Button>
              )}

              <Button
                sx={{
                  ...baseBtn,
                }}
                onClick={() => setOpen(true)}
              >
                Create Blog
              </Button>

              <Button sx={baseBtn} onClick={() => navigate("/profile")}>
                Profile
              </Button>

              <Button
                
                color="error"
                sx={baseBtn}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

          {!profile && (
            <Button
              variant="contained"
              sx={baseBtn}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 440,
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 4,
          }}
        >
          <Form />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
