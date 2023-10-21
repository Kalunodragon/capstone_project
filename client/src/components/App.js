import React from "react";
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from '@mui/icons-material/AccountCircle';


function App(){

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
      <Typography variant="h5" align="center">
        Ramp Agent Digital Bidding Platform
      </Typography>
    </>
  )
}

export default App