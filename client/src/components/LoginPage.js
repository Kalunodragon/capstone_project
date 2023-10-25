import React from "react";
import { Typography, AppBar } from '@mui/material'
import LoginForm from "./LoginForm";
import Footer from "./Footer";

function LoginPage({ onLogin }){

  return(
    <>
      <AppBar position="static">
        <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>RADS</Typography>
      </AppBar>
      <br/>
      <Typography variant="h5" align="center">
        Ramp Agent Digital Scheduling
      </Typography>
      <LoginForm onLogin={onLogin}/>
      <Footer />
    </>
  )
}

export default LoginPage