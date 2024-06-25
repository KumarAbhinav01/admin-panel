"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Skeleton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { addWeeks, addMonths, subHours } from "date-fns";

const ReportsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios
      .get("http://adminpanel.abhi6722.in/api/getdata")
      .then((response) => {
        setData(response.data.data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const itemTime = new Date(item.createdAt).getHours() + ':' + String(new Date(item.createdAt).getMinutes()).padStart(2, "0");
    return (
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate) &&
      (!startTime || itemTime >= startTime) &&
      (!endTime || itemTime <= endTime) &&
      (!selectedSize || item.size === selectedSize)
    );
  });

  const calculateSummary = (period) => {
    let fromDate = new Date();
    switch (period) {
      case "hour":
        fromDate = subHours(new Date(), 1);
        break;
      case "day":
        fromDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        fromDate = addWeeks(new Date(), -1);
        break;
      case "month":
        fromDate = addMonths(new Date(), -1);
        break;
      default:
        break;
    }

    const filtered = data.filter(
      (item) => new Date(item.createdAt) >= fromDate
    );
    return filtered.reduce((sum, item) => sum + parseInt(item.count, 10), 0);
  };

  const sizes = [...new Set(data.map((item) => item.size))]; // Extract unique sizes

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#F5F5F5",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        color: "black",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "#333" }}>
        Reports Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", bgcolor: "#010835", color: 'white' }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                {loading ? <Skeleton width={100} /> : calculateSummary("hour")}
              </Typography>
              <Typography variant="body1">Total Bottles Collected</Typography>
              <Typography variant="body1">(Last Hour)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", bgcolor: "#010835", color: 'white' }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                {loading ? <Skeleton width={100} /> : calculateSummary("day")}
              </Typography>
              <Typography variant="body1">Total Bottles Collected</Typography>
              <Typography variant="body1">(Today)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", bgcolor: "#010835", color: 'white' }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                {loading ? <Skeleton width={100} /> : calculateSummary("week")}
              </Typography>
              <Typography variant="body1">Total Bottles Collected</Typography>
              <Typography variant="body1">(This Week)</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", bgcolor: "#010835", color: 'white' }}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                {loading ? <Skeleton width={100} /> : calculateSummary("month")}
              </Typography>
              <Typography variant="body1">Total Bottles Collected</Typography>
              <Typography variant="body1">(This Month)</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          my={1}
        >
          <Grid
            item
            xs={12}
            sm={6}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              sx={{ marginBottom: "10px", flexGrow: 1, minWidth: "150px" }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
              sx={{ marginBottom: "10px", flexGrow: 1, minWidth: "150px" }}
            />
            <FormControl sx={{ marginBottom: "10px", minWidth: "150px" }}>
              <InputLabel>Start Time</InputLabel>
              <Select
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                label="Start Time"
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: "10px", minWidth: "150px" }}>
              <InputLabel>End Time</InputLabel>
              <Select
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                label="End Time"
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginBottom: "10px", minWidth: "150px" }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
                label="Size"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </LocalizationProvider>

      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#010835" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Time</TableCell>
              <TableCell sx={{ color: "white" }}>Size</TableCell>
              <TableCell sx={{ color: "white" }}>Count</TableCell>
              <TableCell sx={{ color: "white" }}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))
              : filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default ReportsPage;
