import React, { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";

function LoginForm(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

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
        autoComplete="off"
      /> <br/>
      <TextField
        label="Last Name"
        sx={{ flexGrow:1 }}
        margin="dense"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
        required
        autoComplete="off"
      /> <br/>
      <TextField
        label="Password"
        sx={{ flexGrow:1 }}
        margin="dense"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        autoComplete="off"
      />
    </Container>
  )
}

export default LoginForm