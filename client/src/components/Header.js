import React, { useContext, useState } from "react";
import { Typography, AppBar, Toolbar, IconButton, Drawer, Box, Divider } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { employeeContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ onLogout, navigateTo }){
  const employee = useContext(employeeContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const showingProfile = (location.pathname === "/profile" ? true : false)

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
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/main")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <HomeIcon htmlColor="#3453c4"/>
            <Typography>
              Home
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/bidding")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <FormatListNumberedIcon htmlColor="#3453c4"/>
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
            <CalendarMonthIcon htmlColor="#3453c4"/>
            <Typography>
              Calendar
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/app-info")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <InfoIcon htmlColor="#3453c4"/>
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
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/admin-main")
          }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <HomeIcon htmlColor="#3453c4"/>
            <Typography>
              Home
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/admin-employees")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <BadgeIcon htmlColor="#3453c4"/>
            <Typography>
              Employees
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/admin-schedules")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <FormatListNumberedIcon htmlColor="#3453c4"/>
            <Typography>
              Schedules
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/admin-shifts")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <ListIcon htmlColor="#3453c4"/>
            <Typography>
              Shifts
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>{
              setLeftDrawerOpen(false)
              navigate("/app-info")
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <InfoIcon htmlColor="#3453c4"/>
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
            title={showingProfile ? "Settings" : "Account"}
            size="large"
            color="inherit"
            onClick={()=>setRightDrawerOpen(true)}
          >
            {showingProfile ? <SettingsIcon /> : <AccountCircle />}
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
              if(showingProfile){
                navigateTo("/edit-profile")
              } else {
                navigateTo("/profile")
              }
            }}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            {showingProfile ? <EditIcon htmlColor="#f9b612"/> : <AccountCircle htmlColor="#3453c4"/>}
            <Typography>
              {showingProfile ? "Edit Account":"Account"}
            </Typography>
          </IconButton>
          <Divider />
          <IconButton
            onClick={()=>fetch("/logout",{method:"DELETE"}).then(onLogout(null))}
            size="large"
            color="inherit"
            sx={{ borderRadius: 0 }}
          >
            <LogoutIcon htmlColor="#e51d23"/>
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