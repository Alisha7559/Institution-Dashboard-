// import React from 'react';
// import { Grid, Box } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { blueGrey } from '@mui/material/colors';
// import { UserOutlined, HomeOutlined, WarningOutlined, MessageOutlined } from '@ant-design/icons';
// import Card from './card';
// // import { DetailCard } from './DetailCard';
// import { ClockCircleOutlined } from '@ant-design/icons';

// const AnalyticsCard = () => {
//   const facilityList = useSelector((state) => state.facility?.list || []);
//   const issueList = useSelector((state) => state.reportIssue?.list || []);
//   const feedbackList = useSelector((state) => state.rating?.list || []);
//   const usersList = useSelector((state) => state.user?.list || []);
//   const dashCount = useSelector((state) => state?.dashboard?.dashCount);
//   const draftFacilities = useSelector((state) => state.facility?.draftList || []);

//   const draftCount = draftFacilities.length;

//   console.log('FacilityList in Dashboar = ', facilityList);

//   const counts = {
//     facilities: useSelector((state) => state.facility?.listCount || 0),
//     issues: useSelector((state) => state.reportIssue?.listCount || 0),
//     feedback: useSelector((state) => state?.rating?.listCount || 0),
//     users: useSelector((state) => state.user?.listCount || 0)
//   };

//   return (
//     <Grid container spacing={2}>

//   {/* Total Courses */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box
//           sx={{
//             background: "#e3f2fd",
//             borderRadius: 2,
//             p: 1,
//             mr: 2
//           }}
//         >
//           📘
//         </Box>

//         <Box>
//           <Typography variant="body2">Total Courses</Typography>
//           <Typography variant="h4">24</Typography>
//           <Typography variant="caption" color="green">
//             ↑ 12% from last month
//           </Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

//   {/* Active Courses */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box sx={{ background: "#e8f5e9", borderRadius: 2, p: 1, mr: 2 }}>
//           📖
//         </Box>

//         <Box>
//           <Typography variant="body2">Active Courses</Typography>
//           <Typography variant="h4">18</Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

//   {/* Total Seats */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box sx={{ background: "#e1f5fe", borderRadius: 2, p: 1, mr: 2 }}>
//           💺
//         </Box>

//         <Box>
//           <Typography variant="body2">Total Seats</Typography>
//           <Typography variant="h4">750</Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

//   {/* Filled Seats */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box sx={{ background: "#e0f2f1", borderRadius: 2, p: 1, mr: 2 }}>
//           👤
//         </Box>

//         <Box>
//           <Typography variant="body2">Filled Seats</Typography>
//           <Typography variant="h4">582</Typography>
//           <Typography variant="caption" color="green">
//             ↑ 8% from last month
//           </Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

//   {/* Vacant Seats */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box sx={{ background: "#fff3e0", borderRadius: 2, p: 1, mr: 2 }}>
//           🪑
//         </Box>

//         <Box>
//           <Typography variant="body2">Vacant Seats</Typography>
//           <Typography variant="h4">168</Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

//   {/* Students Enrolled */}
//   <Grid item xs={12} sm={6} md={4}>
//     <MainCard>
//       <Box display="flex" alignItems="center">
//         <Box sx={{ background: "#e8eaf6", borderRadius: 2, p: 1, mr: 2 }}>
//           🎓
//         </Box>

//         <Box>
//           <Typography variant="body2">Students Enrolled</Typography>
//           <Typography variant="h4">1,247</Typography>
//           <Typography variant="caption" color="green">
//             ↑ 15% from last month
//           </Typography>
//         </Box>
//       </Box>
//     </MainCard>
//   </Grid>

// </Grid>
//   )}
//   export default AnalyticsCard;

import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const AnalyticsCard = () => {

  return (

    <Grid container spacing={2}>

      <Grid item xs={12} sm={6} md={4}>
        <MainCard>
          <Box>
            <Typography>Total Courses</Typography>
            <Typography variant="h4">24</Typography>
          </Box>
        </MainCard>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MainCard>
          <Box>
            <Typography>Active Courses</Typography>
            <Typography variant="h4">18</Typography>
          </Box>
        </MainCard>
      </Grid>

    </Grid>

  );

};

export default AnalyticsCard;
