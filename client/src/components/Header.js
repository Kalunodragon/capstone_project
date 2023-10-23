import React, { useContext } from "react";
import { Typography, AppBar, Toolbar, IconButton, Button } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { employeeContext } from "./App";

function Header({ onLogout }){
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
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>{employee.admin ? "ADMIN-RADS" : "RADS"}</Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            <LogoutIcon onClick={()=>fetch("/logout",{method:"DELETE"}).then(onLogout(null))}/>
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            {/* Move this to a sidebar type thing */}
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Button variant="contained" align="center">Logout</Button> */}
    </>
  )
}

export default Header