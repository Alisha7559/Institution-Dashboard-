import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from '../../container/coursecontainer/slice';

import {
  Box,
  Button,
  Drawer,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const initialForm = {
  courseName: '',
  category: '',
  mode: 'Online',
  fees: '',
  totalSeats: '',
  status: 'Active'
};

const CoursesDashboard = () => {
  const dispatch = useDispatch();

  // ✅ CORRECT SINGLE SELECTOR
  const { courses, loading, error } = useSelector(
    (state) => state.cours
  );

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  /* ===== LOAD COURSES ===== */
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  /* ================= HANDLERS ================= */

  const openAddDrawer = () => {
    setEditMode(false);
    setFormData(initialForm);
    setOpen(true);
  };

  const openEditDrawer = (course) => {
    setEditMode(true);
    setFormData(course);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateCourse(formData));
    } else {
      dispatch(addCourse(formData));
    }
    setOpen(false);
  };

  const toggleStatus = (course) => {
    dispatch(
      updateCourse({
        ...course,
        status: course.status === 'Active' ? 'Inactive' : 'Active'
      })
    );
  };

  /* ================= UI ================= */

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Courses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDrawer}
        >
          Add New Course
        </Button>
      </Box>

      {/* LOADING */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {error && (
        <Typography color="error" align="center" mb={2}>
          {error}
        </Typography>
      )}

      {/* TABLE */}
      {!loading && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Mode</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Seats</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.mode}</TableCell>
                  <TableCell>₹{course.fees}</TableCell>
                  <TableCell>{course.totalSeats}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDrawer(course)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => toggleStatus(course)}>
                      <PowerSettingsNewIcon color="success" />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => dispatch(deleteCourse(course._id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box width={380} p={3}>
          <Typography variant="h6" mb={2}>
            {editMode ? 'Edit Course' : 'Add New Course'}
          </Typography>

          <TextField
            fullWidth
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Mode</InputLabel>
            <Select
              name="mode"
              value={formData.mode}
              label="Mode"
              onChange={handleChange}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Fees"
            name="fees"
            type="number"
            value={formData.fees}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Total Seats"
            name="totalSeats"
            type="number"
            value={formData.totalSeats}
            onChange={handleChange}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {editMode ? 'Update Course' : 'Create Course'}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CoursesDashboard;
