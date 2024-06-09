import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Skeleton from '@mui/material/Skeleton';

import Title from './Title';

export default function Chart({ loading, orders }) {
  const theme = useTheme();

  // Initialize an object to store day-wise counts
  const dayWiseCounts = {};

  // If data is not loading and orders are available
  if (!loading && orders) {
    // Get the start date (7 days ago from today)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);

    // Initialize day-wise counts for the past week
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      dayWiseCounts[day] = 0; // Initialize count to 0 for each day
    }

    // Iterate over orders to calculate day-wise counts
    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });
      if (dayWiseCounts[day] !== undefined) {
        dayWiseCounts[day] += parseInt(order.count, 10);
      }
    });
  }

  // Create data array from day-wise counts
  const data = Object.keys(dayWiseCounts).map(day => ({ time: day, amount: dayWiseCounts[day] }));

  return (
    <React.Fragment>
      <Title>Past Week</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        {loading ? ( // Show skeleton loader while loading
          <Skeleton variant="rectangular" height={300} />
        ) : (
          <LineChart
            dataset={data}
            margin={{
              top: 16,
              right: 20,
              left: 70,
              bottom: 30,
            }}
            xAxis={[
              {
                scaleType: 'point',
                dataKey: 'time',
                tickNumber: 7, // Show ticks for each day of the week
                tickLabelStyle: theme.typography.body2,
              },
            ]}
            yAxis={[
              {
                label: 'Total Count',
                labelStyle: {
                  ...theme.typography.body1,
                  fill: theme.palette.text.primary,
                },
                tickLabelStyle: theme.typography.body2,
                ticks: [500, 1000, 1500, 2000], // Define custom ticks for y-axis
              },
            ]}
            series={[
              {
                dataKey: 'amount',
                showMark: false,
                color: theme.palette.primary.light,
              },
            ]}
            sx={{
              [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
              [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
              [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translateX(-25px)',
              },
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
}