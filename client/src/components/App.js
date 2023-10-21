import React from "react";
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"

function App(){

  return(
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="h1" align="center">RADBP</Typography>
      <Typography variant="h5" align="center">
        Ramp Agent Digital Bidding Platform
      </Typography>
    </>
  )
}

export default App