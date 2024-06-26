"use client"
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Button, Typography } from '@mui/material';
import Login from '@/components/Login';

const Home = () => {
  const router = useRouter();  
  useEffect(() => {
    const isLoggedIn = Cookies.get('loggedIn');
    if (!isLoggedIn) {
      router.push('/login', { scroll: false })
    } else {
      router.push('/dashboard', { scroll: false })
    }
  }, [router]);

  return (
    <Login />
  );
};

export default Home;