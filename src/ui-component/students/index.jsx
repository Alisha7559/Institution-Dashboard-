import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../container/studentcontainer/slice";

import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  TextField,
  Button,
  Dialog,
 
  Card, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Students() {
  const dispatch = useDispatch();
  const { students = [], loading = false } = useSelector(
    (state) => state.student || {}
  );

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  // ---------------- VIEW ----------------
  const handleView = (student) => {
    setSelectedStudent(student);
    setViewOpen(true);
  };

  // ---------------- EDIT ----------------
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };
  const cancelDelete = () => {
  setDeleteOpen(false);
  setSelectedStudent(null);
};

  const handleUpdate = async () => {
    try {
      await fetch(
        `http://localhost:7000/api/registrations/${selectedStudent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            status: selectedStudent.status
          })
        }
      );
      dispatch(getStudents());
      setEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- DELETE ----------------
  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    await fetch(
      `http://localhost:7000/api/registration/${selectedStudent._id}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );
    dispatch(getStudents());
    setDeleteOpen(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ background: "#e6edf8", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Students
      </Typography>

      {/* TABLE */}
      <Card sx={{ borderLeft: "5px solid #ea580c",  borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
               }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((s) => (
              <TableRow key={s._id}>
                <TableCell>{s.studentId?.studentname}</TableCell>
                <TableCell>{s.studentId?.email}</TableCell>
                <TableCell>{s.courseId?.courseName}</TableCell>

                <TableCell>
                  <Chip
                    label={s.status}
                    sx={{
                      background:
                        s.status === "Paid" ? "#2e7d32" : "#ea580c",
                      color: "#fff"
                    }}
                  />
                </TableCell>

                <TableCell>
                  <IconButton onClick={() => handleView(s)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleEdit(s)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    sx={{ color: "#ea580c" }}
                    onClick={() => handleDeleteClick(s)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </Card>

      {/* ================= VIEW DRAWER ================= */}
      <Drawer
        anchor="right"
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        PaperProps={{ sx: { width: 500 } }}
      >
        {selectedStudent && (
          <Box>
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              p={3}
            >
              <Typography variant="h4" fontWeight="bold">
                {selectedStudent.studentId?.studentname}
              </Typography>
              <IconButton onClick={() => setViewOpen(false)}>✕</IconButton>
            </Box>

            <Box p={3}>
              <Chip
                label={selectedStudent.status}
                sx={{
                  background:
                    selectedStudent.status === "Paid"
                      ? "#2e7d32"
                      : "#ea580c",
                  color: "#fff",
                  mb: 3
                }}
              />

              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Email</Typography>
                    <Typography fontWeight="bold">
                      {selectedStudent.studentId?.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Course</Typography>
                    <Typography fontWeight="bold">
                      {selectedStudent.courseId?.courseName}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Fees</Typography>
                    <Typography fontWeight="bold">
                      ₹{selectedStudent.courseId?.fees}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>Payment</Typography>
                    <Typography fontWeight="bold">
                      {selectedStudent.paymentMethod}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        )}
      </Drawer>

      {/* ================= EDIT DRAWER ================= */}
      <Drawer
        anchor="right"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        PaperProps={{ sx: { width: 400 } }}
      >
        {selectedStudent && (
          <Box p={3}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">Edit Student</Typography>
              <IconButton onClick={() => setEditOpen(false)}>✕</IconButton>
            </Box>

            <TextField
              fullWidth
              label="Name"
              value={selectedStudent.studentId?.studentname}
              margin="normal"
              disabled
            />

            <TextField
              fullWidth
              label="Email"
              value={selectedStudent.studentId?.email}
              margin="normal"
              disabled
            />

            <FormControl fullWidth margin="normal">
  <InputLabel>Status</InputLabel>
  <Select
    value={selectedStudent.status || ""}
    label="Status"
    onChange={(e) =>
      setSelectedStudent({
        ...selectedStudent,
        status: e.target.value
      })
    }
  >
    <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Paid">Paid</MenuItem>
  </Select>
</FormControl>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, background: "#ea580c" }}
              onClick={handleUpdate}
            >
              Update Student
            </Button>
          </Box>
        )}
      </Drawer>

      
      {/* DELETE DIALOG */}
            <Dialog
              open={deleteOpen}
              onClose={cancelDelete}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  p: 3,
                  minWidth: 360,
                  backgroundColor: "#f9fafc",
                  boxShadow: 3
                }
              }}
            >
              <Box textAlign="center">
                {/* Warning Icon */}
                <Box
                  sx={{
                    backgroundColor: "#0f172a",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2
                  }}
                >
                  <Typography variant="h1" color="#ea580c">!</Typography>
                </Box>
      
                {/* Title */}
                <Typography variant="h4" fontWeight="bold" mb={1}>
                  Delete Course
                </Typography>
      
                {/* Description */}
                <Typography color="text.primary" variant="body2" mb={3}>
                  Are you sure you want to delete this course?
                  This action cannot be undone.
                </Typography>
      
                {/* Actions */}
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button
                    onClick={cancelDelete}
                    variant="outlined"
                    sx={{ borderRadius: 2, px: 3, color: "#0f172a", borderColor: "#0f172a" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmDelete}
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      backgroundColor: "#ea580c",
                      "&:hover": { backgroundColor: "#cc4700" }
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Dialog>
          </Box>
  );
}