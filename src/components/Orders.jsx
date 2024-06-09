"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import Title from './Title';
import { MetroSpinner } from 'react-spinners-kit';
import moment from 'moment';

export default function Orders({ loading, setLoading, setCount, setOrders }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = () => {
    setLoading(true);
    fetch('https://admin-panel-server-my80.onrender.com/api/getdata', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        const totalCount = data.data.reduce((acc, item) => acc + parseInt(item.count, 10), 0);
        setCount(totalCount);
        setOrders(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Title>Data</Title>
      <Table size="small">
        <TableHead sx={{ bgcolor: "#010835" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>ID</TableCell>
            <TableCell sx={{ color: "white" }}>DATE</TableCell>
            <TableCell sx={{ color: "white" }}>TIME</TableCell>
            <TableCell sx={{ color: "white" }}>SIZE</TableCell>
            <TableCell sx={{ color: "white" }}>COUNT</TableCell>
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
            items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .reverse()
              .map((row, index) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
