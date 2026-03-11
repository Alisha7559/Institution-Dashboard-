import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCategories,
  getSubCategories
} from '../../container/coursecontainer/slice';

import {
  Box,
  Button,
  Drawer,
  TextField,
  Select,
  MenuItem,
  Chip,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Card,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";

const initialForm = {
  courseName: '',
  category: '',
  subcategory: '',
  level: '',
  mode: 'Online',
  fees: '',
  totalSeats: '',
  duration: '',
  skills: '',
  location: '',
  modules: [],
  description: '',
  status: 'Active',
  institution: '',
  images: []
};

const CoursesDashboard = () => {
  const dispatch = useDispatch();
  const { courses = [], categories = [], subcategories = [], loading, error } = useSelector(state => state.course || {});
  const userData = useSelector((state) => state?.login?.userData || {});
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    dispatch(getCourses(userData));
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch, userData]);

  useEffect(() => {
    if (formData.category) {
      setFilteredSubcategories(
        (subcategories || []).filter(
          (sub) => String(sub.categoryId?._id) === String(formData.category)
        )
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, subcategories]);

  const skillsArray = (() => {
    if (!selectedCourse?.skills) return [];
    try {
      if (Array.isArray(selectedCourse.skills)) {
        if (typeof selectedCourse.skills[0] === "string" && !selectedCourse.skills[0].startsWith("[")) {
          return selectedCourse.skills;
        }
        return JSON.parse(selectedCourse.skills[0]);
      }
      return [];
    } catch {
      return [];
    }
  })();

  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const handleView = (course) => {
    setSelectedCourse(course);
    setViewOpen(true);
  };

  const handleDeleteClick = (id) => {
    setCourseToDelete(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCourse(courseToDelete));
    setDeleteOpen(false);
    setCourseToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setCourseToDelete(null);
  };

  const openAddDrawer = () => {
    setEditMode(false);
    setFormData({ ...initialForm, institution: userData?._id || '' });
    setOpen(true);
  };

  const openEditDrawer = (course) => {
    setEditMode(true);
    setFormData({
      _id: course._id,
      courseName: course.courseName || '',
      category: course.category?._id || '',
      subcategory: course.subcategory?._id || '',
      level: course.level || '',
      mode: course.mode || 'Online',
      fees: course.fees || '',
      totalSeats: course.totalSeats || '',
      duration: course.duration || '',
      skills: course.skills ? course.skills.join(", ") : "",
      location: course.location || '',
      modules: course.modules || [],
      description: course.description || '',
      status: course.status || 'Active',
      approval: course.approval || 'Pending',
      institution: course.institution?._id || userData?._id || '',
      images: course.images
    });
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Automatically capitalize for specific fields
    const capitalizeFields = [
      "courseName",
      "location",
      "skills",
      "description"
    ];

    setFormData({
      ...formData,
      [name]: capitalizeFields.includes(name) ? capitalizeWords(value) : value
    });
  };

  const handleModulesChange = (e) => {
    const count = Number(e.target.value);
    const modulesArray = Array.from({ length: count }, (_, index) => ({
      title: formData.modules[index]?.title || '',
      description: formData.modules[index]?.description || ''
    }));
    setFormData({ ...formData, modules: modulesArray });
  };

  const handleSubmit = () => {
    if (!formData.courseName || !formData.category || !formData.subcategory) {
      alert("Please fill all required fields!");
      return;
    }

    const form = new FormData();

    if (editMode) form.append("_id", formData._id);

    form.append("courseName", formData.courseName);
    form.append("category", formData.category);
    form.append("subcategory", formData.subcategory);
    form.append("institution", formData.institution);
    form.append("totalSeats", formData.totalSeats);
    form.append("fees", formData.fees);
    form.append("mode", formData.mode);
    form.append("status", formData.status);
    form.append("approval", formData.approval);
    form.append("location", formData.location);
    form.append("description", formData.description);
    form.append("duration", formData.duration);

    let skillsArray = [];
    if (typeof formData.skills === "string") {
      skillsArray = formData.skills.split(",").map((s) => s.trim());
    } else if (Array.isArray(formData.skills)) {
      skillsArray = formData.skills;
    }

    form.append("skills", JSON.stringify(skillsArray));
    form.append("modules", JSON.stringify(formData.modules));

    formData.images.forEach((img) => {
      if (img instanceof File) form.append("images", img);
      else form.append("existingImages", img);
    });

    if (editMode) dispatch(updateCourse({ id: formData._id, form }));
    else dispatch(addCourse(form));

    setOpen(false);
  };

  const toggleStatus = (course) => {
    dispatch(updateCourse({
      id: course._id,
      form: { status: course.status === 'Active' ? 'Inactive' : 'Active' }
    }));
  };

  return (
  
    <Box sx={{ p: 4, backgroundColor: "rgb(230, 237, 248)", minHeight: "100vh" }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h2" fontWeight="bold">Courses</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDrawer}>
          Add New Course
        </Button>
      </Box>

      {/* LOADING */}
      {loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {error && <Typography color="error">{error}</Typography>}

      {/* TABLE */}
      <Card sx={{ borderLeft: "5px solid #ea580c",  borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
         }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#0f172a" }}>Course</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Category</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Subcategory</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Mode</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Fees</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Seats</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Status</TableCell>
              <TableCell sx={{ color: "#0f172a" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(courses || []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No Courses Found</TableCell>
              </TableRow>
            ) : (
              (courses || []).map(course => (
                <TableRow key={course._id}>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>{course.category?.name}</TableCell>
                  <TableCell>{course.subcategory?.name}</TableCell>
                  <TableCell>{course.mode}</TableCell>
                  <TableCell>₹{course.fees}</TableCell>
                  <TableCell>{course.totalSeats}</TableCell>
                  <TableCell>{course.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDrawer(course)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleView(course)} color="primary"><VisibilityIcon /></IconButton>
                    <IconButton sx={{ color: "#ea580c" }} onClick={() => handleDeleteClick(course._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* ADD/EDIT DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 600 } }}>
        <Box p={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h3">{editMode ? 'Edit Course' : 'Add Course'}</Typography>
            <IconButton onClick={() => setOpen(false)}>✕</IconButton>
          </Box>

          {/* FORM FIELDS */}
          <TextField fullWidth label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              {(categories || []).map(cat => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              {(filteredSubcategories || []).length === 0
                ? <MenuItem disabled>No Subcategories</MenuItem>
                : (filteredSubcategories || []).map(sub => <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>)
              }
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select name="level" value={formData.level} onChange={handleChange}>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Mode</InputLabel>
            <Select name="mode" value={formData.mode} onChange={handleChange}>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth label="Fees ₹" name="fees" type="number" value={formData.fees} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Total Seats" name="totalSeats" type="number" value={formData.totalSeats} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Duration" name="duration" value={formData.duration} onChange={handleChange}
            margin="normal"
            InputLabelProps={{ sx: { textTransform: 'capitalize' } }}
            inputProps={{ style: { textTransform: 'capitalize' } }} />
          <TextField fullWidth label="Skills" name="skills" value={formData.skills} onChange={handleChange}
            margin="normal"
            InputLabelProps={{ sx: { textTransform: 'capitalize' } }}
            inputProps={{ style: { textTransform: 'capitalize' } }} />

          <FormControl fullWidth margin="normal">
            <InputLabel>Modules</InputLabel>
            <Select value={formData.modules?.length || 0} onChange={handleModulesChange}>
              {[1, 2, 3, 4, 5].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
            </Select>
          </FormControl>

          {(formData.modules || []).map((module, index) => (
            <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Module {index + 1}</Typography>
              <TextField
                fullWidth
                label="Module Title"
                value={module.title}
                onChange={(e) => {
                  const updatedModules = [...formData.modules];
                  updatedModules[index].title = capitalizeWords(e.target.value); // <-- capitalize
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
                inputProps={{ style: { textTransform: 'capitalize' } }} // Optional: also visually capitalizes input
              />
              <TextField
                fullWidth
                label="Module Description"
                multiline
                rows={3}
                value={module.description}
                onChange={(e) => {
                  const updatedModules = [...formData.modules];
                  updatedModules[index].description = capitalizeWords(e.target.value); // <-- capitalize
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
                inputProps={{ style: { textTransform: 'capitalize' } }} // Optional
              />
            </Box>
          ))}

          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={3} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* Images */}
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Course Images</InputLabel>
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload Images
              <input type="file" accept="image/*" hidden multiple onChange={(e) => {
                const files = Array.from(e.target.files);
                setFormData({ ...formData, images: [...formData.images, ...files] });
              }} />
            </Button>

            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {(formData.images || []).map((img, index) => {
                const src = typeof img === 'string' ? img : URL.createObjectURL(img);
                return (
                  <Box key={index} sx={{ position: 'relative', width: 100, height: 100, borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc' }}>
                    <img src={src} alt={`Course ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <IconButton size="small" onClick={() => {
                      const newImages = [...formData.images];
                      newImages.splice(index, 1);
                      setFormData({ ...formData, images: newImages });
                    }} sx={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(255,255,255,0.7)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }, p: 0.5 }}>
                      ✕
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </FormControl>

          <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            {editMode ? 'Update Course' : 'Create Course'}
          </Button>
        </Box>
      </Drawer>

      {/* VIEW DRAWER */}
      <Drawer
  anchor="right"
  open={viewOpen}
  onClose={() => setViewOpen(false)}
  PaperProps={{
    sx: {
      width: 540,
      backgroundColor: "#ffff",
      p: 0
    }
  }}
>
  {selectedCourse && (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
         
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#0f172a">
          {selectedCourse.courseName}
        </Typography>
        <IconButton onClick={() => setViewOpen(false)}>
          ✕
        </IconButton>
      </Box>

      <Box p={3}>
        {/* Status Chip */}
        <Chip
          label={selectedCourse.status}
          size="small"
          sx={{
            mb: 3,
            backgroundColor:
              selectedCourse.status === "Active" ? "#2e7d32" : "#c62828",
            color: "#fff",
            fontWeight: "bold"
          }}
        />

        {/* Course Image */}
        {selectedCourse?.images?.length > 0 ? (
          <Box mb={3} textAlign="center">
            <img
              src={`http://localhost:7000/${selectedCourse.images[0]}`}
              alt="course"
              style={{
                width: "90%",
                height: 220,
                objectFit: "cover",
                borderRadius: 12,
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
              }}
            />
          </Box>
        ) : (
          <Typography color="#0f172a" mb={3}>No image available</Typography>
        )}

        <Paper
  elevation={0}
  sx={{
    p: 3,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#fff",
    // borderLeft: "5px solid #0f172a",
    boxShadow: "4 4px 12px rgba(0,0,0,0.05)"
  }}
>
  

  {/* Course Information */}
  <Box mb={3}>
    
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography color="#0f172a" fontWeight="900">Category</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.category?.name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="#0f172a"  fontWeight="900">Subcategory</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.subcategory?.name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="#0f172a"  fontWeight="900">Mode</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.mode}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="#0f172a"  fontWeight="900">Duration</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.duration}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="#0f172a" fontWeight="900">Fees</Typography>
        <Typography color="#0f172a"fontSize="500">₹{selectedCourse.fees}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography color="#0f172a"  fontWeight="900">Seats</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.totalSeats}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="#0f172a"  fontWeight="900">Location</Typography>
        <Typography color="#0f172a"fontSize="500">{selectedCourse.location}</Typography>
      </Grid>
    </Grid>
  </Box>

  {/* Skills */}
  {skillsArray.length > 0 && (
    <Box mb={3}>
      <Typography  mb={2} color="#0f172a" fontWeight="900">
        Skills Covered
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {skillsArray.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            sx={{
              borderColor: "#ea580c",
              color: "#0f172a",
              fontWeight: "500"
            }}
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  )}

  {/* Description */}
  <Box mb={3}>
    <Typography  fontWeight="900" mb={1} color="#0f172a" >
      Description
    </Typography>
    <Typography color="#0f172a"fontSize="500">{selectedCourse.description}</Typography>
  </Box>

  {/* Modules */}
  {selectedCourse.modules?.length > 0 && (
    <Box>
      <Typography  fontWeight="900" mb={2} color="#0f172a">
        Course Modules
      </Typography>
      {selectedCourse.modules.map((m, index) => (
        <Box key={index} mb={2}>
          <Typography fontWeight="700" color="#0f172a">
            {index + 1}. {m.title}
          </Typography>
          <Typography variant="body2" fontSize="500" color="#0f172a">{m.description}</Typography>
          {index !== selectedCourse.modules.length - 1 && <Divider sx={{ mt: 1 }} />}
        </Box>
      ))}
    </Box>
  )}
</Paper>
        
      </Box>
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
};

export default CoursesDashboard;