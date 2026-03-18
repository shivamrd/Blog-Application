
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import signinimage from "../images/signinimage.jpg";
import { signin } from "../api";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await signin({
        ...formData,
        email: formData.email.toLowerCase(),
      });

      localStorage.setItem("profile", JSON.stringify(response.data));
      
    // ✅ HARD REPLACE (FINAL FIX)
    window.location.replace("/blogs");
    } catch (error) {
      alert(error.response?.data?.message || "Signin failed");
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="background.default">
      
      {/* LEFT FORM */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={4}
        bgcolor="background.paper"
      >
        <Typography fontSize="40px" fontWeight="600" color="text.primary">
          Welcome Back 👋
        </Typography>

        <Box width="100%" maxWidth="400px">
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Box display="flex" justifyContent="flex-end">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography color="primary" mt={1}>
                Create account
              </Typography>
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* RIGHT IMAGE */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: "background.default",
        }}
      >
        <img
          src={signinimage}
          alt="Signin"
          style={{
            maxHeight: "70vh",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Signin;