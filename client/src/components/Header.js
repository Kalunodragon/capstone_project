import React, { useContext, useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Drawer, Box, Divider } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { employeeContext } from "./App";

function Header({ onLogout }){
  const employee = useContext(employeeContext)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)


  return(
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            title="Navigation"
            size="large"
            color="inherit"
            onClick={()=>setLeftDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>{employee.admin ? "RADS-ADMIN" : "RADS"}</Typography>
          <IconButton
            title="Account"
            size="large"
            color="inherit"
            onClick={()=>setRightDrawerOpen(true)}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={()=>setLeftDrawerOpen(false)}
      >
        <Box p={2} textAlign="center" width={200}>
          <Typography>
            Navigation
          </Typography>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={()=>setRightDrawerOpen(false)}
      >
        <Box p={2} textAlign="center" width={200}>
          <Typography>
            Profile
          </Typography>
          <Divider />
          <IconButton
            onClick={()=>fetch("/logout",{method:"DELETE"}).then(onLogout(null))}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <Typography>
              Account
            </Typography>
            <AccountCircle />
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>fetch("/logout",{method:"DELETE"}).then(onLogout(null))}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <Typography>
              Logout
            </Typography>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  )
}

export default Header