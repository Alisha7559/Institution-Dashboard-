import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../container/studentcontainer/slice";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

export default function Students() {

  const dispatch = useDispatch();

  const { students = [], loading = false } = useSelector(
    (state) => state.student || {}
  );

  const [search, setSearch] = useState("");
  const [courseTypeFilter, setCourseTypeFilter] = useState("All");

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(null);
  const open = Boolean(anchorEl);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuWidth(event.currentTarget.offsetWidth);
  };
  const handleClose = (value) => {
    if (value) setCourseTypeFilter(value);
    setAnchorEl(null);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };

  // statistics
  const totalStudents = students.length;

 const degreeStudents = students.filter(
  (s) => s.courseId?.subcategory?.name?.toLowerCase() === "degree"
).length;

const diplomaStudents = students.filter(
  (s) => s.courseId?.subcategory?.name?.toLowerCase() === "diploma"
).length;

  // latest first + search + filter
  const filteredStudents = [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((s) =>
      (s.studentId?.studentname || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((s) => {
  const type = s.courseId?.subcategory?.name?.toLowerCase();

  if (courseTypeFilter === "Degree") {
    return type === "degree";
  }

  if (courseTypeFilter === "Diploma") {
    return type === "diploma";
  }

  return true;
});

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#e6edf8", minHeight: "100vh" }}>

      {/* HEADER */}

      <Typography variant="h4" fontWeight="bold" mb={4}>
        Registered Students
      </Typography>

      {/* SEARCH + FILTER */}

      <Stack direction="row" spacing={2} mb={3}>

        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={handleClick}
          sx={{
            background: "#fff",
            color: "#0f172a",
            borderRadius: "30px",
            textTransform: "none",
            px: 3,
            boxShadow: 2,
            "&:hover": {
              background: "#fff", // prevents hover color change
              boxShadow: 2
            }
          }}
        >
          {courseTypeFilter === "All" ? "All Courses" : courseTypeFilter}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          PaperProps={{
            sx: {
              width: menuWidth,
              borderRadius: "12px"
            }
          }}
        >
          <MenuItem onClick={() => handleClose("All")}>All</MenuItem>
          <MenuItem onClick={() => handleClose("Degree")}>Degree</MenuItem>
          <MenuItem onClick={() => handleClose("Diploma")}>Diploma</MenuItem>
        </Menu>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            borderRadius: "30px",
            px: 2,
            boxShadow: 2,
            width: 280
          }}
        >

          <SearchIcon sx={{ color: "#888", mr: 1 }} />

          <input
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              background: "transparent"
            }}
          />

        </Box>

      </Stack>

      {/* STATISTICS */}

      <Grid container spacing={3} mb={4}>

        {[
          { label: "Total Students", value: totalStudents },
          { label: "Degree Students", value: degreeStudents },
          { label: "Diploma Students", value: diplomaStudents }
        ].map((item, i) => (

          <Grid item xs={12} md={4} key={i}>

            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                borderLeft: "5px solid #ea580c",
                boxShadow: 3
              }}
            >

              <Typography variant="h4" fontWeight="bold">
                {item.value}
              </Typography>

              <Typography color="text.secondary">
                {item.label}
              </Typography>

            </Paper>

          </Grid>

        ))}

      </Grid>

      {/* TABLE */}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          borderLeft: "6px solid #ea580c"
        }}
      >

        <Table>

          <TableHead sx={{ background: "#f1f5f9" }}>

            <TableRow>

              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Course</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Price</b></TableCell>
              <TableCell><b>Payment</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (

                <TableRow key={student._id} hover>

                  <TableCell>
                    {student.studentId?.studentname}
                  </TableCell>

                  <TableCell>
                    {student.studentId?.email}
                  </TableCell>

                  <TableCell>
                    {student.courseId?.courseName}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={student.courseId?.subcategory?.name}
                      size="small"
                      sx={{
                        background: "#e0f2fe",
                        color: "#0369a1",
                        fontWeight: 600
                      }}
                    />

                  </TableCell>

                  <TableCell>
                    ₹ {student.courseId?.price}
                  </TableCell>

                  <TableCell>
                    {student.paymentMethod}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={student.status}
                      color={
                        student.status === "Paid"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />

                  </TableCell>

                  <TableCell>

                    <IconButton
                      color="primary"
                      onClick={() => handleView(student)}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="secondary"
                      onClick={() => handleEdit(student)}
                    >
                      <EditIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

          </TableBody>

        </Table>

        <TablePagination
          component="div"
          count={filteredStudents.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />

      </TableContainer>

      {/* VIEW STUDENT MODAL */}

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth>

        <DialogTitle fontWeight="bold">
          Student Details
        </DialogTitle>

        <DialogContent>

          {selectedStudent && (

            <Grid container spacing={2} mt={1}>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Name
                </Typography>

                <Typography fontWeight="bold">
                  {selectedStudent.studentId?.studentname}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Email
                </Typography>

                <Typography fontWeight="bold">
                  {selectedStudent.studentId?.email}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Course
                </Typography>

                <Typography fontWeight="bold">
                  {selectedStudent.courseId?.courseName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Course Type
                </Typography>

                <Chip
                  label={selectedStudent.courseId?.subcategory?.name}
                  color="info"
                  size="small"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Course Price
                </Typography>

                <Typography fontWeight="bold" color="green">
                  ₹ {selectedStudent.courseId?.price}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Payment Method
                </Typography>

                <Typography fontWeight="bold">
                  {selectedStudent.paymentMethod}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="text.secondary">
                  Payment Status
                </Typography>

                <Chip
                  label={selectedStudent.status}
                  color={selectedStudent.status === "Paid" ? "success" : "warning"}
                />
              </Grid>

            </Grid>

          )}

        </DialogContent>

      </Dialog>

    </Box>
  );
}