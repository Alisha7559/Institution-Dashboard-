import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Box, Button, Card, IconButton, InputAdornment, Stack, Typography, Divider,FormControlLabel,Checkbox,Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormikTextField from 'ui-component/common/loginInput';
import { userLogin } from 'container/LoginContainer/slice';
import { getRatingCount } from 'container/RatingContainer/slice';

import logo from 'assets/images/logo-removebg-preview.png';
const AppVersion = import.meta.env.VITE_APP_VERSION;

const AuthLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ['user_id', 'full_name', 'sid', 'user_image'].forEach((cookie) => Cookies.remove(cookie));
  }, []);

  useEffect(() => {
    if (props.failAction?.statusText) {
      setLoginError(props.failAction.statusText);
      const timeout = setTimeout(() => setLoginError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [props.failAction]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgb(230, 237, 248)',
        px: 2
      }}
    >
      <Card
        sx={{
          width: { xs: '100%', sm: '400px', md: '450px' },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor:"#0f172a"
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box component="img" src={logo} alt="Nxtstep" sx={{ height: { xs: 95, sm: 100 }, maxWidth: '100%' }} />
          <span style={{color:"#ea580c",fontFamily:"Elegant Serif",fontSize:"22px",top:"20px"}}>NXTSTEP
    <p style={{color:"white",fontFamily:"Spaced serif ",margin:"10px",fontSize:"20px"}}>Design Your Future</p></span>
        </Box>
        

        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: 0.5,
            color: '#ffff'
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            textAlign: 'center',
            color:  '#ffff'
          }}
        >
          Log in to your account to continue
        </Typography>

        <Formik
          initialValues={{ client_id: 'webapp', client_secret: 'saqw21!@', email: '', password: '' }}
          validationSchema={validate}
          onSubmit={(values) => dispatch(userLogin({ ...values, navigate }))}
        >
          {() => (
            <Form style={{ width: '100%', color:  '#ffff' }}>
              <Stack spacing={2}>
                <FormikTextField name="email" label="Email Address" type="text" fullWidth/>
                <FormikTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#fff',
                    backgroundColor: '#ea580c',
                    borderRadius: 2,
                    border: '1px solid#ea580c',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#ea580c',
                      border: '1px solid #ea580c'
                    }
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        {loginError && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {loginError}
          </Typography>
        )}

        <Divider sx={{ my: 3, width: '100%' }} />

        <Typography variant="body2" color="#ea580c"  sx={{ textAlign: 'center', padding: '10px', textDecoration: 'none' }}>
          Designed and Developed by NXT STEP
                  </Typography>
        <Typography color="#ea580c" fontWeight="100">
          Version : {AppVersion}
        </Typography>
      </Card>
    </Box>
    // <Box
    //   sx={{
    //     minHeight: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background:
    //       "#fff",
    //     px: 2
    //   }}
    // >
    //   <Card
    //     sx={{
    //       width: { xs: "100%", sm: 420 },
    //       p: 4,
    //       borderRadius: 4,
    //       background: "#0f172a",
    //       border: "1px solid rgba(255,255,255,0.08)",
    //       boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
    //       color: "#fff",
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center"
    //     }}
    //   >
    //     {/* Logo Section */}

    //     <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
    //       <Box component="img" src={logo} alt="logo" sx={{ height: 85 }} />

    //       <Typography
    //         sx={{
    //           fontSize: 26,
    //           fontWeight: 700,
    //           letterSpacing: 1,
    //           color: "#ea580c"
    //         }}
    //       >
    //         NXTSTEP
    //       </Typography>

    //       <Typography
    //         sx={{
    //           fontSize: 14,
    //           opacity: 0.8,
    //           color: "#fff"
    //         }}
    //       >
    //         Design Your Future
    //       </Typography>
    //     </Stack>

    //     {/* Title */}

    //     <Typography
    //       variant="h4"
    //       sx={{
    //         fontWeight: 700,
    //         mb: 1,
    //         color: "#fff"
    //       }}
    //     >
    //       Welcome Back
    //     </Typography>

    //     <Typography
    //       sx={{
    //         fontSize: 14,
    //         opacity: 0.7,
    //         mb: 3
    //       }}
    //     >
    //       Log in to your account to continue
    //     </Typography>

    //     {/* Form */}

    //     <Formik
    //       initialValues={{
    //         client_id: "webapp",
    //         client_secret: "saqw21!@",
    //         email: "",
    //         password: ""
    //       }}
    //       validationSchema={validate}
    //       onSubmit={(values) =>
    //         dispatch(userLogin({ ...values, navigate }))
    //       }
    //     >
    //       {() => (
    //         <Form style={{ width: "100%" }}>
    //           <Stack spacing={2.5}>
    //             <FormikTextField
    //               name="email"
    //               label="Email Address"
    //               fullWidth
    //               sx={{
    //                 "& .MuiOutlinedInput-root": {
    //                   borderRadius: "10px",
    //                   background: "#1e293b",
    //                   color: "#fff"
    //                 },
    //                 "& .MuiOutlinedInput-notchedOutline": {
    //                   borderColor: "rgba(255,255,255,0.2)"
    //                 },
    //                 "&:hover .MuiOutlinedInput-notchedOutline": {
    //                   borderColor: "#ea580c"
    //                 },
    //                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                   borderColor: "#ea580c"
    //                 }
    //               }}
    //             />

    //             <FormikTextField
    //               name="password"
    //               label="Password"
    //               type={showPassword ? "text" : "password"}
    //               fullWidth
    //               InputProps={{
    //                 endAdornment: (
    //                   <InputAdornment position="end">
    //                     <IconButton
    //                       onClick={handleTogglePasswordVisibility}
    //                       sx={{ color: "#fff" }}
    //                     >
    //                       {showPassword ? (
    //                         <VisibilityOff />
    //                       ) : (
    //                         <Visibility />
    //                       )}
    //                     </IconButton>
    //                   </InputAdornment>
    //                 )
    //               }}
    //               sx={{
    //                 "& .MuiOutlinedInput-root": {
    //                   borderRadius: "10px",
    //                   background: "#1e293b",
    //                   color: "#fff"
    //                 },
    //                 "& .MuiOutlinedInput-notchedOutline": {
    //                   borderColor: "rgba(255,255,255,0.2)"
    //                 }
    //               }}
    //             />

    //             {/* Remember + Forgot */}

    //             <Stack
    //               direction="row"
    //               justifyContent="space-between"
    //               alignItems="center"
    //             >
    //               <FormControlLabel
    //                 control={
    //                   <Checkbox
    //                     size="small"
    //                     sx={{
    //                       color: "#ea580c",
    //                       "&.Mui-checked": { color: "#ea580c" }
    //                     }}
    //                   />
    //                 }
    //                 label={
    //                   <Typography sx={{ fontSize: 14 }}>
    //                     Remember me
    //                   </Typography>
    //                 }
    //               />

    //               <Link
    //                 to="/forgot-password"
    //                 style={{
    //                   color: "#ea580c",
    //                   fontSize: 14,
    //                   textDecoration: "none"
    //                 }}
    //               >
    //                 Forgot Password?
    //               </Link>
    //             </Stack>

    //             {/* Login Button */}

    //             <Button
    //               type="submit"
    //               fullWidth
    //               sx={{
    //                 py: 1.6,
    //                 fontWeight: 600,
    //                 fontSize: 16,
    //                 borderRadius: 2,
    //                 background: "#ea580c",
    //                 color: "#fff",
    //                 transition: "all .3s ease",
    //                 // boxShadow:
    //                 //   "0 8px 20px rgba(234,88,12,0.45)",
    //                 "&:hover": {
    //                   background: "#c2410c",
    //                 //   transform: "translateY(-2px)",
    //                 //   boxShadow:
    //                 //     "0 12px 25px rgba(234,88,12,0.6)"
    //                 }
    //               }}
    //             >
    //               Login
    //             </Button>
    //           </Stack>
    //         </Form>
    //       )}
    //     </Formik>

    //     {/* Error */}

    //     {loginError && (
    //       <Alert
    //         severity="error"
    //         sx={{
    //           mt: 2,
    //           width: "100%"
    //         }}
    //       >
    //         {loginError}
    //       </Alert>
    //     )}

    //     <Divider
    //       sx={{
    //         my: 3,
    //         width: "100%",
    //         borderColor: "rgba(255,255,255,0.1)"
    //       }}
    //     />

    //     {/* Footer */}

    //     <Typography
    //       sx={{
    //         fontSize: 13,
    //         color: "#ea580c"
    //       }}
    //     >
    //       Designed & Developed by NXT STEP
    //     </Typography>

    //     <Typography
    //       sx={{
    //         fontSize: 12,
    //         opacity: 0.7
    //       }}
    //     >
    //       Version : {AppVersion}
    //     </Typography>
    //   </Card>
    // </Box>
  );
};

export default AuthLogin;
