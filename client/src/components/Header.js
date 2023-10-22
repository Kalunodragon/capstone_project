import React, { useContext } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import { employeeContext } from "./App";

function Header({ logout }){
  const employee = useContext(employeeContext)

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
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>{employee.admin ? "ADMIN-RADBP" : "RADBP"}</Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Button variant="contained" align="center" onClick={()=>fetch("/logout",{method:"DELETE"}).then(logout(null))}>Logout</Button>
    </>
  )
}

export default Header