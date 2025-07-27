import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router';
import signupimage from "../images/signupimage.jpg";
import { signup } from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const hadelInputChnge = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    console.log(formData);
    try {
      const response = await signup(formData);
      console.log("Signup Successful", response.data);
      navigate('/');
    } catch (error) {
      console.log("Signup Failed:", error);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      {/* Left Side - Image */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: '#e3f2fd',
          borderRadius: '0 20px 20px 0'
        }}
      >
        <img
          src={signupimage}
          alt="Signup Visual"
          style={{
            maxHeight: '70vh',
            maxWidth: '100%',
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}
        />
      </Box>

      {/* Right Side - Form */}
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={4}
        boxShadow={3}
        bgcolor="#ffffff"
        borderRadius="20px 0 0 20px"
      >
        <Typography fontSize="42px" fontWeight="600" color="#333">
          Create Account
        </Typography>
        <Typography fontSize="16px" color="gray" mb={4}>
          Join us by signing up
        </Typography>

        <Box width="100%" maxWidth="400px">
          <TextField
            fullWidth
            margin="normal"
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            value={formData.name}
            onChange={hadelInputChnge}
          />
          <TextField
            fullWidth
            margin="normal"
            id='email'
            name='email'
            label='Email'
            variant='outlined'
            value={formData.email}
            onChange={hadelInputChnge}
          />
          <TextField
            fullWidth
            margin="normal"
            id='password'
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            value={formData.password}
            onChange={hadelInputChnge}
          />
          <TextField
            fullWidth
            margin="normal"
            id='confirmPassword'
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            variant='outlined'
            value={formData.confirmPassword}
            onChange={hadelInputChnge}
          />

          <Box display="flex" justifyContent="flex-end">
            <Link to="/signin" style={{ textDecoration: 'none' }}>
              <Typography
                fontSize="14px"
                fontWeight="500"
                color="#1976d2"
                mt={1}
                sx={{ '&:hover': { textDecoration: 'underline' } }}
              >
                Already a user?
              </Typography>
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSignup}
            sx={{
              mt: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '10px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
