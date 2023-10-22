import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";

function LoginForm(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  let active = true

  if(firstName !== "" && lastName !== "" && password !== ""){
    active = false
  }

  return(
    <Container align="center" className="loginContainer" maxWidth="xs">
      <Typography variant="h6" align="center">
        Please login to continue!
      </Typography>
      <TextField 
        label="First Name"
        sx={{ flexGrow:1 }}
        margin="dense"
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        required
        size="small"
        autoComplete="off"
      /> <br/>
      <TextField
        label="Last Name"
        sx={{ flexGrow:1 }}
        margin="dense"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
        required
        size="small"
        autoComplete="off"
      /> <br/>
      <TextField
        label="Password"
        type="password"
        sx={{ flexGrow:1 }}
        margin="dense"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        size="small"
        autoComplete="off"
      /> <br/><br/>
      <Button
        variant="contained"
        disabled={active}
        onClick={()=> console.log(firstName,lastName,password)}
      >
        Login
      </Button>
    </Container>
  )
}

export default LoginForm