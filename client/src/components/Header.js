import React, { useContext, useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Drawer, Box, Divider } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoIcon from '@mui/icons-material/Info';
import BadgeIcon from '@mui/icons-material/Badge';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import { employeeContext } from "./App";

function Header({ onLogout, navigateTo }){
  const employee = useContext(employeeContext)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

  let leftDrawer
    if(!employee.admin){
      leftDrawer = <>
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={()=>setLeftDrawerOpen(false)}
      >
        <Box p={2} textAlign="center" width={200}>
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <FormatListNumberedIcon />
            <Typography>
              Bidding
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <CalendarMonthIcon />
            <Typography>
              Calendar
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <InfoIcon />
            <Typography>
              App Info
            </Typography>
          </IconButton>
        </Box>
      </Drawer>
      </>
    }
    if(employee.admin){
      leftDrawer = <>
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={()=>setLeftDrawerOpen(false)}
      >
        <Box p={2} textAlign="center" width={200}>
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <FormatListNumberedIcon />
            <Typography>
              Schedules
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <ListIcon />
            <Typography>
              Shifts
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <BadgeIcon />
            <Typography>
              Employees
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <InfoIcon />
            <Typography>
              App Info
            </Typography>
          </IconButton>
        </Box>
      </Drawer>
      </>
    }

  // Create if(employee.admin) return(Admin navigation bar) DONE!!!
  // Find out what an onClick(e.target / e.currentTarget) console.log()'s
  // Set up all component pages, for both employee and admin side
  // Set up handleClose() to close sidebars L & R

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
      {leftDrawer}
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={()=>setRightDrawerOpen(false)}
      >
        <Box p={2} textAlign="center" width={200}>
          <IconButton
            onClick={()=>{
              setRightDrawerOpen(false)
              navigateTo("/profile")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <AccountCircle />
            <Typography>
              Account
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>fetch("/logout",{method:"DELETE"}).then(onLogout(null))}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <LogoutIcon />
            <Typography>
              Logout
            </Typography>
          </IconButton>
        </Box>
      </Drawer>
    </>
  )
}

export default Header