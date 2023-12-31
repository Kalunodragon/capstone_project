import React, { useState } from "react";
import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [active, setActive] = useState(true)
  const [loginClicked, setLoginClicked] = useState(false)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()

  if(firstName !== "" && lastName !== "" && password !== "" && !loginClicked){
    if(active) setActive(v=>!v)
  } else {
    if(!active) setActive(v=>!v)
  }

  function clearFields(){
    setFirstName("")
    setLastName("")
    setPassword("")
  }

  function handleLogin(e){
    e.preventDefault()
    if(errors) setErrors(null)
    setLoginClicked(v=>!v)
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "first_name":firstName,
        "last_name":lastName,
        "password":password
      })
    })
    .then((res)=>{
        if(res.ok){
          res.json()
          .then((d)=>{
            onLogin(d)
            if(d.admin){
              navigate("/admin-main")
            } else {
              navigate("/main")
            }
            setLoginClicked(v=>!v)
          })
        } else {
          res.json()
          .then((d)=>{
            setErrors(d.error)
            setLoginClicked(v=>!v)
            clearFields()
          })
        }
      })
  }

  return(
    <Container align="center" className="loginContainer" maxWidth="xs">
      <Paper className="loginPaper">
        <Typography variant="h6" align="center">
          Please login to continue!
        </Typography>
        {errors ? <Alert severity="error" variant="filled">{errors}</Alert> : null}
        <Box component="form" noValidate onSubmit={handleLogin}>
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
            type="submit"
            variant="contained"
            disabled={active}
          >
            {loginClicked ? "Loading..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginForm