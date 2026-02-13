import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../container/coursecontainer/slice";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  CircularProgress
} from "@mui/material";

import EventSeatIcon from "@mui/icons-material/EventSeat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const statusColor = {
  Available: "success",
  Limited: "warning",
  Full: "error"
};

const SeatManagement = () => {
  const dispatch = useDispatch();

  const { courses, loading } = useSelector(
    (state) => state.cours
  );

  /* ===== FETCH COURSES ===== */
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  /* ===== DERIVED SEAT DATA ===== */
  const seatData = useMemo(() => {
    let totalSeats = 0;
    let filledSeats = 0;

    const courseSeats = courses.map((course) => {
      // 🔴 TEMP: replace with real student count later
      const filled = Math.floor(course.totalSeats * 0.8);
      const vacant = course.totalSeats - filled;

      totalSeats += course.totalSeats;
      filledSeats += filled;

      let status = "Available";
      if (vacant === 0) status = "Full";
      else if (vacant <= 20) status = "Limited";

      return {
        name: course.courseName,
        total: course.totalSeats,
        filled,
        vacant,
        status
      };
    });

    return {
      totalSeats,
      filledSeats,
      vacantSeats: totalSeats - filledSeats,
      courseSeats
    };
  }, [courses]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Seat Management
      </Typography>

      {/* ===== TOP STATS ===== */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <EventSeatIcon fontSize="large" color="primary" />
            <CardContent>
              <Typography variant="subtitle2">Total Seats</Typography>
              <Typography variant="h6">{seatData.totalSeats}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <CheckCircleIcon fontSize="large" color="success" />
            <CardContent>
              <Typography variant="subtitle2">Filled Seats</Typography>
              <Typography variant="h6">{seatData.filledSeats}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <CancelIcon fontSize="large" color="warning" />
            <CardContent>
              <Typography variant="subtitle2">Vacant Seats</Typography>
              <Typography variant="h6">{seatData.vacantSeats}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== COURSE TABLE ===== */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Course-wise Seat Allocation
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Course Name</b></TableCell>
                  <TableCell align="center"><b>Total Seats</b></TableCell>
                  <TableCell align="center"><b>Filled</b></TableCell>
                  <TableCell align="center"><b>Vacant</b></TableCell>
                  <TableCell align="center"><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {seatData.courseSeats.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell align="center">{course.total}</TableCell>
                    <TableCell align="center">{course.filled}</TableCell>
                    <TableCell align="center">{course.vacant}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={course.status}
                        color={statusColor[course.status]}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {seatData.courseSeats.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No courses found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SeatManagement;
