"use client"
import { Box, Typography, TextField, Button, Grid, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Page = () => {
  const [time, setTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://admin-panel-server-my80.onrender.com/api/time')
      .then(response => {
        setCurrentTime(response.data.time);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching current time:', error);
        setLoading(false);
      });
  }, []);

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTimeUpdate = () => {
    axios.post('https://admin-panel-server-my80.onrender.com/api/timeupdate', {
      time: time
    })
    .then(response => {
      console.log('Time updated successfully:', response.data);
      setCurrentTime(time);
    })
    .catch(error => {
      console.error('Error updating time:', error);
    });
  };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#F5F5F5',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        height: "100vh",
        padding: '20px',
        color: 'black'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '40px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>
          Set the time
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
          This dashboard allows you to control the timing for IoT data transmission.
        </Typography>
        <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#333' }}>Current Time:</Typography>
          {loading ? (
            <Skeleton variant="text" width={100} sx={{ margin: '0 auto' }} />
          ) : (
            <Typography variant="body1" sx={{ color: '#666' }}>{currentTime || 'N/A'} seconds</Typography>
          )}
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Set Time (in seconds)"
            variant="outlined"
            value={time}
            onChange={handleTimeChange}
            sx={{ marginBottom: '20px' }}
          />
          <Button variant="contained" onClick={handleTimeUpdate} fullWidth>
            Update Time
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;