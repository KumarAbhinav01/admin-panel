import React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { MetroSpinner } from 'react-spinners-kit';
import { Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Deposits({ loading, count, orders }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '16px',
      }}
    >
      <Title>Total Bottles Collected</Title>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <MetroSpinner size={30} color="#1976d2" loading={loading} />
        </div>
      ) : (
        <React.Fragment>
          <Typography component="p" variant="h4" sx={{ marginBottom: '16px' }}>
            {count}
          </Typography>
          <Button variant="contained" sx={{ alignSelf: 'flex-end', width: '100%' }}>
            <Link href="/dashboard/integration">
            Update Time
            </Link>
          </Button>
        </React.Fragment>
      )}
    </Box>
  );
}
