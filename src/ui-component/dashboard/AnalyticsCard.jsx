import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  BookOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  AppstoreOutlined
} from "@ant-design/icons";

import { getInstituteEnquiry } from "../../container/enquirycontainer/slice";
import { fontWeight } from '@mui/system';

const AnalyticsCard = () => {

  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course?.courses || []);
  const enquiries = useSelector((state) => state.enquiry?.list || []);
  const seatmanagement = useSelector((state) => state.seatManagement?.seats || []);

  const [students, setStudents] = useState([]);

  /* ================= FETCH STUDENTS ================= */

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/institution-students", { withCredentials: true })
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* ================= FETCH ENQUIRIES ================= */

  useEffect(() => {
    dispatch(getInstituteEnquiry());
  }, [dispatch]);

  /* ================= RECENT ENQUIRIES ================= */

  const recentEnquiries = [...enquiries].slice(0, 5);

  const cardStyle = {
    p: 3,
    borderRadius: 4,
    height:"15vh",
    background: "#ffff ",
    borderLeft: "5px solid #ea580c",
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
    fontSize: 40,
    color: "#ea580c"
  };

  return (
    <>

      {/* ================= DASHBOARD CARDS ================= */}

      <Grid container spacing={3} mb={4}>

        {/* COURSES */}
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/courses" style={{ textDecoration: 'none' }}>
            <Paper sx={cardStyle}>
              <div>
                <Typography variant="h4" fontWeight={700}>
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
                <Typography variant="h4" fontWeight={700}>
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
                <Typography variant="h4" fontWeight={700}>
                  {enquiries.length}
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
                <Typography variant="h4" fontWeight={700}>
                  {seatmanagement.length}
                </Typography>
                <Typography>Seat Management</Typography>
              </div>
              <AppstoreOutlined style={iconStyle} />
            </Paper>
          </Link>
        </Grid>

      </Grid>

      {/* ================= RECENT ENQUIRIES TABLE ================= */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          borderLeft: "6px solid #ea580c",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
        }}
      >

        <Typography
          variant="h6"
          mb={2}
          sx={{ color: "#0f172a", fontWeight: 600 }}
        >
          Recent Enquiries
        </Typography>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><b>Student</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Course</b></TableCell>
              <TableCell><b>Status</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {recentEnquiries.length > 0 ? (

              recentEnquiries.map((item) => {

                const studentName =
                  item?.studentId?.studentname || item?.name || "N/A";

                const studentEmail =
                  item?.studentId?.email || item?.email || "N/A";

                const studentPhone =
                  item?.studentId?.phone || item?.phone || "N/A";

                const courseName =
                  item?.courseId?.courseName ||
                  item?.courseName ||
                  "N/A";

                return (

                  <TableRow key={item._id} hover>

                    <TableCell>{studentName}</TableCell>
                    <TableCell>{studentEmail}</TableCell>
                    <TableCell>{studentPhone}</TableCell>
                    <TableCell>{courseName}</TableCell>

                    <TableCell>

                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          backgroundColor:
                            item.status === "Approved"
                              ? "#d4edda"
                              : item.status === "Rejected"
                              ? "#f8d7da"
                              : "#fff3cd"
                        }}
                      >
                        {item.status}
                      </span>

                    </TableCell>

                  </TableRow>

                );

              })

            ) : (

              <TableRow>

                <TableCell colSpan={5} align="center">
                  No Enquiries Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </Paper>

    </>
  );
};

export default AnalyticsCard;