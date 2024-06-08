"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Title from './Title';
import { MetroSpinner } from 'react-spinners-kit';
import moment from 'moment';

export default function Orders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoading(true);
    fetch('/api/getdata', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data); // Update state with the correct data array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Title>Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>TIME</TableCell>
            <TableCell>SIZE</TableCell>
            <TableCell>COUNT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <MetroSpinner size={30} color="#1976d2" loading={loading} />
              </TableCell>
            </TableRow>
          ) : (
            items.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{moment(row.createdAt).format('YYYY-MM-DD')}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}