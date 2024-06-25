"use client"
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Loading from '@/app/dashboard/loading';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    text: {
      primary: '#fff', // Set the primary text color to white
    },
  },
});

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(bg.avif)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 400,
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white background
  backdropFilter: 'blur(10px)', // Blur effect
  border: '1px solid rgba(255, 255, 255, 0.3)', // Border to enhance glass effect
  color: '#fff', // Set text color to white
}));

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://adminpanel.abhi6722.in/api/signin', user);

      if (response.status === 200) {
        Cookies.set('loggedIn', true);
        toast.success('Login Successful');
        router.push('/dashboard');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isFormValid = user.username.trim() !== '' && user.password.trim() !== '';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundBox>
        <LoginPaper elevation={6}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#fff' } }} // Set input label color to white
              InputProps={{
                style: { color: '#fff' }, // Set input text color to white
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff', // Set border color to white
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff', // Set border color to white on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', // Set border color to white when focused
                    },
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#fff' } }} // Set input label color to white
              InputProps={{
                style: { color: '#fff' }, // Set input text color to white
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff', // Set border color to white
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff', // Set border color to white on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', // Set border color to white when focused
                    },
                  },
                },
              }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: '#fff',
                bgcolor: '#DC014E'
              }}
              onClick={login}
              disabled={!isFormValid || loading}
            >
              <Typography color={isFormValid || loading ?'#fff' : 'grey' }>
              Sign In
              </Typography>
            </Button>
          </Box>
        </LoginPaper>
      </BackgroundBox>
    </ThemeProvider>
  );
}
