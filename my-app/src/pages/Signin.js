import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router';
import signinimage from "../images/signinimage.jpg";
import { signin } from '../api';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const hadelInputChnge = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignin = async (e) => {
    console.log(formData);
    try {
      const response = await signin(formData);
      console.log("Signin Successful", response.data);
      localStorage.setItem("author", response.data.result._id.toString());
      navigate('/');
    } catch (error) {
      console.log("Signin Failed:", error);
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <Box display='flex' height='100vh' bgcolor="#f5f5f5">
      {/* Left Side - Form */}
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={4}
        boxShadow={3}
        bgcolor="#ffffff"
        borderRadius="0 20px 20px 0"
      >
        <Typography fontSize="42px" fontWeight="600" color="#333">
          Welcome Back
        </Typography>
        <Typography fontSize="16px" color="gray" mb={4}>
          Sign in to continue
        </Typography>

        <Box width="100%" maxWidth="400px">
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
            type="password"
            variant='outlined'
            value={formData.password}
            onChange={hadelInputChnge}
          />
          <Box display="flex" justifyContent="flex-end">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography
                fontSize="14px"
                fontWeight="500"
                color="#1976d2"
                mt={1}
                sx={{ '&:hover': { textDecoration: 'underline' } }}
              >
                Create account
              </Typography>
            </Link>
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSignin}
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
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: '#e3f2fd',
          borderRadius: '20px 0 0 20px'
        }}
      >
        <img
          src={signinimage}
          alt="Signin Visual"
          style={{
            maxHeight: '70vh',
            maxWidth: '100%',
            borderRadius: '10px',
            objectFit: 'cover',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}
        />
      </Box>
    </Box>
  );
};

export default Signin;
