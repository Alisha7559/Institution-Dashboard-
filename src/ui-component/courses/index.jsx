// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import {
// //   getCourses,
// //   addCourse,
// //   updateCourse,
// //   deleteCourse
// // } from '../../container/coursecontainer/slice';

// // import {
// //   Box,
// //   Button,
// //   Drawer,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableRow,
// //   IconButton,
// //   Typography,
// //   FormControl,
// //   InputLabel,
// //   CircularProgress
// // } from '@mui/material';

// // import AddIcon from '@mui/icons-material/Add';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// // const initialForm = {
// //   courseName: '',
// //   category: '',
// //   mode: 'Online',
// //   fees: '',
// //   totalSeats: '',
// //   status: 'Active'
// // };

// // const CoursesDashboard = () => {
// //   const dispatch = useDispatch();

// //   // ✅ CORRECT SINGLE SELECTOR
// //   const { courses, loading, error } = useSelector(
// //     (state) => state.cours
// //   );

// //   const [open, setOpen] = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [formData, setFormData] = useState(initialForm);

// //   /* ===== LOAD COURSES ===== */
// //   useEffect(() => {
// //     dispatch(getCourses());
// //   }, [dispatch]);

// //   /* ================= HANDLERS ================= */

// //   const openAddDrawer = () => {
// //     setEditMode(false);
// //     setFormData(initialForm);
// //     setOpen(true);
// //   };

// //   const openEditDrawer = (course) => {
// //     setEditMode(true);
// //     setFormData(course);
// //     setOpen(true);
// //   };

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = () => {
// //     if (editMode) {
// //       dispatch(updateCourse(formData));
// //     } else {
// //       dispatch(addCourse(formData));
// //     }
// //     setOpen(false);
// //   };

// //   const toggleStatus = (course) => {
// //     dispatch(
// //       updateCourse({
// //         ...course,
// //         status: course.status === 'Active' ? 'Inactive' : 'Active'
// //       })
// //     );
// //   };

// //   /* ================= UI ================= */

// //   return (
// //     <Box p={3}>
// //       {/* HEADER */}
// //       <Box display="flex" justifyContent="space-between" mb={2}>
// //         <Typography variant="h5">Courses</Typography>
// //         <Button
// //           variant="contained"
// //           startIcon={<AddIcon />}
// //           onClick={openAddDrawer}
// //         >
// //           Add New Course
// //         </Button>
// //       </Box>

// //       {/* LOADING */}
// //       {loading && (
// //         <Box display="flex" justifyContent="center" my={4}>
// //           <CircularProgress />
// //         </Box>
// //       )}

// //       {/* ERROR */}
// //       {error && (
// //         <Typography color="error" align="center" mb={2}>
// //           {error}
// //         </Typography>
// //       )}

// //       {/* TABLE */}
// //       {!loading && (
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Course Name</TableCell>
// //               <TableCell>Category</TableCell>
// //               <TableCell>Mode</TableCell>
// //               <TableCell>Fees</TableCell>
// //               <TableCell>Seats</TableCell>
// //               <TableCell>Status</TableCell>
// //               <TableCell>Actions</TableCell>
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //             {courses.length === 0 ? (
// //               <TableRow>
// //                 <TableCell colSpan={7} align="center">
// //                   No courses found
// //                 </TableCell>
// //               </TableRow>
// //             ) : (
// //               courses.map((course) => (
// //                 <TableRow key={course._id}>
// //                   <TableCell>{course.courseName}</TableCell>
// //                   <TableCell>{course.category}</TableCell>
// //                   <TableCell>{course.mode}</TableCell>
// //                   <TableCell>₹{course.fees}</TableCell>
// //                   <TableCell>{course.totalSeats}</TableCell>
// //                   <TableCell>{course.status}</TableCell>
// //                   <TableCell>
// //                     <IconButton onClick={() => openEditDrawer(course)}>
// //                       <EditIcon />
// //                     </IconButton>

// //                     <IconButton onClick={() => toggleStatus(course)}>
// //                       <PowerSettingsNewIcon color="success" />
// //                     </IconButton>

// //                     <IconButton
// //                       color="error"
// //                       onClick={() => dispatch(deleteCourse(course._id))}
// //                     >
// //                       <DeleteIcon />
// //                     </IconButton>
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             )}
// //           </TableBody>
// //         </Table>
// //       )}

// //       {/* DRAWER */}
// //       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
// //         <Box width={380} p={3}>
// //           <Typography variant="h6" mb={2}>
// //             {editMode ? 'Edit Course' : 'Add New Course'}
// //           </Typography>

// //           <TextField
// //             fullWidth
// //             label="Course Name"
// //             name="courseName"
// //             value={formData.courseName}
// //             onChange={handleChange}
// //             margin="normal"
// //           />

// //           <TextField
// //             fullWidth
// //             label="Category"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             margin="normal"
// //           />

// //           <FormControl fullWidth margin="normal">
// //             <InputLabel>Mode</InputLabel>
// //             <Select
// //               name="mode"
// //               value={formData.mode}
// //               label="Mode"
// //               onChange={handleChange}
// //             >
// //               <MenuItem value="Online">Online</MenuItem>
// //               <MenuItem value="Offline">Offline</MenuItem>
// //             </Select>
// //           </FormControl>

// //           <TextField
// //             fullWidth
// //             label="Fees"
// //             name="fees"
// //             type="number"
// //             value={formData.fees}
// //             onChange={handleChange}
// //             margin="normal"
// //           />

// //           <TextField
// //             fullWidth
// //             label="Total Seats"
// //             name="totalSeats"
// //             type="number"
// //             value={formData.totalSeats}
// //             onChange={handleChange}
// //             margin="normal"
// //           />

// //           <FormControl fullWidth margin="normal">
// //             <InputLabel>Status</InputLabel>
// //             <Select
// //               name="status"
// //               value={formData.status}
// //               label="Status"
// //               onChange={handleChange}
// //             >
// //               <MenuItem value="Active">Active</MenuItem>
// //               <MenuItem value="Inactive">Inactive</MenuItem>
// //             </Select>
// //           </FormControl>

// //           <Button
// //             fullWidth
// //             variant="contained"
// //             sx={{ mt: 3 }}
// //             onClick={handleSubmit}
// //           >
// //             {editMode ? 'Update Course' : 'Create Course'}
// //           </Button>
// //         </Box>
// //       </Drawer>
// //     </Box>
// //   );
// // };

// // export default CoursesDashboard;
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getCourses,
//   addCourse,
//   updateCourse,
//   deleteCourse,
//   getCategories,
//   getSubCategories
// } from '../../container/coursecontainer/slice';

// import {
//   Box,
//   Button,
//   Drawer,
//   TextField,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   Typography,
//   FormControl,
//   InputLabel,
//   CircularProgress
// } from '@mui/material';

// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// const initialForm = {
//   courseName: '',
//   category: '',
//   subcategory: "",
//   level: '',
//   mode: 'Online',
//   fees: '',
//   totalSeats: '',
//   location: '',
//   modules: [],
//   description: '',
//   status: 'Active',
//   approval: 'Pending',
//   institution: '', // added for backend
//     images: []       // add this for course images

// };

// const CoursesDashboard = () => {
//   const dispatch = useDispatch();
//   const { courses, categories, subcategories, loading, error } = useSelector(state => state.course || {});
//   const c = useSelector(state => state.course || {});
//   const userData = useSelector((state) => state?.login?.userData || {});


//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState(initialForm);

//   useEffect(() => {
//     dispatch(getCourses());
//     dispatch(getCategories());
//     dispatch(getSubCategories());
//   }, [dispatch]);

//   const openAddDrawer = () => {
//     setEditMode(false);
//     setFormData({ ...initialForm, institution: userData._id });
//     setOpen(true);
//   };

//   const openEditDrawer = (course) => {
//     setEditMode(true);
//     setFormData({
//       ...course,
//       category: course.category?._id || '',
//       subcategory: course.subcategory?._id || '',
//       institution: course.institution?._id || userData?._id
//     });
//     setOpen(true);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
//    const handleModulesChange = (e) => {
//     const count = Number(e.target.value);

//     const modulesArray = Array.from({ length: count }, (_, index) => ({
//       title: formData.modules[index]?.title || '',
//       description: formData.modules[index]?.description || ''
//     }));

//     setFormData({
//       ...formData,
//       modules: modulesArray
//     });
//   };

// const handleSubmit = () => {
//   // Validate required fields
//   if (!formData.courseName || !formData.category || !formData.subcategory || !formData.fees || !formData.totalSeats || !formData.institution) {
//     alert("Please fill all required fields!");
//     return;
//   }

//   // Prepare payload as JSON
//   const payload = {
//     courseName: formData.courseName,
//     category: formData.category,
//     subcategory: formData.subcategory,
//     institution: formData.institution,
//     totalSeats: Number(formData.totalSeats),
//     fees: Number(formData.fees),
//     mode: formData.mode,
//     status: formData.status,
//     approval: formData.approval,
//     location: formData.location,
//     description: formData.description,
//     modules: formData.modules,
//     images: formData.images  // if images are URLs
//   };
  

//   if (editMode) {
//     dispatch(updateCourse(payload));
//   } else {
//     dispatch(addCourse(payload));
//   }

//   setOpen(false);
// };

//   const toggleStatus = (course) => {
//     dispatch(updateCourse({
//       ...course,
//       status: course.status === 'Active' ? 'Inactive' : 'Active'
//     }));
//   };
//   // Add a new local state for filtered subcategories
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);

//   // Update filtered subcategories whenever category or subcategories change
//   useEffect(() => {
//     if (formData.category) {
//       setFilteredSubcategories(
//         subcategories.filter(
//           (sub) => String(sub.categoryId._id) === String(formData.category)
//         )
//       );
//     } else {
//       setFilteredSubcategories([]);
//     }
//   }, [formData.category, subcategories]);

//   console.log("ccc", filteredSubcategories);

//   return (
//     <Box p={3}>
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <Typography variant="h5">Courses</Typography>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDrawer}>
//           Add New Course
//         </Button>
//       </Box>

//       {/* LOADING */}
//       {loading && <Box textAlign="center"><CircularProgress /></Box>}

//       {/* ERROR */}
//       {error && <Typography color="error">{error}</Typography>}

//       {/* TABLE */}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Course</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Subcategory</TableCell>
//             <TableCell>Mode</TableCell>
//             <TableCell>Fees</TableCell>
//             <TableCell>Seats</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Approval</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {courses.map(course => (
//             <TableRow key={course._id}>
//               <TableCell>{course.courseName}</TableCell>
//               <TableCell>{course.category?.name}</TableCell>
//               <TableCell>{course.subcategory?.name}</TableCell>
//               <TableCell>{course.mode}</TableCell>
//               <TableCell>₹{course.fees}</TableCell>
//               <TableCell>{course.totalSeats}</TableCell>
//               <TableCell>{course.status}</TableCell>
//               <TableCell>{course.approval}</TableCell>
//               <TableCell>
//                 <IconButton onClick={() => openEditDrawer(course)}><EditIcon /></IconButton>
//                 <IconButton onClick={() => toggleStatus(course)}><PowerSettingsNewIcon color="success" /></IconButton>
//                 <IconButton color="error" onClick={() => dispatch(deleteCourse(course._id))}><DeleteIcon /></IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* DRAWER FORM */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{ sx: { width: 600 } }}
//       >
//         <Box p={3}>
//           <Typography variant="h6">{editMode ? 'Edit Course' : 'Add Course'}</Typography>


//         <FormControl fullWidth margin="normal">
//   <InputLabel shrink>Course Images</InputLabel>

//   {/* Upload Button */}
//   <Button
//     variant="outlined"
//     component="label"
//     sx={{ mt: 1 }}
//   >
//     Upload Images
//     <input
//       type="file"
//       accept="image/*"
//       hidden
//       multiple
//       onChange={(e) => {
//         const files = Array.from(e.target.files);
//         setFormData({
//           ...formData,
//           images: [...formData.images, ...files] // append new images
//         });
//       }}
//     />
//   </Button>

//   {/* Preview uploaded images */}
//   <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
//     {formData.images.map((img, index) => {
//       const src = typeof img === 'string' ? img : URL.createObjectURL(img);
//       return (
//         <Box
//           key={index}
//           sx={{
//             position: 'relative',
//             width: 100,
//             height: 100,
//             borderRadius: 2,
//             overflow: 'hidden',
//             border: '1px solid #ccc',
//           }}
//         >
//           <img
//             src={src}
//             alt={`Course ${index + 1}`}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//           <IconButton
//             size="small"
//             onClick={() => {
//               const newImages = [...formData.images];
//               newImages.splice(index, 1);
//               setFormData({ ...formData, images: newImages });
//             }}
//             sx={{
//               position: 'absolute',
//               top: 2,
//               right: 2,
//               backgroundColor: 'rgba(255,255,255,0.7)',
//               '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
//               p: 0.5,
//             }}
//           >
//             ✕
//           </IconButton>
//         </Box>
//       );
//     })}
//   </Box>
// </FormControl>

//           <TextField
//             fullWidth
//             label="Course Name"
//             name="courseName"
//             value={formData.courseName}
//             onChange={handleChange}
//             margin="normal"
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Category</InputLabel>
//             <Select name="category" value={formData.category} onChange={handleChange}>
//               {categories.map(cat => (
//                 <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Sub Category</InputLabel>
//             <Select
//               name="subcategory"
//               value={formData.subcategory}
//               onChange={handleChange}
//             >
//               {filteredSubcategories.length === 0 ? (
//                 <MenuItem disabled>No Subcategories</MenuItem>
//               ) : (
//                 filteredSubcategories.map((sub) => (
//                   <MenuItem key={sub._id} value={sub._id}>
//                     {sub.name}
//                   </MenuItem>
//                 ))
//               )}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Level</InputLabel>
//             <Select name="level" value={formData.level} onChange={handleChange}>
//               <MenuItem value="Beginner">Beginner</MenuItem>
//               <MenuItem value="Intermediate">Intermediate</MenuItem>
//               <MenuItem value="Advanced">Advanced</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Mode</InputLabel>
//             <Select name="mode" value={formData.mode} onChange={handleChange}>
//               <MenuItem value="Online">Online</MenuItem>
//               <MenuItem value="Offline">Offline</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             label="Fees ₹"
//             name="fees"
//             type="number"
//             value={formData.fees}
//             onChange={handleChange}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Seats"
//             name="totalSeats"
//             type="number"
//             value={formData.totalSeats}
//             onChange={handleChange}
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             margin="normal"
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Modules</InputLabel>
// <Select
//   value={formData.modules.length}
//   onChange={handleModulesChange}
// >              <MenuItem value="1">1</MenuItem>
//               <MenuItem value="2">2</MenuItem>
//               <MenuItem value="3">3</MenuItem>
//               <MenuItem value="4">4</MenuItem>

//               <MenuItem value="5">5</MenuItem>

//             </Select>
//           </FormControl>
//           {formData.modules.map((module, index) => (
//   <Box key={index} sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
    
//     <Typography variant="subtitle1" gutterBottom>
//       Module {index + 1}
//     </Typography>

//     <TextField
//       fullWidth
//       label="Module Title"
//       value={module.title}
//       onChange={(e) => {
//         const updatedModules = [...formData.modules];
//         updatedModules[index].title = e.target.value;
//         setFormData({ ...formData, modules: updatedModules });
//       }}
//       margin="normal"
//     />

//     <TextField
//       fullWidth
//       label="Module Description"
//       multiline
//       rows={3}
//       value={module.description}
//       onChange={(e) => {
//         const updatedModules = [...formData.modules];
//         updatedModules[index].description = e.target.value;
//         setFormData({ ...formData, modules: updatedModules });
//       }}
//       margin="normal"
//     />

//   </Box>
// ))}

//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             margin="normal"
//             multiline
//             rows={3}
//           />

//           <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
//             {editMode ? 'Update Course' : 'Create Course'}
//           </Button>
//         </Box>
//       </Drawer>
//     </Box>
//   );
// };

// export default CoursesDashboard;
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
  subcategory: '',
  level: '',
  mode: 'Online',
  fees: '',
  totalSeats: '',
  location: '',
  modules: [],
  description: '',
  status: 'Active',
  approval: 'Pending',
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

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getSubCategories());
  }, [dispatch]);

  // Filter subcategories based on selected category
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

  const openAddDrawer = () => {
    setEditMode(false);
    setFormData({ ...initialForm, institution: userData?._id || '' });
    setOpen(true);
  };

 const openEditDrawer = (course) => {
  setEditMode(true);
  setFormData({
    _id: course._id, // important!
    courseName: course.courseName || '',
    category: course.category?._id || '',
    subcategory: course.subcategory?._id || '',
    level: course.level || '',
    mode: course.mode || 'Online',
    fees: course.fees || '',
    totalSeats: course.totalSeats || '',
    location: course.location || '',
    modules: course.modules || [],
    description: course.description || '',
    status: course.status || 'Active',
    approval: course.approval || 'Pending',
    institution: course.institution?._id || userData?._id || '',
    images: course.images || []
  });
  setOpen(true);
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const payload = {
    ...(editMode && { _id: formData._id }), // include _id if editing
    courseName: formData.courseName,
    category: formData.category,
    subcategory: formData.subcategory,
    institution: formData.institution,
    totalSeats: Number(formData.totalSeats),
    fees: Number(formData.fees),
    mode: formData.mode,
    status: formData.status,
    approval: formData.approval,
    location: formData.location,
    description: formData.description,
    modules: formData.modules,
    images: formData.images // can be files or URLs depending on backend
  };

  if (editMode) {
    dispatch(updateCourse(payload));
  } else {
    dispatch(addCourse(payload));
  }

  setOpen(false);
};

  const toggleStatus = (course) => {
    dispatch(updateCourse({
      ...course,
      status: course.status === 'Active' ? 'Inactive' : 'Active'
    }));
  };

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Courses</Typography>
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Subcategory</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Fees</TableCell>
            <TableCell>Seats</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Approval</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(courses || []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">No courses found</TableCell>
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
                <TableCell>{course.approval}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDrawer(course)}><EditIcon /></IconButton>
                  <IconButton onClick={() => toggleStatus(course)}><PowerSettingsNewIcon color="success" /></IconButton>
                  <IconButton color="error" onClick={() => dispatch(deleteCourse(course._id))}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* DRAWER FORM */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 600 } }}>
        <Box p={3}>
          <Typography variant="h6">{editMode ? 'Edit Course' : 'Add Course'}</Typography>

          {/* Course Images */}
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Course Images</InputLabel>
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload Images
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFormData({ ...formData,  images: [...formData.images, ...files]  });
                }}
              />
            </Button>

            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              {(formData.images || []).map((img, index) => {
                const src = typeof img === 'string' ? img : URL.createObjectURL(img);
                return (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid #ccc',
                    }}
                  >
                    <img src={src} alt={`Course ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <IconButton
                      size="small"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, images: newImages });
                      }}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                        p: 0.5,
                      }}
                    >
                      ✕
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </FormControl>

          {/* Course Name */}
          <TextField fullWidth label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} margin="normal" />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              {(categories || []).map(cat => (
                <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subcategory */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Sub Category</InputLabel>
            <Select name="subcategory" value={formData.subcategory} onChange={handleChange}>
              {(filteredSubcategories || []).length === 0 ? (
                <MenuItem disabled>No Subcategories</MenuItem>
              ) : (
                (filteredSubcategories || []).map(sub => (
                  <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Level */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Level</InputLabel>
            <Select name="level" value={formData.level} onChange={handleChange}>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          {/* Mode */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Mode</InputLabel>
            <Select name="mode" value={formData.mode} onChange={handleChange}>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
          </FormControl>

          {/* Fees and Seats */}
          <TextField fullWidth label="Fees ₹" name="fees" type="number" value={formData.fees} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Seats" name="totalSeats" type="number" value={formData.totalSeats} onChange={handleChange} margin="normal" />

          {/* Location */}
          <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} margin="normal" />

          {/* Modules */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Modules</InputLabel>
            <Select value={formData.modules?.length || 0} onChange={handleModulesChange}>
              {[1,2,3,4,5].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
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
                  updatedModules[index].title = e.target.value;
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Module Description"
                multiline
                rows={3}
                value={module.description}
                onChange={(e) => {
                  const updatedModules = [...formData.modules];
                  updatedModules[index].description = e.target.value;
                  setFormData({ ...formData, modules: updatedModules });
                }}
                margin="normal"
              />
            </Box>
          ))}

          {/* Description */}
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="normal" multiline rows={3} />

          <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            {editMode ? 'Update Course' : 'Create Course'}
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CoursesDashboard;