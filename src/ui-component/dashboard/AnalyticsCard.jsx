
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import {
  BookOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { fontWeight } from '@mui/system';

const AnalyticsCard = () => {

const { courses = [] } = useSelector(state => state.course || {});
  const totalSeats = courses.reduce(
    (sum, course) => sum + (Number(course.totalSeats) || 0),
    0
  );

  const students = useSelector((state) => state.student?.students || []);
const enquiry = useSelector((state) => state.enquiry?.count || 0);  
  


  const cardStyle = {
    p: 3,
    borderRadius: 4,
    background: "#ffff ",
    borderLeft: "5px solid #0f172a",
    boxShadow: 3,
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      fontWeight: "700px"
    }
  };

  const iconStyle = {
    fontSize: 30,
    color: "#ea580c"
  };

  return (
    <Grid container spacing={3} mb={4} >

      {/* COURSES */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/courses" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={"#0f172a"}>
                {courses.length}
              </Typography>
              <Typography>Courses</Typography>

            </div>
            <BookOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* STUDENTS */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/students" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={"#0f172a"}>
                {students.length}
              </Typography>
              <Typography>Students</Typography>
            </div>
            <TeamOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* ENQUIRIES */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/enquiry" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={"#0f172a"}>
{enquiry}
              </Typography>
              <Typography>Enquiries</Typography>
            </div>
            <QuestionCircleOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

      {/* SEAT MANAGEMENT */}
      <Grid item xs={12} sm={6} md={3}>
        <Link to="/seat-management" style={{ textDecoration: 'none' }}>
          <Paper sx={cardStyle}>
            <div>
              <Typography variant="h4" fontWeight={700} color={"#0f172a"}>
                {totalSeats}
              </Typography>
              <Typography>Seat Management</Typography>
            </div>
            <AppstoreOutlined style={iconStyle} />
          </Paper>
        </Link>
      </Grid>

    </Grid>
  );
};

export default AnalyticsCard;