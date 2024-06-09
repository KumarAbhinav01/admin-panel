"use client"
import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from '@/components/Chat';
import Deposits from '@/components/Deposits';
import Orders from '@/components/Orders';
import { Box, Toolbar } from '@mui/material';

const MainPage = (props) => {
    const [orders, setOrders] = React.useState([{}]);
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
   
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart loading={loading} count={count} orders={orders}/>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Deposits loading={loading} count={count} orders={orders}/>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Orders loading={loading} setLoading={setLoading} setCount={setCount} setOrders={setOrders}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default MainPage