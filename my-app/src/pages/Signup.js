import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import signupimage from "../images/signupimage.jpg";
import { signup } from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // ✅ VERY IMPORTANT

    // basic frontend validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signup({
        ...formData,
        email: formData.email.toLowerCase(), // ✅ normalize email
      });

      // ✅ save auth data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.result)
      );
      localStorage.setItem("token", response.data.token);

      navigate('/blogs', { replace: true });

    } catch (error) {
      console.log(
        "Signup Failed:",
        error.response?.data?.message
      );
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      {/* Left Image */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ background: "#e3f2fd" }}
      >
        <img
          src={signupimage}
          alt="Signup"
          style={{
            maxHeight: "70vh",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* Right Form */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={4}
        bgcolor="#fff"
      >
        <Typography fontSize="36px" fontWeight="600">
          Create Account
        </Typography>

        <Box width="100%" maxWidth="400px">
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />

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

          <TextField
            fullWidth
            margin="normal"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          <Box display="flex" justifyContent="flex-end" mt={1}>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Typography color="primary">
                Already a user?
              </Typography>
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
