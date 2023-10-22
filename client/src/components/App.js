import React, { createContext, useEffect, useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginForm from "./LoginForm";
import Loading from "./Loading";

export const employeeContext = createContext(null)

function App(){
  const [employee, setEmployee] = useState(null)
  const [logCheck, setLogCheck] = useState(false)

  useEffect(()=>{
    fetch("/employee")
    .then((res)=>{
      if(res.ok){
        res.json()
        .then((d)=>{
          setEmployee(d)
          setLogCheck(true)
        })
      } else {
        setLogCheck(true)
      }
    })
    .catch(err => console.log(err))
  },[])

  function handleLogin(data){
    setEmployee(data)
    setLogCheck(true)
  }

  if(!logCheck){
    return(
      <Loading />
    )
  }

  if(employee){
    return(
      <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" align="center" sx={{ flexGrow: 1 }}>RADBP</Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Button onClick={()=>fetch("/logout",{method:"DELETE"}).then(setEmployee(null))}>Logout</Button>
      </>
    )
  }

  return(
    <>
      <AppBar position="static">
          <Typography variant="h3" align="center" sx={{ flexGrow: 1 }}>RADBP</Typography>
      </AppBar>
      <br/>
      <Typography variant="h5" align="center">
        Ramp Agent Digital Bidding Platform
      </Typography>
      <LoginForm login={handleLogin}/>
    </>
  )
}

export default App