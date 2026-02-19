import React, { useEffect, useState } from "react";

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
  IconButton,
  Drawer,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";

import {
  getInstitutionOrders,
  updateOrder
} from "container/ordercontainer/slice";


const statusColor = {
  paid: "success",
  pending: "warning",
  cancelled: "error"
};


const OrderManagement = () => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.login.userData);

  const { data: orders = [], loading } = useSelector((state) => state.order);


  const institutionId = userData?._id;


  // Drawer state

  const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState({

    _id: "",

    student: "",

    course: "",

    price: "",

    status: ""

  });


  useEffect(() => {

    if (institutionId) {

      dispatch(getInstitutionOrders(institutionId));

    }

  }, [dispatch, institutionId]);


  // Stats

  const totalOrders = orders.length;

  const paidOrders = orders.filter(o => o.status === "paid").length;

  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const totalRevenue = orders

    .filter(o => o.status === "paid")

    .reduce((sum, o) => sum + Number(o.price || 0), 0);


  const stats = [

    { title: "Total Orders", value: totalOrders, icon: <ShoppingCartIcon color="primary"/> },

    { title: "Paid Orders", value: paidOrders, icon: <CheckCircleIcon color="success"/> },

    { title: "Pending Orders", value: pendingOrders, icon: <PendingIcon color="warning"/> },

    { title: "Total Revenue", value: `₹ ${totalRevenue}`, icon: <CurrencyRupeeIcon color="secondary"/> }

  ];


  // OPEN DRAWER

  const handleEdit = (order) => {

    setFormData({

      _id: order._id,

      student: order.student?.studentname,

      course: order.course?.courseName,

      price: order.price,

      status: order.status

    });

    setOpen(true);

  };


  // CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  // UPDATE

  const handleSubmit = () => {

    dispatch(updateOrder({

      id: formData._id,

      updateData: {

        price: formData.price,

        status: formData.status

      }

    }));

    setOpen(false);

  };


  return (

    <Box p={3}>

      <Typography variant="h2" mb={3}>

        Order Management

      </Typography>


      {/* Stats */}

      <Grid container spacing={3} mb={3}>

        {stats.map((item, index) => (

          <Grid item xs={12} md={3} key={index}>

            <Card sx={{ display: "flex", p: 2 }}>

              <Box mr={2}>{item.icon}</Box>

              <CardContent sx={{ p: 0 }}>

                <Typography>{item.title}</Typography>

                <Typography variant="h6">

                  {item.value}

                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>



      {/* Table */}

      <TableContainer component={Paper}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Student</TableCell>

              <TableCell>Course</TableCell>

              <TableCell>Price</TableCell>

              <TableCell>Status</TableCell>

              <TableCell>Date</TableCell>

              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {orders.map(order => (

              <TableRow key={order._id}>


                <TableCell>

                  {order.student?.studentname}

                </TableCell>


                <TableCell>

                  {order.course?.courseName}

                </TableCell>


                <TableCell>

                  ₹ {order.price}

                </TableCell>


                <TableCell>

                  <Chip

                    label={order.status}

                    color={statusColor[order.status]}

                  />

                </TableCell>


                <TableCell>

                  {new Date(order.createdAt).toLocaleDateString()}

                </TableCell>


                <TableCell>

                  <IconButton

                    onClick={() => handleEdit(order)}

                  >

                    <EditIcon />

                  </IconButton>

                </TableCell>


              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>



      {/* DRAWER */}


      <Drawer

        anchor="right"

        open={open}

        onClose={() => setOpen(false)}

      >

        <Box width={350} p={3} >

          <Typography variant="h6">

            Update Order

          </Typography>


          <TextField

            fullWidth

            label="Student"

            value={formData.student}

            margin="normal"

            disabled

          />


          <TextField

            fullWidth

            label="Course"

            value={formData.course}

            margin="normal"

            disabled

          />


          <TextField

            fullWidth

            label="Price"

            name="price"

            value={formData.price}

            onChange={handleChange}

            margin="normal"

          />


          <FormControl fullWidth margin="normal">

            <InputLabel>Status</InputLabel>

            <Select

              name="status"

              value={formData.status}

              onChange={handleChange}

            >

              <MenuItem value="pending">

                Pending

              </MenuItem>

              <MenuItem value="paid">

                Paid

              </MenuItem>

              <MenuItem value="cancelled">

                Cancelled

              </MenuItem>

            </Select>

          </FormControl>


          <Button

            variant="contained"

            fullWidth

            sx={{ mt: 2 }}

            onClick={handleSubmit}

          >

            Update Order

          </Button>


        </Box>

      </Drawer>


    </Box>

  );

};


export default OrderManagement;
